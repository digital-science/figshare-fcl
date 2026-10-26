/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import { Alerts, pushAlert, clearAlerts } from "@digital-science/figshare-fcl/latest/Alerts";
import { Button } from "@digital-science/figshare-fcl/latest/Button";

import { Cover } from "../story-utils/Cover";
import { ValueProvider } from "../story-utils/ValueProvider";


export default {
  title: "UI/latest/Alerts",
  component: Alerts,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => (
        <ValueProvider initialValue={false}>
          {(isFixed, setIsFixed) => (
            <ValueProvider initialValue="single">
              {(stackType, setStackType) => (
                <ValueProvider initialValue="demo-alerts-channel">
                  {(channel) => (
                    <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
                      <div>
                        <span>Stack type:</span>
                        <div style={ { display: "flex", flexDirection: "row", gap: "8px", marginTop: "8px", flexWrap: "wrap" } }>
                          <select value={stackType} onChange={(e) => setStackType(e.target.value)}>
                            <option value="single">Single</option>
                            <option value="list">List</option>
                            <option value="stack">Stack</option>
                          </select>
                          <label><input type="checkbox" checked={isFixed} onChange={(e) => setIsFixed(e.target.checked)} /> Fixed to Viewport</label>
                        </div>
                      </div>
                      <div>
                        <span>Push alerts:</span>
                        <div style={ { display: "flex", flexDirection: "row", gap: "8px", marginTop: "8px", flexWrap: "wrap" } }>
                          <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "info", title: "Info", content: "This is an informational message", persistent: false, timeout: 5000 })}>
                            Push Info
                          </Button>
                          <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "success", title: "Success", content: "Operation completed successfully", persistent: false, timeout: 5000 })}>
                            Push Success
                          </Button>
                          <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "warning", title: "Warning", content: "Please review this warning", persistent: false, timeout: 5000 })}>
                            Push Warning
                          </Button>
                          <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "error", title: "Error", content: "An error has occurred", persistent: false, timeout: 5000 })}>
                            Push Error
                          </Button>
                          <Button em="low" kind="secondary" onClick={() => clearAlerts(channel)}>
                            Clear All
                          </Button>
                        </div>
                      </div>
                      <div style={ { display: "flex", flexDirection: "column", width: "100%", minHeight: "100px", border: "1px solid #ccc", padding: "12px" } }>
                        <Alerts id={channel} stackType={stackType} isFixed={isFixed} />
                      </div>
                    </div>
                  )}
                </ValueProvider>
              )}
            </ValueProvider>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};

export const BasicAlertContainer = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => (
        <ValueProvider initialValue="basic-alerts">
          {(channel) => (
            <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
              <div style={ { display: "flex", flexDirection: "row", gap: "8px" } }>
                <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "info", content: "Information message", persistent: false, timeout: 4000 })}>
                  Info
                </Button>
                <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "success", content: "Success message", persistent: false, timeout: 4000 })}>
                  Success
                </Button>
                <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "warning", content: "Warning message", persistent: false, timeout: 4000 })}>
                  Warning
                </Button>
                <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "error", content: "Error message", persistent: false, timeout: 4000 })}>
                  Error
                </Button>
              </div>
              <div style={ { minHeight: "80px" } }>
                <Alerts id={channel} />
              </div>
            </div>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};

export const AlertsWithTitles = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => (
        <ValueProvider initialValue="titled-alerts">
          {(channel) => (
            <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
              <div style={ { display: "flex", flexDirection: "row", gap: "8px" } }>
                <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "success", title: "Success", content: "Your changes have been saved", persistent: false, timeout: 5000 })}>
                  Save Success
                </Button>
                <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "error", title: "Error", content: "Failed to save changes", persistent: false, timeout: 5000 })}>
                  Save Error
                </Button>
                <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "warning", title: "Warning", content: "This action cannot be undone", persistent: false, timeout: 5000 })}>
                  Warning
                </Button>
              </div>
              <div style={ { minHeight: "100px" } }>
                <Alerts id={channel} />
              </div>
            </div>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};

export const FixedPositionedAlerts = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => (
        <ValueProvider initialValue="fixed-alerts">
          {(channel) => (
            <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
              <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "info", title: "Fixed Position Alert", content: "This alert is positioned fixed to the viewport", persistent: false, timeout: 4000 })}>
                Show Fixed Alert
              </Button>
              <div style={ { minHeight: "60px" } }>
                <Alerts isFixed={true} id={channel} />
              </div>
            </div>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};

export const ToastStyleAlerts = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => (
        <ValueProvider initialValue="toast-alerts">
          {(channel) => (
            <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
              <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "success", content: "This is a toast-style notification", persistent: false, timeout: 3000 })}>
                Show Toast
              </Button>
              <div style={ { minHeight: "60px" } }>
                <Alerts id={channel} />
              </div>
            </div>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};

export const PersistentAlerts = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => (
        <ValueProvider initialValue="persistent-alerts">
          {(channel) => (
            <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
              <div style={ { display: "flex", flexDirection: "row", gap: "8px" } }>
                <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "info", content: "This alert persists until manually dismissed", persistent: true })}>
                  Add Persistent Alert
                </Button>
                <Button em="low" kind="secondary" onClick={() => clearAlerts(channel)}>
                  Clear All
                </Button>
              </div>
              <div style={ { minHeight: "100px" } }>
                <Alerts id={channel} />
              </div>
            </div>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};

export const ShowIfEmpty = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => (
        <ValueProvider initialValue="show-empty-alerts">
          {(channel) => (
            <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
              <div style={ { display: "flex", flexDirection: "row", gap: "8px" } }>
                <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "info", content: "Alert inside a visible empty container", persistent: true })}>
                  Add Alert
                </Button>
                <Button em="low" kind="secondary" onClick={() => clearAlerts(channel)}>
                  Clear All
                </Button>
              </div>
              <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
                <p style={ { fontSize: "12px", color: "#666", margin: 0 } }>
                  <code>showIfEmpty=true</code> — container stays visible with its padding even when empty:
                </p>
                <div style={ { border: "1px dashed #ccc" } }>
                  <Alerts id={channel} kind="p-3" showIfEmpty={true} />
                </div>
                <p style={ { fontSize: "12px", color: "#666", margin: 0 } }>
                  <code>showIfEmpty=false</code> (default) — container collapses when empty:
                </p>
                <div style={ { border: "1px dashed #ccc" } }>
                  <Alerts id={`${channel}-hidden`} kind="p-3" />
                </div>
              </div>
            </div>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};

export const WithPaddingModifiers = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => (
        <ValueProvider initialValue="padded-alerts">
          {(channel) => (
            <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
              <div style={ { display: "flex", flexDirection: "row", gap: "8px" } }>
                <Button em="low" kind="secondary" onClick={() => pushAlert({ channel, type: "info", content: "Alert with padded container", persistent: true })}>
                  Add Alert
                </Button>
                <Button em="low" kind="secondary" onClick={() => clearAlerts(channel)}>
                  Clear All
                </Button>
              </div>
              <div style={ { border: "1px dashed #ccc", minHeight: "80px" } }>
                <Alerts id={channel} kind="px-4" />
              </div>
              <p style={ { fontSize: "12px", color: "#666" } }>
                {"The alerts container above uses kind=\"px-4\" to add horizontal padding via Block modifiers. The dashed border shows the container bounds."}
              </p>
            </div>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};
