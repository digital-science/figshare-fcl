import { renderHook, act } from "@testing-library/react-hooks";
import { debounce } from "utils/debounce";

import { useGetElementBounds } from "./useGetElementBounds";

// Mock debounce function
jest.mock("utils/debounce", () => {
  return { debounce: jest.fn((func) => func) };
});

describe("useGetElementBounds", () => {
  // eslint-disable-next-line init-declarations
  let element;

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
    jest.clearAllMocks();
  });

  it("should initialize box with zero values", () => {
    const { result } = renderHook(() => useGetElementBounds(element));
    expect(result.current.box).toEqual({ width: 0, height: 0, x: 0, y: 0, left: 0, top: 0, right: 0, bottom: 0 });
  });

  it("should update box with element bounds on mount", () => {
    const mockRect = { width: 100, height: 50, x: 10, y: 20, left: 10, top: 20, right: 110, bottom: 70 };
    element.getBoundingClientRect = jest.fn(() => mockRect);

    const { result } = renderHook(() => useGetElementBounds(element));

    expect(result.current.box).toEqual(mockRect);
    expect(result.current.info.current.computed).toBe(true);
    expect(result.current.info.current.resized).toBe(false);
  });

  it("should update elementRef when element prop changes", () => {
    const element2 = document.createElement("span");
    document.body.appendChild(element2);

    const { result, rerender } = renderHook(
      // eslint-disable-next-line no-shadow
      ({ element }) => useGetElementBounds(element), { initialProps: { element } }
    );

    expect(result.current.elementRef.current).toBe(element);

    rerender({ element: element2 });

    expect(result.current.elementRef.current).toBe(element2);
    document.body.removeChild(element2);
  });

  it("should update box on window resize", () => {
    const mockRect = { width: 200, height: 100, x: 30, y: 40, left: 30, top: 40, right: 230, bottom: 140 };
    element.getBoundingClientRect = jest.fn(() => mockRect);

    const { result } = renderHook(() => useGetElementBounds(element));

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.box).toEqual(mockRect);
    expect(result.current.info.current.resized).toBe(true);
  });

  it("should use the provided resizeDelay for debounce", () => {
    const resizeDelay = 500;
    const mockRect = { width: 200, height: 100, x: 30, y: 40, left: 30, top: 40, right: 230, bottom: 140 };
    element.getBoundingClientRect = jest.fn(() => mockRect);

    renderHook(() => useGetElementBounds(element, resizeDelay));

    expect(debounce).toHaveBeenCalledWith(expect.any(Function), resizeDelay);
  });
});
