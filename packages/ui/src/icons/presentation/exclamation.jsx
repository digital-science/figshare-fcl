import React, { PureComponent } from "react";


export default class Exclamation extends PureComponent {
  render() {
    return (
      <svg
        aria-hidden={true}
        fill="#8D8D8D"
        height="120"
        preserveAspectRatio="xMidYMid meet"
        width="22"
        {...this.props}
        focusable={false}
        viewBox="0 0 22 120"
        xmlns="https://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M5.5 0C2.462 0 0 2.442 0 5.455V80c0 3.013 2.462 5.454 5.5 5.454h11c3.038 0 5.5-2.441 5.5-5.454V5.455C22 2.442 19.538 0 16.5 0h-11zM5.5 98.182c-3.038 0-5.5 2.442-5.5 5.454v10.909C0 117.558 2.462 120 5.5 120h11c3.038 0 5.5-2.442 5.5-5.455v-10.909c0-3.012-2.462-5.454-5.5-5.454h-11z"
          fillRule="evenodd"
        />
      </svg>
    );
  }
}
