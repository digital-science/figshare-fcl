import React, { PureComponent } from "react";


export default class AngleRight extends PureComponent {
  render() {
    return (
      <svg
        aria-hidden={true}
        fill="transparent"
        height="36"
        preserveAspectRatio="xMidYMid meet"
        width="12"
        {...this.props}
        focusable={false}
        viewBox="0 0 12 36"
        xmlns="https://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M6.49 18 .326 12.162a1.025 1.025 0 0 1 0-1.497L1.77 9.297a1.101 1.101 0 0 1 1.505 0l8.4 7.954c.434.41.434 1.087 0 1.498l-8.4 7.954a1.101 1.101 0 0 1-1.505 0L.325 25.335a1.025 1.025 0 0 1 0-1.497L6.491 18z"
          fillRule="evenodd"
        />
      </svg>
    );
  }
}
