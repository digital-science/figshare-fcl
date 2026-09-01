
import React, { PureComponent } from "react";


export default class UnlinkIcon extends PureComponent {

  static name = "icons/UnlinkIcon";

  render() {
    return (
      <svg
        aria-hidden={true}
        fill="transparent"
        height="20"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 18 20"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
        {...this.props}
        data-component={UnlinkIcon.name}
      >
        <path d="M6.5 9C6.22386 9 6 9.22386 6 9.5V15.5C6 15.7761 6.22386 16 6.5 16C6.77614 16 7 15.7761 7 15.5V9.5C7 9.22386 6.77614 9 6.5 9Z" fill="#8D8D8D" />
        <path d="M8.5 9.5C8.5 9.22386 8.72386 9 9 9C9.27614 9 9.5 9.22386 9.5 9.5V15.5C9.5 15.7761 9.27614 16 9 16C8.72386 16 8.5 15.7761 8.5 15.5V9.5Z" fill="#8D8D8D" />
        <path d="M11.5 9C11.2239 9 11 9.22386 11 9.5V15.5C11 15.7761 11.2239 16 11.5 16C11.7761 16 12 15.7761 12 15.5V9.5C12 9.22386 11.7761 9 11.5 9Z" fill="#8D8D8D" />
        <path clipRule="evenodd" d="M1 5C0.447715 5 0 5.44772 0 6C0 6.55228 0.447716 7 1 7H2V18C2 19.1046 2.89543 20 4 20H14C15.1046 20 16 19.1046 16 18V7H17C17.5523 7 18 6.55228 18 6C18 5.44772 17.5523 5 17 5H1ZM14 7H4V18H14V7Z" fill="#8D8D8D" fillRule="evenodd" />
        <path d="M7 1.5H11C11.8284 1.5 12.5 2.17157 12.5 3H14C14 1.34315 12.6569 0 11 0L7 0C5.34315 0 4 1.34315 4 3H5.5C5.5 2.17157 6.17157 1.5 7 1.5Z" fill="#8D8D8D" />
      </svg>

    );
  }
}
