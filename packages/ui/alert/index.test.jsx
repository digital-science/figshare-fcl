import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Alert from "./index";


describe("<Alert />", () => {
  function setup() {
    const user = userEvent.setup();
    const scope = {
      user,
      props: {
        variant: "success",
        children: jest.fn(() => <div id="children">text</div>),
      },
    };
    scope.run = () => {
      scope.wrapper = render(<Alert {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders children", () => {
    const scope = setup();
    scope.run();

    expect(document.getElementById("children")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("success");

    teardown();
  });

  it("renders children with close button", async() => {
    const scope = setup();
    scope.props.variant = "error";
    scope.props.role = "alertdialog";
    scope.props.onClose = jest.fn();
    scope.run();

    expect(document.getElementById("children")).toBeInTheDocument();
    expect(screen.getByRole("alertdialog")).toHaveClass("error");

    const closeBtn = screen.getByRole("button", { name: /close/i });
    expect(closeBtn).toBeInTheDocument();

    await scope.user.click(closeBtn);
    expect(scope.props.onClose).toHaveBeenCalled();

    teardown();
  });
});
