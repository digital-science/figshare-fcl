
import React, { PureComponent } from "react";


export default class Redo extends PureComponent {

  static name = "icons/Redo";

  render() {
    return (
      <svg
        aria-hidden={true}
        fill="transparent"
        preserveAspectRatio="xMidYMid meet"
        {...this.props}
        data-component={Redo.name}
        focusable={false}
        viewBox="0 0 30 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="white" height="36" width="30" />
        <path d="M18.692 15.0184V16.4646C18.692 16.6104 18.8738 16.6873 18.9878 16.5898L21.4022 14.5253C21.5326 14.4138 21.5326 14.2196 21.4022 14.1081L18.9878 12.0436C18.8738 11.946 18.692 12.0229 18.692 12.1687V13.615H13.9653C10.9469 13.615 8.5 15.9398 8.5 18.8075C8.5 21.6752 10.9469 24 13.9653 24H19.5192C19.715 24 19.8737 23.8492 19.8737 23.6632V22.9334C19.8737 22.7474 19.715 22.5966 19.5192 22.5966H13.9653C11.7627 22.5966 9.9771 20.9002 9.9771 18.8075C9.9771 16.7148 11.7627 15.0184 13.9653 15.0184H18.692Z" fill="currentColor" />
      </svg>

    );
  }
}


