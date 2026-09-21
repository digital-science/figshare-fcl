import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import LoaderSvg from "@digital-science/figshare-fcl/icons/react/Loader";

import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip/Tooltip";

import type {
  ButtonProps,
  ButtonComponent,
  ButtonLabelProps,
  ButtonIconProps,
  ButtonInteractiveIconProps,
  ButtonIconGroupProps,
  ButtonLoadingProps,
} from "./types";
import { Link, isExternalLink } from "./anchor";

import "./Button.module.css";


export const Button = React.forwardRef(({
  children,
  className: providedClassName,
  disabled = false,
  inline = false,
  onClick,
  loading = false,
  span,
  justify,
  tooltip,
  tooltipOptions = {},
  tooltipContentProps = {},
  kind = "primary",
  em = "high",
  ...props
}: ButtonProps, ref: any) => {
  const onClickHandler = useCallback((ev: React.MouseEvent) => {
    if (disabled) {
      ev.preventDefault();

      return;
    }

    onClick?.(ev);
  }, [disabled, onClick]);

  const className = classnames("button", providedClassName);
  const { Tag, propsByTag } = useMemo(() => {
    if (props.href) {
      let LinkTag = Link.Internal;

      if (isExternalLink(props)) {
        LinkTag = Link.External;
      }

      return { Tag: LinkTag, propsByTag: { role: "button", "data-scope": "link" } };
    }

    return { Tag: "button" as const, propsByTag: { type: "button" as const } };
  }, [props.href, props.external]);
  let content: React.ReactNode = children;

  if (loading) {
    if (typeof loading === "boolean") {
      content = <ButtonLoading spinner={true} />;
    } else {
      content = loading;
    }
  }

  if (tooltip !== undefined) {
    const { showTooltipClose, ...tooltipOptionsRest } = tooltipOptions;

    return (
      <Tooltip role="label" {...tooltipOptionsRest}>
        <TooltipTrigger asChild={true}>
          <Tag
            ref={ref}
            aria-disabled={disabled}
            className={className}
            data-em={em}
            data-kind={kind}
            data-span={span}
            data-justify={justify}
            data-inline={inline}
            data-part="button"
            onClick={onClickHandler}
            {...propsByTag}
            {...props}
          >
            {content}
          </Tag>
        </TooltipTrigger>
        <TooltipContent data-font-style="bold" data-layout="flex" data-span="m" {...tooltipContentProps}>
          {tooltip}
          {showTooltipClose && <Tooltip.Close />}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tag
      ref={ref}
      aria-disabled={disabled}
      className={className}
      data-em={em}
      data-kind={kind}
      data-span={span}
      data-justify={justify}
      data-inline={inline}
      data-part="button"
      onClick={onClickHandler}
      {...propsByTag}
      {...props}
    >
      {content}
    </Tag>
  );
}) as ButtonComponent;

Button.displayName = "Button";

export function ButtonLabel({ children, wrap = false, hidden = false, ...props }: ButtonLabelProps) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (typeof children === "string" && nodeIsButtonWithoutLabel(ref.current?.parentElement)) {
      ref.current?.parentElement?.setAttribute("aria-label", children);
    }
  }, [children]);

  return (
    <span ref={ref} data-part="button-label" data-wrap={wrap} data-aria-only={hidden} {...props}>
      {children}
    </span>
  );
}
ButtonLabel.displayName = "ButtonLabel";

export function nodeIsButtonWithoutLabel(element: Element | null | undefined) {
  return (["BUTTON", "A"].includes(element?.tagName ?? "") && !element?.hasAttribute?.("aria-label"));
}

export function ButtonIcon({ children, asChild = false, blend = false, size = "medium", ...props }: ButtonIconProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      "data-part": "button-icon",
      "aria-hidden": true,
      "data-blend": blend,
      "data-size": size,
      ...children.props as React.ComponentProps<any>,
    });
  }

  return (<span aria-hidden="true" data-part="button-icon-slot" data-blend={blend} data-size={size} {...props}>{children}</span>);
}

ButtonIcon.displayName = "ButtonIcon";

export function ButtonInteractiveIcon({ children, tooltip, onClick, onKeyDown, ...props }: ButtonInteractiveIconProps) {
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.(event);
    }
    onKeyDown?.(event);
  }, [onClick, onKeyDown]);

  const interactionProps = { tabIndex: 0, role: "button", "data-interactive": true, "aria-hidden": false, onClick, onKeyDown: handleKeyDown };

  if (tooltip) {
    return (
      <Tooltip strategy="absolute" placement="top">
        <TooltipTrigger asChild={false}>
          <ButtonIcon {...interactionProps} {...props}>{children}</ButtonIcon>
        </TooltipTrigger>
        <TooltipContent>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (<ButtonIcon {...interactionProps} {...props}>{children}</ButtonIcon>);
}

ButtonInteractiveIcon.displayName = "ButtonInteractiveIcon";

// A grouping container for multiple icons inside a button
// provides some styling and separation from the button label
export function ButtonIconGroup({ children, interactive = false, ...props }: ButtonIconGroupProps) {

  const content = React.Children.map(children, (child) => {
    if (interactive) {
      return (<span data-part="button-icon-group-icon-slot">{child}</span>);
    }

    return child;
  });

  return (
    <span data-part="button-icon-group" data-interactive={interactive} {...props}>
      {content}
    </span>
  );
}

ButtonIconGroup.displayName = "ButtonIconGroup";

export function ButtonLoading({ text, spinner }: ButtonLoadingProps) {
  // eslint-disable-next-line no-nested-ternary
  const spinnerPosition = spinner ? (spinner === true ? "left" : spinner) : undefined;

  return (
    <>
      {spinnerPosition === "left" && (<ButtonIcon asChild={false}><LoaderSvg data-part="button-spinner" /></ButtonIcon>)}
      {text && (<ButtonLabel>{text}</ButtonLabel>)}
      {spinnerPosition === "right" && (<ButtonIcon asChild={false}><LoaderSvg data-part="button-spinner" /></ButtonIcon>)}
    </>
  );
}

ButtonLoading.displayName = "ButtonLoading";

Button.Icon = ButtonIcon;
Button.InteractiveIcon = ButtonInteractiveIcon;
Button.IconGroup = ButtonIconGroup;
Button.Label = ButtonLabel;
Button.Loading = ButtonLoading;

Button.displayName = "Button";

export default Button;
