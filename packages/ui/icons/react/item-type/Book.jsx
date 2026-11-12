import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgBook = (props) => (
  <svg
    fill={props.color}
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
      d="M22 5h9a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-.5A.5.5 0 0 1 22 5z"
      fillRule="evenodd"
      fill={props.color}
    />
    <path
      clipRule="evenodd"
      d="M20.5 18V5h-1v13a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1V5H7s-.5 0-.5.5v14s-.022.5.5.5h11.21l.299.333c.368.41.899.667 1.491.667.592 0 1.123-.256 1.491-.667l.298-.333H33s.5 0 .5-.5v-14c0-.5-.5-.5-.5-.5h-.5v13a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1z"
      fillRule="evenodd"
      fill={props.color}
    />
    <path
      clipRule="evenodd"
      d="M18 5H9a.5.5 0 0 0-.5.5V6a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-.5A.5.5 0 0 0 18 5zM8.5 9a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H9a.5.5 0 0 1-.5-.5V9zM9 12a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5H9zM8.5 16a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H9a.5.5 0 0 1-.5-.5V16zM22 8.5a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5h-9zM21.5 12.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-.5zM22 15.5a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V16a.5.5 0 0 0-.5-.5h-9z"
      fillRule="evenodd"
      fill={props.color}
    />
    <path
      clipRule="evenodd"
      d="M0 2.667A2.667 2.667 0 0 1 2.667 0h34.666A2.667 2.667 0 0 1 40 2.667v18.666A2.667 2.667 0 0 1 37.333 24H2.667A2.667 2.667 0 0 1 0 21.333V2.667zM8.5 3a1 1 0 0 0-1 1h-1a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h11.264c.55.614 1.348 1 2.236 1 .889 0 1.687-.386 2.236-1H33.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1-1h-10a1 1 0 0 0-1 1h-1a1 1 0 0 0-1-1h-10z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgBook.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgBook.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgBook.displayName = "SvgBook";
const Memo = memo(SvgBook);
export default Memo;
