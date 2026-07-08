import classnames from "classnames";
import PropTypes from "prop-types";
import { Popper } from "react-popper";
import React, { PureComponent } from "react";

import BaseButton from "./base";
import styles from "./index.module.css";


export default class GenericButton extends PureComponent {
  static propTypes = {
    /**
      Inner content, or button label
     */
    children: PropTypes.any.isRequired,
    /**
      Optional custom class string appended to the button classList.
     */
    className: PropTypes.string,
    /**
      Optional custom class string appended to the optional tooltip classList.
     */
    classNameTooltip: PropTypes.string,
    /**
      Hyperlink reference URL.
      If provided, the button will be treated as an anchor or link,
      and will render an `<a/>` tag instead of a `<button />`, as a base element.
     */
    href: PropTypes.string,
    /**
      Provide this property if you want to get a node reference to the base element.
      Accepts a valid react ref callback or object.
     */
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /**
      Optional button tooltip content.
      If provided, a tooltip will be shown when the button is hovered or keyboard focused.
     */
    tooltip: PropTypes.any,
    /**
      Called when the button looses focus.
     */
    onBlur: PropTypes.func,
    /**
      Called when users `click on` or `activate` the button, either by mouse or key interaction
     */
    onClick: PropTypes.func,
    /**
      Called when users trigger a context menu interaction, usually `right click`.
     */
    onContextMenu: PropTypes.func,
    /**
      Called when the button gains focus.
     */
    onFocus: PropTypes.func,
    /**
      Called when the user interacts with the button through a `long press` interaction.
     */
    onLongPress: PropTypes.func,
    /**
      Called when the user hovers out-of the button's visible/clip area
     */
    onMouseOut: PropTypes.func,
    /**
      Called when the user hovers into the button's visible/clip area
     */
    onMouseOver: PropTypes.func,
  }

  static defaultProps = {
    className: undefined,
    classNameTooltip: undefined,
    href: undefined,
    innerRef: null,
    tooltip: undefined,
    onBlur: undefined,
    onClick: undefined,
    onContextMenu: undefined,
    onFocus: undefined,
    onLongPress: undefined,
    onMouseOut: undefined,
    onMouseOver: undefined,
  }

  state = {
    left: 0,
    top: 0,
    arrowLeft: 0,
    isBelow: false,
    isActive: false,
    isVisible: false,
    popperKey: 0,
    tooltipDelay: 300,
  }

  observer = null;

  componentDidMount() {
    setTimeout(() => {
      this.initObserver();
    }, 100);
  }

  componentWillUnmount() {
    clearTimeout(this.tooltipTimeoutId);
    clearTimeout(this.focusTimeoutId);

    if (this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    const { children, className, classNameTooltip, ...props } = this.props;

    return (
      <BaseButton
        {...props}
        className={classnames(styles.button, className)}
        innerRef={this.setButtonRef}
        onBlur={this.onBlur}
        onClick={this.onClick}
        onContextMenu={this.onContextMenu}
        onFocus={this.onFocus}
        onLongPress={this.onLongPress}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
      >
        {children}
        {this.renderTooltip()}
      </BaseButton>
    );
  }

  renderTooltip() {
    const { tooltip } = this.props;
    if (!tooltip) {
      return null;
    }

    const { isVisible, isActive } = this.state;

    return (
      <Popper
        eventsEnabled={isVisible && isActive}
        modifiers={[
          {
            name: "flip",
            options: {
              fallbackPlacements: ["top", "bottom"],
              boundary: "viewport",
            },
          },
        ]}
        placement="top"
        referenceElement={this.buttonNode}
        strategy="fixed"
      >
        {this.renderTooltipPopper}
      </Popper>
    );
  }

  buttonNode = null;
  tooltipNode = null;

  renderTooltipPopper = (popperProps) => {
    const {
      ref: tooltipRef,
      style: popperStyle,
      placement: popperPlacement,
      arrowProps: {
        ref: arrowRef,
        style: arrowStyle,
      },
    } = popperProps;

    const { tooltip, classNameTooltip } = this.props;
    const { isActive, isVisible } = this.state;

    return (
      <>
        <span
          key={this.state.popperKey}
          ref={tooltipRef}
          aria-hidden={false}
          className={classnames(styles.tooltip, classNameTooltip)}
          data-placement={popperPlacement}
          data-tooltip-visible={isVisible && isActive}
          style={popperStyle}
        >
          {tooltip}
          <span
            ref={arrowRef}
            className={styles.tooltipArrow}
            data-placement={popperPlacement}
            data-popper-arrow={true}
            style={arrowStyle}
          />
        </span>
      </>
    );
  }

  setButtonRef = (node) => {
    const { innerRef } = this.props;
    this.buttonNode = node;

    if (!innerRef) {
      return;
    }

    if (typeof innerRef === "function") {
      innerRef(node);
    } else {
      innerRef.current = node;
    }
  }

  onMouseOver = (event) => {
    this.tooltipTimeoutId = setTimeout(() => {
      this.showTooltip();
    }, this.state.tooltipDelay);
    this.props.onMouseOver?.(event);
  }

  onFocus = (event) => {
    this.focusTimeoutId = setTimeout(() => {
      if (event.target === document.activeElement) {
        this.setState({ popperKey: this.state.popperKey + 1 });
        this.showTooltip();
      }
    }, 100);
    this.props.onFocus?.(event);
  }

  onMouseOut = (event) => {
    clearTimeout(this.tooltipTimeoutId);
    this.hideTooltip();
    this.props.onMouseOut?.(event);
  }

  onBlur = (event) => {
    this.hideTooltip();
    this.props.onBlur?.(event);
  }

  onLongPress = () => {
    this.buttonNode?.focus();
    this.props.onLongPress?.();
  }

  onClick = (event) => {
    this.hideTooltip();
    this.props.onClick?.(event);
  }

  onContextMenu = (event) => {
    const { href, tooltip, onContextMenu } = this.props;
    if (!tooltip) {
      onContextMenu?.(event);

      return;
    }

    let hasTouchSupport = false;
    try {
      document.createEvent("TouchEvent");
      hasTouchSupport = true;
    } catch (e) {
      hasTouchSupport = false;
    }

    if (hasTouchSupport && href) {
      event.preventDefault();
    }

    onContextMenu?.(event);
  }

  showTooltip = () => {
    if (!this.props.tooltip) {
      return;
    }

    this.setState({ popperKey: this.state.popperKey + 1 });
    this.setState({ isActive: true });
  }

  hideTooltip = () => {
    if (!this.props.tooltip) {
      return;
    }

    this.setState({ isActive: false });
  }

  initObserver = () => {
    this.observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries?.reduce((a, b) => (a && b && a.time > b.time) ? a : b)
        const isVisible = lastEntry.isIntersecting;
        this.setState({ isVisible });
      },
      { threshold: 0.5 }
    );

    if (this.buttonNode) {
      this.observer.observe(this.buttonNode);
    }
  };
}
