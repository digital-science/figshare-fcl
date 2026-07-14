import React from "react";
import { mount } from "enzyme";

import FocusRedirect from "./focusRedirect";


const innerRef = jest.fn();
const renderComponent = (props) => mount(
  <FocusRedirect innerRef={innerRef} {...props}>
    {({ ref, ...passedProps }) => (
      <div ref={ref} {...passedProps}>
        <button>Child 1</button>
        <button>Child 2</button>
        <button>Child 3</button>
      </div>
    )}
  </FocusRedirect>,
  { attachTo: document.rootContainer }
);

describe("<FocusRedirect />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("passes correct props to children", () => {
    const testedComponent = renderComponent({ "data-extra": true });
    const { onKeyDown, onMouseDown, onFocus } = testedComponent.instance();

    const container = testedComponent.find("div");

    expect(container).toHaveLength(1);
    expect(container.props().onKeyDown).toEqual(onKeyDown);
    expect(container.props().onMouseDown).toEqual(onMouseDown);
    expect(container.props().onFocus).toEqual(onFocus);
    expect(container.props()["data-extra"]).toEqual(true);
  });

  it("applies correct tabIndex", () => {
    const testedComponent = renderComponent({ isActive: false });
    expect(testedComponent.find("div").props().tabIndex).toEqual(-1);

    testedComponent.setProps({ isActive: true });
    expect(testedComponent.find("div").props().tabIndex).toEqual(0);
  });

  it("correctly calls onKeyDown", () => {
    const onKeyDown = jest.fn();
    const testedComponent = renderComponent({ onKeyDown });

    const container = testedComponent.find("div");
    const containerDOMNode = container.getDOMNode();

    jest.useFakeTimers();

    expect(containerDOMNode.tabIndex).toEqual(0);
    container.simulate("keyDown", { key: "Tab", target: containerDOMNode });
    expect(onKeyDown).toHaveBeenCalled();
    expect(containerDOMNode.tabIndex).toEqual(0);

    container.simulate("keyDown", { shiftKey: true, key: "Tab", target: containerDOMNode });
    expect(containerDOMNode.tabIndex).toEqual(-1);
    jest.runAllTimers();
    expect(containerDOMNode.tabIndex).toEqual(0);
  });

  it("correctly calls onMouseDown", () => {
    const onMouseDown = jest.fn();
    const testedComponent = renderComponent({ onMouseDown });

    const container = testedComponent.find("div");
    const containerDOMNode = container.getDOMNode();
    const childDOMNode = container.find("button").at(0).getDOMNode();

    let clickEvent = {
      preventDefault: jest.fn(),
      target: childDOMNode,
    };
    container.simulate("mouseDown", clickEvent);
    expect(clickEvent.preventDefault).not.toHaveBeenCalled();

    clickEvent = {
      preventDefault: jest.fn(),
      target: containerDOMNode,
    };
    container.simulate("mouseDown", clickEvent);
    expect(clickEvent.preventDefault).toHaveBeenCalled();
  });

  it("correctly calls onFocus", () => {
    const onFocus = jest.fn();
    const testedComponent = renderComponent({ onFocus });

    const container = testedComponent.find("div");
    const containerDOMNode = container.getDOMNode();
    const firstChild = container.find("button").at(0);
    const childDOMNode = firstChild.getDOMNode();

    let focusEvent = {
      preventDefault: jest.fn(),
      target: childDOMNode,
    };
    container.simulate("focus", focusEvent);
    expect(focusEvent.preventDefault).not.toHaveBeenCalled();
    expect(onFocus).not.toHaveBeenCalled();

    focusEvent = {
      preventDefault: jest.fn(),
      target: containerDOMNode,
    };
    container.simulate("focus", focusEvent);

    expect(focusEvent.preventDefault).toHaveBeenCalled();
    expect(document.activeElement).toEqual(childDOMNode);
    expect(onFocus).toHaveBeenCalled();
  });

  it("correctly calls setRef", () => {
    const testedComponent = renderComponent({ innerRef });
    const { setRef, containerNode: existingContainerNode } = testedComponent.instance();
    jest.clearAllMocks();

    setRef();
    expect(innerRef).not.toHaveBeenCalled();

    setRef(existingContainerNode);
    expect(innerRef).not.toHaveBeenCalled();

    const containerNode = testedComponent.find("div").getDOMNode;
    setRef(containerNode);
    expect(innerRef).toHaveBeenCalledWith(containerNode);
  });
});
