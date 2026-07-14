import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import { Content, Trigger } from "../popup/index.jsx";

import { Tooltip, UncontrolledTooltip } from "./index.jsx";


describe("<Tooltip />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("renders children", () => {
    jest.useFakeTimers();
    const triggerChildren = jest.fn(({ ...props }) => <div {...props} id="trigger" />);
    const contentChildren = jest.fn(() => <div id="content" />);

    const tooltip = mount(
      <Tooltip>
        {() => (
          <div>
            <Trigger>
              {triggerChildren}
            </Trigger>
            <Content>
              {contentChildren}
            </Content>
          </div>
        )}
      </Tooltip>
    );

    const setTimeoutSpy = jest.spyOn(window, "setTimeout");
    const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");

    expect(tooltip.type()).toEqual(Tooltip);
    expect(tooltip.find(Trigger)).toHaveLength(1);
    expect(tooltip.find(Content)).toHaveLength(1);
    expect(tooltip.find("#trigger")).toHaveLength(1);
    expect(tooltip.find("#content")).toHaveLength(1);
    expect(tooltip.instance().constructor.defaultProps.onToggle()).toEqual(undefined);

    const onToggle = jest.fn();
    tooltip.setProps({ onToggle });

    expect(onToggle).not.toHaveBeenCalled();
    tooltip.instance().onShow({});

    act(() => {
      // eslint-disable-next-line no-magic-numbers
      jest.advanceTimersByTime(600);
    });

    tooltip.update();
    expect(onToggle).toHaveBeenCalledWith(expect.any(Object), { "isVisible": true });

    tooltip.instance().onHide({});
    jest.runAllTimers();

    expect(onToggle).toHaveBeenCalled();
    expect(tooltip.state().timeoutId).not.toEqual(0);
    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), expect.any(Number));
    expect(onToggle).toHaveBeenCalledWith(expect.any(Object), { "isVisible": false });

    tooltip.setState({ timeoutId: 1 });
    tooltip.instance().onShow({});
    expect(tooltip.state().timeoutId).toEqual(0);
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalledWith(1);
    expect(onToggle).toHaveBeenCalledWith(expect.any(Object), { "isVisible": true });

    tooltip.instance().onClose({});
    expect(onToggle).toHaveBeenCalledWith(expect.any(Object), { "isVisible": false });
  });
});

describe("<UncontrolledTooltip />", () => {
  it("renders children", () => {
    const tooltip = mount(
      <UncontrolledTooltip>
        {() => (
          <div />
        )}
      </UncontrolledTooltip>
    );

    expect(tooltip.type()).toEqual(UncontrolledTooltip);
    expect(tooltip.find(Tooltip)).toHaveLength(1);

    const onToggle = jest.fn();
    tooltip.setProps({ onToggle });

    expect(onToggle).not.toHaveBeenCalled();
    tooltip.find(Tooltip).instance().onToggle({}, true);

    expect(onToggle).toHaveBeenCalledWith(expect.any(Object), { isVisible: true });
  });
});
