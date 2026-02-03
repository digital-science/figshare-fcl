import React from "react";
import PropTypes from "prop-types";
import clsx from "classnames";

import "./Block.css";


export function Block({ children, kind, className, tag: Tag, mark, ...rest }) {
  const own = {
    className: clsx("block", className),
    "data-kind": kind,
  };

  if (mark) {
    // Use mark as id and key
    own.id = mark;
    own.key = mark;
  }

  return (
    <Tag
      {...own}
      {...rest}
    >
      {children}
    </Tag>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  kind: PropTypes.string,
  mark: PropTypes.string,
  tag: PropTypes.string,
};

Block.defaultProps = {
  children: undefined,
  className: undefined,
  kind: "layout-rows",
  layout: undefined,
  border: undefined,
  gap: undefined,
  padding: undefined,
  span: undefined,
  mark: undefined,
  tag: "div",
};

export { Block as Box };

export default Block;
