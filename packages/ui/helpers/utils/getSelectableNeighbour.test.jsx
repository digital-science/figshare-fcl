import React from "react";
import { render, cleanup } from "@testing-library/react";

import { getSelectableNeighbour } from "./getSelectableNeighbour";


describe("getSelectableNeighbour()", () => {
  function teardown() {
    cleanup();
  }

  function renderContainer() {
    const { container } = render(
      <div>
        <button />
        <button />
        <button id="keep" />
      </div>
    );
    const containerNode = container.querySelector("div");
    const buttons = container.querySelectorAll("button");

    return { containerNode, buttons };
  }

  it("returns correct result if target not in the list", () => {
    const { containerNode, buttons } = renderContainer();
    const [firstChild, , thirdChild] = buttons;

    expect(getSelectableNeighbour({ querySelector: "* > *", containerNode, currentNode: null, offset: 1 })).
      toEqual(firstChild);
    expect(getSelectableNeighbour({ querySelector: "* > *", containerNode, currentNode: null, offset: -1 })).
      toEqual(thirdChild);
    teardown();
  });

  it("returns correct result if target is in the list", () => {
    const { containerNode, buttons } = renderContainer();
    const [firstChild, secondChild, thirdChild] = buttons;

    expect(getSelectableNeighbour({ querySelector: "* > *", containerNode, currentNode: firstChild, offset: 1 })).
      toEqual(secondChild);
    expect(getSelectableNeighbour({ querySelector: "* > *", containerNode, currentNode: thirdChild, offset: -1 })).
      toEqual(secondChild);
    teardown();
  });

  it("applies given filter to items list", () => {
    const { containerNode } = renderContainer();
    const keep = containerNode.querySelector("#keep");

    expect(getSelectableNeighbour({
      containerNode,
      offset: 1,
      filter: (node) => node.getAttribute("id") === "keep",
    })).toEqual(keep);
    teardown();
  });
});
