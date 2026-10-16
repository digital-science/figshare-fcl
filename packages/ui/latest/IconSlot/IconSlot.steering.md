# IconSlot Component

`IconSlot` is a standardized icon container that provides consistent sizing (16x16px), color theming, and flex alignment for icons across the UI. It is used internally by other components (e.g. `Alert.Icon`) and can be used directly when placing standalone icons in layouts.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ElementType` | — | Icon component to render (alternative to passing children) |
| `kind` | `"blend"` \| `"text"` \| `"danger"` \| `"success"` \| `"warning"` \| `"item-type"` \| `"item-type active"` \| `"item-type inactive"` | — | Color theme for the icon |
| `children` | `ReactNode` | — | Icon node(s) to render |
| `asChild` | `boolean` | `true` | When `true`, clones props directly onto the child element instead of wrapping it in a `<span>`. When `false`, wraps in a `<span data-part="icon-slot">`. |
| `className` | `string` | — | Additional CSS class |

## Kind color mapping

| Kind | Color | Notes |
|------|-------|-------|
| `blend` | `currentcolor` | Inherits from parent — useful inside buttons or colored containers |
| `text` | Primary text color (`#000`) | For icons that should match body text |
| `warning` | Warning red (`#c03830`) | |
| `success` | Success green (`#2a6347`) | |
| `item-type` | Secondary text color (`#525252`) | Larger slot: 40x24px, for item type icons |
| `item-type inactive` | Disabled color (`#bbb`) | Grayed-out item type icon |

## asChild behavior

By default (`asChild={true}`), IconSlot clones its props (`className`, `data-part`, `data-kind`, `aria-hidden`) directly onto the child element. This avoids an extra wrapper DOM node. Set `asChild={false}` to wrap the icon in a `<span>` container — this is needed when:
- The child is not a valid React element (e.g. a string or fragment)
- You need the slot's centering behavior (the `icon-slot` span positions children absolutely centered)

```jsx
// asChild=true (default) — props cloned onto the SVG directly
<IconSlot kind="blend"><SearchIcon /></IconSlot>

// asChild=false — wrapped in a span with centering
<IconSlot asChild={false} kind="success"><CheckmarkIcon /></IconSlot>

// Using the icon prop instead of children
<IconSlot icon={SearchIcon} kind="text" />
```

## Usage in other components

IconSlot is used internally by `Alert.Icon` to render alert type icons. When building custom components that need a themed icon, prefer IconSlot over manually styling SVGs.

## Files

| File | Purpose |
|------|---------|
| `IconSlot.tsx` | Component implementation |
| `IconSlot.module.css` | Sizing, color themes, and centering styles |
| `index.tsx` | Public exports |
