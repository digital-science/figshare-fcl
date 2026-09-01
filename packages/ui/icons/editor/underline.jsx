
import React, { PureComponent } from "react";


export default class Underline extends PureComponent {

  static name = "icons/Underline";

  render() {
    return (
      <svg
        aria-hidden={true}
        fill="transparent"
        preserveAspectRatio="xMidYMid meet"
        {...this.props}
        data-component={Underline.name}
        focusable={false}
        viewBox="0 0 30 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18.8571 12H17.5592V17.7338C17.5592 18.9808 17.3562 19.8235 16.9503 20.2618C16.5444 20.7001 15.8642 20.9192 14.9097 20.9192C14.3521 20.9192 13.8793 20.8085 13.4913 20.5871C13.1077 20.3657 12.8356 20.0517 12.675 19.645C12.5189 19.2339 12.4408 18.5968 12.4408 17.7338V12H11.1429V17.7405C11.1429 18.7933 11.2677 19.6247 11.5175 20.2347C11.7673 20.8401 12.1844 21.3033 12.7687 21.6241C13.353 21.9449 14.1046 22.1053 15.0234 22.1053C15.969 22.1053 16.7318 21.9223 17.3116 21.5563C17.8959 21.1858 18.2996 20.7068 18.5226 20.1195C18.7456 19.5321 18.8571 18.7391 18.8571 17.7405V12Z" fill="currentColor" />
        <path d="M21 22.9474H9V24H21V22.9474Z" fill="currentColor" />
      </svg>
    );
  }
}


