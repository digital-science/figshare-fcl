# Alerts Component

The `Alerts` component manages and displays a list of alert messages via custom DOM events. It works with the `Alert` component to create dismissible notification systems. `AlertsList` is the lower-level uncontrolled container; `Alerts` adds event-driven state management on top.

## When to use

Use `Alerts` when you need an event-driven alert system where any part of the application can push/pop/clear messages by channel. Use `AlertsList` directly when you want to manage the alerts array yourself.

## Architecture

```
Alerts (state + event listener)
  └── AlertsList (layout container — renders Block)
        └── Alert (individual message)
```

Alerts are dispatched via `alerts:message` custom DOM events. The `pushAlert`, `clearAlerts`, and `popAlert` utilities abstract this.

## Props

### Alerts

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `"global-alerts"` | Channel name — only events matching this channel are handled |
| `initial` | `AlertMessage[]` | `[]` | Initial alerts to display on mount |
| `isFixed` | `boolean` | `false` | Fixed positioning at viewport top |
| `kind` | `string` | `""` | Block `kind` modifiers for spacing (e.g. `"p-3 gap-2"`) |
| `showIfEmpty` | `boolean` | `false` | Keep container visible when no alerts (preserves padding) |
| `stackType` | `"single" \| "list" \| "stack"` | `"single"` | How multiple alerts are displayed |
| `onDismiss` | `(alert, channel) => void` | — | Callback when an alert is dismissed |

### AlertsList

Same layout props as Alerts (`kind`, `isFixed`, `showIfEmpty`, `stackType`) plus:

| Prop | Type | Description |
|------|------|-------------|
| `alerts` | `AlertMessage[]` | Array of alert message objects to render |
| `channel` | `string` | Channel identifier (set as `data-channel`) |
| `children` | `ReactNode` | Manual children override (replaces `alerts` rendering) |
| `onDismiss` | `(alert) => void` | Callback when an alert is dismissed |

## Stack types

- **`single`** — Only the most recent alert is shown. Previous alerts are replaced.
- **`list`** — All alerts stack vertically in DOM order.
- **`stack`** — Alerts are absolutely positioned and visually stacked using `--alert-index` CSS variable for offset.

## Utilities

```jsx
import { pushAlert, clearAlerts, popAlert } from "@digital-science/figshare-fcl/latest/Alerts";

pushAlert({
  channel: "my-channel",
  type: "success",        // "info" | "warning" | "error" | "success" | "notice"
  title: "Saved",
  content: "Changes saved",
  persistent: false,       // true = no auto-close button
  timeout: 5000,           // auto-dismiss in ms (optional)
});

clearAlerts("my-channel");
popAlert("my-channel", "alert-id");
```

## Accessibility

The AlertsList container has:
- `role="status"` — implicit live region
- `aria-live="polite"` — announces changes without interrupting
- `aria-relevant="additions removals"` — announces when alerts appear or disappear

## CSS data attributes

| Attribute | Set on | Values | Purpose |
|-----------|--------|--------|---------|
| `data-scope` | container | `"alerts"` | Scope identifier |
| `data-part` | container | `"list"` | Part identifier |
| `data-stack-type` | container | `"single"`, `"list"`, `"stack"` | Stack layout mode |
| `data-channel` | container | string | Channel name |
| `data-empty` | container | `"true"`, `"false"` | Whether alerts array is empty |
| `data-show-empty` | container | `"true"`, `"false"` | Whether to keep container visible when empty |
| `data-kind~="fixed"` | container | — | Fixed viewport positioning |

## Visibility behavior

When `data-empty="true"` and `showIfEmpty` is false, the container collapses with an animated transition (`max-height: 0`, `opacity: 0`). The transition respects `prefers-reduced-motion`.

When `showIfEmpty` is true, the container remains visible and any Block `kind` padding is preserved.

## File map

| File | Purpose |
|------|---------|
| `Alerts.tsx` | Stateful component with event listener |
| `AlertsList.tsx` | Uncontrolled layout container |
| `AlertsList.module.css` | Container styles, visibility transitions, stack positioning |
| `types.ts` | TypeScript types (AlertMessage, StackType, TicketEntry) |
| `utils.ts` | pushAlert, clearAlerts, popAlert utilities |
| `index.tsx` | Re-exports |
