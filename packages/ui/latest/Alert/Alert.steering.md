# Alert Component

The `/latest/Alert` is a structured alert banner that replaces both the old `Alert` (`packages/ui/alert/`) and the `Alerts` container (`packages/ui/alerts/`). It provides a declarative layout with distinct zones for icon, title, message, right-side content, and a close button.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"info"` \| `"warning"` \| `"error"` \| `"success"` \| `"notice"` | (required) | Alert severity — controls colors and icon |
| `title` | `ReactNode` | — | Bold title text (rendered via `Alert.Title`) |
| `message` | `ReactNode` | — | Description text (rendered via `Alert.Description`) |
| `children` | `ReactNode` \| `function` | — | Right-side content (controls, buttons, etc.). As a function receives `{ type, onClose, ...props }`. |
| `persistent` | `boolean` | `true` | If `false`, shows a close button |
| `id` | `string` | `"alert"` | Alert identifier, passed to `onClose` payload |
| `variant` | `"solid"` \| `"translucent"` | `"translucent"` | Visual variant — `translucent` uses tinted backgrounds, `solid` uses opaque backgrounds (currently only differs for `warning`) |
| `padded` | `boolean` | `true` | Adds right-side padding. Only applies when `persistent` is `true`. |
| `onClose` | `(payload: { id, event }) => void` | — | Close callback. Only relevant when `persistent={false}`. |
| `className` | `string` | — | Additional CSS class |

## Compound components

| Component | Purpose |
|-----------|---------|
| `Alert.Icon` | Renders the type-appropriate icon. Auto-selected from `type`. Props: `type`, `children` (custom icon override). |
| `Alert.Title` | Bold title. Rendered via `<em>` with `data-part="alert-title"`. |
| `Alert.Description` | Description paragraph. Rendered via `<p>` with `data-part="alert-description"`. |
| `Alert.Close` | Close button (uses `/latest/Button` with `span="icon"` internally). Shown automatically when `persistent={false}`. |

## Layout structure

The alert renders three zones in a horizontal layout:

```
[Icon] [Left content (title + message)]  [Right content (children + close)]
```

- **Left content** is a vertical column: title on top, message below. Vertically centered when only one is present.
- **Right content** holds `children` and the close button side by side, vertically centered.
- The icon vertically centers when only title or only message is present, and aligns to the top when both are present.

## Type-to-color mapping

| Type | Background | Border | Icon |
|------|-----------|--------|------|
| `notice` | Gray (`#f5f5f5`) | Gray | Teal InfoCircle |
| `info` | Blue tint | Blue border | Blue InfoCircle |
| `warning` | Orange tint (or solid yellow with `variant="solid"`) | Orange border | Orange WarningCircle |
| `error` | Red tint | Red border | Red Warning |
| `success` | Green tint | Green border | Green Checkmark |

## Migration from old components

### Old `Alert` (`packages/ui/alert/`)

The old `Alert` is a class component that takes `variant` and a render-function `children`:

```jsx
// Old
<Alert variant="error" onClose={handler}>
  {({ onClose }) => <span>Something went wrong <button onClick={onClose}>Retry</button></span>}
</Alert>
```

The new Alert is a mostly direct replacement. Key differences:

| Old | New |
|-----|-----|
| `variant` (`"error"` \| `"success"` \| `"warning"` \| `"info"`) | `type` (same values plus `"notice"`) |
| `children` is always a render function `({ onClose }) => ...` | `title`, `message` for text; `children` for right-side controls. `children` can optionally be a render function `({ type, onClose }) => ...` |
| `forwardedRef` (via `withRef` HOC) | Not supported — the new Alert is a plain function component without ref forwarding. If you need a ref to the alert DOM node, wrap it in a `<div ref={ref}>` or use a callback ref on a parent. |
| `onClose` shows a close button if defined | `persistent={false}` shows the close button; `onClose` receives `{ id, event }` |
| No icon — content was fully custom | Auto-renders a type-appropriate icon |
| No title/message split — single render function | Structured `title` + `message` props |

#### Simple replacement

```jsx
// Old
<Alert variant="warning" onClose={dismiss}>
  {() => <span>Your session will expire soon.</span>}
</Alert>

// New
<Alert type="warning" persistent={false} onClose={dismiss}
  message="Your session will expire soon."
/>
```

#### Complex content replacement

When the old alert's render function returns complex content (title, description, buttons), split it into the new props:

```jsx
// Old
<Alert variant="error" onClose={dismiss}>
  {({ onClose }) => (
    <div>
      <b>Upload failed</b>
      <p>The file could not be uploaded. Please try again.</p>
      <button onClick={retry}>Retry</button>
    </div>
  )}
</Alert>

// New
<Alert type="error" persistent={false} onClose={dismiss}
  title="Upload failed"
  message="The file could not be uploaded. Please try again."
>
  <Button kind="secondary" em="high" onClick={retry}>
    <Button.Label>Retry</Button.Label>
  </Button>
</Alert>
```

**Rule:** when replacing old Alert render functions or `pushAlert` content, decompose the content into:
1. **`title`** — any bold/heading text
2. **`message`** — any description/body text
3. **`children`** — any interactive controls (Retry buttons, links, dismiss actions, or other right-side content)

**Text node splitting:** if the old content is a single bold text node (e.g. `<b>Session expired</b>` or just a bold string), assign it to `title` — even if there is no `message` or `children`. If there are multiple text nodes where one is bold and others are normal, split them: bold text goes to `title`, normal text goes to `message`.

```jsx
// Old — single bold text
pushAlert({ content: <b>File uploaded successfully</b>, type: "success" });
// New
<Alert type="success" title="File uploaded successfully" />

// Old — bold + normal text mixed
pushAlert({ content: <><b>Upload failed</b> Please check your connection.</>, type: "error" });
// New
<Alert type="error" title="Upload failed" message="Please check your connection." />
```

### Old `Alerts` container and `pushAlert` (`packages/ui/alerts/`)

The old `Alerts` component is a stateful container that listens to `form-alerts:message` custom DOM events. It manages a message queue and renders each message inside an old `Alert`. Messages are pushed via `pushAlert()`:

```jsx
// Old push pattern
pushAlert({
  channel: "my-form",
  type: "error",
  content: <span>Something went wrong <a href="/help">Get help</a></span>,
  title: "Error",
  persistent: false,
});
```

The `pushAlert` message shape has `type`, `content`, `title`, and `persistent`. When migrating code that calls `pushAlert`:

- `type` maps directly to the new Alert's `type`
- `title` maps directly to `title`
- `content` (the body text) maps to `message` if it is simple text. If `content` contains mixed text and controls, split text into `message` and controls into `children`.
- `persistent: false` stays the same

The `Alerts` container itself (event listener, message queue, timeouts, channels) is a separate concern from the Alert presentation component. When migrating the container, the rendering logic should use `/latest/Alert` instead of the old `Alert`:

```jsx
// Old rendering inside Alerts
<Alert variant={type} ...>
  {() => (<>
    <Icon /><div>{content}</div><CloseButton />
  </>)}
</Alert>

// New rendering
<Alert type={type} title={title} message={content} persistent={persistent} onClose={onClose} />
```

The new Alert handles icon selection, title/message layout, and close button rendering automatically — no need to manually compose these pieces.

## Files

| File | Purpose |
|------|---------|
| `Alert.tsx` | Component implementation and compound components |
| `Alert.module.css` | All visual styles (type colors, layout, variants) |
| `index.tsx` | Public exports |
