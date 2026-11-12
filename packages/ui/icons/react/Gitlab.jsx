import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgGitlab = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 37 36"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      d="M18.4986 36L25.1307 13.8511H11.8762L18.4986 36Z"
      fill={props.color}
    />
    <path
      d="M2.58692 13.8511L0.567286 20.5802C0.384526 21.1912 0.581895 21.8657 1.06428 22.2466L18.4988 35.9999L2.58692 13.8511Z"
      fill={props.color}
    />
    <path
      d="M2.58714 13.8511H11.8765L7.87863 0.511838C7.67401 -0.170613 6.78229 -0.170613 6.57031 0.511838L2.58714 13.8511Z"
      fill={props.color}
    />
    <path
      d="M34.4204 13.8511L36.4328 20.5802C36.6155 21.1912 36.4182 21.8657 35.9358 22.2466L18.4989 36L34.4204 13.8511Z"
      fill={props.color}
    />
    <path
      d="M34.4206 13.8511H25.1312L29.1217 0.511838C29.3263 -0.170613 30.2181 -0.170613 30.4299 0.511838L34.4206 13.8511Z"
      fill={props.color}
    />
    <path
      d="M18.4989 36L25.131 13.8511H34.4204L18.4989 36Z"
      fill={props.color}
    />
    <path
      d="M18.499 36L2.58714 13.8511H11.8766L18.499 36Z"
      fill={props.color}
    />
  </svg>
);
SvgGitlab.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgGitlab.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgGitlab.displayName = "SvgGitlab";
const Memo = memo(SvgGitlab);
export default Memo;
