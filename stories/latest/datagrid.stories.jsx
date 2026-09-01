import React from "react";
import { DataGrid, DataGridHeader, DataGridSubheader, DataGridContent, DataGridRow } from "@digital-science/figshare-fcl/latest/DataGrid";

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
        <DataGridHeader>
          <DataGridRow style={ { fontWeight: "bold", padding: "12px", borderBottom: "1px solid #e0e0e0" } }>
            <div style={ { flex: 1 } }>Name</div>
            <div style={ { flex: 1 } }>Status</div>
            <div style={ { flex: 1 } }>Date</div>
          </DataGridRow>
        </DataGridHeader>
        <DataGridContent>
          <DataGridRow style={ { padding: "12px", borderBottom: "1px solid #f0f0f0" } }>
            <div style={ { flex: 1 } }>Item 1</div>
            <div style={ { flex: 1 } }>Active</div>
            <div style={ { flex: 1 } }>2024-01-15</div>
          </DataGridRow>
          <DataGridRow style={ { padding: "12px" } }>
            <div style={ { flex: 1 } }>Item 2</div>
            <div style={ { flex: 1 } }>Pending</div>
            <div style={ { flex: 1 } }>2024-01-14</div>
          </DataGridRow>
        </DataGridContent>
      </DataGrid>
    </Cover>
  ),
};

export const BasicDataGrid = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "16px" } }>
        <div>
          <h4>Simple Data Table</h4>
          <DataGrid>
            <DataGridHeader>
              <DataGridRow style={ { fontWeight: "bold", padding: "12px", background: "#f5f5f5", borderBottom: "2px solid #e0e0e0" } }>
                <div style={ { flex: 1 } }>ID</div>
                <div style={ { flex: 2 } }>Title</div>
                <div style={ { flex: 1 } }>Status</div>
              </DataGridRow>
            </DataGridHeader>
            <DataGridContent>
              <DataGridRow style={ { padding: "12px", borderBottom: "1px solid #f0f0f0" } }>
                <div style={ { flex: 1 } }>1</div>
                <div style={ { flex: 2 } }>Research Paper</div>
                <div style={ { flex: 1 } }>Published</div>
              </DataGridRow>
              <DataGridRow style={ { padding: "12px", borderBottom: "1px solid #f0f0f0" } }>
                <div style={ { flex: 1 } }>2</div>
                <div style={ { flex: 2 } }>Dataset Analysis</div>
                <div style={ { flex: 1 } }>In Review</div>
              </DataGridRow>
              <DataGridRow style={ { padding: "12px" } }>
                <div style={ { flex: 1 } }>3</div>
                <div style={ { flex: 2 } }>Code Repository</div>
                <div style={ { flex: 1 } }>Draft</div>
              </DataGridRow>
            </DataGridContent>
          </DataGrid>
        </div>
      </div>
    </Cover>
  ),
};

export const DataGridWithSubheader = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "16px" } }>
        <div>
          <h4>With Subheader</h4>
          <DataGrid>
            <DataGridHeader>
              <DataGridRow style={ { fontWeight: "bold", padding: "12px", background: "#f5f5f5", borderBottom: "1px solid #e0e0e0" } }>
                <div style={ { flex: 1 } }>Repository</div>
                <div style={ { flex: 1 } }>Type</div>
                <div style={ { flex: 1 } }>Updated</div>
              </DataGridRow>
            </DataGridHeader>
            <DataGridSubheader>
              <DataGridRow style={ { padding: "8px 12px", background: "#fafafa", fontSize: "12px", color: "#666" } }>
                <div style={ { flex: 3 } }>Showing 1-50 of 150 items</div>
              </DataGridRow>
            </DataGridSubheader>
            <DataGridContent>
              <DataGridRow style={ { padding: "12px", borderBottom: "1px solid #f0f0f0" } }>
                <div style={ { flex: 1 } }>fcl-ui</div>
                <div style={ { flex: 1 } }>Component Library</div>
                <div style={ { flex: 1 } }>Today</div>
              </DataGridRow>
              <DataGridRow style={ { padding: "12px" } }>
                <div style={ { flex: 1 } }>data-utils</div>
                <div style={ { flex: 1 } }>Utility Library</div>
                <div style={ { flex: 1 } }>Yesterday</div>
              </DataGridRow>
            </DataGridContent>
          </DataGrid>
        </div>
      </div>
    </Cover>
  ),
};
