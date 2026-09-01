import React from "react";

import { Select, Option } from "../../packages/ui/select";
import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/Select",
  component: Select,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "15px" } }>
        <Select>
          {Array.from({ length: 10 }, (_, i) => `Option ${i + 1}`).map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </div>
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "15px" } }>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Loading state</b>
          <Select loading={true} />
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Error state</b>
          <Select loadingErrorMessage="Ops! something when wrong" />
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Searchable - inline</b>
          <Select infiniteLoading={true} searchable={true} variant="inline" >
            {Array.from({ length: 10 }, (_, i) => `Option ${i + 1}`).map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Searchable - custom placeholder</b>
          <Select
            searchPlaceholder="Filter your dropdown..."
            searchable={true}
          >
            {Array.from({ length: 4 }, (_, i) => `Option ${i + 1}`).map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div><div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Multiple</b>
          <Select multiple={true} searchable={true}>
            {Array.from({ length: 5 }, (_, i) => `Option ${i + 1}`).map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Small</b>
          <Select size="S" >
            {Array.from({ length: 5 }, (_, i) => `Option ${i + 1}`).map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Medium</b>
          <Select size="M">
            {Array.from({ length: 5 }, (_, i) => `Option ${i + 1}`).map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Large</b>
          <Select infiniteLoading={true} size="L">
            {Array.from({ length: 5 }, (_, i) => `Option ${i + 1}`).map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </Cover>
  ),
};
