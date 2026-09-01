import React from "react";
import TextInput from "@digital-science/figshare-fcl/input/text";
import Input from "@digital-science/figshare-fcl/input";

import { Cover } from "../../story-utils/Cover";


export default {
  title: "UI/Inputs/Text",
  component: Input,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <TextInput placeholder="Input text..." onChange={() => undefined} />
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <TextInput theme="default" placeholder="Default theme" />
      <TextInput theme="underline" placeholder="Underline theme" />
      <TextInput theme="default" error={true} placeholder="Default theme - error" />
      <TextInput theme="underline" error={true} placeholder="Underline theme - error" />
      <TextInput theme="default" disabled={true} placeholder="Default theme - disabled" />
      <TextInput theme="underline" disabled={true} placeholder="Underline theme - disabled" />
      <TextInput theme="default" placeholder="untitled" prefix="tb.edu.figshare/" />
    </Cover>
  ),
};
