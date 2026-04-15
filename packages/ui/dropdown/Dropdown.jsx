import PropTypes from "prop-types";
import React, { Component } from "react";
import { Manager as PopperManager } from "react-popper";

import uncontrollable from "../helpers/uncontrollable";

import { Provider } from "./context";


let activeDropdownInstance = null;

export default class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    isVisible: PropTypes.bool,
    itemSelector: PropTypes.string,
    onToggle: PropTypes.func,
  }

  static defaultProps = {
    isVisible: false,
    itemSelector: "* > *",
    onToggle: () => undefined,
  }

  static getDerivedStateFromProps({ isVisible }, prevState) {
    return { context: { ...prevState.context, isVisible } };
  }

  constructor(...args) {
    super(...args);

    this.state = {
      context: {
        onToggle: this.onToggle,
        menuRef: this.setMenuRef,
        toggleRef: this.setToggleRef,
      },
    };
  }

  componentDidUpdate({ isVisible: wasVisible }) {
    const { isVisible } = this.props;
    const didOpen = isVisible && !wasVisible;
    const didClose = !isVisible && wasVisible;

    const { menuNode, toggleNode } = this.state.context;

    if (isVisible && activeDropdownInstance !== this) {
      activeDropdownInstance?.props.onToggle(null, { isVisible: false });
      // eslint-disable-next-line consistent-this
      activeDropdownInstance = this;
    } else if (!isVisible && activeDropdownInstance === this) {
      activeDropdownInstance = null;
    }

    if (didOpen && menuNode && menuNode.getAttribute("role") === "menu") {
      if (this._focusLast) {
        this.focusSelectableNeighbour(null, -1);
      } else {
        this.focusSelectableNeighbour(null, 1);
      }

      this._focusLast = false;
    }

    if (didClose && this._focusInDropdown && toggleNode && toggleNode.focus) {
      this._focusInDropdown = false;
      toggleNode.focus();
    }
  }

  render() {
    const { children, isVisible } = this.props;
    const { menuNode } = this.state.context;

    if (menuNode) {
      this._focusInDropdown = menuNode.contains(document.activeElement);
    }

    return (
      <Provider value={this.state.context}>
        <PopperManager>
          {children({ isVisible, props: { onKeyDown: this.onKeyDown } })}
        </PopperManager>
      </Provider>
    );
  }

  setMenuRef = (node) => this.setState(({ context }) => {
    return { context: { ...context, menuNode: node } };
  });

  setToggleRef = (node) => this.setState(({ context }) => {
    return { context: { ...context, toggleNode: node } };
  });

  onToggle = (event, modifiers) => {
    const { isVisible, onToggle } = this.props;
    const forcedVisibility = typeof modifiers === "object" && typeof modifiers?.isVisible === "boolean";
    const forcedIsVisibleValue = forcedVisibility ? modifiers.isVisible : null;

    if (forcedIsVisibleValue && activeDropdownInstance && activeDropdownInstance !== this) {
      activeDropdownInstance.props.onToggle(event, { isVisible: false });
    }

    // react-17 propagation fix
    event?.stopPropagation?.();

    onToggle(event, { isVisible: forcedVisibility ? forcedIsVisibleValue : !isVisible });
  };

  onKeyDown = (event) => {
    const { isVisible } = this.props;
    const { key, target } = event;

    switch (key) {
      case "ArrowUp":
        event.preventDefault();

        if (isVisible) {
          this.focusSelectableNeighbour(target, -1);
        } else {
          this._focusLast = true;
          this.onToggle(event, { isVisible: true });
        }

        break;
      case "ArrowDown":
        event.preventDefault();

        if (isVisible) {
          this.focusSelectableNeighbour(target, 1);
        } else {
          this._focusLast = false;
          this.onToggle(event, { isVisible: true });
        }

        break;
      case "Home":
        if (isVisible) {
          this.focusSelectableNeighbour(null, 1);
          event.preventDefault();
        }

        break;
      case "End":
        if (isVisible) {
          this.focusSelectableNeighbour(null, -1);
          event.preventDefault();
        }

        break;
      case "Escape":
      case "Tab":
        if (isVisible) {
          this.onToggle(event, { isVisible: false });
        }

        break;
      default:
    }
  }

  focusSelectableNeighbour(target, offset) {
    const { menuNode } = this.state.context;
    if (!menuNode) {
      return;
    }

    const items = Array.from(menuNode.querySelectorAll(this.props.itemSelector));

    const currentIndex = items.indexOf(target);
    let node = null;

    if (currentIndex !== -1) {
      const itemsCount = items.length;
      const index = (itemsCount + currentIndex + offset) % itemsCount;
      node = items[index];
    } else {
      node = offset >= 0 ? items[0] : items.pop();
    }

    if (node && node.focus) {
      node.focus();
    }
  }
}


export { default as Menu } from "./Menu";
export { default as Toggle } from "./Toggle";
export const UncontrolledDropdown = uncontrollable(
  Dropdown,
  { isVisible: ["onToggle", (_, __, e) => e.isVisible] }
);
