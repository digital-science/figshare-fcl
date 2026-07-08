import classnames from "classnames";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import Checked from "../../../icons/checkBox/checked";
import Unchecked from "../../../icons/checkBox/unchecked";

import styles from "./checkmark.module.css";


const themes = {
  alt: styles.alt,
  primary: styles.primary,
  secondary: styles.secondary,
};

export default class Checkmark extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    theme: PropTypes.oneOf(["alt"]),
  }

  static defaultProps = {
    checked: false,
    className: undefined,
    disabled: false,
    error: false,
    theme: undefined,
  }

  render() {
    const {
      checked,
      className,
      disabled,
      error,
      theme,
      ...restProps
    } = this.props;

    const Icon = checked ? Checked : Unchecked;

    const classNames = [
      styles.checkmark,
      themes[theme],
      {
        [styles.checked]: checked,
        [styles.disabled]: disabled,
        [styles.error]: error,
      },
      className,
    ];

    return <Icon {...restProps} className={classnames(classNames)} />;
  }
}
