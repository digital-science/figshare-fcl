import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";

import ChevronDown from "../../icons/chevron/down/medium";
import ChevronDownSmall from "../../icons/chevron/down/small";
import ChevronDownLarge from "../../icons/chevron/down/large";
import Cancel from "../../icons/cancel/medium.jsx";
import { Toggle } from "../../dropdown";
import { Button } from "../../button";
import withRef from "../../helpers/withRef.jsx";
import Context from "../context.js";

import style from "./Trigger.css";


const variants = {
  secondary: {},
  inline: {
    trigger: style["trigger-inline"],
    text: style["text-inline"],
    icon: style["caret-inline"],
    arrow: ChevronDown,
  },
};

const Icons = {
  small: ChevronDownSmall,
  medium: ChevronDown,
  large: ChevronDownLarge,
};

export class Trigger extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.bool,
    iconSize: PropTypes.string,
    id: PropTypes.string,
    renderChipArea: PropTypes.func,
    setTriggerRef: PropTypes.any,
    variant: PropTypes.oneOf(Object.keys(variants)),
    onClear: PropTypes.func,
  }

  static defaultProps = {
    ariaLabel: undefined,
    className: undefined,
    error: false,
    id: "",
    iconSize: "small",
    renderChipArea: undefined,
    setTriggerRef: null,
    variant: "secondary",
    onClear: undefined,
  }

  static contextType = Context;

  render() {
    return (
      <Toggle>
        {this.renderTrigger}
      </Toggle>
    );
  }

  renderTrigger = ({ onToggle, props }) => {
    const {
      ariaLabel,
      children,
      className,
      error,
      renderChipArea,
      setTriggerRef,
      variant,
      onClear,
      iconSize,
      ...buttonProps
    } = this.props;
    const { size } = this.context;

    const classNames = [
      style.trigger,
      { [style.error]: error },
      variants[variant].trigger,
      className,
    ];

    const Icon = variants[variant].arrow || Icons[iconSize];
    const carretClassName = [
      style.caret,
      variants[variant].icon,
      {
        [style["caret-small"]]: size === "S" || iconSize === "small",
        [style["caret-medium"]]: size === "M" || iconSize === "medium",
        [style["caret-large"]]: size === "L" || iconSize === "large",
      },
      className,
    ];

    return (
      <div {...props}>
        <div ref={setTriggerRef}>
          {renderChipArea?.()}
          <Button
            aria-label={ariaLabel}
            data-id="select-trigger-btn"
            size={size}
            variant={variant}
            onClick={onToggle}
            {...buttonProps}
            className={classnames(classNames)}
          >
            <span className={classnames(style.text, variants[variant].text)}>{children}</span>
            {onClear && (
              <Button
                {...props}
                className={classnames(style.tooltipButton, style.clear)}
                tooltip="Clear selection"
                onClick={this.onClear}
              >
                <Cancel className={style.icon} />
              </Button>
            )}
            <Button
              className={style.tooltipButton}
              tooltip="Show options"
              {...props}
            >
              <Icon className={classnames(carretClassName)} />
            </Button>
          </Button>
        </div>
      </div>
    );
  }

  onClear = (event) => {
    const { onClear, id } = this.props;
    event.stopPropagation();
    event.preventDefault();

    if (typeof onClear === "function") {
      onClear(id);
    }
  }
}

export const TriggerWithRef = withRef(Trigger);

TriggerWithRef.displayName = "TriggerWithRef";

export default TriggerWithRef;
