import React from "react";
import { render, cleanup } from "@testing-library/react";

import OverlayFooter from "./overlayFooter";


describe("<OverlayFooter />", () => {
  function teardown() {
    cleanup();
  }

  it("renders component", () => {
    const { container } = render(
      <OverlayFooter>
        <button>Close</button>
        <button>Confirm</button>
      </OverlayFooter>
    );
    expect(container.querySelectorAll("button")).toHaveLength(2);
    teardown();
  });

  it("handles single button styling", () => {
    const { container } = render(
      <OverlayFooter>
        <button>Close</button>
      </OverlayFooter>
    );
    expect(container.querySelector(".singleControl")).toBeInTheDocument();
    teardown();
  });

  it("accepts custom className", () => {
    const { container } = render(
      <OverlayFooter className="test">
        <button>Close</button>
      </OverlayFooter>
    );
    expect(container.querySelector(".test")).toBeInTheDocument();
    teardown();
  });

  it("exposes slot components for primary and secondary actions", () => {
    const { container } = render(
      <OverlayFooter className="test">
        <OverlayFooter.Primary className="custom-main-slot">
          Main Footer Actions
        </OverlayFooter.Primary>
        <OverlayFooter.Secondary className="custom-secondary-slot">
          Additional Footer Actions
        </OverlayFooter.Secondary>
      </OverlayFooter>
    );
    const primary = container.querySelector(".primary.custom-main-slot");
    const secondary = container.querySelector(".secondary.custom-secondary-slot");
    expect(primary).toBeInTheDocument();
    expect(secondary).toBeInTheDocument();
    expect(primary.textContent.trim()).toEqual("Main Footer Actions");
    expect(secondary.textContent.trim()).toEqual("Additional Footer Actions");
    teardown();
  });
});
