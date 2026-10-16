# Tag Component

`Tag` renders a small colored label/badge for categorization, status indicators, or metadata. It auto-capitalizes the first letter of its content.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | (required) | Tag content |
| `color` | `"neutral"` \| `"blue"` \| `"green"` \| `"green-filled"` \| `"orange"` \| `"red"` \| `"purple"` | — | Color theme |
| `pill` | `boolean` | — | Rounded pill shape (larger border-radius) |
| `className` | `string` | — | Additional CSS class |

## Color reference

| Color | Text | Background | Use case |
|-------|------|-----------|----------|
| `neutral` | Dark gray (`#3b3e55`) | Light gray (`#f1f1f3`) | Default, generic tags |
| `blue` | Blue (`#3955a7`) | Light blue | Informational, categories |
| `green` | Green (`#026735`) | Light green | Positive status, approved |
| `green-filled` | White (`#eff7f3`) | Green (`#048143`) | Emphasized positive status |
| `orange` | Orange (`#b05302`) | Light orange | Warnings, pending |
| `red` | Red (`#ae241a`) | Light red | Errors, rejected |
| `purple` | Purple (`#6645ae`) | Light purple | Special categories |

## Static color constants

`Tag.colors` provides a map for programmatic access:

```jsx
<Tag color={Tag.colors.blue}>Category</Tag>
<Tag color={Tag.colors.greenFilled}>Published</Tag>
```

Available keys: `neutral`, `blue`, `green`, `greenFilled`, `orange`, `red`, `purple`.

## Styling details

- Fixed font size: 14px bold, 24px line height
- `max-width: fit-content` — sizes to content
- `inline-flex` display — sits inline in layouts
- Auto-capitalizes first letter via `::first-letter` pseudo-element
- Default border-radius: `0.5 * gridSize`; pill variant: `2 * gridSize`

```jsx
// Basic tag
<Tag color="blue">Draft</Tag>

// Pill tag
<Tag color="green" pill>Published</Tag>

// In a layout
<Block kind="row gap-1 wrap">
  <Tag color="blue">Physics</Tag>
  <Tag color="blue">Chemistry</Tag>
  <Tag color="orange">Pending review</Tag>
</Block>
```

## Files

| File | Purpose |
|------|---------|
| `Tag.tsx` | Component implementation, `TAG_COLORS` constant |
| `Tag.module.css` | Color themes, sizing, pill variant |
| `index.tsx` | Public exports |
