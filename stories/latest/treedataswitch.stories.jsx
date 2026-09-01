import React from "react";
import { TreeDataSwitch } from "@digital-science/figshare-fcl/latest/TreeDataSwitch";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/latest/TreeDataSwitch",
  component: TreeDataSwitch,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const BasicTreeDataSwitch = {
  render: () => (
    <Cover kind={"card"}>
      {() => {
        const treeData = {
          children: ["1", "2"],
          nodes: {
            "1": {
              id: "1",
              level: 0,
              path: ["1"],
              datum: { name: "Parent Item 1" },
              state: { expanded: true, checked: false, disabled: false },
              children: ["1-1", "1-2"],
              nodes: {
                "1-1": {
                  id: "1-1",
                  level: 1,
                  path: ["1", "1-1"],
                  datum: { name: "Child Item 1-1" },
                  state: { expanded: false, checked: false, disabled: false },
                  children: [],
                  nodes: {},
                  metadata: {},
                },
                "1-2": {
                  id: "1-2",
                  level: 1,
                  path: ["1", "1-2"],
                  datum: { name: "Child Item 1-2" },
                  state: { expanded: false, checked: false, disabled: false },
                  children: [],
                  nodes: {},
                  metadata: {},
                },
              },
              metadata: {},
            },
            "2": {
              id: "2",
              level: 0,
              path: ["2"],
              datum: { name: "Parent Item 2" },
              state: { expanded: false, checked: false, disabled: false },
              children: [],
              nodes: {},
              metadata: {},
            },
          },
        };

        const [tree, setTree] = React.useState(treeData);

        const handleChange = ({ tree: newTree }) => {
          setTree({ ...newTree });
        };

        return (
          <div style={ { padding: "16px" } }>
            <h4>Interactive Tree</h4>
            <TreeDataSwitch
              name="items"
              tree={tree}
              searchPlaceholder="Search items..."
              noSearchResultsMessage="No matching items found"
              onChange={handleChange}
            />
          </div>
        );
      }}
    </Cover>
  ),
};

export const TreeDataSwitchFeatures = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "16px" } }>
        <div>
          <h4>Key Features</h4>
          <ul style={ { lineHeight: "1.8", color: "#333" } }>
            <li><strong>Hierarchical Display:</strong> Shows nested tree structure with expand/collapse functionality</li>
            <li><strong>Search:</strong> Filter items by name (minimum 3 characters)</li>
            <li><strong>Checkboxes:</strong> Toggle item states with switch-style checkboxes</li>
            <li><strong>Read-only Mode:</strong> Display items as tags without interaction</li>
            <li><strong>Custom Actions:</strong> Render custom actions per item</li>
            <li><strong>Bulk Actions:</strong> Support for bulk operations across multiple items</li>
            <li><strong>Tooltips:</strong> Optional tooltips on items</li>
          </ul>
        </div>
        <div>
          <h4>Disabled Items</h4>
          <p style={ { color: "#666" } }>Items can be disabled to prevent user interaction</p>
        </div>
      </div>
    </Cover>
  ),
};

export const ReadOnlyMode = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => {
        const readOnlyTreeData = {
          children: ["1"],
          nodes: {
            "1": {
              id: "1",
              level: 0,
              path: ["1"],
              datum: { name: "Read-only Item" },
              state: { expanded: true, checked: true, disabled: false },
              children: [],
              nodes: {},
              metadata: {},
            },
          },
        };

        return (
          <div style={ { padding: "16px" } }>
            <h4>Read-only Tree (Display Only)</h4>
            <TreeDataSwitch
              name="readonly-items"
              tree={readOnlyTreeData}
              readOnly={true}
              searchPlaceholder="Search..."
              noSearchResultsMessage="No results"
              onChange={() => undefined}
            />
          </div>
        );
      }}
    </Cover>
  ),
};
