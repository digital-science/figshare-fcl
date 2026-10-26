# Select Component

A dropdown selection component built with a compound pattern: `Select`, `Trigger`, `Content`, and `Option`. Uses `latest/Button` for the trigger and options, and `Dropdown` for positioning and toggle state. The dropdown panel is portaled to `document.body` to avoid overflow clipping.

## When to use

Use Select for single or multi-value selection from a list of options. Supports search filtering, async loading, infinite scroll, and custom triggers.

## Structure

```jsx
import Select, { Option } from "@digital-science/figshare-fcl/select";

<Select value={value} onChange={setValue}>
  <Option value="one">One</Option>
  <Option value="two">Two</Option>
  <Option value="three">Three</Option>
</Select>
```

## Props

### Select

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `any` | — | Selected value (or array for multi-select) |
| `onChange` | `(value) => void` | — | Selection change callback |
| `kind` | `string` | `"input"` | Button kind for the trigger (maps to `latest/Button` API) |
| `em` | `string` | `"low"` | Button emphasis for the trigger |
| `multiple` | `boolean` | `false` | Enable multi-select mode |
| `disabled` | `boolean` | `false` | Disable the select |
| `error` | `boolean` | `false` | Show error state on trigger |
| `loading` | `boolean` | `false` | Show loading spinner in dropdown |
| `loadingErrorMessage` | `string` | — | Show error message in dropdown |
| `searchable` | `boolean` | `false` | Enable search input in dropdown |
| `searchPlaceholder` | `string` | `"Search..."` | Search input placeholder |
| `placeholder` | `string` | `"Select an option"` | Trigger placeholder text |
| `size` | `"S" \| "M" \| "L"` | `"M"` | Size variant (affects icon size) |
| `iconSize` | `string` | `"small"` | Chevron icon size |
| `placement` | Popper placement | `"bottom-start"` | Dropdown position |
| `retry` | `{ message, action }` | — | Retry button for error state |
| `renderTrigger` | `(value) => ReactNode` | — | Custom trigger renderer |
| `renderChipArea` | `() => ReactNode` | — | Custom chip area before trigger button |
| `onClear` | `(id) => void` | — | Shows clear button, called on clear |
| `onSearch` | `(search) => void` | — | External search handler (bypasses internal filtering) |
| `onLoadMore` | `() => void` | — | Infinite scroll callback |
| `onToggle` | `(isVisible) => void` | — | Dropdown toggle callback |

### Option

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `any` | — | Option value |
| `children` | `string` | — | Option display text |
| `disabled` | `boolean` | `false` | Disable this option |
| `hasEllipsis` | `boolean` | `false` | Truncate text with ellipsis |
| `isSelectWithSummary` | `boolean` | `false` | Enable long text handling |

## Component architecture

```
Select (state: visibility, search, options map)
  └── Dropdown (toggle state, keyboard nav)
        ├── Trigger → Toggle → Button
        │     ├── Button.Label (selected value text, ellipsis)
        │     └── Button.IconGroup
        │           ├── Button.InteractiveIcon (clear — conditional)
        │           └── Button.InteractiveIcon (chevron)
        └── Content → Menu → Portal(document.body)
              ├── SearchInput (conditional)
              └── div[role="listbox"]
                    └── Option → Button[role="option"]
                          ├── Checkmark (multi-select only)
                          └── Button.Label
```

## Button integration

The trigger uses `latest/Button` with `kind` and `em` props passed through from Select. Default is `kind="input"` `em="low"` which gives an input-styled trigger.

Options use `kind="tertiary" em="low"` with CSS variable overrides for hover behavior (background change instead of text color change).

The `kind`/`em` props replaced the old `variant` prop. Migration:
- `variant="secondary"` → `kind="input" em="low"` (new default)
- `variant="inline"` → `kind="tertiary" em="low"`

## Accessibility

| Element | Role | ARIA attributes |
|---------|------|----------------|
| Trigger wrapper | `combobox` | `aria-expanded`, `aria-haspopup="listbox"` |
| Trigger button | — | `aria-label` |
| Options container | `listbox` | `aria-multiselectable` (when multiple) |
| Option | `option` | `aria-selected`, `aria-disabled` |

Keyboard support:
- **Enter/Space** on trigger opens dropdown
- **Escape** from option or search closes dropdown and returns focus to trigger
- **Tab** navigates between options

## Portal

The dropdown content is portaled to `document.body` via `createPortal`. This avoids overflow clipping from ancestor elements. The container has `z-index: 1000` to render above other content.

## File map

| File | Purpose |
|------|---------|
| `Select.jsx` | Main component — state, context provider, option storage |
| `Trigger/Trigger.jsx` | Trigger button with chevron and clear icons |
| `Trigger/Trigger.module.css` | Trigger layout, caret sizing, tertiary padding override |
| `Content/Content.jsx` | Dropdown panel — search, scrollable options, portal |
| `Content/Content.module.css` | Container styling, visibility transitions, z-index |
| `Option/Option.jsx` | Individual option — selection, search filtering, resize detection |
| `Option/Option.module.css` | Option hover/focus/selected/disabled styles |
| `context.js` | React context for sharing state between sub-components |
| `Select.module.css` | Container, loading/error states |
| `index.jsx` | Exports |
