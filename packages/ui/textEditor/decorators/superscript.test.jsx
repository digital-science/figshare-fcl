import React from "react";
import { render, cleanup } from "@testing-library/react";

import Superscript from "./superscript";


describe("<Superscript />", () => {
  function teardown() {
    cleanup();
  }

  it("renders superscript component", () => {
    const { container } = render(<Superscript>{[]}</Superscript>);
    expect(container.querySelector("sup")).toBeInTheDocument();
    teardown();
  });
});
