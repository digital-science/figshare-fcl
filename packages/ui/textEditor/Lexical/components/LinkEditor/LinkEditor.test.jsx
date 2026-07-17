import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

import defaultTheme from "../../themes/DefaultTheme";

import { LinkEditor } from "./LinkEditor";


const defaultConfig = {
  theme: defaultTheme,
  onError(error) {
    throw error;
  },
};

function renderLinkEditor(props = {}) {
  return render(
    <LexicalComposer initialConfig={defaultConfig}>
      <LinkEditor onClose={jest.fn()} {...props} />
    </LexicalComposer>
  );
}

describe("<LinkEditor />", () => {
  function teardown() {
    cleanup();
  }

  it("renders the component with input and buttons", () => {
    const { container } = renderLinkEditor();
    expect(container.querySelector("input")).toBeInTheDocument();
    expect(container.querySelector("#cancel-button")).toBeInTheDocument();
    expect(container.querySelector("#unlink-button")).toBeInTheDocument();
    teardown();
  });

  it("disables save button when input is less than 3 characters", () => {
    const { container } = renderLinkEditor();
    fireEvent.change(container.querySelector("input"), { target: { value: "12" } });
    expect(container.querySelector(".saveButton")).toHaveAttribute("aria-disabled", "true");
    teardown();
  });

  it("enables save button when input is at least 3 characters", () => {
    const { container } = renderLinkEditor();
    fireEvent.change(container.querySelector("input"), { target: { value: "123" } });
    expect(container.querySelector(".saveButton")).not.toHaveAttribute("aria-disabled", "true");
    teardown();
  });

  it("saves URL on click and enables open/unlink buttons", () => {
    const { container } = renderLinkEditor();
    fireEvent.change(container.querySelector("input"), { target: { value: "1234" } });
    fireEvent.click(container.querySelector(".saveButton"));
    expect(container.querySelector("#open-link-button")).not.toHaveAttribute("aria-disabled", "true");
    expect(container.querySelector("#unlink-button")).not.toHaveAttribute("aria-disabled", "true");
    teardown();
  });

  it("displays edited link value in input after typing", () => {
    const { container } = renderLinkEditor();
    fireEvent.change(container.querySelector("input"), { target: { value: "123" } });
    fireEvent.click(container.querySelector(".saveButton"));
    fireEvent.change(container.querySelector("input"), { target: { value: "1234" } });
    expect(container.querySelector("input").value).toBe("1234");
    teardown();
  });

  it("reverts input to saved value on cancel", () => {
    const { container } = renderLinkEditor();
    fireEvent.change(container.querySelector("input"), { target: { value: "123" } });
    fireEvent.click(container.querySelector(".saveButton"));
    fireEvent.change(container.querySelector("input"), { target: { value: "1234" } });
    fireEvent.click(container.querySelector("#cancel-button"));
    expect(container.querySelector("input").value).toBe("123");
    teardown();
  });

  it("calls onClose when unlink is clicked after saving a URL", () => {
    const onClose = jest.fn();
    const { container } = renderLinkEditor({ onClose });
    fireEvent.change(container.querySelector("input"), { target: { value: "123" } });
    fireEvent.click(container.querySelector(".saveButton"));
    fireEvent.click(container.querySelector("#unlink-button"));
    expect(onClose).toHaveBeenCalled();
    teardown();
  });

  it("saves on Enter keydown", () => {
    const onClose = jest.fn();
    const { container } = renderLinkEditor({ onClose });
    fireEvent.change(container.querySelector("input"), { target: { value: "123" } });
    fireEvent.keyDown(container.querySelector("input"), { key: "Enter" });
    expect(onClose).toHaveBeenCalled();
    teardown();
  });

  it("cancels on Escape keydown and reverts input", () => {
    const onClose = jest.fn();
    const { container } = renderLinkEditor({ onClose });
    fireEvent.change(container.querySelector("input"), { target: { value: "123" } });
    fireEvent.click(container.querySelector(".saveButton"));
    fireEvent.change(container.querySelector("input"), { target: { value: "1234" } });
    fireEvent.keyDown(container.querySelector("input"), { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
    expect(container.querySelector("input").value).toBe("123");
    teardown();
  });
});
