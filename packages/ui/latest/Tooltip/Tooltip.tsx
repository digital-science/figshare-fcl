import React, { useCallback } from "react";
import {
  useMergeRefs,
  FloatingPortal,
  FloatingArrow,
  FloatingFocusManager,
} from "@floating-ui/react";
import CloseIcon from "@digital-science/figshare-fcl/icons/react/Close";
import "./Tooltip.module.css";

import { Button } from "../Button";

import type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipCloseProps,
  TooltipComponent,
} from "./types";
import { useTooltip, useTooltipContext, TooltipContext } from "./useTooltip";


export const Tooltip: TooltipComponent = ({
  children,
  ...options
}: TooltipProps) => {
  const tooltip = useTooltip(options);

  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
};


export const TooltipTrigger = React.forwardRef(({ children, asChild = true, Element = "span", ...props }: TooltipTriggerProps, propRef) => {
  const context = useTooltipContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      {
        ...context.getReferenceProps({
          ...(children.props as Record<string, unknown>),
          ...(props as Record<string, unknown>),
          ref,
        } as React.HTMLProps<Element>),
        "data-state": context.open ? "open" : "closed",
      } as any
    );
  }

  return (
    <Element
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </Element>
  );
});

TooltipTrigger.displayName = "TooltipTrigger";


export const TooltipContent = React.forwardRef(({ style, ...props }: TooltipContentProps, propRef) => {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager
        disabled={!context.interactive}
        context={context.context}
        modal={false}
        initialFocus={context.refs.floating}
      >
        <div
          ref={ref}
          data-scope="tooltip"
          data-part="content"
          data-theme={context.theme}
          data-layout={context.interactive ? "flex" : "block"}
          data-font-style="bold"
          role={context.interactive ? "dialog" : "tooltip"}
          style={ {
            ...context.floatingStyles,
            ...style,
            visibility: context.middlewareData?.hide?.referenceHidden ? "hidden" : "visible",
          } }
          {...context.getFloatingProps(props)}
          tabIndex={context.interactive ? 0 : undefined}
        >
          {props.children}
          <FloatingArrow ref={context.arrowRef} data-scope="tooltip" data-part="arrow" context={context.context} />
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});

TooltipContent.displayName = "TooltipContent";

export function TooltipClose({ onClick, ...props }: TooltipCloseProps) {
  const { setOpen } = useTooltipContext();
  const onClose = useCallback((e: React.MouseEvent) => {
    onClick?.(e);
    setOpen(false);
  }, [onClick, setOpen]);

  return (
    <Button type="button" data-id="dismiss-tooltip" aria-label="Dismiss Tooltip" kind="default" em="medium" onClick={onClose} {...props}>
      <Button.Icon asChild={true}><CloseIcon /></Button.Icon>
    </Button>
  );
}


Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
Tooltip.Context = TooltipContext;
Tooltip.Close = TooltipClose;
