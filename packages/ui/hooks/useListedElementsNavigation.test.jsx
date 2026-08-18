/* eslint-disable init-declarations */
/* eslint-disable no-unused-vars */
import { renderHook, act } from "@testing-library/react-hooks";
import { getElements, focusOnElement, findNextTabStop, TABBABLE_SELECTOR } from "utils/dom";

import { useListedElementsNavigation } from "./useListedElementsNavigation";

// Mock utils/dom
jest.mock("utils/dom", () => {
  return {
    getElements: jest.fn(),
    focusOnElement: jest.fn(),
    findNextTabStop: jest.fn(),
    TABBABLE_SELECTOR: ".tabbable",
  };
});

// Mock @digital-science/figshare-fcl/helpers guard function.
jest.mock("@digital-science/figshare-fcl/helpers", () => {
  return { guard: (fn) => fn() };
});

describe("useListedElementsNavigation", () => {
  let container;
  let elements;
  let onKeyDownProvided;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    elements = {
      first: document.createElement("div"),
      last: document.createElement("div"),
      next: document.createElement("div"),
      prev: document.createElement("div"),
      current: null,
      isFocusedOnAnElement: false,
    };

    getElements.mockReturnValue(elements);
    focusOnElement.mockClear();
    findNextTabStop.mockReturnValue(document.createElement("div"));
    onKeyDownProvided = jest.fn();
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  it("should return ref and onKeyDown props", () => {
    const { result } = renderHook(() => useListedElementsNavigation());
    expect(result.current).toHaveProperty("ref");
    expect(result.current).toHaveProperty("onKeyDown");
  });

  it("should call onKeyDownProvided if provided", () => {
    const { result } = renderHook(() => useListedElementsNavigation({ onKeyDown: onKeyDownProvided }));
    act(() => {
      result.current.onKeyDown({ currentTarget: container, key: "Enter" });
    });
    expect(onKeyDownProvided).toHaveBeenCalled();
  });

  it("should not call the other functionality if event.defaultPrevented is true", () => {
    const event = { currentTarget: container, key: "Enter", defaultPrevented: true };
    const { result } = renderHook(() => useListedElementsNavigation({ onKeyDown: onKeyDownProvided }));
    act(() => {
      result.current.onKeyDown(event);
    });
    expect(focusOnElement).not.toHaveBeenCalled();
  });

  it("should focus on first element on Escape key", () => {
    const { result } = renderHook(() => useListedElementsNavigation());
    act(() => {
      result.current.onKeyDown({ currentTarget: container, key: "Escape" });
    });
    expect(focusOnElement).toHaveBeenCalledWith(elements.first);
  });

  it("should focus on next element on ArrowRight key (horizontal)", () => {
    container.setAttribute("aria-orientation", "horizontal");
    elements.isFocusedOnAnElement = true;
    const { result } = renderHook(() => useListedElementsNavigation());
    act(() => {
      result.current.onKeyDown({ currentTarget: container, key: "ArrowRight" });
    });
    expect(focusOnElement).toHaveBeenCalledWith(elements.next);
  });

  it("should focus on previous element on ArrowLeft key (horizontal)", () => {
    container.setAttribute("aria-orientation", "horizontal");
    elements.isFocusedOnAnElement = true;
    const { result } = renderHook(() => useListedElementsNavigation());
    act(() => {
      result.current.onKeyDown({ currentTarget: container, key: "ArrowLeft" });
    });
    expect(focusOnElement).toHaveBeenCalledWith(elements.prev);
  });

  it("should focus on next element on ArrowUp key (vertical)", () => {
    container.setAttribute("aria-orientation", "vertical");
    elements.isFocusedOnAnElement = true;
    const { result } = renderHook(() => useListedElementsNavigation());
    act(() => {
      result.current.onKeyDown({ currentTarget: container, key: "ArrowUp" });
    });
    expect(focusOnElement).toHaveBeenCalledWith(elements.next);
  });

  it("should focus on previous element on ArrowDown key (vertical)", () => {
    container.setAttribute("aria-orientation", "vertical");
    elements.isFocusedOnAnElement = true;
    const { result } = renderHook(() => useListedElementsNavigation());
    act(() => {
      result.current.onKeyDown({ currentTarget: container, key: "ArrowDown" });
    });
    expect(focusOnElement).toHaveBeenCalledWith(elements.prev);
  });

  it("should focus on first element on Home key", () => {
    const { result } = renderHook(() => useListedElementsNavigation());
    act(() => {
      result.current.onKeyDown({ currentTarget: container, key: "Home" });
    });
    expect(focusOnElement).toHaveBeenCalledWith(elements.first);
  });

  it("should focus on last element on End key", () => {
    const { result } = renderHook(() => useListedElementsNavigation());
    act(() => {
      result.current.onKeyDown({ currentTarget: container, key: "End" });
    });
    expect(focusOnElement).toHaveBeenCalledWith(elements.last);
  });

  it("should focus on next tabbable element on Tab key", () => {
    elements.isFocusedOnAnElement = true;
    elements.current = document.createElement("div");
    elements.last = document.createElement("div");
    const { result } = renderHook(() => useListedElementsNavigation());
    act(() => {
      result.current.onKeyDown({ currentTarget: container, key: "Tab", shiftKey: false });
    });
    expect(findNextTabStop).toHaveBeenCalled();
    expect(focusOnElement).toHaveBeenCalled();
  });

  it("should focus on first element on Shift+Tab key", () => {
    elements.isFocusedOnAnElement = true;
    elements.current = document.createElement("div");
    elements.first = document.createElement("div");
    const { result } = renderHook(() => useListedElementsNavigation());
    act(() => {
      result.current.onKeyDown({ currentTarget: container, key: "Tab", shiftKey: true });
    });
    expect(focusOnElement).toHaveBeenCalledWith(elements.first);
  });
});
