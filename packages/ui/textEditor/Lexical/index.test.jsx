import React from "react";
import { render, cleanup, act } from "@testing-library/react";

import Editor from "./";


jest.mock("../utils/parsingUtils", () => {
  return {
    onConvertHTMLtoDraft: jest.fn(),
    onConvertDraftToHTML: jest.fn(() => ""),
  };
});


const wait = (delay = 100) => new Promise((resolve) => setTimeout(resolve, delay));

const onChange = jest.fn();
const onEditorChange = jest.fn();

describe("Lexical Text Editor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  function teardown() {
    cleanup();
  }

  it("renders the editor content area", async() => {
    const { container } = render(
      <Editor value="<p>Hello world</p>" onChange={onChange} onEditorChange={onEditorChange} />
    );
    await act(() => wait());
    expect(container.querySelector("[data-id='editor-content-editable']")).toBeInTheDocument();
    teardown();
  });

  it("calls onEditorChange with the editor instance on mount", async() => {
    render(
      <Editor value="<p>test</p>" onChange={onChange} onEditorChange={onEditorChange} />
    );
    await act(() => wait());
    expect(onEditorChange).toHaveBeenCalled();
    teardown();
  });
});
