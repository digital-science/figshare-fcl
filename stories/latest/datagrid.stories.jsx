/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import { DataGrid } from "@digital-science/figshare-fcl/latest/DataGrid";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/latest/DataGrid",
  component: DataGrid,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <DataGrid>
        <DataGrid.Header>
          <DataGrid.Subheader>Name</DataGrid.Subheader>
          <DataGrid.Subheader>Status</DataGrid.Subheader>
          <DataGrid.Subheader>Date</DataGrid.Subheader>
        </DataGrid.Header>
        <DataGrid.Content>
          <DataGrid.Row>
            <DataGrid.Cell>Item 1</DataGrid.Cell>
            <DataGrid.Cell>Active</DataGrid.Cell>
            <DataGrid.Cell>2024-01-15</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row>
            <DataGrid.Cell>Item 2</DataGrid.Cell>
            <DataGrid.Cell>Pending</DataGrid.Cell>
            <DataGrid.Cell>2024-01-14</DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Content>
      </DataGrid>
    </Cover>
  ),
};

export const BasicDataGrid = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <DataGrid>
        <DataGrid.Header>
          <DataGrid.Subheader data-size="s2">ID</DataGrid.Subheader>
          <DataGrid.Subheader data-size="grow">Title</DataGrid.Subheader>
          <DataGrid.Subheader>Status</DataGrid.Subheader>
        </DataGrid.Header>
        <DataGrid.Content>
          <DataGrid.Row>
            <DataGrid.Cell data-size="s2">1</DataGrid.Cell>
            <DataGrid.Cell data-size="grow">Research Paper</DataGrid.Cell>
            <DataGrid.Cell>Published</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row>
            <DataGrid.Cell data-size="s2">2</DataGrid.Cell>
            <DataGrid.Cell data-size="grow">Dataset Analysis</DataGrid.Cell>
            <DataGrid.Cell>In Review</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row>
            <DataGrid.Cell data-size="s2">3</DataGrid.Cell>
            <DataGrid.Cell data-size="grow">Code Repository</DataGrid.Cell>
            <DataGrid.Cell>Draft</DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Content>
      </DataGrid>
    </Cover>
  ),
};

export const CellSizing = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <DataGrid>
        <DataGrid.Header>
          <DataGrid.Subheader data-size="s">S</DataGrid.Subheader>
          <DataGrid.Subheader data-size="s2">S2</DataGrid.Subheader>
          <DataGrid.Subheader data-size="m">M</DataGrid.Subheader>
          <DataGrid.Subheader data-size="grow">Grow</DataGrid.Subheader>
          <DataGrid.Subheader data-size="shrink">Shrink</DataGrid.Subheader>
          <DataGrid.Subheader data-size="normal">Normal</DataGrid.Subheader>
        </DataGrid.Header>
        <DataGrid.Content>
          <DataGrid.Row>
            <DataGrid.Cell data-size="s">#</DataGrid.Cell>
            <DataGrid.Cell data-size="s2">ID</DataGrid.Cell>
            <DataGrid.Cell data-size="m">Status</DataGrid.Cell>
            <DataGrid.Cell data-size="grow">This cell grows to fill available space</DataGrid.Cell>
            <DataGrid.Cell data-size="shrink">Shrinks</DataGrid.Cell>
            <DataGrid.Cell data-size="normal">Normal flex</DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Content>
      </DataGrid>
    </Cover>
  ),
};

export const CellLayout = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <DataGrid>
        <DataGrid.Header>
          <DataGrid.Subheader>Default (flex-start)</DataGrid.Subheader>
          <DataGrid.Subheader data-cell-layout="center">Center</DataGrid.Subheader>
          <DataGrid.Subheader data-cell-layout="flex-end">Flex-end</DataGrid.Subheader>
          <DataGrid.Subheader data-cell-layout="center row">Center Row</DataGrid.Subheader>
        </DataGrid.Header>
        <DataGrid.Content>
          <DataGrid.Row>
            <DataGrid.Cell>Left-aligned</DataGrid.Cell>
            <DataGrid.Cell data-cell-layout="center">Centered</DataGrid.Cell>
            <DataGrid.Cell data-cell-layout="flex-end">Right-aligned</DataGrid.Cell>
            <DataGrid.Cell data-cell-layout="center row">
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Content>
      </DataGrid>
    </Cover>
  ),
};

export const TextAlignment = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <DataGrid>
        <DataGrid.Header>
          <DataGrid.Subheader data-align="left">Left</DataGrid.Subheader>
          <DataGrid.Subheader data-align="center">Center</DataGrid.Subheader>
          <DataGrid.Subheader data-align="right">Right</DataGrid.Subheader>
        </DataGrid.Header>
        <DataGrid.Content>
          <DataGrid.Row>
            <DataGrid.Cell data-align="left">Left-aligned text</DataGrid.Cell>
            <DataGrid.Cell data-align="center">Center-aligned text</DataGrid.Cell>
            <DataGrid.Cell data-align="right">Right-aligned text</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row>
            <DataGrid.Cell data-align="left">Name</DataGrid.Cell>
            <DataGrid.Cell data-align="center">Status</DataGrid.Cell>
            <DataGrid.Cell data-align="right">$1,234.56</DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Content>
      </DataGrid>
    </Cover>
  ),
};

export const DensityModes = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <p style={ { fontSize: "12px", color: "#666", margin: "0 0 8px" } }>Default density</p>
          <DataGrid>
            <DataGrid.Header>
              <DataGrid.Subheader>Name</DataGrid.Subheader>
              <DataGrid.Subheader>Status</DataGrid.Subheader>
            </DataGrid.Header>
            <DataGrid.Content>
              <DataGrid.Row>
                <DataGrid.Cell>Item 1</DataGrid.Cell>
                <DataGrid.Cell>Active</DataGrid.Cell>
              </DataGrid.Row>
              <DataGrid.Row>
                <DataGrid.Cell>Item 2</DataGrid.Cell>
                <DataGrid.Cell>Pending</DataGrid.Cell>
              </DataGrid.Row>
            </DataGrid.Content>
          </DataGrid>
        </div>
        <div>
          <p style={ { fontSize: "12px", color: "#666", margin: "0 0 8px" } }>{"data-cell-padding=\"dense\" — reduced vertical padding"}</p>
          <DataGrid data-cell-padding="dense">
            <DataGrid.Header>
              <DataGrid.Subheader>Name</DataGrid.Subheader>
              <DataGrid.Subheader>Status</DataGrid.Subheader>
            </DataGrid.Header>
            <DataGrid.Content>
              <DataGrid.Row>
                <DataGrid.Cell>Item 1</DataGrid.Cell>
                <DataGrid.Cell>Active</DataGrid.Cell>
              </DataGrid.Row>
              <DataGrid.Row>
                <DataGrid.Cell>Item 2</DataGrid.Cell>
                <DataGrid.Cell>Pending</DataGrid.Cell>
              </DataGrid.Row>
            </DataGrid.Content>
          </DataGrid>
        </div>
        <div>
          <p style={ { fontSize: "12px", color: "#666", margin: "0 0 8px" } }>{"data-cell-padding=\"compact\" — reduced horizontal and vertical padding"}</p>
          <DataGrid data-cell-padding="compact">
            <DataGrid.Header>
              <DataGrid.Subheader>Name</DataGrid.Subheader>
              <DataGrid.Subheader>Status</DataGrid.Subheader>
            </DataGrid.Header>
            <DataGrid.Content>
              <DataGrid.Row>
                <DataGrid.Cell>Item 1</DataGrid.Cell>
                <DataGrid.Cell>Active</DataGrid.Cell>
              </DataGrid.Row>
              <DataGrid.Row>
                <DataGrid.Cell>Item 2</DataGrid.Cell>
                <DataGrid.Cell>Pending</DataGrid.Cell>
              </DataGrid.Row>
            </DataGrid.Content>
          </DataGrid>
        </div>
        <div>
          <p style={ { fontSize: "12px", color: "#666", margin: "0 0 8px" } }>{"data-cell-padding=\"none\" — no padding"}</p>
          <DataGrid data-cell-padding="none">
            <DataGrid.Header>
              <DataGrid.Subheader>Name</DataGrid.Subheader>
              <DataGrid.Subheader>Status</DataGrid.Subheader>
            </DataGrid.Header>
            <DataGrid.Content>
              <DataGrid.Row>
                <DataGrid.Cell>Item 1</DataGrid.Cell>
                <DataGrid.Cell>Active</DataGrid.Cell>
              </DataGrid.Row>
              <DataGrid.Row>
                <DataGrid.Cell>Item 2</DataGrid.Cell>
                <DataGrid.Cell>Pending</DataGrid.Cell>
              </DataGrid.Row>
            </DataGrid.Content>
          </DataGrid>
        </div>
      </div>
    </Cover>
  ),
};

export const HoverAndStriped = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <p style={ { fontSize: "12px", color: "#666", margin: "0 0 8px" } }>{"data-hover=\"true\" — rows highlight on hover"}</p>
          <DataGrid data-hover="true">
            <DataGrid.Header>
              <DataGrid.Subheader>Name</DataGrid.Subheader>
              <DataGrid.Subheader>Type</DataGrid.Subheader>
              <DataGrid.Subheader>Updated</DataGrid.Subheader>
            </DataGrid.Header>
            <DataGrid.Content>
              <DataGrid.Row>
                <DataGrid.Cell>figshare-fcl</DataGrid.Cell>
                <DataGrid.Cell>Component Library</DataGrid.Cell>
                <DataGrid.Cell>Today</DataGrid.Cell>
              </DataGrid.Row>
              <DataGrid.Row>
                <DataGrid.Cell>data-utils</DataGrid.Cell>
                <DataGrid.Cell>Utility Library</DataGrid.Cell>
                <DataGrid.Cell>Yesterday</DataGrid.Cell>
              </DataGrid.Row>
              <DataGrid.Row>
                <DataGrid.Cell>api-client</DataGrid.Cell>
                <DataGrid.Cell>SDK</DataGrid.Cell>
                <DataGrid.Cell>3 days ago</DataGrid.Cell>
              </DataGrid.Row>
            </DataGrid.Content>
          </DataGrid>
        </div>
        <div>
          <p style={ { fontSize: "12px", color: "#666", margin: "0 0 8px" } }>{"data-striped=\"true\" — alternating row backgrounds"}</p>
          <DataGrid data-striped="true">
            <DataGrid.Header>
              <DataGrid.Subheader>Name</DataGrid.Subheader>
              <DataGrid.Subheader>Type</DataGrid.Subheader>
              <DataGrid.Subheader>Updated</DataGrid.Subheader>
            </DataGrid.Header>
            <DataGrid.Content>
              <DataGrid.Row>
                <DataGrid.Cell>figshare-fcl</DataGrid.Cell>
                <DataGrid.Cell>Component Library</DataGrid.Cell>
                <DataGrid.Cell>Today</DataGrid.Cell>
              </DataGrid.Row>
              <DataGrid.Row>
                <DataGrid.Cell>data-utils</DataGrid.Cell>
                <DataGrid.Cell>Utility Library</DataGrid.Cell>
                <DataGrid.Cell>Yesterday</DataGrid.Cell>
              </DataGrid.Row>
              <DataGrid.Row>
                <DataGrid.Cell>api-client</DataGrid.Cell>
                <DataGrid.Cell>SDK</DataGrid.Cell>
                <DataGrid.Cell>3 days ago</DataGrid.Cell>
              </DataGrid.Row>
              <DataGrid.Row>
                <DataGrid.Cell>website-v3</DataGrid.Cell>
                <DataGrid.Cell>Application</DataGrid.Cell>
                <DataGrid.Cell>Last week</DataGrid.Cell>
              </DataGrid.Row>
            </DataGrid.Content>
          </DataGrid>
        </div>
      </div>
    </Cover>
  ),
};

export const TextWrappingAndTruncation = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <DataGrid>
        <DataGrid.Header>
          <DataGrid.Subheader data-size="s2">ID</DataGrid.Subheader>
          <DataGrid.Subheader data-size="grow">Default (nowrap)</DataGrid.Subheader>
          <DataGrid.Subheader data-size="grow">Word wrap</DataGrid.Subheader>
          <DataGrid.Subheader data-size="grow">Truncated</DataGrid.Subheader>
        </DataGrid.Header>
        <DataGrid.Content>
          <DataGrid.Row>
            <DataGrid.Cell data-size="s2">1</DataGrid.Cell>
            <DataGrid.Cell data-size="grow">This is a long text that will not wrap by default and may overflow the cell</DataGrid.Cell>
            <DataGrid.Cell data-size="grow" data-wrap="word">This is a long text that will wrap at word boundaries when it reaches the cell edge</DataGrid.Cell>
            <DataGrid.Cell data-size="grow" data-truncate="true">This is a long text that will be truncated with an ellipsis when it overflows</DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Content>
      </DataGrid>
    </Cover>
  ),
};

export const RootRows = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <DataGrid>
        <DataGrid.Header>
          <DataGrid.Subheader data-size="grow">Name</DataGrid.Subheader>
          <DataGrid.Subheader>Type</DataGrid.Subheader>
          <DataGrid.Subheader>Size</DataGrid.Subheader>
        </DataGrid.Header>
        <DataGrid.Content>
          <DataGrid.Row data-root-row="true">
            <DataGrid.Cell data-size="grow">Documents</DataGrid.Cell>
            <DataGrid.Cell>Folder</DataGrid.Cell>
            <DataGrid.Cell>--</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row>
            <DataGrid.Cell data-size="grow">report.pdf</DataGrid.Cell>
            <DataGrid.Cell>PDF</DataGrid.Cell>
            <DataGrid.Cell>2.4 MB</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row>
            <DataGrid.Cell data-size="grow">data.csv</DataGrid.Cell>
            <DataGrid.Cell>CSV</DataGrid.Cell>
            <DataGrid.Cell>156 KB</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row data-root-row="true">
            <DataGrid.Cell data-size="grow">Images</DataGrid.Cell>
            <DataGrid.Cell>Folder</DataGrid.Cell>
            <DataGrid.Cell>--</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row>
            <DataGrid.Cell data-size="grow">figure1.png</DataGrid.Cell>
            <DataGrid.Cell>PNG</DataGrid.Cell>
            <DataGrid.Cell>890 KB</DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Content>
      </DataGrid>
    </Cover>
  ),
};

export const SelectedCells = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <DataGrid data-hover="true">
        <DataGrid.Header>
          <DataGrid.Subheader data-size="grow">Name</DataGrid.Subheader>
          <DataGrid.Subheader>Status</DataGrid.Subheader>
          <DataGrid.Subheader data-align="right">Actions</DataGrid.Subheader>
        </DataGrid.Header>
        <DataGrid.Content>
          <DataGrid.Row>
            <DataGrid.Cell data-size="grow" data-selected="true">Selected Item</DataGrid.Cell>
            <DataGrid.Cell>Active</DataGrid.Cell>
            <DataGrid.Cell data-align="right">Edit</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row>
            <DataGrid.Cell data-size="grow">Normal Item</DataGrid.Cell>
            <DataGrid.Cell>Pending</DataGrid.Cell>
            <DataGrid.Cell data-align="right">Edit</DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Content>
      </DataGrid>
    </Cover>
  ),
};

export const NoBorder = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <DataGrid data-border="none" data-striped="true">
        <DataGrid.Header>
          <DataGrid.Subheader>Name</DataGrid.Subheader>
          <DataGrid.Subheader>Value</DataGrid.Subheader>
        </DataGrid.Header>
        <DataGrid.Content>
          <DataGrid.Row>
            <DataGrid.Cell>Total items</DataGrid.Cell>
            <DataGrid.Cell>42</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row>
            <DataGrid.Cell>Published</DataGrid.Cell>
            <DataGrid.Cell>38</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row>
            <DataGrid.Cell>Drafts</DataGrid.Cell>
            <DataGrid.Cell>4</DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Content>
      </DataGrid>
    </Cover>
  ),
};

export const DataGridWithSubheader = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <DataGrid>
        <DataGrid.Header>
          <DataGrid.Subheader>Repository</DataGrid.Subheader>
          <DataGrid.Subheader>Type</DataGrid.Subheader>
          <DataGrid.Subheader>Updated</DataGrid.Subheader>
        </DataGrid.Header>
        <DataGrid.Subheader>Showing 1-50 of 150 items</DataGrid.Subheader>
        <DataGrid.Content>
          <DataGrid.Row>
            <DataGrid.Cell>fcl-ui</DataGrid.Cell>
            <DataGrid.Cell>Component Library</DataGrid.Cell>
            <DataGrid.Cell>Today</DataGrid.Cell>
          </DataGrid.Row>
          <DataGrid.Row>
            <DataGrid.Cell>data-utils</DataGrid.Cell>
            <DataGrid.Cell>Utility Library</DataGrid.Cell>
            <DataGrid.Cell>Yesterday</DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Content>
      </DataGrid>
    </Cover>
  ),
};
