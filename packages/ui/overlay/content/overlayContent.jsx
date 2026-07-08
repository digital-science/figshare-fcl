import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import styles from "./overlayContent.module.css";


export default class OverlayContent extends Component {
  static propTypes = {
    /**
      Main contents for an overlay.
     */
    children: PropTypes.node,
    /**
      Optional class to append to the content node.
     */
    className: PropTypes.string,
  }

  static defaultProps = {
    className: undefined,
    children: undefined,
  }

  render() {
    const { className, children, ...props } = this.props;

    return (
      <div {...props} className={classnames(styles.content, className)}>
        {children}
      </div>
    );
  }
}
