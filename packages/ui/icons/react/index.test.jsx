import fs from "fs";
import path from "path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import * as Icons from "./index";

const SVG_DIR = path.join(__dirname, "../svg");
const PREFIX = { "item-type": "ItemType", presentation: "Presentation", figshare: "Figshare" };
const pascal = (s) => s.split(/[-/ ]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join("");

const svgFiles = (dir = "") => fs.readdirSync(path.join(SVG_DIR, dir), { withFileTypes: true }).flatMap((e) => (
  e.isDirectory() ? svgFiles(path.join(dir, e.name)) : e.name.endsWith(".svg") ? [path.join(dir, e.name).replace(/\.svg$/, "")] : []
));

describe("icons/react", () => {
  const files = svgFiles();

  it("exports a component for every svg", () => {
    const missing = files.filter((rel) => {
      const [folder, name] = rel.includes(path.sep) ? rel.split(path.sep) : [null, rel];

      return !Icons[folder ? PREFIX[folder] + pascal(name) : pascal(name)];
    });

    expect(missing).toEqual([]);
  });

  it("every svg has a viewBox and no hard-coded size in the component", () => {
    const noViewBox = files.filter((rel) => !/viewBox="[^"]+"/.test(fs.readFileSync(path.join(SVG_DIR, `${rel}.svg`), "utf8")));

    expect(noViewBox).toEqual([]);
  });

  it.each(Object.keys(Icons))("%s renders a blendable, scalable svg", (name) => {
    const Icon = Icons[name];
    const root = renderToStaticMarkup(<Icon />).match(/^<svg[^>]*>/)[0];

    expect(root).toMatch(/viewBox="[^"]+"/);
    expect(root).toContain('aria-hidden="true"');
    expect(root).not.toMatch(/ (width|height)="\d+"/);
  });

  describe("blend", () => {
    const fills = (el) => [...renderToStaticMarkup(el).matchAll(/fill="([^"]+)"/g)].map((m) => m[1]);

    it("keeps the original colours by default", () => {
      expect(fills(<Icons.PresentationQuote />)).toEqual(["#8D8D8D", "#8D8D8D"]);
      expect(new Set(fills(<Icons.PresentationEnvelopeError />))).toEqual(new Set(["#DDD", "#A60845"]));
      expect(fills(<Icons.ItemTypeDataset />)[0]).toContain("--color-icon-secondary");
    });

    it("uses currentColor for every layer with blend", () => {
      ["PresentationQuote", "PresentationEnvelopeError", "ItemTypeDataset"].forEach((name) => {
        const Icon = Icons[name];

        expect(new Set(fills(<Icon blend />))).toEqual(new Set(["currentColor"]));
        expect(renderToStaticMarkup(<Icon blend />)).not.toContain("blend");
      });
    });
  });
});
