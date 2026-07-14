import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";

import { Alerts, pushAlert, popAlert, clearAlerts } from "./index";


const DEFAULT_DELAY = 200;

const wait = (resolution, rejection, delay = DEFAULT_DELAY) => act(() => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (rejection !== undefined) {
      reject(typeof rejection === "function" ? rejection() : rejection);
    } else {
      resolve(typeof resolution === "function" ? resolution() : resolution);
    }
  }, delay);
}));

describe("<Alerts />", () => {
  it("renders a form alerts list node", () => {
    const component = mount(
      <Alerts id="alerts" />
    );

    expect(component.find(".alerts")).toHaveLength(1);
    expect(component.find(".empty")).toHaveLength(1);
    expect(component.find(".isFixed")).toHaveLength(0);

    component.unmount();
  });

  it("renders an alert with fixed position", () => {
    const component = mount(
      <Alerts id="alerts" isFixed={true} />
    );

    expect(component.find(".isFixed")).toHaveLength(1);

    component.unmount();
  });

  it("renders an alerts with no type icons if specified", () => {
    const component = mount(
      <Alerts id="alerts" noTypeIcon={true} />
    );

    expect(component.find(".noTypeIcon")).toHaveLength(1);

    component.unmount();
  });

  it("renders alerts with toast styling if specified", () => {
    const component = mount(
      <Alerts id="alerts" isToast={true} />
    );

    expect(component.find(".isToast")).toHaveLength(1);

    component.unmount();
  });

  it("subscribes to form-alerts:message, to push messages to it's own list", async() => {
    const component = mount(
      <Alerts id="alerts" />
    );

    expect(component.find(".alerts")).toHaveLength(1);
    expect(component.find(".empty")).toHaveLength(1);

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

    await wait(component.update());


    expect(component.find(".empty")).toHaveLength(0);
    expect(component.find(".shown")).toHaveLength(1);
    expect(component.find("div.alert.warning")).toHaveLength(1);
    expect(component.find("div[data-custom-alert-attribute=\"attribute-value\"]")).toHaveLength(1);

    component.unmount();
  });


  it("subscribes to form-alerts:message, handles timeout if given", async() => {
    const component = mount(
      <Alerts id="alerts" />
    );

    expect(component.find(".alerts")).toHaveLength(1);
    expect(component.find(".empty")).toHaveLength(1);
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
    const timeoutBuffer = 1000;

    await wait(() => component.update(), undefined, timeout + timeoutBuffer);


    expect(component.find(".empty")).toHaveLength(1);
    expect(component.find(".shown")).toHaveLength(0);

    component.unmount();
  });


  it("subscribes to form-alerts:message, to pop one or clear all messages from it's own list", async() => {
    const component = mount(
      <Alerts id="alerts" />
    );

    expect(component.find(".alerts")).toHaveLength(1);
    expect(component.find(".empty")).toHaveLength(1);

    act(() => {
      pushAlert({
        channel: "alerts",
        type: "warning",
        content: "Some message",
        identifier: "form-alert",
      });
    });

    act(() => {
      clearAlerts("alerts");
    });

    await wait(() => component.update());


    expect(component.find(".empty")).toHaveLength(1);
    expect(component.find(".shown")).toHaveLength(0);
    expect(component.find("div.alert.warning")).toHaveLength(0);


    act(() => {
      pushAlert({
        channel: "alerts",
        type: "warning",
        content: "Some message",
        identifier: "form-alert-to-remove",
        persistent: false,
      });
      pushAlert({
        channel: "alerts",
        type: "warning",
        content: "Some message",
        identifier: "form-alert",
        persistent: false,
      });
    });

    await wait(() => component.update());

    act(() => {
      popAlert("alerts", "not a match");
    });

    act(() => {
      component.find("button.alertClose").at(0).simulate("click");
    });

    await wait(() => component.update());

    expect(component.find(".empty")).toHaveLength(1);
    expect(component.find("div.alert.warning")).toHaveLength(0);

    component.unmount();
  });


  it("ignores unknown actions even if channel is ok", async() => {
    const component = mount(
      <Alerts id="alerts" />
    );


    act(() => {
      const event = new CustomEvent("form-alerts:message", {
        detail: {
          action: "nothing registered",
          channel: "alerts",
        },
      });

      document.dispatchEvent(event);
    });


    await wait(() => component.update());

    expect(component.find(".empty")).toHaveLength(1);
    expect(component.find("div.alert.warning")).toHaveLength(0);

    component.unmount();
  });
  it("allows alerts to have titles or custom attributes", async() => {
    const component = mount(
      <Alerts id="alerts" />
    );

    expect(component.find(".alerts")).toHaveLength(1);
    expect(component.find(".empty")).toHaveLength(1);

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

    await wait(() => component.update());

    expect(component.find(".shown")).toHaveLength(1);
    expect(component.find("div.alert.warning")).toHaveLength(1);
    expect(component.find("div[data-is-publish-alert]")).toHaveLength(1);
    expect(component.find("div.alertTitle")).toHaveLength(1);

    component.unmount();
  });
});
