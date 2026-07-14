import React from "react";
import { mount } from "enzyme";

import Checkbox, { UncontrolledCheckbox } from "./index";


const baselineProps = {
  checked: false,
  onChange: jest.fn(),
};

const mountComponent = (props) => mount(<UncontrolledCheckbox {...baselineProps} {...props} />);

describe("<UncontrolledCheckbox />", () => {
  it("applies correct props", () => {
    const testedComponent = mountComponent();
    const dropdown = testedComponent.find(Checkbox);
    const { checked, onChange } = dropdown.props();

    expect(checked).toEqual(testedComponent.state().checked);
    expect(onChange).toEqual(testedComponent.instance().onChange);
  });

  it("correctly calls onChange", () => {
    const onChange = jest.fn();
    const testedComponent = mountComponent({ onChange, checked: false });

    expect(testedComponent.state().checked).toEqual(false);
    const event = { target: true };
    testedComponent.instance().onChange(event);
    expect(testedComponent.state().checked).toEqual(true);
    expect(onChange).toHaveBeenCalledWith(event, testedComponent.state().checked);
    testedComponent.instance().onChange(event);
    expect(testedComponent.state().checked).toEqual(false);
  });
});
