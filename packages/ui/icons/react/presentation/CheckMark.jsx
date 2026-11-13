import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgCheckMark = (allProps) => {
  const { blend, ...props } = allProps;
  const color = props.color ?? (blend ? "currentColor" : "#8D8D8D");
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 156 120"
      focusable={false}
      aria-hidden={true}
      role="img"
      alt={props.title}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="m28.901 41.556 26.522 26.015a3.413 3.413 0 0 0 4.76 0L127.1 1.934c2.629-2.579 6.891-2.579 9.521 0l17.408 17.076a6.515 6.515 0 0 1 0 9.34l-91.465 89.716c-2.629 2.579-6.892 2.579-9.52 0L1.971 67.971a6.515 6.515 0 0 1 0-9.339L19.38 41.557c2.63-2.58 6.892-2.58 9.521 0z"
        fillRule="evenodd"
        fill={color}
      />
    </svg>
  );
};
SvgCheckMark.propTypes = {
  blend: bool,
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgCheckMark.defaultProps = {
  blend: false,
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgCheckMark.displayName = "SvgCheckMark";
const Memo = memo(SvgCheckMark);
export default Memo;
