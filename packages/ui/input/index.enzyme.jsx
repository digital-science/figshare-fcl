import React from "react";
import { mount } from "enzyme";

import Checkbox from "./checkbox";
import Date from "./date";
import Password from "./password";
import Text from "./text";
import Input from "./index";


describe("<Input />", () => {
  it("renders null if type is not valid", () => {
    const input = mount(<Input type="foobar" />);

    expect(input.isEmptyRender()).toEqual(true);
  });

  it("renders Checkbox component", () => {
    const input = mount(<Input type="checkbox" />);

    expect(input.find(Checkbox)).toHaveLength(1);
  });

  it("renders Date component", () => {
    const input = mount(<Input type="date" />);

    expect(input.find(Date)).toHaveLength(1);
  });

  it("renders Password component", () => {
    const input = mount(<Input type="password" />);

    expect(input.find(Password)).toHaveLength(1);
  });

  it("renders Text component", () => {
    const input = mount(<Input type="text" />);

    expect(input.find(Text)).toHaveLength(1);
  });
});
