import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { BLUR_COMMAND, FOCUS_COMMAND, KEY_DOWN_COMMAND, MOVE_TO_START, REMOVE_TEXT_COMMAND } from "lexical";

import Editor from "./";


const wait = (delay = 100) => new Promise((resolve) => setTimeout(resolve, delay));

const editorRef = { current: undefined };

const onChange = jest.fn();
const onFocus = jest.fn();
const onBlur = jest.fn();
const onEditorChange = jest.fn((editor) => {
  editorRef.current = editor;
});


function getEditorInputNode(component) {
  return component.find({ "data-id": "editor-content-editable" }).childAt(0);
}

const fixtures = {
  expectOnChangeValue: (value = "") => expect.objectContaining(
    { target: expect.objectContaining({ value }) }
  ),
  focusOnEditor: ({ editor, component }) => {
    const node = getEditorInputNode(component);

    const focusEvent = new FocusEvent(
      "focus",
      { target: node.getDOMNode() }
    );
    editor.dispatchCommand(FOCUS_COMMAND, focusEvent);
  },
  blurEditor: ({ editor, component }) => {
    const node = getEditorInputNode(component);
    const blurEvent = new FocusEvent(
      "blur",
      { target: node.getDOMNode() }
    );
    editor.dispatchCommand(BLUR_COMMAND, blurEvent);
  },
  clearText: ({ editor }) => {
    editor.dispatchCommand(REMOVE_TEXT_COMMAND, undefined);
  },
  typeIn: ({ text, editor, component }) => {
    const node = getEditorInputNode(component);

    editor.dispatchCommand(MOVE_TO_START);

    for (let i = 0; i < text.length; i += 1) {
      const keyEvent = new KeyboardEvent(
        "keydown",
        { key: text.charAt(i), target: node.getDOMNode() }
      );
      editor.dispatchCommand(KEY_DOWN_COMMAND, keyEvent);
    }
  },
};

describe("Lexical Text Editor", () => {
  const props = {
    value: "<p><b><sub>sub-bold</sub></b><i>italic</i><strong>strong</strong><strong><i>strong-italic</i></strong>" +
    "<em>emphasis</em><s>strikethrough</s><u>underline</u></p>",
    onChange,
    onEditorChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders and updates with initial value", async() => {
    await act(async() => {
      mount(<Editor {...props} />);

      await wait();
    });

    expect(props.onChange).toHaveBeenCalledWith(
      fixtures.expectOnChangeValue(
        "<p dir=\"ltr\"><sub><strong>sub-bold</strong></sub><em>italic</em>" +
        "<strong>strong</strong><em><strong>strong-italic</strong></em>" +
        "<em>emphasis</em><s>strikethrough</s><u>underline</u></p>"
      )
    );
  });

  it("registers onFocus and onBlur callbacks", async() => {
    let component = null;

    await act(async() => {
      component = mount(<Editor {...props} onBlur={onBlur} onFocus={onFocus} />);

      await wait();
    });

    await act(async() => {
      fixtures.focusOnEditor({ component, editor: editorRef.current });
      fixtures.blurEditor({ component, editor: editorRef.current });

      await wait();
    });

    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });

  it("updates as user types in the editor", async() => {
    let component = null;

    await act(async() => {
      component = mount(<Editor {...props} />);

      await wait();
    });

    await act(async() => {
      fixtures.focusOnEditor({ component, editor: editorRef.current });
      fixtures.typeIn({ text: "hello", component, editor: editorRef.current });

      await wait();
    });

    expect(props.onChange).toHaveBeenCalledWith(
      fixtures.expectOnChangeValue(
        "<p dir=\"ltr\"><sub><strong>sub-bold</strong></sub><em>italic</em>" +
        "<strong>strong</strong><em><strong>strong-italic</strong></em>" +
        "<em>emphasis</em><s>strikethrough</s><u>underline</u></p>"
      )
    );
  });
});

