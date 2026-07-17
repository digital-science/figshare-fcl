import React from "react";
import { render, cleanup } from "@testing-library/react";

import Checkmark from "./checkmark";


describe("<Checkmark />", () => {
  function teardown() {
    cleanup();
  }

  it("renders correctly with no props", () => {
    const { container } = render(<Checkmark />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("checkmark");
    expect(svg).not.toHaveClass("checked");
    expect(svg).not.toHaveClass("disabled");
    teardown();
  });

  it("renders in alt theme", () => {
    const { container, rerender } = render(<Checkmark theme="alt" />);
    expect(container.querySelector("svg")).toHaveClass("alt");

    rerender(<Checkmark />);
    expect(container.querySelector("svg")).not.toHaveClass("alt");
    teardown();
  });

  it("renders in error state", () => {
    const { container, rerender } = render(<Checkmark error={true} />);
    expect(container.querySelector("svg")).toHaveClass("error");

    rerender(<Checkmark error={false} />);
    expect(container.querySelector("svg")).not.toHaveClass("error");
    teardown();
  });

  it("renders in disabled state", () => {
    const { container, rerender } = render(<Checkmark disabled={true} />);
    expect(container.querySelector("svg")).toHaveClass("disabled");

    rerender(<Checkmark disabled={false} />);
    expect(container.querySelector("svg")).not.toHaveClass("disabled");
    teardown();
  });

  it("renders in all check states", () => {
    const { container, rerender } = render(<Checkmark />);
    expect(container.querySelector("svg")).not.toHaveClass("checked");

    rerender(<Checkmark checked={true} />);
    expect(container.querySelector("svg")).toHaveClass("checked");

    rerender(<Checkmark checked={false} />);
    expect(container.querySelector("svg")).not.toHaveClass("checked");
    teardown();
  });
});
