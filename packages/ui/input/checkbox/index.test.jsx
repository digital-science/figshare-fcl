import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Checkbox from "./index";


describe("<Checkbox />", () => {
  function teardown() {
    cleanup();
  }

  it("renders", () => {
    const { container } = render(<Checkbox />);
    expect(container.firstChild).toBeInTheDocument();
    teardown();
  });

  it("correctly applies icon variants", () => {
    const { container, rerender } = render(<Checkbox />);
    expect(container.querySelector("input[type='checkbox']")).toBeInTheDocument();

    rerender(<Checkbox variant="switch" />);
    expect(container.querySelector(".switch")).toBeInTheDocument();

    rerender(<Checkbox variant="checkbox" />);
    expect(container.querySelector("input[type='checkbox']")).toBeInTheDocument();
    teardown();
  });

  it("correctly applies disabled props", () => {
    const { container, rerender } = render(<Checkbox disabled={true} />);
    expect(container.querySelector("input")).toHaveAttribute("aria-disabled", "true");

    rerender(<Checkbox disabled={false} />);
    expect(container.querySelector("input")).not.toHaveAttribute("aria-disabled");
    teardown();
  });

  it("correctly applies error props", () => {
    const { container, rerender } = render(<Checkbox error={true} />);
    expect(container.querySelector("input")).toHaveAttribute("aria-invalid", "true");

    rerender(<Checkbox error={false} />);
    expect(container.querySelector("input")).not.toHaveAttribute("aria-invalid");
    teardown();
  });

  it("does not trigger onChange if disabled", () => {
    const onChange = jest.fn();
    const { container } = render(<Checkbox disabled={true} onChange={onChange} />);
    fireEvent.click(container.querySelector("input"));
    expect(onChange).not.toHaveBeenCalled();
    teardown();
  });

  it("correctly triggers onChange", () => {
    const onChange = jest.fn();
    const { container } = render(<Checkbox onChange={onChange} />);
    fireEvent.click(container.querySelector("input"));
    expect(onChange).toHaveBeenCalled();
    teardown();
  });
});
