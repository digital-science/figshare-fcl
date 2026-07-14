import React from "react";
import { shallow } from "enzyme";

import OverlayContent from "./overlayContent";


describe("<OverlayContent />", () => {
  it("renders component", () => {
    const component = shallow(
      <OverlayContent>
        <article>Content</article>
      </OverlayContent>);

    expect(component.isEmptyRender()).toEqual(false);
    expect(component.find("article")).toHaveLength(1);
  });

  it("accepts custom className", () => {
    const component = shallow(
      <OverlayContent className="test">
        <button>Close</button>
      </OverlayContent>);

    expect(component.isEmptyRender()).toEqual(false);
    expect(component.find(".test")).toHaveLength(1);
  });
});
