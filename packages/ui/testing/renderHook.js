import React from "react";
import { act } from "react-dom/test-utils";


function renderHook(hook) {
  const result = { current: null };
  let rerender = () => undefined;
  let unmount = () => undefined;

  function TestComponent() {
    result.current = hook();

    return null;
  }

  const container = document.createElement("div");
  document.body.appendChild(container);

  act(() => {
    // eslint-disable-next-line react/no-render-return-value
    const instance = require("react-dom").render(
      React.createElement(TestComponent),
      container
    );

    return instance;
  });

  rerender = () => {
    act(() => {
      require("react-dom").render(
        React.createElement(TestComponent),
        container
      );
    });
  };

  unmount = () => {
    act(() => {
      require("react-dom").unmountComponentAtNode(container);
    });
    document.body.removeChild(container);
  };

  return { result, rerender, unmount };
}

export { renderHook };
