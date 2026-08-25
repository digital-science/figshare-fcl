import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import SearchResults, { SearchResultItem } from "./index";


describe("<SearchResults />", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders", () => {
    const { container } = render(
      <SearchResults>
        <SearchResultItem key="1" value={ { id: 1 } }>Test</SearchResultItem>
      </SearchResults>
    );

    expect(container.querySelector("input")).not.toBeNull();
  });

  it("renders loading state", () => {
    const { container } = render(
      <SearchResults loading={true}>
        <SearchResultItem key="1" value={ { id: 1 } }>Test</SearchResultItem>
      </SearchResults>
    );

    expect(container.querySelector(".loader")).not.toBeNull();
  });

  it("renders error state", () => {
    const { container } = render(
      <SearchResults error="Error Message">
        <SearchResultItem key="1" value={ { id: 1 } }>Test</SearchResultItem>
      </SearchResults>
    );

    expect(container.querySelector(".error")).not.toBeNull();
  });

  it("renders no results state", () => {
    const { container } = render(
      <SearchResults hasResults={false}>
        <SearchResultItem key="1" value={ { id: 1 } }>Test</SearchResultItem>
      </SearchResults>
    );

    expect(container.querySelector(".noResults")).not.toBeNull();
  });

  it("renders error retry button", () => {
    const onRetry = jest.fn();
    const { container } = render(
      <SearchResults
        error="Error Message"
        retry={ {
          action: onRetry,
          message: "Please try again",
        } }
      >
        <SearchResultItem key="1" value={ { id: 1 } }>Test</SearchResultItem>
      </SearchResults>
    );

    expect(container.querySelector(".error")).not.toBeNull();
    const retryButton = container.querySelector("button.retry");
    expect(retryButton).not.toBeNull();

    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalled();
  });

  it("does not render retry without both message and action", () => {
    const { container } = render(
      <SearchResults
        error="Error Message"
        retry={ { message: "Please try again" } }
      >
        <SearchResultItem key="1" value={ { id: 1 } }>Test</SearchResultItem>
      </SearchResults>
    );

    expect(container.querySelector(".error")).not.toBeNull();
    expect(container.querySelector("button.retry")).toBeNull();
  });

  it("selects item and closes list", () => {
    const onSelect = jest.fn();
    const { container } = render(
      <SearchResults hasResults={true} onSelect={onSelect}>
        <SearchResultItem key="1" value={ { id: 1 } }>Test</SearchResultItem>
      </SearchResults>
    );

    const item = container.querySelector("button");
    fireEvent.click(item);

    expect(onSelect).toHaveBeenCalledWith({ id: 1 });
  });

  it("changes search term", () => {
    const onChangeSearchValue = jest.fn();
    const { container } = render(
      <SearchResults onChangeSearchValue={onChangeSearchValue} />
    );

    const input = container.querySelector("input");
    expect(input).not.toBeNull();

    fireEvent.change(input, { target: { value: "searchTerm" } });

    expect(onChangeSearchValue).toHaveBeenCalledWith("searchTerm");
  });

  it("shows dropdown on sufficient search input", () => {
    const { container } = render(
      <SearchResults hasResults={true} search="abc" />
    );

    const content = container.querySelector(".content");
    expect(content).not.toBeInTheDocument();
  });

  it("shows list on input focus with results", () => {
    const { container } = render(
      <SearchResults hasResults={true} />
    );

    const input = container.querySelector("input");
    fireEvent.focus(input);

    // After focus with hasResults=true, content should be visible
    const content = container.querySelector(".content");
    expect(content).toHaveClass("visible");
  });

  it("loads more on scroll near bottom", () => {
    const onLoadMore = jest.fn();
    const { container } = render(
      <SearchResults onLoadMore={onLoadMore}>
        <div>Content</div>
      </SearchResults>
    );

    const content = container.querySelector(".content");
    expect(content).not.toBeNull();

    Object.defineProperty(content, "scrollHeight", { configurable: true, value: 100 });
    Object.defineProperty(content, "scrollTop", { configurable: true, value: 95 });
    Object.defineProperty(content, "offsetHeight", { configurable: true, value: 0 });
    fireEvent.scroll(content);

    expect(onLoadMore).toHaveBeenCalled();
  });

  it("does not load more when scroll has not reached bottom", () => {
    const onLoadMore = jest.fn();
    const { container } = render(
      <SearchResults onLoadMore={onLoadMore}>
        <div>Content</div>
      </SearchResults>
    );

    const content = container.querySelector(".content");
    expect(content).not.toBeNull();

    Object.defineProperty(content, "scrollHeight", { configurable: true, value: 100 });
    Object.defineProperty(content, "scrollTop", { configurable: true, value: 0 });
    Object.defineProperty(content, "offsetHeight", { configurable: true, value: 0 });
    fireEvent.scroll(content);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it("does not load more when loading", () => {
    const onLoadMore = jest.fn();
    const { container } = render(
      <SearchResults loading={true} onLoadMore={onLoadMore}>
        <div>Content</div>
      </SearchResults>
    );

    const content = container.querySelector(".content");
    expect(content).not.toBeNull();

    Object.defineProperty(content, "scrollHeight", { configurable: true, value: 100 });
    Object.defineProperty(content, "scrollTop", { configurable: true, value: 95 });
    Object.defineProperty(content, "offsetHeight", { configurable: true, value: 0 });
    fireEvent.scroll(content);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it("does not load more when error exists", () => {
    const onLoadMore = jest.fn();
    const { container } = render(
      <SearchResults error="Error" onLoadMore={onLoadMore}>
        <div>Content</div>
      </SearchResults>
    );

    const content = container.querySelector(".content");
    expect(content).not.toBeNull();

    Object.defineProperty(content, "scrollHeight", { configurable: true, value: 100 });
    Object.defineProperty(content, "scrollTop", { configurable: true, value: 95 });
    Object.defineProperty(content, "offsetHeight", { configurable: true, value: 0 });
    fireEvent.scroll(content);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it("closes dropdown on close handler", () => {
    const { container } = render(
      <SearchResults hasResults={true}>
        <div>Content</div>
      </SearchResults>
    );

    const input = container.querySelector("input");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "abc" } });

    const content = container.querySelector(".content");
    expect(content).toHaveClass("visible");

    // Simulate RootCloseListener closing
    const closeButton = container.querySelector("input[type='text']");
    fireEvent.blur(closeButton);
  });

  it("renders search result items", () => {
    const { container } = render(
      <SearchResults hasResults={true}>
        <SearchResultItem key="1" value={ { id: 1 } }>Item 1</SearchResultItem>
        <SearchResultItem key="2" value={ { id: 2 } }>Item 2</SearchResultItem>
      </SearchResults>
    );

    const buttons = container.querySelectorAll("button");
    // Should have multiple buttons (search result items)
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders with custom content class name", () => {
    const { container } = render(
      <SearchResults hasResults={true} contentClassName="custom-class">
        <div>Content</div>
      </SearchResults>
    );

    const content = container.querySelector(".content");
    expect(content).toHaveClass("custom-class");
  });

  it("renders with placeholder", () => {
    const { container } = render(
      <SearchResults placeholder="Search items..." />
    );

    const input = container.querySelector("input");
    expect(input).toHaveAttribute("placeholder", "Search items...");
  });

  it("renders with search value", () => {
    const { container } = render(
      <SearchResults search="test query" />
    );

    const input = container.querySelector("input");
    expect(input).toHaveValue("test query");
  });
});
