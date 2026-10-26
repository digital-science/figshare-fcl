# Disclosure Component

The `Disclosure` component implements an accessible expand/collapse pattern using a compound component API with render props. It manages visibility state and provides proper ARIA attributes automatically.

## When to use

Use Disclosure for any show/hide toggle: accordions, FAQ sections, collapsible panels, expandable rows, settings sections. It handles both controlled and uncontrolled state, so it works for simple toggles and complex multi-panel coordination.

## Structure

```jsx
import { Disclosure } from "@digital-science/figshare-fcl/latest/Disclosure";

<Disclosure>
  <Disclosure.Toggle>
    {({ visible, ...toggleProps }) => (
      <button {...toggleProps}>
        {visible ? "Hide" : "Show"}
      </button>
    )}
  </Disclosure.Toggle>
  <Disclosure.Content>
    {({ visible, ...contentProps }) => (
      visible ? <div {...contentProps}>Content here</div> : null
    )}
  </Disclosure.Content>
</Disclosure>
```

## Props

### Disclosure (root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | — | Controlled visibility state |
| `defaultVisible` | `boolean` | `false` | Initial state for uncontrolled mode |
| `keepMounted` | `boolean` | `false` | Keep content in DOM when hidden |
| `onToggle` | `(visible: boolean) => void` | — | Callback when visibility changes |

### Disclosure.Toggle

Render prop component. The child function receives:

| Prop | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Current visibility state |
| `role` | `"button"` | ARIA role |
| `aria-controls` | `string` | ID of the controlled content element |
| `aria-expanded` | `boolean` | Whether content is visible |
| `onClick` | `() => void` | Toggle handler |

### Disclosure.Content

Render prop component. The child function receives:

| Prop | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Current visibility state |
| `id` | `string` | Matching ID for `aria-controls` |
| `aria-hidden` | `boolean` | Whether content is hidden |

## Controlled vs uncontrolled

**Uncontrolled** (default) — state managed internally:
```jsx
<Disclosure defaultVisible={false}>
  ...
</Disclosure>
```

**Controlled** — parent manages state:
```jsx
const [open, setOpen] = useState(false);

<Disclosure visible={open} onToggle={setOpen}>
  ...
</Disclosure>
```

## Accessibility

The component automatically handles:
- `role="button"` on the toggle
- `aria-expanded` reflecting visibility state
- `aria-controls` linking toggle to content via matching ID
- `aria-hidden` on content when collapsed

Consumers control the rendering — the component provides the props, consumers spread them onto their elements.

## Patterns

### Animated disclosure

```jsx
<Disclosure.Content>
  {({ visible, ...props }) =>
    visible ? (
      <div {...props} className="slide-down-animation">
        Content
      </div>
    ) : null
  }
</Disclosure.Content>
```

### Multiple disclosures (FAQ/accordion)

```jsx
{items.map((item) => (
  <Disclosure key={item.id}>
    <Disclosure.Toggle>
      {({ visible, ...props }) => (
        <button {...props}>{item.question}</button>
      )}
    </Disclosure.Toggle>
    <Disclosure.Content>
      {({ visible, ...props }) =>
        visible ? <div {...props}>{item.answer}</div> : null
      }
    </Disclosure.Content>
  </Disclosure>
))}
```

## File map

| File | Purpose |
|------|---------|
| `Disclosure.tsx` | Component implementations (Disclosure, DisclosureToggle, DisclosureContent) |
| `types.ts` | TypeScript types and render prop signatures |
| `index.tsx` | Re-exports |
