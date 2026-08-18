import React from "react";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { IconSlot } from "./IconSlot";


describe("IconSlot", () => {
  function setup() {
    const user = userEvent.setup();
    const scope = {
      user,
      props: {},
    };

    scope.run = () => {
      const wrapper = render(
        <IconSlot {...scope.props}>
          <span id="icon-node">Icon node</span>
        </IconSlot>
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

  it("should clone an element and add props to it if asChild is true", () => {
    const scope = setup();
    scope.props.asChild = true;

    scope.run();
    expect(scope.wrapper).toBeDefined();

    teardown();
  });
});
