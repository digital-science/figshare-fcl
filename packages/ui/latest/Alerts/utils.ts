import uuid from "../../helpers/utils/uuid";
import type { AlertType } from "../Alerts/types";


const defaultOptions = {
  channel: "global-alerts",
  persistent: false,
  type: "warning",
  content: "Unknown message",
};


type PushAlertOptions = {
  id?: string;
  channel?: string;
  persistent?: boolean;
  type?: AlertType | string;
  content?: React.ReactNode;
  title?: string;
  message?: React.ReactNode;
  children?: React.ReactNode;
  timeout?: number;
  attributes?: Record<string, unknown>;
  cause?: unknown;
};

export function pushAlert(options: PushAlertOptions = {}) {
  const config = { ...defaultOptions, ...options };
  const { type, channel, title, message, content, children, persistent, timeout, attributes, cause } = config;

  const event = new CustomEvent("alerts:message", {
    detail: {
      action: "push",
      channel,
      timeout,
      alert: {
        id: config.id ?? `alert:${uuid()}`,
        type,
        title,
        message: message ?? content,
        children,
        persistent,
        attributes,
        cause,
      },
    },
  });

  document.dispatchEvent(event);
}

export function clearAlerts(channel: string) {
  const event = new CustomEvent("alerts:message", {
    detail: {
      action: "clear",
      channel,
    },
  });

  document.dispatchEvent(event);
}

export function popAlert(channel: string, id: string) {
  const event = new CustomEvent("alerts:message", {
    detail: {
      action: "pop",
      channel,
      alert: { id },
    },
  });

  document.dispatchEvent(event);
}
