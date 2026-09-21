import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import LoaderSvg from "@digital-science/figshare-fcl/icons/react/Loader";

import "./SpinnerIcon.module.css";


type SpinnerIconSize = "full" | "small" | "medium" | "large";

type SpinnerIconProps = {
  className?: string;
  blend?: boolean;
  size?: SpinnerIconSize;
  [key: string]: unknown;
};


export function SpinnerIcon({ className: providedClassName, size = "small", blend = false, ...props }: SpinnerIconProps) {
  const className = classnames("spinner-icon", providedClassName);

  return (
    <span
      className={className}
      data-size={size}
      data-blend={blend}
      data-part="spinner"
      {...props}
    >
      <LoaderSvg data-part="spinner-icon" />
    </span>
  );
}

SpinnerIcon.propTypes = {
  className: PropTypes.string,
  blend: PropTypes.bool,
  size: PropTypes.oneOf(["full", "small", "medium", "large"] as const),
};

export default SpinnerIcon;
