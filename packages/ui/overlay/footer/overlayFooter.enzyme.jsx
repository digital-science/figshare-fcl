import React from "react";
import { shallow, mount } from "enzyme";

import OverlayFooter from "./overlayFooter";


describe("<OverlayFooter />", () => {
  it("renders component", () => {
    const component = shallow(
      <OverlayFooter>
        <button>Close</button>
        <button>Confirm</button>
      </OverlayFooter>);

    expect(component.isEmptyRender()).toEqual(false);
    expect(component.find("button")).toHaveLength(2);
  });

  it("handles single button styling", () => {
    const component = shallow(
      <OverlayFooter>
        <button>Close</button>
      </OverlayFooter>);

    expect(component.isEmptyRender()).toEqual(false);
    expect(component.find(".singleControl")).toHaveLength(1);
  });

  it("accepts custom className", () => {
    const component = shallow(
      <OverlayFooter className="test">
        <button>Close</button>
      </OverlayFooter>);

    expect(component.isEmptyRender()).toEqual(false);
    expect(component.find(".test")).toHaveLength(1);
  });

  it("exposes slot components for primary and secondary actions", () => {
    const component = mount(
      <OverlayFooter className="test">
        <OverlayFooter.Primary className="custom-main-slot">
          Main Footer Actions
        </OverlayFooter.Primary>
        <OverlayFooter.Secondary className="custom-additional-slot">
          Additional Footer Actions
        </OverlayFooter.Secondary>
      </OverlayFooter>);

    expect(component.find(".primary.custom-main-slot")).toHaveLength(1);
    expect(component.find(".secondary.custom-additional-slot")).toHaveLength(1);
    expect(component.find(".primary.custom-main-slot").text()).toEqual("Main Footer Actions");
    expect(component.find(".secondary.custom-additional-slot").text()).toEqual("Additional Footer Actions");

    component.unmount();
  });
});
