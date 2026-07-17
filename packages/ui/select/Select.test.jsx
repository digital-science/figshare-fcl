import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";

import SelectWithRef, { Select, Option } from "./Select";


const wait = () => new Promise((resolve) => setTimeout(resolve));

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {
      /* noop */
    }
  };
});

describe("<Select />", () => {
  function teardown() {
    cleanup();
  }

  it("renders with forwardedRef", async() => {
    const ref = jest.fn();
    render(<SelectWithRef ref={ref} />);
    await act(wait);
    expect(ref).toHaveBeenCalled();
    teardown();
  });

  it("renders the trigger button with placeholder", async() => {
    const { container } = render(<Select placeholder="Pick one" />);
    await act(wait);
    const btn = container.querySelector("[data-id='select-trigger-btn']");
    expect(btn).toBeInTheDocument();
    expect(btn.textContent).toContain("Pick one");
    teardown();
  });

  it("renders options that are always in the DOM", async() => {
    const { container } = render(
      <Select>
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
      </Select>
    );
    await act(wait);
    expect(container.querySelector("span + span")).toBeInTheDocument();
    teardown();
  });

  it("calls onChange with the selected value on option click", async() => {
    const onChange = jest.fn();
    const { container } = render(
      <Select onChange={onChange}>
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
      </Select>
    );
    await act(wait);

    const optionBtns = container.querySelectorAll("button.option");
    fireEvent.click(optionBtns[0]);
    await act(wait);
    expect(onChange).toHaveBeenCalledWith("1");
    teardown();
  });

  it("calls onToggle when dropdown opens and closes", async() => {
    const onToggle = jest.fn();
    const { container } = render(<Select onToggle={onToggle} />);
    await act(wait);

    const btn = container.querySelector("[data-id='select-trigger-btn']");
    fireEvent.click(btn);
    await act(wait);
    expect(onToggle).toHaveBeenCalledWith(true);

    fireEvent.click(btn);
    await act(wait);
    expect(onToggle).toHaveBeenCalledWith(false);
    teardown();
  });

  it("shows loading state", async() => {
    const { container } = render(<Select loading={true} />);
    await act(wait);

    fireEvent.click(container.querySelector("[data-id='select-trigger-btn']"));
    await act(wait);
    expect(container.querySelector(".loading")).toBeInTheDocument();
    teardown();
  });

  it("shows error message", async() => {
    const { container } = render(
      <Select loadingErrorMessage="Something went wrong">
        <Option value="1">Option 1</Option>
      </Select>
    );
    await act(wait);

    fireEvent.click(container.querySelector("[data-id='select-trigger-btn']"));
    await act(wait);
    expect(container.querySelector(".error")).toBeInTheDocument();
    expect(container.querySelector(".error").textContent).toContain("Something went wrong");
    teardown();
  });

  it("renders search input when searchable", async() => {
    const { container } = render(
      <Select searchable={true}>
        <Option value="1">Option 1</Option>
      </Select>
    );
    await act(wait);
    expect(container.querySelector("input[type='text']")).toBeInTheDocument();
    teardown();
  });

  it("shows selected value in trigger for single select", async() => {
    const { container } = render(
      <Select value="1">
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
      </Select>
    );
    await act(wait);
    const btn = container.querySelector("[data-id='select-trigger-btn']");
    expect(btn.textContent).toContain("Option 1");
    teardown();
  });

  it("shows multiple selected values joined in trigger", async() => {
    const { container } = render(
      <Select multiple={true} value={["1", "2"]}>
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
      </Select>
    );
    await act(wait);
    const btn = container.querySelector("[data-id='select-trigger-btn']");
    expect(btn.textContent).toContain("Option 1");
    expect(btn.textContent).toContain("Option 2");
    teardown();
  });
});
