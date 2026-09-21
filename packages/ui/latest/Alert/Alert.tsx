import React from "react";
import classnames from "classnames";
import CloseSvg from "@digital-science/figshare-fcl/icons/react/Close";
import InfoCircleSvg from "@digital-science/figshare-fcl/icons/react/InfoCircle";
import WarningSvg from "@digital-science/figshare-fcl/icons/react/Warning";
import WarningCircleSvg from "@digital-science/figshare-fcl/icons/react/WarningCircle";
import CheckmarkSvg from "@digital-science/figshare-fcl/icons/react/Checkmark";

import { IconSlot } from "../IconSlot";
import { Button } from "../Button";

import styles from "./Alert.module.css";


type AlertType = "info" | "warning" | "error" | "success" | "notice";
type AlertVariant = "solid" | "translucent";
type WrapType = "none" | "one" | "both";

type AlertClosePayload = {
  id: string;
  event: React.MouseEvent;
};

type AlertProps = {
  id?: string;
  type: AlertType;
  title?: React.ReactNode;
  message?: React.ReactNode;
  persistent?: boolean;
  className?: string;
  children?: React.ReactNode | ((data: { type: AlertType; onClose?: (payload: AlertClosePayload) => void; [key: string]: unknown }) => React.ReactNode);
  padded?: boolean;
  variant?: AlertVariant;
  onClose?: (payload: AlertClosePayload) => void;
  [key: string]: unknown;
};

type AlertIconProps = {
  type?: AlertType;
  children?: React.ReactNode;
  [key: string]: unknown;
};

type AlertTitleProps = {
  children: React.ReactNode;
  [key: string]: unknown;
};

type AlertDescriptionProps = {
  children: React.ReactNode;
  [key: string]: unknown;
};

type AlertCloseProps = {
  id?: string;
  onClose?: (payload: AlertClosePayload) => void;
  wrapType?: WrapType;
  [key: string]: unknown;
};

type AlertComponent = React.FC<AlertProps> & {
  Icon: React.FC<AlertIconProps>;
  Title: React.FC<AlertTitleProps>;
  Description: React.FC<AlertDescriptionProps>;
  Close: React.FC<AlertCloseProps>;
};


export const Alert: AlertComponent = ({ id = "alert", type, title, message, persistent = true, className: providedClassName, children, padded = true, variant = "translucent", onClose, ...props }: AlertProps) => {
  const className = classnames(styles.alert, providedClassName);
  const wrap = computeWrap(title, message);
  // Determine if the right side padding should be applied based on the padded and persistent props.
  // If an alert is persistent, we want to show the right side padding if the developer asks for it
  // If not, we do not want to show the padding on the right side regardless of the padded prop.
  const showRightSidePadding = padded && persistent;

  return (
    <div aria-live="polite" className={className} data-alert-type={type} data-alert-variant={variant} data-padded={showRightSidePadding} role="alert" {...props}>
      <div role="presentation" data-part="alert-icon-margin" aria-hidden="true" data-wrap-type={wrap}>
        <Alert.Icon type={type} />
      </div>
      <div data-part="alert-content">
        <div data-part="alert-left-content" data-wrap-type={wrap}>
          {title && <Alert.Title>{title}</Alert.Title>}
          {message && <Alert.Description>{message}</Alert.Description>}
        </div>
        <div data-part="alert-right-content">
          {children && <>{typeof children === "function" ? children({ type, onClose, ...props }) : children}</>}
          {!persistent && <AlertClose id={id} wrapType={wrap} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
};

Alert.displayName = "Alert";

function computeWrap(title: React.ReactNode, message: React.ReactNode): WrapType {
  if (title && message) {
    return "both";
  }
  if (title) {
    return "one";
  }
  if (message) {
    return "one";
  }

  return "none";
}


export const ALERT_ICONS_MAP: Record<string, React.ComponentType> = {
  notice: InfoCircleSvg,
  info: InfoCircleSvg,
  warning: WarningCircleSvg,
  error: WarningSvg,
  success: CheckmarkSvg,
};

function AlertIcon({ type, children, ...props }: AlertIconProps) {
  const iconNode = React.useMemo(() => {
    const IconComponent = type ? ALERT_ICONS_MAP[type] : undefined;
    if (IconComponent) {
      return <IconComponent />;
    }

    return children;
  }, [type, children]);

  return (
    <IconSlot asChild={false} data-scope="alert-icon" kind="blend" {...props}>
      {iconNode}
    </IconSlot>
  );
}

AlertIcon.displayName = "AlertIcon";

function AlertTitle({ children, ...props }: AlertTitleProps) {
  return (
    <em data-part="alert-title" {...props}>
      {children}
    </em>
  );
}

AlertTitle.displayName = "AlertTitle";

function AlertDescription({ children, ...props }: AlertDescriptionProps) {
  return (
    <p data-part="alert-description" {...props}>
      {children}
    </p>
  );
}

AlertDescription.displayName = "AlertDescription";

function AlertClose({ id = "alert", onClose, wrapType = "none", ...props }: AlertCloseProps) {
  const handleOnClose = React.useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    onClose?.({ id, event });
  }, [onClose, id]);

  return (
    <div data-part="alert-close" data-wrap-type={wrapType} {...props}>
      <Button data-part="alert-close-button" em="low" kind="tertiary" span="icon" onClick={handleOnClose} {...props}>
        <Button.Icon ><CloseSvg /></Button.Icon>
      </Button>
    </div>
  );
}

AlertClose.displayName = "AlertClose";

Alert.Icon = AlertIcon;
Alert.Title = AlertTitle;
Alert.Description = AlertDescription;
Alert.Close = AlertClose;

export default Alert;
