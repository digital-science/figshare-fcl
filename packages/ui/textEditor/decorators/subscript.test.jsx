import React from "react";
import { render, cleanup } from "@testing-library/react";

import Subscript from "./subscript";


describe("<Subscript />", () => {
  function teardown() {
    cleanup();
  }

  it("renders subscript component", () => {
    const { container } = render(<Subscript>{[]}</Subscript>);
    expect(container.querySelector("sub")).toBeInTheDocument();
    teardown();
  });
});
