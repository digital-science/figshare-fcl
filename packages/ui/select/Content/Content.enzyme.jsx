import React from "react";
import { mount } from "enzyme";

import Context from "../context";
import { Provider } from "../../dropdown/context";

import Content from "./Content";


describe("<Select.Content />", () => {
  it("correctly sets defaultProps", () => {
    const {
      children,
      className,
      error,
      forwardedRef,
      loading,
      placement,
      popperModifiers,
      onLoadMore,
    } = Content.defaultProps;

    expect(children).toEqual(null);
    expect(className).toEqual(undefined);
    expect(error).toEqual(false);
    expect(forwardedRef).toEqual(null);
    expect(loading).toEqual(false);
    expect(placement).toEqual("bottom-start");
    expect(popperModifiers).toEqual([]);
    expect(onLoadMore()).toEqual(undefined);
  });

  it("should call onKeyDown when Escape key is pressed", () => {
    const onSearchMock = jest.fn();
    const onLoadMoreMock = jest.fn();

    const focus = { focus: jest.fn() };
    const contextValues = {
      triggerRef: { querySelector: jest.fn(() => focus) },
      searchable: true,
      searchPlaceholder: "Search...",
      onSearch: onSearchMock,
    };

    const dropDownValue = { menuRef: jest.fn() };

    const wrapper = mount(
      <Provider value={dropDownValue}>
        <Context.Provider value={contextValues}>
          <Content
            error={false}
            loading={false}
            placement="bottom-start"
            popperModifiers={[]}
            onLoadMore={onLoadMoreMock}
          />
        </Context.Provider>
      </Provider>
    );

    const mockEvent = { key: "Escape" };

    wrapper.find(Content).instance().onKeyDown(mockEvent);

    expect(contextValues.triggerRef.querySelector).toHaveBeenCalledWith("[data-id=\"select-trigger-btn\"]");

    expect(contextValues.triggerRef.querySelector().focus).toHaveBeenCalled();
  });

  it("should update state and call context onSearch when onSearch is called", () => {
    const onSearchMock = jest.fn();
    const contextValues = {
      triggerRef: { querySelector: jest.fn() },
      searchable: true,
      searchPlaceholder: "Search...",
      onSearch: onSearchMock,
    };

    const dropDownValue = { menuRef: jest.fn() };

    const wrapper = mount(
      <Provider value={dropDownValue}>
        <Context.Provider value={contextValues}>
          <Content />
        </Context.Provider>
      </Provider>
    );

    const instance = wrapper.find(Content).instance();
    const searchEvent = { target: { value: "test search" } };

    instance.onSearch(searchEvent);

    expect(instance.state.search).toEqual("test search");
    expect(onSearchMock).toHaveBeenCalledWith("test search");
  });

  it("should not call onLoadMore if error is true", () => {
    const onLoadMoreMock = jest.fn();
    const contextValues = {
      triggerRef: { querySelector: jest.fn() },
      searchable: true,
      searchPlaceholder: "Search...",
      onSearch: jest.fn(),
    };

    const dropDownValue = { menuRef: jest.fn() };

    const wrapper = mount(
      <Provider value={dropDownValue}>
        <Context.Provider value={contextValues}>
          <Content
            error={true}
            loading={false}
            placement="bottom-start"
            popperModifiers={[]}
            onLoadMore={onLoadMoreMock}
          />
        </Context.Provider>
      </Provider>
    );

    const instance = wrapper.find(Content).instance();
    const scrollEvent = { target: { scrollTop: 0, scrollHeight: 100, offsetHeight: 100 } };

    instance.onScroll(scrollEvent);

    expect(onLoadMoreMock).not.toHaveBeenCalled();
  });

  it("should not call onLoadMore if loading is true", () => {
    const onLoadMoreMock = jest.fn();
    const contextValues = {
      triggerRef: { querySelector: jest.fn() },
      searchable: true,
      searchPlaceholder: "Search...",
      onSearch: jest.fn(),
    };

    const dropDownValue = { menuRef: jest.fn() };

    const wrapper = mount(
      <Provider value={dropDownValue}>
        <Context.Provider value={contextValues}>
          <Content
            error={false}
            loading={true}
            placement="bottom-start"
            popperModifiers={[]}
            onLoadMore={onLoadMoreMock}
          />
        </Context.Provider>
      </Provider>
    );

    const instance = wrapper.find(Content).instance();
    const scrollEvent = { target: { scrollTop: 0, scrollHeight: 100, offsetHeight: 100 } };

    instance.onScroll(scrollEvent);

    expect(onLoadMoreMock).not.toHaveBeenCalled();
  });

  it("should call onLoadMore if scrolled to bottom and no error or loading", () => {
    const onLoadMoreMock = jest.fn();
    const contextValues = {
      triggerRef: { querySelector: jest.fn() },
      searchable: true,
      searchPlaceholder: "Search...",
      onSearch: jest.fn(),
    };

    const dropDownValue = { menuRef: jest.fn() };

    const wrapper = mount(
      <Provider value={dropDownValue}>
        <Context.Provider value={contextValues}>
          <Content
            error={false}
            loading={false}
            placement="bottom-start"
            popperModifiers={[]}
            onLoadMore={onLoadMoreMock}
          />
        </Context.Provider>
      </Provider>
    );

    const instance = wrapper.find(Content).instance();
    const scrollEvent = { target: { scrollTop: 90, scrollHeight: 100, offsetHeight: 10 } };

    instance.onScroll(scrollEvent);

    expect(onLoadMoreMock).toHaveBeenCalled();
  });

  it("should not render search input if searchable is false", () => {
    const contextValues = {
      triggerRef: { querySelector: jest.fn() },
      searchable: false,
      searchPlaceholder: "Search...",
      onSearch: jest.fn(),
    };

    const dropDownValue = { menuRef: jest.fn() };

    const wrapper = mount(
      <Provider value={dropDownValue}>
        <Context.Provider value={contextValues}>
          <Content />
        </Context.Provider>
      </Provider>
    );

    expect(wrapper.find("SearchInput").exists()).toBe(false);
  });

  it("should render search input if searchable is true", () => {
    const contextValues = {
      triggerRef: { querySelector: jest.fn() },
      searchable: true,
      searchPlaceholder: "Search...",
      onSearch: jest.fn(),
    };

    const dropDownValue = { menuRef: jest.fn() };

    const wrapper = mount(
      <Provider value={dropDownValue}>
        <Context.Provider value={contextValues}>
          <Content />
        </Context.Provider>
      </Provider>
    );

    expect(wrapper.find("SearchInput").exists()).toBe(true);
  });
});
