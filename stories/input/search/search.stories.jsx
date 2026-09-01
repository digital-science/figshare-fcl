import React, { useState, useCallback } from "react";
import SearchInput from "@digital-science/figshare-fcl/input/search";

import { Cover } from "../../story-utils/Cover";


export default {
  title: "UI/Inputs/Search",
  component: SearchInput,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => {
        const [query, setQuery] = useState("");
        const onChange = useCallback((event) => {
          setQuery(event.target.value);
        }, []);
        const onSubmit = useCallback((event) => {
          event.preventDefault();
          event.stopPropagation();
        }, []);

        return <SearchInput id="searchQuery" placeholder="Search..." value={query} onChange={onChange} onSubmit={onSubmit} />
      }}
    </Cover>
  ),
};

export const ExamplesSmall = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <SearchInput size="S" theme="default" placeholder="Default theme" />
      <SearchInput size="S" theme="underline" placeholder="Underline theme" />
      <SearchInput size="S" theme="default" error={true} placeholder="Default theme - error" />
      <SearchInput size="S" theme="underline" error={true} placeholder="Underline theme - error" />
      <SearchInput size="S" theme="default" disabled={true} placeholder="Default theme - disabled" />
      <SearchInput size="S" theme="underline" disabled={true} placeholder="Underline theme - disabled" />
    </Cover>
  ),
};

export const ExamplesLarge = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <SearchInput size="L" theme="default" placeholder="Default theme" />
      <SearchInput size="L" theme="underline" placeholder="Underline theme" />
      <SearchInput size="L" theme="default" error={true} placeholder="Default theme - error" />
      <SearchInput size="L" theme="underline" error={true} placeholder="Underline theme - error" />
      <SearchInput size="L" theme="default" disabled={true} placeholder="Default theme - disabled" />
      <SearchInput size="L" theme="underline" disabled={true} placeholder="Underline theme - disabled" />
    </Cover>
  ),
};
