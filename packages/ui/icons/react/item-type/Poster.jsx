import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgPoster = (allProps) => {
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
        d="M0 2.667A2.667 2.667 0 0 1 2.667 0h34.666A2.667 2.667 0 0 1 40 2.667v18.666A2.667 2.667 0 0 1 37.333 24H18.42a.152.152 0 0 0 .151-.152V20.1c-.007-.114-.084-.218-.126-.275l-.02-.028c-.093-.143-.89-.939-1.5-1.547l-.382-.383c-1.138.821-2.476.867-3.648.1-.364.367-1.008.952-1.457 1.36-.266.242-.463.421-.493.456a.616.616 0 0 0-.124.317v3.748c0 .084.068.152.152.152H2.667A2.667 2.667 0 0 1 0 21.333V2.667zm14.689 9.723a2.713 2.713 0 1 0 0 5.424 2.713 2.713 0 1 0 0-5.424zm16.566 7.323A2.744 2.744 0 0 0 34 16.97l-.001-8.227A2.746 2.746 0 0 0 31.252 6H8.745A2.744 2.744 0 0 0 6 8.743v8.229a2.744 2.744 0 0 0 2.745 2.743h1.341c.177-.167.386-.36.618-.575.48-.444 1.061-.981 1.676-1.586a3.399 3.399 0 0 1-1.031-2.822 3.393 3.393 0 0 1 1.586-2.498 3.406 3.406 0 0 1 3.082-.233 3.404 3.404 0 0 1 1.928 2.17 3.4 3.4 0 0 1-.85 3.313c.17.172.472.486.806.833.49.509 1.047 1.089 1.363 1.402l11.99-.006z"
        fillRule="evenodd"
        fill={color}
      />
    </svg>
  );
};
SvgPoster.propTypes = {
  blend: bool,
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgPoster.defaultProps = {
  blend: false,
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgPoster.displayName = "SvgPoster";
const Memo = memo(SvgPoster);
export default Memo;
