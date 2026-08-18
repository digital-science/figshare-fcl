export function getElements(container, selector, activeElement) {
  const all = Array.from(container?.querySelectorAll?.(selector) ?? []) ?? [];
  const currentIndex = all.findIndex((el) => el.contains(activeElement));

  return {
    first: all[0],
    last: all[all.length - 1],
    next: all[currentIndex + 1] ?? all[0],
    prev: all[currentIndex - 1] ?? all[all.length - 1],
    current: all[currentIndex],
    isFocusedOnAnElement: activeElement === all[currentIndex],
    elements: all,
  };
}

export const TABBABLE_SELECTOR = "button, a[href], input, select, textarea, [tabindex]";

export function findNextTabStop(el, tabbableSelector = TABBABLE_SELECTOR) {
  const universe = Array.from(
    document.querySelectorAll(tabbableSelector)
  );
  const list = universe.filter(
    (item) => item === el || (item.tabIndex >= "0" && !el.contains(item))
  );
  const index = list.indexOf(el);

  return list[index + 1] || list[0];
}

export function findPrevTabStop(el, tabbableSelector = TABBABLE_SELECTOR) {
  const universe = Array.from(
    document.querySelectorAll(tabbableSelector)
  );
  const list = universe.filter(
    (item) => item === el || (item.tabIndex >= "0" && !el.contains(item))
  );
  const index = list.indexOf(el);

  return list[index - 1] || list[list.length - 1];
}
