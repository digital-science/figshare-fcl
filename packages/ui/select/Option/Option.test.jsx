import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Context from "../context";
import { Option } from "../index";

import { debounce } from "./utils";


describe("<Option />", () => {
  function teardown() {
    cleanup();
  }

  it("calls storeOption with value and children on mount", () => {
    const storeOption = jest.fn();
    render(
      <Context.Provider value={ { storeOption } }>
        <Option value="example">Example Option</Option>
      </Context.Provider>
    );
    expect(storeOption).toHaveBeenCalledWith("example", "Example Option");
    teardown();
  });

  it("calls onSelect with value and children on click", () => {
    const onSelect = jest.fn();
    const storeOption = jest.fn();
    const { container } = render(
      <Context.Provider value={ { storeOption, onSelect } }>
        <Option value="example">Example Option</Option>
      </Context.Provider>
    );
    fireEvent.click(container.querySelector("button"));
    expect(onSelect).toHaveBeenCalledWith("example", "Example Option");
    teardown();
  });

  it("sets selected class when value matches context value in multiple mode", () => {
    const { container } = render(
      <Context.Provider value={ { multiple: true, value: ["example"], storeOption: jest.fn() } }>
        <Option value="example" />
      </Context.Provider>
    );
    expect(container.querySelector("button")).toHaveClass("selected");
    teardown();
  });

  it("does not set selected class when value is not in context value in multiple mode", () => {
    const { container } = render(
      <Context.Provider value={ { multiple: true, value: ["other"], storeOption: jest.fn() } }>
        <Option value="example" />
      </Context.Provider>
    );
    expect(container.querySelector("button")).not.toHaveClass("selected");
    teardown();
  });

  it("does not render checkmark when not in multi-select mode", () => {
    const { container } = render(
      <Context.Provider value={ { multiple: false, value: ["example"], storeOption: jest.fn() } }>
        <Option value="example" />
      </Context.Provider>
    );
    expect(container.querySelector("svg")).not.toBeInTheDocument();
    teardown();
  });

  it("focuses trigger on Escape key press", () => {
    const focus = jest.fn();
    const triggerRef = {
      querySelector: jest.fn(() => {
        return { focus };
      }),
    };
    const { container } = render(
      <Context.Provider value={ { triggerRef, storeOption: jest.fn() } }>
        <Option value="example" />
      </Context.Provider>
    );
    fireEvent.keyDown(container.querySelector("button"), { key: "Escape" });
    expect(triggerRef.querySelector).toHaveBeenCalledWith("[data-id=\"select-trigger-btn\"]");
    expect(focus).toHaveBeenCalled();
    teardown();
  });
});

describe("debounce", () => {
  const DEFAULT_DEBOUNCE = 200;

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers(); jest.useRealTimers();
  });

  it("debounces function calls and fires last call", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, DEFAULT_DEBOUNCE);
    debounced("A");
    debounced("B");
    debounced("C");
    expect(fn).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("C");
  });

  it("fires immediately when immediate=true", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, DEFAULT_DEBOUNCE, true);
    debounced("A");
    debounced("B");
    debounced("C");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("A");
    jest.runAllTimers();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("debounces async function calls", async() => {
    const asyncFn = jest.fn(() => Promise.resolve());
    const debounced = debounce(asyncFn, DEFAULT_DEBOUNCE);
    debounced();
    debounced();
    debounced();
    expect(asyncFn).not.toHaveBeenCalled();
    await Promise.resolve();
    jest.runAllTimers();
    expect(asyncFn).toHaveBeenCalledTimes(1);
  });
});
