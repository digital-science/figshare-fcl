import React from "react";
import { shallow } from "enzyme";

import TextInput from "./index";


const onBlur = jest.fn();
const onChange = jest.fn();
const onFocus = jest.fn();

describe("<Text />", () => {
  it("renders inline", () => {
    const inputContainer = shallow(<TextInput />);

    expect(inputContainer.isEmptyRender()).toEqual(false);
    expect(inputContainer.find("input")).toHaveLength(1);
  });

  it("renders with error", () => {
    const textInput = shallow(<TextInput />);
    let input = textInput.find("input");

    expect(textInput.find(".error")).toHaveLength(0);
    expect(input.props()["aria-invalid"]).toEqual(undefined);

    textInput.setProps({ error: true });
    input = textInput.find("input");
    expect(textInput.find(".error")).toHaveLength(1);
    expect(input.props()["aria-invalid"]).toEqual(true);

    textInput.setProps({ error: false });
    input = textInput.find("input");
    expect(textInput.find(".error")).toHaveLength(0);
    expect(input.props()["aria-invalid"]).toEqual(undefined);
  });

  it("renders as disabled", () => {
    const textInput = shallow(<TextInput disabled={false} />);
    let input = textInput.find("input");

    expect(input.props()["aria-disabled"]).toEqual(undefined);

    textInput.setProps({ disabled: true });
    input = textInput.find("input");
    expect(input.props()["aria-disabled"]).toEqual(true);

    textInput.setProps({ disabled: false });
    input = textInput.find("input");
    expect(input.props()["aria-disabled"]).toEqual(undefined);
  });

  it("renders with variants", () => {
    const textInput = shallow(<TextInput />);

    expect(textInput.find(".underlineTheme")).toHaveLength(0);
    expect(textInput.find(".defaultTheme")).toHaveLength(1);

    textInput.setProps({ theme: "underline" });
    expect(textInput.find(".underlineTheme")).toHaveLength(1);
    expect(textInput.find(".defaultTheme")).toHaveLength(0);
  });

  it("triggers onChange correctly", () => {
    const textInput = shallow(<TextInput disabled={false} onChange={onChange} />);
    const input = textInput.find("input");

    const event = { target: { value: "test" } };
    input.simulate("change", event);
    expect(onChange).toHaveBeenCalledWith(event);

    textInput.setProps({ disabled: true });
    input.simulate("change", event);
    expect(onChange).toHaveReturnedWith(undefined);
  });

  it("changes input direction correctly", () => {
    const textInput = shallow(<TextInput disabled={false} onChange={onChange} />);

    let event = { target: { value: "test" } };
    textInput.find("input").simulate("change", event);

    expect(textInput.find("input").props().dir).toEqual("ltr");

    event = { target: { value: "\u0591" } };
    textInput.find("input").simulate("change", event);

    expect(textInput.find("input").props().dir).toEqual("rtl");
  });

  it("triggers focus and blur correctly", () => {
    const textInput = shallow(<TextInput onBlur={onBlur} onChange={onChange} onFocus={onFocus} />);

    textInput.find("input").simulate("focus");
    expect(textInput.state().isInputFocused).toEqual(true);
    expect(onFocus).toHaveBeenCalled();

    textInput.find("input").simulate("blur");
    expect(textInput.state().isInputFocused).toEqual(false);
    expect(onBlur).toHaveBeenCalled();
  });
});
