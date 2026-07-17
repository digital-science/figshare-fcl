import React, { createRef } from "react";
import { render, cleanup } from "@testing-library/react";

import LinkingProvider from "./provider";
import { withProps, withLinkingReference, withLinkingObject } from "./hoc";


describe("linking Higher-Order Components", () => {
  function teardown() {
    cleanup();
  }

  describe("withWrapper", () => {
    const WrappedComponent = withProps("div", { some: "test" }, "withSome");

    it("should pass the props", () => {
      const { container } = render(<WrappedComponent id="id" />);
      const div = container.querySelector("div");
      expect(div).toBeInTheDocument();
      expect(div).toHaveAttribute("some", "test");
      expect(div).toHaveAttribute("id", "id");
      teardown();
    });

    it("should pass the ref", () => {
      const ref = createRef();
      render(<WrappedComponent ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      teardown();
    });
  });

  it("withLinkingReference", () => {
    const WithReferenceComponent = withLinkingReference("div", "attribute1");
    const { container } = render(
      <LinkingProvider>
        <WithReferenceComponent>test</WithReferenceComponent>
      </LinkingProvider>
    );
    expect(container.querySelector("div")).toBeInTheDocument();
    teardown();
  });

  it("withLinkingObject", () => {
    const WithObjectComponent = withLinkingObject("div", "attribute1");
    const { container } = render(
      <LinkingProvider>
        <WithObjectComponent>test</WithObjectComponent>
      </LinkingProvider>
    );
    expect(container.querySelector("div")).toBeInTheDocument();
    teardown();
  });
});
