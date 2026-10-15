
/* Shared size scales */
type Size = "1/2" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
type SizeWithZero = "0" | Size;

/* Responsive prefix: default (none), tablet (t-), mobile (m-) */
type Prefix = "" | "t-" | "m-";

/* Positioning */
type Position = `${Prefix}${"relative" | "absolute" | "fixed" | "sticky" | "static"}`;

/* Display */
type Display = `${Prefix}${"inline" | "inline-block" | "block" | "flex" | "flex-inline"}`;

/* Flex direction */
type Direction = `${Prefix}${"row" | "row-reverse" | "column" | "column-reverse"}`;

/* Flex fit/grow/shrink/wrap */
type FlexModifier = `${Prefix}${
  | "fit" | "grow" | "grow-1" | "grow-0"
  | "shrink" | "shrink-1" | "shrink-0"
  | "wrap" | "no-wrap" | "wrap-reverse"
}`;

/* Alignment (align-items) */
type Align = `${Prefix}${"align-center" | "align-start" | "align-end" | "align-stretch" | "align-baseline"}`;

/* Justify (justify-content) */
type Justify = `${Prefix}${
  | "justify-center" | "justify-start" | "justify-end"
  | "justify-between" | "justify-evenly" | "justify-around" | "justify-stretch"
}`;

/* Self alignment (align-self) */
type AlignSelf = `${Prefix}${
  | "align-self-start" | "align-self-center" | "align-self-end"
  | "align-self-stretch" | "align-self-baseline"
}`;

/* Justify self */
type JustifySelf = `${Prefix}${"justify-self-start" | "justify-self-center" | "justify-self-end" | "justify-self-stretch"}`;

/* Overflow */
type Overflow = `${Prefix}${
  | "overflow-hidden" | "overflow-auto" | "overflow-visible" | "overflow-scroll"
  | "overflow-x-hidden" | "overflow-x-auto" | "overflow-y-hidden" | "overflow-y-auto"
}`;

/* Text alignment */
type TextAlign = `${Prefix}${"text-left" | "text-center" | "text-right"}`;

/* Cursor */
type Cursor = `${Prefix}${"cursor-pointer" | "cursor-default"}`;

/* Gap */
type Gap = `${Prefix}gap-${Size}`;
type GapRow = `${Prefix}gap-row-${Size}`;
type GapCol = `${Prefix}gap-col-${Size}`;

/* Padding */
type PaddingAll = `${Prefix}p-${SizeWithZero}`;
type PaddingX = `${Prefix}px-${SizeWithZero}`;
type PaddingY = `${Prefix}py-${SizeWithZero}`;
type PaddingBottom = `${Prefix}pb-${SizeWithZero}`;
type PaddingTop = `${Prefix}pt-${SizeWithZero}`;
type PaddingRight = `${Prefix}pr-${SizeWithZero}`;
type PaddingLeft = `${Prefix}pl-${SizeWithZero}`;
type Padding = PaddingAll | PaddingX | PaddingY | PaddingBottom | PaddingTop | PaddingRight | PaddingLeft;

/* Margin */
type MarginAll = `${Prefix}m-${SizeWithZero}`;
type MarginX = `${Prefix}mx-${SizeWithZero}`;
type MarginY = `${Prefix}my-${SizeWithZero}`;
type MarginBottom = `${Prefix}mb-${SizeWithZero}`;
type MarginTop = `${Prefix}mt-${SizeWithZero}`;
type MarginRight = `${Prefix}mr-${SizeWithZero}`;
type MarginLeft = `${Prefix}ml-${SizeWithZero}`;
type Margin = MarginAll | MarginX | MarginY | MarginBottom | MarginTop | MarginRight | MarginLeft;

/* Span content keywords */
type SpanKeyword = "content" | "max-content" | "min-content" | "auto" | "full";

/* Span (width) */
type Span = `${Prefix}span-${SpanKeyword | SizeWithZero | "20" | "26" | "30" | "60"}`;

/* Vspan (height) */
type Vspan = `${Prefix}vspan-${SpanKeyword | SizeWithZero | "20" | "30"}`;

/* Minspan (min-width) */
type Minspan = `${Prefix}minspan-${SpanKeyword | SizeWithZero | "30"}`;

/* Maxspan (max-width) */
type Maxspan = `${Prefix}maxspan-${SpanKeyword | SizeWithZero}`;

/* Minvspan (min-height) */
type Minvspan = `${Prefix}minvspan-${SpanKeyword | SizeWithZero | "20" | "30"}`;

/* Maxvspan (max-height) */
type Maxvspan = `${Prefix}maxvspan-${SpanKeyword | SizeWithZero | "20" | "30"}`;

/* Children span */
type ChildrenSpan = `${Prefix}children-span-full`;

/* Special span */
type SpecialSpan = "span-tab-panel";

/* Border */
type Border = "bd-rounded" | "bd-w-1" | "bd-w-2" | "bd-w-3" | "bd-primary" | "bd-rounded-primary" | "bd-collapse";

/* Background */
type Background = "bg-primary" | "bg-secondary";

/* Skeleton */
type Skeleton = "skeleton";

/* Visibility */
type Visibility = `${Prefix}${"hidden" | "visibility-hidden"}`;

type BlockKindToken =
  | Position | Display | Direction | FlexModifier
  | Align | Justify | AlignSelf | JustifySelf
  | Overflow | TextAlign | Cursor
  | Gap | GapRow | GapCol
  | Padding | Margin
  | Span | Vspan | Minspan | Maxspan | Minvspan | Maxvspan
  | ChildrenSpan | SpecialSpan
  | Border | Background | Skeleton | Visibility;

/** Space-separated string of {@link BlockKindToken} values, e.g. `"row p-2 gap-1"` */
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
