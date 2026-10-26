import React from "react";

import { Select, Option } from "../../packages/ui/select";
import { Cover } from "../story-utils/Cover";
import { ValueProvider } from "../story-utils/ValueProvider";


const options = Array.from({ length: 8 }, (_, i) => `Option ${i + 1}`);

export default {
  title: "UI/Select",
  component: Select,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <ValueProvider initialValue={undefined}>
        {(value, setValue) => (
          <div style={ { display: "flex", flexDirection: "column", gap: "15px", maxWidth: "300px" } }>
            <Select value={value} onChange={setValue}>
              {options.map((option) => (
                <Option key={option} value={option}>{option}</Option>
              ))}
            </Select>
          </div>
        )}
      </ValueProvider>
    </Cover>
  ),
};

export const KindAndEmVariants = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "15px", maxWidth: "300px" } }>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Input / Low (default)</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select kind="input" em="low" value={value} onChange={setValue}>
                {options.map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Secondary / Low</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select kind="secondary" em="low" value={value} onChange={setValue}>
                {options.map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Secondary / High</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select kind="secondary" em="high" value={value} onChange={setValue}>
                {options.map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Tertiary / Low</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select kind="tertiary" em="low" value={value} onChange={setValue}>
                {options.map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Tertiary / High</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select kind="tertiary" em="high" value={value} onChange={setValue}>
                {options.map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Primary / High</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select kind="primary" em="high" value={value} onChange={setValue}>
                {options.map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
      </div>
    </Cover>
  ),
};

export const DisabledSelect = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "15px", maxWidth: "300px" } }>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Disabled (empty)</b>
          <Select disabled={true}>
            {options.map((option) => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Disabled (with value)</b>
          <Select disabled={true} value="Option 3">
            {options.map((option) => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        </div>
      </div>
    </Cover>
  ),
};

export const DisabledOptions = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "15px", maxWidth: "300px" } }>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Single select — some options disabled</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select value={value} onChange={setValue}>
                <Option value="Option 1">Option 1</Option>
                <Option disabled={true} value="Option 2">Option 2 (disabled)</Option>
                <Option value="Option 3">Option 3</Option>
                <Option disabled={true} value="Option 4">Option 4 (disabled)</Option>
                <Option value="Option 5">Option 5</Option>
              </Select>
            )}
          </ValueProvider>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Multi select — some options disabled</b>
          <ValueProvider initialValue={["Option 2"]}>
            {(value, setValue) => (
              <Select multiple={true} value={value} onChange={setValue}>
                <Option value="Option 1">Option 1</Option>
                <Option disabled={true} value="Option 2">Option 2 (disabled, pre-selected)</Option>
                <Option value="Option 3">Option 3</Option>
                <Option disabled={true} value="Option 4">Option 4 (disabled)</Option>
                <Option value="Option 5">Option 5</Option>
              </Select>
            )}
          </ValueProvider>
        </div>
      </div>
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "15px", maxWidth: "300px" } }>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Loading state</b>
          <Select loading={true} />
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Error state</b>
          <Select loadingErrorMessage="Ops! something when wrong" />
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Searchable - tertiary</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select searchable={true} kind="tertiary" value={value} onChange={setValue}>
                {options.map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Searchable - custom placeholder</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select
                searchPlaceholder="Filter your dropdown..."
                searchable={true}
                value={value}
                onChange={setValue}
              >
                {options.slice(0, 4).map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Multiple</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select multiple={true} searchable={true} value={value} onChange={setValue}>
                {options.slice(0, 5).map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Small</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select size="S" value={value} onChange={setValue}>
                {options.slice(0, 5).map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Medium</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select size="M" value={value} onChange={setValue}>
                {options.slice(0, 5).map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: "5px" } }>
          <b>Large</b>
          <ValueProvider initialValue={undefined}>
            {(value, setValue) => (
              <Select size="L" value={value} onChange={setValue}>
                {options.slice(0, 5).map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          </ValueProvider>
        </div>
      </div>
    </Cover>
  ),
};
