import React from "react";
import PropTypes from "prop-types";
import TextInput from "@digital-science/figshare-fcl/input/text";
import SearchSvg from "@digital-science/figshare-fcl/icons/react/Search";
import CloseSvg from "@digital-science/figshare-fcl/icons/react/Close";
import { useControllableState } from "@digital-science/figshare-fcl/helpers/useControllableState";

import { Button } from "../Button";

import styles from "./SearchInput.module.css";

/*
  A SearchInput implementation that does not rely on form element, which means it can be used independently
  Or nested inside another form element.
  It also supports being a controlled or uncontrolled component, depending on whether the value and setValue props are provided.
  And has better behavior for submission and clearing the input, as well as accessibility improvements.
 */
export function SearchInput({ id, value: providedValue, setValue: providedSetValue, defaultValue, onChange, onSubmit, ...rest }) {
  const [value, setValue] = useControllableState({ value: providedValue, setValue: providedSetValue, defaultValue });
  const generatedId = useUniqueId();
  const inputRef = React.useRef(null);
  const inputId = id || generatedId;
  const { name: fieldName = inputId, onKeyDown } = rest;

  const onChangeHandler = React.useCallback((event) => {
    setValue(event.target.value);
    onChange?.(asPacketOrEventLikeObject(event.target.value, fieldName));
  }, [onChange, fieldName]);

  const onKeyDownHandler = React.useCallback((event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit?.(asPacketOrEventLikeObject(value, fieldName));
    }
    onKeyDown?.(event);
  }, [onSubmit, onKeyDown, fieldName, value]);

  const onClearHandler = React.useCallback(() => {
    setValue("");
    const clearEvent = asPacketOrEventLikeObject("", fieldName);
    onChange?.(clearEvent);
    onSubmit?.(clearEvent);

    // After clearing the input, we want to focus it so that the user can immediately start typing a new search query if they wish
    inputRef?.current?.focus?.();
  }, [onChange, onSubmit, fieldName]);

  const onSubmitHandler = React.useCallback(() => {
    onSubmit?.(asPacketOrEventLikeObject(value, fieldName));
  }, [onSubmit, value, fieldName]);

  return (
    <div role="search" className={styles.searchInput} data-scope="search-input" data-part="search-input-wrap" data-clearable={!!value}>
      <label htmlFor={inputId} data-visually-hidden="true">
        Search
      </label>
      <TextInput
        ref={inputRef}
        id={inputId}
        data-part="search-input-field"
        placeholder="Search"
        value={value}
        aria-label="Search"
        {...rest}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      <div className={styles.searchInputButtons} data-part="search-input-buttons">
        {value && (
          <Button
            id={`clear-${inputId}`}
            type="button"
            span="icon"
            data-part="search-input-clear-button"
            kind="tertiary"
            em="low"
            aria-label="Clear search"
            tabIndex={-1}
            onClick={onClearHandler}
          >
            <Button.Label hidden={true}>Clear</Button.Label>
            <Button.Icon>
              <CloseSvg />
            </Button.Icon>
          </Button>
        )}
        <Button
          id={`submit-${inputId}`}
          type="button"
          data-part="search-input-submit-button"
          kind="tertiary"
          em="low"
          span="icon"
          tabIndex={-1}
          onClick={onSubmitHandler}
        >
          <Button.Label hidden={true}>Search</Button.Label>
          <Button.Icon>
            <SearchSvg />
          </Button.Icon>
        </Button>
      </div>
    </div>
  );
}

SearchInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

SearchInput.defaultProps = {
  id: undefined,
  value: undefined,
  setValue: undefined,
  defaultValue: "",
  onChange: undefined,
  onSubmit: undefined,
};

export default SearchInput;


// Generate unique IDs for accessibility
let idCounter = 0;

export function useUniqueId(prefix = "search-input") {
  const idRef = React.useRef(null);
  if (idRef.current === null) {
    idCounter += 1;
    idRef.current = `${prefix}-${idCounter}`;
  }

  return idRef.current;
}

const noop = () => true;

export function asPacketOrEventLikeObject(value, name) {
  return { value, name, target: { value, name }, preventDefault: noop, stopPropagation: noop };
}
