import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component, createRef } from "react";

import FigshareLoader from "../icons/figshare/logo.jsx";
import { Button } from "../button";
import { Dropdown } from "../dropdown";
import withRef from "../helpers/withRef.jsx";

import Trigger from "./Trigger";
import Content from "./Content";
import _option from "./Option";
import Context from "./context.js";
import style from "./Select.css";


export class Select extends Component {
  static propTypes = {
    ariaLabel: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    clearSearchOnSelect: PropTypes.bool,
    contentClassName: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    iconSize: PropTypes.string,
    id: PropTypes.string,
    loading: PropTypes.bool,
    loadingErrorMessage: PropTypes.string,
    multiple: PropTypes.bool,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    placement: PropTypes.oneOf([
      "bottom", "bottom-start", "bottom-end",
      "top", "top-start", "top-end",
      "right", "right-start", "right-end",
      "left", "left-start", "left-end",
    ]),
    popperModifiers: PropTypes.array,
    renderChipArea: PropTypes.func,
    renderTrigger: PropTypes.func,
    required: PropTypes.bool,
    retry: PropTypes.shape({
      message: PropTypes.string,
      action: PropTypes.func,
    }),
    searchPlaceholder: PropTypes.string,
    searchable: PropTypes.bool,
    size: PropTypes.oneOf(["S", "M", "L"]),
    triggerClassName: PropTypes.string,
    value: PropTypes.any,
    variant: PropTypes.oneOf(["icon", "primary", "publish", "secondary", "link", "lightLink", "inline"]),
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onLoadMore: PropTypes.func,
    onSearch: PropTypes.func,
    onToggle: PropTypes.func,
  }

  static defaultProps = {
    ariaLabel: undefined,
    children: null,
    className: undefined,
    clearSearchOnSelect: false,
    contentClassName: undefined,
    disabled: false,
    error: false,
    forwardedRef: () => undefined,
    iconSize: "small",
    id: "",
    loading: false,
    loadingErrorMessage: undefined,
    multiple: false,
    options: undefined,
    placeholder: "Select an option",
    placement: "bottom-start",
    popperModifiers: [],
    renderChipArea: undefined,
    renderTrigger: undefined,
    retry: undefined,
    required: false,
    searchPlaceholder: "Search...",
    searchable: false,
    size: "M",
    triggerClassName: undefined,
    value: undefined,
    variant: "secondary",
    onChange: () => undefined,
    onLoadMore: () => undefined,
    onSearch: undefined,
    onToggle: () => undefined,
    onClear: undefined,
  }

  state = {
    isVisible: false,
    search: undefined,
  }

  options = [];
  content = null;

  triggerRef = createRef;

  render() {
    return (
      <Dropdown
        isVisible={this.state.isVisible}
        itemSelector={"* > button, * > input"}
        onToggle={this.onToggle}
      >
        {this.renderSelect}
      </Dropdown>
    );
  }

  renderSelect = ({ props }) => {
    const {
      ariaLabel,
      className,
      forwardedRef,
      contentClassName,
      disabled,
      error,
      loading,
      loadingErrorMessage,
      multiple,
      popperModifiers,
      renderChipArea,
      searchPlaceholder,
      searchable,
      size,
      triggerClassName,
      value,
      variant,
      onLoadMore,
      placement,
      onClear,
      id,
      iconSize,
      required,
    } = this.props;
    const { search, isVisible } = this.state;

    const context = {
      multiple,
      searchPlaceholder,
      search,
      searchable,
      size,
      value,
      triggerRef: this.triggerRef,
      onSearch: this.onSearch,
      onSelect: this.onSelect,
      storeOption: this.storeOption,
    };

    const selectClassName = [style.select, className, { [style.visible]: isVisible }];

    return (
      <Context.Provider value={context}>
        <div ref={forwardedRef} className={classnames(selectClassName)} {...props}>
          <Trigger
            aria-required={required}
            ariaLabel={ariaLabel}
            className={triggerClassName}
            disabled={disabled}
            error={error}
            iconSize={iconSize}
            id={id}
            renderChipArea={renderChipArea}
            setTriggerRef={this.setTriggerRef}
            variant={variant}
            onClear={onClear}
          >
            {this.triggerValue}
          </Trigger>
          <Content
            ref={this.setContentRef}
            className={contentClassName}
            error={!!loadingErrorMessage}
            loading={loading}
            placement={placement}
            popperModifiers={popperModifiers}
            onLoadMore={onLoadMore}
          >
            {this.props.children}
            {this.renderLoading()}
            {this.renderLoadingError()}
          </Content>
        </div>
      </Context.Provider>
    );
  }

  renderLoadingError = () => {
    const { loadingErrorMessage } = this.props;

    if (!loadingErrorMessage) {
      return null;
    }

    return (
      <div className={style.error}>
        <span>{loadingErrorMessage}</span>
        {this.renderRetry()}
      </div>
    );
  }

  renderRetry = () => {
    const { retry } = this.props;

    if (!retry) {
      return null;
    }

    const { action, message } = retry;

    if (!(action && message)) {
      return null;
    }

    return (
      <Button className={style.retry} onClick={action}>
        {message}
      </Button>
    );
  }

  renderLoading = () => {
    const { loading } = this.props;

    if (!loading) {
      return null;
    }

    return (
      <div className={style.loading}>
        <FigshareLoader animate={true} className={style.loader} />
      </div>
    );
  }

  setContentRef = (node) => this.content = node;

  setTriggerRef = (node) => this.triggerRef = node;

  onSearch = (search) => {
    if (this.props.onSearch) {
      this.setState({ search: undefined }, () => {
        this.props.onSearch(search);
      });

      return;
    }

    this.setState({ search });
  }

  onToggle = (_, { isVisible }) => {

    // react-17 propagation fix
    _?.stopPropagation?.();

    this.setState({ isVisible }, () => {
      this.props.onToggle(this.state.isVisible);
    });
  };

  onSelect = (value) => {
    const { multiple, value: currentValue, onChange, clearSearchOnSelect } = this.props;

    if (multiple) {
      let newValue = undefined;

      if (currentValue && currentValue.length) {
        newValue = [...currentValue];

        const index = newValue.findIndex((item) => item === value);

        if (index === -1) {
          newValue.push(value);
        } else {
          newValue.splice(index, 1);
          if (!newValue.length) {
            newValue = undefined;
          }
        }
      } else {
        newValue = [value];
      }

      onChange(newValue);

      return;
    }

    onChange(value);
    this.onToggle(null, { isVisible: false });
    this.triggerRef?.querySelector("[data-id=\"select-trigger-btn\"]")?.focus?.();

    if (clearSearchOnSelect) {
      this.content.onSearch("");
    }
  }

  storeOption = (value, name) => {
    const optionValue = JSON.stringify(value);
    const index = this.options.findIndex((option) => option.value === optionValue);

    if (index !== -1) {
      this.options[index].name = name;
    } else {
      this.options.push({ value: optionValue, name });
    }
  }

  get triggerValue() {
    const { multiple, value, placeholder, renderTrigger } = this.props;

    if (renderTrigger) {
      return renderTrigger(value);
    }

    if (!value) {
      return placeholder;
    }

    if (multiple) {
      const selected = value.map((v) => {
        const option = this.options.find((item) => item.value === JSON.stringify(v));

        return option?.name;
      });

      return selected.join(", ");
    }

    const selected = this.options.find((option) => option.value === JSON.stringify(value));

    if (!selected) {
      return placeholder;
    }

    return selected.name;
  }
}

const exported = withRef(Select);

export const Option = _option;

exported.Option = Option;

export default exported;
