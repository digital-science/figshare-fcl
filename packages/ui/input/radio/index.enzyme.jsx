import React from "react";
import { mount } from "enzyme";

import Radio from "./index";


describe("<Radio />", () => {
  it("renders without crashing", () => {
    mount(<Radio />);
  });

  it("should apply the 'checked' prop correctly", () => {
    const wrapper = mount(<Radio checked={true} />);
    expect(wrapper.prop("checked")).toBe(true);
  });

  it("should apply the 'disabled' prop correctly", () => {
    const wrapper = mount(<Radio disabled={true} />);
    expect(wrapper.prop("disabled")).toBe(true);
  });

  it("should call the onChange function when the radio button is changed", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(<Radio onChange={onChangeMock} />);

    wrapper.find("input[type=\"radio\"]").simulate("change");

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("should not call onChange when radio button is changed but onChange prop is not provided", () => {
    const mockOnChange = jest.fn();
    const wrapper = mount(
      <Radio
        value="option1"
      />
    );

    const radioInput = wrapper.find("input");
    radioInput.simulate("change", { target: { value: "option1" } });

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
