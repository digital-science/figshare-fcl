import React from "react";
import Home from "@digital-science/figshare-fcl/icons/home/medium";
import IconButton from "@digital-science/figshare-fcl/button/iconButton";

import { Cover } from "../../story-utils/Cover";


export default {
  title: "UI/Button/Icon Button",
  component: IconButton,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind="story">
      <IconButton Icon={Home}>{"This IconButton has a tooltip."}</IconButton>
    </Cover>
  ),
};

export const AllThemes = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <IconButton theme="primary" Icon={Home}>Primary</IconButton>
      <IconButton Icon={Home} disabled={true} theme="primary">Primary (disabled)</IconButton>
      <IconButton theme="secondary" Icon={Home}>Secondary</IconButton>
      <IconButton Icon={Home} disabled={true} theme="secondary">Secondary (disabled)</IconButton>
      <IconButton theme="tertiary" Icon={Home}>Tertiary</IconButton>
      <IconButton Icon={Home} disabled={true} theme="tertiary">Tertiary (disabled)</IconButton>
    </Cover>
  ),
};

export const InvertedTheme = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { background: "black" } }>
        <IconButton theme="primaryAlt" Icon={Home}>Primary Alt</IconButton>
        <IconButton Icon={Home} disabled={true} theme="primaryAlt">Primary Alt (disabled)</IconButton>
        <IconButton theme="secondaryAlt" Icon={Home}>Secondary Alt</IconButton>
        <IconButton Icon={Home} disabled={true} theme="secondaryAlt">Secondary Alt (disabled)</IconButton>
      </div>
    </Cover>
  ),
};
