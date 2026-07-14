import React from "react";
import { mount } from "enzyme";
import {
  RichUtils,
  EditorState,
  SelectionState,
  ContentState,
  ContentBlock,
  genKey,
} from "draft-js";

import TextEditor from "./index";
import { removeFormatting, getSelectedBlock, onConvertDraftToHTML, onConvertHTMLtoDraft } from "./utils";


const props = { value: "<div><sub>testerino</sub></div>", onChange: jest.fn() };

function editorStateWithSelection(instance) {
  const { editorState } = instance.state;

  const selectedBlock = getSelectedBlock(editorState);
  const selectionState = SelectionState.createEmpty(selectedBlock.getKey());
  const updatedSelection = selectionState.merge({
    focusOffset: 0,
    anchorOffset: 4,
  });

  return EditorState.forceSelection(editorState, updatedSelection);
}
Object.assign(navigator, { clipboard: { readText: () => "pastedText" } });

describe("<TextEditor />", () => {
  it("renders the text editor", () => {
    const component = mount(<TextEditor {...props} />);

    expect(component.find(".componentContainer")).toHaveLength(1);
  });

  it("renderTextLength() will return null if no maxTextLength is given", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    const renderedLength = instance.renderTextLength();

    expect(renderedLength).toBe(null);
  });

  it("renderTextLength() will render a notice container if text is bigger than maxValue", () => {
    const component = mount(<TextEditor {...{ ...props, minTextLength: 5 }} />);
    const instance = component.instance();

    const renderedLength = instance.renderTextLength();

    expect(renderedLength?.type).toBe("div");
  });

  it("renderTextLength() renders note correctly", () => {
    const value = "<b>a</b>";
    const editorState = (content) => EditorState.createWithContent((onConvertHTMLtoDraft(content)));
    const draft = onConvertDraftToHTML(editorState(value));

    const component = mount(<TextEditor {...{ ...props, value }} />);
    component.instance().renderTextLength();
    expect(component.find(".editorTextLength")).toHaveLength(0);

    component.setProps({ minTextLength: 5 });
    component.instance().renderTextLength();
    expect(component.find(".editorTextLength").text()).toEqual(
      `${draft.length} out of a total of 10000 characters (includes html tags)`
    );

    component.setProps({ maxTextLength: 20 });
    component.instance().renderTextLength();
    expect(component.find(".editorTextLength").text()).toEqual(
      `${draft.length} out of a total of 20 characters (includes html tags)`
    );
  });

  it("onFocusEditor() will call the focus() method of the editor", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    instance.editorNode.focus = jest.fn();

    instance.onFocusEditor();
    expect(instance.editorNode.focus).toBeCalled();
  });

  it("onClickEditor() will set lastActionWasClick to true", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    instance.onClickEditor();
    expect(instance.lastActionWasClick).toBe(true);
  });

  it("onKeyDownEditor() will set lastActionWasClick to false", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    instance.onKeyDownEditor();
    expect(instance.lastActionWasClick).toBe(false);
  });

  it("onChange() will set lastActionWasClick to false", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = { ...component.instance(), lastActionWasClick: true };

    const { editorState } = instance.state;

    instance.onChange(editorState);

    expect(instance.state.showURLInput).toBe(false);
  });

  it("onToggle() calls the correct function for the provided type", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    const fnMap = [
      { type: "undo", function: "onChange" },
      { type: "redo", function: "onChange" },
      { type: "sup", function: "onAddSup" },
      { type: "sub", function: "onAddSub" },
      { type: "link", function: "onAddLink" },
      { type: "clear", function: "onRemoveFormatting" },
      { type: "paste", function: "onPasteAsPlainText" },
      { type: "block", function: "toggleBlockType" },
      { type: "default", function: "toggleInlineStyle" },
    ];

    for (const item of fnMap) {
      if (["block", "default"].includes(item.type)) {
        RichUtils[`${item.function}`] = jest.fn();
        instance.onToggle({}, item.type)();
        expect(RichUtils[`${item.function}`]).toBeCalled();

        continue;
      }

      instance[`${item.function}`] = jest.fn();
      instance.onToggle({}, item.type)();
      expect(instance[`${item.function}`]).toBeCalled();
    }
  });

  it("onRemoveFormatting() removes the formatting from editorState", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();
    const unstyledState = removeFormatting(instance.state.editorState);

    instance.onRemoveFormatting();

    expect(unstyledState._immutable._map.size).toBe(instance.state.editorState._immutable._map.size);
  });

  it("onAddEntity() returns SUB if selection is collapsed", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    const { editorState } = instance.state;

    const response = instance.onAddEntity(editorState);

    expect(response).toBe("SUB");
  });

  it("onAddEntity() adds the correct entity", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    const newEditorState = editorStateWithSelection(instance);

    const response = instance.onAddEntity(newEditorState, "SUB");

    const content = instance.state.editorState.getCurrentContent().getPlainText();

    expect(response).toBe(null);
    expect(content).toBe("testerino");
  });

  it("onAddSub() adds the correct script", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    instance.onAddScript = jest.fn();
    instance.onAddSub();

    expect(instance.onAddScript).toBeCalledWith("SUB");
  });

  it("onAddSup() adds the correct script", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    instance.onAddScript = jest.fn();
    instance.onAddSup();

    expect(instance.onAddScript).toBeCalledWith("SUP");
  });

  it("onURLChange() changes the urlValue", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    const event = { target: { value: "http://figshare.com" } };
    instance.onURLChange(event);

    expect(instance.state.urlValue).toBe(event.target.value);
  });

  it("onAddLink() changes the urlValue", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    const newEditorState = editorStateWithSelection(instance);

    instance.setState({ editorState: newEditorState });

    instance.onAddLink();

    expect(instance.state.showURLInput).toBe(true);
  });

  it("onConfirmModal() applies the correct SUB entity to the link", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();
    instance.onConfirmLink = jest.fn();

    instance.onConfirmModal();

    expect(instance.onConfirmLink).toBeCalledWith("LINKSUB");
  });

  it("onConfirmModal() applies the correct SUP entity to the link", () => {
    const component = mount(<TextEditor {...{ ...props, value: "<div><sup>test</sup></div>" }} />);
    const instance = component.instance();
    instance.onConfirmLink = jest.fn();

    instance.onConfirmModal();

    expect(instance.onConfirmLink).toBeCalledWith("LINKSUP");
  });

  it("onConfirmLink() calls createLink when the entity is unknown", () => {
    const component = mount(<TextEditor {...{ ...props, value: "<div><other>test</other></div>" }} />);
    const instance = component.instance();
    instance.onCreateLink = jest.fn();

    component.setState({ urlValue: "http://test.com" });
    instance.onConfirmLink("SUB");

    expect(instance.onCreateLink).toBeCalledWith("SUB");
  });

  it("onConfirmModal() applies the correct LINK entity to the link", () => {
    const component = mount(<TextEditor {...{ ...props, value: "<div>test</div>" }} />);
    const instance = component.instance();
    instance.onConfirmLink = jest.fn();

    instance.onConfirmModal();

    expect(instance.onConfirmLink).toBeCalledWith("LINK");
  });

  it("onConfirmLink() with no url value should call onRemoveLink()", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();
    instance.onCreateLink = jest.fn();
    instance.onRemoveLink = jest.fn();

    instance.onConfirmLink("SUP");

    expect(instance.onRemoveLink).toBeCalled();
  });

  it("onConfirmLink() with url value should call onModifyLink()", () => {
    const updatedProps = {
      ...props,
      value: "<div><a href='http://figshare.com'>test</a></div>",
    };

    const component = mount(<TextEditor {...updatedProps} />);
    const instance = component.instance();

    component.setState({ urlValue: "https://figshare.com" });

    instance.onCreateLink = jest.fn();
    instance.onModifyLink = jest.fn();

    instance.onConfirmLink("LINKSUB");

    expect(instance.onModifyLink).toBeCalled();
  });

  it("onRemoveLink() calls onRemoveLinkWithEntity()", () => {
    const updatedProps = {
      ...props,
      value: "<sup><a href=\"http://figshare.com/\" target=\"_blank\">adsa</a></sup>",
    };
    const component = mount(<TextEditor {...updatedProps} />);
    const instance = component.instance();

    instance.onRemoveLinkWithEntity = jest.fn();

    instance.onRemoveLink();
    expect(instance.onRemoveLinkWithEntity).toBeCalledWith("LINKSUP");
  });

  it("onRemoveLinkWithEntity() removes links with SUP/SUB entites", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    instance.onAddEntity = jest.fn();

    instance.onRemoveLinkWithEntity("LINKSUP");
    expect(instance.onAddEntity).toBeCalledWith(instance.state.editorState, "SUP");

    instance.onRemoveLinkWithEntity("LINKSUB");
    expect(instance.onAddEntity).toBeCalledWith(instance.state.editorState, "SUB");
  });

  it("onModifyLink() modifies the link", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    instance.onAddEntity = jest.fn();

    instance.onModifyLink(instance.state.editorState, "http://test.com");
    expect(instance.state.showURLInput).toBe(false);
    expect(instance.state.urlValue).toBe("");
  });

  it("onCreateLink() sets the link correctly in the editorState", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    instance.onCreateLink();
    expect(instance.lastActionWasClick).toBe(false);
  });

  it("onCancelLinkAddition() sets the state correctly", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    instance.onCancelLinkAddition();
    expect(instance.state.showURLInput).toBe(false);
    expect(instance.state.urlValue).toBe("");
  });

  it("onPasteAsPlainText() sets the text from the clipboard correctly", async() => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();
    jest.spyOn(navigator.clipboard, "readText");

    instance.onChange = jest.fn();

    await instance.onPasteAsPlainText();

    expect(instance.onChange).toBeCalled();
    expect(instance.state.editorState.getCurrentContent().getPlainText()).toBe("testerino");
  });

  it("handlePaste() returns false if html includes underline + strike through", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    instance.onChange = jest.fn();

    const response = instance.handlePaste("text", "<span style='text-decoration:underline line-through;'>M</span>");
    expect(response).toBe(true);

    const responseWithoutHTML = instance.handlePaste("text");
    expect(responseWithoutHTML).toBe(false);
  });

  it("handleKeyCommand() changes the editor state and adds the new command", () => {
    const component = mount(<TextEditor {...props} />);
    const instance = component.instance();

    instance.onChange = jest.fn();
    instance.handleKeyCommand("bold");
    expect(instance.onChange).toBeCalled();
  });

  it("keyBindingFn() binds the key", () => {
    const updatedProps = {
      value: "",
      onChange: jest.fn(),
    };

    const component = mount(<TextEditor {...updatedProps} />);
    const instance = component.instance();

    const contentBlock = new ContentBlock({
      key: genKey(),
      text: "",
      type: "ordered-list-item",
      depth: 0,
    });
    component.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray([contentBlock]
        )),
    });

    instance.onChange = jest.fn();
    const event = { which: 13 };

    instance.keyBindingFn(event);
    expect(instance.onChange).toBeCalledWith(undefined);
  });

  it("keyBindingFn() returns null if text is given", () => {
    const updatedProps = {
      value: "",
      onChange: jest.fn(),
    };

    const component = mount(<TextEditor {...updatedProps} />);
    const instance = component.instance();

    const contentBlock = new ContentBlock({
      key: genKey(),
      text: "text",
      type: "ordered-list-item",
      depth: 0,
    });
    component.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray([contentBlock]
        )),
    });

    instance.onChange = jest.fn();
    const event = { which: 13 };

    const response = instance.keyBindingFn(event);
    expect(response).toBe(null);
  });
});
