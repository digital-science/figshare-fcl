import React from "react";
import { mount } from "enzyme";

import FocusNavigation from "./focusNavigation";


const innerRef = jest.fn();
const renderComponent = (props) => mount(
  <FocusNavigation innerRef={innerRef} {...props}>
    {({ ref, ...passedProps }) => (
      <div ref={ref} {...passedProps}>
        <button>Child 1</button>
        <button>Child 2</button>
        <button>Child 3</button>
      </div>
    )}
  </FocusNavigation>,
  { attachTo: document.rootContainer }
);

describe("<FocusRedirect />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("passes correct props to children", () => {
    const testedComponent = renderComponent({ "data-extra": true });
    const { onKeyDown } = testedComponent.instance();

    const container = testedComponent.find("div");

    expect(container).toHaveLength(1);
    expect(container.props().onKeyDown).toEqual(onKeyDown);
    expect(container.props()["data-extra"]).toEqual(true);
  });

  it("correctly calls setRef", () => {
    const testedComponent = renderComponent({ innerRef });
    const { setRef, containerNode: existingContainerNode } = testedComponent.instance();
    jest.clearAllMocks();

    setRef();
    expect(innerRef).not.toHaveBeenCalled();

    setRef(existingContainerNode);
    expect(innerRef).not.toHaveBeenCalled();

    const node = testedComponent.find("button").at(0).getDOMNode();
    setRef(node);
    expect(innerRef).toHaveBeenCalledWith(node);
  });

  describe("onKeyDown", () => {
    it("does not run onKeyDown if not active", () => {
      const onKeyDownProp = jest.fn();
      const focusSelectableNeighbour = jest.spyOn(FocusNavigation.prototype, "focusSelectableNeighbour");
      const testedComponent = renderComponent({ onKeyDown: onKeyDownProp, isActive: false });
      const { onKeyDown } = testedComponent.instance();

      onKeyDown({ key: "Home" });
      expect(focusSelectableNeighbour).not.toHaveBeenCalled();
      expect(onKeyDownProp).toHaveBeenCalled();
    });

    it("does not run onKeyDown if not relevant key", () => {
      const onKeyDownProp = jest.fn();
      const focusSelectableNeighbour = jest.spyOn(FocusNavigation.prototype, "focusSelectableNeighbour");
      const testedComponent = renderComponent({ onKeyDown: onKeyDownProp });
      const { onKeyDown } = testedComponent.instance();

      onKeyDown({ key: "Space" });
      expect(focusSelectableNeighbour).not.toHaveBeenCalled();
      expect(onKeyDownProp).toHaveBeenCalled();
    });

    it("does not run onKeyDown if not relevant key in current [navigationType]", () => {
      const onKeyDownProp = jest.fn();
      const focusSelectableNeighbour = jest.spyOn(FocusNavigation.prototype, "focusSelectableNeighbour");
      const testedComponent = renderComponent({ onKeyDown: onKeyDownProp });
      const { onKeyDown } = testedComponent.instance();

      testedComponent.setProps({ navigationType: "horizontal" });
      onKeyDown({ key: "ArrowUp" });
      expect(focusSelectableNeighbour).not.toHaveBeenCalled();
      onKeyDown({ key: "ArrowDown" });
      expect(focusSelectableNeighbour).not.toHaveBeenCalled();

      testedComponent.setProps({ navigationType: "vertical" });
      onKeyDown({ key: "ArrowLeft" });
      expect(focusSelectableNeighbour).not.toHaveBeenCalled();
      onKeyDown({ key: "ArrowRight" });
      expect(focusSelectableNeighbour).not.toHaveBeenCalled();

      testedComponent.instance().navigationKeys.general = ["Home", "End", "test"];
      testedComponent.setProps({ navigationType: "vertical" });
      onKeyDown({ key: "test" });
      expect(focusSelectableNeighbour).not.toHaveBeenCalled();
    });

    it("runs correctly on [Home] keypress", () => {
      const onKeyDownProp = jest.fn();
      const testedComponent = renderComponent({ onKeyDown: onKeyDownProp });
      const { onKeyDown } = testedComponent.instance();

      const container = testedComponent.find("div");
      const containerDOMNode = container.getDOMNode();
      const firstChild = container.find("button").at(0).getDOMNode();
      const secondChild = container.find("button").at(1).getDOMNode();
      const thirdChild = container.find("button").at(2).getDOMNode();

      const preventDefault = () => undefined;
      onKeyDown({ key: "Home", target: containerDOMNode, preventDefault });
      expect(document.activeElement).toEqual(firstChild);
      onKeyDown({ key: "Home", target: firstChild, preventDefault });
      expect(document.activeElement).toEqual(firstChild);
      onKeyDown({ key: "Home", target: secondChild, preventDefault });
      expect(document.activeElement).toEqual(firstChild);
      onKeyDown({ key: "Home", target: thirdChild, preventDefault });
      expect(document.activeElement).toEqual(firstChild);
    });

    it("runs correctly on [End] keypress", () => {
      const onKeyDownProp = jest.fn();
      const testedComponent = renderComponent({ onKeyDown: onKeyDownProp });
      const { onKeyDown } = testedComponent.instance();

      const container = testedComponent.find("div");
      const containerDOMNode = container.getDOMNode();
      const firstChild = container.find("button").at(0).getDOMNode();
      const secondChild = container.find("button").at(1).getDOMNode();
      const thirdChild = container.find("button").at(2).getDOMNode();

      const preventDefault = () => undefined;
      onKeyDown({ key: "End", target: containerDOMNode, preventDefault });
      expect(document.activeElement).toEqual(thirdChild);
      onKeyDown({ key: "End", target: firstChild, preventDefault });
      expect(document.activeElement).toEqual(thirdChild);
      onKeyDown({ key: "End", target: secondChild, preventDefault });
      expect(document.activeElement).toEqual(thirdChild);
      onKeyDown({ key: "End", target: thirdChild, preventDefault });
      expect(document.activeElement).toEqual(thirdChild);
    });

    it("correctly calls onKeyDown on arrows keypress", () => {
      const onKeyDownProp = jest.fn();
      const testedComponent = renderComponent({ onKeyDown: onKeyDownProp });
      const { onKeyDown } = testedComponent.instance();

      const container = testedComponent.find("div");
      const firstChild = container.find("button").at(0).getDOMNode();
      const secondChild = container.find("button").at(1).getDOMNode();
      const thirdChild = container.find("button").at(2).getDOMNode();

      const preventDefault = () => undefined;

      testedComponent.setProps({ navigationType: "horizontal" });
      onKeyDown({ key: "ArrowRight", target: firstChild, preventDefault });
      expect(document.activeElement).toEqual(secondChild);
      onKeyDown({ key: "ArrowRight", target: secondChild, preventDefault });
      expect(document.activeElement).toEqual(thirdChild);
      onKeyDown({ key: "ArrowRight", target: thirdChild, preventDefault });
      expect(document.activeElement).toEqual(firstChild);

      onKeyDown({ key: "ArrowLeft", target: firstChild, preventDefault });
      expect(document.activeElement).toEqual(thirdChild);
      onKeyDown({ key: "ArrowLeft", target: thirdChild, preventDefault });
      expect(document.activeElement).toEqual(secondChild);
      onKeyDown({ key: "ArrowLeft", target: secondChild, preventDefault });
      expect(document.activeElement).toEqual(firstChild);

      testedComponent.setProps({ navigationType: "vertical" });
      onKeyDown({ key: "ArrowDown", target: firstChild, preventDefault });
      expect(document.activeElement).toEqual(secondChild);
      onKeyDown({ key: "ArrowDown", target: secondChild, preventDefault });
      expect(document.activeElement).toEqual(thirdChild);
      onKeyDown({ key: "ArrowDown", target: thirdChild, preventDefault });
      expect(document.activeElement).toEqual(firstChild);

      onKeyDown({ key: "ArrowUp", target: firstChild, preventDefault });
      expect(document.activeElement).toEqual(thirdChild);
      onKeyDown({ key: "ArrowUp", target: thirdChild, preventDefault });
      expect(document.activeElement).toEqual(secondChild);
      onKeyDown({ key: "ArrowUp", target: secondChild, preventDefault });
      expect(document.activeElement).toEqual(firstChild);
    });

    it("defensively returns if no children", () => {
      const component = mount(
        <FocusNavigation innerRef={innerRef}>
          {({ ref, ...passedProps }) => <div ref={ref} {...passedProps} />}
        </FocusNavigation>,
        { attachTo: document.rootContainer }
      );

      const containerNode = component.find("div").getDOMNode();
      component.instance().focusSelectableNeighbour(containerNode, 1);
      expect(containerNode.contains(document.activeElement)).toEqual(false);
    });

    it("sets correct tabIndex on target", () => {
      const testedComponent = renderComponent();
      const firstChild = testedComponent.find("button").at(0).getDOMNode();
      const secondChild = testedComponent.find("button").at(1).getDOMNode();

      jest.useFakeTimers();

      expect(secondChild.tabIndex).toEqual(-1);
      testedComponent.instance().focusSelectableNeighbour(firstChild, 1);
      expect(secondChild.tabIndex).toEqual(0);
      jest.runAllTimers();
      expect(secondChild.tabIndex).toEqual(-1);
    });
  });
});
