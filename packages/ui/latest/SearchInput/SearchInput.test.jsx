import React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react-hooks";

import { SearchInput, useUniqueId, asPacketOrEventLikeObject } from "./SearchInput";


describe("SearchInput", () => {
  function setup(overrides = {}) {
    const user = userEvent.setup();
    const scope = {
      user,
      props: {
        onChange: jest.fn(),
        onSubmit: jest.fn(),
        ...overrides,
      },
    };

    scope.run = () => {
      scope.wrapper = render(<SearchInput {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("should render without crashing", async() => {
    const scope = setup();
    scope.run();

    await waitFor(() => {
      expect(screen.getByRole("search")).toBeInTheDocument();
    });

    teardown();
  });

  it("should always render the submit button", () => {
    const scope = setup();
    scope.run();

    expect(scope.wrapper.container.querySelector("[data-part=\"search-input-submit-button\"]")).toBeInTheDocument();

    teardown();
  });

  it("should not show the clear button when value is empty", () => {
    const scope = setup();
    scope.run();

    expect(scope.wrapper.container.querySelector("[data-part=\"search-input-clear-button\"]")).not.toBeInTheDocument();

    teardown();
  });

  it("should show the clear button when input has a value", async() => {
    const scope = setup();
    scope.run();

    await scope.user.type(screen.getByRole("textbox"), "hello");

    await waitFor(() => {
      expect(scope.wrapper.container.querySelector("[data-part=\"search-input-clear-button\"]")).toBeInTheDocument();
    });

    teardown();
  });

  it("should call onChange when input value changes", async() => {
    const scope = setup();
    scope.run();

    await scope.user.type(screen.getByRole("textbox"), "a");

    expect(scope.props.onChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: "a", name: expect.any(String) })
    );

    teardown();
  });

  it("should call onSubmit when submit button is clicked", async() => {
    const scope = setup();
    scope.run();

    await scope.user.type(screen.getByRole("textbox"), "query");
    await scope.user.click(scope.wrapper.container.querySelector("[data-part=\"search-input-submit-button\"]"));

    expect(scope.props.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ value: "query" })
    );

    teardown();
  });

  it("should call onSubmit when Enter key is pressed in the input", async() => {
    const scope = setup();
    scope.run();

    await scope.user.type(screen.getByRole("textbox"), "query");
    await scope.user.keyboard("{Enter}");

    expect(scope.props.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ value: "query" })
    );

    teardown();
  });

  it("should not call onSubmit for non-Enter keys", async() => {
    const scope = setup();
    scope.run();

    await scope.user.type(screen.getByRole("textbox"), "a");
    scope.props.onSubmit.mockClear();

    await scope.user.keyboard("{Shift}");

    expect(scope.props.onSubmit).not.toHaveBeenCalled();

    teardown();
  });

  it("should clear the input and call onChange and onSubmit when clear button is clicked", async() => {
    const scope = setup();
    scope.run();

    await scope.user.type(screen.getByRole("textbox"), "hello");

    await scope.user.click(scope.wrapper.container.querySelector("[data-part=\"search-input-clear-button\"]"));

    expect(scope.props.onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: "" })
    );
    expect(scope.props.onSubmit).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: "" })
    );

    await waitFor(() => {
      expect(scope.wrapper.container.querySelector("[data-part=\"search-input-clear-button\"]")).not.toBeInTheDocument();
    });

    teardown();
  });

  it("should use the provided id for the input", async() => {
    const scope = setup({ id: "my-search-id" });
    scope.run();

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "my-search-id");
    });

    teardown();
  });

  it("should use defaultValue when rendered as uncontrolled", async() => {
    const scope = setup({ defaultValue: "initial text" });
    scope.run();

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toHaveValue("initial text");
    });

    teardown();
  });

  it("should display provided value in controlled mode", async() => {
    const scope = setup({ value: "controlled value", setValue: jest.fn() });
    scope.run();

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toHaveValue("controlled value");
    });

    teardown();
  });

  it("should call the rest onKeyDown prop when a key is pressed", async() => {
    const onKeyDown = jest.fn();
    const scope = setup({ onKeyDown });
    scope.run();

    await scope.user.type(screen.getByRole("textbox"), "a");

    expect(onKeyDown).toHaveBeenCalled();

    teardown();
  });

  it("should set data-clearable to false when input is empty", () => {
    const scope = setup();
    scope.run();

    const searchContainer = scope.wrapper.container.querySelector("[role=\"search\"]");
    expect(searchContainer).toHaveAttribute("data-clearable", "false");

    teardown();
  });

  it("should set data-clearable to true when input has a value", async() => {
    const scope = setup();
    scope.run();

    const searchContainer = scope.wrapper.container.querySelector("[role=\"search\"]");

    await scope.user.type(screen.getByRole("textbox"), "x");

    await waitFor(() => {
      expect(searchContainer).toHaveAttribute("data-clearable", "true");
    });

    teardown();
  });

  it("should not throw when onChange and onSubmit are not provided", async() => {
    const scope = setup({ onChange: undefined, onSubmit: undefined });
    scope.run();

    await scope.user.type(screen.getByRole("textbox"), "hello");
    await scope.user.keyboard("{Enter}");
    await scope.user.click(scope.wrapper.container.querySelector("[data-part=\"search-input-submit-button\"]"));

    // No error thrown
    expect(scope.wrapper.container.querySelector("[data-part=\"search-input-clear-button\"]")).toBeInTheDocument();

    teardown();
  });

  it("should pass through extra props to the container div", () => {
    const scope = setup({ "data-testid": "my-search" });
    scope.run();

    expect(scope.wrapper.container.querySelector("[data-testid=\"my-search\"]")).toBeInTheDocument();

    teardown();
  });
});


describe("asPacketOrEventLikeObject", () => {
  it("returns an object with value, name, and target fields", () => {
    const result = asPacketOrEventLikeObject("hello", "myField");

    expect(result.value).toBe("hello");
    expect(result.name).toBe("myField");
    expect(result.target.value).toBe("hello");
    expect(result.target.name).toBe("myField");
  });

  it("provides a no-op preventDefault that returns true", () => {
    const result = asPacketOrEventLikeObject("v", "n");

    expect(result.preventDefault()).toBe(true);
  });

  it("provides a no-op stopPropagation that returns true", () => {
    const result = asPacketOrEventLikeObject("v", "n");

    expect(result.stopPropagation()).toBe(true);
  });
});


describe("useUniqueId", () => {
  it("returns a consistent id across re-renders", () => {
    const { result, rerender } = renderHook(() => useUniqueId());
    const id1 = result.current;

    rerender();

    expect(result.current).toBe(id1);
  });

  it("uses the provided prefix in the generated id", () => {
    const { result } = renderHook(() => useUniqueId("test-prefix"));

    expect(result.current).toMatch(/^test-prefix-/);
  });

  it("generates a unique id for each hook instance", () => {
    const { result: result1 } = renderHook(() => useUniqueId());
    const { result: result2 } = renderHook(() => useUniqueId());

    expect(result1.current).not.toBe(result2.current);
  });

  it("defaults the prefix to search-input", () => {
    const { result } = renderHook(() => useUniqueId());

    expect(result.current).toMatch(/^search-input-/);
  });
});
