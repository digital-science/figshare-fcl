import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgShield = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-2.59 -1.59 21.18 21.18"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M7.99987 1.79182L13.7271 4.33636V8.18182C13.7271 11.88 11.289 15.2918 7.99987 16.3064C4.71078 15.2918 2.27259 11.88 2.27259 8.18182V4.33636L7.99987 1.79182ZM7.99987 0L0.63623 3.27273V8.18182C0.63623 12.7227 3.77805 16.9691 7.99987 18C12.2217 16.9691 15.3635 12.7227 15.3635 8.18182V3.27273L7.99987 0Z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgShield.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgShield.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgShield.displayName = "SvgShield";
const Memo = memo(SvgShield);
export default Memo;
