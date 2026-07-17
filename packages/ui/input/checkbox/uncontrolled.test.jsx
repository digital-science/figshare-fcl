import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { UncontrolledCheckbox } from "./index";


describe("<UncontrolledCheckbox />", () => {
  function teardown() {
    cleanup();
  }

  it("renders with initial checked state", () => {
    const { container } = render(<UncontrolledCheckbox checked={false} onChange={jest.fn()} />);
    expect(container.querySelector("input")).not.toBeChecked();
    teardown();
  });

  it("toggles checked state on change", () => {
    const onChange = jest.fn();
    const { container } = render(<UncontrolledCheckbox checked={false} onChange={onChange} />);
    const input = container.querySelector("input");

    expect(input).not.toBeChecked();

    fireEvent.click(input);
    expect(input).toBeChecked();
    expect(onChange).toHaveBeenCalled();

    fireEvent.click(input);
    expect(input).not.toBeChecked();
    teardown();
  });
});
