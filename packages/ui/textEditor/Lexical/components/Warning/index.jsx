import React from "react";
import { number } from "prop-types";

import styles from "./Warning.module.css";


export const Warning = ({ contentLength, minLength, maxLength }) => {
  if (contentLength < minLength) {
    return null;
  }

  return (
    <div className={styles.editorTextLength}>
      <span>{`${contentLength} out of a maximum of ${maxLength} characters (includes html tags)`}</span>
    </div>
  );
};

Warning.propTypes = { contentLength: number, maxLength: number, minLength: number };
Warning.defaultProps = {
  contentLength: 0,
  minLength: 5000,
  maxLength: 10000,
};
