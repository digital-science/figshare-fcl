
import React, { PureComponent } from "react";


export default class Resize extends PureComponent {

  static name = "icons/Resize";

  render() {
    return (
      <svg
        aria-hidden={true}
        fill="transparent"
        preserveAspectRatio="xMidYMid meet"
        {...this.props}
        data-component={Resize.name}
        focusable={false}
        height={8}
        viewBox="0 0 8 8"
        width={8}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 7V1.20711C8 0.761654 7.46143 0.53857 7.14645 0.853552L0.853553 7.14645C0.538571 7.46143 0.761654 8 1.20711 8H7C7.55228 8 8 7.55228 8 7Z" fill="#8D8D8D" />
      </svg>

    );
  }
}
