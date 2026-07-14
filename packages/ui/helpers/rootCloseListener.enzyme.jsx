import React from "react";
import { shallow, mount } from "enzyme";

import RootCloseListener from "./rootCloseListener";


describe("<RootCloseListener />", () => {
  let map = {};
  const simulate = (name, event) => {
    if (map[name]) {
      map[name](event);
    }
  };

  let addEventListener = null;
  let removeEventListener = null;

  beforeEach(() => {
    addEventListener = jest.spyOn(document, "addEventListener");
    addEventListener.mockImplementation((name, handler, capture = false) => {
      map[`${name}${capture ? "Capture" : ""}`] = handler;
    });

    removeEventListener = jest.spyOn(document, "removeEventListener");
    removeEventListener.mockImplementation((name, handler, capture = false) => {
      delete map[`${name}${capture ? "Capture" : ""}`];
    });
  });

  afterEach(() => {
    addEventListener.mockRestore();
    removeEventListener.mockRestore();

    map = {};
  });

  it("renders children", () => {
    const component = shallow(
      <RootCloseListener>
        {({ ref }) => <div ref={ref}> Some test </div>}
      </RootCloseListener>
    );

    expect(component.containsMatchingElement(<div> Some test </div>)).toEqual(true);

    const { defaultProps } = component.instance().constructor;
    expect(defaultProps.innerRef()).toEqual(undefined);
    expect(defaultProps.onClose()).toEqual(undefined);
  });

  it("sets innerRef correctly", () => {
    const innerRef = jest.fn();

    const component = shallow(
      <RootCloseListener innerRef={innerRef}>
        {({ ref }) => ref("test")}
      </RootCloseListener>
    );

    expect(innerRef).toHaveBeenCalledWith("test");

    innerRef.mockClear();
    component.update();

    expect(innerRef).not.toHaveBeenCalled();

    innerRef.mockClear();
    component.setProps({ children: ({ ref }) => ref() });

    expect(innerRef).not.toHaveBeenCalled();
  });

  it("adds listeners on mount and removes them on unmount", () => {
    expect(addEventListener).not.toHaveBeenCalled();

    const component = shallow(
      <RootCloseListener>
        {({ ref }) => <div ref={ref}> Some test </div>}
      </RootCloseListener>
    );

    const instance = component.instance();

    expect(addEventListener).toHaveBeenCalledTimes(3);
    expect(addEventListener).toHaveBeenCalledWith("click", instance.onClickCapture, true);
    expect(addEventListener).toHaveBeenCalledWith("click", instance.onClick);
    expect(addEventListener).toHaveBeenCalledWith("keyup", instance.onKeyUp);

    expect(removeEventListener).not.toHaveBeenCalled();

    component.unmount();

    expect(removeEventListener).toHaveBeenCalledTimes(3);
    expect(removeEventListener).toHaveBeenCalledWith("click", instance.onClickCapture, true);
    expect(removeEventListener).toHaveBeenCalledWith("click", instance.onClick);
    expect(removeEventListener).toHaveBeenCalledWith("keyup", instance.onKeyUp);
  });

  it("doesn't add listeners if disabled on mount", () => {
    expect(addEventListener).not.toHaveBeenCalled();

    const component = shallow(
      <RootCloseListener disabled={true}>
        {({ ref }) => <div ref={ref}> Some test </div>}
      </RootCloseListener>
    );
    const instance = component.instance();

    expect(addEventListener).not.toHaveBeenCalled();

    expect(removeEventListener).not.toHaveBeenCalled();

    component.unmount();

    expect(removeEventListener).toHaveBeenCalledTimes(3);
    expect(removeEventListener).toHaveBeenCalledWith("click", instance.onClickCapture, true);
    expect(removeEventListener).toHaveBeenCalledWith("click", instance.onClick);
    expect(removeEventListener).toHaveBeenCalledWith("keyup", instance.onKeyUp);
  });

  it("manages listeners correctly when updating disabled prop", () => {
    const component = shallow(
      <RootCloseListener disabled={true}>
        {({ ref }) => <div ref={ref}> Some test </div>}
      </RootCloseListener>
    );
    const instance = component.instance();

    expect(addEventListener).not.toHaveBeenCalled();
    expect(removeEventListener).not.toHaveBeenCalled();

    component.setProps({ disabled: false });

    expect(addEventListener).toHaveBeenCalledTimes(3);
    expect(addEventListener).toHaveBeenCalledWith("click", instance.onClickCapture, true);
    expect(addEventListener).toHaveBeenCalledWith("click", instance.onClick);
    expect(addEventListener).toHaveBeenCalledWith("keyup", instance.onKeyUp);

    expect(removeEventListener).not.toHaveBeenCalled();

    addEventListener.mockClear();

    component.setProps({ disabled: true });

    expect(addEventListener).not.toHaveBeenCalled();

    expect(removeEventListener).toHaveBeenCalledTimes(3);
    expect(removeEventListener).toHaveBeenCalledWith("click", instance.onClickCapture, true);
    expect(removeEventListener).toHaveBeenCalledWith("click", instance.onClick);
    expect(removeEventListener).toHaveBeenCalledWith("keyup", instance.onKeyUp);
  });

  it("calls onClose when escape key is pressed", () => {
    const onClose = jest.fn();
    const event = { keyCode: 27 };

    shallow(
      <RootCloseListener onClose={onClose}>
        {({ ref }) => <div ref={ref}> Some test </div>}
      </RootCloseListener>
    );

    simulate("keyup", event);
    expect(onClose).toHaveBeenCalledWith(event);

    onClose.mockClear();

    simulate("keyup", { keyCode: 0 });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when target outside is clicked", () => {
    const onClose = jest.fn();
    const event = { button: 0, target: { foo: "bar" } };

    shallow(
      <RootCloseListener onClose={onClose}>
        {({ ref }) => <div ref={ref}> Some test </div>}
      </RootCloseListener>
    );

    simulate("clickCapture", event);
    simulate("click", event);
    expect(onClose).toHaveBeenCalledWith(event);
  });

  it("doesn't call onClose when not left click", () => {
    const onClose = jest.fn();
    const event = { button: 1, target: { foo: "bar" } };

    shallow(
      <RootCloseListener onClose={onClose}>
        {({ ref }) => <div ref={ref}> Some test </div>}
      </RootCloseListener>
    );

    simulate("clickCapture", event);
    simulate("click", event);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("doesn't call onClose when click and modifier keys are pressed", () => {
    const onClose = jest.fn();

    shallow(
      <RootCloseListener onClose={onClose}>
        {({ ref }) => <div ref={ref}> Some test </div>}
      </RootCloseListener>
    );

    let event = { button: 0, target: { foo: "bar" }, metaKey: true };
    simulate("clickCapture", event);
    simulate("click", event);
    expect(onClose).not.toHaveBeenCalled();

    event = { button: 0, target: { foo: "bar" }, altKey: true };
    simulate("clickCapture", event);
    simulate("click", event);
    expect(onClose).not.toHaveBeenCalled();

    event = { button: 0, target: { foo: "bar" }, ctrlKey: true };
    simulate("clickCapture", event);
    simulate("click", event);
    expect(onClose).not.toHaveBeenCalled();

    event = { button: 0, target: { foo: "bar" }, shiftKey: true };
    simulate("clickCapture", event);
    simulate("click", event);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("doesn't call onClose when target inside is clicked", () => {
    let target = null;

    const onClose = jest.fn();
    const innerRef = jest.fn((node) => target = node);

    mount(
      <RootCloseListener innerRef={innerRef} onClose={onClose}>
        {({ ref }) => <div ref={ref}> Some test </div>}
      </RootCloseListener>
    );

    const event = { button: 0, target };
    simulate("clickCapture", event);
    simulate("click", event);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("doesn't call onClose when disabled", () => {
    const onClose = jest.fn();

    shallow(
      <RootCloseListener disabled={true} onClose={onClose}>
        {({ ref }) => <div ref={ref}> Some test </div>}
      </RootCloseListener>
    );

    simulate("keyup", { keyCode: 8 });
    expect(onClose).not.toHaveBeenCalled();

    onClose.mockClear();

    simulate("clickCapture", { button: 0 });
    simulate("click", { button: 0 });
    expect(onClose).not.toHaveBeenCalled();
  });
});
