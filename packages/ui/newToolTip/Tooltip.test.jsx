import React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tooltip, TooltipContent, TooltipTrigger, TooltipClose } from "./Tooltip";


describe("Tooltip", () => {
  function setup(options = {}) {
    const user = userEvent.setup();
    const scope = {
      user,
      props: {
        placement: "top",
        ...options,
      },
    };

    scope.run = () => {
      const wrapper = render(
        <Tooltip {...scope.props}>
          <TooltipTrigger>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>
            Tooltip content
          </TooltipContent>
        </Tooltip>
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

  it("should render trigger button", () => {
    const scope = setup();
    scope.run();

    const trigger = screen.getByRole("button", { name: /hover me/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-state", "closed");

    teardown();
  });

  it("should not show tooltip content initially", () => {
    const scope = setup();
    scope.run();

    const tooltipContent = screen.queryByText("Tooltip content");
    expect(tooltipContent).not.toBeInTheDocument();

    teardown();
  });

  it("should show tooltip content on hover", async() => {
    const scope = setup();
    scope.run();

    const trigger = screen.getByRole("button", { name: /hover me/i });

    await scope.user.hover(trigger);

    await waitFor(() => {
      const tooltipContent = screen.getByText("Tooltip content");
      expect(tooltipContent).toBeInTheDocument();
    });

    expect(trigger).toHaveAttribute("data-state", "open");

    teardown();
  });

  it("should hide tooltip content on unhover", async() => {
    const scope = setup();
    scope.run();

    const trigger = screen.getByRole("button", { name: /hover me/i });

    // Hover to show tooltip
    await scope.user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });

    // Unhover to hide tooltip
    await scope.user.unhover(trigger);

    await waitFor(() => {
      const tooltipContent = screen.queryByText("Tooltip content");
      expect(tooltipContent).not.toBeInTheDocument();
    });

    expect(trigger).toHaveAttribute("data-state", "closed");

    teardown();
  });

  it("should work with interactive tooltip", async() => {
    const scope = setup({ interactive: true });
    scope.run();

    const trigger = screen.getByRole("button", { name: /hover me/i });

    await scope.user.click(trigger);

    await waitFor(() => {
      const tooltipContent = screen.getByText("Tooltip content");
      expect(tooltipContent).toBeInTheDocument();
      expect(tooltipContent).toHaveAttribute("role", "tooltip");
    });

    teardown();
  });

  it("should work with custom trigger element", () => {
    const scope = setup();

    scope.run = () => {
      const wrapper = render(
        <Tooltip {...scope.props}>
          <TooltipTrigger Element="div" asChild={false}>
            Custom trigger
          </TooltipTrigger>
          <TooltipContent>
            Tooltip content
          </TooltipContent>
        </Tooltip>
      );

      scope.wrapper = wrapper;
    };

    scope.run();

    const trigger = screen.getByText("Custom trigger");
    expect(trigger.tagName).toBe("DIV");
    expect(trigger).toHaveAttribute("data-state", "closed");

    teardown();
  });
});

describe("TooltipClose", () => {
  function setup(options = {}) {
    const user = userEvent.setup();
    const onClickMock = jest.fn();
    const scope = {
      user,
      props: {
        interactive: true,
        ...options,
      },
      mocks: { onClick: onClickMock },
    };

    scope.run = () => {
      const wrapper = render(
        <Tooltip {...scope.props}>
          <TooltipTrigger>
            <button>Open tooltip</button>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              Interactive tooltip content
              <TooltipClose onClick={scope.mocks.onClick} />
            </div>
          </TooltipContent>
        </Tooltip>
      );

      scope.wrapper = wrapper;
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("should render close button in interactive tooltip", async() => {
    const scope = setup();
    scope.run();

    const trigger = screen.getByRole("button", { name: /open tooltip/i });
    await scope.user.click(trigger);

    await waitFor(() => {
      const closeButton = screen.getByRole("button", { name: /dismiss tooltip/i });
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute("data-id", "dismiss-tooltip");
    });

    teardown();
  });

  it("should close tooltip when close button is clicked", async() => {
    const scope = setup();
    scope.run();

    const trigger = screen.getByRole("button", { name: /open tooltip/i });
    await scope.user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Interactive tooltip content")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: /dismiss tooltip/i });
    await scope.user.click(closeButton);

    expect(scope.mocks.onClick).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      const tooltipContent = screen.queryByText("Interactive tooltip content");
      expect(tooltipContent).not.toBeInTheDocument();
    });

    teardown();
  });
});
