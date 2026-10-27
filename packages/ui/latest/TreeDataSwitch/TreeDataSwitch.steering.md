# TreeDataSwitch Component

A hierarchical tree component with search, checkboxes (switch-style), and expand/collapse. Used for toggling items on/off in nested category structures — e.g. enabling/disabling features per institution, managing taxonomy selections.

## When to use

Use TreeDataSwitch when you need a tree of toggleable items with:
- Hierarchical parent/child structure
- Search filtering
- ON/OFF switch checkboxes per node
- Optional read-only display mode
- Optional custom actions per node or bulk actions

## Structure

```jsx
import { TreeDataSwitch, structureTreeData } from "@digital-science/figshare-fcl/latest/TreeDataSwitch";

const tree = structureTreeData({
  dataset: flatItems,
  checkedIds: [1, 3, 5],
  openLevel: 1,
});

<TreeDataSwitch
  name="my-tree"
  tree={tree}
  onChange={(update) => { /* handle toggle */ }}
/>
```

## Props

### TreeDataSwitch

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | Field name for the tree |
| `tree` | `TreeData` | **required** | Structured tree data (use `structureTreeData` to build from flat data) |
| `onChange` | `(data) => void` | **required** | Callback when a node's switch is toggled; receives update object |
| `readOnly` | `boolean` | `false` | Display items as ON/OFF tags instead of interactive switches |
| `searchPlaceholder` | `string` | — | Placeholder text for the search input |
| `noSearchResultsMessage` | `string` | — | Message shown when search yields no results |
| `renderActions` | `(data) => ReactNode` | — | Custom action renderer per node |
| `renderBulkActions` | `((data) => ReactNode) \| ReactNode` | — | Custom bulk actions rendered at the top |

## Data structure

### `structureTreeData(options)`

Transforms a flat dataset into a hierarchical tree:

```jsx
import { structureTreeData } from "@digital-science/figshare-fcl/latest/TreeDataSwitch";

const tree = structureTreeData({
  dataset: [
    { id: "1", name: "Root", path: "/1" },
    { id: "2", name: "Child A", path: "/1/2" },
    { id: "3", name: "Child B", path: "/1/3" },
  ],
  checkedIds: ["2"],   // IDs that are toggled ON
  openLevel: 1,        // Expand nodes up to this depth
});
```

| Option | Type | Description |
|--------|------|-------------|
| `dataset` | `Array` | Flat array of items with `id`, `name`, and `path` (path segments must match node IDs) |
| `checkedIds` | `string[]` | IDs of items that should be checked/ON |
| `openLevel` | `number` | Depth level to expand by default (0 = collapsed, 1 = first level open) |

The function builds the tree by parsing `path` values to determine parent/child relationships.

## Features

### Search

Built-in search input that filters the tree. Search activates at 3+ characters and matches against node titles. When searching, the tree auto-expands to show matching results.

### Read-only mode

When `readOnly` is true, switches are replaced with ON/OFF Tag components. Useful for displaying current configuration without allowing changes.

### Custom actions

Use `renderActions` to add per-node actions (e.g. edit buttons, info icons):

```jsx
<TreeDataSwitch
  name="my-tree"
  tree={tree}
  onChange={handleChange}
  renderActions={({ node }) => <Button onClick={() => edit(node)}>Edit</Button>}
/>
```

### Bulk actions

Use `renderBulkActions` to render controls above the tree (e.g. "Select All", "Deselect All"):

```jsx
<TreeDataSwitch
  name="my-tree"
  tree={tree}
  onChange={handleChange}
  renderBulkActions={<Button onClick={selectAll}>Select All</Button>}
/>
```

## Accessibility

- Expand/collapse toggles use chevron icons with appropriate interactive behavior
- Switch checkboxes include optional tooltips
- Tree nodes have proper keyboard interaction support

## File map

| File | Purpose |
|------|---------|
| `TreeDataSwitch.tsx` | TreeDataSwitch and TreeNode components |
| `utilities.ts` | `structureTreeData` — flat-to-tree transformer |
| `index.tsx` | Re-exports |
