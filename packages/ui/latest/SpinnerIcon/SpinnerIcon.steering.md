# SpinnerIcon Component

An animated loading spinner that renders a rotating SVG loader icon. Simple, single-purpose component with size and color blending options.

## When to use

Use SpinnerIcon for any loading/processing state — inline with text, inside buttons, or as a full-area loader. Pair with descriptive text for accessibility.

## Usage

```jsx
import { SpinnerIcon } from "@digital-science/figshare-fcl/latest/SpinnerIcon";

<SpinnerIcon size="small" />
<SpinnerIcon size="medium" blend />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"small" \| "medium" \| "large" \| "full"` | `"small"` | Spinner dimensions |
| `blend` | `boolean` | `false` | Use `currentcolor` instead of theme color |
| `className` | `string` | — | Additional CSS class |

All other props are spread onto the root `<span>`.

## Sizes

| Value | Dimensions |
|-------|-----------|
| `small` | 16 x 16px |
| `medium` | 32 x 32px |
| `large` | 48 x 48px |
| `full` | 100% width, auto height |

## Blend mode

By default, the spinner uses `--Color-Typography-Primary` for its color. When `blend={true}`, it uses `currentcolor`, inheriting from its parent — useful for spinners inside colored buttons or containers.

## Motion

The spinner rotates 360 degrees over 2 seconds (`linear infinite`). When `prefers-reduced-motion: reduce` is active, the animation is disabled and the icon renders static.

## Data attributes

| Attribute | Set on | Values | Purpose |
|-----------|--------|--------|---------|
| `data-size` | root span | `"small"`, `"medium"`, `"large"`, `"full"` | Size modifier |
| `data-blend` | root span | `true`, `false` | Color blending |
| `data-part` | root span | `"spinner"` | Part identifier |
| `data-part` | SVG | `"spinner-icon"` | Icon part identifier |

## File map

| File | Purpose |
|------|---------|
| `SpinnerIcon.tsx` | Component implementation |
| `SpinnerIcon.module.css` | Size, color, animation styles |
| `index.tsx` | Re-exports |
