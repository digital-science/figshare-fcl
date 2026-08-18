import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import CloseSvg from "@digital-science/figshare-fcl/icons/react/Close";
import InfoCircleSvg from "@digital-science/figshare-fcl/icons/react/InfoCircle";
import WarningSvg from "@digital-science/figshare-fcl/icons/react/Warning";
import WarningCircleSvg from "@digital-science/figshare-fcl/icons/react/WarningCircle";
import CheckmarkSvg from "@digital-science/figshare-fcl/icons/react/Checkmark";

import { IconSlot } from "../IconSlot";
import { Button } from "../Button";

import styles from "./Alert.module.css";


export function Alert({ type, title, message, persistent, className: providedClassName, children, padded, variant, onClose, ...props }) {
  const className = classnames(styles.alert, providedClassName);
  const wrap = computeWrap(title, message);

  return (
    <div aria-live="polite" className={className} data-alert-type={type} data-alert-variant={variant} data-padded={padded} role="alert" {...props}>
      <div data-part="alert-icon-margin">
        <Alert.Icon type={type} />
      </div>
      <div data-part="alert-content">
        <div data-part="alert-left-content" data-wrap-type={wrap}>
          {title && <Alert.Title>{title}</Alert.Title>}
          {message && <Alert.Description>{message}</Alert.Description>}
        </div>
        <div data-part="alert-right-content">
          {children && <>{typeof children === "function" ? children({ type, onClose, ...props }) : children}</>}
          {!persistent && <Alert.Close wrapType={wrap} onClose={props.onClose} />}
        </div>
      </div>
    </div>
  );
}

function computeWrap(title, message) {
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

Alert.propTypes = {
  type: PropTypes.oneOf(["info", "warning", "error", "success", "notice"]).isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  persistent: PropTypes.bool,
  title: PropTypes.node,
  message: PropTypes.node,
  padded: PropTypes.bool,
  variant: PropTypes.oneOf(["solid", "translucent"]),
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  children: undefined,
  onClose: undefined,
  title: undefined,
  message: undefined,
  className: undefined,
  persistent: true,
  variant: "translucent",
  padded: true,
};


export const ALERT_ICONS_MAP = {
  notice: InfoCircleSvg,
  info: InfoCircleSvg,
  warning: WarningCircleSvg,
  error: WarningSvg,
  success: CheckmarkSvg,
};

function AlertIcon({ type, children, ...props }) {
  const iconNode = React.useMemo(() => {
    const IconComponent = ALERT_ICONS_MAP[type];
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

AlertIcon.propTypes = {
  type: PropTypes.oneOf(["info", "warning", "error", "success", "notice"]),
  children: PropTypes.node,
};

AlertIcon.defaultProps = {
  type: undefined,
  children: undefined,
};

function AlertTitle({ children, ...props }) {
  return (
    <em data-part="alert-title" {...props}>
      {children}
    </em>
  );
}

AlertTitle.propTypes = { children: PropTypes.node.isRequired };

function AlertDescription({ children, ...props }) {
  return (
    <p data-part="alert-description" {...props}>
      {children}
    </p>
  );
}

AlertDescription.propTypes = { children: PropTypes.node.isRequired };

function AlertClose({ onClose, wrapType, ...props }) {
  return (
    <div data-part="alert-close" data-wrap-type={wrapType} {...props}>
      <Button data-scope="alert-close-button" em="low" kind="tertiary" span="icon" onClick={onClose} {...props}>
        <Button.Icon ><CloseSvg /></Button.Icon>
      </Button>
    </div>
  );
}
AlertClose.propTypes = {
  wrapType: PropTypes.oneOf(["none", "one", "both"]),
  onClose: PropTypes.func,
};

AlertClose.defaultProps = { onClose: undefined, wrapType: "none" };

Alert.Icon = AlertIcon;
Alert.Title = AlertTitle;
Alert.Description = AlertDescription;
Alert.Close = AlertClose;

export default Alert;
