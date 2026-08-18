import React, { useEffect } from "react";
import { render, cleanup, screen, act } from "@testing-library/react";

import { useLimitedList, LimitedListShowMoreControls } from "./useLimitedList";


describe("useLimitedList()", () => {
  const hookRef = { current: undefined };

  function Fixture({ list, itemsPerPage, entriesLabel }) {
    const result = useLimitedList(list, itemsPerPage, entriesLabel);

    useEffect(() => {
      hookRef.current = result;
    });

    return null;
  }

  function setup({ list = [], itemsPerPage = 10, entriesLabel = "entries" } = {}) {
    const scope = { list, itemsPerPage, entriesLabel };

    scope.run = () => {
      scope.wrapper = render(
        <Fixture list={scope.list} itemsPerPage={scope.itemsPerPage} entriesLabel={scope.entriesLabel} />
      );
    };

    return scope;
  }

  function teardown() {
    hookRef.current = undefined;
    cleanup();
  }

  it("returns safe empty defaults for an empty list", () => {
    const scope = setup({ list: [] });
    scope.run();

    expect(hookRef.current.limitedList).toEqual([]);
    expect(hookRef.current.remainingList).toEqual([]);
    expect(hookRef.current.remainingCount).toBe(0);
    expect(hookRef.current.canShowMore).toBe(false);
    expect(hookRef.current.canShowLess).toBe(false);

    teardown();
  });

  it("returns the full list when it fits within one page", () => {
    const scope = setup({ list: [1, 2, 3] });
    scope.run();

    expect(hookRef.current.limitedList).toEqual([1, 2, 3]);
    expect(hookRef.current.remainingList).toEqual([]);
    expect(hookRef.current.remainingCount).toBe(0);
    expect(hookRef.current.canShowMore).toBe(false);

    teardown();
  });

  it("limits the list to itemsPerPage items and exposes the remainder", () => {
    const scope = setup({ list: [1, 2, 3, 4, 5], itemsPerPage: 3 });
    scope.run();

    expect(hookRef.current.limitedList).toEqual([1, 2, 3]);
    expect(hookRef.current.remainingList).toEqual([4, 5]);
    expect(hookRef.current.remainingCount).toBe(2);
    expect(hookRef.current.canShowMore).toBe(true);

    teardown();
  });

  it("expands the list by one page when onShowMore is called", () => {
    const scope = setup({ list: [1, 2, 3, 4, 5], itemsPerPage: 3 });
    scope.run();

    expect(hookRef.current.limitedList).toHaveLength(3);

    act(() => {
      hookRef.current.onShowMore();
    });

    expect(hookRef.current.limitedList).toHaveLength(5);
    expect(hookRef.current.canShowMore).toBe(false);

    teardown();
  });

  it("resets to page 1 when the list identity changes", () => {
    const scope = setup({ list: [1, 2, 3, 4, 5], itemsPerPage: 3 });
    scope.run();

    act(() => {
      hookRef.current.onShowMore();
    });

    expect(hookRef.current.limitedList).toHaveLength(5);

    const newList = [10, 20, 30, 40, 50];
    scope.wrapper.rerender(<Fixture list={newList} itemsPerPage={3} />);

    expect(hookRef.current.limitedList).toEqual([10, 20, 30]);

    teardown();
  });

  it("passes through the provided entriesLabel", () => {
    const scope = setup({ list: [1, 2], entriesLabel: "grants" });
    scope.run();

    expect(hookRef.current.entriesLabel).toBe("grants");

    teardown();
  });

  it("defaults entriesLabel to \"entries\" when not provided", () => {
    const scope = setup({ list: [1, 2] });
    scope.run();

    expect(hookRef.current.entriesLabel).toBe("entries");

    teardown();
  });
});


describe("LimitedListShowMoreControls", () => {
  function setup() {
    const scope = {
      props: {
        canShowMore: false,
        canShowLess: false,
        remainingCount: 0,
        onShowMore: jest.fn(),
        onShowLess: jest.fn(),
        entriesLabel: "items",
      },
    };

    scope.run = () => {
      scope.wrapper = render(<LimitedListShowMoreControls {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders nothing when canShowMore and canShowLess are both false", () => {
    const scope = setup();
    scope.run();

    expect(scope.wrapper.container).toBeEmptyDOMElement();

    teardown();
  });

  it("renders a Show more button with the correct aria-label when canShowMore is true", () => {
    const scope = setup();
    scope.props.canShowMore = true;
    scope.props.remainingCount = 5;
    scope.run();

    const button = screen.getByRole("button", { name: /show more items/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Show more items (5 remaining)");

    teardown();
  });

  it("renders a Show less button with the correct aria-label when canShowLess is true", () => {
    const scope = setup();
    scope.props.canShowLess = true;
    scope.run();

    const button = screen.getByRole("button", { name: /show less items/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Show less items");

    teardown();
  });

  it("calls onShowMore when the Show more button is clicked", () => {
    const scope = setup();
    scope.props.canShowMore = true;
    scope.props.remainingCount = 3;
    scope.run();

    screen.getByRole("button", { name: /show more/i }).click();

    expect(scope.props.onShowMore).toHaveBeenCalledTimes(1);

    teardown();
  });

  it("calls onShowLess when the Show less button is clicked", () => {
    const scope = setup();
    scope.props.canShowLess = true;
    scope.run();

    screen.getByRole("button", { name: /show less/i }).click();

    expect(scope.props.onShowLess).toHaveBeenCalledTimes(1);

    teardown();
  });

  it("uses the default entriesLabel when not provided", () => {
    const scope = setup();
    scope.props.canShowMore = true;
    scope.props.remainingCount = 2;
    delete scope.props.entriesLabel;
    scope.run();

    expect(screen.getByRole("button", { name: /show more entries/i })).toBeInTheDocument();

    teardown();
  });
});
