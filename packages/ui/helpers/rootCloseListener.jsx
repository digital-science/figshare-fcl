import PropTypes from "prop-types";
import { Component } from "react";

import contains from "./dom/contains";


const escapeKeyCode = 27;

export default class RootCloseListener extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    innerRef: PropTypes.func,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    disabled: false,
    innerRef: () => undefined,
    onClose: () => undefined,
  }

  preventClose = false;

  componentDidMount() {
    if (!this.props.disabled) {
      this.addListeners();
    }
  }

  componentDidUpdate({ disabled: prevDisabled }) {
    const { disabled } = this.props;

    if (!disabled && prevDisabled) {
      this.addListeners();
    }

    if (disabled && !prevDisabled) {
      this.removeListeners();
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  render() {
    return this.props.children({ ref: this.setRef });
  }

  containerNode = null;
  setRef = (node) => {
    if (!node || node === this.containerNode) {
      return;
    }

    this.props.innerRef(node);
    this.containerNode = node;
  }


  onClickCapture = (event) => {
    const hasModifierKeys = !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
    const isLeftClick = event.button === 0;

    const ownNode = this.containerNode;
    const currentNode = event.target;

    // Mark the next click as having been captured in this handler.
    // The onClick handler should only take into consideration clicks that were captured here.
    // It should disregard others as they might have been stopped from propagating and this.preventClose
    // would not have a correctly parsed value.
    this.captured = true;
    this.preventClose = hasModifierKeys || !isLeftClick || contains(currentNode, ownNode);
  }

  onClick = (event) => {
    if (!this.preventClose && this.captured) {
      this.captured = false;
      this.props.onClose(event);
    }
  }

  onKeyUp = (event) => {
    if (event.keyCode === escapeKeyCode) {
      this.props.onClose(event);
    }
  }

  addListeners() {
    // Use capture to avoid false positives when using `helpers/dom/contains`
    document.addEventListener("click", this.onClickCapture, true);

    document.addEventListener("click", this.onClick);
    document.addEventListener("keyup", this.onKeyUp);
  }

  removeListeners() {
    document.removeEventListener("click", this.onClickCapture, true);
    document.removeEventListener("click", this.onClick);
    document.removeEventListener("keyup", this.onKeyUp);
  }
}
