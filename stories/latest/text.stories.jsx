import React from "react";
import { Text } from "@digital-science/figshare-fcl/latest/Text";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/latest/Text",
  component: Text,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
        <Text kind="title-1">Title 1</Text>
        <Text kind="body">Body text</Text>
        <Text kind="caption">Caption text</Text>
      </div>
    </Cover>
  ),
};

export const TypographyKinds = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
        <div>
          <h4>Titles</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Text kind="title-1">Title 1</Text>
            <Text kind="title-2">Title 2</Text>
            <Text kind="title-3">Title 3</Text>
            <Text kind="title-4">Title 4</Text>
          </div>
        </div>
        <div>
          <h4>Body Text</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Text kind="body">Body text - standard paragraph text</Text>
            <Text kind="body-2">Body 2 text - slightly smaller body text</Text>
            <Text kind="body-3">Body 3 text - smallest body text</Text>
          </div>
        </div>
        <div>
          <h4>Labels and Captions</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Text kind="label">Label text</Text>
            <Text kind="label-2">Label 2 text</Text>
            <Text kind="label-3">Label 3 text</Text>
            <Text kind="caption">Caption text</Text>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const TextWeight = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
        <div>
          <h4>Weight Variations</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Text kind="body" weight="regular">Regular weight text</Text>
            <Text kind="body" weight="bold">Bold weight text</Text>
          </div>
        </div>
        <div>
          <h4>Combined Kind and Weight</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Text kind="title-2" weight="regular">Title with Regular Weight</Text>
            <Text kind="title-2" weight="bold">Title with Bold Weight</Text>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const TextColors = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
        <div>
          <h4>Semantic Colors</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Text kind="body" color="primary">Primary color text</Text>
            <Text kind="body" color="secondary">Secondary color text</Text>
            <Text kind="body" color="tertiary">Tertiary color text</Text>
            <Text kind="body" color="disabled">Disabled color text</Text>
          </div>
        </div>
        <div>
          <h4>Status Colors</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Text kind="body" color="success">Success color text</Text>
            <Text kind="body" color="warning">Warning color text</Text>
            <Text kind="body" color="error">Error color text</Text>
            <Text kind="body" color="info">Info color text</Text>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const TextWrappingAndAlignment = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
        <div>
          <h4>Wrapping Options</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Text kind="body" wrap="ellipsis" style={ { width: "200px" } }>
              This text will be truncated with an ellipsis when it exceeds the width
            </Text>
            <Text kind="body" wrap="nowrap" style={ { width: "200px" } }>
              This text will not wrap and will overflow
            </Text>
            <Text kind="body" wrap="break-all" style={ { width: "200px" } }>
              Thisverylongtextwithoutspacescanbreakintothemiddleofwordswhenbreakallisused
            </Text>
          </div>
        </div>
        <div>
          <h4>Text Alignment</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Text kind="body" align="left">Left aligned text</Text>
            <Text kind="body" align="center">Center aligned text</Text>
            <Text kind="body" align="right">Right aligned text</Text>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const CombinedProperties = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
        <div>
          <h4>Kind + Weight + Color</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Text kind="title-2" weight="bold" color="primary">
              Bold Primary Title
            </Text>
            <Text kind="body" weight="bold" color="success">
              Bold Success Body
            </Text>
            <Text kind="label" weight="regular" color="secondary">
              Regular Secondary Label
            </Text>
          </div>
        </div>
        <div>
          <h4>Custom Tag Rendering</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Text kind="title-1" tag="h1">Rendered as h1 tag</Text>
            <Text kind="body" tag="p">Rendered as p tag</Text>
            <Text kind="caption" tag="small">Rendered as small tag</Text>
          </div>
        </div>
      </div>
    </Cover>
  ),
};
