import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgDataset = (props) => (
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
      d="M2.667 0A2.667 2.667 0 0 0 0 2.667v18.666A2.667 2.667 0 0 0 2.667 24h34.666A2.667 2.667 0 0 0 40 21.333V2.667A2.667 2.667 0 0 0 37.333 0H2.667zm10.666 10.667h-12V12h12v-1.333zm1.334 0h10.666V12H14.667v-1.333zm24 0h-12V12h12v-1.333zM1.333 13.333h12v1.334h-12v-1.334zm24 0H14.667v1.334h10.666v-1.334zm1.334 0h12v1.334h-12v-1.334zM13.333 16h-12v1.333h12V16zm1.334 0h10.666v1.333H14.667V16zm24 0h-12v1.333h12V16zM1.333 18.667h12V20h-12v-1.333zm24 0H14.667V20h10.666v-1.333zm1.334 0h12V20h-12v-1.333zm-13.334 2.666h-12V22c0 .368.299.667.667.667h11.333v-1.334zm1.334 0h10.666v1.334H14.667v-1.334zm24 0h-12v1.334H38a.667.667 0 0 0 .667-.667v-.667z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgDataset.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgDataset.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgDataset.displayName = "SvgDataset";
const Memo = memo(SvgDataset);
export default Memo;
