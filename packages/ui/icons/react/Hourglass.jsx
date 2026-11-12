import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgHourglass = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-5.76 -1.77 23.53 23.53"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      d="M0 20H12V14L8 10L11.99 5.99L12 0H0L0.0100002 5.99L4 10L0 13.99V20ZM2 5.5V2H10V5.5L6 9.5L2 5.5ZM2 14.5L6 10.5L10 14.5V18H2V14.5Z"
      fill={props.color}
    />
  </svg>
);
SvgHourglass.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgHourglass.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgHourglass.displayName = "SvgHourglass";
const Memo = memo(SvgHourglass);
export default Memo;
