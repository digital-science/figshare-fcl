import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgBitbucket = (props) => (
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
      d="M1.66795 0.000106667C1.49967 -0.00230731 1.33296 0.0362785 1.17951 0.113154C1.02607 0.190029 0.88961 0.30333 0.779725 0.445103C0.66984 0.586875 0.589189 0.753683 0.543434 0.933814C0.497679 1.11394 0.48793 1.30303 0.514871 1.4878L5.40969 34.5376C5.47067 34.9421 5.65783 35.3097 5.9383 35.5759C6.21876 35.8421 6.57459 35.9899 6.94328 35.9933H30.4257C30.7021 35.9972 30.9706 35.8906 31.1822 35.6929C31.3938 35.4952 31.5346 35.2194 31.5788 34.916L36.4851 1.50062C36.5121 1.31586 36.5023 1.12677 36.4566 0.946639C36.4108 0.766508 36.3302 0.599701 36.2203 0.457928C36.1104 0.316155 35.9739 0.202854 35.8205 0.125979C35.667 0.0491037 35.5003 0.0105179 35.3321 0.0129319L1.66795 0.000106667ZM22.2792 23.8865H14.7842L12.7548 12.1004H24.0953L22.2792 23.8865Z"
      fill={props.color}
    />
    <path
      d="M34.9166 12.1006H24.095L22.2789 23.8867H14.7839L5.93399 35.5766C6.21449 35.8464 6.57212 35.9964 6.94293 35.9998H30.4311C30.7075 36.0038 30.976 35.8972 31.1876 35.6995C31.3993 35.5017 31.54 35.226 31.5842 34.9225L34.9166 12.1006Z"
      fill={props.color}
    />
  </svg>
);
SvgBitbucket.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgBitbucket.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgBitbucket.displayName = "SvgBitbucket";
const Memo = memo(SvgBitbucket);
export default Memo;
