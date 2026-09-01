import React from "react";
import PasswordInput from "@digital-science/figshare-fcl/input/password";

import { Cover } from "../../story-utils/Cover";


export default {
  title: "UI/Inputs/Password",
  component: PasswordInput,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <PasswordInput onChange={() => undefined} />
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <PasswordInput type="password" theme="default" placeholder="Default theme" onChange={() => undefined} />
      <PasswordInput type="password" theme="underline" placeholder="Underline theme" onChange={() => undefined} />
      <PasswordInput type="password" theme="default" error={true} placeholder="Default theme - error" onChange={() => undefined} />
      <PasswordInput type="password" theme="underline" error={true} placeholder="Underline theme - error" onChange={() => undefined} />
      <PasswordInput type="password" theme="default" disabled={true} placeholder="Default theme - disabled" onChange={() => undefined} />
      <PasswordInput type="password" theme="underline" disabled={true} placeholder="Underline theme - disabled" onChange={() => undefined} />
    </Cover>
  ),
};
