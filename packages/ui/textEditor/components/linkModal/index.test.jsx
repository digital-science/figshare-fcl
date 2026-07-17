import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { EditorState, ContentState, SelectionState, Modifier } from "draft-js";

import LinkModal from "./index.jsx";


jest.mock("../../utils/parsingUtils", () => {
  return {
    onConvertHTMLtoDraft: jest.fn(),
    onConvertDraftToHTML: jest.fn(() => ""),
  };
});


function createEditorStateWithLink() {
  const text = "test link";
  const contentState = ContentState.createFromText(text);
  const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", { url: "http://test.com" });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const block = contentStateWithEntity.getFirstBlock();
  const selection = SelectionState.createEmpty(block.getKey()).merge({ anchorOffset: 0, focusOffset: text.length });
  const contentWithEntity = Modifier.applyEntity(contentStateWithEntity, selection, entityKey);

  return EditorState.createWithContent(contentWithEntity);
}

const baseProps = {
  showURLInput: true,
  urlValue: "",
  editorState: createEditorStateWithLink(),
  onURLChange: jest.fn(),
  onConfirmLink: jest.fn(),
  onCancelLinkAddition: jest.fn(),
  onRemoveLink: jest.fn(),
};

describe("<LinkModal />", () => {
  function teardown() {
    cleanup();
  }

  it("renders null when showURLInput is false", () => {
    const { container } = render(<LinkModal {...baseProps} showURLInput={false} />);
    expect(container.firstChild).toBeNull();
    teardown();
  });

  it("renders edit modal with Edit link title when there is a link entity", () => {
    const { container } = render(<LinkModal {...baseProps} />);
    expect(container.querySelector(".title").textContent).toContain("Edit link");
    expect(container.querySelector("input")).toBeInTheDocument();
    teardown();
  });

  it("renders add modal with Add link title when there is no link entity", () => {
    const { container } = render(
      <LinkModal {...baseProps} editorState={EditorState.createEmpty()} />
    );
    expect(container.querySelector(".title").textContent).toContain("Add link");
    teardown();
  });

  it("disables save button when urlValue is less than 3 characters", () => {
    render(<LinkModal {...baseProps} urlValue="ht" />);
    expect(screen.getByText("Save").closest("button")).toHaveAttribute("aria-disabled", "true");
    teardown();
  });

  it("enables save button when urlValue is at least 3 characters", () => {
    render(<LinkModal {...baseProps} urlValue="http://google.com" />);
    expect(screen.getByText("Save").closest("button")).not.toHaveAttribute("aria-disabled", "true");
    teardown();
  });
});
