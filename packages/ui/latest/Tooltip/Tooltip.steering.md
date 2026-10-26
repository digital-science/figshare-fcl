# Tooltip Component

The `Tooltip` component provides accessible, positioned tooltip overlays using [Floating UI](https://floating-ui.com/). It uses a compound component pattern with `Tooltip.Trigger`, `Tooltip.Content`, and `Tooltip.Close`.

## When to use

Use Tooltip for contextual information that appears on hover/focus — icon labels, truncated text previews, help text. For interactive content like forms or menus, use a popover instead.

## Structure

```jsx
import { Tooltip } from "@digital-science/figshare-fcl/latest/Tooltip";

<Tooltip>
  <Tooltip.Trigger>
    <button>Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Tooltip text
  </Tooltip.Content>
</Tooltip>
```

## Props

### Tooltip (root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | Floating UI placement | — | Preferred tooltip position (e.g. `"top"`, `"bottom-start"`) |
| `strategy` | `"absolute" \| "fixed"` | — | CSS positioning strategy |
| `role` | `string` | — | ARIA role for the tooltip |
| `interactive` | `boolean` | — | Allow hovering over the tooltip without dismissing |
| `inline` | `boolean` | — | Enable inline positioning middleware |
| `hoverWithInteractive` | `boolean` | — | Keep tooltip open while hovering content |
| `theme` | `string` | — | Visual theme (e.g. `"warning"`) |
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Callback when open state changes |
| `initialOpen` | `boolean` | — | Initial state for uncontrolled mode |
| `autoHideMs` | `number` | — | Auto-dismiss after milliseconds |
| `middleware` | `Middleware[]` | — | Additional Floating UI middleware |

### Tooltip.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | — | Merge trigger props onto child element instead of wrapping |
| `children` | `ReactNode \| ReactElement` | — | Trigger element |

### Tooltip.Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Tooltip content |

### Tooltip.Close

Renders a dismiss button inside the tooltip content.

## CSS data attributes

Set on the `.tooltip` content element:

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-theme` | `"warning"` | Yellow background with dark text |
| `data-layout` | `"flex"` | Flex display with gap |
| `data-span` | `"full"`, `"m"` | Width control |
| `data-font-style` | `"normal"`, `"bold"` | Font weight |

## Theming

Default theme uses CSS variables:
- `--background-color`: dark gray (`#333`)
- `--text-color`: white
- `--icon-color`: white

The `warning` theme overrides to yellow background with dark text.

## CSS implementation notes

- The `.tooltip` class in the CSS module is referenced in `Tooltip.tsx` to prevent tree-shaking — do not remove this reference even if it appears unused.
- Arrow SVG styling uses `:global()` selectors because the arrow is injected by Floating UI outside the CSS module scope.
- The tooltip renders in a `FloatingPortal`, so it is not constrained by parent overflow.

## Interactions

The tooltip supports multiple interaction modes via Floating UI hooks:
- **Hover** — opens on mouse enter, closes on leave
- **Focus** — opens on keyboard focus
- **Click** — opens on click (when configured)
- **Dismiss** — closes on Escape or outside interaction

When `interactive` is true, users can move their cursor into the tooltip content without it dismissing.

## Accessibility

- Uses `useRole` from Floating UI to set the appropriate ARIA role
- Trigger gets `aria-describedby` pointing to the tooltip content
- Focus management via `FloatingFocusManager` when interactive
- Context is exposed as `Tooltip.Context` for custom integrations via `useTooltipContext`

## File map

| File | Purpose |
|------|---------|
| `Tooltip.tsx` | Component implementations (Tooltip, Trigger, Content, Close) |
| `Tooltip.module.css` | Tooltip styling, themes, arrow |
| `useTooltip.ts` | Floating UI hook (positioning, interactions, state) |
| `types.tsx` | TypeScript types |
| `index.tsx` | Re-exports |
