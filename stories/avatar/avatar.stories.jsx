import React from "react";
import { Avatar } from "@digital-science/figshare-fcl/avatar";

import image from "../../assets/avatar.png";
import imageWithTransparentBackground from "../../assets/avatar-transparent-background.png";
import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/Avatar",
  component: Avatar,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

const Default = () => (
  <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
    <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
      <div>
        <Avatar firstName="John" lastName="Doe" />
        <span>Avatar without image</span>
      </div>
      <div>
        <Avatar firstName="John" lastName="Doe" url={image} />
        <span>Avatar with valid image</span>
      </div>
      <div>
        <Avatar firstName="John" lastName="Doe" url={imageWithTransparentBackground} />
        <span>Avatar with transparent background image</span>
      </div>
    </div>
  </div>
);

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => (
        <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Avatar firstName="John" lastName="Doe" />
            <Avatar firstName="John" lastName="Doe" url={image} />
          </div>
        </div>
      )}
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}><Default /></Cover>
  ),
};
