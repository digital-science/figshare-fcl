/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "@digital-science/figshare-fcl/latest/Button";
import {
  Button as OldButton,
  IconButton as OldIconButton,
  GenericButton as OldGenericButton,
} from "@digital-science/figshare-fcl/button";
import OldDownload from "@digital-science/figshare-fcl/icons/download";
import OldSearch from "@digital-science/figshare-fcl/icons/search/medium";
import OldDelete from "@digital-science/figshare-fcl/icons/delete/medium";
import { Download, Search, Delete } from "@digital-science/figshare-fcl/icons/react";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/latest/Button/Migration",
  component: Button,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

const cell = { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", minHeight: "62px" };
const dark = { background: "#252525", borderRadius: "4px" };
const mono = { fontFamily: "monospace", fontSize: "12px", color: "#525252" };

/** One migration case: old component on the left, its new equivalent on the right, the mapping underneath. */
function Case({ old, next, map, onDark = false }) {
  return (
    <div style={ { display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #eee", padding: "8px 0" } }>
      <div style={ { ...cell, ...(onDark ? dark : {}) } }>{old}</div>
      <div style={ { ...cell, ...(onDark ? dark : {}) } }>{next}</div>
      <div style={ { ...mono, gridColumn: "1 / -1", padding: "4px 16px 0" } }>{map}</div>
    </div>
  );
}

function Table({ children }) {
  return (
    <Cover kind="card">
      <div style={ { display: "grid", gridTemplateColumns: "1fr 1fr", fontWeight: 600, padding: "0 16px 8px", borderBottom: "2px solid #ddd" } }>
        <span>Old</span>
        <span>New</span>
      </div>
      {children}
    </Cover>
  );
}

const label = (text) => <Button.Label>{text}</Button.Label>;

export const Overview = {
  render: () => (
    <Table>
      <Case
        map={"<Button>  →  kind=\"secondary\" em=\"high\"  (old default theme is secondary, not primary)"}
        next={<Button kind="secondary" em="high">{label("Save")}</Button>}
        old={<OldButton>Save</OldButton>}
      />
      <Case
        map={"<IconButton>  →  kind=\"tertiary\" em=\"high\" span=\"icon\"  (children become tooltip + aria-label)"}
        next={(
          <Button aria-label="Search items" em="high" kind="tertiary" span="icon" tooltip="Search items">
            <Button.Icon><Search /></Button.Icon>
          </Button>
        )}
        old={<OldIconButton Icon={OldSearch}>Search items</OldIconButton>}
      />
      <Case
        map={"<GenericButton>  →  kind=\"tertiary\" em=\"high\" span=\"content\""}
        next={<Button em="high" kind="tertiary" span="content">{label("Click me")}</Button>}
        old={<OldGenericButton>Click me</OldGenericButton>}
      />
    </Table>
  ),
};

const BUTTON_THEMES = [
  ["primary", { kind: "primary", em: "high" }],
  ["primaryAlt", { kind: "primary", em: "success" }],
  ["secondary", { kind: "secondary", em: "high" }],
  ["secondaryAlt", { kind: "secondary", em: "low" }],
  ["tertiary", { kind: "tertiary", em: "high", span: "content" }],
  ["tertiaryAlt", { kind: "tertiary", em: "low", span: "content" }],
  ["inverted", { kind: "inverted", em: "high" }],
];

const props = (p) => Object.entries(p).map(([k, v]) => `${k}="${v}"`).join(" ");

export const ButtonThemes = {
  tags: ["!dev"],
  render: () => (
    <Table>
      <Case
        map={`no theme  →  ${props({ kind: "secondary", em: "high" })}`}
        next={<Button em="high" kind="secondary">{label("Default")}</Button>}
        old={<OldButton>Default</OldButton>}
      />
      {BUTTON_THEMES.map(([theme, next]) => (
        <Case
          key={theme}
          map={`theme="${theme}"  →  ${props(next)}`}
          next={<Button {...next}>{label(theme)}</Button>}
          old={<OldButton theme={theme}>{theme}</OldButton>}
          onDark={theme === "inverted"}
        />
      ))}
    </Table>
  ),
};

export const ButtonStatesAndOptions = {
  tags: ["!dev"],
  render: () => (
    <Table>
      <Case
        map={"disabled  →  disabled (now aria-disabled)"}
        next={<Button disabled={true} em="high" kind="secondary">{label("Disabled")}</Button>}
        old={<OldButton disabled={true}>Disabled</OldButton>}
      />
      <Case
        map={"tooltip  →  tooltip"}
        next={<Button em="high" kind="secondary" tooltip="Tooltip text">{label("Tooltip")}</Button>}
        old={<OldButton tooltip="Tooltip text">Tooltip</OldButton>}
      />
      <Case
        map={"href  →  href (renders <a>)"}
        next={<Button em="high" href="#" kind="secondary">{label("Link")}</Button>}
        old={<OldButton href="#">Link</OldButton>}
      />
      <Case
        map={"Icon + iconPlacement=\"left\" (default)  →  <Button.Icon> before <Button.Label>"}
        next={(
          <Button em="high" kind="secondary">
            <Button.Icon><Download /></Button.Icon>
            {label("Download")}
          </Button>
        )}
        old={<OldButton Icon={OldDownload}>Download</OldButton>}
      />
      <Case
        map={"Icon + iconPlacement=\"right\"  →  <Button.Icon> after <Button.Label>"}
        next={(
          <Button em="high" kind="secondary">
            {label("Download")}
            <Button.Icon><Download /></Button.Icon>
          </Button>
        )}
        old={<OldButton Icon={OldDownload} iconPlacement="right">Download</OldButton>}
      />
      <Case
        map={"Icon on a primary button"}
        next={(
          <Button em="high" kind="primary">
            <Button.Icon><Download /></Button.Icon>
            {label("Download")}
          </Button>
        )}
        old={<OldButton Icon={OldDownload} theme="primary">Download</OldButton>}
      />
      {["S", "M", "L"].map((size) => (
        <Case
          key={size}
          map={`size="${size}"  →  no size prop; standard 16px / 38px sizing${size === "M" ? " (default)" : ""}`}
          next={<Button em="high" kind="secondary">{label(`Size ${size}`)}</Button>}
          old={<OldButton size={size}>{`Size ${size}`}</OldButton>}
        />
      ))}
    </Table>
  ),
};

const ICON_THEMES = [
  ["primary", { kind: "tertiary", em: "high" }, false],
  ["tertiary", { kind: "tertiary", em: "low" }, false],
  ["secondary", { kind: "tertiary", em: "low" }, false],
  ["primaryAlt", { kind: "inverted", em: "high" }, true],
  ["secondaryAlt", { kind: "inverted", em: "high" }, true],
];

export const IconButtonThemes = {
  tags: ["!dev"],
  render: () => (
    <Table>
      <Case
        map={`no theme (default primary)  →  ${props({ kind: "tertiary", em: "high", span: "icon" })}`}
        next={(
          <Button aria-label="Delete item" em="high" kind="tertiary" span="icon" tooltip="Delete item">
            <Button.Icon><Delete /></Button.Icon>
          </Button>
        )}
        old={<OldIconButton Icon={OldDelete}>Delete item</OldIconButton>}
      />
      {ICON_THEMES.map(([theme, next, onDark]) => (
        <Case
          key={theme}
          map={`theme="${theme}"  →  ${props({ ...next, span: "icon" })}`}
          next={(
            <Button aria-label="Delete item" span="icon" tooltip="Delete item" {...next}>
              <Button.Icon><Delete /></Button.Icon>
            </Button>
          )}
          old={<OldIconButton Icon={OldDelete} theme={theme}>Delete item</OldIconButton>}
          onDark={onDark}
        />
      ))}
      <Case
        map={"disabled"}
        next={(
          <Button aria-label="Delete item" disabled={true} em="high" kind="tertiary" span="icon">
            <Button.Icon><Delete /></Button.Icon>
          </Button>
        )}
        old={<OldIconButton Icon={OldDelete} disabled={true}>Delete item</OldIconButton>}
      />
      <Case
        map={"no tooltip text  →  still provide aria-label"}
        next={(
          <Button aria-label="Search" em="high" kind="tertiary" span="icon">
            <Button.Icon><Search /></Button.Icon>
          </Button>
        )}
        old={<OldIconButton Icon={OldSearch} />}
      />
    </Table>
  ),
};

export const GenericButtonLooks = {
  tags: ["!dev"],
  render: () => (
    <Table>
      <Case
        map={`default look (inherited branded link style)  →  ${props({ kind: "tertiary", em: "high", span: "content" })}`}
        next={<Button em="high" kind="tertiary" span="content">{label("Click me")}</Button>}
        old={<OldGenericButton>Click me</OldGenericButton>}
      />
      <Case
        map={`custom CSS made text black/gray  →  ${props({ kind: "tertiary", em: "low", span: "content" })}`}
        next={<Button em="low" kind="tertiary" span="content">{label("Click me")}</Button>}
        old={<OldGenericButton style={ { color: "#252525" } }>Click me</OldGenericButton>}
      />
      <Case
        map={`icon-only, branded icon  →  ${props({ kind: "tertiary", em: "high", span: "icon" })}`}
        next={(
          <Button aria-label="Delete" em="high" kind="tertiary" span="icon">
            <Button.Icon><Delete /></Button.Icon>
          </Button>
        )}
        old={<OldGenericButton aria-label="Delete"><OldDelete width="16" /></OldGenericButton>}
      />
      <Case
        map={`icon-only, gray icon  →  ${props({ kind: "tertiary", em: "low", span: "icon" })}`}
        next={(
          <Button aria-label="Delete" em="low" kind="tertiary" span="icon">
            <Button.Icon><Delete /></Button.Icon>
          </Button>
        )}
        old={<OldGenericButton aria-label="Delete" style={ { color: "#8d8d8d" } }><OldDelete width="16" /></OldGenericButton>}
      />
      <Case
        map={`white text on dark background  →  ${props({ kind: "inverted", em: "high" })}`}
        next={<Button em="high" kind="inverted">{label("Click me")}</Button>}
        old={<OldGenericButton style={ { color: "#fff" } }>Click me</OldGenericButton>}
        onDark={true}
      />
      <Case
        map={`href  →  href (renders <a>), ${props({ kind: "tertiary", em: "high", span: "content" })}`}
        next={<Button em="high" href="#" kind="tertiary" span="content">{label("Documentation")}</Button>}
        old={<OldGenericButton href="#">Documentation</OldGenericButton>}
      />
      <Case
        map={"tooltip  →  tooltip"}
        next={<Button em="high" kind="tertiary" span="content" tooltip="Tooltip text">{label("Hover me")}</Button>}
        old={<OldGenericButton tooltip="Tooltip text">Hover me</OldGenericButton>}
      />
    </Table>
  ),
};

export const InlineLinks = {
  tags: ["!dev"],
  render: () => (
    <Table>
      <Case
        map={"link in a paragraph  →  inline=\"text\" (flows like text), em=\"high\""}
        next={(
          <p style={ { margin: 0 } }>
            Read the{" "}
            <Button em="high" href="#" inline="text" kind="tertiary" span="content">{label("documentation")}</Button>
            {" "}for details.
          </p>
        )}
        old={<p style={ { margin: 0 } }>Read the <OldGenericButton href="#">documentation</OldGenericButton> for details.</p>}
      />
      <Case
        map={"gray link (tertiaryAlt / black text)  →  em=\"low\""}
        next={(
          <p style={ { margin: 0 } }>
            See{" "}
            <Button em="low" href="#" inline="text" kind="tertiary" span="content">{label("your history")}</Button>
            {" "}for more.
          </p>
        )}
        old={<p style={ { margin: 0 } }>See <OldGenericButton href="#" style={ { color: "#252525" } }>your history</OldGenericButton> for more.</p>}
      />
      <Case
        map={"always underlined  →  <Button.Label decoration=\"underline\">"}
        next={(
          <p style={ { margin: 0 } }>
            Open{" "}
            <Button em="low" href="#" inline="text" kind="tertiary" span="content">
              <Button.Label decoration="underline">account settings</Button.Label>
            </Button>
            {" "}now.
          </p>
        )}
        old={<p style={ { margin: 0 } }>Open <OldGenericButton href="#" style={ { color: "#252525", textDecoration: "underline" } }>account settings</OldGenericButton> now.</p>}
      />
    </Table>
  ),
};
