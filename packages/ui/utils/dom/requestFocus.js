
export function requestFocus(selector, delay = 200) {
  let node = null;
  if (typeof selector === "object") {
    node = selector;
  } else {
    node = document.querySelector(selector);
  }

  setTimeout(() => {
    node?.focus?.();
  }, delay);
}

export function focusOnElement(element) {
  element?.focus?.();
}
