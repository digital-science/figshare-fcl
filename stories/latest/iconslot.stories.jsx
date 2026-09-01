import React from "react";
import { IconSlot } from "@digital-science/figshare-fcl/latest/IconSlot";
import { Eye, Checkmark, Delete } from "@digital-science/figshare-fcl/icons/react";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/latest/IconSlot",
  component: IconSlot,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <div style={ { display: "flex", gap: "24px", padding: "24px" } }>
        <IconSlot><Eye /></IconSlot>
        <IconSlot><Checkmark /></IconSlot>
        <IconSlot><Delete /></IconSlot>
      </div>
    </Cover>
  ),
};

export const BasicIconSlotRendering = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "24px" } }>
        <div>
          <h4>Icons Rendered with IconSlot</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <IconSlot><Eye /></IconSlot>
            <IconSlot><Checkmark /></IconSlot>
            <IconSlot><Delete /></IconSlot>
          </div>
        </div>
        <div>
          <h4>Various Icons</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <IconSlot><Eye /></IconSlot>
            <IconSlot><Checkmark /></IconSlot>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const IconSlotWithDifferentKinds = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "24px" } }>
        <div>
          <h4>Default Kind</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <IconSlot kind="default"><Eye /></IconSlot>
            <IconSlot kind="default"><Checkmark /></IconSlot>
          </div>
        </div>
        <div>
          <h4>Blend Kind</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <IconSlot kind="blend"><Eye /></IconSlot>
            <IconSlot kind="blend"><Checkmark /></IconSlot>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const IconSlotAsChildBehavior = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "24px" } }>
        <div>
          <h4>asChild: true (clones child element)</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <IconSlot asChild={true}><Eye /></IconSlot>
            <IconSlot asChild={true}><Checkmark /></IconSlot>
          </div>
        </div>
        <div>
          <h4>asChild: false (wraps in span)</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <IconSlot asChild={false}><Eye /></IconSlot>
            <IconSlot asChild={false}><Checkmark /></IconSlot>
          </div>
        </div>
      </div>
    </Cover>
  ),
};
