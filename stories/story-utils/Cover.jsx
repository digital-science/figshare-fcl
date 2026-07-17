import React from "react";
import PropTypes from "prop-types";


export function Cover({ children, kind = "story", ...props }) {
  const style = React.useMemo(() => {
    const s = {};

    if (kind.includes("story")) {
      s.padding = "12px 6px";
    }

    if (kind.includes("card")) {
      s.border = "1px solid rgba(38, 85, 115, 0.15)";
      s.background = "rgb(255, 255, 255)";
      s.margin = "25px 0px 40px";
      s.borderRadius = "4px";
      s.boxShadow = "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px";
      s.padding = "18px 24px";
    }

    if (kind.includes("centered")) {
      s.display = "flex";
      s.gap = "12px";
      s.flexDirection = "column";
      s.alignItems = "center";
      s.justifyContent = "center";
    }

    return s;
  }, [kind]);


  return (
    <div data-part="container" data-scope="cover" style={style}>
      <div data-part="content" data-scope="cover">
        {typeof children === "function" ? children(props) : children}
      </div>
    </div>
  );
}

Cover.propTypes = {
  children: PropTypes.node,
  kind: PropTypes.string,
};

Cover.defaultProps = {
  children: null,
  kind: "story",
};
