# Button Component

The `Button` is a unified interactive control that renders as a `<button>` or `<a>` depending on whether an `href` prop is provided. It replaces the legacy `Button`, `GenericButton`, `IconButton`, and `Link` components with a single, composable API driven by `kind`, `em`, `span`, and `inline` props.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `kind` | `"primary"` \| `"secondary"` \| `"tertiary"` \| `"inverted"` \| `"input"` | `"primary"` | Visual theme |
| `em` | `"high"` \| `"low"` \| `"success"` \| `"danger"` | `"high"` | Emphasis level — controls color intensity and contrast |
| `span` | `"full"` \| `"fit"` \| `"fit-content"` \| `"icon"` \| `"narrow"` \| `"button"` \| `"content"` | — | Width behavior |
| `justify` | `"between"` \| `"start"` \| `"end"` | — | Content justification |
| `gap` | `"medium"` \| `"small"` | — | Gap between button children (icon, label). Default is 12px. `"medium"` = `2 * gridSize`, `"small"` = `1 * gridSize`. Only set when explicitly needed. |
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
import { bindLinkComponent } from "@digital-science/figshare-fcl/latest/Button/anchor";
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

`span="content"` constrains width to content. On `kind="tertiary"` it also removes horizontal padding, making the button behave like a text link; other kinds keep their padding. This is the correct span for replacing `GenericButton` and text-only links.

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

### `innerRef` → `ref`

All old button components accept `innerRef` (via the `Base` component or `withRef` HOC) for getting a reference to the underlying DOM element. The new Button uses standard React `ref` forwarding. When replacing old buttons, change `innerRef` to `ref`. Be aware of contexts where `innerRef` is passed by a parent component — for example, `ListElementDropdown` and similar dropdown/popover components pass `innerRef` to their toggle renderer function. These call sites need to be updated to pass `ref` instead.

```jsx
// Old — toggle renderer receiving innerRef
<ListElementDropdown toggle={({ innerRef, ...props }) => (
  <GenericButton innerRef={innerRef} {...props}>Options</GenericButton>
)} />

// New — use ref
<ListElementDropdown toggle={({ ref, ...props }) => (
  <Button ref={ref} span="content" kind="tertiary" em="low" {...props}>
    <Button.Label>Options</Button.Label>
  </Button>
)} />
```

### Theme mapping reference

The mapping is chosen by **visual equivalence** (background, border, label color, icon fill, and hover/click states), not by theme name. The three legacy components do **not** share one mapping: the same theme name looks different on `Button` and on `IconButton`. Use the table for the component you are replacing.

#### Legacy defaults (when no `theme` is passed)

| Old component | Default theme | New equivalent |
|---------------|---------------|----------------|
| `Button` | `secondary` | `kind="secondary" em="high"` |
| `IconButton` | `primary` | `kind="tertiary" em="high" span="icon"` (**not** a filled button, see below) |
| `GenericButton` | none (unstyled, inherits the global `a, button` rule: branded text, transparent background, no padding, underline on hover) | `kind="tertiary" em="high" span="content"` |

An unthemed old `Button` is therefore `kind="secondary"`. Do not default to `primary`.

#### Old `Button` themes

Colors are the light-theme values of the legacy `--color-button-*` tokens and the new `Button.module.css` fallbacks.

| Old theme | New `kind` | New `em` | Visual comparison |
|-----------|-----------|----------|-------------------|
| `primary` | `"primary"` | `"high"` | Exact. White on `#a60845`; hover `#7a183e`; click `#63233c`. |
| `primaryAlt` | `"primary"` | `"success"` | Exact. White on `#2a6347`; hover `#25573e`; click `#1f4a35`. |
| `secondary` | `"secondary"` | `"high"` | Same background `#fff`, border `#ddd`, label `#a60845`, same hover/click fills. Idle icon fill differs: old `#8d8d8d`, new `#464646`. |
| `secondaryAlt` | `"secondary"` | `"low"` | Exact. Label `#464646`, icon `#8d8d8d`, border `#ddd`, background `#fff`. |
| `tertiary` | `"tertiary"` | `"high"` + `span="content"` | Exact. Label `#a60845`, icon `#8d8d8d`, transparent, underline on hover, no horizontal padding. |
| `tertiaryAlt` | `"tertiary"` | `"low"` + `span="content"` | Same shape and icon `#8d8d8d`. Label is `#252525` instead of `#464646` (slightly darker). |
| `inverted` | `"inverted"` | `"high"` | Same. White label and icon on transparent; hover `#f5f5f5` becomes `#fff`. |

For old `Button`, the rule of thumb holds: a theme name ending in `Alt` means `em="low"` (or `em="success"` for `primaryAlt`), otherwise `em="high"`.

#### Old `IconButton` themes

The old `IconButton` has a **transparent background and no border in every theme**; only the icon color changes (and it changes to `#7a183e` on hover, `#63233c` on click, except the `Alt` themes). It is *not* a filled or bordered button, so do not map its theme name onto the `Button` table above. The nearest new equivalent is a transparent `tertiary`/`inverted` button with `span="icon"` (which also sets the icon fill to the text color):

| Old theme | Old icon color (hover / click) | New `kind` | New `em` | Visual comparison |
|-----------|-------------------------------|-----------|----------|-------------------|
| `primary` (default) | `#a60845` (`#7a183e` / `#63233c`) | `"tertiary"` | `"high"` | Exact. |
| `tertiary` | `#8d8d8d` (`#7a183e` / `#63233c`) | `"tertiary"` | `"low"` | Exact. |
| `secondary` | `#525252` (`#7a183e` / `#63233c`) | `"tertiary"` | `"low"` | Nearest. Hover/click match; idle icon is lighter (`#8d8d8d` instead of `#525252`). |
| `primaryAlt` | `#e9e9e9` (`#fff`) | `"inverted"` | `"high"` | Nearest. For dark backgrounds; idle icon `#fff` instead of `#e9e9e9`. |
| `secondaryAlt` | `#fff` (`#e9e9e9`) | `"inverted"` | `"high"` | Nearest. For dark backgrounds. |

Use `kind="primary"` or `kind="secondary"` on an icon-only button only when a filled or bordered icon button is intentionally wanted; that is a visual change from the old `IconButton`.

#### Old `GenericButton`

`GenericButton` accepts no `theme`; any `theme`/`variant` passed to it is ignored and the button renders unstyled. Map it by how it looked in context:

| Old look | New `kind` | New `em` |
|----------|-----------|----------|
| Default (inherited global link/button style, branded text) | `"tertiary"` | `"high"` (+ `span="content"`) |
| Custom CSS made the text black/gray | `"tertiary"` | `"low"` (+ `span="content"`) |
| Icon-only content (e.g. a close icon, no text) | `"tertiary"` | `"low"` or `"high"` by icon color, with `span="icon"` |
| White text on a dark background | `"inverted"` | `"high"` |

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
// Before (default theme is "primary": transparent background, magenta icon)
<IconButton Icon={SearchIcon} onClick={handler}>
  Search items
</IconButton>

// After
<Button span="icon" kind="tertiary" em="high" tooltip="Search items" aria-label="Search items" onClick={handler}>
  <Button.Icon><SearchIcon /></Button.Icon>
</Button>
```

Key mapping rules:
- `span="icon"` is required — it constrains width and syncs icon fill with text color.
- Pick `kind`/`em` from the **Old `IconButton` themes** table above. Do not copy the theme name into `kind`: the old `IconButton` is never filled or bordered, so `theme="secondary"` is `kind="tertiary" em="low"`, not `kind="secondary"`.
- The `children` (text) of the old `IconButton` become the `tooltip` prop on the new Button; also set `aria-label` to the same text.
- The `Icon` prop gets instantiated and wrapped in `<Button.Icon>`: `Icon={SearchIcon}` becomes `<Button.Icon><SearchIcon /></Button.Icon>`.
- `span="icon"` should be used **exclusively** for buttons replacing `IconButton` — do not use it on buttons that also have visible text labels.

### Replacing old `Button`

The old `Button` extends `GenericButton` with themes (`primary`, `primaryAlt`, `secondary`, `secondaryAlt`, `tertiary`, `tertiaryAlt`, `inverted`), sizes (`S`, `M`, `L`), and an optional `Icon` prop with `iconPlacement` (`"left"` or `"right"`). **When no `theme` is passed the old default is `secondary`**, so an unthemed old `Button` becomes `kind="secondary" em="high"`.

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
