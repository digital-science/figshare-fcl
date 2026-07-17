import React from "react";
import { render, cleanup } from "@testing-library/react";

import { Warning } from ".";


describe("Warning component", () => {
  function teardown() {
    cleanup();
  }

  it("renders to correct text", () => {
    const { container } = render(<Warning contentLength={5230} />);
    expect(container.querySelector(".editorTextLength")).toBeInTheDocument();
    teardown();
  });
});
