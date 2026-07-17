import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Base from "./base";


describe("<Base />", () => {
  function setup({ mobile = false } = {}) {
    const scope = {
      props: { children: "Click me" },
      createEventSpy: jest.spyOn(document, "createEvent").mockImplementation((type) => {
        if (type === "TouchEvent") {
          if (mobile) {
            return undefined;
          }
          throw Error("Desktop");
        }

        return Document.prototype.createEvent.call(document, type);
      }),
    };
    scope.run = () => {
      scope.wrapper = render(<Base {...scope.props} />);
    };

    return scope;
  }

  function teardown(scope) {
    scope.createEventSpy.mockRestore();
    cleanup();
  }

  it("renders <button /> when no href is passed", () => {
    const scope = setup();
    scope.run();

    expect(scope.wrapper.getByRole("button")).toHaveAttribute("type", "button");

    scope.wrapper.rerender(<Base type="submit">Click me</Base>);
    expect(scope.wrapper.getByRole("button")).toHaveAttribute("type", "submit");

    teardown(scope);
  });

  it("renders <a /> when href is passed", () => {
    const scope = setup();
    scope.props.href = "#";
    scope.run();

    expect(scope.wrapper.getByRole("link")).toHaveAttribute("href", "#");

    scope.wrapper.rerender(<Base href="#" rel="fakeRel" target="_blank">Click me</Base>);
    const link = scope.wrapper.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "fakeRel");

    teardown(scope);
  });

  it("does not call onClick when disabled", () => {
    const scope = setup();
    scope.props.disabled = true;
    scope.props.onClick = jest.fn();
    scope.run();

    const btn = scope.wrapper.getByRole("button");
    expect(btn).toHaveAttribute("aria-disabled", "true");

    fireEvent.click(btn);
    expect(scope.props.onClick).not.toHaveBeenCalled();

    teardown(scope);
  });

  it("doesn't prevent default onClick when not disabled", () => {
    const scope = setup();
    scope.props.onClick = jest.fn();
    scope.run();

    expect(scope.wrapper.getByRole("button")).not.toHaveAttribute("aria-disabled");

    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    fireEvent(scope.wrapper.getByRole("button"), event);
    expect(scope.props.onClick).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);

    teardown(scope);
  });

  describe("on mobile", () => {
    it("triggers long press if delay reached", () => {
      jest.useFakeTimers("modern");
      const scope = setup({ mobile: true });
      scope.props.onLongPress = jest.fn();
      scope.run();

      fireEvent.touchStart(scope.wrapper.getByRole("button"));
      jest.runOnlyPendingTimers();
      expect(scope.props.onLongPress).toHaveBeenCalled();

      jest.useRealTimers();
      teardown(scope);
    });

    it("doesn't trigger long press if delay not reached", () => {
      jest.useFakeTimers("modern");
      const scope = setup({ mobile: true });
      scope.props.onLongPress = jest.fn();
      scope.run();

      const btn = scope.wrapper.getByRole("button");
      fireEvent.touchStart(btn);
      expect(jest.getTimerCount()).toEqual(1);

      fireEvent.touchEnd(btn);
      expect(jest.getTimerCount()).toEqual(0);
      expect(scope.props.onLongPress).not.toHaveBeenCalled();

      fireEvent.touchStart(btn);
      fireEvent.touchCancel(btn);
      expect(jest.getTimerCount()).toEqual(0);
      expect(scope.props.onLongPress).not.toHaveBeenCalled();

      jest.useRealTimers();
      teardown(scope);
    });

    it("doesn't trigger long press if touch moved", () => {
      jest.useFakeTimers("modern");
      const scope = setup({ mobile: true });
      scope.props.onLongPress = jest.fn();
      scope.run();

      const btn = scope.wrapper.getByRole("button");
      fireEvent.touchStart(btn);
      fireEvent.touchMove(btn);
      jest.runOnlyPendingTimers();
      expect(scope.props.onLongPress).not.toHaveBeenCalled();

      jest.useRealTimers();
      teardown(scope);
    });

    it("clears timeout if component is unmounted before delay reached", () => {
      jest.useFakeTimers("modern");
      const scope = setup({ mobile: true });
      scope.props.onLongPress = jest.fn();
      scope.run();

      fireEvent.touchStart(scope.wrapper.getByRole("button"));
      expect(jest.getTimerCount()).toEqual(1);

      scope.wrapper.unmount();
      expect(jest.getTimerCount()).toEqual(0);
      expect(scope.props.onLongPress).not.toHaveBeenCalled();

      jest.useRealTimers();
      teardown(scope);
    });
  });
});
