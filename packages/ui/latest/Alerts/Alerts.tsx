import React from "react";
import type { TicketEntry, AlertMessage, StackType } from "./types";
import { getIn } from "../../utils/getIn";

import { AlertsList } from "./AlertsList";
import { popAlert } from "./utils";


export type AlertsProps = {
  id?: string;
  className?: string;
  initial?: AlertMessage[];
  isFixed?: boolean;
  margin?: boolean;
  stackType?: StackType;
  onDismiss?: (alert: any, channel: string) => void;
  [key: string]: unknown;
};

export function Alerts({ id: componentChannel = "global-alerts", className, initial = [], isFixed = false, onDismiss, margin = false, stackType = "single", ...props }: AlertsProps) {
  const [messages, setMessages] = React.useState(initial);
  const tickets = React.useRef<TicketEntry[]>([]);

  const clearExistingTicket = React.useCallback((id: string) => {
    tickets.current = tickets.current.filter((entry) => {
      if (entry.id === id) {
        clearTimeout(entry.ticket);

        return false;
      }

      return true;
    });
  }, []);

  const onDismissAlert = React.useCallback((alert: any) => {
    const idToPop = getIn(alert, "id", alert, getIn.predicates.nonEmptyString);

    popAlert(componentChannel, idToPop);
    onDismiss?.(alert, componentChannel);
  }, [componentChannel, onDismiss]);

  const onEvent = React.useCallback((event: any) => {
    const { detail: { action, alert, channel, timeout } } = event;
    const id = alert?.id;

    if (channel !== componentChannel) {
      return;
    }

    switch (action) {
      case "push":
        setMessages((previous) => {
          if (stackType === "single") {
            // Clear any existing timeouts before replacing with new alert
            previous.forEach((msg) => clearExistingTicket(msg.id));

            return [alert];
          }

          return [...previous, alert];
        });

        if (typeof timeout === "number") {
          const ticket = setTimeout(() => {
            popAlert(componentChannel, id);
          }, timeout);

          clearExistingTicket(id);

          tickets.current.push({ id, ticket });
        }
        break;
      case "clear":
        // Clear all pending timeouts
        tickets.current.forEach((entry) => clearTimeout(entry.ticket));
        tickets.current = [];
        setMessages([]);
        break;
      case "pop": {
        setMessages((currentMessages) => {
          const index = currentMessages.findIndex((m) => id === m.id);

          if (index !== -1) {
            const newMessages = currentMessages.slice();
            newMessages.splice(index, 1);
            clearExistingTicket(id);

            return newMessages;
          }

          return currentMessages;
        });
        break;
      }
      default:
        break;
    }
  }, [clearExistingTicket, componentChannel, stackType]);

  React.useEffect(() => {
    document?.addEventListener?.("alerts:message", onEvent);

    return () => {
      document?.removeEventListener?.("alerts:message", onEvent);
      // Clear all pending timeouts on unmount
      tickets.current.forEach((entry) => clearTimeout(entry.ticket));
      tickets.current = [];
    };
  }, [onEvent]);

  return (
    <AlertsList
      alerts={messages}
      channel={componentChannel}
      className={className}
      stackType={stackType}
      isFixed={isFixed}
      margin={margin}
      onDismiss={onDismissAlert}
      {...props}
    />
  );
}

Alerts.displayName = "Alerts";
