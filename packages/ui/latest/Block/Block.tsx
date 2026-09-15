import React from "react";
import PropTypes from "prop-types";
import clsx from "classnames";

import "./Block.module.css";

import { useTextDirection } from "../../hooks/useTextDirection";
import type { BlockProps } from "./types";

export const Block = React.forwardRef(({ children, kind = "layout-rows", className, tag: Tag = "div", mark, inferDirection = false, ...rest }: BlockProps, ref) => {
  // Use directionality info for the block content if wanted by toggling inferDirection prop.
  // This is useful for blocks that might contain user provided content, whose directionality is not known in advance.
  const directionality = useTextDirection({ children, inferDirection, ref });

  const own: Record<string, unknown> = {
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


export { Block as Box };

export default Block;
