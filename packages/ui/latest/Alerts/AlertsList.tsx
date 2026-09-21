import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { compact } from "../../utils/compact";
import { Alert } from "../Alert";
import type { AlertMessage, StackType } from "../Alerts/types";

import styles from "./AlertsList.module.css";

export type AlertsListProps = {
  channel?: string;
  children?: React.ReactNode;
  alerts?: AlertMessage[];
  className?: string;
  isFixed?: boolean;
  margin?: boolean;
  stackType?: StackType;
  onDismiss?: (alert: any) => void;
  [key: string]: unknown;
};

/*
  Uncontrolled list container component for Alert instances
  Contained alerts can be provided manually through children
  Or predefined in a list of alert message configs used to render Alert instances
*/
export function AlertsList({ channel = "global-alerts", children, alerts = [], className, isFixed = false, onDismiss, margin = false, stackType = "single", ...props }: AlertsListProps) {
  const kind = React.useMemo(() => compact([
    isFixed ? "fixed" : "",
    margin ? "margin" : "",
  ], compact.filters.falsy).join(" "), [isFixed, margin]);

  return (
    <div
      className={classnames(styles.alerts, className)}
      data-scope="alerts"
      data-part="list"
      data-stack-type={stackType}
      data-kind={kind}
      data-channel={channel}
      data-empty={alerts.length === 0}
      {...props}
    >
      {children ? children : alerts.map((message, index) => renderAlert(message, index, onDismiss))}
    </div>
  );
}

export function renderAlert(message: AlertMessage, index: number, onClose?: (alert: any) => void) {
  return (
    <Alert
      key={message.id}
      id={message.id}
      data-alert-index={index}
      style={ { "--alert-index": index } as React.CSSProperties }
      title={message.title}
      message={message.message}
      type={message.type}
      persistent={message.persistent}
      padded={message.padded}
      onClose={onClose}
      {...message.attributes}
    >{message.children}</Alert>
  );
}

AlertsList.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["info", "warning", "error", "success", "notice"] as const),
      message: PropTypes.node,
      children: PropTypes.node,
      persistent: PropTypes.bool,
      attributes: PropTypes.object,
      title: PropTypes.string,
    })
  ),
  channel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  isFixed: PropTypes.bool,
  margin: PropTypes.bool,
  stackType: PropTypes.oneOf(["single", "list", "stack"] as const),
  onDismiss: PropTypes.func,
};
