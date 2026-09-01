
import { renderHook, act } from "@testing-library/react-hooks";
import { useEffect, useLayoutEffect, useRef } from "react";

import { useEventListener, useIsomorphicLayoutEffect } from "./useEventListener";


describe("useEventListener", () => {
  const originalWindow = global.window;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.window = originalWindow;
  });

  it("should add and remove event listener on document.body by default", () => {
    const addEventListenerSpy = jest.spyOn(document.body, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(document.body, "removeEventListener");
    const handler = jest.fn();

    const { unmount } = renderHook(() => useEventListener("click", handler));

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith("click", expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith("click", expect.any(Function));
  });

  it("should add and remove event listener on a specified element", () => {
    const element = document.createElement("div");
    const addEventListenerSpy = jest.spyOn(element, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(element, "removeEventListener");
    const handler = jest.fn();

    const { unmount } = renderHook(() => useEventListener("scroll", handler, element));

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("should call the handler when the event is triggered", () => {
    const element = document.createElement("div");
    const handler = jest.fn();

    renderHook(() => useEventListener("customEvent", handler, element));

    act(() => {
      element.dispatchEvent(new Event("customEvent"));
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should update the callback when the handler changes", () => {
    const element = document.createElement("div");
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    const { rerender } = renderHook(
      ({ handler }) => useEventListener("change", handler, element), { initialProps: { handler: handler1 } }
    );

    act(() => {
      element.dispatchEvent(new Event("change"));
    });

    expect(handler1).toHaveBeenCalledTimes(1);

    rerender({ handler: handler2 });

    act(() => {
      element.dispatchEvent(new Event("change"));
    });

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});
