import React, { useState, useEffect, useMemo, useRef } from "react";
import { func } from "prop-types";

import { useGetElementBounds } from "./useGetElementBounds";


export const DEFAULT_STYLE = {
  width: "100%",
  maxWidth: "100%",
  height: "100%",
  maxHeight: "100%",
};

export function useMatchElementSize(element, initialStyle = DEFAULT_STYLE) {
  const bounds = useGetElementBounds(element);
  const { box, info } = bounds;

  return useMemo(() => {
    if (!element) {
      return initialStyle;
    }

    return getSizingStyleProps(box);
  }, [box, info]);
}

export function BoundingBox({ children, ...props }) {
  const ref = useRef(null);
  const [mounted, didMount] = useState(false);
  const style = useMatchElementSize(ref.current, {});

  useEffect(() => {
    didMount(true);
  }, [didMount]);

  return (<div ref={ref} {...props}>{mounted ? children({ style }) : null }</div>);
}

BoundingBox.propTypes = { children: func.isRequired };

export function getSizingStyleProps(box) {
  const widthInPx = `${box?.width ?? 0}px`;
  const heightInPx = `${box?.height ?? 0}px`;

  return {
    width: widthInPx,
    maxWidth: widthInPx,
    height: heightInPx,
    maxHeight: heightInPx,
  };
}
