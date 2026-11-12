import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgCurrencyDollar = (props) => (
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
      d="M 12.98 11.21 q 0 1.21 -0.89 2 t -2.56 0.97 v 1.82 h -1.11 v -1.77 q -2.08 -0.03 -3.41 -0.64 v -1.77 q 0.72 0.35 1.68 0.59 t 1.72 0.25 v -3.13 l -0.7 -0.26 q -1.37 -0.53 -2 -1.26 t -0.63 -1.81 q 0 -1.15 0.9 -1.9 t 2.44 -0.9 v -1.41 h 1.11 v 1.38 q 1.7 0.06 3.22 0.69 l -0.61 1.53 q -1.31 -0.52 -2.61 -0.62 v 3.05 l 0.64 0.24 q 1.59 0.61 2.2 1.29 t 0.61 1.66 z M 11.01 11.34 q 0 -0.49 -0.34 -0.8 t -1.13 -0.61 v 2.67 q 1.47 -0.23 1.47 -1.26 z M 7.05 6.19 q 0 0.48 0.3 0.79 t 1.08 0.63 v -2.6 q -0.67 0.1 -1.02 0.41 t -0.35 0.77 z"
      fill={props.color}
    />
  </svg>
);
SvgCurrencyDollar.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgCurrencyDollar.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgCurrencyDollar.displayName = "SvgCurrencyDollar";
const Memo = memo(SvgCurrencyDollar);
export default Memo;
