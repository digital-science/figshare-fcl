import React from "react";
import { render, cleanup } from "@testing-library/react";

import OverlayContent from "./overlayContent";


describe("<OverlayContent />", () => {
  function teardown() {
    cleanup();
  }

  it("renders component", () => {
    const { container } = render(
      <OverlayContent>
        <article>Content</article>
      </OverlayContent>
    );
    expect(container.querySelector("article")).toBeInTheDocument();
    teardown();
  });

  it("accepts custom className", () => {
    const { container } = render(
      <OverlayContent className="test">
        <button>Close</button>
      </OverlayContent>
    );
    expect(container.querySelector(".test")).toBeInTheDocument();
    teardown();
  });
});
