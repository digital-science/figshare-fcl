import React, { useState } from "react";
import { Alerts, pushAlert, clearAlerts } from "@digital-science/figshare-fcl/alerts";
import { Button } from "@digital-science/figshare-fcl/button";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/Alerts/Alerts",
  component: Alerts,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => {
        const [fixed, setFixed] = useState(false);
        const [noTypeIcon, setNoTypeIcon] = useState(false);
        const [isToast, setIsToast] = useState(false);

        return (
          <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
            <span>Change appearance:</span>
            <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
              <Button
                theme="secondary"
                onClick={() => {
                  setFixed(!fixed)
                }}
              >
                {fixed ? "Show Inline" : "Show fixed to viewport"}
              </Button>
              <Button
                theme="secondary"
                onClick={() => {
                  setNoTypeIcon(!noTypeIcon)
                }}
              >
                {noTypeIcon ? "Show Type Icons" : "Hide Type Icons"}
              </Button>
              <Button
                theme="secondary"
                onClick={() => {
                  setIsToast(!isToast)
                }}
              >
                {isToast ? "Normal" : "Toast"}
              </Button>
              <Button theme="secondary" onClick={() => clearAlerts("alerts-channel")}>Clear</Button>
            </div>
            <span>Push alerts:</span>
            <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
              <Button theme="secondary" onClick={() => pushAlert({ channel: "alerts-channel", content: "Something is wrong.", type: "error" })}>Error</Button>
              <Button theme="secondary" onClick={() => pushAlert({ channel: "alerts-channel", content: "Something is not ok.", type: "warning" })}>Warning</Button>
              <Button theme="secondary" onClick={() => pushAlert({ channel: "alerts-channel", content: "All is well.", type: "success" })}>Success</Button>
              <Button theme="secondary" onClick={() => pushAlert({ channel: "alerts-channel", content: "Information in this particular alert.", persistent: true, type: "info" })}>Info</Button>
              <Button theme="secondary" onClick={() => pushAlert({ channel: "alerts-channel", title: "Alert!", content: "Something is wrong.", type: "error", attributes: { "data-special-error": true } })}>Error + Title</Button>
              <Button theme="secondary" onClick={() => pushAlert({ channel: "alerts-channel", title: "Please note:", content: "Information in this particular alert.", persistent: true, type: "info" })}>Info + Title</Button>
            </div>
            <div style={ { display: "flex", flexDirection: "row", gap: "12px" } } />
            <div style={ { display: "flex", flexDirection: "column", width: "50%" } }>
              <Alerts id="alerts-channel" isFixed={fixed} noTypeIcon={noTypeIcon} isToast={isToast} />
            </div>
          </div>
        )
      }}
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
        <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
          <Button theme="secondary" onClick={() => pushAlert({ channel: "alerts-channel", content: "Something is wrong.", type: "error" })}>Push Error</Button>
          <Button theme="secondary" onClick={() => pushAlert({ channel: "alerts-channel", content: "Something is not ok.", type: "warning" })}>Push Warning</Button>
          <Button theme="secondary" onClick={() => pushAlert({ channel: "alerts-channel", content: "All is well.", type: "success" })}>Push success</Button>
          <Button theme="secondary" onClick={() => pushAlert({ channel: "alerts-channel", content: "Info.", persistent: false, type: "info" })}>Push info</Button>
          <Button theme="secondary" onClick={() => clearAlerts("alerts-channel")}>Clear</Button>
        </div>
        <div className="field-container" style={ { display: "flex", flexDirection: "column", width: "50%" } }>
          <Alerts id="alerts-channel" />
        </div>
      </div>
    </Cover>
  ),
};
