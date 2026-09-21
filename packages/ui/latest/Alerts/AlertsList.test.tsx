import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AlertsList } from "./AlertsList";


describe("<AlertsList />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls onDismiss with alert object containing (id, event) when alert close button is clicked", async() => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();
    const alerts = [
      { id: "alert-1", type: "warning", message: "Test message", persistent: false },
    ];

    render(
      <AlertsList alerts={alerts} onDismiss={onDismiss} />
    );

    const closeButton = screen.getAllByRole("button")[0];
    await user.click(closeButton);

    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalled();
    });

    const callArgs = onDismiss.mock.calls[0];
    expect(callArgs[0]).toHaveProperty("id", "alert-1");
    expect(callArgs[0]).toHaveProperty("event");
    expect(callArgs[0].event.type).toBe("click");
  });

  it("sets data-alert-index attribute and inline style for stack layout", () => {
    const alerts = [
      { id: "alert-1", type: "info", message: "First" },
      { id: "alert-2", type: "warning", message: "Second" },
      { id: "alert-3", type: "error", message: "Third" },
    ];

    const { container } = render(
      <AlertsList alerts={alerts} stackType="stack" />
    );

    const alertElements = container.querySelectorAll("[role='alert']");
    expect(alertElements).toHaveLength(3);

    alertElements.forEach((alert, index) => {
      expect(alert).toHaveAttribute("data-alert-index", String(index));
      expect(alert.style.getPropertyValue("--alert-index")).toBe(String(index));
    });
  });
});
