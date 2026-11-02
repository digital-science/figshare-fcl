import { $getSelection, $isRangeSelection } from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useCallback, useContext, useEffect, useState } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import { OverlayContent, OverlayFooter, OverlayHeader } from "@digital-science/figshare-fcl/overlay";
import { OverlayContext } from "@digital-science/figshare-fcl/overlay/overlay";
import Input from "@digital-science/figshare-fcl/input";
import GoToLinkLarge from "@digital-science/figshare-fcl/icons/goToLink/large";
import LinkUnlinked from "@digital-science/figshare-fcl/icons/link/unlinked";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { Button } from "../../../../latest/Button";

import { getSelectedNode, sanitizeUrl, makeURLAbsolute } from "./utils";
import styles from "./LinkEditor.module.css";


export function LinkEditor({ onClose }) {
  const [editor] = useLexicalComposerContext();
  const context = useContext(OverlayContext);
  const [linkUrl, setLinkUrl] = useState("");
  const [editedLinkUrl, setEditedLinkUrl] = useState("");
  const [textSelection, setTextSelection] = useState("");
  const [isInputInteracted, setInputInteracted] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const title = isEditMode ? "Edit link" : "Add link";
  const confirmationText = isEditMode ? "Apply changes" : "Add link";
  const hasMinimumLength = editedLinkUrl?.length >= 3;

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      setTextSelection(selection.getTextContent());

      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
  }, [editor]);

  useEffect(() => {
    editor?.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (!linkUrl) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  }, [linkUrl]);

  const onUnlink = () => {
    editor?.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    setEditedLinkUrl("");
    onClose();
  };

  const onURLChange = (event) => {
    setInputInteracted(true);
    setEditedLinkUrl(event.target.value);
  };

  const onCancel = () => {
    setEditedLinkUrl(linkUrl);
    onClose();
  };

  const onSave = () => {
    if (editedLinkUrl) {
      editor?.dispatchCommand(
        TOGGLE_LINK_COMMAND,
        {
          url: makeURLAbsolute(sanitizeUrl(editedLinkUrl)),
          target: "_blank",
        }
      );
      setLinkUrl(editedLinkUrl);
    }
    onClose();
  };

  const monitorInputInteraction = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSave();
    } else if (event.key === "Escape") {
      event.preventDefault();
      onCancel();
    }
  };

  const overlayId = context?.id ?? 0;
  const ariaTitle = `dialog-${overlayId}-title`;

  return (
    <>
      <OverlayHeader id={ariaTitle} title={title} onClose={onClose} />
      <OverlayContent className={styles.contentContainer}>
        <div className={styles.section}>
          <span className={styles.label}>Text</span>
          {textSelection}
        </div>
        <div className={styles.section}>
          <span className={styles.label}>Link</span>
          <div className={styles.inputWrapper} >
            <Input
              className={styles.input}
              lockltr={true}
              placeholder="Add link URL here"
              type="text"
              value={isInputInteracted ? editedLinkUrl : (editedLinkUrl || linkUrl)}
              onChange={onURLChange}
              onKeyDown={monitorInputInteraction}
            />
            <Button
              disabled={!isEditMode}
              em="low"
              href={makeURLAbsolute(editedLinkUrl || linkUrl)}
              id="open-link-button"
              kind="secondary"
              target="_blank"
            >
              <Button.Icon><GoToLinkLarge /></Button.Icon>
              <Button.Label>Open link</Button.Label>
            </Button>
          </div>
        </div>
      </OverlayContent>
      <OverlayFooter className={styles.buttonsContainer}>
        <Button
          disabled={!isEditMode}
          em="high"
          id="unlink-button"
          kind="tertiary"
          onClick={onUnlink}
        >
          <Button.Icon><LinkUnlinked /></Button.Icon>
          <Button.Label>Unlink</Button.Label>
        </Button>
        <div className={styles.buttons}>
          <Button em="low" id="cancel-button" kind="secondary" onClick={onCancel}>
            <Button.Label>Cancel</Button.Label>
          </Button>
          <Button
            aria-label={confirmationText}
            className={styles.saveButton}
            disabled={!hasMinimumLength}
            em="high"
            kind="primary"
            onClick={onSave}
          >
            <Button.Label>{confirmationText}</Button.Label>
          </Button>
        </div>
      </OverlayFooter>
    </>
  );
}


LinkEditor.propTypes = { onClose: PropTypes.func };

LinkEditor.defaultProps = { onClose: undefined };
