import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef } from "react";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CLICK_COMMAND,
  $getSelection,
} from "lexical";
import { mergeRegister } from "@lexical/utils";

import { DefaultToolbarConfig, LowPriority, ToolbarItem } from "../../constants";
import useModal from "../LinkEditor/useModal";

import styles from "./Toolbar.module.css"; // eslint-disable-line css-modules/no-unused-class
import Tool from "./components/Tool";
import Divider from "./components/Divider";
import {
  checkIfToolIsActive,
  checkIfToolIsDisabled,
  describeHasSelection,
  describeSelectionFormats,
  describeLinkState,
  describeBlockState,
  describeListState,
} from "./utils";
import runTool from "./operations";
import { defineClickCommandListener, defineUndoRedoCommandListeners } from "./commands";
import { useToolbarState } from "./useToolbarState";


export default function Toolbar({ config }) {
  const [editor] = useLexicalComposerContext();
  const editorRef = useRef(editor);
  const [modal, showModal] = useModal();
  const { tools, state, dispatch, stateRef } = useToolbarState(config);

  useEffect(() => {
    editorRef.current = editor;
  }, [editor, editorRef]);

  const onToolSelect = useCallback((event) => {
    const { currentTarget } = event;

    const tool = {
      type: currentTarget.getAttribute("data-tool-type"),
      group: currentTarget.getAttribute("data-tool-group"),
    };

    runTool({ tool, editor: editorRef.current, state: stateRef.current, callbacks: { showModal } });
  }, [editor, showModal]);


  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    const payload = { selection };

    try {
      const context = { selection, editor };

      payload.hasSelection = describeHasSelection(context);
      payload.formats = describeSelectionFormats(context);
      payload.isLink = describeLinkState(context);
      payload.list = describeListState(context);
      payload.block = describeBlockState(context);
    } catch (e) {
      // log("updateToolbar, failed to parse state", payload, e);
    }

    dispatch({
      type: "BATCH",
      payload,
    });
  }, [editor]);

  useEffect(() => mergeRegister(
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    }),
    editor.registerCommand(
      CLICK_COMMAND,
      defineClickCommandListener({ showModal }),
      LowPriority
    ),
    editor.registerCommand(
      CAN_UNDO_COMMAND,
      defineUndoRedoCommandListeners({ dispatch, type: "CAN_UNDO" }),
      LowPriority
    ),
    editor.registerCommand(
      CAN_REDO_COMMAND,
      defineUndoRedoCommandListeners({ dispatch, type: "CAN_REDO" }),
      LowPriority
    )
  ), [editor, updateToolbar, showModal]);

  return (
    <div className={styles.toolbar} data-control-id="editor-toolbar">
      {renderToolbarSections(tools, onToolSelect, state)}
      {modal}
    </div>
  );
}

function renderToolbarSections(sectioned, onToolSelect, state) {
  return (<>
    {sectioned.order.map(((sectionKey, index, list) => {
      const section = sectioned.sections[sectionKey];
      const notLast = index !== list.length - 1;
      const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
      const { type, tools } = section;

      return (
        <React.Fragment key={type}>
          {tools.map((tool) => {
            if (tool.type === ToolbarItem.PasteWithoutFormat && isFirefox) {
              return null;
            }

            return (
              <Tool
                key={`${tool.group}-${tool.type}`}
                active={checkIfToolIsActive(tool, state)}
                disabled={checkIfToolIsDisabled(tool, state)}
                {...tool}
                onToolSelect={onToolSelect}
              />
            );
          })}
          {notLast && <Divider />}
        </React.Fragment>
      );
    }))}
  </>);
}

Toolbar.propTypes = { config: PropTypes.array };
Toolbar.defaultProps = { config: DefaultToolbarConfig };
