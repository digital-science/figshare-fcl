
import React, { PureComponent } from "react";


export default class Paragraph extends PureComponent {

  static name = "icons/Paragraph";

  render() {
    return (
      <svg
        aria-hidden={true}
        fill="transparent"
        preserveAspectRatio="xMidYMid meet"
        {...this.props}
        data-component={Paragraph.name}
        focusable={false}
        viewBox="0 0 30 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.5651 22.5V13.5H14.9601C15.5576 13.5 16.014 13.5286 16.3291 13.5859C16.7711 13.6596 17.1415 13.8008 17.4403 14.0095C17.7391 14.2142 17.9785 14.5027 18.1586 14.8752C18.3428 15.2476 18.4348 15.6569 18.4348 16.103C18.4348 16.8683 18.1913 17.5171 17.7043 18.0491C17.2172 18.5771 16.3373 18.8411 15.0644 18.8411H12.7561V22.5H11.5651ZM12.7561 17.779H15.0829C15.8523 17.779 16.3987 17.6357 16.722 17.3492C17.0453 17.0628 17.207 16.6596 17.207 16.1398C17.207 15.7633 17.1108 15.442 16.9185 15.176C16.7302 14.9059 16.4805 14.7278 16.1695 14.6419C15.9689 14.5887 15.5985 14.5621 15.0583 14.5621H12.7561V17.779Z" fill="currentColor" />
      </svg>
    );
  }
}
