import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useRef, useCallback } from "react";

import Button from "../button";
import RootCloseListener from "../helpers/rootCloseListener";

import Context from "./context";
// eslint-disable-next-line css-modules/no-unused-class
import styles from "./SearchResults.module.css";


export const SearchResults = ({
  children,
  contentClassName,
  error,
  hasResults,
  loading,
  noResultsMessage,
  placeholder,
  retry,
  search,
  onChangeSearchValue,
  onLoadMore,
  onSelect,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const handleScroll = useCallback((event) => {
    if (error || loading) {
      return;
    }

    const { target } = event;
    const { scrollTop, scrollHeight, offsetHeight } = target;
    const diff = scrollHeight - offsetHeight - scrollTop;

    if (diff <= 10) {
      onLoadMore();
    }
  }, [error, loading, onLoadMore]);

  const handleSelect = useCallback((value) => {
    onSelect(value);
    setIsVisible(false);
  }, [onSelect]);

  const handleFocusSearchInput = useCallback(() => {
    setIsVisible(hasResults);
  }, [hasResults]);

  const handleChangeSearchValue = useCallback((value) => {
    setIsVisible(value.length >= 3);
    onChangeSearchValue(value);
  }, [onChangeSearchValue]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const renderNoResults = () => {
    if (hasResults || loading || error) {
      return null;
    }

    return (
      <div className={styles.noResults}>
        {noResultsMessage}
      </div>
    );
  };

  const renderLoading = () => {
    if (!loading) {
      return null;
    }

    return (
      <div className={styles.loading}>
        <div className={styles.loader} />
      </div>
    );
  };


  const renderRetry = () => {
    if (!retry) {
      return null;
    }

    const { action, message } = retry;

    if (!(action && message)) {
      return null;
    }

    return (
      <Button
        className={styles.retry}
        theme="secondary"
        onClick={action}
      >
        {message}
      </Button>
    );
  };

  const renderError = () => {
    if (!error) {
      return null;
    }

    return (
      <div className={styles.error}>
        <span>{error}</span>
        {renderRetry()}
      </div>
    );
  };

  const handleContainerRef = useCallback((node) => {
    containerRef.current = node;
  }, []);

  const contextValue = { onSelect: handleSelect };

  const classes = classnames(
    styles.content,
    contentClassName,
    { [styles.visible]: isVisible }
  );

  return (
    <RootCloseListener
      disabled={!isVisible}
      innerRef={handleContainerRef}
      onClose={handleClose}
    >
      {({ ref }) => (
        <div ref={ref}>
          <Context.Provider value={contextValue}>
            <input
              ref={inputRef}
              placeholder={placeholder}
              value={search}
              type="text"
              role="combobox"
              aria-controls="search-results"
              aria-expanded={isVisible}
              onChange={(e) => handleChangeSearchValue(e.target.value)}
              onFocus={handleFocusSearchInput}
            />
            <div
              className={classes}
              onScroll={handleScroll}
            >
              {children}
              {renderNoResults()}
              {renderLoading()}
              {renderError()}
            </div>
          </Context.Provider>
        </div>
      )}
    </RootCloseListener>
  );
};

SearchResults.propTypes = {
  children: PropTypes.node.isRequired,
  contentClassName: PropTypes.string,
  error: PropTypes.string,
  hasResults: PropTypes.bool,
  loading: PropTypes.bool,
  noResultsMessage: PropTypes.string,
  placeholder: PropTypes.string,
  retry: PropTypes.shape({
    message: PropTypes.string,
    action: PropTypes.func,
  }),
  search: PropTypes.string,
  onChangeSearchValue: PropTypes.func,
  onLoadMore: PropTypes.func,
  onSelect: PropTypes.func,
};

SearchResults.defaultProps = {
  contentClassName: undefined,
  error: undefined,
  hasResults: false,
  loading: false,
  noResultsMessage: "",
  placeholder: "",
  retry: undefined,
  search: "",
  onChangeSearchValue: () => undefined,
  onLoadMore: () => undefined,
  onSelect: () => undefined,
};

export default SearchResults;
