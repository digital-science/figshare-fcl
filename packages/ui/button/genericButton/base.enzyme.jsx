import React from "react";
import { shallow } from "enzyme";

import Base from "./base";


describe("<Base />", () => {
  let createEvent = null;

  beforeEach(() => {
    createEvent = jest.spyOn(document, "createEvent").mockImplementation(() => {
      throw Error("Desktop");
    });
  });

  afterEach(() => {
    createEvent.mockRestore();
  });

  it("renders <button /> when no href is passed", () => {
    const baseButton = shallow(<Base>Click me</Base>);

    expect(baseButton.find("button")).toHaveLength(1);
    expect(baseButton.find("button").props().type).toEqual("button");

    baseButton.setProps({ type: "submit" });

    expect(baseButton.find("button").props().type).toEqual("submit");
  });

  it("renders <a /> when href is passed", () => {
    const baseButton = shallow(<Base href="#">Click me</Base>);

    expect(baseButton.find("a")).toHaveLength(1);
    expect(baseButton.find("a").prop("href")).toEqual("#");

    baseButton.setProps({ target: "_blank", rel: "fakeRel" });
    expect(baseButton.find("a").prop("target")).toEqual("_blank");
    expect(baseButton.find("a").prop("rel")).toMatch("fakeRel");
  });

  it("does not call onClick when disabled", () => {
    const onClick = jest.fn();
    const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

    const baseButton = shallow(
      <Base disabled={true} onClick={onClick}>
        Click me
      </Base>
    );

    expect(baseButton.prop("aria-disabled")).toEqual(true);

    baseButton.simulate("click", event);
    expect(onClick).not.toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it("doesn't prevents default onClick when not disabled", () => {
    const onClick = jest.fn();
    const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

    const baseButton = shallow(
      <Base disabled={false} onClick={onClick}>
        Click me
      </Base>
    );

    expect(baseButton.prop("aria-disabled")).toEqual(undefined);

    baseButton.simulate("click", event);
    expect(onClick).toHaveBeenCalledWith(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(event.stopPropagation).not.toHaveBeenCalled();
  });

  describe("on mobile", () => {
    beforeEach(() => {
      createEvent = jest.spyOn(document, "createEvent").mockImplementation(() => undefined);
      jest.useFakeTimers("modern");
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("triggers long press if delay reached", () => {
      const onLongPress = jest.fn();
      const baseButton = shallow(<Base onLongPress={onLongPress}>Click me</Base>);

      baseButton.simulate("touchStart");
      jest.runOnlyPendingTimers();
      expect(onLongPress).toHaveBeenCalled();
    });

    it("doesn't trigger long press if delay not reached", () => {
      const onLongPress = jest.fn();
      const baseButton = shallow(<Base onLongPress={onLongPress}>Click me</Base>);

      baseButton.simulate("touchStart");
      expect(jest.getTimerCount()).toEqual(1);

      baseButton.simulate("touchEnd");
      expect(jest.getTimerCount()).toEqual(0);
      expect(onLongPress).not.toHaveBeenCalled();

      baseButton.simulate("touchStart");
      baseButton.simulate("touchCancel");
      expect(jest.getTimerCount()).toEqual(0);
      expect(onLongPress).not.toHaveBeenCalled();
    });

    it("doesn't trigger long press if touch moved", () => {
      const onLongPress = jest.fn();
      const baseButton = shallow(<Base onLongPress={onLongPress}>Click me</Base>);

      baseButton.simulate("touchStart");
      baseButton.simulate("touchMove");
      jest.runOnlyPendingTimers();
      expect(onLongPress).not.toHaveBeenCalled();
    });

    it("clears timeout if component is unmounted before delay reached", () => {
      const onLongPress = jest.fn();
      const baseButton = shallow(<Base onLongPress={onLongPress}>Click me</Base>);

      baseButton.simulate("touchStart");
      expect(jest.getTimerCount()).toEqual(1);

      baseButton.unmount();
      expect(jest.getTimerCount()).toEqual(0);
      expect(onLongPress).not.toHaveBeenCalled();
    });
  });
});
