import React from "react";
import { render, cleanup } from "@testing-library/react";

import Password from "./index";


describe("<Password />", () => {
  function teardown() {
    cleanup();
  }

  it("renders", () => {
    const { container } = render(<Password onChange={jest.fn()} />);
    expect(container.querySelector("input")).toBeInTheDocument();
    teardown();
  });

  it("renders with error", () => {
    const { container, rerender } = render(<Password onChange={jest.fn()} />);
    const input = () => container.querySelector("input");

    expect(container.querySelector(".error")).not.toBeInTheDocument();
    expect(input()).not.toHaveAttribute("aria-invalid");

    rerender(<Password error={true} onChange={jest.fn()} />);
    expect(container.querySelector(".error")).toBeInTheDocument();
    expect(input()).toHaveAttribute("aria-invalid", "true");

    rerender(<Password error={false} onChange={jest.fn()} />);
    expect(container.querySelector(".error")).not.toBeInTheDocument();
    expect(input()).not.toHaveAttribute("aria-invalid");
    teardown();
  });

  it("renders with variants", () => {
    const { container, rerender } = render(<Password onChange={jest.fn()} />);

    expect(container.querySelector(".underlineTheme")).not.toBeInTheDocument();
    expect(container.querySelector(".defaultTheme")).toBeInTheDocument();

    rerender(<Password theme="underline" onChange={jest.fn()} />);
    expect(container.querySelector(".underlineTheme")).toBeInTheDocument();
    expect(container.querySelector(".defaultTheme")).not.toBeInTheDocument();
    teardown();
  });

  it("toggles password visibility", () => {
    const { container } = render(<Password onChange={jest.fn()} />);
    const input = container.querySelector("input");
    expect(input.type).toBe("password");

    const toggleButton = container.querySelector("button");
    toggleButton.click();
    expect(input.type).toBe("text");

    toggleButton.click();
    expect(input.type).toBe("password");
    teardown();
  });

  it("does not toggle visibility when disabled", () => {
    const { container } = render(<Password disabled={true} onChange={jest.fn()} />);
    const input = container.querySelector("input");
    expect(input.type).toBe("password");

    const toggleButton = container.querySelector("button");
    toggleButton.click();
    expect(input.type).toBe("password");
    teardown();
  });
});
