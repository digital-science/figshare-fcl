import React, { createRef } from "react";
import { mount } from "enzyme";

import { LinkingProvider } from "../a11y/linking";


import { Trigger, Content } from "./index";
import { Provider } from "./context";


describe("<Trigger />", () => {
  it("renders children", () => {
    const triggerRef = createRef();
    const triggerContent = jest.fn(({ ...props }) => <div {...props} id="trigger" />);
    const tooltipContext = {
      ariaAttributes: [],
      triggerRef,
      events: { onClick: jest.fn() },
      linkingContext: {},
    };
    const trigger = mount(
      <Provider value={tooltipContext}>
        <LinkingProvider>
          <Trigger>{triggerContent}</Trigger>
        </LinkingProvider>
      </Provider>
    );

    expect(trigger.find("#trigger")).toHaveLength(1);
    expect(triggerContent).toHaveBeenCalledWith({
      ref: tooltipContext.triggerRef,
      onClick: tooltipContext.events.onClick,
    });
  });
});

describe("<Content />", () => {
  it("render children", () => {
    const contentRef = jest.fn();

    const tooltipContent = jest.fn(() => <div id="content" />);
    const tooltipContext = {
      contentRef,
      events: { onFocus: jest.fn() },
      onClose: jest.fn(),
      ariaRole: "role",
      addEventsOnContent: true,
    };

    const content = mount(
      <Provider value={tooltipContext}>
        <Content >
          {tooltipContent}
        </Content>
      </Provider>
    );

    expect(content.find("#content")).toHaveLength(1);
    expect(content.find(".container").props().role).toEqual("role");
    expect(tooltipContent).toHaveBeenCalledWith({ onClose: tooltipContext.onClose });
    expect(content.find("Content").instance().popperUpdate).toEqual(expect.any(Function));
    content.find("Content").instance().popperUpdate = jest.fn();

    content.find("Content").instance().componentDidUpdate();
    expect(content.find("Content").instance().popperUpdate).toHaveBeenCalled();

    content.find("Content").instance().popperUpdate = null;
    content.find("Content").instance().componentDidUpdate();
    expect(content.find("Content").instance().updatePopper).not.toThrow();

    expect(content.find(".container").props().onFocus).toEqual(tooltipContext.events.onFocus);
  });

  it("render children without events", () => {
    const contentRef = jest.fn();

    const tooltipContent = jest.fn(() => <div id="content" />);
    const tooltipContext = {
      contentRef,
      events: { onFocus: jest.fn() },
      onClose: jest.fn(),
      ariaRole: "role",
      addEventsOnContent: false,
    };

    const content = mount(
      <Provider value={tooltipContext}>
        <Content >
          {tooltipContent}
        </Content>
      </Provider>
    );

    expect(content.find(".container").props().onFocus).toEqual(undefined);
  });

  it("uses existing document-level portal", () => {
    const contentRef = jest.fn();

    const tooltipContent = jest.fn(() => <div id="content" />);
    const tooltipContext = {
      contentRef,
      events: { onFocus: jest.fn() },
      onClose: jest.fn(),
      ariaRole: "role",
      addEventsOnContent: false,
    };

    mount(
      <Provider value={tooltipContext}>
        <Content >
          {tooltipContent}
        </Content>
      </Provider>
    );

    const content = mount(
      <Provider value={tooltipContext}>
        <Content >
          {tooltipContent}
        </Content>
      </Provider>
    );

    expect(content.find(".container")).not.toHaveLength(0);
  });

  it("supports fullscreen", () => {
    const contentRef = jest.fn();

    const tooltipContent = jest.fn(() => <div id="content" />);
    const tooltipContext = {
      contentRef,
      events: { onFocus: jest.fn() },
      onClose: jest.fn(),
      ariaRole: "role",
      addEventsOnContent: true,
    };

    const content = mount(
      <Provider value={tooltipContext}>
        <Content >
          {tooltipContent}
        </Content>
      </Provider>
    );

    const instance = content.find(Content).childAt(0).instance();
    instance.setPortal = jest.fn();
    const event = { target: "test" };
    document.fullscreenElement = true;
    instance.onFullScreenChange(event);
    expect(instance.setPortal).toHaveBeenCalledWith(event.target);

    document.fullscreenElement = false;
    instance.onFullScreenChange(event);
    expect(instance.setPortal).toHaveBeenCalledWith(document.body);

    content.unmount();
  });
});

describe("<Content Aria Description />", () => {
  it("renders", () => {
    const descRender = jest.fn(({ aria }) => <div className="content" {...aria} />);
    const ariaDescription = mount(
      <LinkingProvider>
        <Content.AriaDescription >
          {descRender}
        </Content.AriaDescription >
      </LinkingProvider>
    );

    expect(descRender).toHaveBeenCalled();
    expect(ariaDescription.find(".content")).toHaveLength(1);
    expect(ariaDescription.find(".content").props().id).toContain("a11y");
  });
});

describe("<Content Aria Label />", () => {
  it("renders", () => {
    const descRender = jest.fn(({ aria }) => <div className="content" {...aria} />);
    const ariaLabel = mount(
      <LinkingProvider>
        <Content.AriaLabel >
          {descRender}
        </Content.AriaLabel >
      </LinkingProvider>
    );

    expect(descRender).toHaveBeenCalled();
    expect(ariaLabel.find(".content")).toHaveLength(1);
    expect(ariaLabel.find(".content").props().id).toContain("a11y");
  });

  it("renders in page flow", () => {
    const contentRef = jest.fn();

    const tooltipContent = jest.fn(() => <div id="content" />);
    const tooltipContext = {
      contentRef,
      events: { onFocus: jest.fn() },
      onClose: jest.fn(),
      ariaRole: "role",
      addEventsOnContent: false,
    };

    const content = mount(
      <Provider value={tooltipContext}>
        <Content renderInPortal={false}>
          {tooltipContent}
        </Content>
      </Provider>
    );

    expect(content.find(".popup-container")).toHaveLength(0);
    expect(content.find("#content")).toHaveLength(0);

    content.unmount();
  });

  it("renders content when popup is visible", () => {
    const contentRef = jest.fn();

    const tooltipContent = jest.fn(() => <div id="content" />);
    const tooltipContext = {
      contentRef,
      events: { onFocus: jest.fn() },
      onClose: jest.fn(),
      ariaRole: "role",
      addEventsOnContent: false,
      isVisible: true,
    };

    const content = mount(
      <Provider value={tooltipContext}>
        <Content renderInPortal={false}>
          {tooltipContent}
        </Content>
      </Provider>
    );

    expect(content.find("#content")).toHaveLength(1);
  });
});
