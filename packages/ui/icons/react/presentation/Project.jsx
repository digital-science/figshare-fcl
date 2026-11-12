import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgProject = (allProps) => {
  const { blend, ...props } = allProps;
  const color = props.color ?? (blend ? "currentColor" : "#8D8D8D");
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 147 120"
      focusable={false}
      aria-hidden={true}
      role="img"
      alt={props.title}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M13.364 0C5.984 0 0 5.97 0 13.333v93.334C0 114.03 5.983 120 13.364 120h120.272c7.381 0 13.364-5.97 13.364-13.333V31.111c0-7.364-5.983-13.333-13.364-13.333H64.591L45.979 2.922A13.383 13.383 0 0 0 37.63 0H13.364z"
        fillRule="evenodd"
        fill={color}
      />
    </svg>
  );
};
SvgProject.propTypes = {
  blend: bool,
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgProject.defaultProps = {
  blend: false,
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgProject.displayName = "SvgProject";
const Memo = memo(SvgProject);
export default Memo;
