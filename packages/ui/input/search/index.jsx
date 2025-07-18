import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { IconButton } from "../../button";

import { sizes, iconSizes } from "./constants";
import styles from "./index.css";


const themes = {
  default: styles.defaultContainer,
  underline: styles.underlineContainer,
};

export default class SearchInput extends PureComponent {
  static propTypes = {
    /**
     Search form action to execute when search query is submitted.
     */
    action: PropTypes.string,
    /**
     Optional class to append to the search input.
     */
    className: PropTypes.string,
    /**
     Disable the input and query submission.
     */
    disabled: PropTypes.bool,
    /**
     Mark the input as being in an error state, visually.
     */
    error: PropTypes.bool,
    /**
     Identifier value for the input.
     */
    id: PropTypes.string,
    /**
     Semantic label contents for the search input.
     If undefined, the label will not be rendered.
     */
    label: PropTypes.string,
    /**
     Search action http method.
     */
    method: PropTypes.string,

    /**
    * The search icon button type
    */
    searchButtonType: PropTypes.oneOf(["submit", "button"]),

    /**
     Controls the size variant of the input.
     */
    size: PropTypes.oneOf(Object.keys(sizes)),
    /**
     Controls the visual theme of the input.
     */
    theme: PropTypes.oneOf(Object.keys(themes)),
    /**
     The search query value.
     */
    value: PropTypes.string,
    /**
     Called when the search query value changes
     */
    onChange: PropTypes.func,
    /**
     Called when the search form is submitted.
     */
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    action: undefined,
    className: undefined,
    disabled: false,
    error: false,
    id: undefined,
    label: "Search",
    method: "get",
    size: "S",
    theme: "default",
    value: undefined,
    onChange: undefined,
    onSubmit: undefined,
    searchButtonType: "submit",
  }

  state = { isInputFocused: false }

  render() {
    const {
      className, disabled, error, label,
      value, method, size, theme, action,
      searchButtonType, onSubmit, ...props
    } = this.props;
    const { isInputFocused } = this.state;
    const SubmitIcon = iconSizes.submit[size];

    const classNames = [
      styles.container,
      className,
      themes[theme],
      { [styles.isFocused]: isInputFocused },
      { [styles.error]: error },
      { [styles.isDisabled]: disabled },
    ];

    return (
      <form
        action={action}
        className={classnames(classNames)}
        method={method}
        role="search"
        onSubmit={onSubmit}
      >
        {label ? (<label className={styles.label} htmlFor={props.id}>{label}</label>) : null}
        <input
          {...props}
          aria-disabled={disabled || undefined}
          aria-invalid={error || undefined}
          className={styles.input}
          data-size={size}
          disabled={disabled || undefined}
          type="text"
          value={value}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
        />
        {this.renderClearIcon()}
        <IconButton
          Icon={SubmitIcon}
          data-search-url={`/search?q=${value}`}
          size={size}
          tabIndex={searchButtonType === "button" ? -1 : undefined}
          theme="tertiary"
          type={searchButtonType}
        >
          {searchButtonType === "button" ? "" : "Search"}
        </IconButton>
      </form>
    );
  }

  renderClearIcon = () => {
    const { size, value } = this.props;
    const ClearIcon = iconSizes.clear[size];

    if (!value) {
      return null;
    }

    return (
      <IconButton Icon={ClearIcon} size={size} theme="tertiary" onClick={this.onClear}>
        Clear search
      </IconButton>
    );
  }

  onFocus = () => this.setState({ isInputFocused: true });
  onBlur = () => this.setState({ isInputFocused: false });

  onChange = (e) => {
    const { disabled, onChange } = this.props;

    if (disabled) {
      return;
    }

    onChange(e);
  }

  onClear = (e) => {
    e.target.value = "";
    this.onChange(e);

    if (this.props.id) {
      const inputElement = document.querySelector(`#${this.props.id}`);

      if (inputElement) {
        inputElement.focus();
      }
    }
  }
}
