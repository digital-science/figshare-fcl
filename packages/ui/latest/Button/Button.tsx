import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import LoaderSvg from "@digital-science/figshare-fcl/icons/react/Loader";
import FigshareLogo from "@digital-science/figshare-fcl/icons/figshare/logo";

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

import styles from "./Button.module.css";


export const Button = React.forwardRef(({
  children,
  className: providedClassName,
  disabled = false,
  inline = false,
  onClick,
  loading = false,
  span,
  justify,
  gap,
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

  const className = classnames(styles.button, providedClassName);
  const { external: _external, ...domProps } = props;
  const { Tag, propsByTag } = useMemo(() => {
    if (props.href) {
      let LinkTag = Link.Internal;

      if (isExternalLink(props)) {
        LinkTag = Link.External;
      }

      return { Tag: LinkTag, propsByTag: { role: "link", "data-scope": "link" } };
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
            {...(gap !== undefined && { "data-gap": gap })}
            data-part="button"
            onClick={onClickHandler}
            {...propsByTag}
            {...domProps}
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
      {...(gap !== undefined && { "data-gap": gap })}
      data-part="button"
      onClick={onClickHandler}
      {...propsByTag}
      {...domProps}
    >
      {content}
    </Tag>
  );
}) as ButtonComponent;

Button.displayName = "Button";

export function ButtonLabel({ children, wrap = false, hidden = false, decoration, ...props }: ButtonLabelProps) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (typeof children === "string" && nodeIsButtonWithoutLabel(ref.current?.parentElement)) {
      ref.current?.parentElement?.setAttribute("aria-label", children);
    }
  }, [children]);

  return (
    <span ref={ref} data-part="button-label" data-wrap={wrap} data-aria-only={hidden} {...(decoration !== undefined && { "data-text-decoration": decoration })} {...props}>
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

export function ButtonInteractiveIcon({ children, disabled = false, tooltip, onClick, onKeyDown, ownColor, ...props }: ButtonInteractiveIconProps) {
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (disabled) { return; }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.(event);
    }
    onKeyDown?.(event);
  }, [disabled, onClick, onKeyDown]);

  const handleClick = useCallback((event: React.MouseEvent) => {
    if (disabled) { return; }
    onClick?.(event);
  }, [disabled, onClick]);

  const interactionProps = {
    tabIndex: disabled ? -1 : 0,
    role: "button",
    "aria-disabled": disabled || undefined,
    "data-interactive": true,
    "aria-hidden": false,
    "data-own-color": ownColor,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };

  if (tooltip && !disabled) {
    return (
      <Tooltip strategy="absolute" placement="top">
        <TooltipTrigger data-is-tooltip-trigger={true} asChild={false}>
          <ButtonIcon blend={true} {...props} {...interactionProps} asChild={false}>{children}</ButtonIcon>
        </TooltipTrigger>
        <TooltipContent>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (<ButtonIcon {...props} {...interactionProps} asChild={false}>{children}</ButtonIcon>);
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
    <span data-part="button-icon-group" {...props}>
      {content}
    </span>
  );
}

ButtonIconGroup.displayName = "ButtonIconGroup";

export function ButtonLoading({ text, spinner, logo }: ButtonLoadingProps) {
  // eslint-disable-next-line no-nested-ternary
  const hasLogo = Boolean(logo);
  const hasSpinner = Boolean(spinner);
  const spinnerPosition = spinner ? (spinner === true ? "left" : spinner) : undefined;
  const logoPosition = logo ? (logo === true ? "left" : logo) : undefined;

  return (
    <>
      {hasLogo && logoPosition === "left" && (<ButtonIcon asChild={false}><FigshareLogo grayscale={true} data-part="button-logo" width="16" height="16"/></ButtonIcon>)}
      {hasSpinner && spinnerPosition === "left" && (<ButtonIcon asChild={false}><LoaderSvg data-part="button-spinner" /></ButtonIcon>)}
      {text && (<ButtonLabel>{text}</ButtonLabel>)}
      {hasLogo && logoPosition === "right" && (<ButtonIcon asChild={false}><FigshareLogo  grayscale={true} data-part="button-logo" width="16" height="16"/></ButtonIcon>)}
      {hasSpinner && spinnerPosition === "right" && (<ButtonIcon asChild={false}><LoaderSvg data-part="button-spinner" /></ButtonIcon>)}
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
