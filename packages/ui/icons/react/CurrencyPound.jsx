import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgCurrencyPound = (props) => (
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
      d="M 9.94 2 q 1.83 0 3.54 0.78 l -0.72 1.72 q -1.53 -0.67 -2.68 -0.67 q -1.94 0 -1.94 2.07 v 2.31 h 3.75 v 1.63 h -3.75 v 1.72 q 0 0.86 -0.31 1.47 t -1.07 1.03 h 7.15 v 1.96 h -9.81 v -1.84 q 0.93 -0.28 1.37 -0.91 t 0.44 -1.68 v -1.74 h -1.78 v -1.63 h 1.78 v -2.42 q 0 -1.78 1.07 -2.78 t 2.95 -1 z"
      fill={props.color}
    />
  </svg>
);
SvgCurrencyPound.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgCurrencyPound.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgCurrencyPound.displayName = "SvgCurrencyPound";
const Memo = memo(SvgCurrencyPound);
export default Memo;
