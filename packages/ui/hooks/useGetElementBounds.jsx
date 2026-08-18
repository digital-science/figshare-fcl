import { useRef, useMemo, useState, useEffect } from "react";
import { debounce } from "utils/debounce";


import { useEventListener } from "./useEventListener";


export function useGetElementBounds(element, resizeDelay = 200) {
  const elementRef = useRef(element);
  const [box, setBox] = useState(() => {
    return { width: 0, height: 0, x: 0, y: 0, left: 0, top: 0, right: 0, bottom: 0 };
  });
  const info = useRef({ computed: false, resized: false });

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
