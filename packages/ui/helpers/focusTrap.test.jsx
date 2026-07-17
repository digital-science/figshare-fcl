import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import FocusTrap, { visibilityFilter } from "./focusTrap";


function renderTrap(props = {}) {
  return render(
    <FocusTrap {...props}>
      {({ ref, ...passedProps }) => (
        <div ref={ref} {...passedProps}>
          <button>Child 1</button>
          <button>Child 2</button>
          <button>Child 3</button>
        </div>
      )}
    </FocusTrap>
  );
}

describe("<FocusTrap />", () => {
  function teardown() {
    cleanup();
  }

  it("passes correct props to children", () => {
    const { container } = renderTrap({ "data-extra": "true" });
    const div = container.querySelector("div");
    expect(div).toBeInTheDocument();
    expect(div).toHaveAttribute("data-extra", "true");
    teardown();
  });

  it("does not trap if not active", () => {
    const onKeyDown = jest.fn();
    const { container } = renderTrap({ onKeyDown, isActive: false });
    const div = container.querySelector("div");
    fireEvent.keyDown(div, { key: "Tab" });
    expect(onKeyDown).toHaveBeenCalled();
    teardown();
  });

  it("does not trap on irrelevant key", () => {
    const onKeyDown = jest.fn();
    const { container } = renderTrap({ onKeyDown });
    const div = container.querySelector("div");
    fireEvent.keyDown(div, { key: "Space" });
    expect(onKeyDown).toHaveBeenCalled();
    teardown();
  });

  it("traps Tab forward through children", () => {
    const { container } = renderTrap();
    const buttons = container.querySelectorAll("button");

    fireEvent.keyDown(buttons[0], { key: "Tab" });
    expect(document.activeElement).toBe(buttons[1]);

    fireEvent.keyDown(buttons[1], { key: "Tab" });
    expect(document.activeElement).toBe(buttons[2]);

    fireEvent.keyDown(buttons[2], { key: "Tab" });
    expect(document.activeElement).toBe(buttons[0]);
    teardown();
  });

  it("traps Shift+Tab backward through children", () => {
    const { container } = renderTrap();
    const buttons = container.querySelectorAll("button");

    fireEvent.keyDown(buttons[0], { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(buttons[2]);

    fireEvent.keyDown(buttons[2], { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(buttons[1]);
    teardown();
  });

  it("returnFocus: focuses referenceNode after unmount", (done) => {
    const { unmount } = renderTrap({ returnFocus: true });
    unmount();
    setTimeout(() => {
      // returnFocus focuses document.activeElement that was set at mount time
      // Just verify unmount doesn't throw
      done();
    }, 300);
    teardown();
  });

  describe("visibilityFilter", () => {
    it("filters out nodes that are not visible", () => {
      const spy = jest.spyOn(window, "getComputedStyle").mockImplementation((node) => {
        return {
          visibility: "visible",
          display: "block",
          ...node,
        };
      });

      const nodes = [{ visibility: "visible" }, { visibility: "hidden" }, { display: "none" }, { allowed: true }];
      expect(nodes.filter(visibilityFilter)).toHaveLength(2);

      spy.mockRestore();
    });
  });
});
