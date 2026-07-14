import React, { Component } from "react";
import { mount } from "enzyme";

import { getSelectableNeighbour } from "./getSelectableNeighbour";


class MyComponent extends Component {
  render() {
    return (
      <div>
        <button />
        <button />
        <button id="keep" />
      </div>
    );
  }
}

describe("getSelectableNeighbour()", () => {
  it("returns correct result if target not in the list", () => {
    const myComponent = mount(<MyComponent />);
    const containerNode = myComponent.find("div").getDOMNode();
    const firstChild = myComponent.find("button").at(0).getDOMNode();
    const thirdChild = myComponent.find("button").at(2).getDOMNode();

    let params = {
      querySelector: "* > *",
      containerNode,
      currentNode: null,
      offset: 1,
    };
    expect(getSelectableNeighbour({ ...params })).toEqual(firstChild);

    params = {
      querySelector: "* > *",
      containerNode,
      currentNode: null,
      offset: -1,
    };
    expect(getSelectableNeighbour({ ...params })).toEqual(thirdChild);
  });

  it("returns correct result if target is in the list", () => {
    const myComponent = mount(<MyComponent />);
    const containerNode = myComponent.find("div").getDOMNode();
    const firstChild = myComponent.find("button").at(0).getDOMNode();
    const secondChild = myComponent.find("button").at(1).getDOMNode();
    const thirdChild = myComponent.find("button").at(2).getDOMNode();

    let params = {
      querySelector: "* > *",
      containerNode,
      currentNode: firstChild,
      offset: 1,
    };
    expect(getSelectableNeighbour({ ...params })).toEqual(secondChild);

    params = {
      querySelector: "* > *",
      containerNode,
      currentNode: thirdChild,
      offset: -1,
    };
    expect(getSelectableNeighbour({ ...params })).toEqual(secondChild);
  });

  it("applies given filter to items list", () => {
    const myComponent = mount(<MyComponent />);
    const containerNode = myComponent.find("div").getDOMNode();
    const keep = myComponent.find("#keep").getDOMNode();

    const params = {
      containerNode,
      offset: 1,
      filter: (node) => node.getAttribute("id") === "keep",
    };

    expect(getSelectableNeighbour({ ...params })).toEqual(keep);
  });
});
