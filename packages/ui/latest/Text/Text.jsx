
import React from "react";
import PropTypes from "prop-types";
import clsx from "classnames";

import { useTextDirection } from "../../hooks/useTextDirection";

import "./Text.module.css";


export const Text = React.forwardRef(({ children, tag, className, kind, weight, color, wrap, align, inferDirection, ...rest }, ref) => {
  const Tag = tag;
  // Use directionality info for the text content if wanted by toggling inferDirection prop.
  // This is useful for text elements that contain user provided content, whose directionality is not known in advance.
  const directionality = useTextDirection({ children, inferDirection, ref });

  return (
    <Tag
      ref={ref}
      className={clsx("typography", `${kind}`, {
        [`weight-${weight}`]: weight,
        [`color-${color}`]: color,
        [`wrap-${wrap}`]: wrap,
        [`text-align-${align}`]: align,
      }, className)}
      {...directionality.props}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Text.displayName = "Text";

Text.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(["left", "center", "right"]),
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "primary", "secondary", "tertiary",
    "error", "warning", "success", "info",
    "disabled", "inherit", "initial", "currentColor",
  ]),
  kind: PropTypes.oneOf([
    "title-1", "title-2", "title-3", "title-4",
    "body", "body-2", "body-3", "caption", "label", "label-2", "label-3",
  ]),
  tag: PropTypes.string,
  weight: PropTypes.oneOf(["regular", "bold"]),
  wrap: PropTypes.oneOf(["ellipsis", "nowrap", "break-all"]),
  inferDirection: PropTypes.bool,
};

Text.defaultProps = {
  className: "",
  kind: "body",
  tag: "span",
  align: undefined,
  weight: undefined,
  wrap: undefined,
  color: undefined,
  inferDirection: false,
};

export default Text;
