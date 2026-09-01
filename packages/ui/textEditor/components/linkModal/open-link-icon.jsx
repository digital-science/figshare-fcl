
import React, { PureComponent } from "react";


export default class OpenLinkIcon extends PureComponent {

  static name = "icons/OpenLinkIcon";

  render() {
    return (
      <svg
        aria-hidden={true}
        fill="transparent"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        {...this.props}
        data-component={OpenLinkIcon.name}
        height="12"
        viewBox="0 0 12 12"
        width="12"
      >
        <path d="M6 0.5C6 0.223858 6.22386 0 6.5 0L11.3 0C11.6866 0 12 0.313401 12 0.7V5.5C12 5.77614 11.7761 6 11.5 6C11.2239 6 11 5.77614 11 5.5V1.70718L6.35355 6.35363C6.15829 6.54889 5.84171 6.54889 5.64645 6.35363C5.45118 6.15837 5.45118 5.84178 5.64645 5.64652L10.293 1H6.5C6.22386 1 6 0.776142 6 0.5Z" fill="#8D8D8D" />
        <path d="M1 2C0.447715 2 0 2.44772 0 3L0 11C0 11.5523 0.447715 12 1 12H9C9.55228 12 10 11.5523 10 11V8.5C10 8.22386 9.77614 8 9.5 8C9.22386 8 9 8.22386 9 8.5V11H1V3H3.5C3.77614 3 4 2.77614 4 2.5C4 2.22386 3.77614 2 3.5 2H1Z" fill="#8D8D8D" />
      </svg>
    );
  }
}
