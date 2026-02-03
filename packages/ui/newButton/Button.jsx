import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import LoaderSvg from "../icons/react/Loader";
import { Tooltip, TooltipContent, TooltipTrigger } from "../newToolTip";

import "./Button.css";


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
            data-inline={inline}
            data-justify={justify}
            data-kind={kind}
            data-part="button"
            data-span={span}
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
      data-inline={inline}
      data-justify={justify}
      data-kind={kind}
      data-part="button"
      data-span={span}
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
  inline: PropTypes.oneOf([true, false, "text"]),
  /** The justification of the button content */
  justify: PropTypes.oneOf(["between", "start", "end"]),
  /** The kind or theme of the button we want to render. */
  kind: PropTypes.oneOf(["primary", "secondary", "tertiary", "inverted"]),
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  /** The width of the button based on context */
  span: PropTypes.oneOf(["full", "fit", "icon", "narrow", "button", "content"]),
  /**
   * Tooltip to display for this control button.
   */
  tooltip: PropTypes.node,
  tooltipContentProps: PropTypes.object,
  /**
   * Options object for the `floating` element (passed to `useFloating` internally).
   */
  tooltipOptions: PropTypes.object,
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
    <span ref={ref} data-aria-only={hidden} data-part="button-label" data-wrap={wrap} {...props}>
      {children}
    </span>
  );
}

ButtonLabel.propTypes = {
  children: PropTypes.node.isRequired,
  hidden: PropTypes.bool,
  /** Whether to wrap the label text */
  wrap: PropTypes.oneOf([false, true, "ellipsis", "wrap", "nowrap", "wrap-all"]),
};

ButtonLabel.defaultProps = { wrap: false, hidden: false };

export function nodeIsButtonWithoutLabel(element) {
  return (["BUTTON", "A"].includes(element?.tagName) && !element?.hasAttribute?.("aria-label"));
}

export function ButtonIcon({ children, asChild, blend, ...props }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      "data-part": "button-icon",
      "aria-hidden": true,
      "data-blend": blend,
      ...children.props,
    });
  }

  return (<span aria-hidden="true" data-blend={blend} data-part="button-icon-slot" {...props}>{children}</span>);
}

ButtonIcon.propTypes = {
  /**
   * Clones and renders the child element directly passing it additional props.
   * Useful if we do not want to `wrap` the icon element further in an `icon-slot` element.
   */
  asChild: PropTypes.bool,
  /**
   * Whether to blend the icon color with the button text color.
   * Or leave it as predefined by the button kind and em modifiers.
  */
  blend: PropTypes.bool,
  /**
   * The icon node we want to render or a set of them.
   */
  children: PropTypes.node,
};

ButtonIcon.defaultProps = {
  children: undefined,
  asChild: false,
  blend: false,
};

export function ButtonLoading({ text, spinner }) {
  // eslint-disable-next-line no-nested-ternary
  const spinnerPosition = spinner ? (spinner === true ? "left" : spinner) : undefined;

  return (
    <>
      {spinnerPosition === "left" && (
        <ButtonIcon asChild={false}><LoaderSvg data-part="button-spinner" /></ButtonIcon>
      )}
      {text && (<ButtonLabel>{text}</ButtonLabel>)}
      {spinnerPosition === "right" && (
        <ButtonIcon asChild={false}><LoaderSvg data-part="button-spinner" /></ButtonIcon>
      )}
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
Button.Label = ButtonLabel;
Button.Loading = ButtonLoading;

Button.displayName = "Button";

export default Button;
