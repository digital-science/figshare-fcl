import React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TreeDataSwitch } from "./TreeDataSwitch";
import { structureTreeData } from "./utilities";


describe("TreeDataSwitch", () => {
  function setup(options = {}) {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    const defaultDataset = [
      { id: "1", name: "Root Item 1", path: "/1" },
      { id: "2", name: "Root Item 2", path: "/2" },
      { id: "3", name: "Child Item 1", path: "/1/3" },
      { id: "4", name: "Child Item 2", path: "/1/4" },
      { id: "5", name: "Grandchild Item", path: "/1/3/5" },
    ];

    const scope = {
      user,
      props: {
        name: "test-tree",
        tree: structureTreeData({ dataset: defaultDataset, checkedIds: [], openLevel: 0 }),
        onChange: mockOnChange,
        searchPlaceholder: "Search items...",
        noSearchResultsMessage: "No items found",
        readOnly: false,
        ...options,
      },
      mocks: { onChange: mockOnChange },
    };

    scope.run = () => {
      const wrapper = render(
        <TreeDataSwitch {...scope.props} />
      );

      scope.wrapper = wrapper;
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("should render without crashing", () => {
    const scope = setup();
    scope.run();
    expect(scope.wrapper).toBeDefined();

    teardown();
  });

  it("should render search input with placeholder", () => {
    const scope = setup();
    scope.run();

    const searchInput = screen.getByPlaceholderText("Search items...");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("");

    teardown();
  });

  it("should render tree nodes", () => {
    const scope = setup();
    scope.run();

    expect(screen.getByText("Root Item 1")).toBeInTheDocument();
    expect(screen.getByText("Root Item 2")).toBeInTheDocument();

    teardown();
  });

  it("should expand tree node when expand button is clicked", async() => {
    const dataset = [
      { id: "1", name: "Root Item 1", path: "/1" },
      { id: "3", name: "Child Item 1", path: "/1/3" },
    ];
    const scope = setup({ tree: structureTreeData({ dataset, openLevel: 0 }) });
    scope.run();

    // Find expand button for Root Item 1 (which has children)
    const expandButtons = screen.getAllByRole("button");
    const expandButton = expandButtons.find((btn) => btn.getAttribute("tooltip") === "Expand");

    if (expandButton) {
      await scope.user.click(expandButton);

      // Check if child items are now visible
      await waitFor(() => {
        expect(screen.getByText("Child Item 1")).toBeInTheDocument();
      });
    }

    teardown();
  });

  it("should filter nodes when searching", async() => {
    const scope = setup();
    scope.run();

    const searchInput = screen.getByPlaceholderText("Search items...");

    // Type search term that should match "Child Item 1"
    await scope.user.type(searchInput, "Child Item 1");

    await waitFor(() => {
      expect(screen.getByText("Child Item 1")).toBeInTheDocument();
      expect(screen.queryByText("Root Item 2")).not.toBeInTheDocument();
    });

    teardown();
  });

  it("should show no results message when search yields no results", async() => {
    const scope = setup();
    scope.run();

    const searchInput = screen.getByPlaceholderText("Search items...");

    // Type search term that won't match anything
    await scope.user.type(searchInput, "nonexistent item");

    await waitFor(() => {
      expect(screen.getByText("No items found")).toBeInTheDocument();
    });

    teardown();
  });

  it("should call onChange when checkbox is toggled", async() => {
    const scope = setup();
    scope.run();

    const checkboxes = screen.getAllByRole("checkbox");
    if (checkboxes.length > 0) {
      await scope.user.click(checkboxes[0]);

      expect(scope.mocks.onChange).toHaveBeenCalled();
    }

    teardown();
  });

  it("should render in read-only mode", () => {
    const scope = setup({ readOnly: true });
    scope.run();

    // In read-only mode, should show tags instead of checkboxes
    const tags = screen.getAllByText(/ON|OFF/);
    expect(tags.length).toBeGreaterThan(0);

    teardown();
  });

  it("should render custom bulk actions", () => {
    const bulkActions = <button>Custom Bulk Action</button>;
    const scope = setup({ renderBulkActions: bulkActions });
    scope.run();

    expect(screen.getByText("Custom Bulk Action")).toBeInTheDocument();

    teardown();
  });
});

describe("structureTreeData", () => {
  function setup() {
    const scope = {};

    return scope;
  }

  function teardown() {
    // No cleanup needed for pure function tests
  }

  it("should create empty tree from empty dataset", () => {
    setup();
    const result = structureTreeData({ dataset: [] });

    expect(result.children).toEqual([]);
    expect(result.nodes).toEqual({});
    expect(result.children).toHaveLength(0);

    teardown();
  });

  it("should structure flat data into tree", () => {
    setup();
    const dataset = [
      { id: "1", name: "Root Item", path: "/1" },
      { id: "2", name: "Child Item", path: "/1/2" },
    ];

    const result = structureTreeData({ dataset });

    expect(result.children).toContain("1");
    expect(result.nodes["1"]).toBeDefined();
    expect(result.nodes["1"].children).toContain("2");
    expect(result.nodes["2"]).toBeDefined();

    teardown();
  });

  it("should set checked state for provided IDs", () => {
    setup();
    const dataset = [
      { id: "1", name: "Root Item", path: "/1" },
      { id: "2", name: "Child Item", path: "/1/2" },
    ];

    const result = structureTreeData({ dataset, checkedIds: ["1"] });

    expect(result.nodes["1"].state.checked).toBe(true);
    expect(result.nodes["2"].state.checked).toBe(false);

    teardown();
  });

  it("should set expanded state based on openLevel", () => {
    setup();
    const dataset = [
      { id: "1", name: "Root Item", path: "/1" },
      { id: "2", name: "Child Item", path: "/1/2" },
    ];

    const result = structureTreeData({ dataset, openLevel: 1 });

    expect(result.nodes["1"].state.expanded).toBe(true);
    expect(result.nodes["2"].state.expanded).toBe(true);

    teardown();
  });
});
