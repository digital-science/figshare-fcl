import React from "react";

import { IconGallery } from "../IconGallery";
import { Cover } from "../../story-utils/Cover";


export default {
  title: "Icons/ItemType",
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Gallery = {
  render: () => (
    <Cover kind="story">
      <IconGallery folder="item-type" size={32} />
    </Cover>
  ),
};
