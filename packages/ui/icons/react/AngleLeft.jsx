import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgAngleLeft = (props) => (
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
      d="m5.51 18 6.165-5.838a1.025 1.025 0 0 0 0-1.497L10.23 9.297a1.101 1.101 0 0 0-1.505 0l-8.4 7.954a1.025 1.025 0 0 0 0 1.498l8.4 7.954a1.101 1.101 0 0 0 1.505 0l1.444-1.368a1.025 1.025 0 0 0 0-1.497L5.509 18z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgAngleLeft.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgAngleLeft.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgAngleLeft.displayName = "SvgAngleLeft";
const Memo = memo(SvgAngleLeft);
export default Memo;
