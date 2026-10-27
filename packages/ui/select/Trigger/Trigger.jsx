import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";

import ChevronDown from "../../icons/chevron/down/medium";
import ChevronDownSmall from "../../icons/chevron/down/small";
import ChevronDownLarge from "../../icons/chevron/down/large";
import Cancel from "../../icons/cancel/medium.jsx";
import { Toggle } from "../../dropdown";
import { Button } from "../../latest/Button";
import withRef from "../../helpers/withRef.jsx";
import Context from "../context.js";

import style from "./Trigger.module.css";


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
    disabled: PropTypes.bool,
    em: PropTypes.string,
    error: PropTypes.bool,
    iconSize: PropTypes.string,
    id: PropTypes.string,
    kind: PropTypes.string,
    renderChipArea: PropTypes.func,
    setTriggerRef: PropTypes.any,
    onClear: PropTypes.func,
  }

  static defaultProps = {
    ariaLabel: undefined,
    className: undefined,
    disabled: false,
    em: "low",
    error: false,
    id: "",
    iconSize: "small",
    kind: "input",
    renderChipArea: undefined,
    setTriggerRef: null,
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
      em,
      error,
      kind,
      disabled,
      renderChipArea,
      setTriggerRef,
      onClear,
      iconSize,
      ...buttonProps
    } = this.props;
    const { size } = this.context;

    const classNames = [
      style.trigger,
      { [style.error]: error },
      className,
    ];

    const Icon = Icons[iconSize] || ChevronDown;
    const caretClassName = [
      style.caret,
      {
        [style["caret-small"]]: size === "S" || iconSize === "small",
        [style["caret-medium"]]: size === "M" || iconSize === "medium",
        [style["caret-large"]]: size === "L" || iconSize === "large",
      },
    ];

    return (
      <div {...props}>
        <div ref={setTriggerRef}>
          {renderChipArea?.()}
          <Button
            aria-label={ariaLabel || (typeof children === "string" ? children : undefined)}
            kind={kind}
            em={em}
            span="full"
            justify="between"
            disabled={disabled}
            data-id="select-trigger-btn"
            onClick={onToggle}
            {...buttonProps}
            className={classnames(classNames)}
          >
            <Button.Label wrap="ellipsis">{children}</Button.Label>
            <Button.IconGroup interactive={true}>
              {onClear && (
                <Button.InteractiveIcon
                  className={classnames(style.clear)}
                  tooltip="Clear selection"
                  blend={false}
                  disabled={disabled}
                  onClick={this.onClear}
                >
                  <Cancel />
                </Button.InteractiveIcon>
              )}
              <Button.InteractiveIcon tooltip="Show options" blend={false} disabled={disabled} onClick={onToggle}>
                <Icon className={classnames(caretClassName)} />
              </Button.InteractiveIcon>
            </Button.IconGroup>
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
