import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgWorkflow = (allProps) => {
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
        d="M28.889 14.7c-1.227 0-2.222 1.007-2.222 2.25s.995 2.25 2.222 2.25c1.227 0 2.222-1.007 2.222-2.25s-.995-2.25-2.222-2.25zm0 3.6c.736 0 1.333-.604 1.333-1.35 0-.746-.597-1.35-1.333-1.35s-1.333.604-1.333 1.35c0 .746.596 1.35 1.333 1.35zM8.889 16.95c0-1.243.995-2.25 2.222-2.25 1.227 0 2.222 1.007 2.222 2.25s-.995 2.25-2.222 2.25c-1.227 0-2.222-1.007-2.222-2.25zm3.555 0c0 .746-.597 1.35-1.333 1.35a1.342 1.342 0 0 1-1.333-1.35c0-.746.597-1.35 1.333-1.35s1.333.604 1.333 1.35z"
        fillRule="evenodd"
        fill={color}
      />
      <path
        clipRule="evenodd"
        d="M17.778 15.6v4.5h4.444v-4.5h-4.444z"
        fillRule="evenodd"
        fill={color}
      />
      <path
        clipRule="evenodd"
        d="M23.556 7.5h-7.112A.447.447 0 0 1 16 7.05v-2.7c0-.249.199-.45.444-.45h7.112c.245 0 .444.201.444.45v2.7c0 .249-.199.45-.444.45zm-.445-2.7v1.8H16.89V4.8h6.222z"
        fillRule="evenodd"
        fill={color}
      />
      <path
        clipRule="evenodd"
        d="M2.667 0A2.667 2.667 0 0 0 0 2.667v18.666A2.667 2.667 0 0 0 2.667 24h34.666A2.667 2.667 0 0 0 40 21.333V2.667A2.667 2.667 0 0 0 37.333 0H2.667zM16 3a.895.895 0 0 0-.889.9v3.6c0 .497.398.9.889.9h3.556v2.7H11.11a.447.447 0 0 0-.444.45v2.282C9.159 14.05 8 15.363 8 16.95c0 1.74 1.393 3.15 3.111 3.15 1.718 0 3.111-1.41 3.111-3.15 0-1.587-1.159-2.9-2.666-3.118V12h8v2.7h-1.778a.894.894 0 0 0-.89.9v4.5c0 .497.399.9.89.9h4.444c.491 0 .89-.403.89-.9v-4.5c0-.497-.399-.9-.89-.9h-1.778V12h8v1.832c-1.507.218-2.666 1.531-2.666 3.118 0 1.74 1.393 3.15 3.11 3.15 1.72 0 3.112-1.41 3.112-3.15 0-1.587-1.159-2.9-2.667-3.118V11.55a.447.447 0 0 0-.444-.45h-8.445V8.4H24c.49 0 .889-.403.889-.9V3.9c0-.497-.398-.9-.889-.9h-8z"
        fillRule="evenodd"
        fill={color}
      />
    </svg>
  );
};
SvgWorkflow.propTypes = {
  blend: bool,
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgWorkflow.defaultProps = {
  blend: false,
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgWorkflow.displayName = "SvgWorkflow";
const Memo = memo(SvgWorkflow);
export default Memo;
