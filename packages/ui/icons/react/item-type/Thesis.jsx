import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgThesis = (allProps) => {
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
        d="M2.667 0A2.667 2.667 0 0 0 0 2.667v18.666A2.667 2.667 0 0 0 2.667 24h34.666A2.667 2.667 0 0 0 40 21.333V2.667A2.667 2.667 0 0 0 37.333 0H2.667zm8.443 20.183c7.563 1.262 11.275.902 17.095 0 .224-3.23-.001-4.915-.001-4.915l-8.206 4.213-8.888-4.215s-.439 1.803 0 4.917zM3 10.143l17 7.934 17-7.935L20 3 3 10.142z"
        fillRule="evenodd"
        fill={color}
      />
    </svg>
  );
};
SvgThesis.propTypes = {
  blend: bool,
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgThesis.defaultProps = {
  blend: false,
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgThesis.displayName = "SvgThesis";
const Memo = memo(SvgThesis);
export default Memo;
