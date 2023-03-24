import React, { PureComponent } from "react";


export default class ItemTypeFigure extends PureComponent {
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
          d="M2.667 0A2.667 2.667 0 0 0 0 2.667v18.666A2.667 2.667 0 0 0 2.667 24h34.666A2.667 2.667 0 0 0 40 21.333V2.667A2.667 2.667 0 0 0 37.333 0H2.667zm33.798 22.667c1.606 0 2.191-.554 2.191-2.1l.002-1.102c.003-1.849.01-5.634.008-9.234L29.3 4l-7.124 10.496-9.316-5.248-11.526 8.755c0 .738 0 2.071.005 2.55 0 1.482.628 2.1 2.191 2.1 7.406 0 30.741.01 32.936.014z"
          fillRule="evenodd"
        />
      </svg>
    );
  }
}
