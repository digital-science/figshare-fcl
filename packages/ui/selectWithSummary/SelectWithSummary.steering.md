# SelectWithSummary Component

A multi-select component that pairs a `Select` dropdown with a `Summary` panel showing checked items. The summary displays all selected options with checkmark toggles, allowing users to deselect items without reopening the dropdown.

## When to use

Use SelectWithSummary when users need to:
- Select multiple items from a large list
- See all current selections at a glance below the dropdown
- Toggle selections from either the dropdown or the summary
- Work with pre-selected values loaded asynchronously

## Structure

```jsx
import SelectWithSummary from "@digital-science/figshare-fcl/selectWithSummary";

<SelectWithSummary
  options={[
    { name: "JavaScript", value: "js" },
    { name: "Python", value: "py" },
    { name: "Rust", value: "rs" },
  ]}
  value={selectedValues}
  onChange={setSelectedValues}
/>
```

## Props

### SelectWithSummary

Inherits all Select props (`kind`, `em`, `disabled`, `error`, `searchable`, `placeholder`, `size`, etc.) plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `{ name, value }[]` | `[]` | Array of option objects |
| `value` | `any[]` | — | Currently selected values |
| `onChange` | `(values) => void` | — | Selection change callback |
| `hasInitialSummary` | `boolean` | `false` | Show summary on mount (for pre-loaded selections) |
| `summaryPreselectedValues` | `{ name, value }[]` | `[]` | Pre-selected items shown in summary before user interaction |
| `loadingSummary` | `boolean` | `false` | Show loading spinner in summary |
| `summaryErrorMessage` | `string` | — | Error message displayed in summary |
| `retrySummary` | `{ message, action }` | — | Retry button for summary error state |
| `summaryClassName` | `string` | — | CSS class for summary container |
| `summaryItemClassName` | `string` | — | CSS class for summary items |
| `onLoadMoreSummary` | `() => void` | — | Infinite scroll callback for summary |

### UncontrolledSelectWithSummary

A convenience wrapper that manages internal value state:

```jsx
import { UncontrolledSelectWithSummary } from "@digital-science/figshare-fcl/selectWithSummary";

<UncontrolledSelectWithSummary
  options={options}
  defaultValue={["js", "py"]}
  onChange={(values) => console.log(values)}
/>
```

## Component architecture

```
SelectWithSummary (dual state: touchedValues + touchedOptions)
  ├── Select (multiple={true}, forced)
  │     └── Options rendered from options prop
  └── Summary (role="listbox")
        └── Button items with Checkmark + Label
```

## State management

SelectWithSummary tracks two parallel states:
- **`touchedValues`** — value array of all options the user has interacted with
- **`touchedOptions`** — full option objects for those values

This dual tracking ensures that when `hasInitialSummary` is true, pre-selected values from `summaryPreselectedValues` merge correctly with user selections, even when the full options list hasn't loaded yet.

## Summary panel

The Summary renders as a `role="listbox"` with `aria-multiselectable="true"`. Each item is a `latest/Button` with:
- `kind="tertiary" em="low" span="full" inline="slim-flexible"`
- `Button.Icon` with a Checkmark component
- `Button.Label` with the option name
- `role="option"` and `aria-selected`

Items can be toggled on/off by clicking them in the summary, which calls the same `onChange` handler as the dropdown.

## Layout

The wrapper `<div>` has a `.container` class that forces both the Select and Summary to `display: block; width: 100%`. This ensures the trigger text ellipses correctly within its parent's width, unlike the standalone Select which uses `display: inline-block`.

## Accessibility

| Element | Role | ARIA attributes |
|---------|------|----------------|
| Summary container | `listbox` | `aria-label`, `aria-labelledby`, `aria-multiselectable`, `aria-invalid` |
| Summary item | `option` | `aria-selected` |

The dropdown inherits all Select accessibility features (combobox role, listbox, option roles).

## File map

| File | Purpose |
|------|---------|
| `SelectWithSummary.jsx` | Main component — dual state, option rendering, summary options calculation |
| `Summary.jsx` | Summary panel — checkmark toggles, loading/error states, infinite scroll |
| `SelectWithSummary.module.css` | Container layout, option sizing overrides |
| `Summary.module.css` | Summary listbox, item layout, loading/error styles |
| `index.jsx` | Exports (SelectWithSummary, Summary, UncontrolledSelectWithSummary) |
