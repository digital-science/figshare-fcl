import React from "react";
import { SearchInput } from "@digital-science/figshare-fcl/latest/SearchInput";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/latest/SearchInput",
  component: SearchInput,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <div style={ { width: "100%", maxWidth: "400px" } }>
        <SearchInput
          placeholder="Search..."
          // eslint-disable-next-line no-console
          onChange={(e) => console.log(e.value)}
          // eslint-disable-next-line no-console
          onSubmit={(e) => console.log("Search:", e.value)}
        />
      </div>
    </Cover>
  ),
};

export const BasicSearchInput = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Default</h4>
          <div style={ { width: "100%", maxWidth: "400px" } }>
            <SearchInput placeholder="Search..." />
          </div>
        </div>
        <div>
          <h4>With Default Value</h4>
          <div style={ { width: "100%", maxWidth: "400px" } }>
            <SearchInput defaultValue="react" placeholder="Search..." />
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const ControlledSearchInput = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => {
        const [value, setValue] = React.useState("");

        return (
          <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
            <h4>Controlled Component</h4>
            <div style={ { width: "100%", maxWidth: "400px" } }>
              <SearchInput
                value={value}
                setValue={setValue}
                placeholder="Type to search..."
              />
            </div>
            <p>Current value: <strong>{value || "(empty)"}</strong></p>
          </div>
        );
      }}
    </Cover>
  ),
};

export const SearchInputWithCallbacks = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
        <h4>With onChange and onSubmit Handlers</h4>
        <div style={ { width: "100%", maxWidth: "400px" } }>
          <SearchInput
            placeholder="Search and press Enter..."
            // eslint-disable-next-line no-console
            onChange={(e) => console.log("Change:", e.value)}
            // eslint-disable-next-line no-console
            onSubmit={(e) => console.log("Submit:", e.value)}
          />
        </div>
        <p style={ { fontSize: "12px", color: "gray" } }>Check browser console for events</p>
      </div>
    </Cover>
  ),
};

export const SearchInputFeatures = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => {
        const [searchValue, setSearchValue] = React.useState("example search");

        return (
          <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
            <div>
              <h4>Clear Button Appears When Input Has Value</h4>
              <div style={ { width: "100%", maxWidth: "400px" } }>
                <SearchInput
                  value={searchValue}
                  setValue={setSearchValue}
                  placeholder="Search with clear button..."
                />
              </div>
              <p style={ { fontSize: "12px", color: "gray" } }>
                Click the clear button to reset the search
              </p>
            </div>
            <div>
              <h4>Empty SearchInput</h4>
              <div style={ { width: "100%", maxWidth: "400px" } }>
                <SearchInput placeholder="Clear button only appears when typing..." />
              </div>
            </div>
          </div>
        );
      }}
    </Cover>
  ),
};
