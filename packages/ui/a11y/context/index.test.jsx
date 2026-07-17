import React from "react";
import { render, cleanup } from "@testing-library/react";

import { Consumer, Provider, withA11y } from "./index";


describe("a11y context", () => {
  function teardown() {
    cleanup();
  }

  describe("<Provider />", () => {
    it("renders children", () => {
      const { getByTestId } = render(<Provider><div data-testid="child" /></Provider>);
      expect(getByTestId("child")).toBeInTheDocument();
      teardown();
    });

    it("passes `uid` and `uid.generate` into context", () => {
      let capturedContext = null;
      render(
        <Provider>
          <Consumer>{(ctx) => {
            capturedContext = ctx;

            return <div />;
          }}</Consumer>
        </Provider>
      );
      expect(capturedContext.uid.generate).toBeInstanceOf(Function);
      teardown();
    });
  });

  describe("<Consumer />", () => {
    it("renders children", () => {
      const { container } = render(<Consumer>{() => <div data-testid="child" />}</Consumer>);
      expect(container.querySelector("[data-testid='child']")).toBeInTheDocument();
      teardown();
    });

    it("passes the correct context", () => {
      let defaultContext = null;
      render(<Consumer>{(ctx) => {
        defaultContext = ctx;

        return <div />;
      }}</Consumer>);
      cleanup();

      let secondContext = null;
      render(<Consumer>{(ctx) => {
        secondContext = ctx;

        return <div />;
      }}</Consumer>);
      expect(secondContext).toEqual(defaultContext);
      cleanup();

      let providerContext = null;
      render(
        <Provider>
          <Consumer>{(ctx) => {
            providerContext = ctx;

            return <div />;
          }}</Consumer>
        </Provider>
      );
      expect(providerContext).not.toEqual(defaultContext);
      teardown();
    });
  });

  describe("`withA11y` wrapper", () => {
    it("renders wrapped component", () => {
      const WrappedA11y = withA11y(() => <div data-testid="wrapped" />);
      const { getByTestId } = render(<WrappedA11y />);
      expect(getByTestId("wrapped")).toBeInTheDocument();
      teardown();
    });

    it("passes `a11yContext` in props", () => {
      let capturedProps = null;
      const WrappedA11y = withA11y((props) => {
        capturedProps = props;

        return <div />;
      });
      render(<WrappedA11y />);
      expect(capturedProps).toHaveProperty("a11yContext");
      expect(capturedProps.a11yContext.uid.generate).toBeInstanceOf(Function);
      teardown();
    });
  });
});
