import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgPerformance = (props) => (
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
      d="M16 19h3.5v-3h-2L16 19zM20.5 19H24l-1.5-3h-2v3z"
      fillRule="evenodd"
      fill={props.color}
    />
    <path
      clipRule="evenodd"
      d="M28.5 5.5v9.013a.398.398 0 0 1-.002.036A.498.498 0 0 1 28 15H12a.508.508 0 0 1-.33-.124.492.492 0 0 1-.17-.376v-9A.5.5 0 0 1 12 5h16a.5.5 0 0 1 .5.5zM17.49 8a.5.5 0 0 1 .364.146l3.612 3.613 2.15-2.58a.5.5 0 0 1 .774.009l3.11 3.887V6h-15v7.215l4.631-5.053A.5.5 0 0 1 17.49 8zm-4.353 6H26.96l-2.968-3.71-2.108 2.53a.5.5 0 0 1-.738.034l-3.63-3.631L13.136 14z"
      fillRule="evenodd"
      fill={props.color}
    />
    <path
      clipRule="evenodd"
      d="M0 2.667A2.667 2.667 0 0 1 2.667 0h34.666A2.667 2.667 0 0 1 40 2.667v18.666A2.667 2.667 0 0 1 37.333 24H2.667A2.667 2.667 0 0 1 0 21.333V2.667zM19.5 2.5a.5.5 0 0 1 1 0V3h1a1 1 0 0 1 1 1h6a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-5l1.5 3h2a.5.5 0 0 1 0 1h-1.5l1 2h-1l-1-2h-9l-1 2h-1l1-2H13a.5.5 0 0 1 0-1h2l1.5-3h-5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1-1h1v-.5z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgPerformance.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgPerformance.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgPerformance.displayName = "SvgPerformance";
const Memo = memo(SvgPerformance);
export default Memo;
