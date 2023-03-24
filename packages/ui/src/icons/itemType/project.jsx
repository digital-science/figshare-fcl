import React, { PureComponent } from "react";


export default class ItemTypeProject extends PureComponent {
  render() {
    return (
      <svg
        aria-hidden={true}
        fill="transparent"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        width="40"
        {...this.props}
        focusable={false}
        viewBox="0 0 40 24"
        xmlns="https://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M8.136 0C6.68 0 5.5 1.194 5.5 2.667v18.666C5.5 22.806 6.68 24 8.136 24h23.728c1.456 0 2.636-1.194 2.636-2.667V6.223c0-1.474-1.18-2.667-2.636-2.667H18.242L14.571.584A2.618 2.618 0 0 0 12.924 0H8.136z"
          fillRule="evenodd"
        />
      </svg>
    );
  }
}
