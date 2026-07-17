import React from "react";
import { render, cleanup } from "@testing-library/react";

import RootCloseListener from "./rootCloseListener";


describe("<RootCloseListener />", () => {
  let map = {};
  let addSpy = null;
  let removeSpy = null;

  function simulate(name, event) {
    if (map[name]) {
      map[name](event);
    }
  }

  function setupListenerSpies() {
    addSpy = jest.spyOn(document, "addEventListener").mockImplementation((name, handler, capture = false) => {
      map[`${name}${capture ? "Capture" : ""}`] = handler;
    });
    removeSpy = jest.spyOn(document, "removeEventListener").mockImplementation((name, handler, capture = false) => {
      delete map[`${name}${capture ? "Capture" : ""}`];
    });
  }

  function restoreListenerSpies() {
    addSpy.mockRestore();
    removeSpy.mockRestore();
    map = {};
  }

  function teardown() {
    cleanup();
  }

  it("renders children", () => {
    const { container } = render(
      <RootCloseListener>
        {({ ref }) => <div ref={ref}>Some test</div>}
      </RootCloseListener>
    );
    expect(container.querySelector("div")).toBeInTheDocument();
    expect(container.querySelector("div").textContent).toBe("Some test");
    teardown();
  });

  it("sets innerRef correctly", () => {
    const innerRef = jest.fn();
    render(
      <RootCloseListener innerRef={innerRef}>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );
    expect(innerRef).toHaveBeenCalledWith(expect.any(HTMLElement));
    teardown();
  });

  it("adds listeners on mount and removes them on unmount", () => {
    setupListenerSpies();
    expect(addSpy).not.toHaveBeenCalled();

    const { unmount } = render(
      <RootCloseListener>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );

    expect(addSpy).toHaveBeenCalledTimes(3);
    expect(removeSpy).not.toHaveBeenCalled();

    unmount();

    expect(removeSpy).toHaveBeenCalledTimes(3);
    restoreListenerSpies();
    teardown();
  });

  it("doesn't add listeners if disabled on mount", () => {
    setupListenerSpies();

    const { unmount } = render(
      <RootCloseListener disabled={true}>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );

    expect(addSpy).not.toHaveBeenCalled();

    unmount();

    expect(removeSpy).toHaveBeenCalledTimes(3);
    restoreListenerSpies();
    teardown();
  });

  it("manages listeners correctly when updating disabled prop", () => {
    setupListenerSpies();

    const { rerender, unmount } = render(
      <RootCloseListener disabled={true}>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );

    expect(addSpy).not.toHaveBeenCalled();
    expect(removeSpy).not.toHaveBeenCalled();

    rerender(
      <RootCloseListener disabled={false}>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );

    expect(addSpy).toHaveBeenCalledTimes(3);
    expect(removeSpy).not.toHaveBeenCalled();

    addSpy.mockClear();

    rerender(
      <RootCloseListener disabled={true}>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );

    expect(addSpy).not.toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalledTimes(3);

    unmount();
    restoreListenerSpies();
    teardown();
  });

  it("calls onClose when escape key is pressed", () => {
    setupListenerSpies();
    const onClose = jest.fn();

    render(
      <RootCloseListener onClose={onClose}>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );

    const event = { keyCode: 27 };
    simulate("keyup", event);
    expect(onClose).toHaveBeenCalledWith(event);

    onClose.mockClear();
    simulate("keyup", { keyCode: 0 });
    expect(onClose).not.toHaveBeenCalled();

    restoreListenerSpies();
    teardown();
  });

  it("calls onClose when target outside is clicked", () => {
    setupListenerSpies();
    const onClose = jest.fn();
    const outsideNode = document.createElement("span");
    const event = { button: 0, target: outsideNode };

    render(
      <RootCloseListener onClose={onClose}>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );

    simulate("clickCapture", event);
    simulate("click", event);
    expect(onClose).toHaveBeenCalledWith(event);

    restoreListenerSpies();
    teardown();
  });

  it("doesn't call onClose when not left click", () => {
    setupListenerSpies();
    const onClose = jest.fn();
    const outsideNode = document.createElement("span");
    const event = { button: 1, target: outsideNode };

    render(
      <RootCloseListener onClose={onClose}>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );

    simulate("clickCapture", event);
    simulate("click", event);
    expect(onClose).not.toHaveBeenCalled();

    restoreListenerSpies();
    teardown();
  });

  it("doesn't call onClose when click and modifier keys are pressed", () => {
    setupListenerSpies();
    const onClose = jest.fn();

    render(
      <RootCloseListener onClose={onClose}>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );

    for (const key of ["metaKey", "altKey", "ctrlKey", "shiftKey"]) {
      const outsideNode = document.createElement("span");
      const event = { button: 0, target: outsideNode, [key]: true };
      simulate("clickCapture", event);
      simulate("click", event);
      expect(onClose).not.toHaveBeenCalled();
    }

    restoreListenerSpies();
    teardown();
  });

  it("doesn't call onClose when target inside is clicked", () => {
    setupListenerSpies();
    const onClose = jest.fn();
    let target = null;
    const innerRef = jest.fn((node) => {
      target = node;
    });

    render(
      <RootCloseListener innerRef={innerRef} onClose={onClose}>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );

    const event = { button: 0, target };
    simulate("clickCapture", event);
    simulate("click", event);
    expect(onClose).not.toHaveBeenCalled();

    restoreListenerSpies();
    teardown();
  });

  it("doesn't call onClose when disabled", () => {
    setupListenerSpies();
    const onClose = jest.fn();

    render(
      <RootCloseListener disabled={true} onClose={onClose}>
        {({ ref }) => <div ref={ref}>test</div>}
      </RootCloseListener>
    );

    simulate("keyup", { keyCode: 8 });
    expect(onClose).not.toHaveBeenCalled();

    simulate("clickCapture", { button: 0 });
    simulate("click", { button: 0 });
    expect(onClose).not.toHaveBeenCalled();

    restoreListenerSpies();
    teardown();
  });
});
