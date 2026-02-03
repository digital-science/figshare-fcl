import React, { useCallback } from "react";
import {
  useMergeRefs,
  FloatingPortal,
  FloatingArrow,
  FloatingFocusManager,
} from "@floating-ui/react";
import PropTypes from "prop-types";

import CloseIcon from "../icons/react/Close";
import { Button } from "../newButton";

import "./Tooltip.css";
import { useTooltip, useTooltipContext, TooltipContext } from "./useTooltip";


export function Tooltip({
  children,
  ...options
}) {
  const tooltip = useTooltip(options);

  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}

Tooltip.propTypes = { children: PropTypes.node.isRequired };


export const TooltipTrigger = React.forwardRef(({ children, asChild = true, Element = "span", ...props }, propRef) => {
  const context = useTooltipContext();
  const childrenRef = children.ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ...children.props,
        ...props,
        "data-state": context.open ? "open" : "closed",
        ref,
      })
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

TooltipTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  Element: PropTypes.elementType,
  asChild: PropTypes.bool,
};

TooltipTrigger.defaultProps = {
  Element: "span",
  asChild: true,
};


TooltipTrigger.displayName = "TooltipTrigger";


export const TooltipContent = React.forwardRef(({ style, ...props }, propRef) => {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) {
    return null;
  }

  return (
    <FloatingPortal>
      <FloatingFocusManager
        context={context.context}
        disabled={!context.interactive}
        initialFocus={context.refs.floating}
        modal={context.modal}
      >
        <div
          ref={ref}
          data-font-style="bold"
          data-layout={context.interactive ? "flex" : "block"}
          data-part="content"
          data-scope="tooltip"
          data-theme={context.theme}
          role={context.interactive ? "dialog" : "tooltip"}
          style={ {
            ...context.floatingStyles,
            ...style,
            visibility: context.middlewareData?.hide?.referenceHidden ? "hidden" : "visible",
          } }
          {...context.getFloatingProps(props)}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={context.interactive ? 0 : undefined}
        >
          {props.children}
          <FloatingArrow ref={context.arrowRef} context={context} data-part="arrow" data-scope="tooltip" />
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});

TooltipContent.displayName = "TooltipContent";

TooltipContent.propTypes = { children: PropTypes.node.isRequired, style: PropTypes.object };
TooltipContent.defaultProps = { style: undefined };

export function TooltipClose({ onClick, ...props }) {
  const { setOpen } = useTooltipContext();
  const onClose = useCallback((e) => {
    onClick?.(e);
    setOpen(false);
  }, [onClick, setOpen]);

  return (
    <Button
      aria-label="Dismiss Tooltip"
      data-id="dismiss-tooltip"
      em="medium"
      kind="default"
      type="button"
      onClick={onClose}
      {...props}
    >
      <Button.Icon asChild={true}><CloseIcon /></Button.Icon>
    </Button>
  );
}

TooltipClose.propTypes = { onClick: PropTypes.func };

TooltipClose.defaultProps = { onClick: undefined };


Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
Tooltip.Context = TooltipContext;
Tooltip.Close = TooltipClose;
