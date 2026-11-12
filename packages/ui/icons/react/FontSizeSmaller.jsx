import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgFontSizeSmaller = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-6 6 24 24"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M12 24H9.373L8.33 21.274h-4.78L2.562 24H0l4.658-12h2.553L12 24zm-4.446-4.748L5.906 14.8l-1.615 4.452h3.263z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgFontSizeSmaller.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgFontSizeSmaller.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgFontSizeSmaller.displayName = "SvgFontSizeSmaller";
const Memo = memo(SvgFontSizeSmaller);
export default Memo;
