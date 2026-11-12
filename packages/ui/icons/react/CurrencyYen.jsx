import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgCurrencyYen = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      d="M 9 8.37 l 3.07 -6.37 h 2.34 l -3.82 7.28 h 2.17 v 1.45 h -2.69 v 1.47 h 2.69 v 1.47 h -2.69 v 2.34 h -2.15 v -2.34 h -2.71 v -1.47 h 2.71 v -1.47 h -2.71 v -1.45 h 2.15 l -3.77 -7.28 h 2.36 z"
      fill={props.color}
    />
  </svg>
);
SvgCurrencyYen.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgCurrencyYen.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgCurrencyYen.displayName = "SvgCurrencyYen";
const Memo = memo(SvgCurrencyYen);
export default Memo;
