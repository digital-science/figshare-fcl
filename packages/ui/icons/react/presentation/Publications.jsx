import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgPublications = (allProps) => {
  const { blend, ...props } = allProps;
  const color = props.color ?? (blend ? "currentColor" : "#8D8D8D");
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 108 120"
      focusable={false}
      aria-hidden={true}
      role="img"
      alt={props.title}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12 8a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v92a8 8 0 0 1-8 8V16a8 8 0 0 0-8-8H12z"
        fillRule="evenodd"
        fill={color}
      />
      <path
        clipRule="evenodd"
        d="M22.4 38a2.4 2.4 0 0 0-2.4 2.4v3.2a2.4 2.4 0 0 0 2.4 2.4h51.2a2.4 2.4 0 0 0 2.4-2.4v-3.2a2.4 2.4 0 0 0-2.4-2.4H22.4zM22.4 54a2.4 2.4 0 0 0-2.4 2.4v3.2a2.4 2.4 0 0 0 2.4 2.4h51.2a2.4 2.4 0 0 0 2.4-2.4v-3.2a2.4 2.4 0 0 0-2.4-2.4H22.4zM20 72.4a2.4 2.4 0 0 1 2.4-2.4h51.2a2.4 2.4 0 0 1 2.4 2.4v3.2a2.4 2.4 0 0 1-2.4 2.4H22.4a2.4 2.4 0 0 1-2.4-2.4v-3.2zM22.4 86a2.4 2.4 0 0 0-2.4 2.4v3.2a2.4 2.4 0 0 0 2.4 2.4h31.2a2.4 2.4 0 0 0 2.4-2.4v-3.2a2.4 2.4 0 0 0-2.4-2.4H22.4z"
        fillRule="evenodd"
        fill={color}
      />
      <path
        clipRule="evenodd"
        d="M0 20a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v92a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V20zm12 0a4 4 0 0 0-4 4v84a4 4 0 0 0 4 4h72a4 4 0 0 0 4-4V24a4 4 0 0 0-4-4H12z"
        fillRule="evenodd"
        fill={color}
      />
    </svg>
  );
};
SvgPublications.propTypes = {
  blend: bool,
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgPublications.defaultProps = {
  blend: false,
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgPublications.displayName = "SvgPublications";
const Memo = memo(SvgPublications);
export default Memo;
