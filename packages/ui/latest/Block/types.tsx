
type Display = "relative" | "inline" | "inline-block" | "block";

type Layout =
  | "layout-rows" | "layout-rows-reverse" | "layout-columns" | "layout-columns-reverse"
  | "layout-tablet-rows" | "layout-tablet-rows-reverse" | "layout-tablet-columns" | "layout-tablet-columns-reverse"
  | "layout-mobile-rows" | "layout-mobile-rows-reverse" | "layout-mobile-columns" | "layout-mobile-columns-reverse";

type Flex =
  | "flex-inline" | "flex-grow" | "flex-shrink" | "flex-fit"
  | "flex-wrap" | "flex-wrap-reverse";

type Align =
  | "align-center" | "align-start" | "align-end" | "align-stretch"
  | "align-tablet-center" | "align-tablet-start" | "align-tablet-end" | "align-tablet-stretch"
  | "align-mobile-center" | "align-mobile-start" | "align-mobile-end" | "align-mobile-stretch";

type Justify =
  | "justify-center" | "justify-start" | "justify-end" | "justify-between" | "justify-evenly" | "justify-around" | "justify-stretch"
  | "justify-tablet-center" | "justify-tablet-start" | "justify-tablet-end" | "justify-tablet-between" | "justify-tablet-evenly" | "justify-tablet-around" | "justify-tablet-stretch"
  | "justify-mobile-center" | "justify-mobile-start" | "justify-mobile-end" | "justify-mobile-between" | "justify-mobile-evenly" | "justify-mobile-around" | "justify-mobile-stretch";

type Border = "border-rounded" | "border-primary" | "border-rounded-primary" | "border-collapsible";

type Background = "background-primary" | "background-secondary";

type Gap =
  | "gap-half" | "gap-half-1" | "gap-tight"
  | "gap-1" | "gap-2" | "gap-3" | "gap-4" | "gap-5"
  | "gap-6" | "gap-7" | "gap-8" | "gap-9" | "gap-10";

type Margin =
  | "margin-none" | "margin-half-1"
  | "margin-1" | "margin-2" | "margin-3" | "margin-4" | "margin-5"
  | "margin-6" | "margin-7" | "margin-8" | "margin-9" | "margin-10";

type Padding =
  | "padding-none" | "padding-half-1" | "padding-2-3"
  | "padding-1" | "padding-2" | "padding-3" | "padding-4" | "padding-5"
  | "padding-6" | "padding-7" | "padding-8" | "padding-9" | "padding-10"
  | "padding-left-none" | "padding-right-none" | "padding-left-right-none"
  | "padding-top-none" | "padding-top-1" | "padding-top-2" | "padding-top-3"
  | "padding-bottom-none" | "padding-bottom-1" | "padding-bottom-2" | "padding-bottom-3"
  | "padding-top-bottom-none";

type TabletPadding =
  | "padding-tablet-none" | "padding-tablet-half-1" | "padding-tablet-2-3"
  | "padding-tablet-1" | "padding-tablet-2" | "padding-tablet-3" | "padding-tablet-4" | "padding-tablet-5"
  | "padding-tablet-6" | "padding-tablet-7" | "padding-tablet-8" | "padding-tablet-9" | "padding-tablet-10"
  | "padding-tablet-left-none" | "padding-tablet-right-none" | "padding-tablet-left-right-none"
  | "padding-tablet-top-none" | "padding-tablet-top-1" | "padding-tablet-top-2" | "padding-tablet-top-3"
  | "padding-tablet-bottom-none" | "padding-tablet-bottom-1" | "padding-tablet-bottom-2" | "padding-tablet-bottom-3"
  | "padding-tablet-top-bottom-none";

type MobilePadding =
  | "padding-mobile-none" | "padding-mobile-half-1" | "padding-mobile-2-3"
  | "padding-mobile-1" | "padding-mobile-2" | "padding-mobile-3" | "padding-mobile-4" | "padding-mobile-5"
  | "padding-mobile-6" | "padding-mobile-7" | "padding-mobile-8" | "padding-mobile-9" | "padding-mobile-10"
  | "padding-mobile-left-none" | "padding-mobile-right-none" | "padding-mobile-left-right-none"
  | "padding-mobile-top-none" | "padding-mobile-top-1" | "padding-mobile-top-2" | "padding-mobile-top-3"
  | "padding-mobile-bottom-none" | "padding-mobile-bottom-1" | "padding-mobile-bottom-2" | "padding-mobile-bottom-3"
  | "padding-mobile-top-bottom-none";

type Span =
  | "span-1" | "span-2" | "span-3" | "span-4" | "span-5"
  | "span-6" | "span-7" | "span-8" | "span-9" | "span-10"
  | "span-26" | "span-30" | "span-60"
  | "span-fit-content" | "span-max-content" | "span-min-content" | "span-full" | "span-auto"
  | "span-tab-panel"
  | "span-tablet-full" | "span-tablet-auto" | "span-tablet-fit-content"
  | "span-mobile-full" | "span-mobile-auto" | "span-mobile-fit-content"
  | "children-span-full" | "children-span-tablet-full" | "children-span-mobile-full";

type SpanMin =
  | "span-min-1" | "span-min-2" | "span-min-3" | "span-min-4" | "span-min-5"
  | "span-min-6" | "span-min-7" | "span-min-8" | "span-min-9" | "span-min-10"
  | "span-min-30" | "span-min-full";

type VerticalSpan =
  | "v-span-1" | "v-span-2" | "v-span-3" | "v-span-4" | "v-span-5"
  | "v-span-6" | "v-span-7" | "v-span-8" | "v-span-9" | "v-span-10"
  | "v-span-20" | "v-span-30"
  | "v-span-large-1" | "v-span-large-2" | "v-span-large-3";

type Visibility = "hidden" | "visibility-hidden";

type Skeleton = "skeleton";

type BlockKindToken =
  | Display | Layout | Flex | Align | Justify
  | Border | Background | Skeleton
  | Gap | Margin
  | Padding | TabletPadding | MobilePadding
  | Span | SpanMin | VerticalSpan
  | Visibility;

/** Space-separated string of {@link BlockKindToken} values, e.g. `"layout-rows padding-2 gap-1"` */
type BlockKind = BlockKindToken | (string & {});

export type BlockProps = {
  kind?: BlockKind;
  tag?: React.ElementType;
  mark?: string;
  children?: React.ReactNode;
  className?: string;
  inferDirection?: boolean;
  [key: string]: unknown;
}
