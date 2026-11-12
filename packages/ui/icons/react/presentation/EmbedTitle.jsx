import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgEmbedTitle = (allProps) => {
  const { blend, secondaryColor, ...props } = allProps;
  const color = props.color ?? (blend ? "currentColor" : "#525252");
  const secondary = blend ? color : (secondaryColor ?? "#DDD");
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 133 120"
      focusable={false}
      aria-hidden={true}
      role="img"
      alt={props.title}
      {...props}
    >
      <rect height="86.667" rx="1" width="133" y="20" fill={secondary} />
      <rect height="13.333" rx=".5" width="133" fill={color} />
      <rect height="6.667" rx=".5" width="133" y="113.333" fill={secondary} />
    </svg>
  );
};
SvgEmbedTitle.propTypes = {
  blend: bool,
  color: string,
  secondaryColor: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgEmbedTitle.defaultProps = {
  blend: false,
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgEmbedTitle.displayName = "SvgEmbedTitle";
const Memo = memo(SvgEmbedTitle);
export default Memo;
