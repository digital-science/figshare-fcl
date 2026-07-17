import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import ToolbarButton from "./index.jsx";


let props = {};

describe("<ToolbarButton />", () => {
  function teardown() {
    cleanup();
  }

  beforeEach(() => {
    props = {
      editorNode: { focus: () => undefined },
      icon: jest.fn(() => <svg />),
      onToggle: jest.fn(),
      disabled: false,
      isActive: false,
      hasSeparator: false,
      style: undefined,
      isAction: false,
    };
  });

  it("renders button correctly", () => {
    const { container } = render(<ToolbarButton {...props} />);
    expect(container.querySelector("button")).toBeInTheDocument();
    teardown();
  });

  it("renders button correctly when disabled", () => {
    const { container } = render(<ToolbarButton {...props} disabled={true} />);
    expect(container.querySelector("button")).toBeDisabled();
    teardown();
  });

  it("renders button correctly when active", () => {
    const { container, rerender } = render(<ToolbarButton {...props} />);
    const button = container.querySelector("button");
    expect(button).not.toHaveClass("buttonActive");

    rerender(<ToolbarButton {...props} isActive={true} />);
    expect(button).toHaveClass("buttonActive");

    rerender(<ToolbarButton {...props} isActive={false} />);
    expect(button).not.toHaveClass("buttonActive");
    teardown();
  });

  it("renders separator", () => {
    const { container, rerender } = render(<ToolbarButton {...props} />);
    expect(container.querySelector(".separator")).not.toBeInTheDocument();

    rerender(<ToolbarButton {...props} hasSeparator={true} />);
    expect(container.querySelector(".separator")).toBeInTheDocument();
    teardown();
  });

  it("correctly calls onToggle on mousedown", () => {
    const { container } = render(<ToolbarButton {...props} />);
    fireEvent.mouseDown(container.querySelector("button"));
    expect(props.onToggle).toHaveBeenCalled();
    teardown();
  });

  it("correctly calls onToggle on Enter keydown", () => {
    const { container } = render(<ToolbarButton {...props} />);
    fireEvent.keyDown(container.querySelector("button"), { key: "Enter" });
    expect(props.onToggle).toHaveBeenCalled();
    teardown();
  });

  it("does not call onToggle on Tab keydown", () => {
    const { container } = render(<ToolbarButton {...props} />);
    fireEvent.keyDown(container.querySelector("button"), { key: "Tab" });
    expect(props.onToggle).not.toHaveBeenCalled();
    teardown();
  });
});
