import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import SearchForm from "./index";


describe("<SearchForm />", () => {
  function teardown() {
    cleanup();
  }

  it("renders correctly", () => {
    const { container } = render(<SearchForm onChange={jest.fn()} onSubmit={jest.fn()} />);
    expect(container.querySelector("input")).toBeInTheDocument();
    teardown();
  });

  it("renders with error", () => {
    const { container, rerender } = render(<SearchForm onChange={jest.fn()} onSubmit={jest.fn()} />);
    const input = () => container.querySelector("input");

    expect(container.querySelector(".error")).not.toBeInTheDocument();
    expect(input()).not.toHaveAttribute("aria-invalid");

    rerender(<SearchForm error={true} onChange={jest.fn()} onSubmit={jest.fn()} />);
    expect(container.querySelector(".error")).toBeInTheDocument();
    expect(input()).toHaveAttribute("aria-invalid", "true");

    rerender(<SearchForm error={false} onChange={jest.fn()} onSubmit={jest.fn()} />);
    expect(container.querySelector(".error")).not.toBeInTheDocument();
    expect(input()).not.toHaveAttribute("aria-invalid");
    teardown();
  });

  it("renders as disabled", () => {
    const { container, rerender } = render(<SearchForm disabled={false} onChange={jest.fn()} onSubmit={jest.fn()} />);
    const input = () => container.querySelector("input");

    expect(input()).not.toHaveAttribute("aria-disabled");

    rerender(<SearchForm disabled={true} onChange={jest.fn()} onSubmit={jest.fn()} />);
    expect(input()).toHaveAttribute("aria-disabled", "true");

    rerender(<SearchForm disabled={false} onChange={jest.fn()} onSubmit={jest.fn()} />);
    expect(input()).not.toHaveAttribute("aria-disabled");
    teardown();
  });

  it("renders with variants", () => {
    const { container, rerender } = render(<SearchForm onChange={jest.fn()} onSubmit={jest.fn()} />);

    expect(container.querySelector(".defaultContainer")).toBeInTheDocument();
    expect(container.querySelector(".underlineContainer")).not.toBeInTheDocument();

    rerender(<SearchForm theme="underline" onChange={jest.fn()} onSubmit={jest.fn()} />);
    expect(container.querySelector(".defaultContainer")).not.toBeInTheDocument();
    expect(container.querySelector(".underlineContainer")).toBeInTheDocument();
    teardown();
  });

  it("renders clear button only when value is set", () => {
    const { container, rerender } = render(
      <SearchForm value="value" onChange={jest.fn()} onSubmit={jest.fn()} />
    );
    const buttons = () => container.querySelectorAll("button");
    expect(buttons()).toHaveLength(2);

    rerender(<SearchForm value={undefined} onChange={jest.fn()} onSubmit={jest.fn()} />);
    expect(buttons()).toHaveLength(1);
    teardown();
  });

  it("triggers onChange correctly", () => {
    const onChange = jest.fn();
    const { container, rerender } = render(
      <SearchForm disabled={true} onChange={onChange} onSubmit={jest.fn()} />
    );
    fireEvent.change(container.querySelector("input"), { target: { value: "Initial value" } });
    expect(onChange).not.toHaveBeenCalled();

    rerender(<SearchForm disabled={false} onChange={onChange} onSubmit={jest.fn()} />);
    fireEvent.change(container.querySelector("input"), { target: { value: "Changed value" } });
    expect(onChange).toHaveBeenCalled();
    teardown();
  });

  it("calls onChange with empty value on clear", () => {
    const onClear = jest.fn();
    const { container } = render(
      <SearchForm value="value" onChange={onClear} onSubmit={jest.fn()} />
    );
    const buttons = container.querySelectorAll("button");
    fireEvent.click(buttons[0]);
    expect(onClear).toHaveBeenCalled();
    teardown();
  });

  it("tracks focus and blur state", () => {
    const { container } = render(<SearchForm onChange={jest.fn()} onSubmit={jest.fn()} />);
    const input = container.querySelector("input");

    fireEvent.focus(input);
    expect(container.querySelector(".isFocused")).toBeInTheDocument();

    fireEvent.blur(input);
    expect(container.querySelector(".isFocused")).not.toBeInTheDocument();
    teardown();
  });
});
