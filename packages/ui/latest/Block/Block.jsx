import React from "react";
import PropTypes from "prop-types";
import clsx from "classnames";

import "./Block.module.css";
import { useTextDirection } from "../../hooks/useTextDirection";


export const Block = React.forwardRef(({ children, kind, className, tag: Tag, mark, inferDirection, ...rest }, ref) => {
  // Use directionality info for the block content if wanted by toggling inferDirection prop.
  // This is useful for blocks that might contain user provided content, whose directionality is not known in advance.
  const directionality = useTextDirection({ children, inferDirection, ref });

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
      {...directionality.props}
      {...own}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Block.displayName = "Block";

Block.propTypes = {
  kind: PropTypes.string,
  tag: PropTypes.string,
  mark: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  inferDirection: PropTypes.bool,
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
  inferDirection: false,
};

export { Block as Box };

export default Block;
