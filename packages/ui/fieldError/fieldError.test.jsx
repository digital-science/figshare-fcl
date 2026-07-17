import React from "react";
import { render, cleanup } from "@testing-library/react";

import { FieldError } from "./fieldError";


describe("<FieldError />", () => {
  function setup() {
    const scope = { props: { error: null } };
    scope.run = () => {
      scope.wrapper = render(<FieldError {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders a field error if provided", () => {
    const scope = setup();
    scope.props.error = { id: "error-1", at: "blur", message: "message" };
    scope.props.field = "my-field";
    scope.run();

    const el = scope.wrapper.container.firstChild;
    expect(el).toHaveAttribute("data-error", "true");
    expect(el).toHaveAttribute("data-error-at", "blur");
    expect(el).toHaveAttribute("data-error-for", "my-field");
    expect(el).toHaveAttribute("data-error-id", "error-1");

    teardown();
  });

  it("renders an empty field error message if none is provided (prevents focus steal issues with rerendering)", () => {
    const scope = setup();
    scope.run();

    const el = scope.wrapper.container.firstChild;
    expect(el).toHaveAttribute("data-error", "false");
    expect(el).toHaveAttribute("data-error-at", "none");
    expect(el).toHaveAttribute("data-error-for", "unknown");
    expect(el).not.toHaveAttribute("data-error-id");

    teardown();
  });

  it("supports full width", () => {
    const scope = setup();
    scope.props.error = { id: "error-1", at: "blur", message: "message" };
    scope.props.field = "my-field";
    scope.props.fullWidth = true;
    scope.run();

    expect(scope.wrapper.container.firstChild).toHaveClass("fullWidth");

    teardown();
  });

  it("supports a couple of sizes", () => {
    const { container: defaultContainer } = render(<FieldError error={null} />);
    expect(defaultContainer.firstChild).toHaveClass("small");
    cleanup();

    const { container: smallContainer } = render(<FieldError error={null} size="small" />);
    expect(smallContainer.firstChild).toHaveClass("small");
    cleanup();

    const { container: largeContainer } = render(<FieldError error={null} size="large" />);
    expect(largeContainer.firstChild).toHaveClass("large");
    cleanup();
  });
});
