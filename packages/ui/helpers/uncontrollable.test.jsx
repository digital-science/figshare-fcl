import React, { createRef, forwardRef } from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import uncontrollable from "./uncontrollable";


describe("`uncontrollable` wrapper", () => {
  const Checkbox = forwardRef((props, ref) => <input ref={ref} type="checkbox" {...props} />);

  function teardown() {
    cleanup();
  }

  it("renders the wrapped component", () => {
    const UncontrolledCheckbox = uncontrollable(Checkbox);
    const { container } = render(<UncontrolledCheckbox />);
    expect(container.querySelector("input[type='checkbox']")).toBeInTheDocument();
    teardown();
  });

  it("passes props to wrapped component", () => {
    const UncontrolledCheckbox = uncontrollable(Checkbox);
    const { container } = render(<UncontrolledCheckbox defaultChecked={true} disabled={false} />);
    expect(container.querySelector("input")).not.toBeDisabled();
    teardown();
  });

  it("renders with controlled props and calls prop handler", () => {
    const UncontrolledCheckbox = uncontrollable(Checkbox, { checked: "onClick" });
    const onClick = jest.fn();
    const { container } = render(<UncontrolledCheckbox onClick={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
    container.querySelector("input").click();
    expect(onClick).toHaveBeenCalled();
    teardown();
  });

  it("renders with controlled props and modifier", () => {
    const UncontrolledCheckbox = uncontrollable(Checkbox, { checked: ["onClick", (_, evt) => evt.target.checked] });
    const onClick = jest.fn();
    const { container } = render(<UncontrolledCheckbox onClick={onClick} />);

    fireEvent.click(container.querySelector("input"));
    expect(onClick).toHaveBeenCalled();
    teardown();
  });

  it("renders with default prop and updates on external prop change", () => {
    const UncontrolledCheckbox = uncontrollable(Checkbox, { checked: "onClick" });
    const onClick = jest.fn();
    const { container, rerender } = render(<UncontrolledCheckbox checked={true} onClick={onClick} />);

    expect(container.querySelector("input")).toBeChecked();

    rerender(<UncontrolledCheckbox checked={false} onClick={onClick} />);
    expect(container.querySelector("input")).not.toBeChecked();
    teardown();
  });

  it("forwards ref", () => {
    const UncontrolledCheckbox = uncontrollable(Checkbox);
    const ref = createRef();
    render(<UncontrolledCheckbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    teardown();
  });
});
