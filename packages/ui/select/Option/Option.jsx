import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component, createRef } from "react";

import { Button } from "../../button";
import Checkmark from "../../input/checkbox/components/checkmark.jsx";
import Context from "../context.js";

import { debounce } from "./utils.js";
import style from "./Option.css";


export class Option extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    hasEllipsis: PropTypes.bool,
    isSelectWithSummary: PropTypes.bool,
    optionValue: PropTypes.string,
    value: PropTypes.any,
  }

  static defaultProps = {
    className: undefined,
    children: null,
    disabled: false,
    hasEllipsis: false,
    isSelectWithSummary: false,
    value: undefined,
    optionValue: "value",
    forwardedRef: null,
  }

  static contextType = Context;

  state = { longTextOption: false }

  optionRef = createRef();

  componentDidMount() {
    const { value, children } = this.props;

    this.context.storeOption(value, children);

    this.handleResize();

    const delay = 500;
    this.debounced = debounce(this.handleResize, delay);
    window.addEventListener("resize", this.debounced);
  }

  componentDidUpdate(prevProps) {
    const { value, children } = this.props;

    if (JSON.stringify(value) !== JSON.stringify(prevProps.value) || children !== prevProps.children) {
      this.context.storeOption(value, children);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debounced);
  }

  render() {
    return (
      <Context.Consumer>
        {this.renderWithContext}
      </Context.Consumer>
    );
  }

  renderWithContext = ({ multiple: isMultiSelect, value: allValues, search, size, onSelect }) => {
    const {
      children,
      forwardedRef,
      className,
      disabled,
      hasEllipsis,
      isSelectWithSummary,
      value,
      optionValue,
      ...props
    } = this.props;
    const { longTextOption } = this.state;

    if (search) {
      if (!children.toLowerCase().includes(search.toLowerCase())) {
        return null;
      }
    }

    this.onSelect = onSelect;

    let selected = false;
    if (isMultiSelect) {
      selected = (allValues ?? []).find((selectedVal) => selectedVal === value);
    } else {
      selected = JSON.stringify(Object(allValues)) === JSON.stringify(Object(value));
    }
    const optionClassName = [style.option, className, {
      [style.selected]: selected,
      [style.ellipsis]: hasEllipsis,
      [style.disabled]: disabled,
      [style.small]: size === "S",
      [style.longTextOption]: ((longTextOption && isSelectWithSummary) || (longTextOption && !hasEllipsis)),
    }];

    return (
      <div ref={this.optionRef} className={style.optionWrap}>
        <span className={style.hidden}>{children}</span>
        <Button
          ref={forwardedRef}
          className={
            classnames(optionClassName)
          }
          disabled={disabled}
          theme="tertiary"
          value={typeof value === "string" ? value : value[optionValue]?.toString?.()}
          variant="inline"
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
          {...props}
        >
          {this.renderCheckmark(isMultiSelect, allValues)}
          <span>{children}</span>
        </Button>
      </div>
    );
  }

  renderCheckmark = (isMultiSelect, allValues = []) => {
    const { value } = this.props;

    if (!isMultiSelect) {
      return null;
    }

    const checked = allValues.includes(value);

    return <Checkmark checked={checked} className={style.checkbox} />;
  }

  onClick = () => {
    const { value, children } = this.props;
    this.onSelect(value, children);
  }

  onKeyDown = (ev) => {
    const { triggerRef } = this.context;

    if (ev.key === "Escape" && triggerRef) {
      triggerRef?.querySelector("[data-id=\"select-trigger-btn\"]")?.focus?.();
    }
  }

  handleResize = () => {
    const { optionRef } = this;
    const boxWidth = optionRef.current?.offsetWidth;
    const fullTextWidth = optionRef?.current?.children[0].offsetWidth;

    if (fullTextWidth > boxWidth) {
      this.setState({ longTextOption: true });
    }
  };
}

export default Option;
