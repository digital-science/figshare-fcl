
import React, { PureComponent } from "react";


export default class BulletList extends PureComponent {

  static name = "icons/BulletList";

  render() {
    return (
      <svg
        aria-hidden={true}
        fill="transparent"
        preserveAspectRatio="xMidYMid meet"
        {...this.props}
        data-component={BulletList.name}
        focusable={false}
        viewBox="0 0 30 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.375 15C10.2034 15 10.875 14.3284 10.875 13.5C10.875 12.6716 10.2034 12 9.375 12C8.54657 12 7.875 12.6716 7.875 13.5C7.875 14.3284 8.54657 15 9.375 15Z" fill="currentColor" />
        <path d="M22.125 12.75H13.125V14.625H22.125V12.75Z" fill="currentColor" />
        <path d="M22.125 17.25H13.125V19.125H22.125V17.25Z" fill="currentColor" />
        <path d="M13.125 21.75H22.125V23.625H13.125V21.75Z" fill="currentColor" />
        <path d="M10.875 18C10.875 18.8284 10.2034 19.5 9.375 19.5C8.54657 19.5 7.875 18.8284 7.875 18C7.875 17.1716 8.54657 16.5 9.375 16.5C10.2034 16.5 10.875 17.1716 10.875 18Z" fill="currentColor" />
        <path d="M9.375 24C10.2034 24 10.875 23.3284 10.875 22.5C10.875 21.6716 10.2034 21 9.375 21C8.54657 21 7.875 21.6716 7.875 22.5C7.875 23.3284 8.54657 24 9.375 24Z" fill="currentColor" />
      </svg>
    );
  }
}
