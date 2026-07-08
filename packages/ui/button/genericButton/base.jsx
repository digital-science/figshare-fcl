import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import { normalizeUrl } from "./normalizeurl";
import styles from "./base.module.css";


const longPressDelay = 500;

export default class Base extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    normalizeHref: PropTypes.bool,
    rel: PropTypes.string,
    style: PropTypes.object,
    target: PropTypes.string,
    type: PropTypes.oneOf(["button", "reset", "submit"]),
    value: PropTypes.string,
    onClick: PropTypes.func,
    onLongPress: PropTypes.func,
    onTouchCancel: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchStart: PropTypes.func,
  }

  static defaultProps = {
    children: undefined,
    disabled: false,
    href: undefined,
    innerRef: null,
    normalizeHref: false,
    rel: undefined,
    style: undefined,
    target: undefined,
    type: "button",
    value: undefined,
    onClick: undefined,
    onLongPress: undefined,
    onTouchCancel: undefined,
    onTouchEnd: undefined,
    onTouchMove: undefined,
    onTouchStart: undefined,
  }

  constructor(...args) {
    super(...args);

    this.hasMoved = false;
    this.longPressTimeout = undefined;

    try {
      document.createEvent("TouchEvent");
      this.hasTouchSupport = true;
    } catch (e) {
      this.hasTouchSupport = false;
    }
  }

  componentWillUnmount() {
    this.clearLongPressTimeout();
  }

  render() {
    const {
      disabled, href, normalizeHref, innerRef, rel, target, type,
      onLongPress, children, value,
      ...props
    } = this.props;
    const BaseComponent = !href ? "button" : "a";

    return (
      <BaseComponent
        ref={innerRef}
        {...props}
        {...this.computeProps()}
        aria-disabled={disabled || undefined}
        onClick={this.onClick}
      >
        {children}
        {this.renderValue(value)}
      </BaseComponent>
    );
  }

  renderValue(value) {
    if (!value) {
      return null;
    }

    return (
      <span className={styles.label}>{value}</span>
    );
  }

  onClick = (event) => {
    if (this.props.disabled) {
      event.preventDefault();
      event.stopPropagation();

      return;
    }

    this.props.onClick?.(event);
  }

  onTouchStart = (event) => {
    this.hasMoved = false;
    this.clearLongPressTimeout();
    this.longPressTimeout = setTimeout(this.onLongPress, longPressDelay);
    this.props.onTouchStart?.(event);
  }

  onTouchMove = (event) => {
    this.hasMoved = true;
    this.props.onTouchMove?.(event);
  }

  onTouchCancel = (event) => {
    this.clearLongPressTimeout();
    this.props.onTouchCancel?.(event);
    document.body.classList.remove(styles.disableUserSelection);
  }

  onTouchEnd = (event) => {
    this.clearLongPressTimeout();
    this.props.onTouchEnd?.(event);
    document.body.classList.remove(styles.disableUserSelection);
  }

  onLongPress = () => {
    if (!this.hasMoved) {
      document.body.classList.add(styles.disableUserSelection);
      this.props.onLongPress?.();
    }
  }

  computeProps() {
    let props = undefined;
    const { href, normalizeHref, rel, target, type } = this.props;

    if (!href) {
      props = { type };
    } else {
      const nHref = normalizeHref ? normalizeUrl(href) : href;

      props = { href: nHref, target, rel };
    }

    if (this.hasTouchSupport) {
      props = {
        ...props,
        onTouchCancel: this.onTouchCancel,
        onTouchEnd: this.onTouchEnd,
        onTouchMove: this.onTouchMove,
        onTouchStart: this.onTouchStart,
      };
    }

    return props;
  }

  clearLongPressTimeout = () => clearTimeout(this.longPressTimeout);
}
