import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgCurrencyEuro = (props) => (
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
      d="M 10.77 3.86 q -1.32 0 -2.16 0.79 t -1.12 2.38 h 4.26 v 1.44 h -4.4 l -0.02 0.42 v 0.51 l 0.02 0.36 h 3.82 v 1.43 h -3.66 q 0.6 2.92 3.4 2.92 q 1.34 0 2.74 -0.58 v 1.9 q -1.23 0.57 -2.85 0.57 q -2.25 0 -3.66 -1.23 t -1.84 -3.57 h -1.42 v -1.43 h 1.27 l -0.02 -0.35 v -0.35 l 0.02 -0.61 h -1.27 v -1.44 h 1.4 q 0.36 -2.35 1.79 -3.68 t 3.69 -1.34 q 1.87 0 3.35 0.82 l -0.79 1.75 q -1.44 -0.71 -2.56 -0.71 z"
      fill={props.color}
    />
  </svg>
);
SvgCurrencyEuro.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgCurrencyEuro.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgCurrencyEuro.displayName = "SvgCurrencyEuro";
const Memo = memo(SvgCurrencyEuro);
export default Memo;
