import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgSoftware = (allProps) => {
  const { blend, ...props } = allProps;
  const color =
    props.color ??
    (blend ? "currentColor" : "var(--color-icon-secondary, #525252)");
  return (
    <svg
      fill={color}
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
        d="M2.667 0A2.667 2.667 0 0 0 0 2.667v18.666A2.667 2.667 0 0 0 2.667 24h34.666A2.667 2.667 0 0 0 40 21.333V2.667A2.667 2.667 0 0 0 37.333 0H2.667zm13.93 18.084a1.902 1.902 0 0 0 0-2.809l-3.487-3.274 3.487-3.276a1.902 1.902 0 0 0 0-2.81 2.213 2.213 0 0 0-2.991 0l-4.97 4.667-.01.007A1.922 1.922 0 0 0 8 12.001a1.922 1.922 0 0 0 .627 1.411c.003.002.007.003.01.006l4.969 4.666a2.213 2.213 0 0 0 2.991 0zm14.774-4.671a1.928 1.928 0 0 0 .629-1.41 1.92 1.92 0 0 0-.62-1.409l-.008-.005-.009-.006-4.969-4.666a2.213 2.213 0 0 0-2.991 0 1.902 1.902 0 0 0 0 2.809L26.89 12 23.4 15.275a1.902 1.902 0 0 0 0 2.81 2.213 2.213 0 0 0 2.992 0l4.969-4.667.01-.005z"
        fillRule="evenodd"
        fill={color}
      />
    </svg>
  );
};
SvgSoftware.propTypes = {
  blend: bool,
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgSoftware.defaultProps = {
  blend: false,
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgSoftware.displayName = "SvgSoftware";
const Memo = memo(SvgSoftware);
export default Memo;
