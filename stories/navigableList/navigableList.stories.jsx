import React from "react";
import NavigableList from "@digital-science/figshare-fcl/helpers/navigableList";

import { Cover } from "../story-utils/Cover";


const containerStyle = {
  margin: "calc(3 * var(--gridSize))",
  padding: "calc(3 * var(--gridSize))",
  display: "flex",
  flexWrap: "wrap",
};

const buttonStyle = { margin: "calc(2 * var(--gridSize))" };

const renderContent = ({ ref, containerStyle: passedContainerStyle, ...passedProps }) => (
  <div ref={ref} style={passedContainerStyle} {...passedProps}>
    <button style={buttonStyle}>Item 1</button>
    <button style={buttonStyle}>Item 2</button>
    <button style={buttonStyle}>Item 3</button>
  </div>
);

const verticalContainerStyle = {
  margin: "calc(3 * var(--gridSize))",
  padding: "calc(3 * var(--gridSize))",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
};

export default {
  title: "UI/NavigableList",
  component: NavigableList,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => {
        const localContainerStyle = {
          margin: "calc(3 * var(--gridSize))",
          padding: "calc(3 * var(--gridSize))",
          display: "flex",
          flexWrap: "wrap",
        };
        const localButtonStyle = { margin: "calc(2 * var(--gridSize))" };
        const localRenderContent = ({ ref, ...passedProps }) => (
          <div ref={ref} style={localContainerStyle} {...passedProps}>
            <button style={localButtonStyle}>Item 1</button>
            <button style={localButtonStyle}>Item 2</button>
            <button style={localButtonStyle}>Item 3</button>
          </div>
        );

        return (
          <NavigableList navigationType="horizontal">
            {localRenderContent}
          </NavigableList>
        );
      }}
    </Cover>
  ),
};

export const HorizontalNavigableList = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <NavigableList navigationType="horizontal" containerStyle={containerStyle}>
        {renderContent}
      </NavigableList>
    </Cover>
  ),
};

export const VerticalNavigableList = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <NavigableList navigationType="vertical" containerStyle={verticalContainerStyle}>
        {renderContent}
      </NavigableList>
    </Cover>
  ),
};
