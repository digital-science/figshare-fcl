import React from "react";
import { mount } from "enzyme";

import RenderInPortal from "./renderInPortal";


const mountComponent = (props) => mount(
  <RenderInPortal {...props}>MyChildren</RenderInPortal>,
  { attachTo: document.rootContainer }
);

describe("<RenderInPortal />", () => {
  const mapping = {};
  document.addEventListener = jest.fn((event, cb) => {
    mapping[event] = cb;
  });
  document.removeEventListener = jest.fn((event) => {
    mapping[event] = undefined;
  });

  it("correctly applies document eventListeners", () => {
    const testedComponent = mountComponent();
    expect(mapping.fullscreenchange).not.toEqual(undefined);
    testedComponent.unmount();
    expect(mapping.fullscreenchange).toEqual(undefined);
  });

  it("sets correct portal", () => {
    const testedComponent = mountComponent();
    expect(testedComponent.state().portal).toEqual(document.body);

    testedComponent.instance().onFullScreenChange({ target: false });
    expect(testedComponent.state().portal).toEqual(document.body);

    const target = mount(<div />).find("div").getDOMNode();
    document.fullscreenElement = target;
    testedComponent.instance().onFullScreenChange({ target });
    expect(testedComponent.state().portal).toEqual(target);
  });
});
