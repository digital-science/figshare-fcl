import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import FocusRedirect from "./focusRedirect";


function renderRedirect(props = {}) {
  return render(
    <FocusRedirect {...props}>
      {({ ref, ...passedProps }) => (
        <div ref={ref} {...passedProps}>
          <button>Child 1</button>
          <button>Child 2</button>
          <button>Child 3</button>
        </div>
      )}
    </FocusRedirect>
  );
}

describe("<FocusRedirect />", () => {
  function teardown() {
    cleanup();
  }

  it("passes correct props to children", () => {
    const { container } = renderRedirect({ "data-extra": "true" });
    const div = container.querySelector("div");
    expect(div).toBeInTheDocument();
    expect(div).toHaveAttribute("data-extra", "true");
    expect(div).toHaveAttribute("tabindex");
    teardown();
  });

  it("applies correct tabIndex", () => {
    const { container, rerender } = renderRedirect({ isActive: false });
    const div = container.querySelector("div");
    expect(div.tabIndex).toBe(-1);

    rerender(
      <FocusRedirect isActive={true}>
        {({ ref, ...passedProps }) => (
          <div ref={ref} {...passedProps}>
            <button>Child 1</button>
          </div>
        )}
      </FocusRedirect>
    );
    expect(div.tabIndex).toBe(0);
    teardown();
  });

  it("correctly calls onKeyDown: Shift+Tab sets tabIndex -1 then restores", () => {
    jest.useFakeTimers();
    const onKeyDown = jest.fn();
    const { container } = renderRedirect({ onKeyDown });
    const div = container.querySelector("div");

    expect(div.tabIndex).toBe(0);
    fireEvent.keyDown(div, { key: "Tab", target: div });
    expect(onKeyDown).toHaveBeenCalled();
    expect(div.tabIndex).toBe(0);

    fireEvent.keyDown(div, { key: "Tab", shiftKey: true, target: div });
    expect(div.tabIndex).toBe(-1);
    jest.runAllTimers();
    expect(div.tabIndex).toBe(0);

    jest.useRealTimers();
    teardown();
  });

  it("correctly calls onMouseDown", () => {
    const onMouseDown = jest.fn();
    const { container } = renderRedirect({ onMouseDown });
    const div = container.querySelector("div");
    const btn = container.querySelector("button");

    fireEvent.mouseDown(btn);
    expect(onMouseDown).toHaveBeenCalled();

    fireEvent.mouseDown(div);
    expect(onMouseDown).toHaveBeenCalledTimes(2);
    teardown();
  });

  it("correctly calls onFocus: redirects focus to first child when container is focused", () => {
    const onFocus = jest.fn();
    const { container } = renderRedirect({ onFocus });
    const div = container.querySelector("div");
    const firstBtn = container.querySelector("button");

    fireEvent.focus(firstBtn, { target: firstBtn });
    expect(onFocus).not.toHaveBeenCalled();

    div.focus();
    expect(document.activeElement).toBe(firstBtn);
    expect(onFocus).toHaveBeenCalled();
    teardown();
  });
});
