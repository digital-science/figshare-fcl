
import React from "react";
import clsx from "classnames";

import { useTextDirection } from "../../hooks/useTextDirection";

import type { TextProps } from "./types";

import styles from "./Text.module.css";


export const Text = React.forwardRef(({
  children,
  tag = "span",
  className = "",
  kind = "body",
  weight,
  color,
  wrap,
  align,
  inferDirection = false,
  ...rest
}: TextProps, ref: any) => {
  const Tag = tag;
  // Use directionality info for the text content if wanted by toggling inferDirection prop.
  // This is useful for text elements that contain user provided content, whose directionality is not known in advance.
  const directionality = useTextDirection({ children, inferDirection, ref });

  return (
    <Tag
      ref={ref}
      className={clsx(styles.typography, styles[kind], {
        [styles[`weight-${weight}`]]: weight,
        [styles[`color-${color}`]]: color,
        [styles[`wrap-${wrap}`]]: wrap,
        [styles[`text-align-${align}`]]: align,
      }, className)}
      {...directionality.props}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Text.displayName = "Text";

export default Text;
