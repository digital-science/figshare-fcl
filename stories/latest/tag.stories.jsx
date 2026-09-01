import React from "react";
import { Tag } from "@digital-science/figshare-fcl/latest/Tag";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/latest/Tag",
  component: Tag,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "18px", flexWrap: "wrap" } }>
        Normal Tags:
        <div style={ { display: "flex", flexDirection: "row", gap: "12px", flexWrap: "wrap" } }>
          <Tag color="neutral">Neutral</Tag>
          <Tag color="blue">Blue</Tag>
          <Tag color="green">Green</Tag>
          <Tag color="green-filled">Green Filled</Tag>
          <Tag color="red">Red</Tag>
        </div>
        As Pills:
        <div style={ { display: "flex", flexDirection: "row", gap: "12px", flexWrap: "wrap" } }>
          <Tag pill={true} color="neutral">Neutral</Tag>
          <Tag pill={true} color="blue">Blue</Tag>
          <Tag pill={true} color="green">Green</Tag>
          <Tag pill={true} color="green-filled">Green Filled</Tag>
          <Tag pill={true} color="red">Red</Tag>
        </div>
      </div>
    </Cover>
  ),
};

export const TagColors = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Standard Colors</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px", flexWrap: "wrap" } }>
            <Tag color="neutral">Neutral</Tag>
            <Tag color="blue">Blue</Tag>
            <Tag color="green">Green</Tag>
            <Tag color="orange">Orange</Tag>
            <Tag color="red">Red</Tag>
            <Tag color="purple">Purple</Tag>
          </div>
        </div>
        <div>
          <h4>Special Colors</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px", flexWrap: "wrap" } }>
            <Tag color="green-filled">Green Filled</Tag>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const PillTags = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Pill Shape</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px", flexWrap: "wrap" } }>
            <Tag pill={true} color="neutral">Neutral Pill</Tag>
            <Tag pill={true} color="blue">Blue Pill</Tag>
            <Tag pill={true} color="green">Green Pill</Tag>
            <Tag pill={true} color="red">Red Pill</Tag>
          </div>
        </div>
        <div>
          <h4>Regular Shape</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px", flexWrap: "wrap" } }>
            <Tag color="neutral">Neutral</Tag>
            <Tag color="blue">Blue</Tag>
            <Tag color="green">Green</Tag>
            <Tag color="red">Red</Tag>
          </div>
        </div>
      </div>
    </Cover>
  ),
};
