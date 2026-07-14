import React from "react";
import { mount } from "enzyme";

import Superscript from "./superscript";


describe("<Superscript />", () => {
  const props = { children: [] };
  it("renders superscript component", () => {
    const superscriptComponent = mount(<Superscript {...props} />);

    expect(superscriptComponent.isEmptyRender()).toEqual(false);
    expect(superscriptComponent.find("sup")).toHaveLength(1);
  });
});
