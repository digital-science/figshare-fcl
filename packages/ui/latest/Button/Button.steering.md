# Button Component

The `Button` is a unified interactive control that renders as a `<button>` or `<a>` depending on whether an `href` prop is provided. It replaces the legacy `Button`, `GenericButton`, `IconButton`, and `Link` components with a single, composable API driven by `kind`, `em`, `span`, and `inline` props.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `kind` | `"primary"` \| `"secondary"` \| `"tertiary"` \| `"inverted"` \| `"input"` | `"primary"` | Visual theme |
| `em` | `"high"` \| `"low"` \| `"success"` \| `"danger"` | `"high"` | Emphasis level — controls color intensity and contrast |
| `span` | `"full"` \| `"fit"` \| `"fit-content"` \| `"icon"` \| `"narrow"` \| `"button"` \| `"content"` | — | Width behavior |
| `justify` | `"between"` \| `"start"` \| `"end"` | — | Content justification |
| `inline` | `boolean` \| `"text"` \| `"slim"` \| `"slim-flexible"` | `false` | Inline display mode |
| `disabled` | `boolean` | `false` | Disabled state (uses `aria-disabled`) |
| `loading` | `boolean` \| `ReactNode` | `false` | Loading state — `true` shows a spinner, or provide custom loading content |
| `tooltip` | `ReactNode` | — | Tooltip content (wraps the button in a Tooltip) |
| `tooltipOptions` | `object` | `{}` | Options passed to the floating tooltip (placement, strategy, etc.) |
| `href` | `string` | — | Makes the button render as an anchor/link |
| `external` | `boolean` | — | Force external link behavior (bypasses internal routing) |
| `onClick` | `function` | — | Click handler |

## Compound components

| Component | Purpose |
|-----------|---------|
| `Button.Label` | Wraps text content. Props: `wrap` (`boolean` \| `"ellipsis"` \| `"wrap"` \| `"nowrap"` \| `"wrap-all"`), `decoration` (`"underline"` \| `"none"`), `hidden` (visually hidden but accessible). Auto-sets `aria-label` on the parent button if it has none. |
| `Button.Icon` | Wraps an icon element. Props: `asChild` (clone props onto child directly), `blend` (match button text color instead of fill color), `size` (`"small"` \| `"medium"` \| `"large"`). Default size is 16px. |
| `Button.InteractiveIcon` | An icon that is independently clickable inside a button, with its own tooltip, keyboard support, and focus ring. Props: `tooltip`, `onClick`, `onKeyDown`, `ownColor`. When used directly inside a Button (not wrapped in `IconGroup`), the button should use `inline="slim"` to remove vertical padding, since the interactive icon (38px hit area) occupies the full button height. |
| `Button.IconGroup` | Groups multiple icons. Props: `interactive` (wraps each child in a sized slot). |
| `Button.Loading` | Loading content with spinner/logo positioning. Props: `spinner` (`true` \| `"left"` \| `"right"`), `logo` (same), `text`. |

### Accessibility: always provide an `aria-label`

Every button should have an accessible label. `Button.Label` with a string child automatically sets `aria-label` on the parent button. For buttons without a visible `Button.Label` (e.g. icon-only buttons), add `aria-label` explicitly:

```jsx
// Button.Label handles it automatically
<Button kind="primary">
  <Button.Label>Save</Button.Label>
</Button>

// No visible label — provide aria-label yourself
<Button span="icon" kind="tertiary" em="low" aria-label="Delete item" onClick={handler}>
  <Button.Icon><TrashIcon /></Button.Icon>
</Button>
```

## Routing with `bindLinkComponent`

When the Button receives an `href`, it renders an anchor tag. By default this is a plain `<a>`. To integrate with a routing library (e.g. React Router), bind a custom link component **once at the app level**:

```jsx
// In your app entry point (e.g. App.tsx or index.tsx)
import { bindLinkComponent } from "@digital-science/figshare-fcl/ui/latest/Button/anchor";
import { Link } from "react-router-dom";

bindLinkComponent({ component: Link });
```

After binding, every `<Button href="/some-path">` automatically routes internally via React Router. External URLs (`https://...`, `mailto:`, etc.) are detected automatically and rendered with a plain `<a>`.

`bindLinkComponent` options:
- `component` — the link component to use (e.g. React Router's `Link`)
- `mapProps` — optional function to transform props (default maps `href` to `to`)
- `bindExternal` — if `true`, also uses the custom component for external links (default `false`)

The `external` prop on Button can force external rendering regardless of URL pattern.

## Kind and em combinations

The `kind` prop sets the visual theme; `em` (emphasis) modulates it.

| kind | em="high" (default) | em="low" |
|------|---------------------|----------|
| `primary` | Branded filled button (magenta bg, white text) | — |
| `primary` + `em="success"` | Green filled button | — |
| `primary` + `em="danger"` | Red filled button | — |
| `secondary` | Bordered button, branded text, fills on hover | Gray text, gray icon, fills on hover |
| `secondary` + `em="success"` | Green bordered, fills green on hover | — |
| `secondary` + `em="danger"` | Red bordered, fills red on hover | — |
| `tertiary` | No background, branded text, underlines on hover (link-like) | No background, dark text, underlines on hover |
| `tertiary` + `em="danger"` | No background, red text, red fill on hover | — |
| `inverted` | White text on transparent bg — for dark backgrounds | — |
| `input` | Styled as an input control (border without actual border, input-like appearance) | Same as high |

### Tertiary as a link replacement

`kind="tertiary"` buttons with `href` automatically get `text-decoration: underline` via `data-scope="link"`. The `em="low"` variant uses dark text (no underline by default, underlines on hover) — suitable for navigation-style links that don't need branded color.

## Span (sizing)

The `span` prop controls button width behavior. The default (no `span`) gives a standard flex button.

| span | Behavior | Use when |
|------|----------|----------|
| `"content"` | `max-width: fit-content`, no horizontal padding | Text-only links, inline actions, GenericButton replacements |
| `"icon"` | `max-width: fit-content`, icon fill matches text color | Icon-only buttons (IconButton replacements) |
| `"fit-content"` | `max-width: fit-content`, keeps padding | Compact buttons that shouldn't stretch |
| `"fit"` | Same as `fit-content` | Alias |
| `"full"` | `width: 100%` | Full-width CTAs, form submit buttons |
| `"button"` / `"narrow"` | `min-width: 6 grid units` | Small fixed-width controls |

### Content span for link-like buttons

`span="content"` removes horizontal padding and constrains width to content, making the button behave like a text link. This is the correct span for replacing `GenericButton` and text-only links.

## Inline display

The `inline` prop controls how the button sits in text flow:

| Value | Behavior |
|-------|----------|
| `true` | `display: inline-flex` |
| `"text"` | `display: inline`, no min-height, no padding — flows exactly like text. Use for links within paragraph text. |
| `"slim"` | `display: inline-flex`, reduced min-height (`5 * gridSize`), no vertical padding. For compact inline controls like keyword tags. |
| `"slim-flexible"` | Like `"slim"` but `min-height: auto` — fully flexible height. |

## Migration from legacy components

The legacy button package (`packages/ui/button/`) exports three class components — `Button`, `GenericButton`, and `IconButton` — all built on top of `GenericButton`'s base, which itself extends a `Base` component that handles `<button>` vs `<a>` rendering, disabled state, touch events, and tooltip positioning via `react-popper`. The new `/latest/Button` replaces all of them with a single functional component.

### Theme mapping reference

The old components use a `theme` (or `variant`) prop. Map them to `kind` + `em` as follows:

| Old theme/variant | New `kind` | New `em` | Notes |
|-------------------|-----------|----------|-------|
| `primary` | `"primary"` | `"high"` | Branded filled button |
| `primaryAlt` | `"primary"` | `"success"` | Green filled button (old primaryAlt used green tones) |
| `secondary` | `"secondary"` | `"high"` | Bordered, branded text |
| `secondaryAlt` | `"secondary"` | `"low"` | Bordered, gray/dark text |
| `tertiary` | `"tertiary"` | `"high"` | No background, branded text |
| `tertiaryAlt` | `"tertiary"` | `"low"` | No background, dark/black text |
| `inverted` | `"inverted"` | `"high"` | White text for dark backgrounds |

**Rule of thumb:** if the old theme name ends in `Alt`, use `em="low"`. Otherwise use `em="high"`.

### Replacing `GenericButton`

`GenericButton` is the foundational old component — a borderless, unstyled button/anchor with tooltip support. It renders `<button>` or `<a>` based on `href`, and manages its own tooltip via `react-popper` with IntersectionObserver visibility tracking.

```jsx
// Before
<GenericButton onClick={handler}>Click me</GenericButton>

// After
<Button span="content" kind="tertiary" em="high" onClick={handler}>
  <Button.Label>Click me</Button.Label>
</Button>
```

If the old GenericButton had custom styling that made it black/gray (or was used with a `tertiaryAlt` theme when wrapped in another component), use `em="low"`:

```jsx
<Button span="content" kind="tertiary" em="low" onClick={handler}>
  <Button.Label>Click me</Button.Label>
</Button>
```

Old `GenericButton` props that change in the new component:
- `innerRef` becomes the standard `ref` (forwarded ref)
- `tooltip` stays as `tooltip`
- `classNameTooltip` is no longer needed — use `tooltipContentProps` for tooltip styling
- `normalizeHref` is removed — normalize URLs before passing `href`
- `onLongPress` is removed — handle at the consumer level if needed

### Replacing `IconButton`

The old `IconButton` is an icon-only button (`Icon` prop required, `children` become tooltip content). It has a fixed size of `6 * gridSize` (38px), expanding to `8 * gridSize` on mobile. It supports themes: `primary`, `primaryAlt`, `secondary`, `secondaryAlt`, `tertiary`.

```jsx
// Before
<IconButton theme="secondary" Icon={SearchIcon} onClick={handler}>
  Search items
</IconButton>

// After
<Button span="icon" kind="secondary" em="high" tooltip="Search items" onClick={handler}>
  <Button.Icon><SearchIcon /></Button.Icon>
</Button>
```

Key mapping rules:
- `span="icon"` is required — it constrains width and syncs icon fill with text color.
- The `children` (text) of the old `IconButton` become the `tooltip` prop on the new Button.
- The `Icon` prop gets instantiated and wrapped in `<Button.Icon>`: `Icon={SearchIcon}` becomes `<Button.Icon><SearchIcon /></Button.Icon>`.
- Use `em="low"` if the old theme/variant contained "Alt" (e.g. `secondaryAlt`, `primaryAlt`); otherwise `em="high"`.
- `span="icon"` should be used **exclusively** for buttons replacing `IconButton` — do not use it on buttons that also have visible text labels.

### Replacing old `Button`

The old `Button` extends `GenericButton` with themes (`primary`, `primaryAlt`, `secondary`, `secondaryAlt`, `tertiary`, `tertiaryAlt`, `inverted`), sizes (`S`, `M`, `L`), and an optional `Icon` prop with `iconPlacement` (`"left"` or `"right"`).

```jsx
// Before
<Button theme="primary" onClick={handler}>Save</Button>

// After
<Button kind="primary" em="high" onClick={handler}>
  <Button.Label>Save</Button.Label>
</Button>
```

The text content of old buttons must always be wrapped in `<Button.Label>` in the new component. This enables text overflow control (ellipsis, wrapping) and auto-sets `aria-label`.

When the old Button has an `Icon` prop:

```jsx
// Before
<Button theme="secondary" Icon={DownloadIcon} iconPlacement="left">
  Download
</Button>

// After
<Button kind="secondary" em="high">
  <Button.Icon><DownloadIcon /></Button.Icon>
  <Button.Label>Download</Button.Label>
</Button>
```

For `iconPlacement="right"`, place `<Button.Icon>` after `<Button.Label>`:

```jsx
<Button kind="secondary" em="high">
  <Button.Label>Download</Button.Label>
  <Button.Icon><DownloadIcon /></Button.Icon>
</Button>
```

Old `size` prop: the new Button does not have a `size` prop — it uses standard 16px/38px sizing. If the old button used `size="S"` with notably smaller text, apply font-size via className or a wrapping Block if needed.

### Replacing `Link` and link-emulating components

Links, `GenericButton` with branded text styling, or old `Button` with `theme="tertiary"/"tertiaryAlt"` used as navigation:

```jsx
// Before (inline in text)
<p>Read the <Link href="/docs">documentation</Link> for details.</p>

// After
<p>Read the <Button href="/docs" kind="tertiary" em="high" span="content" inline="text">
  <Button.Label>documentation</Button.Label>
</Button> for details.</p>
```

- Use `inline="text"` when the link sits inside paragraph/text content — it renders as `display: inline` with no padding or min-height, flowing exactly like surrounding text.
- Use `inline={true}` if the link should be `inline-flex` but retain standard button height.
- Use `inline="slim"` if the link needs compact inline display with reduced height but some vertical structure (e.g. keyword tags, small navigation items). Check existing custom styles for padding/margin and pick the appropriate inline value.
- Use `inline="slim-flexible"` for fully flexible height (`min-height: auto`).
- Use `em="low"` if the old component was styled as `tertiaryAlt` or had black/gray text styling.
- Use `em="high"` for branded-color links (the default magenta tertiary style).
- If the link-like button should appear underlined even when not hovered (e.g. inline navigation links, history links, redirects), use the `decoration` prop on `Button.Label`:

```jsx
<Button href="/settings" kind="tertiary" em="low" span="content" inline="text">
  <Button.Label decoration="underline">Account settings</Button.Label>
</Button>
```

By default, `kind="tertiary"` buttons with `href` underline on hover via `data-scope="link"`. The `decoration="underline"` prop on `Button.Label` makes the underline permanent regardless of hover state. Use `decoration="none"` to explicitly suppress underline on the label if needed.

### Replacing icons in buttons

When migrating any old button that has an `Icon` prop or icon components as children:

1. Wrap the icon inside `<Button.Icon>` in the new Button. The old pattern `Icon={SomeIcon}` (passing a component reference) becomes `<Button.Icon><SomeIcon /></Button.Icon>` (instantiating and wrapping).
2. `Button.Icon` defaults to 16px width, which matches the old icon sizing.
3. Use `blend` prop on `Button.Icon` if the icon should match the button's text color instead of the default fill color. Note: `span="icon"` buttons already blend icons by default via CSS (`--button-fill: currentcolor`), so explicit `blend` is mainly needed for non-icon-span buttons where the icon color should follow text.
4. If the old icon had custom sizing styles, use the `size` prop (`"small"` = 14px, `"medium"` = 16px default, `"large"` for larger).
5. The old `IconButton` blended icon color with its theme by default — `span="icon"` preserves this behavior automatically.

```jsx
// Button with icon and label
<Button kind="secondary" em="high" onClick={handler}>
  <Button.Icon><DownloadIcon /></Button.Icon>
  <Button.Label>Download</Button.Label>
</Button>

// Icon-only button (replacing IconButton)
<Button span="icon" kind="tertiary" em="low" tooltip="Download" onClick={handler}>
  <Button.Icon><DownloadIcon /></Button.Icon>
</Button>
```

## Files

| File | Purpose |
|------|---------|
| `Button.tsx` | Component implementation and compound components |
| `Button.module.css` | All visual styles (kind, em, span, inline, icon, label) |
| `types.tsx` | TypeScript types for all props |
| `anchor.tsx` | Link binding system (`bindLinkComponent`, `isExternalLink`) |
| `index.tsx` | Public exports |
