import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode, $isHeadingNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM, $generateHtmlFromNodes } from "@lexical/html";
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  BLUR_COMMAND,
  FOCUS_COMMAND,
  KEY_TAB_COMMAND,
  INDENT_CONTENT_COMMAND,
  PASTE_COMMAND,
  TextNode,
} from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { mergeRegister } from "@lexical/utils";

import { getTextDirection } from "../../input/text/utils";

import { applyMarkupProcessors, createBlocksForEditorState } from "./utils";
import { LowPriority, HighPriority, DefaultToolbarConfig } from "./constants";
import Toolbar from "./components/Toolbar";
import { Warning } from "./components/Warning";
import DefaultTheme from "./themes/DefaultTheme";
import styles from "./editor.module.css"; // eslint-disable-line css-modules/no-unused-class
import { CustomTextNode } from "./nodes/CustomTextNode";
import { definePasteCommand } from "./components/Toolbar/commands";


export function replaceHeadingTransform(editor) {
  return editor.registerNodeTransform(HeadingNode, (node) => {
    if ($isHeadingNode(node)) {
      node.direction = getTextDirection(node.getTextContent());
      node.__dir = getTextDirection(node.getTextContent());
    }

    return node;
  });
}

export const DEFAULT_MAX_TEXT_LENGTH = 10000;
export const DEFAULT_MIN_TEXT_LENGTH = 5000;

const defaultConfig = {
  // The editor theme
  theme: DefaultTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    {
      replace: LinkNode,
      with: (node) => new LinkNode(node.__url, { rel: node.__rel, target: "_blank", title: node.__title }, node.__key),
    },
    CustomTextNode,
    {
      replace: TextNode,
      with: (node) => new CustomTextNode(node.__text),
    },
  ],
};

function populateEditorState(value) {
  const parsedValue = value.replaceAll("<hr>", "&lt;hr&gt;");

  return (editor) => {
    const root = $getRoot();
    if (root.getFirstChild() === null) {
      const parser = new DOMParser();
      const dom = parser.parseFromString(parsedValue, "text/html");

      // Select the root
      const selection = $getRoot().select();

      const blocks = createBlocksForEditorState($generateNodesFromDOM(editor, dom), value);

      const editorNodes = blocks.map((block) => {
        if (Array.isArray(block)) {
          const paragraphNode = $createParagraphNode();
          paragraphNode.append(...block);

          return paragraphNode;
        }

        return block;
      });

      selection.insertNodes(editorNodes);
    }
  };
}

export function Editor(props) {
  const {
    onBlur,
    onFocus,
    onEditorChange,
    value,
    minTextLength,
    maxTextLength,
    className,
    error,
    isSingleRow,
    hasWarningText,
    toolbarConfig,
    onChange,
    id,
    name,
    processors,
    required,
  } = props;

  const [editor] = useLexicalComposerContext();
  const [contentLength, setContentLength] = useState(value.length);

  const callbacks = useRef({ onChange, onBlur, onFocus, onEditorChange });
  const processorsRef = useRef(processors);
  const editorRef = useRef();

  useEffect(() => {
    processorsRef.current = processors;
  }, [processors]);

  useEffect(() => {
    callbacks.current.onEditorChange?.(editor);
  }, [editor, callbacks]);

  useEffect(() => {
    callbacks.current.onChange = onChange;
    callbacks.current.onFocus = onFocus;
    callbacks.current.onBlur = onBlur;
  }, [callbacks, onChange, onBlur, onFocus]);

  const handleTab = (shiftKey) => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      return null;
    }

    const selectionNodes = selection.getNodes();
    const firstNode = selectionNodes[0];

    if (firstNode.__prev && firstNode.__type === "listitem" && !shiftKey) {
      return INDENT_CONTENT_COMMAND;
    }

    return null;
  };

  useEffect(() =>
    mergeRegister(
      editor.registerCommand(FOCUS_COMMAND, (event) => {
        if (typeof callbacks.current.onFocus === "function") {
          onFocus(event);
        }
      }, LowPriority),
      editor.registerCommand(BLUR_COMMAND, (event) => {
        if (editorRef.current.contains(event.relatedTarget)) {
          return true;
        }
        if (typeof callbacks.current.onBlur === "function") {
          onBlur(event);
        }

        return false;
      }, LowPriority),
      editor.registerCommand(KEY_TAB_COMMAND, (event) => {
        const command = handleTab(event.shiftKey);
        if (command === null) {
          return false;
        }

        event.preventDefault();
        editor.dispatchCommand(command, undefined);

        return true;
      }, LowPriority),
      editor.registerCommand(
        PASTE_COMMAND,
        (event) => {
          event.preventDefault();
          if (definePasteCommand(event)) {
            editor.dispatchCommand(PASTE_COMMAND, definePasteCommand(event));

            return true;
          }

          return false;
        },
        HighPriority,
      ),
    ), [editor, callbacks]);

  const handleChange = useCallback((editorState) => {
    editorState.read(() => {
      if (typeof callbacks.current.onChange === "function") {
        const serializedHTML = applyMarkupProcessors(
          $generateHtmlFromNodes(editor),
          processorsRef.current
        );
        callbacks.current.onChange({ target: { value: serializedHTML, id, name } });

        setContentLength(serializedHTML.length);
      }
    });
  }, [editor, callbacks, name, id]);

  const editorClasses = classnames(
    styles.container,
    { [styles.error]: error, [styles.singleRow]: isSingleRow },
    className
  );

  return (<>
    <div ref={editorRef} className={editorClasses} data-id="editor-content-editable" id={id}>
      <RichTextPlugin
        ErrorBoundary={LexicalErrorBoundary}
        contentEditable={<ContentEditable ariaRequired={required} className={styles.input} />}
        placeholder={<div className={styles.placeholder}>{props.placeholder}</div>}
      />
      <HistoryPlugin />
      <OnChangePlugin ignoreSelectionChange={true} onChange={handleChange} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <ListPlugin />
      <LinkPlugin />
      <Toolbar config={toolbarConfig} />
    </div>
    {(!isSingleRow && hasWarningText) && (
      <Warning contentLength={contentLength} maxLength={maxTextLength} minLength={minTextLength} />
    )}
  </>);
}

export function EditorContainer(props) {
  const { disabled, onError, onBlur } = props;

  const initialConfig = useMemo(() => {
    return { ...defaultConfig, editable: !disabled, onError, editorState: populateEditorState(props.value) };
  }, [defaultConfig, onError, disabled]);

  const containerRef = useRef(null);

  const handleBlur = useCallback((event) => {
    if (!containerRef.current.contains(event.relatedTarget)) {
      if (typeof onBlur === "function") {
        onBlur(event);
      }
    }
  }, [onBlur]);

  return (
    <div
      ref={containerRef}
      role="presentation"
      onBlur={handleBlur}
    >
      <LexicalComposer initialConfig={initialConfig} >
        <Editor {...props} />
      </LexicalComposer>
    </div>
  );
}


EditorContainer.propTypes = {
  /**
    Callback called when the editor contents are edited or changed.
    Called with: target: { value: serializedHTML, id, name }
  */
  onChange: PropTypes.func.isRequired,
  /**
    Optional class to append to the text editor wrapper node.
  */
  className: PropTypes.string,
  /**
    Disables the editor.
  */
  disabled: PropTypes.bool,
  /**
    Visually marks the editor as being in an error state.
  */
  error: PropTypes.bool,
  /**
    Display the length warning for the editor.
  */
  hasWarningText: PropTypes.bool,
  /**
    Identify the editor through a unique field name. Will be passed to the `onChange` function as the first argument.
  */
  id: PropTypes.string,
  /**
    Visually sets the editor as being a single row input. Can still be resized.
  */
  isSingleRow: PropTypes.bool,
  /**
    Maximum number of characters for the editor text value. Includes markup.
  */
  maxTextLength: PropTypes.number,
  /**
    Minimum number of characters for the editor text value. Includes markup.
  */
  minTextLength: PropTypes.number,
  /**
    form input name for the editor.
  */
  name: PropTypes.string,
  /**
    Placeholder text for the editor.
  */
  placeholder: PropTypes.string,
  /**
    A list of additional processing to apply to the final markup value returned for `onChange`
  */
  processors: PropTypes.arrayOf(PropTypes.oneOf(["no-inner-span", "no-paragraph-root", "no-ltr-root"])),
  /**
    Configuration options for the editor toolbar.
    Ex: For adding the Bold button, the config object would be something like:

    .[{ name: "bold", type: "richText" }].

    The full list of supported items can be found in ./constants
  */
  toolbarConfig: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  })),
  /**
    Editor text value.
  */
  value: PropTypes.string,
  /**
    Callback called when the editor looses focus.
  */
  onBlur: PropTypes.func,
  /**
   * Callback called with the lexical editor instance when it is initialized or changes.
   */
  onEditorChange: PropTypes.func,
  /**
    Callback called when the editor gains focus.
  */
  onError: PropTypes.func,
  /**
    Callback called when the editor gains focus.
  */
  onFocus: PropTypes.func,
};

EditorContainer.defaultProps = {
  className: undefined,
  error: false,
  onEditorChange: undefined,
  isSingleRow: false,
  hasWarningText: true,
  placeholder: "",
  maxTextLength: DEFAULT_MAX_TEXT_LENGTH,
  minTextLength: DEFAULT_MIN_TEXT_LENGTH,
  value: "",
  disabled: false,
  onBlur: undefined,
  onFocus: undefined,
  onError: (e) => {
    // eslint-disable-next-line no-console
    console.log("Editor update error", e);
  },
  toolbarConfig: DefaultToolbarConfig,
  name: undefined,
  id: "",
  processors: ["no-ltr-root", "no-inner-span", "no-paragraph-root"],
};

Editor.propTypes = EditorContainer.propTypes; // eslint-disable-line

export default EditorContainer;
