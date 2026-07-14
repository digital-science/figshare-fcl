import React from "react";
import { shallow } from "enzyme";

import Alert from "./index";


describe("<Alert />", () => {
  it("render children", () => {
    const children = jest.fn(() => (<div id="children">text</div>));
    const alert = shallow(<Alert variant="success">{children}</Alert>).dive().dive();

    expect(alert.find("#children")).toHaveLength(1);
    expect(alert.find(".success")).toHaveLength(1);
    expect(alert.props().role).toEqual("alert");
  });

  it("render children with close button", () => {
    const children = jest.fn(() => (<div id="children">text</div>));

    const closeFn = jest.fn();
    const alert = shallow(<Alert role="alertdialog" variant="error" onClose={closeFn}>{children}</Alert>).dive().dive();

    expect(alert.find("#children")).toHaveLength(1);
    expect(alert.find(".error")).toHaveLength(1);
    expect(alert.find(".close")).toHaveLength(1);
    expect(alert.props().role).toEqual("alertdialog");


    alert.find(".close").simulate("click");
    expect(closeFn).toHaveBeenCalled();
  });
});
