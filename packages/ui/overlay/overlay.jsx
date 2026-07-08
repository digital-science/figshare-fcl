import classnames from "classnames";
import React, { Component, createContext } from "react";
import PropTypes from "prop-types";

import FocusTrap from "../helpers/focusTrap";
import RenderInPortal from "../helpers/renderInPortal";

import { OverlayStack } from "./overlayStack";
// eslint-disable-next-line css-modules/no-unused-class
import styles from "./overlay.module.css";


let OVERLAY_ID = 0;

export const OverlayContext = createContext({
  id: 0,
  variant: "modal",
  background: "primary",
  overlayBackground: "blackTransparent",
});


export default class Overlay extends Component {
  static propTypes = {
    /**
      Overlay box contents. Can be any set of React nodes.
      We recommend using the exported `OverlayTitle`, `OverlayContent` and `OverlayFooter`
      components to define the structure of the contents.
     */
    children: PropTypes.node.isRequired,
    /**
      Set the `Overlay` box background color based on the type of overlay we want to display.
     */
    background: PropTypes.oneOf(["primary", "secondary", "warning", "error", "success"]),
    /**
      Optionally append a custom class to the Overlay wrapping node.
     */
    className: PropTypes.string,
    /**
      If set to `true`, when the `Overlay` is opened,
      it will move focus to the first focusable element it contains.
     */
    focusIn: PropTypes.bool,
    /**
      An id to uniquely identify the overlay.
      If provided it will be included in the aria label and description references.
     */
    id: PropTypes.string,
    /**
      If it is set to `true` the Overlay box and background will be mounted and rendered.
      Set it to `false` to close the overlay.
     */
    isVisible: PropTypes.bool,
    /**
      Choose the color of the contrasting screen background behind the main overlay box.
     */
    overlayBackground: PropTypes.oneOf(["black", "blackTransparent", "white", "whiteTransparent"]),
    /**
      Set a custom node to append the overlay node to.
     */
    portalNode: PropTypes.any,
    /**
      If set to `true`, once the overlay is closed,
      it will return focus to the last element that was in focus,
      before it was opened or before it's `status` property changed.
     */
    returnFocus: PropTypes.bool,
    /**
      Set a status for the overlay contents. Use this to set a clean state id for the component content in some cases,
      where content changes and we want to refocus-in afterwards.
     */
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(["loading", "ready", "error"])]),
    /**
      If set to `true`, users will be able to circularly tab through only elements contained inside the overlay box.
     */
    trapFocus: PropTypes.bool,
    /**
      Overlay box sizing variant.
      Controls the width and height bounds of the overlay box to match the expected content.
     */
    variant: PropTypes.oneOf(["modal", "formModal"]),
    /**
      Callback called when users click outside the overlay box, click on the close button,
      or press escape while the overlay is opened.
     */
    onClose: PropTypes.func,
  };

  static defaultProps = {
    className: undefined,
    focusIn: true,
    id: undefined,
    isVisible: true,
    background: "primary",
    overlayBackground: "blackTransparent",
    portalNode: "#fecore-ui-overlays",
    variant: "modal",
    returnFocus: false,
    trapFocus: true,
    status: "ready",
    onClose: undefined,
  };

  // eslint-disable-next-line no-plusplus
  id = this.props.id ?? OVERLAY_ID++;
  bound = false;

  getSnapshotBeforeUpdate(prevProps) {
    const opened = this.props.isVisible && !prevProps.isVisible;

    if (opened && !this.bound) {
      OverlayStack.push({ id: this.id });
      this.bound = true;
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    const closed = !this.props.isVisible && prevProps.isVisible;

    if (closed && this.bound) {
      OverlayStack.pop(this.id);
      this.bound = false;
    }
  }

  componentWillUnmount() {
    OverlayStack.pop(this.id);
  }

  render() {
    const { isVisible } = this.props;

    if (!isVisible) {
      return null;
    }

    const { variant, background, overlayBackground, returnFocus, focusIn, status, trapFocus }
      = this.props;
    const overlayStyle = { zIndex: OverlayStack.getZIndex(this.id) };
    const context = {
      id: this.id,
      onClose: this.handleClose,
      variant,
      background,
      overlayBackground,
      status,
      returnFocus,
      focusIn,
    };
    const portalNode = this.getPortalNode();

    return (
      <RenderInPortal portalNode={portalNode}>
        <aside
          ref={this.setOverlayRef}
          className={classnames(styles.overlay, styles[overlayBackground])}
          data-node-id={`overlay-background-for-${this.id}`}
          role="presentation"
          style={overlayStyle}
          tabIndex={-1}
          onKeyDown={this.onEscape}
          onMouseDown={this.onClickOverlay}
        >
          <OverlayContext.Provider value={context}>
            <FocusTrap
              key={status}
              focusIn={focusIn}
              innerRef={this.setBoxRef}
              isActive={trapFocus}
              returnFocus={returnFocus}
            >
              {this.renderContent}
            </FocusTrap>
          </OverlayContext.Provider>
        </aside>
      </RenderInPortal>

    );
  }

  renderContent = (focusTrapProps) => {
    const { ref } = focusTrapProps;
    const { children, className, variant, background, overlayBackground } = this.props;
    const aria = {
      "aria-labelledby": `dialog-${this.id}-title`,
      "aria-describedby": `dialog-${this.id}-description`,
    };

    return (
      <section
        ref={ref}
        className={
          classnames(styles.overlayBox, styles[background], styles[overlayBackground], styles[variant], className)
        }
        data-node-id={`overlay-box-for-${this.id}`}
        role="dialog"
        {...aria}
      >
        {children}
      </section>
    );
  };

  getPortalNode = () => {
    const { portalNode } = this.props;
    let nodeToUse = portalNode;

    if (typeof portalNode === "string") {
      nodeToUse = document.querySelector(portalNode);
    }

    if (nodeToUse instanceof HTMLElement) {
      return nodeToUse;
    }

    return document.body;
  }

  setBoxRef = (node) => {
    this.boxRef = node;
  };

  setOverlayRef = (node) => {
    this.overlayRef = node;
  }

  onClickOverlay = (event) => {
    if (event.target === event.currentTarget) {
      this.handleClose(event);
    }
  }

  onEscape = (event) => {
    const isLast = OverlayStack.isLast(this.id);

    if (event.key === "Escape" && isLast) {
      if (event.defaultPrevented) {
        return;
      }

      this.handleClose(event);
    }
  };

  handleClose = (...args) => {
    const { onClose } = this.props;

    OverlayStack.pop(this.id);
    onClose(...args);
  }
}
