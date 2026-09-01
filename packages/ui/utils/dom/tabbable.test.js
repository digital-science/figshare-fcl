
/* eslint-disable init-declarations */
import { getElements, findNextTabStop, findPrevTabStop } from "./tabbable";


describe("getElements", () => {
  let container;
  let element1;
  let element2;
  let element3;

  beforeEach(() => {
    container = document.createElement("div");
    element1 = document.createElement("button");
    element1.textContent = "Button 1";
    element2 = document.createElement("a");
    element2.href = "#";
    element2.textContent = "Link 2";
    element3 = document.createElement("input");
    element3.type = "text";
    element3.value = "Input 3";

    container.appendChild(element1);
    container.appendChild(element2);
    container.appendChild(element3);
  });

  it("should return an empty array and undefined values if container or selector is invalid", () => {
    const result1 = getElements(null, ".item", element1);
    expect(result1.elements).toEqual([]);
    expect(result1.first).toBeUndefined();
    expect(result1.last).toBeUndefined();
    expect(result1.next).toBeUndefined();
    expect(result1.prev).toBeUndefined();
    expect(result1.current).toBeUndefined();
    expect(result1.isFocusedOnAnElement).toBe(false);

    const result2 = getElements(container, ".non-existent", element1);
    expect(result2.elements).toEqual([]);
    expect(result2.first).toBeUndefined();
    expect(result2.last).toBeUndefined();
    expect(result2.next).toBeUndefined();
    expect(result2.prev).toBeUndefined();
    expect(result2.current).toBeUndefined();
    expect(result2.isFocusedOnAnElement).toBe(false);
  });

  it("should return the correct elements when activeElement is the first element", () => {
    const result = getElements(container, "*", element1);
    expect(result.elements).toEqual([element1, element2, element3]);
    expect(result.first).toBe(element1);
    expect(result.last).toBe(element3);
    expect(result.next).toBe(element2);
    expect(result.prev).toBe(element3);
    expect(result.current).toBe(element1);
    expect(result.isFocusedOnAnElement).toBe(true);
  });

  it("should return the correct elements when activeElement is in the middle", () => {
    const result = getElements(container, "*", element2);
    expect(result.elements).toEqual([element1, element2, element3]);
    expect(result.first).toBe(element1);
    expect(result.last).toBe(element3);
    expect(result.next).toBe(element3);
    expect(result.prev).toBe(element1);
    expect(result.current).toBe(element2);
    expect(result.isFocusedOnAnElement).toBe(true);
  });

  it("should return the correct elements when activeElement is the last element", () => {
    const result = getElements(container, "*", element3);
    expect(result.elements).toEqual([element1, element2, element3]);
    expect(result.first).toBe(element1);
    expect(result.last).toBe(element3);
    expect(result.next).toBe(element1);
    expect(result.prev).toBe(element2);
    expect(result.current).toBe(element3);
    expect(result.isFocusedOnAnElement).toBe(true);
  });

  it("should handle cases where activeElement is not within the selected elements", () => {
    const extraElement = document.createElement("span");
    container.appendChild(extraElement);
    const result = getElements(container, "button, a, input", extraElement);
    expect(result.elements).toEqual([element1, element2, element3]);
    expect(result.first).toBe(element1);
    expect(result.last).toBe(element3);
    expect(result.next).toBe(element1);
    expect(result.prev).toBe(element3);
    expect(result.current).toBeUndefined();
    expect(result.isFocusedOnAnElement).toBe(false);
  });

  it("should work correctly with a different selector", () => {
    const result = getElements(container, "button, input", element1);
    expect(result.elements).toEqual([element1, element3]);
    expect(result.first).toBe(element1);
    expect(result.last).toBe(element3);
    expect(result.next).toBe(element3);
    expect(result.prev).toBe(element3);
    expect(result.current).toBe(element1);
    expect(result.isFocusedOnAnElement).toBe(true);
  });
});

describe("findNextTabStop", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <button id="btn1" tabindex="0">Button 1</button>
        <a id="link1" href="#" tabindex="1">Link 1</a>
        <input id="input1" tabindex="0" />
        <div id="nonTabbable">
          <button id="btn2" tabindex="-1">Button 2 (non-tabbable)</button>
        </div>
        <a id="link2" href="#" tabindex="2">Link 2</a>
      </div>
    `;
  });

  it("should return the next tabbable element in the document order", () => {
    const el1 = document.getElementById("btn1");
    const next1 = findNextTabStop(el1);
    expect(next1).toBe(document.getElementById("link1"));

    const el2 = document.getElementById("link1");
    const next2 = findNextTabStop(el2);
    expect(next2).toBe(document.getElementById("input1"));

    const el3 = document.getElementById("input1");
    const next3 = findNextTabStop(el3);
    expect(next3).toBe(document.getElementById("link2"));
  });

  it("should return the first tabbable element if the current element is the last one", () => {
    const el = document.getElementById("link2");
    const next = findNextTabStop(el);
    expect(next).toBe(document.getElementById("btn1"));
  });

  it("should return the first tabbable element if the provided element is not tabbable but exists in the universe", () => {
    const el = document.getElementById("btn2");
    const next = findNextTabStop(el);
    expect(next).toBe(document.getElementById("link2"));
  });

  it("should return the first tabbable element if the provided element is not in the document", () => {
    const el = document.createElement("div");
    const next = findNextTabStop(el);
    expect(next).toBe(document.getElementById("btn1"));
  });

  it("should use the provided tabbableSelector if given", () => {
    const el1 = document.getElementById("btn1");
    const next1 = findNextTabStop(el1, "a[href]");
    expect(next1).toBe(document.getElementById("link1"));

    const el2 = document.getElementById("link1");
    const next2 = findNextTabStop(el2, "a[href]");
    expect(next2).toBe(document.getElementById("link2"));

    const el3 = document.getElementById("link2");
    const next3 = findNextTabStop(el3, "a[href]");
    expect(next3).toBe(document.getElementById("link1"));
  });

  it("should handle cases with no tabbable elements", () => {
    document.body.innerHTML = "<div><span>Not tabbable</span></div>";
    const el = document.createElement("div");
    const next = findNextTabStop(el);
    expect(next).toBeUndefined();
  });
});

describe("findPrevTabStop", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <button id="btn1" tabindex="0">Button 1</button>
        <a id="link1" href="#" tabindex="1">Link 1</a>
        <input id="input1" tabindex="0" />
        <div id="nonTabbable">
          <button id="btn2" tabindex="-1">Button 2 (non-tabbable)</button>
        </div>
        <a id="link2" href="#" tabindex="2">Link 2</a>
      </div>
    `;
  });

  it("should return the previous tabbable element in the document order", () => {
    expect(findPrevTabStop(document.getElementById("link1"))).toBe(document.getElementById("btn1"));
    expect(findPrevTabStop(document.getElementById("input1"))).toBe(document.getElementById("link1"));
    expect(findPrevTabStop(document.getElementById("link2"))).toBe(document.getElementById("input1"));
  });

  it("should wrap around to the last tabbable element if the current element is the first one", () => {
    const el = document.getElementById("btn1");
    expect(findPrevTabStop(el)).toBe(document.getElementById("link2"));
  });

  it("should skip non-tabbable (tabindex -1) elements", () => {
    const el = document.getElementById("btn2");
    expect(findPrevTabStop(el)).toBe(document.getElementById("input1"));
  });

  it("should return the last tabbable element if the provided element is not in the document", () => {
    const el = document.createElement("div");
    expect(findPrevTabStop(el)).toBe(document.getElementById("link2"));
  });

  it("should use the provided tabbableSelector if given", () => {
    expect(findPrevTabStop(document.getElementById("link2"), "a[href]")).toBe(document.getElementById("link1"));
    expect(findPrevTabStop(document.getElementById("link1"), "a[href]")).toBe(document.getElementById("link2"));
  });

  it("should handle cases with no tabbable elements", () => {
    document.body.innerHTML = "<div><span>Not tabbable</span></div>";
    expect(findPrevTabStop(document.createElement("div"))).toBeUndefined();
  });
});
