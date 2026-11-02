/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";
import { Button } from "@digital-science/figshare-fcl/latest/Button";
import Editor from "@digital-science/figshare-fcl/textEditor/Lexical";
import { ToolbarItem, ToolbarItemType } from "@digital-science/figshare-fcl/textEditor/Lexical/constants";

import { Cover } from "../../story-utils/Cover";


const canvasStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "32px",
};

const rowStyle = { display: "flex", flexDirection: "row", gap: "12px", flexWrap: "wrap" };

const outputStyle = {
  margin: "8px 0 0",
  padding: "8px 12px",
  overflowX: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
  fontSize: "12px",
  borderRadius: "4px",
  background: "rgba(38, 85, 115, 0.06)",
};

/*
  Holds the editor value for a story and hands it to its children as a render prop.
  The editor only reads `value` when it mounts, so it is uncontrolled afterwards: `replace` swaps the
  value from the outside and bumps `editorKey`, which the story passes as `key` to remount the editor.
*/
function ValueProvider({ initialValue = "", children }) {
  const [value, setValue] = useState(initialValue);
  const [editorKey, setEditorKey] = useState(0);

  const onChange = useCallback((e) => setValue(e.target.value), []);
  const replace = useCallback((next) => {
    setValue(next);
    setEditorKey((k) => k + 1);
  }, []);

  return children({ value, onChange, replace, editorKey });
}

function ValueOutput({ value }) {
  return (
    <div>
      <small>Current value ({value.length} characters):</small>
      <pre data-testid="editor-output" style={outputStyle}>{value || "(empty)"}</pre>
    </div>
  );
}

function ResetButtons({ initialValue, replace }) {
  return (
    <div style={ { ...rowStyle, margin: "12px 0" } }>
      <Button em="low" kind="secondary" onClick={() => replace(initialValue)}>
        <Button.Label>Reset</Button.Label>
      </Button>
      <Button em="low" kind="secondary" onClick={() => replace("")}>
        <Button.Label>Clear</Button.Label>
      </Button>
    </div>
  );
}

const overviewValue = "<h2>My list</h2><ol><li>Two</li><li>Three</li></ol>";

function OverviewStory() {
  const [singleRow, setSingleRow] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div style={ { display: "flex", flexDirection: "column", gap: "18px" } }>
      <ValueProvider initialValue={overviewValue}>
        {({ value, onChange }) => (
          <>
            <Editor
              disabled={disabled}
              error={error}
              isSingleRow={singleRow}
              placeholder="Type in the editor..."
              value={value}
              onChange={onChange}
            />
            <ValueOutput value={value} />
          </>
        )}
      </ValueProvider>
      <div>
        <div>Modifiers:</div>
        <div style={rowStyle}>
          <Button aria-pressed={error} em="low" kind="secondary" onClick={() => setError(!error)}>
            <Button.Label>{error ? "Valid" : "Error"}</Button.Label>
          </Button>
          <Button aria-pressed={singleRow} em="low" kind="secondary" onClick={() => setSingleRow(!singleRow)}>
            <Button.Label>{singleRow ? "Multiple Row" : "Single Row"}</Button.Label>
          </Button>
          <Button aria-pressed={disabled} em="low" kind="secondary" onClick={() => setDisabled(!disabled)}>
            <Button.Label>{disabled ? "Enable" : "Disable"}</Button.Label>
          </Button>
        </div>
      </div>
    </div>
  );
}

const limitedToolbar = [
  { name: ToolbarItem.Bold, type: ToolbarItemType.RichText },
  { name: ToolbarItem.Italic, type: ToolbarItemType.RichText },
  { name: ToolbarItem.Link, type: ToolbarItemType.Link },
  { name: ToolbarItem.UnorderedList, type: ToolbarItemType.List },
  { name: ToolbarItem.Undo, type: ToolbarItemType.History },
  { name: ToolbarItem.Redo, type: ToolbarItemType.History },
];

const draftValue = "<h3>Draft</h3><p>Edit me, then press <b>Reset</b> to restore this text.</p>";

function BlurFocusExample() {
  const [events, setEvents] = useState([]);
  const log = (name) => () => setEvents((prev) => [`${new Date().toLocaleTimeString()} - ${name}`, ...prev].slice(0, 5));

  return (
    <div>
      <ValueProvider initialValue="<p>Click in and out of the editor</p>">
        {({ value, onChange }) => (
          <Editor
            id="focus-example"
            name="focus-example"
            value={value}
            onBlur={log("blur")}
            onChange={onChange}
            onFocus={log("focus")}
          />
        )}
      </ValueProvider>
      <small>Last events:</small>
      <pre style={outputStyle}>{events.length ? events.join("\n") : "(none yet)"}</pre>
    </div>
  );
}

export default {
  title: "UI/Inputs/TextEditor",
  component: Editor,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind="story">
      <OverviewStory />
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={canvasStyle}>
        <div>
          <p>Basic - empty</p>
          <ValueProvider>
            {({ value, onChange }) => (
              <>
                <Editor placeholder="Type a text..." value={value} onChange={onChange} />
                <ValueOutput value={value} />
              </>
            )}
          </ValueProvider>
        </div>

        <div>
          <p>With a value, clear and reset</p>
          <ValueProvider initialValue={draftValue}>
            {({ value, onChange, replace, editorKey }) => (
              <>
                <Editor key={editorKey} placeholder="Type a text..." value={value} onChange={onChange} />
                <ResetButtons initialValue={draftValue} replace={replace} />
                <ValueOutput value={value} />
              </>
            )}
          </ValueProvider>
        </div>

        <div>
          <p>Error state</p>
          <ValueProvider initialValue="<p>This field is invalid</p>">
            {({ value, onChange }) => <Editor error={true} value={value} onChange={onChange} />}
          </ValueProvider>
        </div>

        <div>
          <p>Single row</p>
          <ValueProvider>
            {({ value, onChange }) => (
              <>
                <Editor isSingleRow={true} placeholder="A single line..." value={value} onChange={onChange} />
                <ValueOutput value={value} />
              </>
            )}
          </ValueProvider>
        </div>

        <div>
          <p>Disabled</p>
          <ValueProvider initialValue="<p>You can not edit this text.</p>">
            {({ value, onChange }) => <Editor disabled={true} value={value} onChange={onChange} />}
          </ValueProvider>
        </div>

        <div>
          <p>Custom toolbar</p>
          <ValueProvider>
            {({ value, onChange }) => (
              <>
                <Editor placeholder="Only a few tools..." toolbarConfig={limitedToolbar} value={value} onChange={onChange} />
                <ValueOutput value={value} />
              </>
            )}
          </ValueProvider>
        </div>

        <div>
          <p>Length warning (shown from 50 up to a maximum of 120 characters)</p>
          <ValueProvider>
            {({ value, onChange }) => (
              <>
                <Editor
                  maxTextLength={120}
                  minTextLength={50}
                  placeholder="Keep typing to see the warning..."
                  value={value}
                  onChange={onChange}
                />
                <ValueOutput value={value} />
              </>
            )}
          </ValueProvider>
        </div>

        <div>
          <p>Focus and blur callbacks, with id and name</p>
          <BlurFocusExample />
        </div>
      </div>
    </Cover>
  ),
};
