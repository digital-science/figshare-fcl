import React from "react";
import { shallow } from "enzyme";

import GenericButton from "../genericButton";

import Button from "./index";


describe("<Button />", () => {
  it("renders <GenericButton />", () => {
    const tooltip = "Extra info";

    const button = shallow(<Button tooltip={tooltip}> Click me </Button>);

    expect(button.find(GenericButton)).toHaveLength(1);
    expect(button.find(GenericButton).prop("tooltip")).toEqual(tooltip);
  });

  it("renders Icon when passed", () => {
    const Icon = jest.fn(() => <svg />);

    const button = shallow(<Button Icon={Icon}> Click me </Button>);

    expect(button.find(Icon)).toHaveLength(1);
  });
});
