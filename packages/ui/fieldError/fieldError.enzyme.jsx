import { mount, shallow } from "enzyme";
import React from "react";

import { FieldError } from "./fieldError";


describe("<FieldError />", () => {
  it("renders a field error if provided", () => {
    const component = mount(
      <FieldError
        error={ {
          id: "error-1",
          at: "blur",
          message: "message",
        } } field="my-field"
      />
    );

    const error = component.find(".fieldError").getDOMNode();

    expect(error.getAttribute("data-error")).toEqual("true");
    expect(error.getAttribute("data-error-at")).toEqual("blur");
    expect(error.getAttribute("data-error-for")).toEqual("my-field");
    expect(error.getAttribute("data-error-id")).toEqual("error-1");

    component.unmount();
  });
  it("renders an empty field error message if none is provided (prevents focus steal issues with rerendering)", () => {
    const component = mount(<FieldError error={null} />);

    const error = component.find(".fieldError").getDOMNode();

    expect(error.getAttribute("data-error")).toEqual("false");
    expect(error.getAttribute("data-error-at")).toEqual("none");
    expect(error.getAttribute("data-error-for")).toEqual("unknown");
    expect(error.getAttribute("data-error-id")).toEqual(null);

    component.unmount();
  });
  it("supports full width", () => {
    const component = mount(
      <FieldError
        error={ {
          id: "error-1",
          at: "blur",
          message: "message",
        } }
        field="my-field"
        fullWidth={true}
      />
    );

    expect(component.find(".fullWidth")).toHaveLength(1);
  });

  it("supports a couple of sizes", () => {
    const defaultSmall = shallow(<FieldError error={null} />);
    const small = shallow(<FieldError error={null} size="small" />);
    const large = shallow(<FieldError error={null} size="large" />);

    expect(defaultSmall.find(".small")).toHaveLength(1);
    expect(small.find(".small")).toHaveLength(1);
    expect(large.find(".large")).toHaveLength(1);
  });
});
