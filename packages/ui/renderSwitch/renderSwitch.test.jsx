import React from "react";
import { render, cleanup } from "@testing-library/react";

import { RenderSwitch, Case } from "./index";


describe("<RenderSwitch />", () => {
  function teardown() {
    cleanup();
  }

  it("renders only the case that matches the value provided", () => {
    render(
      <RenderSwitch value={2}>
        <Case value={1}><span id="first-case-content">First Case</span></Case>
        <Case value={2}><span id="second-case-content">Second Case</span></Case>
      </RenderSwitch>
    );

    expect(document.getElementById("second-case-content")).toBeInTheDocument();
    expect(document.getElementById("first-case-content")).not.toBeInTheDocument();

    teardown();
  });

  it("Case accepts a function as a child and will call it with its own and the current context values", () => {
    const renderer = jest.fn(() => <span id="content">content</span>);

    render(
      <RenderSwitch value={true}>
        <Case value={true}>{renderer}</Case>
        <Case value={false}>{renderer}</Case>
      </RenderSwitch>
    );

    expect(document.getElementById("content")).toBeInTheDocument();
    expect(renderer).toHaveBeenCalledWith({ value: true, contextValue: true });

    teardown();
  });

  it("Case accepts a rule function by which to check its own value against the context value", () => {
    const rule = jest.fn((number, term) => number - term === 0);

    render(
      <RenderSwitch value={5}>
        <Case rule={rule} value={3}><span id="first-content">first content</span></Case>
        <Case rule={rule} value={5}><span id="second-content">second content</span></Case>
      </RenderSwitch>
    );

    expect(document.getElementById("second-content")).toBeInTheDocument();
    expect(rule).toHaveBeenCalledWith(5, 5);

    teardown();
  });
});
