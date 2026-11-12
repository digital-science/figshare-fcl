import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgProject = (props) => (
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
      d="M8.136 0C6.68 0 5.5 1.194 5.5 2.667v18.666C5.5 22.806 6.68 24 8.136 24h23.728c1.456 0 2.636-1.194 2.636-2.667V6.223c0-1.474-1.18-2.667-2.636-2.667H18.242L14.571.584A2.618 2.618 0 0 0 12.924 0H8.136z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgProject.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgProject.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgProject.displayName = "SvgProject";
const Memo = memo(SvgProject);
export default Memo;
