import React from "react";

type TextKind =
  | "title-1" | "title-2" | "title-3" | "title-4"
  | "body" | "body-2" | "body-3"
  | "caption"
  | "label" | "label-2" | "label-3";

type TextColor =
  | "primary" | "secondary" | "tertiary"
  | "error" | "warning" | "success" | "info"
  | "disabled" | "inherit" | "initial" | "currentColor";

type TextWeight = "regular" | "bold";

type TextWrap = "ellipsis" | "nowrap" | "break-all";

type TextAlign = "left" | "center" | "right";

export type TextProps = {
  children: React.ReactNode;
  tag?: React.ElementType;
  className?: string;
  kind?: TextKind;
  weight?: TextWeight;
  color?: TextColor;
  wrap?: TextWrap;
  align?: TextAlign;
  inferDirection?: boolean;
  [key: string]: unknown;
}
