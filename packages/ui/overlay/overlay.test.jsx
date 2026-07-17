import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Overlay from "./overlay";


describe("<Overlay />", () => {
  function teardown() {
    cleanup();
  }

  it("renders component", () => {
    const { unmount } = render(<Overlay onClose={jest.fn()}>Test</Overlay>);
    expect(document.querySelector("[role='dialog']")).toBeInTheDocument();
    unmount();
    teardown();
  });

  it("does not render when not visible", () => {
    const { rerender, unmount } = render(<Overlay isVisible={false} onClose={jest.fn()}>Test</Overlay>);
    expect(document.querySelector("[role='dialog']")).not.toBeInTheDocument();

    rerender(<Overlay isVisible={true} onClose={jest.fn()}>Test</Overlay>);
    expect(document.querySelector("[role='dialog']")).toBeInTheDocument();

    rerender(<Overlay isVisible={false} onClose={jest.fn()}>Test</Overlay>);
    expect(document.querySelector("[role='dialog']")).not.toBeInTheDocument();
    unmount();
    teardown();
  });

  it("calls onClose on click outside (on the backdrop)", () => {
    const onClose = jest.fn();
    const { unmount } = render(<Overlay onClose={onClose}>Test</Overlay>);
    const backdrop = document.querySelector(".overlay");
    fireEvent.mouseDown(backdrop, { target: backdrop });
    expect(onClose).toHaveBeenCalled();
    unmount();
    teardown();
  });

  it("does not call onClose when clicking on content", () => {
    const onClose = jest.fn();
    const { unmount } = render(<Overlay onClose={onClose}>Test</Overlay>);
    const box = document.querySelector("[role='dialog']");
    fireEvent.mouseDown(box);
    expect(onClose).not.toHaveBeenCalled();
    unmount();
    teardown();
  });

  it("pressing Escape closes the modal", () => {
    const onClose = jest.fn();
    const { unmount } = render(<Overlay onClose={onClose}>Test</Overlay>);
    const backdrop = document.querySelector(".overlay");

    fireEvent.keyDown(backdrop, { key: "Enter" });
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.keyDown(backdrop, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
    unmount();
    teardown();
  });

  it("focuses the first focusable element when made visible", () => {
    const { unmount } = render(
      <Overlay isVisible={true} onClose={jest.fn()}>
        <button id="button" />
      </Overlay>
    );
    expect(document.activeElement).toBe(document.querySelector("#button"));
    unmount();
    teardown();
  });
});
