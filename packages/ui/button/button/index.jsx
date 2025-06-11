import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";

import GenericButton from "../genericButton";

import styles from "./index.css";


const themes = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
  primaryAlt: styles.primaryAlt,
  secondaryAlt: styles.secondaryAlt,
  tertiaryAlt: styles.tertiaryAlt,
  inverted: styles.inverted,
};

const sizes = {
  S: "small",
  M: "medium",
  L: "large",
};

export default class Button extends Component {
  static propTypes = {
    /**
      Inner content, or button label
     */
    children: PropTypes.node.isRequired,
    /**
      Optional Icon component button label.
      Must be a functional or class component.
      For example you can use the icon components provided in `@digital-science/figshare-fcl/icons`.
     */
    Icon: PropTypes.elementType,
    /**
      Optional custom class string appended to the button classList.
     */
    className: PropTypes.string,
    /**
      If Icon component is provided,
      this property controls the positioning of the rendered Icon element.
     */
    iconPlacement: PropTypes.oneOf(["left", "right"]),
    /**
      Controls button size. Supported size values:
     */
    size: PropTypes.oneOf(Object.keys(sizes)),
    /**
      Controls button style variation.
      Use this property to visually emphasize the button relative to the type of action it is supposed to trigger.
      Supported theme values:
     */
    theme: PropTypes.oneOf(Object.keys(themes)),
    /**
      Optional button tooltip content.
      If provided, a tooltip will be shown when the button is hovered or keyboard focused.
     */
    tooltip: PropTypes.node,
  }

  static defaultProps = {
    Icon: null,
    className: undefined,
    iconPlacement: "left",
    size: "M",
    theme: "secondary",
    tooltip: null,
  }

  render() {
    const { children, className, Icon, iconPlacement, size, theme, tooltip, ...props } = this.props;

    return (
      <GenericButton
        {...props}
        className={classnames(styles.button, themes[theme], className)}
        data-icon-placement={Icon ? iconPlacement : undefined}
        data-size={sizes[size]}
        tooltip={tooltip}
      >
        <span aria-hidden={true} className={styles.iconContainer}>
          {this.renderIcon()}
        </span>
        {children}
      </GenericButton>
    );
  }

  renderIcon() {
    const { Icon } = this.props;
    if (!Icon) {
      return null;
    }

    return <Icon className={styles.icon} />;
  }
}
