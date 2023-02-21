import React, { PureComponent } from "react";


export default class ItemTypePaper extends PureComponent {
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
          d="M2.667 0A2.667 2.667 0 0 0 0 2.667v18.666A2.667 2.667 0 0 0 2.667 24h34.666A2.667 2.667 0 0 0 40 21.333V2.667A2.667 2.667 0 0 0 37.333 0H2.667zM38 2H22.667v1.333h16v-.666A.667.667 0 0 0 38 2zm.667 2.667h-16V6h16V4.667zm-16 2.666h16v1.334h-16V7.333zm16 2.667h-16v1.333h16V10zm-16 2.667h16V14h-16v-1.333zm16 2.666h-16v1.334h16v-1.334zm-16 2.667h16v1.333h-16V18zm16 2.667h-16V22H38a.667.667 0 0 0 .667-.667v-.666zm-37.334-8h20V14h-20v-1.333zm20 4h-20v-1.334h20v1.334zM1.333 18h20v1.333h-20V18zm20 2.667h-20v.666c0 .369.299.667.667.667h19.333v-1.333zm0-18.667H2a.667.667 0 0 0-.667.667v8.666h20V2z"
          fillRule="evenodd"
        />
      </svg>
    );
  }
}
