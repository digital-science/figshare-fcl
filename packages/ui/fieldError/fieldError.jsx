import React, { useMemo } from "react";
import classnames from "classnames";
import { node, string, shape, oneOf, bool } from "prop-types";

import Warning from "../icons/warning/medium";

// eslint-disable-next-line css-modules/no-unused-class
import styles from "./fieldError.module.css";


export function FieldError({ error, field, fullWidth, size, className }) {
  const message = error?.message;
  const id = error?.id;
  const valid = useMemo(() => {
    if (message) {
      return false;
    }

    return true;
  }, [id, message]);

  const descriptor = useMemo(() => {
    if (message) {
      return { ...error, message };
    }

    return { at: "none", message: "" };
  }, [message, field]);

  return (
    <div
      className={
        classnames(
          styles.fieldError,
          styles[size],
          valid ? styles.valid : styles.invalid,
          { [styles.fullWidth]: fullWidth },
          className)
      }
      data-error={!valid}
      data-error-at={descriptor.at}
      data-error-for={field}
      data-error-id={id}
    >
      <div className={styles.errorEntry}>
        {!valid && <div>{message}</div>}
        <Warning className={styles.warningIcon} />
      </div>
    </div>
  );
}

FieldError.propTypes = {
  /**
   * Optional class name to append to the field error node
   */
  className: string,
  /**
   * Object describing the field error that we want to display.
   */
  error: shape({
    /**
     * Information about the error, when or why it happened.
     * Can be simply stated as: "blur"/"change"/"submit"
     */
    at: string,
    /**
     * Error message contents to display.
     */
    message: node,
    /**
     * Unique id for this particular error instance
     */
    id: string,
  }),
  /**
   * Unique id of the field this error is linked to.
   */
  field: string,
  /**
   * Makes the error take the full width of the parent, no margins.
   */
  fullWidth: bool,
  /**
   * Size variant for the field error.
   * Recommended use: "small" for overlay forms and "large" for full page forms.
   */
  size: oneOf(["small", "large"]),
};

FieldError.defaultProps = { className: undefined, field: "unknown", fullWidth: false, error: undefined, size: "small" };

export default FieldError;
