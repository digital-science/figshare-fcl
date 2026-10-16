# SearchInput Component

`SearchInput` is a self-contained search control with a text input, search submit button, and clear button. It does not rely on a `<form>` element, so it can be nested inside other forms or used independently. It supports both controlled and uncontrolled usage via `useControllableState`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | auto-generated | Input element ID (also used for label association) |
| `value` | `string` | — | Controlled value |
| `setValue` | `(value: string) => void` | — | Controlled setter (pair with `value`) |
| `defaultValue` | `string` | `""` | Initial value for uncontrolled usage |
| `onChange` | `(event) => void` | — | Called on every input change |
| `onSubmit` | `(event) => void` | — | Called on Enter key or search button click |
| `onClear` | `(event) => void` | — | Called when the clear button is clicked (also triggers `onChange` and `onSubmit` with empty value) |
| `kind` | `"default"` \| `"underline"` | — | Visual theme passed to the underlying `TextInput` |

All other props are spread onto the underlying `TextInput`.

## Controlled vs uncontrolled

```jsx
// Uncontrolled — manages its own state
<SearchInput onSubmit={handleSearch} />

// Uncontrolled with initial value
<SearchInput defaultValue="initial query" onSubmit={handleSearch} />

// Controlled — parent manages state
const [query, setQuery] = useState("");
<SearchInput value={query} setValue={setQuery} onSubmit={handleSearch} />
```

## Event handling

The component emits a `PacketOrEventLikeObject` for all callbacks (`onChange`, `onSubmit`, `onClear`):

```ts
{ value, name, target: { value, name }, preventDefault, stopPropagation }
```

- **Enter key** triggers `onSubmit` with the current value
- **Clear button** resets value to `""`, then calls `onClear`, `onChange`, and `onSubmit` with the empty value, and refocuses the input
- **Search button** triggers `onSubmit` with the current value

## Clear button visibility

The clear button only appears when the input has a value (`data-clearable` attribute). The input's right padding adjusts automatically to accommodate the buttons.

## Migration from old SearchInput (`packages/ui/input/search/`)

The old `SearchInput` is a class component wrapped in a `<form>` element with `action` and `method` props for traditional form submission.

| Old prop | New equivalent | Notes |
|----------|---------------|-------|
| `theme` (`"default"` \| `"underline"`) | `kind` | Same values |
| `value` + `onChange` | `value` + `setValue` + `onChange` | New component separates state setter from change handler |
| `onSubmit` | `onSubmit` | No longer a form submit event — receives `PacketOrEventLikeObject` |
| `action`, `method` | Removed | No `<form>` wrapper — handle submission in `onSubmit` callback |
| `size` (`"S"` \| `"M"` \| `"L"`) | Removed | New component uses standard sizing |
| `label` | Built-in | Always renders a visually hidden "Search" label |
| `error` | — | Not directly supported — apply via className or wrapper |
| `disabled` | Spread via `...rest` | Passed through to the underlying `TextInput` |
| `searchButtonType` | Removed | Always `type="button"` (no form submission) |

```jsx
// Old
<SearchInput
  theme="default"
  size="M"
  value={query}
  onChange={handleChange}
  onSubmit={handleSubmit}
/>

// New
<SearchInput
  kind="default"
  value={query}
  setValue={setQuery}
  onChange={handleChange}
  onSubmit={handleSubmit}
/>
```

## Files

| File | Purpose |
|------|---------|
| `SearchInput.tsx` | Component implementation, `useUniqueId`, `asPacketOrEventLikeObject` |
| `SearchInput.module.css` | Layout, button positioning, clearable padding |
| `index.tsx` | Public exports |
