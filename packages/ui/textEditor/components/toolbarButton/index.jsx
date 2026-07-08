import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./index.module.css";


export default class ToolbarButton extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType, PropTypes.func]).isRequired,
    onToggle: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    editorNode: PropTypes.any,
    hasSeparator: PropTypes.bool,
    isAction: PropTypes.bool,
    isActive: PropTypes.bool,
    style: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    editorNode: { focus: () => undefined },
    isActive: false,
    hasSeparator: false,
    style: undefined,
    isAction: false,
  };

  render() {
    const { isActive, icon, disabled } = this.props;
    const className = isActive ? classnames(styles.button, styles.buttonActive) : styles.button;

    const Icon = icon;

    return (
      <div className={styles.toolbarButtonContainer}>
        <button
          className={className}
          disabled={disabled}
          onKeyDown={this.onKeyToggle}
          onMouseDown={this.onToggle}
        >
          <Icon className={styles.icon} />
        </button>
        {this.renderSeparator()}
      </div>
    );
  }

  renderSeparator = () => {
    const { hasSeparator } = this.props;
    if (!hasSeparator) {
      return null;
    }

    return <span className={styles.separator} />;
  };

  onToggle = (e) => {
    const { onToggle, style, isAction } = this.props;
    e.preventDefault();
    const styleArg = isAction ? "" : style;

    onToggle(styleArg);
  };

  onKeyToggle = (e) => {
    const { editorNode } = this.props;

    switch (e.key) {
      case "Enter":
      case " ":
        editorNode?.focus();
        e.stopPropagation();
        this.onToggle(e);

        break;
      default:
        break;
    }
  }
}
