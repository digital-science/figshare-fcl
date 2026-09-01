import React, { useState, useCallback } from "react";
import { Tabs } from "@digital-science/figshare-fcl/tabs";
import { Button } from "@digital-science/figshare-fcl/button";
import Edit from "@digital-science/figshare-fcl/icons/react/Edit";

import { Cover } from "../story-utils/Cover";


const tab = "map";
const onTab = () => undefined;

export default {
  title: "UI/Tabs",
  component: Tabs,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => {
        const [activeTab, setActiveTab] = useState("map");
        const onClickTab = useCallback((e) => {
          setActiveTab(e.target.getAttribute("data-value"));
        }, [setActiveTab]);

        return (
          <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
            <Tabs.List>
              <Tabs.Tab active={activeTab === "map"} value="map" onClick={onClickTab}>Map</Tabs.Tab>
              <Tabs.Tab active={activeTab === "features"} value="features" onClick={onClickTab}>Features</Tabs.Tab>
              <Tabs.Tab active={activeTab === "geojson"} value="geojson" onClick={onClickTab}>GeoJSON</Tabs.Tab>
              <Tabs.Tab active={activeTab === "metadata"} value="metadata" onClick={onClickTab}>Metadata</Tabs.Tab>
              <Tabs.Tab active={activeTab === "global"} value="global" onClick={onClickTab}>Global</Tabs.Tab>
              <Tabs.Tab active={activeTab === "related-materials"} value="related-materials" onClick={onClickTab}>Related Materials</Tabs.Tab>
              <Tabs.Tab active={activeTab === "editor"} value="editor" disabled={true} onClick={onClickTab}>Editor</Tabs.Tab>
              <Button style={ { marginLeft: "auto" } } Icon={Edit} theme="tertiaryAlt">Edit</Button>
            </Tabs.List>
            <Tabs.Panel value={activeTab}>
              <Tabs.Entry value="map">
                {() => (<div data-part="map" data-scope="geospatial">
                  Map Tab
                </div>)}</Tabs.Entry>
              <Tabs.Entry value="features">{() => (<div data-part="features" data-scope="geospatial">
                Features Tab
              </div>)}</Tabs.Entry>
              <Tabs.Entry value="geojson">{() => (<div data-part="geojson" data-scope="geospatial">
                GeoJSON Tab
              </div>)}</Tabs.Entry>
              <Tabs.Entry value="metadata">{() => (<div data-part="metadata" data-scope="administration">
                Metadata Tab
              </div>)}</Tabs.Entry>
              <Tabs.Entry value="global">{() => (<div data-part="global" data-scope="administration">
                Global Tab
              </div>)}</Tabs.Entry>
              <Tabs.Entry value="related-materials">{() => (<div data-part="related-materials" data-scope="administration">
                Related Materials Tab
              </div>)}</Tabs.Entry>
            </Tabs.Panel>
          </div>
        )
      }}
    </Cover>
  ),
};

export const WithoutManagedState = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
        <Tabs>
          <Tabs.List>
            <Tabs.Tab value="one">One</Tabs.Tab>
            <Tabs.Tab value="two">Two</Tabs.Tab>
            <Tabs.Tab value="three">Three</Tabs.Tab>
            <Tabs.Tab value="four" disabled={true}>Four (Disabled)</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel>
            <Tabs.Entry value="one">
              <div>Content for one</div>
            </Tabs.Entry>
            <Tabs.Entry value="two">
              <div>Content for two</div>
            </Tabs.Entry>
            <Tabs.Entry value="three">
              <div>Content for three</div>
            </Tabs.Entry>
          </Tabs.Panel>
        </Tabs>
      </div>
    </Cover>
  ),
};

export const WithDefaultValueAndOnChange = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
        <Tabs defaultValue={"Groups"} onChange={() => undefined}>
          <Tabs.List>
            <Tabs.Tab value="General">General</Tabs.Tab>
            <Tabs.Tab value="Metadata">Metadata</Tabs.Tab>
            <Tabs.Tab value="Groups">Groups</Tabs.Tab>
            <Tabs.Tab value="Feed" disabled={true}>Feed</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel>
            <Tabs.Entry value="General">
              <div>Content for General</div>
            </Tabs.Entry>
            <Tabs.Entry value="Metadata">
              <div>Content for Metadata</div>
            </Tabs.Entry>
            <Tabs.Entry value="Groups">
              <div>Content for Groups</div>
            </Tabs.Entry>
            <Tabs.Entry value="Feed">
              <div>Content for Feed</div>
            </Tabs.Entry>
          </Tabs.Panel>
        </Tabs>
      </div>
    </Cover>
  ),
};

export const FullyManagedState = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {/*
        const [tab, setTab] = useState("map");
        const onTab = useCallback((newTab) => setTab(newTab), []);
      */}
      <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
        <Tabs value={tab} onChange={onTab}>
          <Tabs.List>
            <Tabs.Tab value="map">Map</Tabs.Tab>
            <Tabs.Tab value="features">Features</Tabs.Tab>
            <Tabs.Tab value="editor">Editor</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel>
            <Tabs.Entry value="map">
              <div>Content for Map</div>
            </Tabs.Entry>
            <Tabs.Entry value="features">
              <div>Content for Features</div>
            </Tabs.Entry>
            <Tabs.Entry value="editor">
              <div>Content for Editor</div>
            </Tabs.Entry>
          </Tabs.Panel>
        </Tabs>
      </div>
    </Cover>
  ),
};

export const WithoutRootComponent = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {/*
        const [tab, setTab] = useState("map");
        const onTab = useCallback((event) => setTab(event.target.getAttribute("data-value")), []);
      */}
      <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
        <Tabs.List>
          <Tabs.Tab active={tab === "map"} value="map" onClick={onTab}>Map</Tabs.Tab>
          <Tabs.Tab active={tab === "features"} value="features" onClick={onTab}>Features</Tabs.Tab>
          <Tabs.Tab active={tab === "editor"} value="editor" onClick={onTab}>Editor</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={tab}>
          <Tabs.Entry value="map">
            <div>Content for Map</div>
          </Tabs.Entry>
          <Tabs.Entry value="features">
            <div>Content for Features</div>
          </Tabs.Entry>
          <Tabs.Entry value="editor">
            <div>Content for Editor</div>
          </Tabs.Entry>
        </Tabs.Panel>
      </div>
    </Cover>
  ),
};
