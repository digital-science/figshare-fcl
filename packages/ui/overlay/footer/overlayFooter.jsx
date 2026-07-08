import classnames from "classnames";
import { node, string } from "prop-types";
import React, { Component } from "react";

import style from "./overlayFooter.module.css";


export class OverlayFooter extends Component {
  static propTypes = {
    /**
      Contents for the overlay footer, usually a set of action buttons to close or save the overlay.
     */
    children: node,
    /**
      Optional class to append to the footer node.
     */
    className: string,
  }

  static defaultProps = {
    children: undefined,
    className: undefined,
  }

  render() {
    const { children, className, ...props } = this.props;

    const count = React.Children.toArray(children).length;
    const classes = classnames(style.footer, { [style.singleControl]: count === 1 }, className);

    return (
      <div className={classes} {...props}>
        {children}
      </div>
    );
  }
}

export function SecondaryActions({ children, className, ...props }) {
  return <div className={classnames(style.secondary, className)} {...props}>{children}</div>;
}

SecondaryActions.propTypes = {
  /**
  Contents for the overlay footer slot.
  */
  children: node,
  /**
    Optional class to append to the footer slot node.
    */
  className: string,
};

SecondaryActions.defaultProps = {
  children: undefined,
  className: undefined,
};

export function PrimaryActions({ children, className, ...props }) {
  return <div className={classnames(style.primary, className)} {...props}>{children}</div>;
}

PrimaryActions.propTypes = {
  /**
  Contents for the overlay footer slot.
  */
  children: node,
  /**
    Optional class to append to the footer slot node.
    */
  className: string,
};

PrimaryActions.defaultProps = {
  children: undefined,
  className: undefined,
};

OverlayFooter.Secondary = SecondaryActions;
OverlayFooter.Primary = PrimaryActions;

export default OverlayFooter;
