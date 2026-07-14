import React from "react";
import { shallow, mount } from "enzyme";

import { Consumer, Provider, withA11y } from "./index";


describe("a11y context", () => {

  describe("<Provider />", () => {
    it("renders children", () => {
      const provider = shallow(<Provider><div /></Provider>);

      expect(provider.exists()).toEqual(true);
    });

    it("passes `uid` and `uid.generate` into context", () => {
      const provider = shallow(<Provider><div /></Provider>);

      expect(provider.props().value.uid.generate).toBeInstanceOf(Function);
    });
  });

  describe("<Consumer />", () => {
    it("renders children", () => {
      const consumer = mount(<Consumer>{() => <div />}</Consumer>);

      expect(consumer.exists()).toEqual(true);
    });

    it("passes the correct context", () => {
      let defaultContext = null;

      mount(
        <Consumer>
          {(context) => {
            expect(context.uid.generate).toBeInstanceOf(Function);
            defaultContext = context;

            return <div />;
          }}
        </Consumer>
      );

      mount(
        <Consumer>
          {(context) => {
            expect(context).toEqual(defaultContext);

            return <div />;
          }}
        </Consumer>
      );

      mount(
        <Provider>
          <Consumer>
            {(context) => {
              expect(context.uid.generate).toBeInstanceOf(Function);
              expect(context).not.toEqual(defaultContext);

              return <div />;
            }}
          </Consumer>
        </Provider>
      );
    });
  });

  describe("`withA11y` wrapper", () => {
    it("renders wrapped component", () => {
      const WrappedA11y = withA11y(() => <div />);
      const wrapper = shallow(<WrappedA11y />);

      expect(wrapper.isEmptyRender()).toEqual(false);
      expect(wrapper.exists()).toEqual(true);
    });

    it("passes `a11yContext` in props", () => {
      const WrappedA11y = withA11y((props) => {
        expect(props).toHaveProperty("a11yContext");
        expect(props.a11yContext.uid.generate).toBeInstanceOf(Function);

        return <div />;
      });

      shallow(<WrappedA11y />);
    });
  });
});
