import PropTypes from "prop-types";
import React, { Component } from "react";
import { Popper } from "react-popper";

import withConsumer from "../../helpers/withConsumer";
import RootCloseListener from "../../helpers/rootCloseListener";
import { Consumer } from "../context";


export class DropdownMenu extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    dropdownContext: PropTypes.object.isRequired,
    autoAdjust: PropTypes.bool,
    modifiers: PropTypes.array,
    placement: PropTypes.oneOf([
      "bottom", "bottom-start", "bottom-end",
      "top", "top-start", "top-end",
      "right", "right-start", "right-end",
      "left", "left-start", "left-end",
    ]),
  }

  static defaultProps = {
    autoAdjust: false,
    modifiers: [],
    placement: "bottom-start",
  }

  componentDidUpdate() {
    this.updatePopper();
  }

  render() {
    const { menuRef, isVisible } = this.props.dropdownContext;

    return (
      <RootCloseListener disabled={!isVisible} innerRef={menuRef} onClose={this.onClose} >
        {this.renderPopper}
      </RootCloseListener>
    );
  }

  renderPopper = (({ ref }) => {
    const { dropdownContext, placement, autoAdjust, children, modifiers, ...props } = this.props;
    const { toggleNode, isVisible } = dropdownContext;


    return (
      <Popper
        {...props}
        eventsEnabled={isVisible}
        innerRef={ref}
        modifiers={
          [{ name: "flip", enabled: autoAdjust, options: { boundary: this.getBoundary() } }, ...modifiers]
        }
        placement={placement}
        referenceElement={toggleNode}
      >
        {this.renderChildren}
      </Popper>
    );
  })

  renderChildren = ({ ref, style, ...popper }) => {
    const { children, dropdownContext } = this.props;
    const { toggleNode, isVisible } = dropdownContext;
    this.popperUpdate = popper.update;

    return children({
      ...popper,
      isVisible,
      onClose: this.onClose,
      props: {
        "aria-labelledby": toggleNode?.id || undefined,
        ref,
        style,
      },
    });
  }

  onClose = (event) => {
    const { onToggle } = this.props.dropdownContext;

    onToggle(event, { isVisible: false });
  }

  getBoundary = () => {
    try {
      const mainElement = document.querySelector("main");

      return mainElement || "clippingParents";
    } catch (e) {
      return "clippingParents";
    }
  };

  updatePopper = () => {
    if (this.popperUpdate) {
      this.popperUpdate();
    }
  }
}

export const Menu = withConsumer(Consumer, "dropdownContext")(DropdownMenu);

Menu.displayName = "Menu";

export default Menu;
