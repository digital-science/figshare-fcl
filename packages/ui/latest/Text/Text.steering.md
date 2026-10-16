# Text Component

`Text` is a typography primitive for rendering text with consistent font sizing, weight, color, and overflow behavior. It supports directional inference for user-provided content (LTR/RTL).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | (required) | Text content |
| `tag` | `React.ElementType` | `"span"` | HTML element to render (`"p"`, `"h1"`, `"em"`, `"label"`, etc.) |
| `kind` | See below | `"body"` | Typography preset (font size + line height) |
| `weight` | `"regular"` \| `"bold"` | — | Font weight override (400 or 700) |
| `color` | See below | — | Text color override |
| `wrap` | `"ellipsis"` \| `"nowrap"` \| `"break-all"` | — | Overflow/wrapping behavior |
| `align` | `"left"` \| `"center"` \| `"right"` | — | Text alignment |
| `inferDirection` | `boolean` | `false` | Auto-detect LTR/RTL from content |
| `className` | `string` | `""` | Additional CSS class |

All other props are spread onto the rendered element.

## Kind presets

| Kind | Font size | Line height | Color | Notes |
|------|----------|-------------|-------|-------|
| `title-1` | 36px | 60px | Inherited | Largest heading |
| `title-2` | 28px | 42px | Inherited | |
| `title-3` | 24px | 36px | Inherited | |
| `title-4` | 20px | 30px | Inherited | |
| `body` | 16px | 24px | Inherited | Default body text |
| `body-2` | 16px | 24px | Disabled (`#707070`) | Muted body text |
| `body-3` | 16px | 24px | Secondary (`#464646`) | Secondary body text |
| `caption` / `label-2` | 14px | 24px | Tertiary (`#525252`) | Small descriptive text |
| `label` | 16px | 24px | Inherited | Form labels |
| `label-3` | 14px | 24px | Inherited | Small labels |

## Color values

| Color | CSS variable | Fallback |
|-------|-------------|----------|
| `primary` | `--Typography-Primary` | `#252525` |
| `secondary` | `--Typography-Secondary` | `#757575` |
| `secondary-2` | `--Typography-Secondary` | `#464646` |
| `tertiary` | `--Typography-Tertiary` | `#525252` |
| `error` | `--Typography-Color-Error` | `#c03830` |
| `warning` | `--Typography-Color-Warning` | `#d66000` |
| `success` | `--Typography-Color-Success` | `#2a6347` |
| `info` | `--Typography-Color-Info` | `#005ebd` |
| `disabled` | `--Typography-Disabled` | `#707070` |
| `inherit` | `inherit` | — |
| `initial` | `initial` | — |
| `currentColor` | `currentcolor` | — |

## Wrap modes

| Wrap | Behavior |
|------|----------|
| `ellipsis` | `overflow: hidden; white-space: nowrap; text-overflow: ellipsis` |
| `nowrap` | `white-space: nowrap` (no overflow hidden) |
| `break-all` | `overflow: hidden; white-space: pre-wrap; word-break: break-all` |

## Text transform

The component supports `data-text-transform` attribute for text transformation:
- `"capitalize-first-letter"` — capitalizes the first letter via `::first-letter`
- `"uppercase"` — transforms all text to uppercase

```jsx
<Text data-text-transform="capitalize-first-letter">some text</Text>
```

## Direction inference

When `inferDirection={true}`, the `useTextDirection` hook analyzes the text content and sets `dir="rtl"` or `dir="ltr"` on the element. Use this for user-provided content where the directionality is unknown at build time:

```jsx
<Text inferDirection>{userProvidedTitle}</Text>
```

## Usage examples

```jsx
// Page title
<Text tag="h1" kind="title-1" weight="bold">Dashboard</Text>

// Body with muted color
<Text kind="body" color="secondary">Last updated 2 hours ago</Text>

// Truncated label
<Text kind="label" wrap="ellipsis">Very long filename that should truncate.pdf</Text>

// Error message
<Text kind="body" color="error">This field is required</Text>

// Caption text
<Text kind="caption">Showing 1-10 of 250 results</Text>

// RTL-aware user content
<Text tag="p" kind="body" inferDirection>{articleAbstract}</Text>
```

## Files

| File | Purpose |
|------|---------|
| `Text.tsx` | Component implementation with `useTextDirection` integration |
| `Text.module.css` | Typography presets, color, weight, wrap, and alignment styles |
| `types.tsx` | TypeScript types for all props |
| `index.tsx` | Public exports |
