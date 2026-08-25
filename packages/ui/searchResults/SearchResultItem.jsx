import React, { useContext } from "react";
import PropTypes from "prop-types";

import Button from "../latest/Button";

import Context from "./context";
// eslint-disable-next-line css-modules/no-unused-class
import styles from "./SearchResults.module.css";


export const SearchResultItem = ({ children, value }) => {
  const context = useContext(Context);
  const { onSelect } = context;

  const handleClick = () => {
    onSelect(value);
  };

  return (
    <Button
      className={styles.item}
      kind="secondary"
      em="high"
      onClick={handleClick}
    >
      <Button.Label>{children}</Button.Label>
    </Button>
  );
};

SearchResultItem.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object,
};

SearchResultItem.defaultProps = { value: undefined };

export default SearchResultItem;
