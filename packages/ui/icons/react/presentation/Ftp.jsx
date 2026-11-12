import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgFtp = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 201 120"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M167.814 56.492h-3.564c-.535-20.199-17.641-36.29-38.668-36.29-4.811 0-9.444.856-14.077 2.568C98.853 1.373 70.521-6.33 48.246 5.652 29.358 15.922 20.27 37.32 26.686 57.348 8.865 61.114-2.36 78.061 1.56 95.008 4.767 109.558 18.132 120 33.635 120h134.357c18.175 0 32.787-14.208 32.787-31.84 0-17.288-14.79-31.496-32.965-31.667zm-71.456 5.992-4.454 4.108c-.713.685-1.96.685-2.673 0l-7.306-6.676v28.37c0 .856-.891 1.712-1.96 1.712h-6.237c-1.07 0-1.96-.685-1.96-1.712V59.745l-7.306 6.676c-.713.685-1.96.685-2.673 0l-4.455-4.109c-.713-.684-.713-1.711 0-2.396L75.51 43.141c.713-.685 1.96-.685 2.673 0l18.175 16.775c.713.685.713 1.883 0 2.568zm44.37 16.604-17.997 16.605c-.713.684-1.96.684-2.673 0l-17.997-16.776c-.713-.685-.713-1.712 0-2.397l4.454-4.108c.713-.685 1.961-.685 2.673 0l7.306 6.676V51.711c0-.856.891-1.712 1.96-1.712h6.415c1.069 0 1.96.684 1.96 1.712v27.377l7.306-6.676c.713-.685 1.96-.685 2.673 0l4.455 4.108c.178.685.178 1.883-.535 2.568z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgFtp.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgFtp.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgFtp.displayName = "SvgFtp";
const Memo = memo(SvgFtp);
export default Memo;
