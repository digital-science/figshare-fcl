import React from "react";
import type { Placement, Strategy, Middleware } from "@floating-ui/react";

import type { useTooltip } from "./useTooltip";


export type TooltipOptions = {
  initialOpen?: boolean;
  placement?: Placement;
  strategy?: Strategy;
  role?: "tooltip" | "label";
  interactive?: boolean;
  inline?: boolean;
  hoverWithInteractive?: boolean;
  theme?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  middleware?: Middleware[];
  autoHideMs?: number;
}

export type TooltipContextValue = ReturnType<typeof useTooltip>;

export type TooltipProps = {
  children: React.ReactNode;
} & TooltipOptions;

export type TooltipTriggerProps = {
  children: React.ReactNode;
  asChild?: boolean;
  Element?: React.ElementType;
  [key: string]: unknown;
}

export type TooltipContentProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export type TooltipCloseProps = {
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: unknown;
}

export type TooltipComponent = React.FC<TooltipProps> & {
  Trigger: React.ForwardRefExoticComponent<TooltipTriggerProps & React.RefAttributes<unknown>>;
  Content: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<unknown>>;
  Context: React.Context<TooltipContextValue | null>;
  Close: React.FC<TooltipCloseProps>;
}
