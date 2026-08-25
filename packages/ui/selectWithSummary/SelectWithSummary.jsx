import PropTypes from "prop-types";
import React, { useState, useCallback, useMemo } from "react";
import classnames from "classnames";

import Select, { Option } from "../select";

import Summary from "./Summary";
import styles from "./SelectWithSummary.module.css";


export const SelectWithSummary = React.forwardRef(({
  options = [],
  ariaLabel,
  ariaLabelledBy,
  className,
  clearSearchOnSelect = false,
  contentClassName,
  disabled = false,
  error = false,
  hasInitialSummary = false,
  loading = false,
  loadingError,
  loadingSummary = false,
  placeholder = "Select an option",
  placement = "bottom-start",
  renderTrigger,
  retry,
  retrySummary,
  searchPlaceholder = "Search...",
  searchable = false,
  size = "M",
  summaryClassName,
  summaryErrorMessage,
  summaryItemClassName,
  summaryPreselectedValues = [],
  triggerClassName,
  value,
  variant = "secondary",
  onChange = () => undefined,
  onLoadMore = () => undefined,
  onLoadMoreSummary = () => undefined,
  onSearch,
  onToggle = () => undefined,
  ...restProps
}, ref) => {
  // Dual state tracking: touchedValues/touchedOptions
  const [touchedValues, setTouchedValues] = useState([]);
  const [touchedOptions, setTouchedOptions] = useState([]);

  // Calculate summary options
  const summaryOptions = useMemo(() => {
    let opts = [...touchedOptions];

    if (hasInitialSummary && !options.length) {
      opts = [...summaryPreselectedValues];
    }

    return opts;
  }, [touchedOptions, hasInitialSummary, summaryPreselectedValues]);

  // Render option with selection styling
  const renderOption = useCallback(({ name, value: optionValue }) => {
    const isSelected = (value ?? []).find((selectedVal) => selectedVal === optionValue);
    const optionClassName = [styles.option, { [styles.selected]: isSelected }];

    return (
      <Option
        key={optionValue}
        className={classnames(optionClassName)}
        isSelectWithSummary={true}
        value={optionValue}
      >
        {name}
      </Option>
    );
  }, [value]);

  // Handle select change with dual state tracking
  const handleChange = useCallback((newValue) => {
    // If value is cleared
    if (!newValue) {
      onChange(newValue);

      return;
    }

    // Check for new values not yet tracked
    const unstoredValues = newValue.filter((v) => !touchedValues.includes(v));

    if (!unstoredValues.length) {
      onChange(newValue);

      return;
    }

    // Find option objects for new values
    const unstoredOptions = unstoredValues.map((val) => (
      options.find((opt) => opt.value === val) ||
      summaryPreselectedValues.find((opt) => opt.value === val)
    )).filter(Boolean);

    // Update touched state
    setTouchedValues((prev) => [...prev, ...unstoredValues]);
    setTouchedOptions((prev) => [...prev, ...unstoredOptions]);

    onChange(newValue);
  }, [touchedValues, options, summaryPreselectedValues, onChange]);

  return (
    <div>
      <Select
        {...restProps}
        ref={ref}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        className={className}
        clearSearchOnSelect={clearSearchOnSelect}
        contentClassName={contentClassName}
        disabled={disabled}
        error={error}
        loading={loading}
        loadingErrorMessage={loadingError}
        multiple={true}
        options={options}
        placeholder={placeholder}
        placement={placement}
        renderTrigger={renderTrigger}
        retry={retry}
        searchPlaceholder={searchPlaceholder}
        searchable={searchable}
        size={size}
        triggerClassName={triggerClassName}
        value={value}
        variant={variant}
        onChange={handleChange}
        onLoadMore={onLoadMore}
        onSearch={onSearch}
        onToggle={onToggle}
      >
        {options.map(renderOption)}
      </Select>
      <Summary
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        className={summaryClassName}
        disabled={disabled}
        error={error}
        errorMessage={summaryErrorMessage}
        hasInitialSummary={hasInitialSummary}
        itemClassName={summaryItemClassName}
        loading={loadingSummary}
        options={summaryOptions}
        retry={retrySummary}
        selectedValues={value}
        onChange={onChange}
        onLoadMore={onLoadMoreSummary}
      />
    </div>
  );
});

SelectWithSummary.displayName = "SelectWithSummary";

SelectWithSummary.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })).isRequired,
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  className: PropTypes.string,
  clearSearchOnSelect: PropTypes.bool,
  contentClassName: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  hasInitialSummary: PropTypes.bool,
  loading: PropTypes.bool,
  loadingError: PropTypes.string,
  loadingSummary: PropTypes.bool,
  placeholder: PropTypes.string,
  placement: PropTypes.oneOf([
    "bottom", "bottom-start", "bottom-end",
    "top", "top-start", "top-end",
    "right", "right-start", "right-end",
    "left", "left-start", "left-end",
  ]),
  renderTrigger: PropTypes.func,
  retry: PropTypes.shape({
    message: PropTypes.string,
    action: PropTypes.func,
  }),
  retrySummary: PropTypes.shape({
    message: PropTypes.string,
    action: PropTypes.func,
  }),
  searchPlaceholder: PropTypes.string,
  searchable: PropTypes.bool,
  size: PropTypes.oneOf(["S", "M", "L"]),
  summaryClassName: PropTypes.string,
  summaryErrorMessage: PropTypes.string,
  summaryItemClassName: PropTypes.string,
  summaryPreselectedValues: PropTypes.array,
  triggerClassName: PropTypes.string,
  value: PropTypes.any,
  variant: PropTypes.oneOf(["icon", "primary", "publish", "secondary", "link", "lightLink", "inline"]),
  onChange: PropTypes.func,
  onLoadMore: PropTypes.func,
  onLoadMoreSummary: PropTypes.func,
  onSearch: PropTypes.func,
  onToggle: PropTypes.func,
};

SelectWithSummary.defaultProps = {
  ariaLabel: undefined,
  ariaLabelledBy: undefined,
  className: undefined,
  clearSearchOnSelect: false,
  contentClassName: undefined,
  disabled: false,
  error: false,
  hasInitialSummary: false,
  loading: false,
  loadingError: undefined,
  loadingSummary: false,
  placeholder: "Select an option",
  placement: "bottom-start",
  renderTrigger: undefined,
  retry: undefined,
  retrySummary: undefined,
  searchPlaceholder: "Search...",
  searchable: false,
  size: "M",
  summaryClassName: undefined,
  summaryErrorMessage: undefined,
  summaryItemClassName: undefined,
  summaryPreselectedValues: [],
  triggerClassName: undefined,
  value: undefined,
  variant: "secondary",
  onChange: () => undefined,
  onLoadMore: () => undefined,
  onLoadMoreSummary: () => undefined,
  onSearch: () => undefined,
  onToggle: () => undefined,
};

export default SelectWithSummary;
