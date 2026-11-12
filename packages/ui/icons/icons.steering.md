# Icons

`icons/svg` and `icons/react` are the icon standard. Use them for every new icon and when touching code that uses an old one.

- `icons/svg/**/*.svg` is the source of truth: one file per icon, kebab-case.
- `icons/react/**/*.jsx` is generated from it (`make svg_react`): one memoised component per icon, PascalCase, all exported from `icons/react/index.jsx`.
- The folders `angle/`, `arrow/`, `caret/`, `cancel/`, `itemType/`, `socialMedia/`, … next to them are **legacy**. Don't add to them; migrate off them (see below).

## What makes an icon "standard"

- Has a `viewBox`, and no fixed size in the React component. The default width is `1em`; size it with CSS (`style`, `className`, `font-size`) or `IconSlot`.
- Blends: shapes are filled with `currentColor` (in the svg: `fill="black"`, which svgr turns into `props.color`). The icon takes the surrounding text colour. Override with the `color` prop or CSS `color`, not `fill`.
- One size per icon. Don't create `small`/`medium`/`large` variants; scale the one icon. A genuinely different drawing gets its own name (`caret` vs `caret-large`, `settings` vs `settings-small`).
- Decorative by default: `aria-hidden`, `focusable={false}`. For a meaningful icon, put the label on the control that holds it (`aria-label` on the button) or pass `aria-hidden={false}` with `title`.
- No hard-coded colours, except where a colour is the point (`figshare/logo`, `fig-spiral`, `loader`, `bell-notification`'s dot). `fill="white"` is only used for cut-outs inside the drawing.

Grid: 18×18 for general icons (glyph about 14–16 wide, centred). Folders below keep the proportions of their set.

## Layout

```
icons/
  svg/
    close.svg ...                  general icons, 18x18
    bluesky.svg, github.svg ...    brand / third-party, single colour
    item-type/book.svg ...         16 item type badges, 40x24
    presentation/quote.svg ...     13 large illustrations, x120 high
    figshare/logo.svg ...          figshare logo set
  react/
    Close.jsx ...
    item-type/Book.jsx, index.jsx
    presentation/Quote.jsx, index.jsx
    figshare/Logo.jsx, LogoMono.jsx, LogoFull.jsx, Wordmark.jsx, index.jsx
    index.jsx                      every icon, flat names
  legacy-map.json                  legacy import -> new icon (drives the Migration story)
```

Names in `icons/react/index.jsx`: general icons keep their name (`Close`); subfolders are prefixed (`ItemTypeDataset`, `PresentationQuote`, `FigshareLogoMono`). Inside a folder's own `index.jsx` the prefix is dropped (`Dataset`).

## Using them

```jsx
import { Close, ItemTypeDataset } from "@digital-science/figshare-fcl/icons/react";

<Close />                                    // 1em wide, currentColor
<Close style={{ width: 18 }} />              // sized with CSS
<ItemTypeDataset color="var(--color-icon-secondary)" style={{ height: 24, width: "auto" }} />
```

Prefer the barrel import over a deep path; each icon is a small module and bundlers tree-shake the barrel. Non-React consumers can use the files in `icons/svg` directly (inline them so `currentColor` works; `<img>` does not inherit colour).

Wide icons (`item-type`, `presentation`, `orcid`, `figshare/*`) are not square: set `height` and `width: "auto"`, since the default `1em` width would shrink them.

## Special sets

**item-type** (`svg/item-type`, `react/item-type`): `book, collection, dataset, figure, media, metadata, online-resource, paper, performance, poster, preprint, presentation, project, software, thesis, workflow`. Each is a rounded 40×24 badge with the glyph cut out, so the badge defaults to `var(--color-icon-secondary, #525252)`; pass `blend` to use `currentColor` instead. Use `IconSlot kind="item-type"` for the standard slot size and colours.

**figshare** (`svg/figshare`, `react/figshare`):

| Icon | Colours | Notes |
| --- | --- | --- |
| `Logo` | brand | `animate`, `grayscale` props. Hand-written (not svgr output) because of the per-layer animation; `Logo.module.css` |
| `LogoMono` | `currentColor` | same drawing, single colour |
| `Wordmark` | `currentColor` | "figshare" text |
| `LogoFull` | `currentColor` | logo and wordmark side by side |

`fig-spiral` is a separate, smaller brand-colour spiral on the 18 grid.

**presentation**: large illustrations (empty states, confirmations). By default they keep their original colours: `#8D8D8D` for most, and two-tone for `EmbedCode` and `EmbedTitle` (`color` `#525252`, `secondaryColor` `#DDD`), `EnvelopeError` (`#DDD` / `#A60845`) and `EnvelopeSuccess` (`#5FBDBB` / `#DDD`). Pass `blend` to render every layer in `currentColor` instead, so the icon follows the surrounding text colour. `color` and `secondaryColor` override either tone.

**angle** (`angle-up|down|left|right`): the legacy `angle/*` drawing, kept because `website-v3` uses `angle/left` and `angle/right` for paging buttons and breadcrumb separators. It is lighter and smaller than `chevron-large-*` at the same size. Prefer `angle-*` for breadcrumb separators and `chevron-*` elsewhere in new work.

**Added from website-v3's inline SVGs** (the Sherpa overlay and forms): `copyright`, `cloud-upload`, `hourglass`, `book`, `shield`, `asterisk`, `currency-pound`. They replace hand-written icons with hard-coded `#8D8D8D`. Mapping: `copyrightOwner`→`Copyright`, `publisherDeposit`→`CloudUpload`, `embargo`→`Hourglass`, `licence`→`Book`, `sherpa`→`Shield`, `MandatoryStar`→`Asterisk`, `oaFee`→`CurrencyPound`.

**currency** (`currency-pound|dollar|euro|yen`): `£` is the only symbol used in the apps today; the other three were added so the set is complete. All four are Open Sans Semibold glyphs (Apache 2.0, from the `website` repo's bundled font), so they share weight and proportions; `currency-pound` is therefore slightly different from the Sherpa `oaFee` icon it replaces.

**Brand/third-party** (top level): `bitbucket, github, gitlab, ftp-integration, orcid (wordmark), orcid-solid, facebook, twitter, linkedin, bluesky, vimeo, rss`. They are single colour now; set the brand colour with `color` if you need it. `twitter_inverted` is gone: it was `twitter` with the colours swapped, so use `twitter` and swap `color`.

## Adding an icon

1. Export from Figma at its natural size on the 18×18 grid. Make sure it has a `viewBox`.
2. Flatten it: one fill, no strokes unless needed, avoid clip paths, masks and defs (ids collide when the same icon is inlined twice; a number of older icons still have them). Fill shapes with `black`; the root is `fill="none"`.
3. Save as `icons/svg/<kebab-name>.svg` (or `svg/<folder>/<name>.svg` for a set). No spaces or ` 1` suffixes in file names.
4. `make svg_react` (needs `npm i -g @svgr/cli`). It uses `svgr.config.js` and skips files that already exist (`--ignore-existing`), so delete the `.jsx` first if you are replacing an icon.
5. Add the export to `icons/react/index.jsx` (and the folder's `index.jsx` for a set). `icons/react/index.test.jsx` fails if an svg has no export.
6. Check it in Storybook: Icons / Gallery.

## Migrating from the legacy icons

Legacy icons are classes with a fixed `width`/`height`, a `viewBox` that is 36 tall regardless of the glyph, `fill="transparent"` on the root, and one component per size (`cancel/small`, `cancel/medium`, `cancel/large`). They don't blend by default and need `className` or CSS `fill` to be coloured.

Every legacy icon has a replacement listed in [`legacy-map.json`](./legacy-map.json) (also shown in Storybook under Icons / Migration). The pattern:

```jsx
// before
import CancelLarge from "@digital-science/figshare-fcl/icons/cancel/large";
<CancelLarge className={styles.icon} />          // .icon { fill: var(--color-icon-secondary); width: 18px }

// after
import { Close } from "@digital-science/figshare-fcl/icons/react";
<Close className={styles.icon} />                // .icon { color: var(--color-icon-secondary); width: 18px }
```

Steps for each usage:

1. Look up the legacy path in `legacy-map.json` (`"legacy": "cancel/large"` → `"component": "Close"`).
2. Swap the import to the named export from `icons/react`.
3. In the CSS that styled it, replace `fill: …` with `color: …`, and keep (or set) a width/height. The old per-size variants collapse to one icon, so choose the size in CSS (`small` ≈ 12px, `medium` ≈ 14–16px, `large` ≈ 18–20px).
4. Items marked `approximate` are the closest match, not the same drawing; check them visually. Items marked `inline svg` in the map (link modal icons, date picker arrows) are hand-written SVG elsewhere in `packages/ui`: replace them with the listed icon.
5. Drop `PureComponent`-style props you were passing (`fill="transparent"`, `preserveAspectRatio`); `color`, `style`, `className`, `title` and any svg attribute still work.
6. Run the component's tests. Snapshot or markup assertions on the old `<svg>` (`fill="transparent"`, `viewBox="0 0 W 36"`) need updating.

Once nothing imports a legacy folder, delete it. Keep `legacy-map.json` until the old paths are removed from every consumer repo.

## Gaps and follow-ups

- `website-v3` has other inline SVGs that already have an equivalent here (table sort arrows → `sort-solid`/`sort-up-solid`/`sort-down-solid`, `status/shield` → `shield-exclamation`, `status/fileShield` → `file-shield`, `identifierLink` → `barcode`, Sherpa `location` → `folder-regular`, `openAccess` → `file-regular`, `prerequisites` → `warning-circle`, `conditions` → `bullet-list`). They are not in `legacy-map.json`; swap them when migrating that repo.
- `legacy-map.json` is a straight mapping; `size` variants were collapsed without checking each call site.
- `dot` (6 px) maps to `circle-solid`; the circle fills the box, so give it a small width.
- `viewType/file` maps to `rectangle` and `viewType/thumbnail` to `grid-9`; confirm with design that these are intended.
- `earth/public/large` (a 1024 viewBox) maps to `earth`.
