import React, { useState, useCallback } from "react";
import Checkbox from "@digital-science/figshare-fcl/input/checkbox";

import { Cover } from "../../story-utils/Cover";


export default {
  title: "UI/Inputs/Checkbox",
  component: Checkbox,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => {
        const [checks, setChecks] = useState({
          one: false,
          two: true,
          three: false,
          four: false,
        });
        const handleChange = useCallback((event) => {
          const { id, checked } = event.target;
          setChecks((c) => {
            return { ...c, [id]: checked }
          })
        }, [setChecks]);

        return (
          <>
            <Checkbox id="one" checked={checks.one} onChange={handleChange} />
            <Checkbox id="one" checked={checks.one} error={true} onChange={handleChange} />
            <Checkbox id="two" theme={"primary"} checked={true} >Labeled: Primary theme</Checkbox>
            <Checkbox id="two" theme={"secondary"} checked={true} >Labeled: Secondary theme</Checkbox>
            <Checkbox id="two" checked={checks.two} onChange={handleChange}>Labeled: {checks.two ? "Checked" : "Unchecked"}</Checkbox>
            <br />
            <Checkbox indeterminate={true} id="indeterminate-one" />
            <Checkbox indeterminate={true} id="indeterminate-two">Labeled: Indeterminate</Checkbox>
            <br />
            <Checkbox variant="switch" id="three" checked={checks.three} onChange={handleChange} />
            <Checkbox variant="switch" id="four" checked={checks.four} onChange={handleChange}>Labeled: {checks.four ? "Checked" : "Unchecked"}</Checkbox>
          </>
        )
      }}
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", alignItems: "center", gap: "18px" } }>
        <Checkbox id="one" checked={false} onChange={() => undefined} />
        <Checkbox id="two" checked={true} onChange={() => undefined} >Labeled</Checkbox>
        <br />
        <Checkbox indeterminate={true} id="indeterminate-one" />
        <Checkbox indeterminate={true} id="indeterminate-two">Labeled: Indeterminate</Checkbox>
        <br />
        <Checkbox variant="switch" id="three" checked={false} onChange={() => undefined} />
        <Checkbox variant="switch" id="four" checked={true} onChange={() => undefined} >Labeled</Checkbox>
      </div>
    </Cover>
  ),
};
