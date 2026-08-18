import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import LoaderSvg from "@digital-science/figshare-fcl/icons/react/Loader";

import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip/Tooltip";

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
  // Legacy props
  // theme,
  // variant,
  // Icon,
  // iconPlacement,
  ...props
}, ref) => {
  const onClickHandler = useCallback((ev) => {
    if (disabled) {
      ev.preventDefault();

      return;
    }

    onClick?.(ev);
  }, [disabled, onClick]);

  const className = classnames("button", providedClassName);
  const { Tag, propsByTag } = useMemo(() => {
    if (props.href) {
      return { Tag: "a", propsByTag: { role: "button", "data-scope": "link" } };
    }

    return { Tag: "button", propsByTag: { type: "button" } };
  }, [props.href]);
  let content = children;

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
      // eslint-disable-next-line jsx-a11y/aria-role
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
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  em: PropTypes.oneOf(["high", "low", "success", "danger"]),
  href: PropTypes.string,
  inline: PropTypes.oneOf([true, false, "text", "slim", "slim-flexible"]),
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  /** The kind or theme of the button we want to render. */
  kind: PropTypes.oneOf(["primary", "secondary", "tertiary", "inverted", "input"]),
  /** The width of the button based on context */
  span: PropTypes.oneOf(["full", "fit", "icon", "narrow", "button", "content"]),
  /** The justification of the button content */
  justify: PropTypes.oneOf(["between", "start", "end"]),
  /**
   * Tooltip to display for this control button.
   */
  tooltip: PropTypes.node,
  /**
   * Options object for the `floating` element (passed to `useFloating` internally).
   */
  tooltipOptions: PropTypes.object,
  tooltipContentProps: PropTypes.object,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: undefined,
  href: undefined,
  loading: undefined,
  disabled: false,
  tooltip: undefined,
  tooltipOptions: {},
  tooltipContentProps: {},
  kind: "primary",
  inline: false,
  em: "high",
  onClick: undefined,
  span: undefined,
  justify: undefined,
};

export function ButtonLabel({ children, wrap, hidden, ...props }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (typeof children === "string" && nodeIsButtonWithoutLabel(ref.current?.parentElement)) {
      ref.current.parentElement.setAttribute("aria-label", children);
    }
  }, [children]);

  return (
    <span ref={ref} data-part="button-label" data-wrap={wrap} data-aria-only={hidden} {...props}>
      {children}
    </span>
  );
}

ButtonLabel.propTypes = {
  children: PropTypes.node.isRequired,
  /** Whether to wrap the label text */
  wrap: PropTypes.oneOf([false, true, "ellipsis", "wrap", "nowrap", "wrap-all"]),
  hidden: PropTypes.bool,
};

ButtonLabel.defaultProps = { wrap: false, hidden: false };

export function nodeIsButtonWithoutLabel(element) {
  return (["BUTTON", "A"].includes(element?.tagName) && !element?.hasAttribute?.("aria-label"));
}

export function ButtonIcon({ children, asChild, blend, size, ...props }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      "data-part": "button-icon",
      "aria-hidden": true,
      "data-blend": blend,
      "data-size": size,
      ...children.props,
    });
  }

  return (<span aria-hidden="true" data-part="button-icon-slot" data-blend={blend} data-size={size} {...props}>{children}</span>);
}

ButtonIcon.propTypes = {
  /**
   * Clones and renders the child element directly passing it additional props.
   * Useful if we do not want to `wrap` the icon element further in an `icon-slot` element.
   */
  asChild: PropTypes.bool,
  /**
   * The icon node we want to render or a set of them.
   */
  children: PropTypes.node,
  /**
   * Whether to blend the icon color with the button text color.
   * Or leave it as predefined by the button kind and em modifiers.
  */
  blend: PropTypes.bool,
  /**
   * The size of the icon, which can be used to adjust the icon dimensions and alignment within the button. If not provided, it will default to "medium".
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

ButtonIcon.defaultProps = {
  children: undefined,
  asChild: false,
  blend: false,
  size: "medium",
};

export function ButtonInteractiveIcon({ children, tooltip, onClick, onKeyDown, ...props }) {
  const handleKeyDown = useCallback((event) => {
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

ButtonInteractiveIcon.propTypes = {
  /**
   * The icon node we want to render or a set of them.
   */
  children: PropTypes.node,

  /**
   * The interactive icon tooltip content.
   */
  tooltip: PropTypes.node,
  /**
   * The function to call when the interactive icon is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The function to call when a key is pressed while the interactive icon is focused.
   */
  onKeyDown: PropTypes.func,
};

ButtonInteractiveIcon.defaultProps = { children: undefined, tooltip: undefined, onClick: undefined, onKeyDown: undefined };

// A grouping container for multiple icons inside a button
// provides some styling and separation from the button label
export function ButtonIconGroup({ children, interactive, ...props }) {

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

ButtonIconGroup.propTypes = { children: PropTypes.node, interactive: PropTypes.bool };
ButtonIconGroup.defaultProps = { children: undefined, interactive: false };

export function ButtonLoading({ text, spinner }) {
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

ButtonLoading.propTypes = {
  spinner: PropTypes.oneOf([true, "left", "right"]),
  text: PropTypes.node,
};

ButtonLoading.defaultProps = {
  spinner: undefined,
  text: undefined,
};

Button.Icon = ButtonIcon;
Button.InteractiveIcon = ButtonInteractiveIcon;
Button.IconGroup = ButtonIconGroup;
Button.Label = ButtonLabel;
Button.Loading = ButtonLoading;

Button.displayName = "Button";

export default Button;
