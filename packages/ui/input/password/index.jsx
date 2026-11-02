import React, { Component } from "react";
import PropTypes from "prop-types";

import EyeVisible from "../../icons/eye/visible/small";
import EyeInvisible from "../../icons/eye/invisible/small";
import { Button } from "../../latest/Button";
import TextInput from "../../input/text";


const iconMap = {
  text: EyeVisible,
  password: EyeInvisible,
};

export default class Password extends Component {
  static propTypes = {
    /**
      Disable the input. Input can be focused or tabbed through,
      but will be read only and it's value cannot be modified.
     */
    disabled: PropTypes.bool,
    /**
      Set the input as being in an error state, visually.
     */
    error: PropTypes.bool,
    /**
      Choose the variation of the input, see `TextInput` variations for possible values.
     */
    theme: PropTypes.string,
    /**
      The value stored in the input.
     */
    value: PropTypes.string,
    /**
      A function called with the `change event` when users type in to the input.
     */
    onChange: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    error: false,
    theme: "default",
    value: undefined,
    onChange: undefined,
  }

  state = { isPasswordVisible: false }

  render() {
    const { disabled, ...props } = this.props;
    const { isPasswordVisible } = this.state;

    const type = isPasswordVisible ? "text" : "password";
    const Icon = iconMap[type];
    const tooltip = this.getTooltipText(type);

    return (
      <TextInput {...props} type={type}>
        <Button
          disabled={disabled}
          em="high"
          kind="tertiary"
          span="icon"
          tooltip={tooltip}
          onClick={this.onToggleVisibility}
        >
          <Button.Icon><Icon /></Button.Icon>
        </Button>
      </TextInput>
    );
  }

  onToggleVisibility = () => {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    this.setState((prevState) => {
      return { isPasswordVisible: !prevState.isPasswordVisible };
    });
  }

  getTooltipText = () => {
    const { isPasswordVisible } = this.state;

    return isPasswordVisible ? "Show password" : "Hide password";
  }
}
