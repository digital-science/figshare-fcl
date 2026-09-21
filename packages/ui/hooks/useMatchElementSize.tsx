import React, { useState, useEffect, useMemo, useRef } from "react";

import { useGetElementBounds } from "./useGetElementBounds";


type SizingStyle = {
  width: string;
  maxWidth: string;
  height: string;
  maxHeight: string;
};

export const DEFAULT_STYLE: SizingStyle = {
  width: "100%",
  maxWidth: "100%",
  height: "100%",
  maxHeight: "100%",
};

export function useMatchElementSize(element: HTMLElement | null, initialStyle: SizingStyle | Record<string, never> = DEFAULT_STYLE) {
  const bounds = useGetElementBounds(element);
  const { box, info } = bounds;

  return useMemo(() => {
    if (!element) {
      return initialStyle;
    }

    return getSizingStyleProps(box);
  }, [box, info]);
}

type BoundingBoxProps = {
  children: (props: { style: SizingStyle | Record<string, never> }) => React.ReactNode;
  [key: string]: unknown;
};

export function BoundingBox({ children, ...props }: BoundingBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, didMount] = useState(false);
  const style = useMatchElementSize(ref.current, {});

  useEffect(() => {
    didMount(true);
  }, [didMount]);

  return (<div ref={ref} {...props}>{mounted ? children({ style }) : null }</div>);
}

export function getSizingStyleProps(box: { width?: number; height?: number }): SizingStyle {
  const widthInPx = `${box?.width ?? 0}px`;
  const heightInPx = `${box?.height ?? 0}px`;

  return {
    width: widthInPx,
    maxWidth: widthInPx,
    height: heightInPx,
    maxHeight: heightInPx,
  };
}
