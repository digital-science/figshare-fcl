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
    variant: "secondary",
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
});
