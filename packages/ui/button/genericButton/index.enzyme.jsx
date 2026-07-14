import React, { createRef } from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import BaseButton from "./base";
import GenericButton from "./index";


describe("<GenericButton />", () => {
  const classNameTooltip = "tooltipClass";

  it("renders <BaseButton />", () => {
    const genericButton = shallow(<GenericButton>Click me</GenericButton>);
    expect(genericButton.find(BaseButton)).toHaveLength(1);
  });

  it("renders visually hidden tooltip", () => {
    const tooltip = "Extra info";
    const genericButton = mount(
      <GenericButton classNameTooltip={classNameTooltip} tooltip={tooltip}>
        Click me
      </GenericButton>
    );

    const tooltipElement = genericButton.find(`.${classNameTooltip}`);

    expect(tooltipElement.text()).toMatch(tooltip);
    expect(tooltipElement.getDOMNode().getAttribute("aria-hidden")).toEqual("false");
    expect(tooltipElement.getDOMNode().getAttribute("data-tooltip-visible")).toEqual("false");
  });

  it("renders tooltip on mouse over and hides on mouse out", () => {
    jest.useFakeTimers();
    const genericButton = mount(
      <GenericButton classNameTooltip={classNameTooltip} tooltip="Extra info" >
        Click me
      </GenericButton>
    );

    expect(genericButton.find(`.${classNameTooltip}`).prop("data-tooltip-visible")).toEqual(false);

    genericButton.simulate("mouseOver");

    act(() => {
      jest.advanceTimersByTime(600);
    });

    genericButton.update();

    expect(genericButton.find(`.${classNameTooltip}`).prop("data-tooltip-visible")).toEqual(true);

    genericButton.simulate("mouseOut");
    expect(genericButton.find(`.${classNameTooltip}`).prop("data-tooltip-visible")).toEqual(false);
  });

  it("renders tooltip on focus and hides on blur", () => {
    const genericButton = mount(
      <GenericButton classNameTooltip={classNameTooltip} tooltip="Extra info" >
        Click me
      </GenericButton>
    );

    expect(genericButton.find(`.${classNameTooltip}`).prop("data-tooltip-visible")).toEqual(false);

    genericButton.simulate("focus");
    expect(genericButton.find(`.${classNameTooltip}`).prop("data-tooltip-visible")).toEqual(true);

    genericButton.simulate("blur");
    expect(genericButton.find(`.${classNameTooltip}`).prop("data-tooltip-visible")).toEqual(false);
  });

  it("hides tooltip on click", () => {
    const genericButton = mount(
      <GenericButton classNameTooltip={classNameTooltip} tooltip="Extra info" >
        Click me
      </GenericButton>
    );

    expect(genericButton.find(`.${classNameTooltip}`).prop("data-tooltip-visible")).toEqual(false);
    genericButton.simulate("focus");
    expect(genericButton.find(`.${classNameTooltip}`).prop("data-tooltip-visible")).toEqual(true);

    genericButton.simulate("click");

    expect(genericButton.find(`.${classNameTooltip}`).prop("data-tooltip-visible")).toEqual(false);
  });

  it("sets button node when innerRef is using React.createRef", () => {
    const buttonRef = createRef();
    const genericButton = mount(<GenericButton innerRef={buttonRef}>Click me</GenericButton>);

    expect(buttonRef.current).toEqual(genericButton.instance().buttonNode);
  });

  it("sets button node when innerRef is function", () => {
    const buttonRef = jest.fn();
    const genericButton = mount(<GenericButton innerRef={buttonRef}>Click me</GenericButton>);

    expect(buttonRef).toHaveBeenCalledWith(genericButton.instance().buttonNode);
  });

  it("focuses button on long press", () => {
    jest.useFakeTimers("modern");

    const buttonRef = createRef();
    const genericButton = mount(
      <GenericButton innerRef={buttonRef}>
        Click me
      </GenericButton>,
      { attachTo: document.rootContainer }
    );

    genericButton.find(BaseButton).simulate("touchStart");
    jest.runOnlyPendingTimers();
    expect(document.activeElement).toEqual(buttonRef.current);

    jest.useRealTimers();
  });

  it("calls prop handlers", () => {
    const event = {};
    const onBlur = jest.fn();
    const onClick = jest.fn();
    const onContextMenu = jest.fn();
    const onFocus = jest.fn();
    const onLongPress = jest.fn();
    const onMouseOut = jest.fn();
    const onMouseOver = jest.fn();

    const genericButton = shallow(
      <GenericButton
        onBlur={onBlur}
        onClick={onClick}
        onContextMenu={onContextMenu}
        onFocus={onFocus}
        onLongPress={onLongPress}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
      >
        Click me
      </GenericButton>
    );

    genericButton.simulate("blur", event);
    expect(onBlur).toHaveBeenCalledWith(event);

    genericButton.simulate("click", event);
    expect(onClick).toHaveBeenCalledWith(event);

    genericButton.simulate("contextMenu", event);
    expect(onContextMenu).toHaveBeenCalledWith(event);

    genericButton.simulate("focus", event);
    expect(onFocus).toHaveBeenCalledWith(event);

    genericButton.simulate("longPress");
    expect(onLongPress).toHaveBeenCalled();

    genericButton.simulate("mouseOut", event);
    expect(onMouseOut).toHaveBeenCalledWith(event);

    genericButton.simulate("mouseOver", event);
    expect(onMouseOver).toHaveBeenCalledWith(event);
  });

  it("doesn't prevent default context menu on desktop when button is an anchor with tooltip", () => {
    const createEvent = jest.spyOn(document, "createEvent").mockImplementation(() => {
      throw Error("Desktop");
    });
    const event = { preventDefault: jest.fn() };
    const onContextMenu = jest.fn();

    const genericButton = shallow(
      <GenericButton href="#" tooltip="Extra info" onContextMenu={onContextMenu} >
        Click me
      </GenericButton>
    );

    genericButton.simulate("contextMenu", event);
    expect(onContextMenu).toHaveBeenCalledWith(event);
    expect(event.preventDefault).not.toHaveBeenCalled();

    createEvent.mockRestore();
  });

  it("prevents default context menu on mobile when button is an anchor with tooltip", () => {
    const createEvent = jest.spyOn(document, "createEvent").mockImplementation(() => undefined);
    const event = { preventDefault: jest.fn() };
    const onContextMenu = jest.fn();

    const genericButton = shallow(
      <GenericButton href="#" tooltip="Extra info" onContextMenu={onContextMenu} >
        Click me
      </GenericButton>
    );

    genericButton.simulate("contextMenu", event);
    expect(onContextMenu).toHaveBeenCalledWith(event);
    expect(event.preventDefault).toHaveBeenCalled();

    createEvent.mockRestore();
  });

  it("does url normalization", () => {
    const href = "http://abcüö.com/üö";
    const normalizedHref = "http://xn--abc-una3a.com/%C3%BC%C3%B6";

    const normalLink = mount(<GenericButton href={href}>x</GenericButton>);
    expect(normalLink.find("a").first().props().href).toEqual(href);

    const normalizedLink = mount(<GenericButton href={href} normalizeHref={true}>x</GenericButton>);
    expect(normalizedLink.find("a").first().props().href).toEqual(normalizedHref);
  });
});
