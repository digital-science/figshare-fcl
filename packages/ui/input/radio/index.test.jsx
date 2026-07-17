import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Radio from "./index";


describe("<Radio />", () => {
  function teardown() {
    cleanup();
  }

  it("renders without crashing", () => {
    const { container } = render(<Radio />);
    expect(container.firstChild).toBeInTheDocument();
    teardown();
  });

  it("should apply the checked prop correctly", () => {
    const { container } = render(<Radio checked={true} onChange={jest.fn()} />);
    expect(container.querySelector("input[type='radio']")).toBeChecked();
    teardown();
  });

  it("should apply the disabled prop correctly", () => {
    const { container } = render(<Radio disabled={true} />);
    expect(container.querySelector("input[type='radio']")).toBeDisabled();
    teardown();
  });

  it("should call onChange when radio button is changed", () => {
    const onChange = jest.fn();
    const { container } = render(<Radio onChange={onChange} />);
    fireEvent.click(container.querySelector("input[type='radio']"));
    expect(onChange).toHaveBeenCalledTimes(1);
    teardown();
  });

  it("should not call onChange when not provided", () => {
    const { container } = render(<Radio value="option1" />);
    expect(() => {
      fireEvent.change(container.querySelector("input"), { target: { value: "option1" } });
    }).not.toThrow();
    teardown();
  });
});
