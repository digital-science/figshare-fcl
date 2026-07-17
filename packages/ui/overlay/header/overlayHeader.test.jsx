import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { OverlayContext } from "../overlay";

import OverlayHeader from "./overlayHeader";


describe("<OverlayHeader />", () => {
  function teardown() {
    cleanup();
  }

  it("renders component", () => {
    const { container } = render(
      <OverlayHeader description="Description" title="Title" onClose={jest.fn()}>
        Test
      </OverlayHeader>
    );
    expect(container.querySelector("h1")).toBeInTheDocument();
    expect(container.querySelector("p")).toBeInTheDocument();
    teardown();
  });

  it("sets correct aria ids for title and description based on context", () => {
    const { container } = render(
      <OverlayContext.Provider value={ { id: "test" } }>
        <OverlayHeader description="Description" title="Title" onClose={jest.fn()} />
      </OverlayContext.Provider>
    );
    expect(container.querySelector("#dialog-test-title")).toBeInTheDocument();
    expect(container.querySelector("#dialog-test-description")).toBeInTheDocument();
    teardown();
  });

  it("sets correct classname for header based on context background", () => {
    const { container } = render(
      <OverlayContext.Provider value={ { id: "test", background: "warning" } }>
        <OverlayHeader description="Description" title="Title" onClose={jest.fn()} />
      </OverlayContext.Provider>
    );
    expect(container.querySelector(".confirmation")).toBeInTheDocument();
    teardown();
  });

  it("accepts custom className", () => {
    const { container } = render(
      <OverlayHeader className="test" onClose={jest.fn()}>
        <button>Close</button>
      </OverlayHeader>
    );
    expect(container.querySelector(".test")).toBeInTheDocument();
    teardown();
  });

  it("accepts a prop to style it as part of OverlayContent", () => {
    const { container } = render(
      <OverlayHeader isPartOfContent={true} onClose={jest.fn()}>
        <button>Close</button>
      </OverlayHeader>
    );
    expect(container.querySelector(".partOfContent")).toBeInTheDocument();
    teardown();
  });

  it("should render the icon button", () => {
    const { container } = render(
      <OverlayHeader description="Description" title="Title" onClose={jest.fn()} />
    );
    expect(container.querySelector("button")).toBeInTheDocument();
    teardown();
  });

  it("should call the onClose function", () => {
    const onClose = jest.fn();
    const { container } = render(
      <OverlayHeader description="Description" title="Title" onClose={onClose} />
    );
    const buttons = container.querySelectorAll("button");
    fireEvent.click(buttons[0]);
    expect(onClose).toHaveBeenCalled();
    teardown();
  });

  it("should render a Go Back button if backBtnFn is provided", () => {
    const onClose = jest.fn();
    const onGoBack = jest.fn();
    const { container } = render(
      <OverlayHeader
        backBtnFn={onGoBack}
        description="Description"
        title="Title"
        onClose={onClose}
      />
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(2);
    fireEvent.click(buttons[1]);
    expect(onGoBack).toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    teardown();
  });

  it("should show tooltip text on close button after blur", () => {
    const { container } = render(
      <OverlayHeader description="Description" title="Title" onClose={jest.fn()} />
    );
    const button = container.querySelector("button");
    fireEvent.blur(button);
    expect(button.textContent).toContain("Close");
    teardown();
  });
});
