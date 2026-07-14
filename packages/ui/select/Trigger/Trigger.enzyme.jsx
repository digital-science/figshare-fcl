import React from "react";
import { shallow } from "enzyme";

import Trigger from "./index";


describe("Trigger component", () => {
  const defaultProps = {
    children: "Select",
    ariaLabel: "Select",
    id: "test-id",
    variant: "secondary",
  };

  it("should render without crashing", () => {
    const wrapper = shallow(<Trigger {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });
});
