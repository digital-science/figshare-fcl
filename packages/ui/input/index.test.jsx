import React from "react";
import { render, cleanup } from "@testing-library/react";

import Input from "./index";


describe("<Input />", () => {
  function teardown() {
    cleanup();
  }

  it("renders null if type is not valid", () => {
    const { container } = render(<Input type="foobar" />);
    expect(container.firstChild).toBeNull();
    teardown();
  });

  it("renders Checkbox component", () => {
    const { container } = render(<Input type="checkbox" />);
    expect(container.querySelector("input[type='checkbox']")).toBeInTheDocument();
    teardown();
  });

  it("renders Date component", () => {
    const { container } = render(<Input type="date" />);
    expect(container.querySelector("input")).toBeInTheDocument();
    teardown();
  });

  it("renders Password component", () => {
    const { container } = render(<Input type="password" />);
    expect(container.querySelector("input[type='password']")).toBeInTheDocument();
    teardown();
  });

  it("renders Text component", () => {
    const { container } = render(<Input type="text" />);
    expect(container.querySelector("input[type='text']")).toBeInTheDocument();
    teardown();
  });
});
