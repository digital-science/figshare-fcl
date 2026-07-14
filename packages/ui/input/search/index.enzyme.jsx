import React from "react";
import { IconButton } from "@digital-science/figshare-fcl/button";
import { shallow } from "enzyme";

import SearchForm from "./index";


describe("<SearchForm />", () => {
  let onSubmit = null;
  let onChange = null;
  let onClear = null;

  beforeEach(() => {
    onSubmit = jest.fn();
    onChange = jest.fn();
    onClear = jest.fn();
  });

  it("renders correctly", () => {
    const inputContainer = shallow(<SearchForm onChange={onChange} onSubmit={onSubmit} />);

    expect(inputContainer.isEmptyRender()).toEqual(false);
    expect(inputContainer.find("input")).toHaveLength(1);
  });

  it("renders with error", () => {
    const Input = shallow(<SearchForm onChange={onChange} onSubmit={onSubmit} />);
    let input = Input.find("input");

    expect(Input.find(".error")).toHaveLength(0);
    expect(input.props()["aria-invalid"]).toEqual(undefined);

    Input.setProps({ error: true });
    input = Input.find("input");
    expect(Input.find(".error")).toHaveLength(1);
    expect(input.props()["aria-invalid"]).toEqual(true);

    Input.setProps({ error: false });
    input = Input.find("input");
    expect(Input.find(".error")).toHaveLength(0);
    expect(input.props()["aria-invalid"]).toEqual(undefined);
  });

  it("renders as disabled", () => {
    const Input = shallow(<SearchForm disabled={false} onChange={onChange} onSubmit={onSubmit} />);
    let input = Input.find("input");

    expect(input.props()["aria-disabled"]).toEqual(undefined);

    Input.setProps({ disabled: true });
    input = Input.find("input");
    expect(input.props()["aria-disabled"]).toEqual(true);

    Input.setProps({ disabled: false });
    input = Input.find("input");
    expect(input.props()["aria-disabled"]).toEqual(undefined);
  });


  it("renders with variants", () => {
    const Input = shallow(<SearchForm onChange={onChange} onSubmit={onSubmit} />);

    expect(Input.find(".defaultContainer")).toHaveLength(1);
    expect(Input.find(".underlineContainer")).toHaveLength(0);

    Input.setProps({ theme: "underline" });
    expect(Input.find(".defaultContainer")).toHaveLength(0);
    expect(Input.find(".underlineContainer")).toHaveLength(1);
  });

  it("renders buttons correctly", () => {
    const Input = shallow(<SearchForm value="value" onChange={onChange} onSubmit={onSubmit} />);
    let button = Input.find(IconButton);

    expect(button).toHaveLength(2);
    Input.setProps({ value: undefined });
    button = Input.find(IconButton);

    expect(button).toHaveLength(1);
  });

  it("triggers onChange correctly", () => {
    const Input = shallow(<SearchForm disabled={true} onChange={onChange} />);
    Input.find("input").simulate("change", { target: { value: "Initial value" } });

    expect(onChange).not.toHaveBeenCalled();

    Input.setProps({ disabled: false });
    Input.find("input").simulate("change", { target: { value: "Changed value" } });

    expect(onChange).toHaveBeenCalled();
  });

  it("deletes value correctly", () => {
    const Input = shallow(<SearchForm value="value" onChange={onClear} onSubmit={onSubmit} />);
    const ClearButton = Input.find(IconButton).at(0);

    const ev = { target: { value: "" } };
    ClearButton.simulate("click", ev);

    expect(onClear).toHaveBeenCalled();
  });

  it("triggers focus and blur correctly", () => {
    const Input = shallow(<SearchForm disabled={true} onChange={onChange} />);

    expect(Input.instance().state.isInputFocused).toEqual(false);

    Input.find("input").simulate("focus");
    expect(Input.instance().state.isInputFocused).toEqual(true);

    Input.find("input").simulate("blur");
    expect(Input.instance().state.isInputFocused).toEqual(false);
  });
});
