import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";

import Indeterminate from "../../icons/indeterminate";

import Checkmark from "./components/checkmark";
import Switch from "./components/switch";
import styles from "./index.module.css";


const variants = {
  checkbox: styles.checkbox,
  switch: styles.switch,
};

const componentTypes = {
  checkbox: Checkmark,
  switch: Switch,
};

export default class Checkbox extends Component {
  static propTypes = {
    /**
      Boolean value to determine if the checkbox is checked/selected.
     */
    checked: PropTypes.bool,
    /**
      Label text/content for the checkbox.
     */
    children: PropTypes.any,
    /**
      Optional className to append to the input container class list.
     */
    className: PropTypes.string,
    /**
      Mark the input as disabled. Can be focused but will be readonly and cannot be toggled.
     */
    disabled: PropTypes.bool,
    /**
      Mark the input as being in an error state, visually.
     */
    error: PropTypes.bool,
    /**
      Optional className to append to the checkmark icon.
     */
    iconClassName: PropTypes.string,
    /**
      Optional flag for indeterminate state.
     */
    indeterminate: PropTypes.bool,
    /**
      Optional ref function. Provide this property if you need a reference to the input node.
     */
    innerRef: PropTypes.func,
    /**
      Style variation for the checkbox.
     */
    theme: PropTypes.oneOf(["alt", "primary", "secondary"]),
    /**
      Controls the component flavour.
      If you want the input to be rendered as either a traditional checkbox or a switch.
     */
    variant: PropTypes.oneOf(["checkbox", "switch"]),
    /**
      Triggered when the input state changes. Receives the change event as an argument.
     */
    onChange: PropTypes.func,
    /**
      Triggered when the input is clicked on.
     */
    onClick: PropTypes.func,
  }

  static defaultProps = {
    checked: false,
    children: undefined,
    className: undefined,
    disabled: false,
    error: false,
    iconClassName: undefined,
    indeterminate: false,
    innerRef: undefined,
    theme: undefined,
    variant: "checkbox",
    onChange: undefined,
    onClick: undefined,
  }

  inputNode = null;

  render() {
    const {
      checked,
      children,
      className,
      disabled,
      error,
      iconClassName,
      indeterminate,
      innerRef,
      theme,
      variant,
      ...restProps
    } = this.props;

    const ariaDisabled = disabled || undefined;
    const ariaInvalid = error || undefined;
    const containerClassNames = [styles.container, variants[variant]];
    const Icon = indeterminate ? Indeterminate : componentTypes[variant];

    const checkboxProps = { "aria-checked": checked };

    return (
      <label className={classnames(styles.label, className)}>
        <span
          {...(variant === "checkbox" ? checkboxProps : {})}
          checked={checked}
          className={classnames(containerClassNames)}
          role={variant}
        >
          <input
            {...restProps}
            ref={this.setRef}
            aria-disabled={ariaDisabled}
            aria-invalid={ariaInvalid}
            checked={checked}
            className={styles.input}
            type="checkbox"
            onChange={this.onChange}
          />
          <Icon
            checked={checked}
            className={iconClassName}
            disabled={disabled}
            error={error}
            theme={theme}
          />
        </span>
        <span className={styles.labelText}>
          {children}
        </span>
      </label>
    );
  }

  setRef = (node) => {
    const { innerRef } = this.props;
    if (!node || node === this.inputNode) {
      return;
    }

    innerRef?.(node);
    this.inputNode = node;
  }

  onChange = (event) => {
    const { disabled, onChange } = this.props;

    if (disabled) {
      return;
    }

    onChange?.(event);
  }
}

export { default as UncontrolledCheckbox } from "./uncontrolled";
