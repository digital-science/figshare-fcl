import React from "react";
import { shallow } from "enzyme";

import ToolbarButton from "./index.jsx";


let props = {};

describe("<ToolbarButton />", () => {
  beforeEach(() => {
    props = {
      editorNode: { focus: () => undefined },
      icon: jest.fn(() => <svg />),
      onToggle: jest.fn(),
      disabled: false,
      isActive: false,
      hasSeparator: false,
      style: undefined,
      isAction: false,
    };
  });

  it("renders button correctly", () => {
    const toolbarBtn = shallow(<ToolbarButton {...props} />);

    expect(toolbarBtn.find("button")).toHaveLength(1);
  });

  it("renders button correctly when disabled", () => {
    const toolbarBtn = shallow(<ToolbarButton {...props} />);
    let buttonComponent = toolbarBtn.find("button");
    toolbarBtn.setProps({ disabled: true });
    toolbarBtn.update();
    buttonComponent = toolbarBtn.find("button");
    expect(buttonComponent.props().disabled).toEqual(true);
  });

  it("renders button correctly when active", () => {
    const toolbarBtn = shallow(<ToolbarButton {...props} />);
    let buttonComponent = toolbarBtn.find("button");
    toolbarBtn.setProps({ isActive: true });
    toolbarBtn.update();
    buttonComponent = toolbarBtn.find("button");

    expect(buttonComponent.props().className).toEqual("button buttonActive");

    toolbarBtn.setProps({ isActive: false });
    toolbarBtn.update();
    buttonComponent = toolbarBtn.find("button");

    expect(buttonComponent.props().className).toEqual("button");
  });

  it("renders separator", () => {
    const toolbarBtn = shallow(<ToolbarButton {...props} />);
    expect(toolbarBtn.find("span")).toHaveLength(0);

    toolbarBtn.setProps({ hasSeparator: true });
    toolbarBtn.update();

    expect(toolbarBtn.find("span")).toHaveLength(1);
  });

  it("correctly calls on Toggle", () => {
    const toolbarBtn = shallow(<ToolbarButton {...props} />);

    toolbarBtn.instance().onToggle({ preventDefault: () => undefined });

    expect(toolbarBtn.instance().props.onToggle).toHaveBeenCalled();
  });

  it("correctly calls onKeyToggle", () => {
    const toolbarBtn = shallow(<ToolbarButton {...props} />);

    toolbarBtn.instance().onKeyToggle({
      key: "Enter",
      preventDefault: () => undefined,
      stopPropagation: () => undefined,
    });

    expect(toolbarBtn.instance().props.onToggle).toHaveBeenCalled();
  });

  it("does not call onKeyToggle", () => {
    const toolbarBtn = shallow(<ToolbarButton {...props} />);

    toolbarBtn.instance().onKeyToggle({
      key: "Tab",
      preventDefault: () => undefined,
      stopPropagation: () => undefined,
    });

    expect(toolbarBtn.instance().props.onToggle).not.toHaveBeenCalled();
  });
});
