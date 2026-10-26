# DataGrid Component

The `DataGrid` is a flex-based layout component for tabular data. It uses a compound component pattern where sub-components are attached to the main export: `DataGrid.Header`, `DataGrid.Subheader`, `DataGrid.Content`, `DataGrid.Row`, and `DataGrid.Cell`.

## When to use DataGrid

Use DataGrid when you need a table-like layout built with flex rather than semantic `<table>` elements. This gives more control over responsive behavior, cell sizing, and layout direction than a native table. It is a pure layout component — sorting, filtering, pagination, and selection logic are the consumer's responsibility.

## Structure

```jsx
import { DataGrid } from "@digital-science/figshare-fcl/latest/DataGrid";

<DataGrid>
  <DataGrid.Header>
    <DataGrid.Subheader>Name</DataGrid.Subheader>
    <DataGrid.Subheader>Status</DataGrid.Subheader>
  </DataGrid.Header>
  <DataGrid.Content>
    <DataGrid.Row>
      <DataGrid.Cell>Item A</DataGrid.Cell>
      <DataGrid.Cell>Active</DataGrid.Cell>
    </DataGrid.Row>
  </DataGrid.Content>
</DataGrid>
```

## Component hierarchy

| Component | Element | Purpose |
|-----------|---------|---------|
| `DataGrid` | `.datagrid` | Root container — flex column |
| `DataGrid.Header` | `.header` | Header row container — tertiary background, top border-radius |
| `DataGrid.Subheader` | `.subheader` | Header cell — flex row, nowrap, centered vertically |
| `DataGrid.Content` | `.content` | Body container — flex column, holds rows |
| `DataGrid.Row` | `.row` | Body row — flex row, top border separator |
| `DataGrid.Cell` | `.cell` | Body cell — flex column, vertically centered |

All components spread `...props` onto their root `div`, so any `data-*` attribute or HTML prop can be passed directly.

## Modifier reference

All modifiers are applied via `data-*` attributes. No class toggling is needed.

### Container modifiers (on `DataGrid`)

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-cell-padding` | `"dense"`, `"compact"`, `"none"` | Controls cell density. Default padding is `3*gridSize` horizontal and `2*gridSize` vertical. `dense` reduces vertical only. `compact` reduces both. `none` removes all. |
| `data-border` | `"none"` | Removes the outer border and border-radius. |
| `data-hover` | `"true"` | Enables background highlight on row hover. |
| `data-striped` | `"true"` | Applies alternating background to even rows in content. |

### Header modifiers (on `DataGrid.Header`)

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-layout` | `"column"` | Switches header to column direction. |
| `data-sticky` | `"true"` | Makes the header sticky at the top of its scroll container. |

### Row modifiers (on `DataGrid.Row`)

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-layout` | `"column"` | Switches row to column direction. |
| `data-root-row` | `"true"` | Highlights row with bold text and tertiary background (for tree/hierarchy tables). |

### Cell / Subheader modifiers (on `DataGrid.Cell` or `DataGrid.Subheader`)

#### Sizing (`data-size`)

| Value | Effect |
|-------|--------|
| `"s"` | `max-width: 42px` |
| `"s2"` | `max-width: 63px` |
| `"m"` | `max-width: 88px` |
| `"grow"` | `flex: 1 0 0` — fills available space |
| `"grow-full"` | `flex: 1 0 0; width: 100%` |
| `"shrink"` | `flex: 0 1 0` — shrinks if needed |
| `"normal"` | `flex: 1` — standard flex |

#### Layout (`data-cell-layout`)

Uses `~=` selector for space-separated values, so `data-cell-layout="center row"` combines both.

| Value | Effect |
|-------|--------|
| `"center"` | Centers content horizontally and vertically |
| `"row"` | Sets `flex-direction: row` (cells default to column) |
| `"absolute-center"` | Absolutely positioned, full-size centered overlay |
| `"flex-start"` | Left-aligned flex with vertical centering |
| `"flex-end"` | Right-aligned flex with vertical centering |
| `"space-between"` | Content spread with space-between |

#### Text wrapping (`data-wrap`)

| Value | Effect |
|-------|--------|
| `"word"` | `white-space: pre-wrap; overflow-wrap: break-word` |
| `"anywhere"` | `white-space: pre-wrap; overflow-wrap: anywhere` |

#### Text truncation (`data-truncate`)

| Value | Effect |
|-------|--------|
| `"true"` | Single-line ellipsis: `overflow: hidden; white-space: nowrap; text-overflow: ellipsis` |

#### Text alignment (`data-align`)

| Value | Effect |
|-------|--------|
| `"left"` | `text-align: left` |
| `"center"` | `text-align: center` |
| `"right"` | `text-align: right` |

#### Selection (`data-selected`)

| Value | Effect |
|-------|--------|
| `"true"` | `font-weight: bold` |

## CSS variables

The component uses these CSS custom properties (set on `.datagrid`):

| Variable | Default | Description |
|----------|---------|-------------|
| `--cell-width-padding` | `calc(3 * var(--gridSize))` | Horizontal cell padding |
| `--cell-height-padding` | `calc(2 * var(--gridSize))` | Vertical cell padding |
| `--Border-Primary` | `#ddd` | Border color |
| `--Layout-background-Tertiary` | `#f8f8f8` | Header and root-row background |
| `--Layout-background-Secondary` | `#f4f4f4` | Row hover background |

## Accessibility

DataGrid renders plain `div` elements — it does not produce semantic table markup. When accessibility is required, consumers should add appropriate ARIA roles:

```jsx
<DataGrid role="table">
  <DataGrid.Header role="rowgroup">
    <DataGrid.Subheader role="columnheader">Name</DataGrid.Subheader>
  </DataGrid.Header>
  <DataGrid.Content role="rowgroup">
    <DataGrid.Row role="row">
      <DataGrid.Cell role="cell">Item A</DataGrid.Cell>
    </DataGrid.Row>
  </DataGrid.Content>
</DataGrid>
```

## File map

| File | Purpose |
|------|---------|
| `DataGrid.tsx` | All component definitions and compound pattern wiring |
| `DataGrid.module.css` | All modifier styles (container, header, row, cell) |
| `index.tsx` | Re-exports |
