import React from "react";
import { mount } from "enzyme";
import { EditorState } from "draft-js";

import { onConvertHTMLtoDraft, controlButtons } from "../../utils";
import icons from "../../../icons/editor";

import Toolbar from "./index.jsx";


const TITLE_TOOLBAR_CONFIG = [
  {
    icon: icons.Paragraph,
    style: "unstyled",
    type: "block",
    hasSeparator: true,
    key: "p",
    tooltipContent: "Paragraph",
  },
  { icon: icons.Subscript, style: "unstyled", type: "sub", key: "sub", tooltipContent: "Subscript" },
  {
    icon: icons.Superscript,
    style: "unstyled",
    type: "sup",
    key: "sup",
    tooltipContent: "Superscript",
  },
];

const contentState = onConvertHTMLtoDraft("<p>test component</p>");
const props = {
  editorState: EditorState.createWithContent(contentState),
  onToggle: jest.fn(() => () => undefined),
};

describe("<Toolbar />", () => {
  it("renders toolbar default buttons correctly", () => {
    const toolbarComponent = mount(<Toolbar {...props} />);
    const buttonsLength = controlButtons.length;

    expect(toolbarComponent.find("button")).toHaveLength(buttonsLength);
  });

  it("renders toolbar configured buttons correctly", () => {
    const toolbarComponent = mount(<Toolbar {...props} />);
    const toolbarConfig = TITLE_TOOLBAR_CONFIG;
    toolbarComponent.setProps({ toolbarConfig });

    expect(toolbarComponent.find("button")).toHaveLength(3);
  });
});
