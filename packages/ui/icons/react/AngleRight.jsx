import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgAngleRight = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-7 5 26 26"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M6.49 18 .326 12.162a1.025 1.025 0 0 1 0-1.497L1.77 9.297a1.101 1.101 0 0 1 1.505 0l8.4 7.954c.434.41.434 1.087 0 1.498l-8.4 7.954a1.101 1.101 0 0 1-1.505 0L.325 25.335a1.025 1.025 0 0 1 0-1.497L6.491 18z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgAngleRight.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgAngleRight.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgAngleRight.displayName = "SvgAngleRight";
const Memo = memo(SvgAngleRight);
export default Memo;
