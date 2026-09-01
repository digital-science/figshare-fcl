
import React, { PureComponent } from "react";


export default class Undo extends PureComponent {

  static name = "icons/Undo";

  render() {
    return (
      <svg
        aria-hidden={true}
        fill="transparent"
        preserveAspectRatio="xMidYMid meet"
        {...this.props}
        data-component={Undo.name}
        focusable={false}
        viewBox="0 0 30 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="white" height="36" width="30" />
        <path d="M11.308 15.0184V16.4646C11.308 16.6104 11.1262 16.6873 11.0122 16.5898L8.59779 14.5253C8.4674 14.4138 8.4674 14.2196 8.59779 14.1081L11.0122 12.0436C11.1262 11.946 11.308 12.0229 11.308 12.1687V13.615H16.0347C19.0531 13.615 21.5 15.9398 21.5 18.8075C21.5 21.6752 19.0531 24 16.0347 24H10.4808C10.285 24 10.1263 23.8492 10.1263 23.6632V22.9334C10.1263 22.7474 10.285 22.5966 10.4808 22.5966H16.0347C18.2373 22.5966 20.0229 20.9002 20.0229 18.8075C20.0229 16.7148 18.2373 15.0184 16.0347 15.0184H11.308Z" fill="currentColor" />
      </svg>
    );
  }
}


