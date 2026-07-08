import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { IconButton } from "../../button";
import ArrowLeftMedium from "../../icons/arrow/left/medium";
import Cancel from "../../icons/cancel/large";
import { OverlayContext } from "../overlay";

import styles from "./overlayHeader.module.css";


const CONFIRMATION_OVERLAYS = ["warning", "error", "success"];

export default class OverlayHeader extends Component {
  static contextType = OverlayContext;
  static propTypes = {
    /**
      Optional overlay back button, displayed next to the title.
      Triggered when the "Go back" header button is clicked.
     */
    backBtnFn: PropTypes.func,
    /**
     Optional class name to append to the wrapping node.
     */
    className: PropTypes.string,
    /**
     Optional overlay description, to be displayed under the title.
     */
    description: PropTypes.node,
    /**
     Set this to `true` if you render `OverlayHeader` inside an `OverlayContent` component.
     It will remove top and side paddings, and appropriately fit as a child of that component.
     Useful in some cases where we want the OverlayHeader to scroll with the `Content`.
     */
    isPartOfContent: PropTypes.bool,
    /**
     Text or content for the Overlay title.
     */
    title: PropTypes.node,
    /**
     Triggered when the "Close" header button is clicked.
     If not provided, will be inherited from the `Overlay` component context.
     */
    onClose: PropTypes.func,
    /**
     Triggered when the "Go Back" header button is clicked.
     If not provided, the button will not be shown.
     */
    onGoBack: PropTypes.func,
  }

  static defaultProps = {
    backBtnFn: undefined,
    className: undefined,
    description: undefined,
    isPartOfContent: false,
    title: undefined,
    onGoBack: undefined,
    onClose: undefined,
  }

  state = { firstFocusIn: true }

  render() {
    const { backBtnFn, className, isPartOfContent, description, title, onClose, onGoBack, ...props } = this.props;
    const { firstFocusIn } = this.state;
    const overlayId = this.context?.id ?? 0;
    const isForConfirmationOverlay = CONFIRMATION_OVERLAYS.includes(this.context?.background);
    const ariaTitle = `dialog-${overlayId}-title`;
    const ariaDescription = `dialog-${overlayId}-description`;
    const onGoBackFn = backBtnFn || onGoBack;

    return (
      <div
        {...props}
        className={classNames(styles.header, {
          [styles.partOfContent]: isPartOfContent,
          [styles.confirmation]: isForConfirmationOverlay,
        }, className)}
      >
        <IconButton
          Icon={Cancel}
          className={styles.iconBtn}
          size="M"
          theme="tertiary"
          onBlur={this.onFirstFocus}
          onClick={onClose ?? this.context.onClose}
          onMouseEnter={this.onFirstFocus}
        >
          {firstFocusIn ? undefined : "Close"}
        </IconButton>
        <div className={styles.headerInfo}>
          {onGoBackFn && (
            <IconButton
              Icon={ArrowLeftMedium}
              className={styles.iconBtn}
              size="M"
              theme="tertiary"
              onBlur={this.onFirstFocus}
              onClick={onGoBackFn}
              onMouseEnter={this.onFirstFocus}
            >
              {firstFocusIn ? undefined : "Go back"}
            </IconButton>)}
          <div>
            <h1 className={styles.title} id={ariaTitle}>{title}</h1>
            {description && <p className={styles.description} id={ariaDescription}>{description}</p>}
          </div>
        </div>
      </div>
    );
  }

  onFirstFocus = () => {
    this.setState({ firstFocusIn: false });
  }
}
