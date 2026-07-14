import React from "react";
import { shallow } from "enzyme";

import Checked from "../../../icons/checkBox/checked";
import Unchecked from "../../../icons/checkBox/unchecked";

import Checkmark from "./checkmark";
import style from "./checkmark.module.css";


describe("<Checkmark />", () => {
  it("renders correctly with no props", () => {
    const checkmark = shallow(<Checkmark />);

    expect(checkmark.type()).toEqual(Unchecked);
    expect(checkmark.hasClass(style.checkmark)).toEqual(true);
    expect(checkmark.hasClass(style.checked)).toEqual(false);
    expect(checkmark.hasClass(style.disabled)).toEqual(false);
  });

  it("renders in [alt] theme", () => {
    const checkmark = shallow(<Checkmark theme="alt" />);

    expect(checkmark.hasClass(style.alt)).toEqual(true);

    checkmark.setProps({ theme: undefined });
    expect(checkmark.hasClass(style.alt)).toEqual(false);
  });

  it("renders in error state", () => {
    const checkmark = shallow(<Checkmark error={true} />);

    expect(checkmark.hasClass(style.error)).toEqual(true);

    checkmark.setProps({ error: false });
    expect(checkmark.hasClass(style.error)).toEqual(false);
  });

  it("renders in disabled state", () => {
    const checkmark = shallow(<Checkmark disabled={true} />);

    expect(checkmark.hasClass(style.disabled)).toEqual(true);

    checkmark.setProps({ disabled: false });
    expect(checkmark.hasClass(style.disabled)).toEqual(false);
  });

  it("renders in all check states", () => {
    const checkmark = shallow(<Checkmark />);

    expect(checkmark.hasClass(style.checked)).toEqual(false);
    expect(checkmark.type()).toEqual(Unchecked);

    checkmark.setProps({ checked: true });
    expect(checkmark.hasClass(style.checked)).toEqual(true);
    expect(checkmark.type()).toEqual(Checked);
  });
});
