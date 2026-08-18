import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import LoaderSvg from "@digital-science/figshare-fcl/icons/react/Loader";

import "./SpinnerIcon.module.css";


export function SpinnerIcon({ className: providedClassName, size, blend, ...props }) {
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
  size: PropTypes.oneOf(["full", "small", "medium", "large"]),
};

SpinnerIcon.defaultProps = {
  className: undefined,
  blend: false,
  size: "small",
};

export default SpinnerIcon;
