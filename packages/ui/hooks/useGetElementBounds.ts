import { useRef, useMemo, useState, useEffect, MutableRefObject } from "react";
import { debounce } from "../helpers/utils/debounce";


import { useEventListener } from "./useEventListener";


type ElementBounds = {
  width: number;
  height: number;
  x: number;
  y: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
};

type BoundsInfo = {
  computed: boolean;
  resized: boolean;
};

type ElementBoundsResult = {
  box: ElementBounds | DOMRect;
  info: MutableRefObject<BoundsInfo>;
  elementRef: MutableRefObject<HTMLElement | null>;
};

export function useGetElementBounds(element: HTMLElement | null, resizeDelay = 200): ElementBoundsResult {
  const elementRef = useRef(element);
  const [box, setBox] = useState<ElementBounds | DOMRect>(() => {
    return { width: 0, height: 0, x: 0, y: 0, left: 0, top: 0, right: 0, bottom: 0 };
  });
  const info = useRef<BoundsInfo>({ computed: false, resized: false });

  useEffect(() => {
    elementRef.current = element;
  }, [element]);

  useEffect(() => {
    const newBox = element?.getBoundingClientRect?.();

    if (newBox) {
      info.current.resized = false;
      info.current.computed = true;
      setBox(newBox);
    }
  }, [element]);

  const onWindowResize = useMemo(() => debounce(() => {
    const newBox = elementRef?.current?.getBoundingClientRect?.();

    if (newBox) {
      info.current.resized = true;
      setBox(newBox);
    }
  }, resizeDelay), [info, setBox, elementRef, resizeDelay]);

  useEventListener("resize", onWindowResize, window);

  return useMemo(() => {
    return { box, info, elementRef };
  }, [box, info]);
}
