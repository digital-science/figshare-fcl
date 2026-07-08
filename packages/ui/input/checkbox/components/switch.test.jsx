import React from "react";
import { shallow } from "enzyme";

import Switch from "./switch";
import style from "./switch.module.css";


describe("<Switch />", () => {
  it("renders correctly with no props", () => {
    const sw = shallow(<Switch />);

    expect(sw.hasClass(style.switch)).toEqual(true);
    expect(sw.hasClass(style.checked)).toEqual(false);
    expect(sw.hasClass(style.disabled)).toEqual(false);
    expect(sw.hasClass(style.error)).toEqual(false);

    expect(sw.childAt(0).hasClass(style.slider)).toEqual(true);
    expect(sw.childAt(1).hasClass(style.status)).toEqual(true);
    expect(sw.childAt(2).hasClass(style.handle)).toEqual(true);
  });

  it("renders in disabled state", () => {
    const sw = shallow(<Switch disabled={true} />);

    expect(sw.hasClass(style.disabled)).toEqual(true);

    sw.setProps({ disabled: false });
    expect(sw.hasClass(style.disabled)).toEqual(false);
  });

  it("renders in error state", () => {
    const sw = shallow(<Switch error={true} />);

    expect(sw.hasClass(style.error)).toEqual(true);

    sw.setProps({ error: false });
    expect(sw.hasClass(style.error)).toEqual(false);
  });

  it("renders all checked states", () => {
    const sw = shallow(<Switch />);

    expect(sw.hasClass(style.checked)).toEqual(false);
    expect(sw.find("span.status").text()).toEqual("OFF");

    sw.setProps({ checked: true });
    expect(sw.hasClass(style.checked)).toEqual(true);
    expect(sw.find("span.status").text()).toEqual("ON");

    sw.setProps({ checked: false });
    expect(sw.hasClass(style.checked)).toEqual(false);
    expect(sw.find("span.status").text()).toEqual("OFF");
  });
});
