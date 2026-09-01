import React, { useState } from "react";
import { Button } from "@digital-science/figshare-fcl/button";
import Editor from "@digital-science/figshare-fcl/textEditor/Lexical";

import { Cover } from "../../story-utils/Cover";


const canvasStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "16px",
};

export default {
  title: "UI/Inputs/TextEditor",
  component: Editor,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => {
        const [text, setText] = useState("<h2>My list</h2><ol><li>Two</li><li>Three</li></ol>");
        const [singleRow, setSingleRow] = useState(false);
        const [error, setError] = useState(false);

        return (<div style={ { display: "flex", flexDirection: "column", gap: "18px" } }>
          <Editor
            value={text}
            error={error}
            isSingleRow={singleRow}
            placeholder="Type in the editor..."
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div>
            <div>Modifiers:</div>
            <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
              <Button theme="secondaryAlt" onClick={() => setError(!error)}>{error ? "Valid" : "Error"}</Button>
              <Button theme="secondaryAlt" onClick={() => setSingleRow(!singleRow)}>{singleRow ? "Multiple Row" : "Single Row"}</Button>
            </div>
          </div>
        </div>);
      }}
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={canvasStyle}>
        <p>Basic - empty</p>
        <Editor
          placeholder="Type a text..."
          onChange={() => undefined}
        />
      </div>
    </Cover>
  ),
};
