import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";

import Context from "../context";
import { UncontrolledDropdown } from "../../dropdown";

import { Content } from "./Content";


const wait = () => new Promise((resolve) => setTimeout(resolve));

function renderContent(contextValues, props = {}) {
  return render(
    <UncontrolledDropdown>
      {() => (
        <Context.Provider value={ { triggerRef: { querySelector: jest.fn() }, ...contextValues } }>
          <Content {...props} />
        </Context.Provider>
      )}
    </UncontrolledDropdown>
  );
}

describe("<Select.Content />", () => {
  function teardown() {
    cleanup();
  }

  it("does not render search input when searchable is false", async() => {
    const { container } = renderContent({ searchable: false, searchPlaceholder: "Search..." });
    await act(wait);
    expect(container.querySelector("input")).not.toBeInTheDocument();
    teardown();
  });

  it("renders search input when searchable is true", async() => {
    const { container } = renderContent({ searchable: true, searchPlaceholder: "Search..." });
    await act(wait);
    expect(container.querySelector("input")).toBeInTheDocument();
    teardown();
  });

  it("calls context onSearch when search input changes", async() => {
    const onSearch = jest.fn();
    const { container } = renderContent({ searchable: true, searchPlaceholder: "Search...", onSearch });
    await act(wait);

    fireEvent.change(container.querySelector("input"), { target: { value: "test" } });
    expect(onSearch).toHaveBeenCalledWith("test");
    teardown();
  });

  it("focuses trigger on Escape key in search input", async() => {
    const focus = jest.fn();
    const triggerRef = {
      querySelector: jest.fn(() => {
        return { focus };
      }),
    };
    const { container } = renderContent({
      searchable: true,
      searchPlaceholder: "Search...",
      triggerRef,
      onSearch: jest.fn(),
    });
    await act(wait);

    fireEvent.keyDown(container.querySelector("input"), { key: "Escape" });
    expect(triggerRef.querySelector).toHaveBeenCalledWith("[data-id=\"select-trigger-btn\"]");
    expect(focus).toHaveBeenCalled();
    teardown();
  });

  it("does not call onLoadMore when error is true", async() => {
    const onLoadMore = jest.fn();
    const { container } = renderContent({ searchable: false }, { error: true, onLoadMore });
    await act(wait);

    fireEvent.scroll(container.querySelector(".content"));
    expect(onLoadMore).not.toHaveBeenCalled();
    teardown();
  });

  it("does not call onLoadMore when loading is true", async() => {
    const onLoadMore = jest.fn();
    const { container } = renderContent({ searchable: false }, { loading: true, onLoadMore });
    await act(wait);

    fireEvent.scroll(container.querySelector(".content"));
    expect(onLoadMore).not.toHaveBeenCalled();
    teardown();
  });

  it("calls onLoadMore when scrolled to bottom without error or loading", async() => {
    const onLoadMore = jest.fn();
    const { container } = renderContent({ searchable: false }, { onLoadMore });
    await act(wait);

    fireEvent.scroll(container.querySelector(".content"));
    expect(onLoadMore).toHaveBeenCalled();
    teardown();
  });
});
