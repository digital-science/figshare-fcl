import React from "react";
import { shallow } from "enzyme";

import GenericButton from "../genericButton";

import IconButton from "./index";


describe("<IconButton />", () => {
  it("render <GenericButton />", () => {
    const label = "Click me";
    const Icon = jest.fn(() => <svg />);

    const iconButton = shallow(<IconButton Icon={Icon}>{label}</IconButton>);

    expect(iconButton.find(GenericButton)).toHaveLength(1);
    expect(iconButton.find(GenericButton).prop("tooltip")).toEqual(label);
    expect(iconButton.find(Icon)).toHaveLength(1);
  });
});
