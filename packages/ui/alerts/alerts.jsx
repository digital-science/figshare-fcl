import React from "react";
import { string, bool, array, func } from "prop-types";
import classnames from "classnames";

import { IconButton } from "../button";
import Alert from "../alert";
import Info from "../icons/react/InfoCircle";
import Warning from "../icons/react/Warning";
import WarningCircle from "../icons/react/WarningCircle";
import Close from "../icons/react/Close";
import Checkmark from "../icons/react/Checkmark";

// eslint-disable-next-line css-modules/no-unused-class
import styles from "./alerts.css";
import { popAlert } from "./utils";


const IconsByType = {
  error: Warning,
  warning: WarningCircle,
  success: Checkmark,
  info: Info,
};

const NO_ATTRIBUTES = {};

export class Alerts extends React.PureComponent {
  static propTypes = {
    /**
     * The unique id for this alerts component.
     * Will represent the `channel` used to listen to form alert messages.
     */
    id: string.isRequired,
    /**
      * Optional className to append to the Alerts wrapper.
    */
    className: string,
    /**
      * Optional array of message items to show after mounting.
      * If we want these to be controlled and change, assign a key to remount.
    */
    initialMessages: array,
    /**
      * Optional flag to show Alerts at the viewport level.
    */
    isFixed: bool,
    /**
      * Optional flag to show alerts as a toaster.
    */
    isToast: bool,
    /**
      * Optional flag to add a bottom margin to the
      * alerts container when it si not empty.
    */
    margin: bool,
    /**
      * Optional flag to hide Alert `type` icons.
      * If true, content will also be visually centered.
    */
    noTypeIcon: bool,

    /**
     * Optional event handler for the dismiss event
     */
    onDismiss: func,
  }

  static defaultProps = {
    id: "global-alerts",
    className: undefined,
    isFixed: false,
    isToast: false,
    noTypeIcon: false,
    initialMessages: undefined,
    margin: true,
    onDismiss: undefined,
  }

  state = { messages: this.props.initialMessages ?? [], id: this.props.id }
  tickets = [];

  componentDidMount() {
    document.addEventListener("form-alerts:message", this.onWarningEvent);
  }

  componentWillUnmount() {
    document.removeEventListener("form-alerts:message", this.onWarningEvent);

    try {
      this.tickets.forEach((entry) => clearTimeout(entry.ticket));
    } catch {
      // nothing worth handling
    }
  }

  render() {
    const { id, messages } = this.state;
    const { className, isFixed, isToast, noTypeIcon, margin } = this.props;

    const empty = !messages?.length;

    return (
      <div
        className={
          classnames(
            styles.alerts,
            empty ? styles.empty : styles.shown,
            {
              [styles.margin]: margin,
              [styles.isFixed]: isFixed,
              [styles.noTypeIcon]: noTypeIcon,
              [styles.isToast]: isToast,
            },
            className,
          )
        }
        data-alerts-channel={id}
        data-alerts-empty={empty}
      >
        {messages.map(this.renderAlert)}
      </div>
    );
  }

  renderAlert = (alert) => {
    const { id, type, content, title, attributes = NO_ATTRIBUTES } = alert;
    const Icon = IconsByType[type];
    const withTitle = !!title;
    const renderer = () => {
      if (withTitle) {
        return this.renderContentAndTitle(Icon, title, content, alert);
      }

      return this.renderContentOnly(Icon, content, alert);
    };

    return (
      <Alert
        key={id}
        className={classnames(styles.alert, styles[type], { [styles.withTitle]: withTitle })}
        data-id={`form-alert:${this.state.id}-${id}`}
        variant={type}
        {...attributes}
        data-alert-type={type}
      >
        {renderer}
      </Alert>
    );
  }

  renderContentOnly = (Icon, content, alert) => (<>
    <div className={styles.alertIcon}><Icon /></div>
    <div className={styles.alertText}>{content}</div>
    {this.renderCloseBtn(alert)}
  </>);

  renderContentAndTitle = (Icon, title, content, alert) => (<>
    <div className={styles.alertHeader}>
      <div className={styles.alertTitle}>
        <div className={styles.alertIcon}><Icon /></div>
        <b>{title}</b>
      </div>
      {this.renderCloseBtn(alert)}
    </div>
    <div className={styles.alertText}>{content}</div>
  </>);

  renderCloseBtn = (alert) => {
    const { persistent } = alert;

    if (!persistent) {
      return (
        <IconButton
          Icon={Close}
          aria-label="Close"
          className={styles.alertClose}
          data-control-id="form-alert-close-button"
          theme="tertiary"
          onClick={this.onHideAlert(alert)}
        />);
    }

    return null;
  }

  onWarningEvent = (event) => {
    const { id: componentChannel, messages } = this.state;
    const { detail: { action, message, channel, timeout } } = event;

    if (channel !== componentChannel) {
      return;
    }

    switch (action) {
      case "push":
        this.setState({ messages: [message] });

        if (typeof timeout === "number") {
          const id = message?.id;

          const ticket = setTimeout(() => {
            popAlert(componentChannel, id);
          }, [timeout]);

          this.clearExistingTicket(id);

          this.tickets.push({ id, ticket });
        }
        break;
      case "clear":
        this.setState({ messages: [] });
        break;
      case "pop": {
        const index = messages.findIndex((m) => message?.id === m.id);

        if (index !== 1) {
          const newMessages = messages.slice();
          newMessages.splice(index, 1);

          this.setState({ messages: newMessages });

          this.clearExistingTicket(message?.id);
        }
        break;
      }
      default:
        break;
    }
  }

  onHideAlert = (alert) => () => {
    const { id: componentChannel } = this.state;
    const { onDismiss } = this.props;

    popAlert(componentChannel, alert.id);
    onDismiss?.(alert);
  }

  clearExistingTicket(id) {
    this.tickets.forEach((entry) => {
      if (entry.id === id) {
        clearTimeout(entry.ticket);
      }
    });
  }
}
