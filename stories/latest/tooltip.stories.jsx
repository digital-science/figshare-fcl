import React from "react";
import { Tooltip } from "@digital-science/figshare-fcl/latest/Tooltip";
import { Button } from "@digital-science/figshare-fcl/latest/Button";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/latest/Tooltip",
  component: Tooltip,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <div style={ { display: "flex", gap: "24px", padding: "40px", justifyContent: "center" } }>
        <Tooltip>
          <Tooltip.Trigger asChild={true}>
            <Button kind="tertiary" span="icon" title="Hover for tooltip">
              <Button.Icon>ℹ️</Button.Icon>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Helpful tooltip text</Tooltip.Content>
        </Tooltip>
      </div>
    </Cover>
  ),
};

export const BasicTooltips = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "40px" } }>
        <div>
          <h4>Tooltip on Button</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <Tooltip>
              <Tooltip.Trigger asChild={true}>
                <Button kind="primary">Hover me</Button>
              </Tooltip.Trigger>
              <Tooltip.Content>This is helpful information</Tooltip.Content>
            </Tooltip>
          </div>
        </div>
        <div>
          <h4>Tooltip on Text</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <Tooltip>
              <Tooltip.Trigger>
                <span style={ { textDecoration: "underline", cursor: "help" } }>Hover this text</span>
              </Tooltip.Trigger>
              <Tooltip.Content>Additional context about this term</Tooltip.Content>
            </Tooltip>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const TooltipWithRichContent = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "40px" } }>
        <div>
          <h4>Tooltip with HTML Content</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <Tooltip>
              <Tooltip.Trigger asChild={true}>
                <Button kind="secondary">Info</Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <div style={ { maxWidth: "200px" } }>
                  <strong>Tip:</strong>
                  <p>You can add complex HTML content to tooltips</p>
                </div>
              </Tooltip.Content>
            </Tooltip>
          </div>
        </div>
      </div>
    </Cover>
  ),
};
