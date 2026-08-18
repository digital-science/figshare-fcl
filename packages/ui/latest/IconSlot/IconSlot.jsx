import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./IconSlot.module.css";


export function IconSlot({ icon, kind, children, className: providedClassName, asChild = true, ...props }) {
  const className = classnames("icon-slot", providedClassName);
  let node = children;

  if (icon) {
    const IconType = icon;

    node = <IconType />;
  }

  if (asChild && React.isValidElement(node)) {
    return React.cloneElement(node, {
      className,
      "data-part": "icon-item",
      "data-kind": kind,
      "aria-hidden": true,
      ...props,
      ...node.props,
    });
  }

  return (
    <span className={className} data-part="icon-slot" data-kind={kind} aria-hidden="true" {...props}>
      {node}
    </span>
  );
}

IconSlot.propTypes = {
  /**
   * Clones and renders the child element directly passing it additional props.
   * Useful if we do not want to `wrap` the icon element further in an `icon-slot` element.
   */
  asChild: PropTypes.bool,
  /**
   * The icon node we want to render or a set of them.
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * The icon component we want to render.
   */
  icon: PropTypes.node,
  kind: PropTypes.oneOf(["blend", "text", "danger", "success", "warning", "item-type", "item-type active", "item-type inactive"]),
};

IconSlot.defaultProps = {
  children: undefined,
  className: undefined,
  icon: undefined,
  kind: "blend",
  asChild: false,
};
