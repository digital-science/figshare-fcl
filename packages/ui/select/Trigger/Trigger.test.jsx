import React from "react";
import { render, cleanup } from "@testing-library/react";

import DropdownContext from "../../dropdown/context";
import SelectContext from "../context";

import { Trigger } from "./Trigger";


describe("Trigger component", () => {
  function teardown() {
    cleanup();
  }

  const defaultProps = {
    children: "Select",
    ariaLabel: "Select",
    id: "test-id",
    kind: "secondary",
    em: "low",
  };

  it("should render without crashing", () => {
    const { container } = render(
      <DropdownContext.Provider value={ { isVisible: false, onToggle: jest.fn(), toggleRef: { current: null } } }>
        <SelectContext.Provider value={ { size: "M" } }>
          <Trigger {...defaultProps} />
        </SelectContext.Provider>
      </DropdownContext.Provider>
    );
    expect(container.firstChild).toBeInTheDocument();
    teardown();
  });

  function renderTrigger(props) {
    return render(
      <DropdownContext.Provider value={ { isVisible: false, onToggle: jest.fn(), toggleRef: { current: null } } }>
        <SelectContext.Provider value={ { size: "M" } }>
          <Trigger {...defaultProps} {...props} />
        </SelectContext.Provider>
      </DropdownContext.Provider>
    );
  }

  it("should only render the caret slot when onClear is not provided", () => {
    const { container } = renderTrigger();

    const slots = container.querySelectorAll("[data-part=\"button-icon-group-icon-slot\"]");
    expect(slots).toHaveLength(1);
    expect(slots[0]).not.toBeEmptyDOMElement();
    teardown();
  });

  it("should render the clear and caret slots when onClear is provided", () => {
    const { container } = renderTrigger({ onClear: jest.fn() });

    const slots = container.querySelectorAll("[data-part=\"button-icon-group-icon-slot\"]");
    expect(slots).toHaveLength(2);
    teardown();
  });

  it("should render the button with span full by default", () => {
    const { container } = renderTrigger();

    expect(container.querySelector("[data-id=\"select-trigger-btn\"]")).toHaveAttribute("data-span", "full");
    teardown();
  });

  it("should pass the span prop to the button", () => {
    const { container } = renderTrigger({ span: "content" });

    expect(container.querySelector("[data-id=\"select-trigger-btn\"]")).toHaveAttribute("data-span", "content");
    teardown();
  });
});
