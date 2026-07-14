import React, { createRef } from "react";
import { shallow } from "enzyme";

import withRef from "./withRef";


describe("`withRef` wrapper", () => {
  it("renders null if wrapped component is missing", () => {
    const Wrapped = withRef();

    const wrapper = shallow(<Wrapped />).dive();
    expect(wrapper.isEmptyRender()).toEqual(true);
  });


  it("renders the wrapped component", () => {
    const Wrapped = withRef(() => <div />);

    const wrapper = shallow(<Wrapped />).dive();
    expect(wrapper.exists()).toEqual(true);
  });

  it("exposes `ref` to `forwardedRef`", () => {
    const ref = createRef();
    const Wrapped = withRef((props) => <div {...props} />);


    const wrapper = shallow(<Wrapped ref={ref} />).dive();
    expect(wrapper.props().forwardedRef).toEqual(ref);

    const wrappedComponent = wrapper.dive();
    expect(wrappedComponent.props().forwardedRef).toEqual(ref);
  });

  it("passes other props to wrapped component", () => {
    const passedProps = { s: 1, m: 2 };
    const Wrapped = withRef((props) => <div {...props} />);

    const wrapper = shallow(<Wrapped {...passedProps} />).dive();
    const wrappedComponent = wrapper.dive();
    const { forwardedRef, ...restProps } = wrappedComponent.props();
    expect(restProps).toEqual(passedProps);
  });

  it("does not bypass `forwardedRef` prop", () => {
    const ref = createRef();
    const Wrapped = withRef((props) => <div {...props} />);

    const wrapper = shallow(<Wrapped forwardedRef={ref} />).dive();
    expect(wrapper.props().forwardedRef).not.toEqual(ref);

    const wrappedComponent = wrapper.dive();
    expect(wrappedComponent.props().forwardedRef).not.toEqual(ref);
  });
});
