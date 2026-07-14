import React from "react";
import { mount } from "enzyme";

import { RenderSwitch, Case } from "./index";


describe("<RenderSwitch />", () => {
  it("renders only the case that matches the value provided", () => {
    const component = mount(
      <RenderSwitch value={2}>
        <Case value={1}>
          <span id="first-case-content">First Case</span>
        </Case>
        <Case value={2}>
          <span id="second-case-content">Second Case</span>
        </Case>
      </RenderSwitch>
    );

    expect(component.find("#second-case-content")).toHaveLength(1);
    expect(component.find("#first-case-content")).toHaveLength(0);
  });

  it("Case accepts a function as a child and will call it with its own and the current context values", () => {
    const renderer = jest.fn(() => <span id="content">content</span>);
    const component = mount(
      <RenderSwitch value={true}>
        <Case value={true}>
          {renderer}
        </Case>
        <Case value={false}>
          {renderer}
        </Case>
      </RenderSwitch>
    );

    expect(component.find("#content")).toHaveLength(1);
    expect(renderer).toHaveBeenCalledWith({ value: true, contextValue: true });
  });

  it("Case a rule function by which to check its own value against the context value and decide to render", () => {
    const rule = jest.fn((number, term) => number - term === 0);
    const component = mount(
      <RenderSwitch value={5}>
        <Case rule={rule} value={3}>
          <span id="first-content">first content</span>
        </Case>
        <Case rule={rule} value={5}>
          <span id="second-content">second content</span>
        </Case>
      </RenderSwitch>
    );

    expect(component.find("#second-content")).toHaveLength(1);
    expect(rule).toHaveBeenCalledWith(5, 5);
  });
});
