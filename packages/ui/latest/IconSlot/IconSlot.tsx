import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./IconSlot.module.css";


type IconSlotProps = {
  /**
   * Clones and renders the child element directly passing it additional props.
   * Useful if we do not want to `wrap` the icon element further in an `icon-slot` element.
   */
  asChild?: boolean;
  /**
   * The icon node we want to render or a set of them.
   */
  children?: React.ReactNode;
  className?: string;
  /**
   * The icon component we want to render.
   */
  icon?: React.ElementType;
  kind?: "blend" | "text" | "danger" | "success" | "warning" | "item-type" | "item-type active" | "item-type inactive";
};


export function IconSlot({ icon, kind, children, className: providedClassName, asChild = true, ...props }: IconSlotProps) {
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
      ...node.props as React.HTMLAttributes<HTMLElement> & { className: typeof className, "data-part": "icon-item", "data-kind": typeof kind, "aria-hidden": boolean },
    });
  }

  return (
    <span className={className} data-part="icon-slot" data-kind={kind} aria-hidden="true" {...props}>
      {node}
    </span>
  );
}

IconSlot.displayName = "IconSlot";