import { useRef, useMemo, useCallback } from "react";
import { guard } from "@digital-science/figshare-fcl/helpers";
import { getElements, focusOnElement, findNextTabStop, TABBABLE_SELECTOR } from "utils/dom";


const DEFAULT_LISTED_CONTAINER_SELECTOR = "[data-list-node='true'], [role='listbox'], [role='toolbar']";
const DEFAULT_ELEMENT_SELECTOR = "*[data-node][data-index]:not(:disabled):not([aria-disabled='true')";
const KEY_BY_ORIENTATION = {
  next: {
    horizontal: "ArrowRight",
    vertical: "ArrowUp",
  },
  prev: {
    horizontal: "ArrowLeft",
    vertical: "ArrowDown",
  },
};

export function useListedElementsNavigation({
  listSelector = DEFAULT_LISTED_CONTAINER_SELECTOR,
  itemSelector = DEFAULT_ELEMENT_SELECTOR,
  onKeyDown: onKeyDownProvided,
} = {}) {
  const ref = useRef(null);

  const onKeyDown = useCallback((event) => {
    guard(() => {
      // call an optional handler
      onKeyDownProvided?.(event);

      if (event.defaultPrevented) {
        return;
      }

      const container = event.currentTarget;
      const elements = getElements(container, itemSelector, document.activeElement);

      const orientation = container.getAttribute("aria-orientation") || "horizontal";
      const NextKey = KEY_BY_ORIENTATION.next[orientation];
      const PrevKey = KEY_BY_ORIENTATION.prev[orientation];

      switch (event.key) {
        case "Enter":
          break;
        case "Escape":
          focusOnElement(elements.first);
          break;
        case "Tab": {
          if (elements.isFocusedOnAnElement) {
            const isShift = event.shiftKey;
            const isFirstFocused = elements.current === elements.first;
            const isLastFocused = elements.current === elements.last;

            if (!isShift && !isLastFocused) {
              const universeSelector = [listSelector, TABBABLE_SELECTOR].join(", ");

              event?.preventDefault?.();
              focusOnElement(findNextTabStop(container, universeSelector));
              break;
            }

            if (isShift && !isFirstFocused) {
              event?.preventDefault?.();
              focusOnElement(elements.first);
            }
          }
          break;
        }
        case NextKey:
          if (elements.isFocusedOnAnElement) {
            event?.preventDefault?.();
          }
          focusOnElement(elements.next);
          break;
        case PrevKey:
          if (elements.isFocusedOnAnElement) {
            event?.preventDefault?.();
          }
          event?.preventDefault?.();
          focusOnElement(elements.prev);
          break;
        case "Home":
          focusOnElement(elements.first);
          break;
        case "End":
          focusOnElement(elements.last);
          break;
        default:
          break;
      }
    });
  }, [itemSelector, onKeyDownProvided]);

  const props = useMemo(() => {
    return { ref, onKeyDown };
  }, [ref, onKeyDown]);

  return props;
}
