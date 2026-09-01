import React from "react";
import Home from "@digital-science/figshare-fcl/icons/home/medium";
import { Button } from "@digital-science/figshare-fcl/button";

import { Cover } from "../../story-utils/Cover";


export default {
  title: "UI/Button/Button",
  component: Button,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind="story">
      <Button tooltip="This button has a tooltip.">{"Click me!"}</Button>
    </Cover>
  ),
};

export const AllThemesAndSizes = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { display: "flex", flexWrap: "wrap", gap: "calc(4 * var(--gridSize))" } }>
        <Button theme="primary" tooltip="Tooltip text">{"Primary"}</Button>
        <Button theme="primary" Icon={Home} tooltip="Tooltip text">{"Primary"}</Button>
        <Button theme="primary" Icon={Home} iconPlacement="right" tooltip="Tooltip text">{"Primary"}</Button>
        <Button theme="primary" Icon={Home} tooltip="Tooltip text" disabled={true}>{"Primary"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="primaryAlt" tooltip="Tooltip text">{"Primary Alt"}</Button>
        <Button theme="primaryAlt" Icon={Home} tooltip="Tooltip text">{"Primary Alt"}</Button>
        <Button theme="primaryAlt" Icon={Home} iconPlacement="right" tooltip="Tooltip text">{"Primary Alt"}</Button>
        <Button theme="primaryAlt" Icon={Home} tooltip="Tooltip text" disabled={true}>{"Primary Alt"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="secondary" tooltip="Tooltip text" size="S">{"Secondary (S)"}</Button>
        <Button theme="secondary" Icon={Home} tooltip="Tooltip text" size="S">{"Secondary (S)"}</Button>
        <Button theme="secondary" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="S">{"Secondary (S)"}</Button>
        <Button theme="secondary" Icon={Home} tooltip="Tooltip text" size="S" disabled={true}>{"Secondary (S)"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="secondary" tooltip="Tooltip text" size="M">{"Secondary (M)"}</Button>
        <Button theme="secondary" Icon={Home} tooltip="Tooltip text" size="M">{"Secondary (M)"}</Button>
        <Button theme="secondary" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="M">{"Secondary (M)"}</Button>
        <Button theme="secondary" Icon={Home} tooltip="Tooltip text" size="M" disabled={true}>{"Secondary (M)"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="secondary" tooltip="Tooltip text" size="L">{"Secondary (L)"}</Button>
        <Button theme="secondary" Icon={Home} tooltip="Tooltip text" size="L">{"Secondary (L)"}</Button>
        <Button theme="secondary" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="L">{"Secondary (L)"}</Button>
        <Button theme="secondary" Icon={Home} tooltip="Tooltip text" size="L" disabled={true}>{"Secondary (L)"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="secondaryAlt" tooltip="Tooltip text" size="S">{"Secondary Alt (S)"}</Button>
        <Button theme="secondaryAlt" Icon={Home} tooltip="Tooltip text" size="S">{"Secondary Alt (S)"}</Button>
        <Button theme="secondaryAlt" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="S">{"Secondary Alt (S)"}</Button>
        <Button theme="secondaryAlt" Icon={Home} tooltip="Tooltip text" size="S" disabled={true}>{"Secondary Alt (S)"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="secondaryAlt" tooltip="Tooltip text" size="M">{"Secondary Alt (M)"}</Button>
        <Button theme="secondaryAlt" Icon={Home} tooltip="Tooltip text" size="M">{"Secondary Alt (M)"}</Button>
        <Button theme="secondaryAlt" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="M">{"Secondary Alt (M)"}</Button>
        <Button theme="secondaryAlt" Icon={Home} tooltip="Tooltip text" size="M" disabled={true}>{"Secondary Alt (M)"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="secondaryAlt" tooltip="Tooltip text" size="L">{"SecondaryAlt (L)"}</Button>
        <Button theme="secondaryAlt" Icon={Home} tooltip="Tooltip text" size="L">{"SecondaryAlt (L)"}</Button>
        <Button theme="secondaryAlt" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="L">{"SecondaryAlt (L)"}</Button>
        <Button theme="secondaryAlt" Icon={Home} tooltip="Tooltip text" size="L" disabled={true}>{"SecondaryAlt (L)"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="tertiary" tooltip="Tooltip text" size="S">{"Tertiary (S)"}</Button>
        <Button theme="tertiary" Icon={Home} tooltip="Tooltip text" size="S">{"Tertiary (S)"}</Button>
        <Button theme="tertiary" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="S">{"Tertiary (S)"}</Button>
        <Button theme="tertiary" Icon={Home} tooltip="Tooltip text" size="S" disabled={true}>{"Tertiary (S)"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="tertiary" tooltip="Tooltip text" size="M">{"Tertiary (M)"}</Button>
        <Button theme="tertiary" Icon={Home} tooltip="Tooltip text" size="M">{"Tertiary (M)"}</Button>
        <Button theme="tertiary" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="M">{"Tertiary (M)"}</Button>
        <Button theme="tertiary" Icon={Home} tooltip="Tooltip text" size="M" disabled={true}>{"Tertiary (M)"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="tertiary" tooltip="Tooltip text" size="L">{"Tertiary (L)"}</Button>
        <Button theme="tertiary" Icon={Home} tooltip="Tooltip text" size="L">{"Tertiary (L)"}</Button>
        <Button theme="tertiary" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="L">{"Tertiary (L)"}</Button>
        <Button theme="tertiary" Icon={Home} tooltip="Tooltip text" size="L" disabled={true}>{"Tertiary (L)"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="tertiaryAlt" tooltip="Tooltip text" size="S">{"Tertiary Alt (S)"}</Button>
        <Button theme="tertiaryAlt" Icon={Home} tooltip="Tooltip text" size="S">{"Tertiary Alt (S)"}</Button>
        <Button theme="tertiaryAlt" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="S">{"Tertiary Alt (S)"}</Button>
        <Button theme="tertiaryAlt" Icon={Home} tooltip="Tooltip text" size="S" disabled={true}>{"Tertiary Alt (S)"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="tertiaryAlt" tooltip="Tooltip text" size="M">{"Tertiary Alt (M)"}</Button>
        <Button theme="tertiaryAlt" Icon={Home} tooltip="Tooltip text" size="M">{"Tertiary Alt (M)"}</Button>
        <Button theme="tertiaryAlt" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="M">{"Tertiary Alt (M)"}</Button>
        <Button theme="tertiaryAlt" Icon={Home} tooltip="Tooltip text" size="M" disabled={true}>{"Tertiary Alt (M)"}</Button>
        <hr style={ { width: "100%", borderColor: "transparent" } } />
        <Button theme="tertiaryAlt" tooltip="Tooltip text" size="L">{"Tertiary Alt (L)"}</Button>
        <Button theme="tertiaryAlt" Icon={Home} tooltip="Tooltip text" size="L">{"Tertiary Alt (L)"}</Button>
        <Button theme="tertiaryAlt" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="L">{"Tertiary Alt (L)"}</Button>
        <Button theme="tertiaryAlt" Icon={Home} tooltip="Tooltip text" size="L" disabled={true}>{"Tertiary Alt (L)"}</Button>
      </div>
    </Cover>
  ),
};

export const InvertedTheme = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { background: "black" } }>
        <div style={ { display: "flex", flexWrap: "wrap", gap: "calc(4 * var(--gridSize))" } }>
          <Button theme="inverted" tooltip="Tooltip text" size="S">{"Inverted (S)"}</Button>
          <Button theme="inverted" Icon={Home} tooltip="Tooltip text" size="S">{"Inverted (S)"}</Button>
          <Button theme="inverted" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="S">{"Inverted (S)"}</Button>
          <Button theme="inverted" Icon={Home} tooltip="Tooltip text" size="S" disabled={true}>{"Inverted (S)"}</Button>
          <hr style={ { width: "100%", borderColor: "transparent" } } />
          <Button theme="inverted" tooltip="Tooltip text" size="M">{"Inverted (M)"}</Button>
          <Button theme="inverted" Icon={Home} tooltip="Tooltip text" size="M">{"Inverted (M)"}</Button>
          <Button theme="inverted" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="M">{"Inverted (M)"}</Button>
          <Button theme="inverted" Icon={Home} tooltip="Tooltip text" size="M" disabled={true}>{"Inverted (M)"}</Button>
          <hr style={ { width: "100%", borderColor: "transparent" } } />
          <Button theme="inverted" tooltip="Tooltip text" size="L">{"Inverted (L)"}</Button>
          <Button theme="inverted" Icon={Home} tooltip="Tooltip text" size="L">{"Inverted (L)"}</Button>
          <Button theme="inverted" Icon={Home} iconPlacement="right" tooltip="Tooltip text" size="L">{"Inverted (L)"}</Button>
          <Button theme="inverted" Icon={Home} tooltip="Tooltip text" size="L" disabled={true}>{"Inverted (L)"}</Button>
        </div>
      </div>
    </Cover>
  ),
};
