import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgTextEditorResize = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      d="M8 7V1.20711C8 0.761654 7.46143 0.53857 7.14645 0.853552L0.853553 7.14645C0.538571 7.46143 0.761654 8 1.20711 8H7C7.55228 8 8 7.55228 8 7Z"
      fill={props.color}
    />
  </svg>
);
SvgTextEditorResize.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgTextEditorResize.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgTextEditorResize.displayName = "SvgTextEditorResize";
const Memo = memo(SvgTextEditorResize);
export default Memo;
