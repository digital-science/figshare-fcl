import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./Tag.module.css";


export function Tag({ children, pill, color, className }) {
  return (
    <div
      className={classnames(styles.tag, { [styles.pill]: pill }, className)}
      data-color={color}
      data-part="tag"
    >
      <span>
        {children}
      </span>
    </div>
  );
}

const TAG_COLORS = {
  neutral: "neutral",
  blue: "blue",
  green: "green",
  greenFilled: "green-filled",
  orange: "orange",
  red: "red",
  purple: "purple",
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(Object.values(TAG_COLORS)),
  pill: PropTypes.bool,
};

Tag.defaultProps = {
  className: undefined,
  color: TAG_COLORS.neutral,
  pill: false,
};

Tag.colors = TAG_COLORS;

export default Tag;
