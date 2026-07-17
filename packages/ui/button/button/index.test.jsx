import React from "react";
import { render, cleanup } from "@testing-library/react";

import Button from "./index";


describe("<Button />", () => {
  function setup() {
    const scope = { props: { children: "Click me" } };
    scope.run = () => {
      scope.wrapper = render(<Button {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders <GenericButton />", () => {
    const scope = setup();
    scope.props.tooltip = "Extra info";
    scope.run();

    expect(scope.wrapper.getByRole("button")).toBeInTheDocument();
    expect(scope.wrapper.container.querySelector("[data-tooltip-visible]")).toBeInTheDocument();

    teardown();
  });

  it("renders Icon when passed", () => {
    const scope = setup();
    scope.props.Icon = jest.fn(() => <svg data-testid="icon" />);
    scope.run();

    expect(scope.wrapper.getByTestId("icon")).toBeInTheDocument();

    teardown();
  });
});
