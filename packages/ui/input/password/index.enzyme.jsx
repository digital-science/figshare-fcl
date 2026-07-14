import React from "react";
import { mount } from "enzyme";

import Password from "./index";


const onChange = jest.fn();

const mountPassword = (props) => mount(<Password onChange={onChange} {...props} />);

describe("<Password />", () => {
  it("renders", () => {
    const password = mountPassword();

    expect(password.isEmptyRender()).toEqual(false);
    expect(password.find("input")).toHaveLength(1);
  });

  it("renders with error", () => {
    const password = mountPassword();
    let input = password.find("input");

    expect(password.find(".error")).toHaveLength(0);
    expect(input.props()["aria-invalid"]).toEqual(undefined);

    password.setProps({ error: true });
    input = password.find("input");
    expect(password.find(".error")).toHaveLength(1);
    expect(input.props()["aria-invalid"]).toEqual(true);

    password.setProps({ error: false });
    input = password.find("input");
    expect(password.find(".error")).toHaveLength(0);
    expect(input.props()["aria-invalid"]).toEqual(undefined);
  });

  it("renders with variants", () => {
    const password = mountPassword();

    expect(password.find(".underlineTheme")).toHaveLength(0);
    expect(password.find(".defaultTheme")).toHaveLength(1);

    password.setProps({ theme: "underline" });
    expect(password.find(".underlineTheme")).toHaveLength(1);
    expect(password.find(".defaultTheme")).toHaveLength(0);
  });

  it("triggers onToggleVisibility correctly", () => {
    const password = mountPassword();

    expect(password.state().isPasswordVisible).toEqual(false);

    password.instance().onToggleVisibility();
    expect(password.state().isPasswordVisible).toEqual(true);

    password.instance().onToggleVisibility();
    expect(password.state().isPasswordVisible).toEqual(false);

    password.setProps({ disabled: true });
    password.instance().onToggleVisibility();
    expect(password.state().isPasswordVisible).toEqual(false);
  });
});
