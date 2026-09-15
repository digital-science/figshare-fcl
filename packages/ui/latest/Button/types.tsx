import React from "react";

type ButtonKind = "primary" | "secondary" | "tertiary" | "inverted" | "input";

type ButtonEmphasis = "high" | "low" | "success" | "danger";

type ButtonSpan = "full" | "fit" | "fit-content" | "icon" | "narrow" | "button" | "content";

type ButtonJustify = "between" | "start" | "end";

type ButtonInline = boolean | "text" | "slim" | "slim-flexible";

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  /** The kind or theme of the button we want to render. */
  kind?: ButtonKind;
  /** The emphasis level of the button. */
  em?: ButtonEmphasis;
  /** The width of the button based on context. */
  span?: ButtonSpan;
  /** The justification of the button content. */
  justify?: ButtonJustify;
  inline?: ButtonInline;
  loading?: boolean | React.ReactNode;
  href?: string;
  /** Tooltip to display for this control button. */
  tooltip?: React.ReactNode;
  /** Options object for the `floating` element (passed to `useFloating` internally). */
  tooltipOptions?: Record<string, unknown> & { showTooltipClose?: boolean };
  tooltipContentProps?: Record<string, unknown>;
  onClick?: (ev: React.MouseEvent) => void;
  [key: string]: unknown;
}

type ButtonLabelWrap = boolean | "ellipsis" | "wrap" | "nowrap" | "wrap-all";

export type ButtonLabelProps = {
  children: React.ReactNode;
  /** Whether to wrap the label text. */
  wrap?: ButtonLabelWrap;
  hidden?: boolean;
  [key: string]: unknown;
}

type ButtonIconSize = "small" | "medium" | "large";

export type ButtonIconProps = {
  children?: React.ReactNode;
  /**
   * Clones and renders the child element directly passing it additional props.
   * Useful if we do not want to wrap the icon element further in an icon-slot element.
   */
  asChild?: boolean;
  /**
   * Whether to blend the icon color with the button text color,
   * or leave it as predefined by the button kind and em modifiers.
   */
  blend?: boolean;
  /**
   * The size of the icon, which can be used to adjust the icon dimensions
   * and alignment within the button. Defaults to "medium".
   */
  size?: ButtonIconSize;
  [key: string]: unknown;
}

export type ButtonInteractiveIconProps = {
  children?: React.ReactNode;
  /** The interactive icon tooltip content. */
  tooltip?: React.ReactNode;
  /** The function to call when the interactive icon is clicked. */
  onClick?: (ev: React.MouseEvent | React.KeyboardEvent) => void;
  /** The function to call when a key is pressed while the interactive icon is focused. */
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  [key: string]: unknown;
}

export type ButtonIconGroupProps = {
  children?: React.ReactNode;
  interactive?: boolean;
  [key: string]: unknown;
}

type SpinnerPosition = true | "left" | "right";

export type ButtonLoadingProps = {
  spinner?: SpinnerPosition;
  text?: React.ReactNode;
}

export type ButtonComponent = React.ForwardRefExoticComponent<
  Omit<ButtonProps, "ref"> & React.RefAttributes<unknown>
> & {
  Icon: React.FC<ButtonIconProps>;
  InteractiveIcon: React.FC<ButtonInteractiveIconProps>;
  IconGroup: React.FC<ButtonIconGroupProps>;
  Label: React.FC<ButtonLabelProps>;
  Loading: React.FC<ButtonLoadingProps>;
}
