import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgEmbedCode = (allProps) => {
  const { blend, secondaryColor, ...props } = allProps;
  const color = props.color ?? (blend ? "currentColor" : "#525252");
  const secondary = blend ? color : (secondaryColor ?? "#DDD");
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 133 120"
      focusable={false}
      aria-hidden={true}
      role="img"
      alt={props.title}
      {...props}
    >
      <rect height="6.667" rx=".5" width="133" fill={secondary} />
      <path
        clipRule="evenodd"
        d="M3.325 13.333A3.33 3.33 0 0 0 0 16.666v86.667a3.329 3.329 0 0 0 3.325 3.333h126.35a3.33 3.33 0 0 0 3.325-3.333V16.666a3.33 3.33 0 0 0-3.325-3.333H3.325zM55.55 75.69a3.323 3.323 0 0 1-4.705 0L37.559 62.38a3.371 3.371 0 0 1 0-4.76l13.286-13.31a3.323 3.323 0 0 1 4.706 0 3.338 3.338 0 0 1 0 4.713L44.593 60 55.55 70.976a3.338 3.338 0 0 1 0 4.714zm21.9 0a3.323 3.323 0 0 0 4.705 0l13.286-13.31a3.371 3.371 0 0 0 0-4.76L82.155 44.31a3.323 3.323 0 0 0-4.706 0 3.338 3.338 0 0 0 0 4.713L88.406 60 77.449 70.976a3.338 3.338 0 0 0 0 4.714z"
        fillRule="evenodd"
        fill={color}
      />
      <rect height="6.667" rx=".5" width="133" y="113.333" fill={secondary} />
    </svg>
  );
};
SvgEmbedCode.propTypes = {
  blend: bool,
  color: string,
  secondaryColor: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgEmbedCode.defaultProps = {
  blend: false,
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgEmbedCode.displayName = "SvgEmbedCode";
const Memo = memo(SvgEmbedCode);
export default Memo;
