# Separator Component

`Separator` renders a visual dividing line between content sections. It supports both horizontal and vertical orientations and can infer its orientation from a parent `OrientationContext`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal"` \| `"vertical"` \| `"rows"` \| `"columns"` | from context | Line direction. `"rows"` maps to `"horizontal"`, `"columns"` maps to `"vertical"`. Falls back to `OrientationContext` if not provided. |
| `margin` | `true` \| `false` \| `"small"` | `true` | Spacing around the separator |
| `role` | `string` | `"separator"` | ARIA role |
| `className` | `string` | — | Additional CSS class |

All other HTML span attributes are spread onto the element.

## Orientation

The naming can be counterintuitive — think of it as "what direction does the line run":

| Value | Renders as | Use case |
|-------|-----------|----------|
| `"horizontal"` / `"rows"` | Vertical line (1px wide, full height) | Divider between items in a horizontal row |
| `"vertical"` / `"columns"` | Horizontal line (full width, 1px tall) | Divider between items in a vertical column |

The `"rows"` and `"columns"` aliases match Block's `kind` direction tokens, making it natural to use in layouts:

```jsx
<Block kind="row gap-2 align-center">
  <Item />
  <Separator orientation="rows" />
  <Item />
</Block>

<Block kind="column gap-2">
  <Item />
  <Separator orientation="columns" />
  <Item />
</Block>
```

## OrientationContext

If no `orientation` prop is provided, the Separator reads from `OrientationContext`. This is useful when Separator is used inside a component that already knows its layout direction.

## Margin

| Value | Effect |
|-------|--------|
| `true` (default) | Standard margin: `2*gridSize` along the line, `0.5*gridSize` across (vertical), or `0.5*gridSize` along, `gridSize` across (horizontal) |
| `false` | No margin |
| `"small"` | Supported via data attribute — use for tighter spacing contexts |

## Files

| File | Purpose |
|------|---------|
| `Separator.tsx` | Component implementation |
| `Separator.module.css` | Orientation styles, sizing, margin |
| `index.tsx` | Public exports |
