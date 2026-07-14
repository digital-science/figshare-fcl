import React from "react";
import { mount } from "enzyme";

import Checkbox from "./index";
import Checkmark from "./components/checkmark";
import Switch from "./components/switch";


describe("<Checkbox />", () => {
  it("renders", () => {
    const checkbox = mount(<Checkbox />);

    expect(checkbox.isEmptyRender()).toEqual(false);
  });

  it("correctly applies icon variants", () => {
    const checkbox = mount(<Checkbox />);
    expect(checkbox.find(Checkmark)).toHaveLength(1);
    expect(checkbox.find(Switch)).toHaveLength(0);

    checkbox.setProps({ variant: "switch" });
    expect(checkbox.find(Checkmark)).toHaveLength(0);
    expect(checkbox.find(Switch)).toHaveLength(1);

    checkbox.setProps({ variant: "checkbox" });
    expect(checkbox.find(Checkmark)).toHaveLength(1);
    expect(checkbox.find(Switch)).toHaveLength(0);
  });

  it("correctly applies disabled props", () => {
    const checkbox = mount(<Checkbox disabled={true} />);
    expect(checkbox.find("input").props()["aria-disabled"]).toEqual(true);

    checkbox.setProps({ disabled: false });
    expect(checkbox.find("input").props()["aria-disabled"]).toEqual(undefined);
  });

  it("correctly applies error props", () => {
    const checkbox = mount(<Checkbox error={true} />);
    expect(checkbox.find("input").props()["aria-invalid"]).toEqual(true);

    checkbox.setProps({ error: false });
    expect(checkbox.find("input").props()["aria-invalid"]).toEqual(undefined);
  });

  it("doesnt trigger onChange if disabled", () => {
    const onChange = jest.fn();
    const checkbox = mount(<Checkbox disabled={true} onChange={onChange} />);
    const instance = checkbox.instance();

    instance.onChange();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("correctly triggers onChange", () => {
    const onChange = jest.fn();
    const checkbox = mount(<Checkbox onChange={onChange} />);
    const instance = checkbox.instance();

    instance.onChange();
    expect(onChange).toHaveBeenCalled();
    jest.clearAllMocks();
  });

  it("correctly calls setRef", () => {
    const innerRef = jest.fn();
    const testedComponent = mount(<Checkbox innerRef={innerRef} />);
    const { setRef, inputNode: existingContainerNode } = testedComponent.instance();
    jest.clearAllMocks();

    setRef();
    expect(innerRef).not.toHaveBeenCalled();

    setRef(existingContainerNode);
    expect(innerRef).not.toHaveBeenCalled();

    const inputNode = testedComponent.find("div").getDOMNode;
    setRef(inputNode);
    expect(innerRef).toHaveBeenCalledWith(inputNode);
  });
});
