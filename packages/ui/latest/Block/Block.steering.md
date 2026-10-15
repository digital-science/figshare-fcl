# Block Component

The `Block` (also exported as `Box`) is a layout primitive. Every piece of UI layout in the application can be built by composing Blocks. Instead of writing CSS for layout concerns, you declare intent through the `kind` prop — a space-separated string of modifier tokens.

## When to use Block

Block should be used to **replace existing flex containers** in page layouts and components. Any element whose CSS is primarily concerned with flex layout, spacing (padding, margin, gap), or sizing is a candidate for replacement. The goal is to reduce the CSS footprint by eliminating repetitive, one-off layout rules in css or module.css files in components or pages that can be expressed declaratively through `kind` tokens instead.

Block also provides built-in **responsive layout** out of the box. When replacing existing containers, consider adding responsive modifiers: a block might need to flow wider on mobile (`m-span-full`), use tighter spacing (`m-gap-1 m-p-2`), or switch direction (`t-column`). This replaces scattered media queries in component CSS with a single, readable `kind` string.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `kind` | `string` | `"row"` | Space-separated layout modifier tokens |
| `tag` | `React.ElementType` | `"div"` | The HTML element to render |
| `mark` | `string` | — | Sets `id`, `key`, and `data-mark` on the element |
| `className` | `string` | — | Additional CSS class names |
| `inferDirection` | `boolean` | `false` | Infer text direction (LTR/RTL) from children content |
| `ref` | `React.Ref` | — | Forwarded ref |

All other props are spread onto the rendered element.

### Using `mark`

Always add a simple `mark` value to Block uses so they can be easily identified in the rendered page output. The mark is set as `id`, `key`, and `data-mark` on the DOM element, making it straightforward to locate specific blocks when inspecting the page or debugging layout issues.

```jsx
<Block mark="page-header" kind="row align-center justify-between p-3">
  <Logo />
  <Nav />
</Block>
<Block mark="main-content" kind="column gap-3 fit">
  <Content />
</Block>
```

## How it works

The `kind` string is set as a `data-kind` attribute. CSS uses `[data-kind~="token"]` attribute selectors to apply styles. The `~=` selector matches whole words in a space-separated list, so `kind="row gap-2 p-3"` activates the `row`, `gap-2`, and `p-3` rules independently.

## Modifier reference

All modifiers support responsive prefixes: no prefix (default), `t-` (tablet, <= 1024px), `m-` (mobile, <= 600px). For example `kind="row t-column m-column gap-2 m-gap-1"` creates a row layout that switches to column on tablet and mobile, with gap shrinking on mobile.

### Positioning

`relative` `absolute` `fixed` `sticky` `static`

### Display

`inline` `inline-block` `block` `flex` `flex-inline`

### Flex direction

`row` `row-reverse` `column` `column-reverse`

These set `display: flex`, `flex-direction`, and `flex: 1`.

### Flex control

| Token | Effect |
|-------|--------|
| `fit` | `flex: 1` |
| `grow` | `flex: 1 0` |
| `grow-1` / `grow-0` | `flex-grow: 1` / `flex-grow: 0` |
| `shrink` | `flex: 0 1` |
| `shrink-1` / `shrink-0` | `flex-shrink: 1` / `flex-shrink: 0` |
| `wrap` | `flex-wrap: wrap` |
| `no-wrap` | `flex-wrap: nowrap` |
| `wrap-reverse` | `flex-wrap: wrap-reverse` |

### Alignment

`align-center` `align-start` `align-end` `align-stretch` `align-baseline`

### Justify

`justify-center` `justify-start` `justify-end` `justify-between` `justify-evenly` `justify-around` `justify-stretch`

### Self alignment

`align-self-start` `align-self-center` `align-self-end` `align-self-stretch` `align-self-baseline`

`justify-self-start` `justify-self-center` `justify-self-end` `justify-self-stretch`

### Overflow

`overflow-hidden` `overflow-auto` `overflow-visible` `overflow-scroll`

`overflow-x-hidden` `overflow-x-auto` `overflow-y-hidden` `overflow-y-auto`

### Text alignment

`text-left` `text-center` `text-right`

### Cursor

`cursor-pointer` `cursor-default`

### Gap

Sizes use a grid-unit scale: `1/2`, `1` through `10`.

- `gap-{size}` — both row and column gap
- `gap-row-{size}` — row gap only
- `gap-col-{size}` — column gap only

### Padding

Sizes: `0`, `1/2`, `1` through `10`.

| Pattern | CSS property |
|---------|-------------|
| `p-{size}` | `padding` |
| `px-{size}` | `padding-left` + `padding-right` |
| `py-{size}` | `padding-top` + `padding-bottom` |
| `pt-{size}` | `padding-top` |
| `pb-{size}` | `padding-bottom` |
| `pl-{size}` | `padding-left` |
| `pr-{size}` | `padding-right` |

### Margin

Same patterns as padding: `m-`, `mx-`, `my-`, `mt-`, `mb-`, `ml-`, `mr-`.

### Sizing (span)

All sizing modifiers accept numeric sizes (`0`-`10`, plus `20`, `26`, `30`, `60` where applicable) and keyword values: `content` (fit-content), `max-content`, `min-content`, `auto`, `full` (100%).

| Modifier | CSS property |
|----------|-------------|
| `span-{value}` | `width` |
| `vspan-{value}` | `height` |
| `minspan-{value}` | `min-width` |
| `maxspan-{value}` | `max-width` |
| `minvspan-{value}` | `min-height` |
| `maxvspan-{value}` | `max-height` |

Special: `children-span-full` forces all direct children to `width: 100%`.

### Border

`bd-rounded` `bd-w-1` `bd-w-2` `bd-w-3` `bd-primary` `bd-rounded-primary` `bd-collapse`

### Background

`bg-primary` `bg-secondary`

### Visibility

`hidden` (display: none) `visibility-hidden` (visibility: hidden + pointer-events: none)

### Skeleton

`skeleton` — renders a pulsing placeholder block.

## Layout examples

### Basic page layout

```jsx
<Block kind="column gap-3 p-4">
  <Block kind="row align-center justify-between">
    <Logo />
    <Nav />
  </Block>
  <Block kind="row gap-4 fit">
    <Block kind="column span-8 gap-2">
      <MainContent />
    </Block>
    <Block kind="column span-4">
      <Sidebar />
    </Block>
  </Block>
</Block>
```

### Responsive card grid

```jsx
<Block kind="row wrap gap-3 t-gap-2 m-column m-gap-1">
  <Block kind="span-4 t-span-6 m-span-full p-3 bd-rounded bd-primary">
    <CardContent />
  </Block>
  <Block kind="span-4 t-span-6 m-span-full p-3 bd-rounded bd-primary">
    <CardContent />
  </Block>
  <Block kind="span-4 t-span-full m-span-full p-3 bd-rounded bd-primary">
    <CardContent />
  </Block>
</Block>
```

### Centered content with constrained width

```jsx
<Block kind="column align-center p-4">
  <Block kind="column maxspan-10 span-full gap-2">
    <Heading />
    <Paragraph />
  </Block>
</Block>
```

### Form layout

```jsx
<Block kind="column gap-2 span-8 m-span-full">
  <Block kind="row gap-2 m-column">
    <Block kind="column fit gap-1">
      <Label />
      <Input />
    </Block>
    <Block kind="column fit gap-1">
      <Label />
      <Input />
    </Block>
  </Block>
  <Block kind="row justify-end gap-1">
    <CancelButton />
    <SubmitButton />
  </Block>
</Block>
```

### Using the tag prop

```jsx
<Block tag="section" kind="column gap-3 p-4">
  <Block tag="header" kind="row align-center justify-between">
    <h1>Title</h1>
  </Block>
  <Block tag="main" kind="column gap-2">
    <Content />
  </Block>
  <Block tag="footer" kind="row justify-center p-2">
    <FooterContent />
  </Block>
</Block>
```

## Responsive design

Modifiers are applied at three breakpoints using prefixes:

| Prefix | Breakpoint | Meaning |
|--------|-----------|---------|
| _(none)_ | All screens | Default styles |
| `t-` | `<= 1024px` | Tablet and below |
| `m-` | `<= 600px` | Mobile only |

Tablet modifiers also apply to mobile unless a mobile modifier overrides them. This means you only need `m-` prefixes when mobile behavior differs from tablet.

### Token ordering

**Order matters in the `kind` string.** Always place tokens in this order:

1. Default modifiers first (no prefix)
2. Tablet modifiers (`t-`) second
3. Mobile modifiers (`m-`) last

This ensures that responsive overrides are applied correctly via CSS specificity and source order.

```jsx
// Correct: defaults, then tablet, then mobile
<Block kind="row gap-3 p-4 span-8 t-column t-gap-2 t-span-full m-gap-1 m-p-2" />

// Wrong: mixed ordering
<Block kind="row t-column gap-3 m-gap-1 p-4 t-gap-2" />
```

```jsx
// Row on desktop, column on tablet and mobile, tighter gap on mobile
<Block kind="row gap-3 t-column m-gap-1" />

// Hidden on mobile only
<Block kind="row m-hidden" />

// Full width on tablet and below
<Block kind="span-6 t-span-full" />
```

## Legacy kind tokens (deprecated)

The following legacy tokens are supported through a facade layer (`useBlockKind` hook) that translates them to new equivalents at runtime. **Do not use these in new code.** When modifying existing code that uses legacy tokens, replace them with the new equivalents.

The legacy CSS rules will be removed once all usages are migrated.

### Migration reference

| Legacy token | New equivalent |
|-------------|----------------|
| `layout-rows` | `row` |
| `layout-columns` | `column` |
| `layout-rows-reverse` | `row-reverse` |
| `layout-columns-reverse` | `column-reverse` |
| `layout-tablet-rows` | `t-row` |
| `layout-tablet-columns` | `t-column` |
| `layout-mobile-rows` | `m-row` |
| `layout-mobile-columns` | `m-column` |
| `flex-grow` | `grow` |
| `flex-shrink` | `shrink` |
| `flex-fit` | `fit` |
| `flex-wrap` | `wrap` |
| `flex-wrap-reverse` | `wrap-reverse` |
| `align-tablet-center` | `t-align-center` |
| `align-mobile-center` | `m-align-center` |
| `justify-tablet-between` | `t-justify-between` |
| `justify-mobile-between` | `m-justify-between` |
| `gap-half` / `gap-half-1` | `gap-1/2` |
| `gap-tight` | `gap-1` |
| `margin-none` | `m-0` |
| `margin-half-1` | `m-1/2` |
| `margin-{n}` | `m-{n}` |
| `padding-none` | `p-0` |
| `padding-half-1` | `p-1/2` |
| `padding-{n}` | `p-{n}` |
| `padding-2-3` | `py-2 px-3` |
| `padding-left-none` | `pl-0` |
| `padding-right-none` | `pr-0` |
| `padding-left-right-none` | `px-0` |
| `padding-top-none` | `pt-0` |
| `padding-top-{n}` | `pt-{n}` |
| `padding-bottom-none` | `pb-0` |
| `padding-bottom-{n}` | `pb-{n}` |
| `padding-top-bottom-none` | `py-0` |
| `padding-tablet-{...}` | `t-p-{...}` / `t-pt-{...}` / etc. |
| `padding-mobile-{...}` | `m-p-{...}` / `m-pt-{...}` / etc. |
| `border-rounded` | `bd-rounded` |
| `border-primary` | `bd-primary` |
| `border-rounded-primary` | `bd-rounded-primary` |
| `border-collapsible` | `bd-collapse` |
| `background-primary` | `bg-primary` |
| `background-secondary` | `bg-secondary` |
| `span-fit-content` | `span-content` |
| `span-tablet-full` | `t-span-full` |
| `span-mobile-full` | `m-span-full` |
| `children-span-tablet-full` | `t-children-span-full` |
| `children-span-mobile-full` | `m-children-span-full` |
| `span-min-{n}` | `minspan-{n}` |
| `span-min-full` | `minspan-full` |
| `v-span-{n}` | `minvspan-{n}` |
| `v-span-large-1` | `minvspan-10` |
| `v-span-large-2` | `minvspan-20` |
| `v-span-large-3` | `minvspan-30` |

The full mapping is defined in `useBlockKind.ts`.

## Files

| File | Purpose |
|------|---------|
| `Block.tsx` | Component implementation |
| `Block.module.css` | All modifier styles (default, tablet, mobile, legacy) |
| `types.tsx` | TypeScript types for `BlockProps` and all kind tokens |
| `useBlockKind.ts` | Legacy-to-new kind token translation hook |
