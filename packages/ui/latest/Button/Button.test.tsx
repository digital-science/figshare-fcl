
import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";

import Button, { ButtonLabel, ButtonIcon, ButtonInteractiveIcon, ButtonIconGroup, ButtonLoading, nodeIsButtonWithoutLabel } from "./Button";


jest.mock("../Tooltip/Tooltip", () => {
  const MockReact = require("react");

  const TooltipClose = () => <button data-testid="tooltip-close" />;
  const Tooltip = ({ children }) => <>{children}</>;
  Tooltip.Close = TooltipClose;
  const TooltipTrigger = ({ children }) => <>{children}</>;
  const TooltipContent = ({ children, ...props }) => (
    <div data-testid="tooltip-content" {...props}>{children}</div>
  );

  return { Tooltip, TooltipTrigger, TooltipContent };
});

jest.mock("@digital-science/figshare-fcl/icons/react/Loader", () => {
  const MockReact = require("react");

  return () => <svg data-testid="loader-spinner" />;
});


describe("Button", () => {
  function setup() {
    const scope = {
      props: {
        children: "Click me",
        onClick: jest.fn(),
      },
    };

    scope.run = () => {
      scope.wrapper = render(<Button {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders as a button element by default", () => {
    const scope = setup();
    scope.run();

    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn).toHaveAttribute("type", "button");
    expect(btn).toHaveAttribute("data-part", "button");

    teardown();
  });

  it("renders as an anchor element when href is provided", () => {
    const scope = setup();
    scope.props.href = "/some-path";
    scope.run();

    const link = screen.getByRole("button", { name: "Click me" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("role", "button");
    expect(link).toHaveAttribute("data-scope", "link");
    expect(link).toHaveAttribute("href", "/some-path");

    teardown();
  });

  it("applies the provided className alongside the base class", () => {
    const scope = setup();
    scope.props.className = "my-custom-class";
    scope.run();

    expect(screen.getByRole("button")).toHaveClass("button", "my-custom-class");

    teardown();
  });

  it("defaults to kind=primary and em=high", () => {
    const scope = setup();
    scope.run();

    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("data-kind", "primary");
    expect(btn).toHaveAttribute("data-em", "high");

    teardown();
  });

  it("sets data-kind, data-em, data-span, data-justify, data-inline attributes from props", () => {
    const scope = setup();
    scope.props.kind = "secondary";
    scope.props.em = "low";
    scope.props.span = "full";
    scope.props.justify = "between";
    scope.props.inline = "slim";
    scope.run();

    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("data-kind", "secondary");
    expect(btn).toHaveAttribute("data-em", "low");
    expect(btn).toHaveAttribute("data-span", "full");
    expect(btn).toHaveAttribute("data-justify", "between");
    expect(btn).toHaveAttribute("data-inline", "slim");

    teardown();
  });

  it("sets aria-disabled when disabled is true", () => {
    const scope = setup();
    scope.props.disabled = true;
    scope.run();

    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");

    teardown();
  });

  it("calls onClick when the button is clicked and not disabled", () => {
    const scope = setup();
    scope.run();

    fireEvent.click(screen.getByRole("button"));
    expect(scope.props.onClick).toHaveBeenCalledTimes(1);

    teardown();
  });

  it("does not call onClick when the button is disabled", () => {
    const scope = setup();
    scope.props.disabled = true;
    scope.run();

    fireEvent.click(screen.getByRole("button"));
    expect(scope.props.onClick).not.toHaveBeenCalled();

    teardown();
  });

  it("does not throw when onClick is not provided and the button is clicked", () => {
    const scope = setup();
    delete scope.props.onClick;
    scope.run();

    expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();

    teardown();
  });

  it("replaces children with a spinner when loading is true", () => {
    const scope = setup();
    scope.props.loading = true;
    scope.run();

    expect(screen.getByTestId("loader-spinner")).toBeInTheDocument();
    expect(screen.queryByText("Click me")).not.toBeInTheDocument();

    teardown();
  });

  it("renders a custom node as loading content when loading is a React element", () => {
    const scope = setup();
    scope.props.loading = <span data-testid="custom-loader">Loading...</span>;
    scope.run();

    expect(screen.getByTestId("custom-loader")).toBeInTheDocument();
    expect(screen.queryByText("Click me")).not.toBeInTheDocument();

    teardown();
  });

  it("renders children normally when loading is not set", () => {
    const scope = setup();
    scope.run();

    expect(screen.getByText("Click me")).toBeInTheDocument();
    expect(screen.queryByTestId("loader-spinner")).not.toBeInTheDocument();

    teardown();
  });

  it("wraps the button in a Tooltip when the tooltip prop is provided", () => {
    const scope = setup();
    scope.props.tooltip = "Helpful tip";
    scope.run();

    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
    expect(screen.getByText("Helpful tip")).toBeInTheDocument();

    teardown();
  });

  it("renders Tooltip.Close inside the tooltip content when showTooltipClose is true", () => {
    const scope = setup();
    scope.props.tooltip = "Helpful tip";
    scope.props.tooltipOptions = { showTooltipClose: true };
    scope.run();

    expect(screen.getByTestId("tooltip-close")).toBeInTheDocument();

    teardown();
  });

  it("does not render Tooltip.Close when showTooltipClose is false", () => {
    const scope = setup();
    scope.props.tooltip = "Helpful tip";
    scope.props.tooltipOptions = { showTooltipClose: false };
    scope.run();

    expect(screen.queryByTestId("tooltip-close")).not.toBeInTheDocument();

    teardown();
  });

  it("passes tooltipContentProps through to the TooltipContent element", () => {
    const scope = setup();
    scope.props.tooltip = "Helpful tip";
    scope.props.tooltipContentProps = { "data-custom": "yes" };
    scope.run();

    expect(screen.getByTestId("tooltip-content")).toHaveAttribute("data-custom", "yes");

    teardown();
  });

  it("forwards ref to the underlying DOM element", () => {
    const ref = React.createRef();
    render(<Button ref={ref}>With Ref</Button>);

    expect(ref.current).not.toBeNull();
    expect(ref.current.tagName).toBe("BUTTON");

    cleanup();
  });

  it("passes additional props to the underlying element", () => {
    const scope = setup();
    scope.props["data-testid"] = "extra-btn";
    scope.props["aria-label"] = "my button";
    scope.run();

    expect(screen.getByTestId("extra-btn")).toHaveAttribute("aria-label", "my button");

    teardown();
  });
});


describe("ButtonLabel", () => {
  function setup() {
    const scope = { props: { children: "Save" } };

    scope.run = () => {
      scope.wrapper = render(<button><ButtonLabel {...scope.props} /></button>);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders a span with data-part=button-label containing the children", () => {
    const scope = setup();
    scope.run();

    const span = scope.wrapper.container.querySelector("[data-part=\"button-label\"]");
    expect(span).toBeInTheDocument();
    expect(span.textContent).toBe("Save");

    teardown();
  });

  it("sets data-wrap and data-aria-only attributes from props", () => {
    const scope = setup();
    scope.props.wrap = "ellipsis";
    scope.props.hidden = true;
    scope.run();

    const span = scope.wrapper.container.querySelector("[data-part=\"button-label\"]");
    expect(span).toHaveAttribute("data-wrap", "ellipsis");
    expect(span).toHaveAttribute("data-aria-only", "true");

    teardown();
  });

  it("sets aria-label on the parent button when children is a string", () => {
    const scope = setup();
    scope.run();

    const btn = scope.wrapper.container.querySelector("button");
    expect(btn).toHaveAttribute("aria-label", "Save");

    teardown();
  });

  it("does not set aria-label when children is not a string", () => {
    const scope = setup();
    scope.props.children = <span>Save</span>;
    scope.run();

    const btn = scope.wrapper.container.querySelector("button");
    expect(btn).not.toHaveAttribute("aria-label");

    teardown();
  });

  it("does not override an existing aria-label on the parent button", () => {
    const scope = setup();
    scope.run = () => {
      scope.wrapper = render(<button aria-label="existing"><ButtonLabel {...scope.props} /></button>);
    };
    scope.run();

    const btn = scope.wrapper.container.querySelector("button");
    expect(btn).toHaveAttribute("aria-label", "existing");

    teardown();
  });

  it("does not set aria-label when the parent is not a button or anchor", () => {
    const scope = setup();
    scope.run = () => {
      scope.wrapper = render(<div><ButtonLabel {...scope.props} /></div>);
    };
    scope.run();

    const div = scope.wrapper.container.querySelector("div");
    expect(div).not.toHaveAttribute("aria-label");

    teardown();
  });
});


describe("nodeIsButtonWithoutLabel", () => {
  it("returns true for a BUTTON element without aria-label", () => {
    const el = document.createElement("button");
    expect(nodeIsButtonWithoutLabel(el)).toBe(true);
  });

  it("returns true for an A element without aria-label", () => {
    const el = document.createElement("a");
    expect(nodeIsButtonWithoutLabel(el)).toBe(true);
  });

  it("returns false for a BUTTON element that has an aria-label", () => {
    const el = document.createElement("button");
    el.setAttribute("aria-label", "my label");
    expect(nodeIsButtonWithoutLabel(el)).toBe(false);
  });

  it("returns false for a non-button, non-anchor element", () => {
    const el = document.createElement("div");
    expect(nodeIsButtonWithoutLabel(el)).toBe(false);
  });

  it("returns false for null", () => {
    expect(nodeIsButtonWithoutLabel(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(nodeIsButtonWithoutLabel(undefined)).toBe(false);
  });
});


describe("ButtonIcon", () => {
  function setup() {
    const scope = { props: { children: <svg data-testid="test-icon" /> } };

    scope.run = () => {
      scope.wrapper = render(<ButtonIcon {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders a span icon-slot with aria-hidden by default", () => {
    const scope = setup();
    scope.run();

    const slot = scope.wrapper.container.querySelector("[data-part=\"button-icon-slot\"]");
    expect(slot).toBeInTheDocument();
    expect(slot).toHaveAttribute("aria-hidden", "true");

    teardown();
  });

  it("sets data-blend and data-size on the icon slot", () => {
    const scope = setup();
    scope.props.blend = true;
    scope.props.size = "small";
    scope.run();

    const slot = scope.wrapper.container.querySelector("[data-part=\"button-icon-slot\"]");
    expect(slot).toHaveAttribute("data-blend", "true");
    expect(slot).toHaveAttribute("data-size", "small");

    teardown();
  });

  it("clones the child element with data-part=button-icon when asChild is true", () => {
    const scope = setup();
    scope.props.asChild = true;
    scope.props.children = <span data-testid="cloned-icon" />;
    scope.run();

    const icon = screen.getByTestId("cloned-icon");
    expect(icon).toHaveAttribute("data-part", "button-icon");
    expect(icon).toHaveAttribute("aria-hidden", "true");

    teardown();
  });

  it("falls back to rendering the icon slot when asChild is true but children is not a valid element", () => {
    const scope = setup();
    scope.props.asChild = true;
    scope.props.children = "text only";
    scope.run();

    const slot = scope.wrapper.container.querySelector("[data-part=\"button-icon-slot\"]");
    expect(slot).toBeInTheDocument();

    teardown();
  });
});


describe("ButtonInteractiveIcon", () => {
  function setup() {
    const scope = {
      props: {
        children: <svg data-testid="interactive-icon" />,
        onClick: jest.fn(),
        onKeyDown: jest.fn(),
      },
    };

    scope.run = () => {
      scope.wrapper = render(<ButtonInteractiveIcon {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders with tabIndex=0, role=button, and data-interactive", () => {
    const scope = setup();
    scope.run();

    const slot = scope.wrapper.container.querySelector("[data-part=\"button-icon-slot\"]");
    expect(slot).toHaveAttribute("tabindex", "0");
    expect(slot).toHaveAttribute("role", "button");
    expect(slot).toHaveAttribute("data-interactive", "true");
    expect(slot).toHaveAttribute("aria-hidden", "false");

    teardown();
  });

  it("calls onClick when the Enter key is pressed", () => {
    const scope = setup();
    scope.run();

    const slot = scope.wrapper.container.querySelector("[data-part=\"button-icon-slot\"]");
    fireEvent.keyDown(slot, { key: "Enter" });
    expect(scope.props.onClick).toHaveBeenCalledTimes(1);

    teardown();
  });

  it("calls onClick when the Space key is pressed", () => {
    const scope = setup();
    scope.run();

    const slot = scope.wrapper.container.querySelector("[data-part=\"button-icon-slot\"]");
    fireEvent.keyDown(slot, { key: " " });
    expect(scope.props.onClick).toHaveBeenCalledTimes(1);

    teardown();
  });

  it("calls onKeyDown for other keys and does not call onClick", () => {
    const scope = setup();
    scope.run();

    const slot = scope.wrapper.container.querySelector("[data-part=\"button-icon-slot\"]");
    fireEvent.keyDown(slot, { key: "Escape" });
    expect(scope.props.onKeyDown).toHaveBeenCalledTimes(1);
    expect(scope.props.onClick).not.toHaveBeenCalled();

    teardown();
  });

  it("wraps in a Tooltip when the tooltip prop is provided", () => {
    const scope = setup();
    scope.props.tooltip = "Icon action";
    scope.run();

    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
    expect(screen.getByText("Icon action")).toBeInTheDocument();

    teardown();
  });

  it("renders without a Tooltip when no tooltip prop is provided", () => {
    const scope = setup();
    scope.run();

    expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument();

    teardown();
  });
});


describe("ButtonIconGroup", () => {
  function setup() {
    const scope = {
      props: {
        children: [
          <span key="a" data-testid="icon-a" />,
          <span key="b" data-testid="icon-b" />,
        ],
      },
    };

    scope.run = () => {
      scope.wrapper = render(<ButtonIconGroup {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders a span with data-part=button-icon-group", () => {
    const scope = setup();
    scope.run();

    expect(scope.wrapper.container.querySelector("[data-part=\"button-icon-group\"]")).toBeInTheDocument();

    teardown();
  });

  it("renders children directly without slot wrappers when interactive is false (default)", () => {
    const scope = setup();
    scope.run();

    const group = scope.wrapper.container.querySelector("[data-part=\"button-icon-group\"]");
    expect(group.querySelector("[data-part=\"button-icon-group-icon-slot\"]")).not.toBeInTheDocument();
    expect(screen.getByTestId("icon-a")).toBeInTheDocument();
    expect(screen.getByTestId("icon-b")).toBeInTheDocument();

    teardown();
  });

  it("wraps each child in an icon-group-icon-slot span when interactive is true", () => {
    const scope = setup();
    scope.props.interactive = true;
    scope.run();

    const slots = scope.wrapper.container.querySelectorAll("[data-part=\"button-icon-group-icon-slot\"]");
    expect(slots).toHaveLength(2);

    teardown();
  });

  it("sets data-interactive on the group container when interactive is true", () => {
    const scope = setup();
    scope.props.interactive = true;
    scope.run();

    expect(scope.wrapper.container.querySelector("[data-part=\"button-icon-group\"]")).toHaveAttribute("data-interactive", "true");

    teardown();
  });
});


describe("ButtonLoading", () => {
  function setup() {
    const scope = { props: {} };

    scope.run = () => {
      scope.wrapper = render(<ButtonLoading {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders the spinner when spinner is true", () => {
    const scope = setup();
    scope.props.spinner = true;
    scope.run();

    expect(screen.getByTestId("loader-spinner")).toBeInTheDocument();

    teardown();
  });

  it("renders the spinner when spinner is 'left'", () => {
    const scope = setup();
    scope.props.spinner = "left";
    scope.run();

    expect(screen.getByTestId("loader-spinner")).toBeInTheDocument();

    teardown();
  });

  it("renders the spinner when spinner is 'right'", () => {
    const scope = setup();
    scope.props.spinner = "right";
    scope.run();

    expect(screen.getByTestId("loader-spinner")).toBeInTheDocument();

    teardown();
  });

  it("renders no spinner when spinner is not set", () => {
    const scope = setup();
    scope.props.text = "Loading";
    scope.run();

    expect(screen.queryByTestId("loader-spinner")).not.toBeInTheDocument();

    teardown();
  });

  it("renders a ButtonLabel when text is provided", () => {
    const scope = setup();
    scope.props.text = "Saving...";
    scope.run();

    expect(screen.getByText("Saving...")).toBeInTheDocument();

    teardown();
  });

  it("renders no label when text is not provided", () => {
    const scope = setup();
    scope.props.spinner = true;
    scope.run();

    expect(scope.wrapper.container.querySelector("[data-part=\"button-label\"]")).not.toBeInTheDocument();

    teardown();
  });

  it("renders both a spinner and a text label when both are provided", () => {
    const scope = setup();
    scope.props.spinner = true;
    scope.props.text = "Loading";
    scope.run();

    expect(screen.getByTestId("loader-spinner")).toBeInTheDocument();
    expect(screen.getByText("Loading")).toBeInTheDocument();

    teardown();
  });
});
