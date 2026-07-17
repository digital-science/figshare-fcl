/* eslint-disable react/require-default-props */
import React, { createContext } from "react";
import PropTypes from "prop-types";
import { render, cleanup } from "@testing-library/react";

import withConsumer from "./withConsumer";


describe("`withConsumer` wrapper", () => {
  const defaultContext = { foo: 1, bar: "test" };
  const { Provider, Consumer } = createContext(defaultContext);

  function teardown() {
    cleanup();
  }

  it("throws error when Consumer or Child are missing", () => {
    expect(() => withConsumer()()).toThrow();
    expect(() => withConsumer(<div />)()).toThrow();
    expect(() => withConsumer()(<div />)).toThrow();
  });

  it("renders the wrapped component", () => {
    const WrappedConsumer = withConsumer(Consumer)(() => <div data-testid="child" />);
    const { getByTestId } = render(<WrappedConsumer />);
    expect(getByTestId("child")).toBeInTheDocument();
    teardown();
  });

  it("exposes context in `contextProps` as default context name", () => {
    let capturedContext = null;
    const Child = ({ contextProps }) => {
      capturedContext = contextProps;

      return <div />;
    };
    Child.propTypes = { contextProps: PropTypes.any };
    const WrappedConsumer = withConsumer(Consumer)(Child);
    render(<Provider value={defaultContext}><WrappedConsumer /></Provider>);
    expect(capturedContext).toEqual(defaultContext);
    teardown();
  });

  it("exposes context with the given name", () => {
    const contextName = "testContext";
    let capturedContext = null;
    const Child = (props) => {
      capturedContext = props[contextName];

      return <div />;
    };
    const WrappedConsumer = withConsumer(Consumer, contextName)(Child);
    render(<Provider value={defaultContext}><WrappedConsumer /></Provider>);
    expect(capturedContext).toEqual(defaultContext);
    teardown();
  });

  it("passes other props to wrapped component", () => {
    const passedProps = { foo: "bar", bar: 1 };
    let capturedProps = null;
    const Child = ({ contextProps, ...props }) => {
      capturedProps = props;

      return <div />;
    };
    Child.propTypes = { contextProps: PropTypes.any };
    const WrappedConsumer = withConsumer(Consumer)(Child);
    render(<Provider value={defaultContext}><WrappedConsumer {...passedProps} /></Provider>);
    expect(capturedProps).toEqual(passedProps);
    teardown();
  });
});
