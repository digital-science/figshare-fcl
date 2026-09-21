import React from "react";
import { render, cleanup, waitFor, act } from "@testing-library/react";

import { Alerts } from "./Alerts";
import { pushAlert, clearAlerts } from "./utils";


describe("<Alerts />", () => {
  afterEach(() => {
    cleanup();
  });

  it("subscribes to alerts:message events and displays pushed alerts", async() => {
    const { container } = render(<Alerts id="test-channel" />);
    const listContainer = container.querySelector("[data-part='list']");

    expect(listContainer).toHaveAttribute("data-empty", "true");

    act(() => {
      pushAlert({
        channel: "test-channel",
        type: "success",
        title: "Success",
        message: "Operation completed",
        persistent: false,
      });
    });

    await waitFor(() => {
      expect(listContainer).toHaveAttribute("data-empty", "false");
    });

    expect(container.querySelector("[role='alert']")).toBeInTheDocument();
  });

  it("clears all alerts when clearAlerts is called", async() => {
    const { container } = render(<Alerts id="test-channel" />);
    const listContainer = container.querySelector("[data-part='list']");

    act(() => {
      pushAlert({
        channel: "test-channel",
        type: "info",
        message: "Test message",
      });
    });

    await waitFor(() => {
      expect(listContainer).toHaveAttribute("data-empty", "false");
    });

    act(() => {
      clearAlerts("test-channel");
    });

    await waitFor(() => {
      expect(listContainer).toHaveAttribute("data-empty", "true");
    });
  });

  it("respects stackType=single to show only one alert at a time", async() => {
    const { container } = render(<Alerts id="test-channel" stackType="single" />);

    act(() => {
      pushAlert({
        channel: "test-channel",
        type: "info",
        id: "alert-1",
        message: "First",
      });
      pushAlert({
        channel: "test-channel",
        type: "warning",
        id: "alert-2",
        message: "Second",
      });
    });

    await waitFor(() => {
      const alerts = container.querySelectorAll("[role='alert']");
      expect(alerts).toHaveLength(1);
      expect(alerts[0]).toHaveAttribute("data-alert-type", "warning");
    });
  });

  it("auto-dismisses alerts after timeout", () => {
    jest.useFakeTimers();
    const { container } = render(<Alerts id="test-channel" />);
    const listContainer = container.querySelector("[data-part='list']");
    const timeout = 2000;

    act(() => {
      pushAlert({
        channel: "test-channel",
        type: "success",
        message: "Auto-dismiss me",
        timeout,
      });
    });

    expect(listContainer).toHaveAttribute("data-empty", "false");

    act(() => {
      jest.advanceTimersByTime(timeout + 100);
    });

    expect(listContainer).toHaveAttribute("data-empty", "true");

    jest.useRealTimers();
  });
});
