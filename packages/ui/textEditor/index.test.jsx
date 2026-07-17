import React from "react";
import { render, cleanup } from "@testing-library/react";

import TextEditor from "./index";


jest.mock("./utils/parsingUtils", () => {
  const { ContentState } = require("draft-js");


  return {
    onConvertHTMLtoDraft: jest.fn(() => ContentState.createFromText("")),
    onConvertDraftToHTML: jest.fn(() => "12345"),
    parsePastedContent: jest.fn(),
    parseBlocksForUnicode: jest.fn((state) => state),
  };
});

const props = { value: "<p>test</p>", onChange: jest.fn() };

describe("<TextEditor />", () => {
  function teardown() {
    cleanup();
  }

  it("renders the text editor", () => {
    const { container } = render(<TextEditor {...props} />);
    expect(container.querySelector(".componentContainer")).toBeInTheDocument();
    teardown();
  });

  it("does not render text length indicator when no minTextLength is given", () => {
    const { container } = render(<TextEditor {...props} />);
    expect(container.querySelector(".editorTextLength")).not.toBeInTheDocument();
    teardown();
  });

  it("renders text length indicator when minTextLength is given", () => {
    const { container } = render(<TextEditor {...props} minTextLength={5} />);
    expect(container.querySelector(".editorTextLength")).toBeInTheDocument();
    teardown();
  });
});
