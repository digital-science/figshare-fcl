import { useMemo } from "react";

/**
 * Maps legacy Block kind tokens to their new equivalents.
 * Tokens not in this map pass through unchanged.
 */
const LEGACY_MAP: Record<string, string> = {
  // Layout → direction
  "layout-rows": "row",
  "layout-rows-reverse": "row-reverse",
  "layout-columns": "column",
  "layout-columns-reverse": "column-reverse",
  "layout-tablet-rows": "t-row",
  "layout-tablet-rows-reverse": "t-row-reverse",
  "layout-tablet-columns": "t-column",
  "layout-tablet-columns-reverse": "t-column-reverse",
  "layout-mobile-rows": "m-row",
  "layout-mobile-rows-reverse": "m-row-reverse",
  "layout-mobile-columns": "m-column",
  "layout-mobile-columns-reverse": "m-column-reverse",

  // Flex
  "flex-grow": "grow",
  "flex-shrink": "shrink",
  "flex-fit": "fit",
  "flex-wrap": "wrap",
  "flex-wrap-reverse": "wrap-reverse",

  // Alignment (tablet/mobile)
  "align-tablet-center": "t-align-center",
  "align-tablet-start": "t-align-start",
  "align-tablet-end": "t-align-end",
  "align-tablet-stretch": "t-align-stretch",
  "align-mobile-center": "m-align-center",
  "align-mobile-start": "m-align-start",
  "align-mobile-end": "m-align-end",
  "align-mobile-stretch": "m-align-stretch",

  // Justify (tablet/mobile)
  "justify-tablet-center": "t-justify-center",
  "justify-tablet-start": "t-justify-start",
  "justify-tablet-end": "t-justify-end",
  "justify-tablet-between": "t-justify-between",
  "justify-tablet-evenly": "t-justify-evenly",
  "justify-tablet-around": "t-justify-around",
  "justify-tablet-stretch": "t-justify-stretch",
  "justify-mobile-center": "m-justify-center",
  "justify-mobile-start": "m-justify-start",
  "justify-mobile-end": "m-justify-end",
  "justify-mobile-between": "m-justify-between",
  "justify-mobile-evenly": "m-justify-evenly",
  "justify-mobile-around": "m-justify-around",
  "justify-mobile-stretch": "m-justify-stretch",

  // Gap
  "gap-half": "gap-1/2",
  "gap-half-1": "gap-1/2",
  "gap-tight": "gap-1",

  // Margin
  "margin-none": "m-0",
  "margin-half-1": "m-1/2",
  "margin-1": "m-1",
  "margin-2": "m-2",
  "margin-3": "m-3",
  "margin-4": "m-4",
  "margin-5": "m-5",
  "margin-6": "m-6",
  "margin-7": "m-7",
  "margin-8": "m-8",
  "margin-9": "m-9",
  "margin-10": "m-10",

  // Padding
  "padding-none": "p-0",
  "padding-half-1": "p-1/2",
  "padding-1": "p-1",
  "padding-2": "p-2",
  "padding-2-3": "py-2 px-3",
  "padding-3": "p-3",
  "padding-4": "p-4",
  "padding-5": "p-5",
  "padding-6": "p-6",
  "padding-7": "p-7",
  "padding-8": "p-8",
  "padding-9": "p-9",
  "padding-10": "p-10",
  "padding-left-none": "pl-0",
  "padding-right-none": "pr-0",
  "padding-left-right-none": "px-0",
  "padding-top-none": "pt-0",
  "padding-top-1": "pt-1",
  "padding-top-2": "pt-2",
  "padding-top-3": "pt-3",
  "padding-bottom-none": "pb-0",
  "padding-bottom-1": "pb-1",
  "padding-bottom-2": "pb-2",
  "padding-bottom-3": "pb-3",
  "padding-top-bottom-none": "py-0",

  // Tablet padding
  "padding-tablet-none": "t-p-0",
  "padding-tablet-half-1": "t-p-1/2",
  "padding-tablet-1": "t-p-1",
  "padding-tablet-2": "t-p-2",
  "padding-tablet-2-3": "t-py-2 t-px-3",
  "padding-tablet-3": "t-p-3",
  "padding-tablet-4": "t-p-4",
  "padding-tablet-5": "t-p-5",
  "padding-tablet-6": "t-p-6",
  "padding-tablet-7": "t-p-7",
  "padding-tablet-8": "t-p-8",
  "padding-tablet-9": "t-p-9",
  "padding-tablet-10": "t-p-10",
  "padding-tablet-left-none": "t-pl-0",
  "padding-tablet-right-none": "t-pr-0",
  "padding-tablet-left-right-none": "t-px-0",
  "padding-tablet-top-none": "t-pt-0",
  "padding-tablet-top-1": "t-pt-1",
  "padding-tablet-top-2": "t-pt-2",
  "padding-tablet-top-3": "t-pt-3",
  "padding-tablet-bottom-none": "t-pb-0",
  "padding-tablet-bottom-1": "t-pb-1",
  "padding-tablet-bottom-2": "t-pb-2",
  "padding-tablet-bottom-3": "t-pb-3",
  "padding-tablet-top-bottom-none": "t-py-0",

  // Mobile padding
  "padding-mobile-none": "m-p-0",
  "padding-mobile-half-1": "m-p-1/2",
  "padding-mobile-1": "m-p-1",
  "padding-mobile-2": "m-p-2",
  "padding-mobile-2-3": "m-py-2 m-px-3",
  "padding-mobile-3": "m-p-3",
  "padding-mobile-4": "m-p-4",
  "padding-mobile-5": "m-p-5",
  "padding-mobile-6": "m-p-6",
  "padding-mobile-7": "m-p-7",
  "padding-mobile-8": "m-p-8",
  "padding-mobile-9": "m-p-9",
  "padding-mobile-10": "m-p-10",
  "padding-mobile-left-none": "m-pl-0",
  "padding-mobile-right-none": "m-pr-0",
  "padding-mobile-left-right-none": "m-px-0",
  "padding-mobile-top-none": "m-pt-0",
  "padding-mobile-top-1": "m-pt-1",
  "padding-mobile-top-2": "m-pt-2",
  "padding-mobile-top-3": "m-pt-3",
  "padding-mobile-bottom-none": "m-pb-0",
  "padding-mobile-bottom-1": "m-pb-1",
  "padding-mobile-bottom-2": "m-pb-2",
  "padding-mobile-bottom-3": "m-pb-3",
  "padding-mobile-top-bottom-none": "m-py-0",

  // Border
  "border-rounded": "bd-rounded",
  "border-primary": "bd-primary",
  "border-rounded-primary": "bd-rounded-primary",
  "border-collapsible": "bd-collapse",

  // Background
  "background-primary": "bg-primary",
  "background-secondary": "bg-secondary",

  // Span
  "span-fit-content": "span-content",
  "span-tablet-full": "t-span-full",
  "span-tablet-auto": "t-span-auto",
  "span-tablet-fit-content": "t-span-content",
  "span-mobile-full": "m-span-full",
  "span-mobile-auto": "m-span-auto",
  "span-mobile-fit-content": "m-span-content",

  // Children span
  "children-span-tablet-full": "t-children-span-full",
  "children-span-mobile-full": "m-children-span-full",

  // Span min → minspan
  "span-min-1": "minspan-1",
  "span-min-2": "minspan-2",
  "span-min-3": "minspan-3",
  "span-min-4": "minspan-4",
  "span-min-5": "minspan-5",
  "span-min-6": "minspan-6",
  "span-min-7": "minspan-7",
  "span-min-8": "minspan-8",
  "span-min-9": "minspan-9",
  "span-min-10": "minspan-10",
  "span-min-30": "minspan-30",
  "span-min-full": "minspan-full",

  // Vertical span → vspan (legacy used min-height, new uses height)
  "v-span-1": "minvspan-1",
  "v-span-2": "minvspan-2",
  "v-span-3": "minvspan-3",
  "v-span-4": "minvspan-4",
  "v-span-5": "minvspan-5",
  "v-span-6": "minvspan-6",
  "v-span-7": "minvspan-7",
  "v-span-8": "minvspan-8",
  "v-span-9": "minvspan-9",
  "v-span-10": "minvspan-10",
  "v-span-20": "minvspan-20",
  "v-span-30": "minvspan-30",
  "v-span-large-1": "minvspan-10",
  "v-span-large-2": "minvspan-20",
  "v-span-large-3": "minvspan-30",
};

function mapToken(token: string): string {
  return LEGACY_MAP[token] ?? token;
}

/**
 * Translates legacy Block kind tokens to their new equivalents.
 * Tokens that are already in the new format pass through unchanged.
 * A single legacy token may expand to multiple new tokens (e.g. "padding-2-3" → "py-2 px-3").
 */
export function useBlockKind(kind: string | undefined): string | undefined {
  return useMemo(() => {
    if (!kind) {
      return kind;
    }

    const tokens = kind.split(/\s+/);
    const mapped = tokens.map(mapToken);

    return mapped.join(" ");
  }, [kind]);
}
