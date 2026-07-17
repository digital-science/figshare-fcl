import React, { createRef } from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GenericButton from "./index";


const classNameTooltip = "tooltipClass";

describe("<GenericButton />", () => {
  function setup({ mobile = false } = {}) {
    const user = userEvent.setup();
    const scope = {
      user,
      props: { children: "Click me" },
      createEventSpy: jest.spyOn(document, "createEvent").mockImplementation((type) => {
        if (type === "TouchEvent") {
          if (mobile) {
            return undefined;
          }
          throw Error("Desktop");
        }

        return Document.prototype.createEvent.call(document, type);
      }),
    };

    scope.run = () => {
      scope.wrapper = render(<GenericButton {...scope.props} />);
    };

    return scope;
  }

  function teardown(scope) {
    scope.createEventSpy?.mockRestore();
    cleanup();
  }

  it("renders <BaseButton />", () => {
    const scope = setup();
    scope.run();

    expect(scope.wrapper.getByRole("button")).toBeInTheDocument();

    teardown(scope);
  });

  it("renders visually hidden tooltip", () => {
    const scope = setup();
    scope.props.classNameTooltip = classNameTooltip;
    scope.props.tooltip = "Extra info";
    scope.run();

    const tooltip = scope.wrapper.container.querySelector(`.${classNameTooltip}`);
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent("Extra info");
    expect(tooltip).toHaveAttribute("aria-hidden", "false");
    expect(tooltip).toHaveAttribute("data-tooltip-visible", "false");

    teardown(scope);
  });

  it("renders tooltip on mouse over and hides on mouse out", () => {
    jest.useFakeTimers("modern");
    const scope = setup();
    scope.props.classNameTooltip = classNameTooltip;
    scope.props.tooltip = "Extra info";
    scope.run();

    const btn = scope.wrapper.getByRole("button");
    const tooltipInitial = scope.wrapper.container.querySelector(`.${classNameTooltip}`);
    expect(tooltipInitial).toHaveAttribute("data-tooltip-visible", "false");

    fireEvent.mouseOver(btn);
    act(() => {
      jest.advanceTimersByTime(600);
    });

    // showTooltip increments popperKey, remounting the span — re-query after advance
    const tooltip = scope.wrapper.container.querySelector(`.${classNameTooltip}`);
    expect(tooltip).toHaveAttribute("data-tooltip-visible", "true");

    fireEvent.mouseOut(btn);
    expect(tooltip).toHaveAttribute("data-tooltip-visible", "false");

    jest.useRealTimers();
    teardown(scope);
  });

  it("renders tooltip on focus and hides on blur", () => {
    jest.useFakeTimers("modern");
    const scope = setup();
    scope.props.classNameTooltip = classNameTooltip;
    scope.props.tooltip = "Extra info";
    scope.run();

    const btn = scope.wrapper.getByRole("button");
    // init observer → isVisible=true
    act(() => {
      jest.advanceTimersByTime(100);
    });

    const tooltipInitial = scope.wrapper.container.querySelector(`.${classNameTooltip}`);
    expect(tooltipInitial).toHaveAttribute("data-tooltip-visible", "false");

    // sets activeElement and fires focus event
    act(() => {
      btn.focus();
    });
    // onFocus 100ms timeout fires → showTooltip
    act(() => {
      jest.advanceTimersByTime(200);
    });
    // showTooltip increments popperKey, remounting the span — re-query after advance
    const tooltip = scope.wrapper.container.querySelector(`.${classNameTooltip}`);
    expect(tooltip).toHaveAttribute("data-tooltip-visible", "true");

    fireEvent.blur(btn);
    expect(tooltip).toHaveAttribute("data-tooltip-visible", "false");

    jest.useRealTimers();
    teardown(scope);
  });

  it("hides tooltip on click", () => {
    jest.useFakeTimers("modern");
    const scope = setup();
    scope.props.classNameTooltip = classNameTooltip;
    scope.props.tooltip = "Extra info";
    scope.run();

    const btn = scope.wrapper.getByRole("button");
    // init observer → isVisible=true
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // sets activeElement and fires focus event
    act(() => {
      btn.focus();
    });
    // onFocus timeout → showTooltip
    act(() => {
      jest.advanceTimersByTime(200);
    });
    const tooltip = scope.wrapper.container.querySelector(`.${classNameTooltip}`);
    expect(tooltip).toHaveAttribute("data-tooltip-visible", "true");

    fireEvent.click(btn);
    expect(tooltip).toHaveAttribute("data-tooltip-visible", "false");

    jest.useRealTimers();
    teardown(scope);
  });

  it("sets button node when innerRef is using React.createRef", () => {
    const scope = setup();
    const buttonRef = createRef();
    scope.props.innerRef = buttonRef;
    scope.run();

    expect(buttonRef.current).toBeInstanceOf(HTMLElement);

    teardown(scope);
  });

  it("sets button node when innerRef is function", () => {
    const scope = setup();
    const buttonRef = jest.fn();
    scope.props.innerRef = buttonRef;
    scope.run();

    expect(buttonRef).toHaveBeenCalledWith(expect.any(HTMLElement));

    teardown(scope);
  });

  it("focuses button on long press", () => {
    jest.useFakeTimers("modern");
    const scope = setup({ mobile: true });
    const buttonRef = createRef();
    scope.props.innerRef = buttonRef;
    scope.run();

    fireEvent.touchStart(scope.wrapper.getByRole("button"));
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(document.activeElement).toEqual(buttonRef.current);

    jest.useRealTimers();
    teardown(scope);
  });

  it("calls prop handlers", () => {
    jest.useFakeTimers("modern");
    const scope = setup();
    scope.props.onBlur = jest.fn();
    scope.props.onClick = jest.fn();
    scope.props.onContextMenu = jest.fn();
    scope.props.onFocus = jest.fn();
    scope.props.onMouseOut = jest.fn();
    scope.props.onMouseOver = jest.fn();
    scope.run();

    const btn = scope.wrapper.getByRole("button");

    fireEvent.blur(btn);
    expect(scope.props.onBlur).toHaveBeenCalled();

    fireEvent.click(btn);
    expect(scope.props.onClick).toHaveBeenCalled();

    fireEvent.contextMenu(btn);
    expect(scope.props.onContextMenu).toHaveBeenCalled();

    fireEvent.focus(btn);
    expect(scope.props.onFocus).toHaveBeenCalled();

    fireEvent.mouseOut(btn);
    expect(scope.props.onMouseOut).toHaveBeenCalled();

    fireEvent.mouseOver(btn);
    expect(scope.props.onMouseOver).toHaveBeenCalled();

    jest.useRealTimers();
    teardown(scope);
  });

  it("doesn't prevent default context menu on desktop when button is an anchor with tooltip", () => {
    const createEventSpy = jest.spyOn(document, "createEvent").mockImplementation((type) => {
      if (type === "TouchEvent") {
        throw Error("Desktop");
      }

      return Document.prototype.createEvent.call(document, type);
    });
    const onContextMenu = jest.fn();
    const { getByRole } = render(
      <GenericButton href="#" tooltip="Extra info" onContextMenu={onContextMenu}>Click me</GenericButton>
    );

    const event = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    fireEvent(getByRole("link"), event);
    expect(onContextMenu).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);

    createEventSpy.mockRestore();
    cleanup();
  });

  it("prevents default context menu on mobile when button is an anchor with tooltip", () => {
    const createEventSpy = jest.spyOn(document, "createEvent").mockImplementation((type) => {
      if (type === "TouchEvent") {
        return undefined;
      }

      return Document.prototype.createEvent.call(document, type);
    });
    const onContextMenu = jest.fn();
    const { getByRole } = render(
      <GenericButton href="#" tooltip="Extra info" onContextMenu={onContextMenu}>Click me</GenericButton>
    );

    const event = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    fireEvent(getByRole("link"), event);
    expect(onContextMenu).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);

    createEventSpy.mockRestore();
    cleanup();
  });

  it("does url normalization", () => {
    const href = "http://abcüö.com/üö";
    const normalizedHref = "http://xn--abc-una3a.com/%C3%BC%C3%B6";

    const { getByRole: getLink, unmount } = render(<GenericButton href={href}>x</GenericButton>);
    expect(getLink("link")).toHaveAttribute("href", href);
    unmount();

    const { getByRole: getNormalized } = render(<GenericButton href={href} normalizeHref={true}>x</GenericButton>);
    expect(getNormalized("link")).toHaveAttribute("href", normalizedHref);

    cleanup();
  });
});
