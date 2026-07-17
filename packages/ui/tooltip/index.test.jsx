import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";

import { UncontrolledTooltip, Content, Trigger } from "./index.jsx";


const DISPLAY_DELAY = 700;
const HIDE_DELAY = 500;

describe("<UncontrolledTooltip />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers(); jest.useRealTimers();
  });
  function teardown() {
    cleanup();
  }

  it("renders trigger", () => {
    const { container } = render(
      <UncontrolledTooltip>
        {() => (
          <div>
            <Trigger>{({ ...props }) => <div {...props} id="trigger" />}</Trigger>
          </div>
        )}
      </UncontrolledTooltip>
    );
    expect(container.querySelector("#trigger")).toBeInTheDocument();
    teardown();
  });

  it("shows content after display delay on mouseover", () => {
    const { container } = render(
      <UncontrolledTooltip>
        {() => (
          <div>
            <Trigger>{({ ...props }) => <div {...props} id="trigger" />}</Trigger>
            <Content renderInPortal={false}>{() => <div id="content" />}</Content>
          </div>
        )}
      </UncontrolledTooltip>
    );

    expect(container.querySelector("#content")).not.toBeInTheDocument();
    fireEvent.mouseOver(container.querySelector("#trigger"));
    act(() => {
      jest.advanceTimersByTime(DISPLAY_DELAY);
    });
    expect(container.querySelector("#content")).toBeInTheDocument();
    teardown();
  });

  it("hides content after hide delay on mouseout", () => {
    const { container } = render(
      <UncontrolledTooltip>
        {() => (
          <div>
            <Trigger>{({ ...props }) => <div {...props} id="trigger" />}</Trigger>
            <Content renderInPortal={false}>{() => <div id="content" />}</Content>
          </div>
        )}
      </UncontrolledTooltip>
    );

    fireEvent.mouseOver(container.querySelector("#trigger"));
    act(() => {
      jest.advanceTimersByTime(DISPLAY_DELAY);
    });
    expect(container.querySelector("#content")).toBeInTheDocument();

    fireEvent.mouseOut(container.querySelector("#trigger"));
    act(() => {
      jest.advanceTimersByTime(HIDE_DELAY);
    });
    expect(container.querySelector("#content")).not.toBeInTheDocument();
    teardown();
  });
});
