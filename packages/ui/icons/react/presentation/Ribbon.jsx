import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgRibbon = (allProps) => {
  const { blend, ...props } = allProps;
  const color = props.color ?? (blend ? "currentColor" : "#8D8D8D");
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 81 120"
      focusable={false}
      aria-hidden={true}
      role="img"
      alt={props.title}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M40.5 65.346c12.898 0 23.353-10.418 23.353-23.268 0-12.851-10.455-23.269-23.353-23.269-12.897 0-23.353 10.418-23.353 23.269 0 12.85 10.456 23.268 23.353 23.268z"
        fillRule="evenodd"
        fill={color}
      />
      <path
        clipRule="evenodd"
        d="M36.97.974a6.884 6.884 0 0 1 7.06 0l6.91 4.129a6.88 6.88 0 0 0 2.926.947l8.027.707a6.86 6.86 0 0 1 5.71 4.134l3.156 7.388a6.838 6.838 0 0 0 1.808 2.48l6.077 5.272a6.823 6.823 0 0 1 2.181 6.69l-1.806 7.824a6.814 6.814 0 0 0 0 3.065l1.806 7.825a6.823 6.823 0 0 1-2.181 6.689l-6.077 5.273a6.838 6.838 0 0 0-1.808 2.479l-3.155 7.388a6.86 6.86 0 0 1-5.711 4.134l-8.027.707a6.88 6.88 0 0 0-2.925.947l-6.912 4.13a6.884 6.884 0 0 1-7.058 0l-6.911-4.13a6.88 6.88 0 0 0-2.926-.947l-8.027-.707a6.86 6.86 0 0 1-5.71-4.134l-3.156-7.388a6.838 6.838 0 0 0-1.808-2.48l-6.077-5.272a6.823 6.823 0 0 1-2.181-6.69L1.98 43.61a6.814 6.814 0 0 0 0-3.065L.175 32.72a6.823 6.823 0 0 1 2.181-6.689l6.077-5.273a6.839 6.839 0 0 0 1.808-2.48l3.155-7.387a6.86 6.86 0 0 1 5.711-4.134l8.027-.707a6.88 6.88 0 0 0 2.925-.947l6.912-4.13zm3.53 71.02c16.583 0 30.026-13.394 30.026-29.917 0-16.522-13.443-29.916-30.025-29.916-16.583 0-30.026 13.394-30.026 29.916 0 16.523 13.443 29.917 30.026 29.917z"
        fillRule="evenodd"
        fill={color}
      />
      <path
        clipRule="evenodd"
        d="M50.793 120 42.5 89.159a46.177 46.177 0 0 0 22.258-7.136l8.594 31.955-13.006-3.411L50.793 120zM6.956 113.978l8.518-31.671A46.185 46.185 0 0 0 37.8 89.183L29.514 120l-9.552-9.433-13.006 3.411z"
        fillRule="evenodd"
        fill={color}
      />
    </svg>
  );
};
SvgRibbon.propTypes = {
  blend: bool,
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgRibbon.defaultProps = {
  blend: false,
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgRibbon.displayName = "SvgRibbon";
const Memo = memo(SvgRibbon);
export default Memo;
