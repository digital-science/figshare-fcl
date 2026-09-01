import React from "react";
import { Block } from "@digital-science/figshare-fcl/latest/Block";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/latest/Block",
  component: Block,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
        <Block style={ { padding: "16px", border: "1px solid #e0e0e0", borderRadius: "4px" } }>
          Default Block
        </Block>
        <Block kind="layout-columns" style={ { display: "flex", gap: "12px", padding: "16px", border: "1px solid #e0e0e0", borderRadius: "4px" } }>
          <div style={ { flex: 1, background: "#f5f5f5", padding: "8px" } }>Column 1</div>
          <div style={ { flex: 1, background: "#f5f5f5", padding: "8px" } }>Column 2</div>
        </Block>
      </div>
    </Cover>
  ),
};

export const LayoutKinds = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "16px" } }>
        <div>
          <h4>layout-rows (default)</h4>
          <Block kind="layout-rows" style={ { padding: "16px", border: "1px solid #e0e0e0", borderRadius: "4px" } }>
            <div style={ { padding: "8px", background: "#f5f5f5", marginBottom: "8px" } }>Row 1</div>
            <div style={ { padding: "8px", background: "#f5f5f5" } }>Row 2</div>
          </Block>
        </div>
        <div>
          <h4>layout-columns</h4>
          <Block kind="layout-columns" style={ { display: "flex", gap: "12px", padding: "16px", border: "1px solid #e0e0e0", borderRadius: "4px" } }>
            <div style={ { flex: 1, padding: "8px", background: "#f5f5f5" } }>Column 1</div>
            <div style={ { flex: 1, padding: "8px", background: "#f5f5f5" } }>Column 2</div>
            <div style={ { flex: 1, padding: "8px", background: "#f5f5f5" } }>Column 3</div>
          </Block>
        </div>
      </div>
    </Cover>
  ),
};

export const CustomHTMLTags = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "16px" } }>
        <div>
          <h4>Rendered as Section</h4>
          <Block tag="section" style={ { padding: "16px", border: "1px solid #e0e0e0", borderRadius: "4px" } }>
            This block is rendered as a &lt;section&gt; tag
          </Block>
        </div>
        <div>
          <h4>Rendered as Article</h4>
          <Block tag="article" style={ { padding: "16px", border: "1px solid #e0e0e0", borderRadius: "4px" } }>
            This block is rendered as an &lt;article&gt; tag
          </Block>
        </div>
        <div>
          <h4>Rendered as Main</h4>
          <Block tag="main" style={ { padding: "16px", border: "1px solid #e0e0e0", borderRadius: "4px" } }>
            This block is rendered as a &lt;main&gt; tag
          </Block>
        </div>
      </div>
    </Cover>
  ),
};

export const BlockWithMark = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "24px", padding: "16px" } }>
        <div>
          <h4>Marked Blocks</h4>
          <Block mark="header" style={ { padding: "16px", background: "#f5f5f5", marginBottom: "8px", borderRadius: "4px" } }>
            Header Block (id: header)
          </Block>
          <Block mark="content" style={ { padding: "16px", background: "#fafafa", marginBottom: "8px", borderRadius: "4px" } }>
            Content Block (id: content)
          </Block>
          <Block mark="footer" style={ { padding: "16px", background: "#f5f5f5", borderRadius: "4px" } }>
            Footer Block (id: footer)
          </Block>
        </div>
      </div>
    </Cover>
  ),
};
