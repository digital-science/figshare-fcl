import React, { useState, useCallback } from "react";
import Radio from "@digital-science/figshare-fcl/input/radio";
import { Button } from "@digital-science/figshare-fcl/button";
import { Fieldset, Legend, Items } from "@digital-science/figshare-fcl/fieldset";
import Input from "@digital-science/figshare-fcl/input";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/Fieldset",
  component: Fieldset,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => {
        const items = [
          { name: "radio-group", value: "1", label: "Option" },
          { name: "radio-group", value: "2", label: "Option - Disabled", disabled: true },
          { name: "radio-group", value: "3", label: "Option - Error", error: true },
          { name: "radio-group", value: "4", label: "Option label with a large character count" },
        ]
        const [selectedOption, setSelectedOption] = useState(null);
        const [legendType, setLegendType] = useState("primary");
        const [alignment, setAlignment] = useState("vertical");
        const handleOptionChange = useCallback((event) => {
          const { value } = event.target;
          setSelectedOption(value);
        }, []);
        const isChecked = (value) => {
          if (value === selectedOption) {
            return true;
          }

          return false;
        };

        return (
          <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
            <Fieldset>
              <Fieldset.Legend type={legendType}>A group of radios</Fieldset.Legend>
              <Fieldset.Items alignment={alignment}>
                {items.map((item) => (
                  <Input
                    key={`${item.name}-${item.value}`}
                    checked={isChecked(item.value)}
                    disabled={item.disabled}
                    error={item.error}
                    label={item.label}
                    value={item.value}
                    type="radio"
                    onChange={handleOptionChange}
                  />
                ))}
              </Fieldset.Items>
            </Fieldset>
            <div>
              <h4>Legend Type:</h4>
              <div>
                <Button disabled={legendType === "primary"} onClick={() => setLegendType("primary")}>Primary</Button>
                <Button disabled={legendType === "secondary"} onClick={() => setLegendType("secondary")}>Secondary</Button>
                <Button disabled={legendType === "tertiary"} onClick={() => setLegendType("tertiary")}>Tertiary</Button>
                <Button disabled={legendType === "hidden"} onClick={() => setLegendType("hidden")}>Hidden (default)</Button>
              </div>
            </div>
            <div>
              <h4>Items alignment:</h4>
              <div>
                <Button disabled={alignment === "vertical"} onClick={() => setAlignment("vertical")}>Vertical (default)</Button>
                <Button disabled={alignment === "horizontal"} onClick={() => setAlignment("horizontal")}>Horizontal</Button>
              </div>
            </div>
          </div>
        )
      }}
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "18px" } }>
        <Fieldset>
          <Legend type="primary">
            Legend text (primary label style)
          </Legend>
          <Items alignment="vertical">
            <Radio name="examples-radio-set-one-1" checked={false} label={"Option"} value={"1"} />
            <Radio name="examples-radio-set-one-2" checked={true} label={"Option Two"} value={"2"} />
          </Items>
        </Fieldset>
        <Fieldset>
          <Legend type="secondary">
            Legend text (secondary label style)
          </Legend>
          <Items alignment="horizontal">
            <Radio name="examples-radio-set-one-1" checked={false} label={"Option"} value={"1"} />
            <Radio name="examples-radio-set-one-2" checked={true} label={"Option Two"} value={"2"} />
          </Items>
        </Fieldset>
        <Fieldset>
          <Fieldset.Legend type="tertiary">
            Legend text (tertiary label style)
          </Fieldset.Legend>
          <Fieldset.Items alignment="horizontal">
            <Radio name="examples-radio-set-one-1" checked={false} label={"Option"} value={"1"} />
            <Radio name="examples-radio-set-one-2" checked={true} label={"Option Two"} value={"2"} />
          </Fieldset.Items>
        </Fieldset>
        <Fieldset>
          <Legend>
            Visually hidden legend
          </Legend>
          <Items>
            This fieldset has a legend but it is visually hidden.
            <Radio name="examples-radio-set-one-1" checked={false} label={"Option"} value={"1"} />
            <Radio name="examples-radio-set-one-2" checked={true} label={"Option Two"} value={"2"} />
          </Items>
        </Fieldset>
      </div>
    </Cover>
  ),
};
