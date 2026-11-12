import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgNote = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 94 120"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M40.04 60.857s5.46.166 9.964 2.808c4.326 2.535 7.132 6.515 7.132 6.515L36.015 85.215l4.025-24.358zM65.31 20.256l4.25-6.724c2.858.488 6.23 1.382 9.193 3.117 3.201 1.88 5.918 4.578 7.965 6.983L72.51 46.105l-11.739 18.57c.025.014-3.85-4.593-7.246-6.583-3.525-2.065-9.821-3.54-9.932-3.489 1.54-2.43 13.07-20.671 21.716-34.347zM75.01 4.908c2.976-4.7 9.03-6.375 13.966-3.477 4.942 2.898 6.178 8.842 3.207 13.548l-1.687 2.669c-2.003-2.367-4.653-5.005-7.806-6.85-3.003-1.763-6.437-2.702-9.36-3.23 1.034-1.631 1.68-2.66 1.68-2.66z"
      fillRule="evenodd"
      fill={props.color}
    />
    <path
      clipRule="evenodd"
      d="M11.077 17.839H54.66l-4.242 6.81H11.077c-1.896 0-3.433 1.525-3.433 3.406v81.729c0 1.881 1.537 3.405 3.433 3.405h68.65c1.896 0 3.433-1.524 3.433-3.405V48.597l6.865-11.022v72.209c0 5.642-4.61 10.216-10.298 10.216h-68.65C5.39 120 .779 115.426.779 109.784V28.055c0-5.642 4.61-10.216 10.298-10.216z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgNote.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgNote.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgNote.displayName = "SvgNote";
const Memo = memo(SvgNote);
export default Memo;
