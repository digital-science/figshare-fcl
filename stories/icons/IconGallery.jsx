import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

import styles from "./IconGallery.module.css";


// Raw SVG strings, bundled as plain text: no per-icon React module has to be loaded or compiled.
const SVGS = import.meta.glob("../../packages/ui/icons/svg/**/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

const SUBFOLDER_PREFIX = { "item-type": "ItemType", presentation: "Presentation", figshare: "Figshare" };

const pascal = (s) => s.split(/[-/ ]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).
  join("");

const ICONS = Object.entries(SVGS).
  map(([file, markup]) => {
    const rel = file.split("/icons/svg/")[1].replace(/\.svg$/, "");
    const [folder, base] = rel.includes("/") ? rel.split("/") : ["", rel];

    return {
      folder,
      rel,
      name: pascal(folder ? `${SUBFOLDER_PREFIX[folder] || pascal(folder)}-${base}` : base),
      // the svg files ship with fixed width/height; the gallery sizes them with CSS instead
      markup: markup.replace(/<svg([^>]*?)\swidth="[^"]*"\s+height="[^"]*"/, "<svg$1"),
    };
  }).
  sort((a, b) => a.rel.localeCompare(b.rel));

export function IconGallery({ folder, size, search }) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(null);
  const needle = query.trim().toLowerCase();

  const icons = useMemo(
    () => ICONS.filter((i) => (folder === undefined || i.folder === folder) && (!needle || i.rel.includes(needle) || i.name.toLowerCase().includes(needle))),
    [folder, needle],
  );

  const copy = (icon) => {
    const snippet = `import { ${icon.name} } from "@digital-science/figshare-fcl/icons/react";`;

    try {
      navigator.clipboard.writeText(snippet);
      setCopied(icon.rel);
    } catch (e) {
      setCopied(null);
    }
  };

  return (
    <div className={styles.gallery} style={ { "--icon-size": `${size}px` } }>
      {search && (
        <input
          aria-label="Search icons"
          className={styles.search}
          placeholder={`Search ${ICONS.length} icons`}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <ul className={styles.grid}>
        {icons.map((icon) => (
          <li key={icon.rel}>
            <button className={styles.cell} title={`${icon.rel}.svg`} type="button" onClick={() => copy(icon)}>
              <span dangerouslySetInnerHTML={ { __html: icon.markup } } aria-hidden="true" className={styles.glyph} />
              <span className={styles.name}>{copied === icon.rel ? "Import copied" : icon.name}</span>
            </button>
          </li>
        ))}
      </ul>
      {!icons.length && <p>No icons match &quot;{query}&quot;.</p>}
    </div>
  );
}

IconGallery.propTypes = {
  /** "" = top level only, "item-type" etc. = that folder, undefined = everything */
  folder: PropTypes.string,
  search: PropTypes.bool,
  size: PropTypes.number,
};

IconGallery.defaultProps = { folder: undefined, search: false, size: 28 };
