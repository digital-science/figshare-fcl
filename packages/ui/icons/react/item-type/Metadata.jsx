import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgMetadata = (allProps) => {
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
        d="M25 11V9.5H15V11h10zM19 5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM25 14v-1.5H15V14h10zM15 17v-1.5h6V17h-6z"
        fillRule="evenodd"
        fill={color}
      />
      <path
        clipRule="evenodd"
        d="M0 2.667A2.667 2.667 0 0 1 2.667 0h34.666A2.667 2.667 0 0 1 40 2.667v18.666A2.667 2.667 0 0 1 37.333 24H2.667A2.667 2.667 0 0 1 0 21.333V2.667zM20 3a2 2 0 0 1 2 2h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H13a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5a2 2 0 0 1 2-2z"
        fillRule="evenodd"
        fill={color}
      />
    </svg>
  );
};
SvgMetadata.propTypes = {
  blend: bool,
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgMetadata.defaultProps = {
  blend: false,
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgMetadata.displayName = "SvgMetadata";
const Memo = memo(SvgMetadata);
export default Memo;
