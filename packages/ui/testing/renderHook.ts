import React from "react";
import { act } from "react-dom/test-utils";


function renderHook<TProps>(hook: (props: TProps) => any, options: { initialProps?: TProps } = {}) {
  const result = { current: null };
  let currentProps = options.initialProps;
  let rerender = (props?: TProps) => undefined;
  let unmount = () => undefined;

  function TestComponent() {
    result.current = hook(currentProps as TProps);

    return null;
  }

  const container = document.createElement("div");
  document.body.appendChild(container);

  act(() => {
    const instance = require("react-dom").render(
      React.createElement(TestComponent),
      container
    );

    return instance;
  });

  rerender = (props?: TProps) => {
    currentProps = props !== undefined ? props : currentProps;
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
