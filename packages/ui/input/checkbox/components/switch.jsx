import classnames from "classnames";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import style from "./switch.module.css";


export default class Switch extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
  }

  static defaultProps = {
    checked: false,
    className: undefined,
    disabled: false,
    error: false,
  }

  render() {
    const {
      checked,
      className,
      disabled,
      error,
      ...restProps
    } = this.props;

    const status = checked ? "ON" : "OFF";

    const classNames = [
      style.switch,
      {
        [style.checked]: checked,
        [style.disabled]: disabled,
        [style.error]: error,
      },
      className,
    ];

    return (
      <span {...restProps} className={classnames(classNames)}>
        <span className={style.slider} role="presentation" />
        <span className={style.status}>{status}</span>
        <span className={style.handle} role="presentation" />
      </span>
    );
  }
}
