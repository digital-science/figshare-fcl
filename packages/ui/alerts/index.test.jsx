import React from "react";
import { render, cleanup, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Alerts, pushAlert, clearAlerts } from "./index";


describe("<Alerts />", () => {
  function setup() {
    const user = userEvent.setup();
    const scope = {
      user,
      props: { id: "alerts" },
    };
    scope.run = () => {
      scope.wrapper = render(<Alerts {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("renders a form alerts list node", () => {
    const scope = setup();
    scope.run();

    const container = scope.wrapper.container.firstChild;
    expect(container).toHaveClass("alerts");
    expect(container).toHaveClass("empty");
    expect(container).not.toHaveClass("isFixed");

    teardown();
  });

  it("renders an alert with fixed position", () => {
    const scope = setup();
    scope.props.isFixed = true;
    scope.run();

    expect(scope.wrapper.container.firstChild).toHaveClass("isFixed");

    teardown();
  });

  it("renders alerts with no type icons if specified", () => {
    const scope = setup();
    scope.props.noTypeIcon = true;
    scope.run();

    expect(scope.wrapper.container.firstChild).toHaveClass("noTypeIcon");

    teardown();
  });

  it("renders alerts with toast styling if specified", () => {
    const scope = setup();
    scope.props.isToast = true;
    scope.run();

    expect(scope.wrapper.container.firstChild).toHaveClass("isToast");

    teardown();
  });

  it("subscribes to form-alerts:message, to push messages to it's own list", async() => {
    const scope = setup();
    scope.run();

    const container = scope.wrapper.container.firstChild;
    expect(container).toHaveClass("empty");

    act(() => {
      pushAlert({
        channel: "alerts",
        type: "warning",
        content: "Some message",
        identifier: "form-alert",
        attributes: { "data-custom-alert-attribute": "attribute-value" },
      });

      pushAlert({
        channel: "wrong-channel",
        type: "warning",
        content: "Some message 2",
        identifier: "form-alert",
      });
    });

    await waitFor(() => {
      expect(container).toHaveClass("shown");
    });

    expect(container).not.toHaveClass("empty");
    expect(scope.wrapper.container.querySelector(".alert.warning")).toBeInTheDocument();
    expect(scope.wrapper.container.querySelector("[data-custom-alert-attribute='attribute-value']")).
      toBeInTheDocument();

    teardown();
  });

  it("subscribes to form-alerts:message, handles timeout if given", () => {
    jest.useFakeTimers("modern");
    const scope = setup();
    scope.run();

    const container = scope.wrapper.container.firstChild;
    expect(container).toHaveClass("empty");

    const timeout = 3000;
    act(() => {
      pushAlert({
        channel: "wrong-channel",
        type: "warning",
        content: "Some message 2",
        identifier: "form-alert",
        timeout,
      });
    });

    act(() => {
      jest.advanceTimersByTime(timeout + 1000);
    });

    expect(container).toHaveClass("empty");
    expect(container).not.toHaveClass("shown");

    jest.useRealTimers();
    teardown();
  });

  it("subscribes to form-alerts:message, to pop one or clear all messages from it's own list", async() => {
    const scope = setup();
    scope.run();

    const container = scope.wrapper.container.firstChild;

    act(() => {
      pushAlert({ channel: "alerts", type: "warning", content: "Some message", identifier: "form-alert" });
    });
    await waitFor(() => {
      expect(container).toHaveClass("shown");
    });

    act(() => {
      clearAlerts("alerts");
    });
    await waitFor(() => {
      expect(container).toHaveClass("empty");
    });
    expect(scope.wrapper.container.querySelector(".alert.warning")).not.toBeInTheDocument();

    act(() => {
      pushAlert({
        channel: "alerts",
        type: "warning",
        content: "Some message",
        identifier: "form-alert",
        persistent: false,
      });
    });
    await waitFor(() => {
      expect(container).toHaveClass("shown");
    });

    await scope.user.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(container).toHaveClass("empty");
    });
    expect(scope.wrapper.container.querySelector(".alert.warning")).not.toBeInTheDocument();

    teardown();
  });

  it("ignores unknown actions even if channel is ok", async() => {
    const scope = setup();
    scope.run();

    act(() => {
      const event = new CustomEvent(
        "form-alerts:message",
        { detail: { action: "nothing registered", channel: "alerts" } }
      );
      document.dispatchEvent(event);
    });

    await waitFor(() => {
      expect(scope.wrapper.container.firstChild).toHaveClass("empty");
    });

    expect(scope.wrapper.container.querySelector(".alert.warning")).not.toBeInTheDocument();

    teardown();
  });

  it("allows alerts to have titles or custom attributes", async() => {
    const scope = setup();
    scope.run();

    const container = scope.wrapper.container.firstChild;
    expect(container).toHaveClass("empty");

    act(() => {
      pushAlert({
        channel: "alerts",
        type: "warning",
        content: "Some message",
        title: "Some title",
        identifier: "form-alert",
        attributes: { "data-is-publish-alert": true },
      });
    });

    await waitFor(() => {
      expect(container).toHaveClass("shown");
    });

    expect(scope.wrapper.container.querySelector(".alert.warning")).toBeInTheDocument();
    expect(scope.wrapper.container.querySelector("[data-is-publish-alert]")).toBeInTheDocument();
    expect(scope.wrapper.container.querySelector(".alertTitle")).toBeInTheDocument();

    teardown();
  });
});
