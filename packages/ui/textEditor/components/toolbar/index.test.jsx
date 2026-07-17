import React from "react";
import { render, cleanup } from "@testing-library/react";
import { EditorState } from "draft-js";

import { controlButtons } from "../../utils/constants";
import icons from "../../../icons/editor";

import Toolbar from "./index.jsx";


jest.mock("../../utils/parsingUtils", () => {
  return {
    onConvertHTMLtoDraft: jest.fn(),
    onConvertDraftToHTML: jest.fn(() => ""),
  };
});


const TITLE_TOOLBAR_CONFIG = [
  {
    icon: icons.Paragraph, style: "unstyled", type: "block",
    hasSeparator: true, key: "p", tooltipContent: "Paragraph",
  },
  { icon: icons.Subscript, style: "unstyled", type: "sub", key: "sub", tooltipContent: "Subscript" },
  { icon: icons.Superscript, style: "unstyled", type: "sup", key: "sup", tooltipContent: "Superscript" },
];

const props = {
  editorState: EditorState.createEmpty(),
  onToggle: jest.fn(() => () => undefined),
};

describe("<Toolbar />", () => {
  function teardown() {
    cleanup();
  }

  it("renders default toolbar buttons", () => {
    const { container } = render(<Toolbar {...props} />);
    expect(container.querySelectorAll("button")).toHaveLength(controlButtons.length);
    teardown();
  });

  it("renders configured toolbar buttons", () => {
    const { container } = render(<Toolbar {...props} toolbarConfig={TITLE_TOOLBAR_CONFIG} />);
    expect(container.querySelectorAll("button")).toHaveLength(3);
    teardown();
  });
});
