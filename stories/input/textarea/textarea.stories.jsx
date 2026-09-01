import React, { useState, useCallback } from "react";
import Textarea from "@digital-science/figshare-fcl/textarea";

import { Cover } from "../../story-utils/Cover";


const ControlledTextarea = (props) => {
  const [value, setValue] = useState("");
  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, [setValue]);

  return (<Textarea {...props} value={value} onChange={onChange} />);
};

export default {
  title: "UI/Inputs/Textarea",
  component: Textarea,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => {
        const [value, setValue] = useState("");
        const onChange = useCallback((event) => {
          setValue(event.target.value);
        }, [setValue]);

        return (<Textarea placeholder="Input text..." value={value} onChange={onChange} />);
      }}
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <ControlledTextarea theme="default" placeholder="Default theme" />
      <ControlledTextarea theme="underline" placeholder="Underline theme" />
      <ControlledTextarea theme="default" error={true} placeholder="Default theme - error" />
      <ControlledTextarea theme="underline" error={true} placeholder="Underline theme - error" />
      <ControlledTextarea theme="default" disabled={true} placeholder="Default theme - disabled" />
      <ControlledTextarea theme="underline" disabled={true} placeholder="Underline theme - disabled" />
    </Cover>
  ),
};
