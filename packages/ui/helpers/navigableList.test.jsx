import React from "react";
import { render, cleanup } from "@testing-library/react";

import NavigableList from "./navigableList";


describe("<NavigableList />", () => {
  function teardown() {
    cleanup();
  }

  it("passes correct props to children", () => {
    const innerRef = jest.fn();
    let capturedProps = null;
    render(
      <NavigableList innerRef={innerRef}>
        {(props) => {
          capturedProps = props;

          return (
            <div ref={props.ref} data-extra={true}>
              <button>Child 1</button>
              <button>Child 2</button>
              <button>Child 3</button>
            </div>
          );
        }}
      </NavigableList>
    );

    expect(capturedProps).not.toBeNull();
    expect(capturedProps.onKeyDown).toBeDefined();
    expect(capturedProps.onMouseDown).toBeDefined();
    expect(capturedProps.onFocus).toBeDefined();
    teardown();
  });
});
