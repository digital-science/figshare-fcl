import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgMedia = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 24"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.333 8.471c0-.207.227-.335.404-.229l5.882 3.53a.267.267 0 0 1 0 .457l-5.882 3.529a.267.267 0 0 1-.404-.229V8.471z"
      fillRule="evenodd"
      fill={props.color}
    />
    <path
      clipRule="evenodd"
      d="M0 2.667A2.667 2.667 0 0 1 2.667 0h34.666A2.667 2.667 0 0 1 40 2.667v18.666A2.667 2.667 0 0 1 37.333 24H2.667A2.667 2.667 0 0 1 0 21.333V2.667zM12 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgMedia.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgMedia.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgMedia.displayName = "SvgMedia";
const Memo = memo(SvgMedia);
export default Memo;
