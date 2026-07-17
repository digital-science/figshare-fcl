import { webcrypto } from "crypto";


if (!global.crypto) {
  global.crypto = webcrypto;
}

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element) {
    this.elements.add(element);
    this.callback([{
      isIntersecting: true,
      target: element,
      time: Date.now(),
    }]);
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  takeRecords() {
    return [];
  }
}

global.IntersectionObserver = MockIntersectionObserver;

jest.mock(
  "@popperjs/core",
  () => {
    class Popper {
      constructor() {
        return {
          destroy: () => undefined,
          scheduleUpdate: () => undefined,
          disableEventListeners: () => undefined,
          enableEventListeners: () => undefined,
        };
      }
    }

    return { createPopper: () => new Popper() };
  }
);
