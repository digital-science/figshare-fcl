import React from "react";
import { mount } from "enzyme";

import { Warning } from ".";


describe("Warning component", () => {
  const props = { contentLength: 5230 };
  it("renders to correct text", () => {
    const component = mount(<Warning {...props} />);

    expect(component.find(".editorTextLength")).toHaveLength(1);
  });
});
