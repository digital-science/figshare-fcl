import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgUpload = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-2 7.5 20 20"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="m9.807 17.109 1.698 1.66a.82.82 0 0 0 1.14 0l.855-.836a.776.776 0 0 0 0-1.114L8.806 12.23a.82.82 0 0 0-1.14 0L2.972 16.82a.776.776 0 0 0 0 1.114l.855.836a.82.82 0 0 0 1.14 0l1.697-1.659V25a1 1 0 0 0 1 1h1.143a1 1 0 0 0 1-1v-7.891zM0 10.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H.5a.5.5 0 0 0-.5.5v1z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgUpload.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgUpload.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgUpload.displayName = "SvgUpload";
const Memo = memo(SvgUpload);
export default Memo;
