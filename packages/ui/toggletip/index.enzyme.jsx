import React from "react";
import { mount } from "enzyme";

import { Content, Trigger } from "../popup/index.jsx";

import { Toggletip, UncontrolledToggletip } from "./index.jsx";


describe("<Toggletip />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("renders children", () => {
    const triggerContent = jest.fn(({ ...props }) => <div {...props} id="trigger" />);
    const toggletipContent = jest.fn(() => <div id="content" />);
    const stopPropagation = jest.fn();

    const toggletip = mount(
      <Toggletip >
        {() => (
          <div>
            <Trigger>
              {triggerContent}
            </Trigger>
            <Content>
              {toggletipContent}
            </Content>
          </div>
        )}
      </Toggletip>
    );

    expect(toggletip.type()).toEqual(Toggletip);
    expect(toggletip.find(Trigger)).toHaveLength(1);
    expect(toggletip.find(Content)).toHaveLength(1);
    expect(toggletip.find("#trigger")).toHaveLength(1);
    expect(toggletip.find("#content")).toHaveLength(1);
    expect(toggletip.instance().constructor.defaultProps.onToggle()).toEqual(undefined);
    expect(triggerContent).toHaveBeenCalled();
    expect(toggletipContent).toHaveBeenCalled();

    const onToggle = jest.fn();
    toggletip.setProps({ onToggle });

    expect(onToggle).not.toHaveBeenCalled();

    toggletip.instance().onToggle({ stopPropagation });
    expect(onToggle).toHaveBeenCalledWith({ stopPropagation }, { isVisible: true });

    toggletip.setProps({ isVisible: true });
    toggletip.instance().onToggle({ stopPropagation });
    expect(onToggle).toHaveBeenCalledWith({ stopPropagation }, { isVisible: false });

    toggletip.instance().onClose({ stopPropagation });
    expect(onToggle).toHaveBeenCalledWith({ stopPropagation }, { isVisible: false });
  });
});

describe("<UncontrolledToggletip />", () => {
  it("renders children", () => {
    const toggletip = mount(
      <UncontrolledToggletip>
        {() => (
          <div />
        )}
      </UncontrolledToggletip>
    );

    expect(toggletip.type()).toEqual(UncontrolledToggletip);
    expect(toggletip.find(Toggletip)).toHaveLength(1);

    const onToggle = jest.fn();
    toggletip.setProps({ onToggle });

    expect(onToggle).not.toHaveBeenCalled();
    toggletip.find(Toggletip).instance().onToggle({ stopPropagation: jest.fn() }, true);

    expect(onToggle).toHaveBeenCalledWith(expect.any(Object), { isVisible: true });
  });
});
