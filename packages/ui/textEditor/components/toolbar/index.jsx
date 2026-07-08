import React, { Component } from "react";
import PropTypes from "prop-types";

import Resize from "../../../icons/editor/resize";
import ToolbarButton from "../toolbarButton";
import {
  findEntityType,
  ToolbarButtonType,
  controlButtons,
} from "../../utils";

import styles from "./index.module.css";


export default class Toolbar extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    editorNode: PropTypes.any,
    toolbarConfig: PropTypes.array,
  };

  static defaultProps = {
    disabled: false,
    editorNode: { focus: () => undefined },
    toolbarConfig: [],
  }

  render() {
    const { toolbarConfig } = this.props;
    let newConfig = [];

    if (toolbarConfig.length) {
      toolbarConfig.forEach((toolbarItem) => {
        controlButtons.forEach((button) => {
          if (button.key === toolbarItem.key) {
            newConfig.push(toolbarItem);
          }
        });
      });
    }

    if (!newConfig.length) {
      newConfig = controlButtons;
    }

    return (
      <div className={styles.toolbarContainer}>
        <div className={styles.toolbar}>
          {newConfig.map(this.renderToolbarButton)}
        </div>
        <Resize className={styles.buttonResize} />
      </div>
    );
  }

  renderToolbarButton = ({ icon, style, type, hasSeparator, isAction }, id) => {
    const { onToggle, editorNode, editorState } = this.props;

    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockType = contentState.
      getBlockForKey(selection.getStartKey()).
      getType();
    const currentStyle = editorState.getCurrentInlineStyle();
    const entityType = findEntityType(editorState);
    const isDisabled = this.isButtonDisabled(type, selection);

    let isActive = false;
    switch (type) {
      case ToolbarButtonType.BLOCK:
        isActive = style === blockType;
        break;
      case ToolbarButtonType.INLINE:
        isActive = currentStyle.has(style);
        break;
      case ToolbarButtonType.LINK:
        isActive =
          entityType === "LINK" ||
          entityType === "LINKSUP" ||
          entityType === "LINKSUB";
        break;
      case ToolbarButtonType.SUP:
        isActive = entityType === "SUP" || entityType === "LINKSUP";
        break;
      case ToolbarButtonType.SUB:
        isActive = entityType === "SUB" || entityType === "LINKSUB";
        break;
      default:
        break;
    }

    return (
      <ToolbarButton
        key={id}
        disabled={isDisabled}
        editorNode={editorNode}
        hasSeparator={hasSeparator}
        icon={icon}
        isAction={isAction}
        isActive={isActive}
        style={style}
        onToggle={onToggle(style, type)}
      />
    );
  };

  hasSelection = (selection) => {
    const start = selection.getStartOffset();
    const end = selection.getEndOffset();

    return end - start !== 0;
  };

  isButtonDisabled = (type, selection) => {
    const { disabled } = this.props;
    const hasSelection = this.hasSelection(selection);
    const buttonsWithSelection = [ToolbarButtonType.CLEAR, ToolbarButtonType.LINK];

    if (disabled || (buttonsWithSelection.includes(type) && !hasSelection)) {
      return true;
    }

    return false;
  };
}
