import React from "react";
import { render, cleanup } from "@testing-library/react";

import Switch from "./switch";


describe("<Switch />", () => {
  function teardown() {
    cleanup();
  }

  it("renders correctly with no props", () => {
    const { container } = render(<Switch />);
    const root = container.firstChild;
    expect(root).toHaveClass("switch");
    expect(root).not.toHaveClass("checked");
    expect(root).not.toHaveClass("disabled");
    expect(root).not.toHaveClass("error");
    expect(container.querySelector(".slider")).toBeInTheDocument();
    expect(container.querySelector(".status")).toBeInTheDocument();
    expect(container.querySelector(".handle")).toBeInTheDocument();
    teardown();
  });

  it("renders in disabled state", () => {
    const { container, rerender } = render(<Switch disabled={true} />);
    expect(container.firstChild).toHaveClass("disabled");

    rerender(<Switch disabled={false} />);
    expect(container.firstChild).not.toHaveClass("disabled");
    teardown();
  });

  it("renders in error state", () => {
    const { container, rerender } = render(<Switch error={true} />);
    expect(container.firstChild).toHaveClass("error");

    rerender(<Switch error={false} />);
    expect(container.firstChild).not.toHaveClass("error");
    teardown();
  });

  it("renders all checked states", () => {
    const { container, rerender } = render(<Switch />);
    expect(container.firstChild).not.toHaveClass("checked");
    expect(container.querySelector(".status").textContent).toEqual("OFF");

    rerender(<Switch checked={true} />);
    expect(container.firstChild).toHaveClass("checked");
    expect(container.querySelector(".status").textContent).toEqual("ON");

    rerender(<Switch checked={false} />);
    expect(container.firstChild).not.toHaveClass("checked");
    expect(container.querySelector(".status").textContent).toEqual("OFF");
    teardown();
  });
});
