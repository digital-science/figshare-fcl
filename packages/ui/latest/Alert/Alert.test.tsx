import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Alert from "./Alert";
import { TestScope } from "../../../../types/testing";


describe("Alert", () => {
  function setup(props = {}) {
    const scope: TestScope = {
      props: {
        type: "warning",
        message: "Test message",
        ...props,
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

  it("sets data-padded based on padded prop independently of persistent prop", () => {
    const scope = setup({ padded: true, persistent: false });
    scope.run();

    const alert = scope.wrapper.container.querySelector("[role='alert']");
    expect(alert).toHaveAttribute("data-padded", "true");

    teardown();
  });

  it("respects padded=false regardless of persistent value", () => {
    const scope = setup({ padded: false, persistent: true });
    scope.run();

    const alert = scope.wrapper.container.querySelector("[role='alert']");
    expect(alert).toHaveAttribute("data-padded", "false");

    teardown();
  });

  it("passes current id to onClose callback when close button is clicked", async() => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const scope = setup({ id: "alert-123", persistent: false, onClose });
    scope.run();

    const closeButton = screen.getAllByRole("button")[0];
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ id: "alert-123" }));

    teardown();
  });

  it("passes updated id to onClose callback after id prop changes", async() => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const alertProps = { id: "alert-v1", persistent: false, onClose };
    const scope = setup(alertProps);
    scope.run();

    // Update the id prop
    scope.wrapper.rerender(<Alert {...alertProps} type="notice" id="alert-v2" />);

    const closeButton = screen.getAllByRole("button")[0];
    await user.click(closeButton);

    // Should receive the updated id, not the original
    expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ id: "alert-v2" }));

    teardown();
  });
});
