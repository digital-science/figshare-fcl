import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import FocusNavigation from "./focusNavigation";


function renderNav(props = {}) {
  return render(
    <FocusNavigation {...props}>
      {({ ref, ...passedProps }) => (
        <div ref={ref} {...passedProps}>
          <button>Child 1</button>
          <button>Child 2</button>
          <button>Child 3</button>
        </div>
      )}
    </FocusNavigation>
  );
}

describe("<FocusNavigation />", () => {
  function teardown() {
    cleanup();
  }

  it("passes correct props to children", () => {
    const { container } = renderNav({ "data-extra": "true" });
    const div = container.querySelector("div");
    expect(div).toBeInTheDocument();
    expect(div).toHaveAttribute("data-extra", "true");
    teardown();
  });

  it("does not navigate if not active", () => {
    const onKeyDown = jest.fn();
    const { container } = renderNav({ onKeyDown, isActive: false });
    const div = container.querySelector("div");
    fireEvent.keyDown(div, { key: "Home" });
    expect(onKeyDown).toHaveBeenCalled();
    expect(document.activeElement).not.toBe(container.querySelectorAll("button")[0]);
    teardown();
  });

  it("does not navigate on irrelevant key", () => {
    const onKeyDown = jest.fn();
    const { container } = renderNav({ onKeyDown });
    const div = container.querySelector("div");
    fireEvent.keyDown(div, { key: "Space" });
    expect(onKeyDown).toHaveBeenCalled();
    teardown();
  });

  it("navigates to first child on Home", () => {
    const { container } = renderNav();
    const buttons = container.querySelectorAll("button");
    fireEvent.keyDown(buttons[1], { key: "Home" });
    expect(document.activeElement).toBe(buttons[0]);
    teardown();
  });

  it("navigates to last child on End", () => {
    const { container } = renderNav();
    const buttons = container.querySelectorAll("button");
    fireEvent.keyDown(buttons[0], { key: "End" });
    expect(document.activeElement).toBe(buttons[2]);
    teardown();
  });

  it("navigates with ArrowRight/ArrowLeft in horizontal mode", () => {
    const { container } = renderNav({ navigationType: "horizontal" });
    const buttons = container.querySelectorAll("button");

    fireEvent.keyDown(buttons[0], { key: "ArrowRight" });
    expect(document.activeElement).toBe(buttons[1]);

    fireEvent.keyDown(buttons[1], { key: "ArrowLeft" });
    expect(document.activeElement).toBe(buttons[0]);
    teardown();
  });

  it("navigates with ArrowDown/ArrowUp in vertical mode", () => {
    const { container } = renderNav({ navigationType: "vertical" });
    const buttons = container.querySelectorAll("button");

    fireEvent.keyDown(buttons[0], { key: "ArrowDown" });
    expect(document.activeElement).toBe(buttons[1]);

    fireEvent.keyDown(buttons[1], { key: "ArrowUp" });
    expect(document.activeElement).toBe(buttons[0]);
    teardown();
  });

  it("sets correct tabIndex on target with timer", () => {
    jest.useFakeTimers();
    const { container } = renderNav();
    const buttons = container.querySelectorAll("button");

    expect(buttons[1].tabIndex).toBe(-1);
    fireEvent.keyDown(buttons[0], { key: "ArrowDown" });
    expect(buttons[1].tabIndex).toBe(0);
    jest.runAllTimers();
    expect(buttons[1].tabIndex).toBe(-1);
    jest.useRealTimers();
    teardown();
  });
});
