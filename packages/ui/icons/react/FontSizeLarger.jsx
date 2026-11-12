import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgFontSizeLarger = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-4 6 24 24"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M16 26h-3.502l-1.393-3.634H4.731L3.415 26H0l6.21-16h3.405L16 26zm-5.928-6.33-2.197-5.937L5.72 19.67h4.351z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgFontSizeLarger.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgFontSizeLarger.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgFontSizeLarger.displayName = "SvgFontSizeLarger";
const Memo = memo(SvgFontSizeLarger);
export default Memo;
