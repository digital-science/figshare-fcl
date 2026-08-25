import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";

import { Button } from "../button";
import FigshareLoader from "../icons/figshare/logo.jsx";

import styles from "./Summary.module.css";


export const Summary = React.forwardRef(({
  options = [],
  ariaLabel,
  ariaLabelledBy,
  className,
  disabled = false,
  error = false,
  errorMessage,
  hasInitialSummary = false,
  itemClassName,
  loading = false,
  retry,
  selectedValues,
  onChange = () => undefined,
  onLoadMore = () => undefined,
}, ref) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(containerRef.current);
      } else {
        ref.current = containerRef.current;
      }
    }
  }, [ref]);

  // Early return if no options to display
  if (hasInitialSummary) {
    if (loading) {
      return (
        <div className={styles.loading}>
          <FigshareLoader animate={true} className={styles.loader} />
        </div>
      );
    }
    if (errorMessage) {
      return renderErrorState();
    }
  }

  if (!options || !options.length) {
    return null;
  }

  return renderContent();

  function renderErrorState() {
    return (
      <div className={styles.error}>
        <span>{errorMessage}</span>
        {renderRetry()}
      </div>
    );
  }

  function renderRetry() {
    if (!retry) {
      return null;
    }

    const { action, message } = retry;

    if (!(action && message)) {
      return null;
    }

    return (
      <Button className={styles.retry} theme="secondary" onClick={action}>
        {message}
      </Button>
    );
  }

  function handleScroll(event) {
    if (!hasInitialSummary || error || loading) {
      return;
    }

    const { target } = event;
    const { scrollTop, scrollHeight, offsetHeight } = target;
    const diff = scrollHeight - offsetHeight - scrollTop;

    if (diff < 1) {
      onLoadMore();
    }
  }

  function handleItemChange(optionValue) {
    return () => {
      if (disabled) {
        return;
      }

      let newValue = undefined;

      if (selectedValues?.length) {
        newValue = [...selectedValues];

        const index = newValue.findIndex((item) => item === optionValue);

        if (index === -1) {
          newValue.push(optionValue);
        } else {
          newValue.splice(index, 1);
          if (!newValue.length) {
            newValue = undefined;
          }
        }
      } else {
        newValue = [optionValue];
      }

      onChange(newValue);
    };
  }

  function handleKeyDown(event) {
    if (event.key === "Tab" && event.shiftKey) {
      event.preventDefault();
    }
  }

  function renderContent() {
    const summaryClasses = [styles.summary, className];

    return (
      <div
        ref={containerRef}
        aria-invalid={error}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-multiselectable="true"
        className={classnames(summaryClasses)}
        role="listbox"
        tabIndex="-1"
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
      >
        {options.map((option) => renderItem(option))}
      </div>
    );
  }

  function renderItem({ name, value: optionValue }) {
    const checked = selectedValues?.includes(optionValue);

    return (
      <button
        key={optionValue}
        aria-selected={checked}
        className={classnames(styles.item, itemClassName)}
        disabled={disabled}
        role="option"
        tabIndex={-1}
        onClick={handleItemChange(optionValue)}
      >
        <span className={styles.checkmark}>
          <input
            readOnly={true}
            aria-hidden="true"
            checked={checked}
            tabIndex={-1}
            type="checkbox"
          />
        </span>
        <span>{name}</span>
      </button>
    );
  }
});

Summary.displayName = "Summary";

Summary.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })).isRequired,
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  hasInitialSummary: PropTypes.bool,
  itemClassName: PropTypes.string,
  loading: PropTypes.bool,
  retry: PropTypes.shape({
    message: PropTypes.string,
    action: PropTypes.func,
  }),
  selectedValues: PropTypes.any,
  onChange: PropTypes.func,
  onLoadMore: PropTypes.func,
};

Summary.defaultProps = {
  ariaLabel: undefined,
  ariaLabelledBy: undefined,
  className: undefined,
  disabled: false,
  error: false,
  errorMessage: undefined,
  hasInitialSummary: false,
  itemClassName: undefined,
  loading: false,
  retry: undefined,
  selectedValues: undefined,
  onChange: () => undefined,
  onLoadMore: () => undefined,
};

export default Summary;
