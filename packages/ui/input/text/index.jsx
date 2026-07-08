import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { getTextDirection } from "./utils";
import styles from "./index.module.css";


const themes = {
  default: styles.defaultTheme,
  underline: styles.underlineTheme,
};

export default class TextInput extends Component {
  static propTypes = {
    /**
      Additional, optional content to be prepended to the input.
     */
    children: PropTypes.node,
    /**
      Optional extra class given to the input wrapper node.
     */
    className: PropTypes.string,
    /**
      Disable the input. Input can be focused or tabbed through,
      but will be read only and it's value cannot be modified.
     */
    disabled: PropTypes.bool,
    /**
      Mark the input as being in an error state, visually,
     */
    error: PropTypes.bool,

    /**
      Force the text direction to always be left to right.
      To be used in example for email or url inputs
     */
    lockltr: PropTypes.bool,

    /**
     * A prefix that will be shown as disabled within the input itself
     */
    prefix: PropTypes.node,


    /**
      Used for screen readers to announce the required state.
     */

    required: PropTypes.bool,

    /**
      Input style variation. Supported variations: `["default", "underline"]`
     */
    theme: PropTypes.string,
    /**
      Input type. Same attribute values as `<input type />`
     */
    type: PropTypes.string,
    /**
      Input value.
     */
    value: PropTypes.string,
    /**
      Function called when input is blurred.
     */
    onBlur: PropTypes.func,
    /**
      Function called when input value changes. Will be called with the `change event`.
     */
    onChange: PropTypes.func,
    /**
      Function called when input receives focus.
     */
    onFocus: PropTypes.func,

  }

  static defaultProps = {
    children: null,
    className: undefined,
    disabled: false,
    error: false,
    type: "text",
    theme: "default",
    value: undefined,
    onBlur: undefined,
    onChange: undefined,
    onFocus: undefined,
    lockltr: false,
    prefix: undefined,
    required: false,
  }

  state = {
    direction: null,
    isInputFocused: false,
  }

  render() {
    const { className, children, disabled, error, lockltr, theme, prefix, required, ...props } = this.props;
    const { direction, isInputFocused } = this.state;

    const textDirection = lockltr ? "ltr" : direction;

    const classNames = [
      styles.container,
      className,
      themes[theme],
      { [styles.isFocused]: isInputFocused },
      { [styles.error]: error },
      { [styles.isDisabled]: disabled },
      { [styles.inputWithPrefix]: !!prefix },
    ];

    return (
      <div className={classnames(classNames)}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          aria-required={required}
          {...props}
          aria-disabled={disabled || undefined}
          aria-invalid={error || undefined}
          className={styles.input}
          dir={textDirection}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onKeyUp={this.onKeyUp}
        />
        {children}
      </div>
    );
  }

  onFocus = (e) => {
    this.setState({ isInputFocused: true });
    this.props.onFocus?.(e);
  };

  onBlur = (e) => {
    if (!e.target.value?.length) {
      this.setState({ direction: "ltr" });
    }
    this.setState({ isInputFocused: false });
    this.props.onBlur?.(e);
  }

  onKeyUp = (e) => {
    if (e.key === "Enter" && !e.target.value.length) {
      this.setState({ direction: "ltr" });
    }
  }

  onChange = (e) => {
    const { disabled, onChange, lockltr } = this.props;

    if (disabled) {
      return;
    }

    if (!e.target.value?.length) {
      this.setState({ direction: "ltr" });
    } else if (!lockltr) {
      const direction = getTextDirection(e.target.value);
      this.setState({ direction });
    }

    onChange?.(e);
  }
}
