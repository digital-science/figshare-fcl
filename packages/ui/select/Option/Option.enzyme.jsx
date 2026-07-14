import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import Context from "../context";
import { Option, Select } from "../index";

import { debounce } from "./utils";


const wait = () => new Promise((resolve) => setTimeout(resolve));
const DEFAULT_DEBOUNCE = 200;

describe("<Option />", () => {
  it("renders with search", async() => {
    const select = mount(
      <Select searchable={true}>
        <Option value="1">Option 1</Option>
      </Select>
    );

    const input = select.find("input");
    expect(input).toHaveLength(1);

    input.simulate("change", { target: { value: "Option 2" } });
    await act(wait);
    let option = select.find(Option);
    expect(option.text()).toEqual("");

    input.simulate("change", { target: { value: "Option 1" } });
    await act(wait);
    option = select.find(Option);
    expect(option.text()).toEqual("Option 1Option 11");
  });

  it("should call focus on triggerRef when Escape key is pressed", () => {
    const mockStoreOption = jest.fn();
    const focus = { focus: jest.fn() };
    const mockTriggerRef = { querySelector: jest.fn(() => focus) };

    const contextValue = {
      triggerRef: mockTriggerRef,
      storeOption: mockStoreOption,
    };

    const wrapper = mount(
      <Context.Provider value={contextValue}>
        <Option value="example" />
      </Context.Provider>
    );

    const mockEvent = { key: "Escape" };

    wrapper.find("Button").props().onKeyDown(mockEvent);

    const expectedSelector = "[data-id=\"select-trigger-btn\"]";

    expect(mockStoreOption).toHaveBeenCalled();
    expect(mockTriggerRef.querySelector).toHaveBeenCalledWith(expectedSelector);
    const focusedElement = mockTriggerRef.querySelector(expectedSelector);
    expect(focusedElement.focus).toHaveBeenCalled();
  });

  it("should not render checkmark when isMultiSelect is false", () => {
    const contextValue = {
      multiple: false,
      value: ["example"],
      storeOption: jest.fn(),
    };

    const wrapper = mount(
      <Context.Provider value={contextValue}>
        <Option value="example" />
      </Context.Provider>
    );

    const checkmark = wrapper.find("Checkmark");
    expect(checkmark).toHaveLength(0);
  });

  it("should call onSelect with correct value and children when clicked", () => {
    const mockStoreOption = jest.fn();
    const mockOnSelect = jest.fn();

    const contextValue = {
      storeOption: mockStoreOption,
      onSelect: mockOnSelect,
    };

    const wrapper = mount(
      <Context.Provider value={contextValue}>
        <Option value="example">Example Option</Option>
      </Context.Provider>
    );

    wrapper.find("Button").simulate("click");

    expect(mockOnSelect).toHaveBeenCalledWith("example", "Example Option");
  });

  it("should set selected to true if value is in allValues array", () => {
    const contextValue = {
      multiple: true,
      value: ["example"],
      storeOption: jest.fn(),
    };

    const wrapper = mount(
      <Context.Provider value={contextValue}>
        <Option value="example" />
      </Context.Provider>
    );

    const button = wrapper.find("Button");
    expect(button.hasClass("selected")).toBe(true);
  });

  it("should set selected to false if value is not in allValues array", () => {
    const contextValue = {
      multiple: true,
      value: ["anotherExample"],
      storeOption: jest.fn(),
    };

    const wrapper = mount(
      <Context.Provider value={contextValue}>
        <Option value="example" />
      </Context.Provider>
    );

    const button = wrapper.find("Button");
    expect(button.hasClass("selected")).toBe(false);
  });

  it("should call storeOption with correct value and children on mount", () => {
    const mockStoreOption = jest.fn();

    const contextValue = { storeOption: mockStoreOption };

    mount(
      <Context.Provider value={contextValue}>
        <Option value="example">Example Option</Option>
      </Context.Provider>
    );

    expect(mockStoreOption).toHaveBeenCalledWith("example", "Example Option");
  });

  it("should call storeOption with updated value and children on update", () => {
    const mockStoreOption = jest.fn();

    const contextValue = { storeOption: mockStoreOption };

    const wrapper = mount(
      <Context.Provider value={contextValue}>
        <Option value="example">Example Option</Option>
      </Context.Provider>
    );

    wrapper.setProps({ children: <Option value="newExample">New Example Option</Option> });

    expect(mockStoreOption).toHaveBeenCalledWith("newExample", "New Example Option");
  });
});

describe("debounce func", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });


  it("should debounce asynchronous function calls", async() => {
    const asyncMockFunction = jest.fn(() => Promise.resolve());
    const debouncedAsyncFunction = debounce(asyncMockFunction, DEFAULT_DEBOUNCE);

    debouncedAsyncFunction();
    debouncedAsyncFunction();
    debouncedAsyncFunction();

    expect(asyncMockFunction).not.toHaveBeenCalled();

    await Promise.resolve();
    jest.runAllTimers();

    expect(asyncMockFunction).toHaveBeenCalledTimes(1);
  });

  it("should debounce function calls", () => {
    jest.useFakeTimers();

    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, DEFAULT_DEBOUNCE);

    debouncedFunction("A");
    debouncedFunction("B");
    debouncedFunction("C");

    expect(mockFunction).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith("C");

    jest.useRealTimers();
  });

  it("should debounce function calls with immediate set to true", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, DEFAULT_DEBOUNCE, true);

    debouncedFunction("A");
    debouncedFunction("B");
    debouncedFunction("C");

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith("A");

    jest.runAllTimers();

    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
