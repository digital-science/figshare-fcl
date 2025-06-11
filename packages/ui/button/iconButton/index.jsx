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
};

export default class IconButton extends Component {
  static propTypes = {
    /**
      Icon component button label.
      Must be a functional or class component.
      For example you can use the icon components provided in `@digital-science/figshare-fcl/icons`.
     */
    Icon: PropTypes.elementType.isRequired,
    /**
      For an `IconButton`, children are treated as optional `tooltip` contents.
      If provided, a tooltip will be rendered when users hover over the icon button.
     */
    children: PropTypes.node,
    /**
      Optional custom class string appended to the button classList.
     */
    className: PropTypes.string,
    /**
      Controls button style variation.
      Use this property to visually emphasize the button relative to the type of action it is supposed to trigger.
      Supported theme values:
     */
    theme: PropTypes.oneOf(Object.keys(themes)),
    /**
      Called when users `click on` or `activate` the button, either by mouse or key interaction
     */
    onClick: PropTypes.func,
  }

  static defaultProps = {
    children: undefined,
    className: undefined,
    onClick: undefined,
    theme: "primary",
  }

  render() {
    const { children, Icon, className, theme, ...props } = this.props;

    return (
      <GenericButton
        {...props}
        className={classnames(styles.button, themes[theme], className)}
        tooltip={children}
      >
        <Icon className={styles.icon} />
      </GenericButton>
    );
  }
}
