import React, { createContext } from "react";
import { shallow, mount } from "enzyme";

import withConsumer from "./withConsumer";


describe("`withConsumer` wrapper", () => {
  const defaultContext = { foo: 1, bar: "test" };
  const { Provider, Consumer } = createContext(defaultContext);

  it("throws error when Consumer or Child are missing", () => {
    expect(() => withConsumer()()).toThrow();
    expect(() => withConsumer(<div />)()).toThrow();
    expect(() => withConsumer()(<div />)).toThrow();
  });

  it("renders the wrapped component", () => {
    const WrappedConsumer = withConsumer(Consumer)(() => <div />);

    const wrapper = shallow(<WrappedConsumer />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("exposes context in `contextProps` as default context name", () => {
    const Child = (childProps) => {
      const { contextProps, ...props } = childProps;

      expect(contextProps).toEqual(defaultContext);

      return <div {...props} />;
    };

    const WrappedConsumer = withConsumer(Consumer)(Child);

    mount(<Provider value={defaultContext}><WrappedConsumer /></Provider>);
  });

  it("exposes context with the given name", () => {
    const contextName = "testContext";
    const Child = (props) => {
      expect(props[contextName]).toEqual(defaultContext);

      return <div />;
    };

    const WrappedConsumer = withConsumer(Consumer, contextName)(Child);

    mount(<Provider value={defaultContext}><WrappedConsumer /></Provider>);
  });

  it("passes other props to wrapped component", () => {
    const passedProps = { foo: "bar", bar: 1 };

    const Child = (childProps) => {
      const { contextProps, ...props } = childProps;

      expect(props).toEqual(passedProps);

      return <div {...props} />;
    };

    const WrappedConsumer = withConsumer(Consumer)(Child);

    mount(<Provider value={defaultContext}><WrappedConsumer {...passedProps} /></Provider>);
  });
});
