import React from "react";

import { IconGallery } from "../IconGallery";
import { Cover } from "../../story-utils/Cover";


export default {
  title: "Icons",
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Presentation = {
  render: () => (
    <Cover kind="story">
      <IconGallery folder="presentation" size={72} />
    </Cover>
  ),
};
