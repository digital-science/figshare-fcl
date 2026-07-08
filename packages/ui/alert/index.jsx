import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";

import withRef from "../helpers/withRef";
import Cancel from "../icons/cancel/medium";
import { Button } from "../button";

import styles from "./index.module.css";


const variantStyles = {
  error: styles.error,
  success: styles.success,
  warning: styles.warning,
  info: styles.info,
};

class Alert extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(Object.keys(variantStyles)).isRequired,
    className: PropTypes.string,
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    role: PropTypes.string,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    className: undefined,
    role: "alert",
    onClose: undefined,
    forwardedRef: null,
  }

  render() {
    const { className, children, variant, role, onClose, forwardedRef, ...divProps } = this.props;

    return (
      <div
        ref={forwardedRef}
        className={classnames(styles.alert, variantStyles[variant], className)}
        role={role}
        {...divProps}
      >
        <div className={styles.childContainer}>
          {children({ onClose })}
        </div>
        {this.renderCloseButton()}
      </div>
    );
  }

  renderCloseButton() {
    const { onClose } = this.props;
    if (!onClose) {
      return null;
    }

    return (
      <Button aria-label="Close" className={styles.close} onClick={onClose}>
        <Cancel className={styles.closeIcon} />
      </Button>
    );
  }
}

export default withRef(Alert);
