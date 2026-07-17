import React from "react";
import { render, cleanup } from "@testing-library/react";

import { withLinkingContext } from ".";


describe("linking", () => {
  function teardown() {
    cleanup();
  }

  it("withLinkingContext", () => {
    let capturedProps = null;
    const Component = (props) => {
      capturedProps = props;

      return null;
    };
    const WrappedComponent = withLinkingContext(Component);
    render(<WrappedComponent>test</WrappedComponent>);
    expect(capturedProps).toHaveProperty("linkingContext");
    teardown();
  });
});
