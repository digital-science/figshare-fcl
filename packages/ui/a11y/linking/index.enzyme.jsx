import React from "react";
import { mount } from "enzyme";

import { withLinkingContext } from ".";


describe("linking", () => {
  it("withLinkingContext", () => {
    const Component = () => null;
    const WrappedComponent = withLinkingContext(Component);

    const wrapper = mount(<WrappedComponent>test</WrappedComponent>).find(Component);

    expect(wrapper.props()).toHaveProperty("linkingContext");
  });
});
