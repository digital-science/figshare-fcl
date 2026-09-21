import { useDebugValue, useRef, useEffect, useLayoutEffect } from "react";


export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useEventListener(
  name: string,
  handler: (event: Event) => void,
  element?: HTMLElement | Window | null,
  options?: AddEventListenerOptions
) {
  useDebugValue(`[useEventListener] bound for ${name}`);

  const callbackRef = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const node = element ?? document.body;
    const listener = (event: Event) => callbackRef.current?.(event);

    node.addEventListener(name, listener);

    return () => {
      node.removeEventListener(name, listener);
    };
  }, [name, element, options]);
}

export default useEventListener;
