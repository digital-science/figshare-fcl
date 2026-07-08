import React from "react";

export function Cover({ children, kind = "story", bordered = true, ...props }) {
  const style = React.useMemo(() => {
    let style = {};

    if (kind.includes("story")) {
      style.padding = "12px 6px";
    }

    if (kind.includes("card")) {
      style.border = "1px solid rgba(38, 85, 115, 0.15)";
      style.background = "rgb(255, 255, 255)";
      style.margin = "25px 0px 40px";
      style.borderRadius = "4px";
      style.boxShadow = "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px";
      style.padding = "18px 24px";
    }

    if (kind.includes("centered")) {
      style.display = "flex";
      style.gap = "12px";
      style.flexDirection = "column";
      style.alignItems = "center";
      style.justifyContent = "center";
    }

    return style;
  }, [kind]);


  return (
    <div data-scope="cover" data-part="container" style={style}>
      <div data-scope="cover"  data-part="content">
        {typeof children === "function" ? children(props) : children}
      </div>
    </div>
  );
}