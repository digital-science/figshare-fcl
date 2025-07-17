import * as React from "react";
import { memo } from "react";
import { oneOfType, string, number } from "prop-types";


const SvgUserPlusSolid1 = (props) => (
  <svg
    alt={props.title}
    aria-hidden={true}
    fill={props.color}
    focusable={false}
    role="img"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.7 5.39999C2.7 4.44521 3.07928 3.52953 3.75442 2.8544C4.42955 2.17927 5.34522 1.79999 6.3 1.79999C7.25478 1.79999 8.17045 2.17927 8.84558 2.8544C9.52072 3.52953 9.9 4.44521 9.9 5.39999C9.9 6.35477 9.52072 7.27044 8.84558 7.94557C8.17045 8.6207 7.25478 8.99999 6.3 8.99999C5.34522 8.99999 4.42955 8.6207 3.75442 7.94557C3.07928 7.27044 2.7 6.35477 2.7 5.39999ZM0 15.3647C0 12.5944 2.24437 10.35 5.01469 10.35H7.58531C10.3556 10.35 12.6 12.5944 12.6 15.3647C12.6 15.8259 12.2259 16.2 11.7647 16.2H0.835312C0.374063 16.2 0 15.8259 0 15.3647ZM14.175 10.575V8.77499H12.375C12.0009 8.77499 11.7 8.47405 11.7 8.09999C11.7 7.72592 12.0009 7.42499 12.375 7.42499H14.175V5.62499C14.175 5.25093 14.4759 4.94999 14.85 4.94999C15.2241 4.94999 15.525 5.25093 15.525 5.62499V7.42499H17.325C17.6991 7.42499 18 7.72592 18 8.09999C18 8.47405 17.6991 8.77499 17.325 8.77499H15.525V10.575C15.525 10.949 15.2241 11.25 14.85 11.25C14.4759 11.25 14.175 10.949 14.175 10.575Z"
      fill={props.color}
    />
  </svg>
);
SvgUserPlusSolid1.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgUserPlusSolid1.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgUserPlusSolid1.displayName = "SvgUserPlusSolid1";
const Memo = memo(SvgUserPlusSolid1);

export default Memo;
