/* eslint-disable max-len */
import React from "react";
import { render, cleanup, screen } from "@testing-library/react";

import { Text } from "./Text";


describe("<Text />", () => {
  function setup() {
    const scope = { props: { children: "Hello world" } };

    scope.run = () => {
      scope.wrapper = render(<Text {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders children", () => {
    const scope = setup();
    scope.run();

    expect(screen.getByText("Hello world")).toBeInTheDocument();

    teardown();
  });

  it("renders as a span by default", () => {
    const scope = setup();
    scope.run();

    expect(screen.getByText("Hello world").tagName).toBe("SPAN");

    teardown();
  });

  it("renders as the provided tag", () => {
    const scope = setup();
    scope.props.tag = "p";
    scope.run();

    expect(screen.getByText("Hello world").tagName).toBe("P");

    teardown();
  });

  it("always applies the typography base class", () => {
    const scope = setup();
    scope.run();

    expect(screen.getByText("Hello world")).toHaveClass("typography");

    teardown();
  });

  it("applies the kind class — defaults to body", () => {
    const scope = setup();
    scope.run();

    expect(screen.getByText("Hello world")).toHaveClass("body");

    teardown();
  });

  it("applies the provided kind class", () => {
    const scope = setup();
    scope.props.kind = "title-1";
    scope.run();

    expect(screen.getByText("Hello world")).toHaveClass("title-1");

    teardown();
  });

  it("applies the weight class when weight is provided", () => {
    const scope = setup();
    scope.props.weight = "bold";
    scope.run();

    expect(screen.getByText("Hello world")).toHaveClass("weight-bold");

    teardown();
  });

  it("does not apply a weight class when weight is not provided", () => {
    const scope = setup();
    scope.run();

    const el = screen.getByText("Hello world");
    expect(el.className).not.toMatch(/weight-/);

    teardown();
  });

  it("applies the color class when color is provided", () => {
    const scope = setup();
    scope.props.color = "primary";
    scope.run();

    expect(screen.getByText("Hello world")).toHaveClass("color-primary");

    teardown();
  });

  it("does not apply a color class when color is not provided", () => {
    const scope = setup();
    scope.run();

    const el = screen.getByText("Hello world");
    expect(el.className).not.toMatch(/color-/);

    teardown();
  });

  it("applies the wrap class when wrap is provided", () => {
    const scope = setup();
    scope.props.wrap = "ellipsis";
    scope.run();

    expect(screen.getByText("Hello world")).toHaveClass("wrap-ellipsis");

    teardown();
  });

  it("does not apply a wrap class when wrap is not provided", () => {
    const scope = setup();
    scope.run();

    const el = screen.getByText("Hello world");
    expect(el.className).not.toMatch(/wrap-/);

    teardown();
  });

  it("applies the text-align class when align is provided", () => {
    const scope = setup();
    scope.props.align = "center";
    scope.run();

    expect(screen.getByText("Hello world")).toHaveClass("text-align-center");

    teardown();
  });

  it("does not apply a text-align class when align is not provided", () => {
    const scope = setup();
    scope.run();

    const el = screen.getByText("Hello world");
    expect(el.className).not.toMatch(/text-align-/);

    teardown();
  });

  it("merges the provided className with the base classes", () => {
    const scope = setup();
    scope.props.className = "my-custom-class";
    scope.run();

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass("typography", "my-custom-class");

    teardown();
  });

  it("passes additional props to the underlying element", () => {
    const scope = setup();
    scope.props["data-testid"] = "text-el";
    scope.props["aria-label"] = "greeting";
    scope.run();

    expect(screen.getByTestId("text-el")).toHaveAttribute("aria-label", "greeting");

    teardown();
  });

  it("forwards ref to the underlying DOM element", () => {
    const ref = React.createRef();
    render(<Text ref={ref}>Ref text</Text>);

    expect(ref.current).not.toBeNull();
    expect(ref.current.tagName).toBe("SPAN");

    cleanup();
  });

  it("does not set a dir attribute when inferDirection is false (default)", () => {
    const scope = setup();
    scope.run();

    expect(screen.getByText("Hello world")).not.toHaveAttribute("dir");

    teardown();
  });

  it("sets dir=ltr when inferDirection is true and children is English text", () => {
    const scope = setup();
    scope.props.inferDirection = true;
    scope.props.children = "Hello world";
    scope.run();

    expect(screen.getByText("Hello world")).toHaveAttribute("dir", "ltr");

    teardown();
  });

  it("sets dir=rtl when inferDirection is true and children is Arabic text", () => {
    const scope = setup();
    scope.props.inferDirection = true;
    scope.props.children = "\u0645\u0631\u062D\u0628\u0627"; // مرحبا
    scope.run();

    expect(screen.getByText("\u0645\u0631\u062D\u0628\u0627")).toHaveAttribute("dir", "rtl");

    teardown();
  });

  it("does not set dir when inferDirection is true but children is not a string", () => {
    const scope = setup();
    scope.props.inferDirection = true;
    scope.props.children = <span data-testid="child-node">content</span>;
    scope.run();

    const wrapper = scope.wrapper.container.firstChild;
    expect(wrapper).not.toHaveAttribute("dir");

    teardown();
  });
});
