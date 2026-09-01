import React from "react";
import GenericButton from "@digital-science/figshare-fcl/button/genericButton";

import { Cover } from "../../story-utils/Cover";


export default {
  title: "UI/Button/Generic Button",
  component: GenericButton,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind="story">
      <GenericButton tooltip="Tooltip text">{"Click me!"}</GenericButton>
    </Cover>
  ),
};
