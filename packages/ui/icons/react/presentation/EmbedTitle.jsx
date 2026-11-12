import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgEmbedTitle = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 133 120"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <rect
      height="86.667"
      rx="1"
      width="133"
      y="20"
      fill={props.color}
    />
    <rect
      height="13.333"
      rx=".5"
      width="133"
      fill={props.color}
    />
    <rect
      height="6.667"
      rx=".5"
      width="133"
      y="113.333"
      fill={props.color}
    />
  </svg>
);
SvgEmbedTitle.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgEmbedTitle.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgEmbedTitle.displayName = "SvgEmbedTitle";
const Memo = memo(SvgEmbedTitle);
export default Memo;
