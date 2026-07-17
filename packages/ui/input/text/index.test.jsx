import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import TextInput from "./index";


describe("<Text />", () => {
  function teardown() {
    cleanup();
  }

  it("renders inline", () => {
    const { container } = render(<TextInput />);
    expect(container.querySelector("input")).toBeInTheDocument();
    teardown();
  });

  it("renders with error", () => {
    const { container, rerender } = render(<TextInput />);
    const input = () => container.querySelector("input");

    expect(container.querySelector(".error")).not.toBeInTheDocument();
    expect(input()).not.toHaveAttribute("aria-invalid");

    rerender(<TextInput error={true} />);
    expect(container.querySelector(".error")).toBeInTheDocument();
    expect(input()).toHaveAttribute("aria-invalid", "true");

    rerender(<TextInput error={false} />);
    expect(container.querySelector(".error")).not.toBeInTheDocument();
    expect(input()).not.toHaveAttribute("aria-invalid");
    teardown();
  });

  it("renders as disabled", () => {
    const { container, rerender } = render(<TextInput disabled={false} />);
    const input = () => container.querySelector("input");

    expect(input()).not.toHaveAttribute("aria-disabled");

    rerender(<TextInput disabled={true} />);
    expect(input()).toHaveAttribute("aria-disabled", "true");

    rerender(<TextInput disabled={false} />);
    expect(input()).not.toHaveAttribute("aria-disabled");
    teardown();
  });

  it("renders with variants", () => {
    const { container, rerender } = render(<TextInput />);

    expect(container.querySelector(".underlineTheme")).not.toBeInTheDocument();
    expect(container.querySelector(".defaultTheme")).toBeInTheDocument();

    rerender(<TextInput theme="underline" />);
    expect(container.querySelector(".underlineTheme")).toBeInTheDocument();
    expect(container.querySelector(".defaultTheme")).not.toBeInTheDocument();
    teardown();
  });

  it("triggers onChange correctly", () => {
    const onChange = jest.fn();
    const { container, rerender } = render(<TextInput disabled={false} onChange={onChange} />);

    fireEvent.change(container.querySelector("input"), { target: { value: "test" } });
    expect(onChange).toHaveBeenCalled();

    rerender(<TextInput disabled={true} onChange={onChange} />);
    onChange.mockClear();
    fireEvent.change(container.querySelector("input"), { target: { value: "test" } });
    expect(onChange).not.toHaveBeenCalled();
    teardown();
  });

  it("changes input direction on text change", () => {
    const onChange = jest.fn();
    const { container } = render(<TextInput disabled={false} onChange={onChange} />);
    const input = container.querySelector("input");

    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveAttribute("dir", "ltr");

    fireEvent.change(input, { target: { value: "\u0591" } });
    expect(input).toHaveAttribute("dir", "rtl");
    teardown();
  });

  it("triggers focus and blur correctly", () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const { container } = render(<TextInput onBlur={onBlur} onFocus={onFocus} />);
    const input = container.querySelector("input");

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
    teardown();
  });
});
