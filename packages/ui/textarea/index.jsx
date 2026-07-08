import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./index.module.css";


const themes = {
  underline: styles.underlineTheme,
  default: styles.defaultTheme,
};

export default class Textarea extends Component {
  static propTypes = {
    /**
      Optional class name to append to the textarea node.
     */
    className: PropTypes.string,
    /**
      Mark the input as disabled. Can be focused, but it's value cannot be changed or cleared.
     */
    disabled: PropTypes.bool,
    /**
      Mark the input as being in an error state, visually.
     */
    error: PropTypes.bool,
    /**
      Choose the style variation for the textarea.
      Supported values: `["default", "underline"]`
     */
    theme: PropTypes.string,
    /**
      Text value of the textarea.
     */
    value: PropTypes.string,
    /**
      Callback called when the input value changes. Will receive the change event as the first argument.
     */
    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: undefined,
    theme: "default",
    error: false,
    disabled: false,
    onChange: undefined,
    value: "",
  }

  render() {
    const { className, disabled, error, theme, onChange, ...restProps } = this.props;

    const classNames = [styles.textarea, className, themes[theme]];

    return (
      <textarea
        {...restProps}
        aria-disabled={disabled || undefined}
        aria-invalid={error || undefined}
        className={classnames(classNames)}
        onChange={this.onChange}
      />
    );
  }

  onChange = (e) => {
    const { disabled, onChange } = this.props;

    if (disabled) {
      return;
    }

    onChange?.(e);
  }
}
