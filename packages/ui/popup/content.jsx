import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Popper } from "react-popper";

import withConsumer from "../helpers/withConsumer";
import RootCloseListener from "../helpers/rootCloseListener";

import styles from "./content.module.css";
import { Consumer } from "./context";
import AriaDescription from "./content_aria_description";
import AriaLabel from "./content_aria_label";


const modifiers = [
  {
    name: "preventOverflow",
    enabled: true,
    options: { padding: 18 },
  },
];


const themes = {
  "primary": styles.primary,
  "secondary": styles.secondary,
};

class Content extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    tooltipContext: PropTypes.object.isRequired,
    arrowClassName: PropTypes.string,
    className: PropTypes.string,
    modifiers: PropTypes.array,
    placement: PropTypes.oneOf([
      "bottom", "bottom-start", "bottom-end",
      "top", "top-start", "top-end",
      "right", "right-start", "right-end",
      "left", "left-start", "left-end",
    ]),
    renderInPortal: PropTypes.bool,
    theme: PropTypes.oneOf(["primary", "secondary"]),
  }

  static defaultProps = {
    arrowClassName: undefined,
    modifiers: [],
    placement: "bottom",
    className: undefined,
    renderInPortal: true,
    theme: "primary",
  }

  state = { mounted: false }

  componentDidMount() {
    if (this.props.renderInPortal) {
      this.onMount();
      document.addEventListener("fullscreenchange", this.onFullScreenChange);
    }
  }

  componentDidUpdate() {
    this.updatePopper();
  }

  componentWillUnmount() {
    if (this.props.renderInPortal) {
      document.removeEventListener("fullscreenchange", this.onFullScreenChange);
    }
  }

  render() {
    const { isVisible, contentRef, onClose } = this.props.tooltipContext;

    return (
      <RootCloseListener
        disabled={!isVisible}
        innerRef={contentRef}
        onClose={onClose}
      >
        {this.renderPopper}
      </RootCloseListener>
    );
  }

    renderPopper = ({ ref }) => {
      const { placement, tooltipContext, renderInPortal, ...props } = this.props;
      const { isVisible, triggerNode } = tooltipContext;

      if (!renderInPortal) {

        if (!isVisible) {
          return null;
        }

        return (
          <Popper
            {...props}
            eventsEnabled={isVisible}
            innerRef={ref}
            modifiers={[...modifiers, ...this.props.modifiers]}
            placement={placement}
            referenceElement={triggerNode}
          >
            {this.renderPopperContent}
          </Popper>
        );
      }

      if (!this.state.mounted) {
        return null;
      }

      return ReactDOM.createPortal(
        <Popper
          {...props}
          eventsEnabled={isVisible}
          innerRef={ref}
          modifiers={[...modifiers, ...this.props.modifiers]}
          placement={placement}
          referenceElement={triggerNode}
        >
          {this.renderPopperContent}
        </Popper>,
        this.portal
      );
    }

    renderPopperContent = ({ ref, style, placement, arrowProps, update }) => {
      const { arrowClassName, className, tooltipContext, theme } = this.props;
      const { ariaRole, addEventsOnContent, isVisible, onClose } = tooltipContext;

      this.popperUpdate = update;

      let events = {};
      if (addEventsOnContent) {
        ({ events } = tooltipContext);
      }

      const classNames = [
        styles.container,
        themes[theme],
        className,
        { [styles.hidden]: !isVisible },
      ];

      return (
        <div
          ref={ref}
          className={classnames(classNames)}
          data-placement={placement}
          role={ariaRole}
          style={ { ...style } }
          tabIndex={-1}
          {...events}
        >
          {this.props.children({ onClose })}
          <div
            ref={arrowProps.ref}
            className={classnames(styles.arrow, arrowClassName)}
            role="presentation"
            style={arrowProps.style}
          />
        </div>
      );
    }

    onMount = () => {
      this.setPortal(document.body);
      this.setState({ mounted: true });
    }

    onFullScreenChange = (event) => {
      if (document.fullscreenElement) {
        this.setPortal(event.target);
      } else {
        try {
          event.target.removeChild(this.portal);
        } catch {
          // do nothing, the element is already gone
        }
        this.setPortal(document.body);
      }
    }

    setPortal = (root) => {
      this.portal = root.querySelector(".popper-container");
      if (!this.portal) {
        this.portal = document.createElement("div");
        this.portal.classList = ["popper-container"];
        root.appendChild(this.portal);
      }
    }

    updatePopper = () => {
      if (this.popperUpdate) {
        this.popperUpdate();
      }
    }

}

const ContentWithConsumer = withConsumer(Consumer, "tooltipContext")(Content);

ContentWithConsumer.AriaLabel = AriaLabel;
ContentWithConsumer.AriaDescription = AriaDescription;


export default ContentWithConsumer;
