import React from "react";
import { shallow } from "enzyme";

import Textarea from "./index";


const onChange = jest.fn();

describe("<Textarea />", () => {
  it("renders correctly", () => {
    const textarea = shallow(<Textarea onChange={onChange} />);

    expect(textarea.type()).toEqual("textarea");
    expect(textarea.hasClass("textarea")).toEqual(true);
  });

  it("renders with error", () => {
    const textarea = shallow(<Textarea error={false} onChange={onChange} />);

    expect(textarea.find("textarea").props()["aria-invalid"]).toEqual(undefined);

    textarea.setProps({ error: true });
    expect(textarea.find("textarea").props()["aria-invalid"]).toEqual(true);

    textarea.setProps({ error: false });
    expect(textarea.find("textarea").props()["aria-invalid"]).toEqual(undefined);
  });

  it("renders as disabled", () => {
    const textarea = shallow(<Textarea disabled={false} onChange={onChange} />);

    expect(textarea.props()["aria-disabled"]).toEqual(undefined);

    textarea.setProps({ disabled: true });
    textarea.setProps({ disabled: true });
    expect(textarea.find("textarea").props()["aria-disabled"]).toEqual(true);

    textarea.setProps({ disabled: false });
    expect(textarea.find("textarea").props()["aria-disabled"]).toEqual(undefined);
  });


  it("renders with themes", () => {
    const textarea = shallow(<Textarea onChange={onChange} />);

    expect(textarea.find(".underlineTheme")).toHaveLength(0);
    expect(textarea.find(".defaultTheme")).toHaveLength(1);

    textarea.setProps({ theme: "underline" });
    expect(textarea.find(".underlineTheme")).toHaveLength(1);
    expect(textarea.find(".defaultTheme")).toHaveLength(0);
  });

  it("triggers onChange correctly", () => {
    const textarea = shallow(<Textarea disabled={false} onChange={onChange} />);

    const event = { target: { value: "test" } };
    textarea.simulate("change", event);
    expect(onChange).toHaveBeenCalledWith(event);

    textarea.setProps({ disabled: true });
    textarea.simulate("change", event);
    expect(onChange).toHaveReturnedWith(undefined);
  });
});
