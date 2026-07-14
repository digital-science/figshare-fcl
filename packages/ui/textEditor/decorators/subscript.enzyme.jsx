import React from "react";
import { mount } from "enzyme";

import Subscript from "./subscript";


describe("<subscript />", () => {
  const props = { children: [] };
  it("renders subscript component", () => {
    const subscriptComponent = mount(<Subscript {...props} />);

    expect(subscriptComponent.isEmptyRender()).toEqual(false);
    expect(subscriptComponent.find("sub")).toHaveLength(1);
  });
});
