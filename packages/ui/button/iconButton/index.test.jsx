import React from "react";
import { render, cleanup, screen } from "@testing-library/react";

import IconButton from "./index";


describe("<IconButton />", () => {
  function setup() {
    const scope = {
      props: {
        Icon: jest.fn(() => <svg data-testid="icon" />),
        children: "Click me",
      },
    };
    scope.run = () => {
      scope.wrapper = render(<IconButton {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("render <GenericButton />", () => {
    const scope = setup();
    scope.run();

    expect(scope.wrapper.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();

    teardown();
  });
});
