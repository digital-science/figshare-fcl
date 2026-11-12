import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgCollection = (props) => (
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
      d="M6.5 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM15.5 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM27.5 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM33.5 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9.5 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM15.5 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM27.5 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM33.5 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9.5 21a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM15.5 24a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM27.5 21a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM33.5 24a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgCollection.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgCollection.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgCollection.displayName = "SvgCollection";
const Memo = memo(SvgCollection);
export default Memo;
