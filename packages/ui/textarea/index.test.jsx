import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Textarea from "./index";


describe("<Textarea />", () => {
  function setup() {
    const scope = { props: { onChange: jest.fn() } };
    scope.run = () => {
      scope.wrapper = render(<Textarea {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders correctly", () => {
    const scope = setup();
    scope.run();

    expect(scope.wrapper.container.firstChild.tagName).toBe("TEXTAREA");
    expect(scope.wrapper.container.firstChild).toHaveClass("textarea");

    teardown();
  });

  it("renders with error", () => {
    const scope = setup();
    scope.run();

    const el = scope.wrapper.container.firstChild;
    expect(el).not.toHaveAttribute("aria-invalid");

    scope.wrapper.rerender(<Textarea error={true} onChange={scope.props.onChange} />);
    expect(el).toHaveAttribute("aria-invalid", "true");

    scope.wrapper.rerender(<Textarea error={false} onChange={scope.props.onChange} />);
    expect(el).not.toHaveAttribute("aria-invalid");

    teardown();
  });

  it("renders as disabled", () => {
    const scope = setup();
    scope.run();

    const el = scope.wrapper.container.firstChild;
    expect(el).not.toHaveAttribute("aria-disabled");

    scope.wrapper.rerender(<Textarea disabled={true} onChange={scope.props.onChange} />);
    expect(el).toHaveAttribute("aria-disabled", "true");

    scope.wrapper.rerender(<Textarea disabled={false} onChange={scope.props.onChange} />);
    expect(el).not.toHaveAttribute("aria-disabled");

    teardown();
  });

  it("renders with themes", () => {
    const scope = setup();
    scope.run();

    const el = scope.wrapper.container.firstChild;
    expect(el).not.toHaveClass("underlineTheme");
    expect(el).toHaveClass("defaultTheme");

    scope.wrapper.rerender(<Textarea theme="underline" onChange={scope.props.onChange} />);
    expect(el).toHaveClass("underlineTheme");
    expect(el).not.toHaveClass("defaultTheme");

    teardown();
  });

  it("triggers onChange correctly", () => {
    const scope = setup();
    scope.run();

    const el = scope.wrapper.container.firstChild;
    fireEvent.change(el, { target: { value: "test" } });
    expect(scope.props.onChange).toHaveBeenCalled();

    scope.wrapper.rerender(<Textarea disabled={true} onChange={scope.props.onChange} />);
    const callCount = scope.props.onChange.mock.calls.length;
    fireEvent.change(el, { target: { value: "test" } });
    expect(scope.props.onChange.mock.calls).toHaveLength(callCount);

    teardown();
  });
});
