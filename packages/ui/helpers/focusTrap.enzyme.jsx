import React from "react";
import { mount } from "enzyme";

import FocusTrap, { visibilityFilter } from "./focusTrap";


const innerRef = jest.fn();
const renderComponent = (props) => mount(
  <FocusTrap innerRef={innerRef} {...props}>
    {({ ref, ...passedProps }) => (
      <div ref={ref} {...passedProps}>
        <button>Child 1</button>
        <button>Child 2</button>
        <button>Child 3</button>
      </div>
    )}
  </FocusTrap>,
  { attachTo: document.rootContainer }
);

describe("<FocusTrap />", () => {
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

    testedComponent.unmount();
  });

  it("returnFocus is true: keeps a referenceNode, defers focuses to it on unmount",
    (done) => {
      const testedComponent = renderComponent({ innerRef, returnFocus: true });
      const delay = 300;
      const node = { focus: jest.fn() };

      testedComponent.instance().referenceNode = node;

      testedComponent.unmount();

      setTimeout(() => {
        expect(node.focus).toHaveBeenCalled();

        done();
      }, delay);
    });

  describe("onKeyDown", () => {
    it("does not run onKeyDown if not active", () => {
      const onKeyDownProp = jest.fn();
      const focusSelectableNeighbour = jest.spyOn(FocusTrap.prototype, "focusSelectableNeighbour");
      const testedComponent = renderComponent({ onKeyDown: onKeyDownProp, isActive: false });
      const { onKeyDown } = testedComponent.instance();

      onKeyDown({ key: "Tab" });
      expect(focusSelectableNeighbour).not.toHaveBeenCalled();
      expect(onKeyDownProp).toHaveBeenCalled();
    });

    it("does not run onKeyDown if not relevant key", () => {
      const onKeyDownProp = jest.fn();
      const focusSelectableNeighbour = jest.spyOn(FocusTrap.prototype, "focusSelectableNeighbour");
      const testedComponent = renderComponent({ onKeyDown: onKeyDownProp });
      const { onKeyDown } = testedComponent.instance();

      onKeyDown({ key: "Space" });
      expect(focusSelectableNeighbour).not.toHaveBeenCalled();
      expect(onKeyDownProp).toHaveBeenCalled();
      focusSelectableNeighbour.mockClear();
    });

    it("correctly calls onKeyDown", () => {
      const onKeyDownProp = jest.fn();
      const testedComponent = renderComponent({ onKeyDown: onKeyDownProp });
      const { onKeyDown } = testedComponent.instance();

      const container = testedComponent.find("div");
      const firstChild = container.find("button").at(0).getDOMNode();
      const secondChild = container.find("button").at(1).getDOMNode();
      const thirdChild = container.find("button").at(2).getDOMNode();

      const preventDefault = () => undefined;

      onKeyDown({ key: "Tab", target: firstChild, preventDefault });
      expect(document.activeElement).toEqual(secondChild);
      onKeyDown({ key: "Tab", target: secondChild, preventDefault });
      expect(document.activeElement).toEqual(thirdChild);
      onKeyDown({ key: "Tab", target: thirdChild, preventDefault });
      expect(document.activeElement).toEqual(firstChild);

      onKeyDown({ key: "Tab", target: firstChild, preventDefault, shiftKey: true });
      expect(document.activeElement).toEqual(thirdChild);
      onKeyDown({ key: "Tab", target: thirdChild, preventDefault, shiftKey: true });
      expect(document.activeElement).toEqual(secondChild);
      onKeyDown({ key: "Tab", target: secondChild, preventDefault, shiftKey: true });
      expect(document.activeElement).toEqual(firstChild);
    });
  });
  describe("visibilityFilter", () => {
    it("filters out nodes that are not visible", () => {
      const spy = jest.spyOn(window, "getComputedStyle");

      spy.mockImplementation((node) => {
        return { visibility: "visible", display: "block", ...node };
      });
      const nodes = [{ visibility: "visible" }, { visibility: "hidden" }, { display: "none" }, { allowed: true }];

      expect(nodes.filter(visibilityFilter)).toHaveLength(2);

      spy.mockClear();
    });
  });
});
