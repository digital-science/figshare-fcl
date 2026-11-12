import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgAngleDown = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-4 5 26 26"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="m9 18.49 5.838-6.165a1.025 1.025 0 0 1 1.497 0l1.368 1.444a1.1 1.1 0 0 1 0 1.505l-7.954 8.4a1.025 1.025 0 0 1-1.498 0l-7.954-8.4a1.1 1.1 0 0 1 0-1.505l1.368-1.444a1.025 1.025 0 0 1 1.497 0L9 18.491z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgAngleDown.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgAngleDown.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgAngleDown.displayName = "SvgAngleDown";
const Memo = memo(SvgAngleDown);
export default Memo;
