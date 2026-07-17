import React, { createRef } from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { LinkingProvider } from "../a11y/linking";

import { Trigger, Content } from "./index";
import { Provider } from "./context";


describe("<Trigger />", () => {
  function teardown() {
    cleanup();
  }

  it("renders children", () => {
    const triggerRef = createRef();
    const triggerContent = jest.fn(({ ...props }) => <div {...props} id="trigger" />);
    const tooltipContext = {
      ariaAttributes: [],
      triggerRef,
      events: { onClick: jest.fn() },
      linkingContext: {},
    };

    const { container } = render(
      <Provider value={tooltipContext}>
        <LinkingProvider>
          <Trigger>{triggerContent}</Trigger>
        </LinkingProvider>
      </Provider>
    );

    expect(container.querySelector("#trigger")).toBeInTheDocument();
    expect(triggerContent).toHaveBeenCalledWith(
      expect.objectContaining({ ref: tooltipContext.triggerRef })
    );
    teardown();
  });
});

describe("<Content />", () => {
  function teardown() {
    cleanup();
  }

  it("renders children", () => {
    const contentRef = jest.fn();
    const tooltipContent = jest.fn(() => <div id="content" />);
    const tooltipContext = {
      contentRef,
      events: { onFocus: jest.fn() },
      onClose: jest.fn(),
      ariaRole: "role",
      addEventsOnContent: true,
    };

    render(
      <Provider value={tooltipContext}>
        <Content>{tooltipContent}</Content>
      </Provider>
    );

    expect(document.querySelector("#content")).toBeInTheDocument();
    expect(tooltipContent).toHaveBeenCalledWith({ onClose: tooltipContext.onClose });
    teardown();
  });

  it("renders children without events when addEventsOnContent is false", () => {
    const onFocus = jest.fn();
    const tooltipContext = {
      contentRef: jest.fn(),
      events: { onFocus },
      onClose: jest.fn(),
      ariaRole: "role",
      addEventsOnContent: false,
    };

    render(
      <Provider value={tooltipContext}>
        <Content>{() => <div id="content" />}</Content>
      </Provider>
    );

    const wrapper = document.querySelector(".container");
    fireEvent.focus(wrapper);
    expect(onFocus).not.toHaveBeenCalled();
    teardown();
  });

  it("does not render content when renderInPortal=false and not visible", () => {
    const tooltipContext = {
      contentRef: jest.fn(),
      events: {},
      onClose: jest.fn(),
      ariaRole: "role",
      addEventsOnContent: false,
    };

    const { container } = render(
      <Provider value={tooltipContext}>
        <Content renderInPortal={false}>{() => <div id="content" />}</Content>
      </Provider>
    );

    expect(container.querySelector("#content")).not.toBeInTheDocument();
    teardown();
  });

  it("renders content when renderInPortal=false and visible", () => {
    const tooltipContext = {
      contentRef: jest.fn(),
      events: {},
      onClose: jest.fn(),
      ariaRole: "role",
      addEventsOnContent: false,
      isVisible: true,
    };

    const { container } = render(
      <Provider value={tooltipContext}>
        <Content renderInPortal={false}>{() => <div id="content" />}</Content>
      </Provider>
    );

    expect(container.querySelector("#content")).toBeInTheDocument();
    teardown();
  });
});

describe("<Content.AriaDescription />", () => {
  function teardown() {
    cleanup();
  }

  it("renders with aria id", () => {
    const descRender = jest.fn(({ aria }) => <div className="content" {...aria} />);

    const { container } = render(
      <LinkingProvider>
        <Content.AriaDescription>{descRender}</Content.AriaDescription>
      </LinkingProvider>
    );

    expect(descRender).toHaveBeenCalled();
    expect(container.querySelector(".content")).toBeInTheDocument();
    expect(container.querySelector(".content").id).toContain("a11y");
    teardown();
  });
});

describe("<Content.AriaLabel />", () => {
  function teardown() {
    cleanup();
  }

  it("renders with aria id", () => {
    const descRender = jest.fn(({ aria }) => <div className="content" {...aria} />);

    const { container } = render(
      <LinkingProvider>
        <Content.AriaLabel>{descRender}</Content.AriaLabel>
      </LinkingProvider>
    );

    expect(descRender).toHaveBeenCalled();
    expect(container.querySelector(".content")).toBeInTheDocument();
    expect(container.querySelector(".content").id).toContain("a11y");
    teardown();
  });
});
