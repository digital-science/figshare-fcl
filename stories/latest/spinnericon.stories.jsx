import React from "react";
import { SpinnerIcon } from "@digital-science/figshare-fcl/latest/SpinnerIcon";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/latest/SpinnerIcon",
  component: SpinnerIcon,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <div style={ { display: "flex", gap: "24px", padding: "24px" } }>
        <SpinnerIcon size="small" />
        <SpinnerIcon size="medium" />
        <SpinnerIcon size="large" />
      </div>
    </Cover>
  ),
};

export const SpinnerSizes = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "24px" } }>
        <div>
          <h4>Small</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <SpinnerIcon size="small" />
          </div>
        </div>
        <div>
          <h4>Medium</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <SpinnerIcon size="medium" />
          </div>
        </div>
        <div>
          <h4>Large</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <SpinnerIcon size="large" />
          </div>
        </div>
        <div>
          <h4>Full</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <SpinnerIcon size="full" />
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const SpinnerBlendModes = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "24px" } }>
        <div>
          <h4>Default Blend</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <SpinnerIcon size="medium" blend={false} />
          </div>
        </div>
        <div>
          <h4>With Blend</h4>
          <div style={ { display: "flex", gap: "16px" } }>
            <SpinnerIcon size="medium" blend={true} />
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const SpinnerInLoadingState = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "24px" } }>
        <div style={ { display: "flex", gap: "12px", alignItems: "center" } }>
          <SpinnerIcon size="small" />
          <span>Loading data...</span>
        </div>
        <div style={ { display: "flex", gap: "12px", alignItems: "center" } }>
          <SpinnerIcon size="medium" />
          <span>Processing request...</span>
        </div>
        <div style={ { display: "flex", gap: "12px", alignItems: "center" } }>
          <SpinnerIcon size="small" />
          <span>Fetching results...</span>
        </div>
      </div>
    </Cover>
  ),
};
