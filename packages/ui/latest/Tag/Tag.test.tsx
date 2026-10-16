import React from "react";
import { render, cleanup } from "@testing-library/react";

import Tag from "./Tag";


describe("Tag", () => {
  function teardown() {
    cleanup();
  }

  it("forwards ref to the root div element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Tag ref={ref} color="blue">Test</Tag>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current).toHaveAttribute("data-part", "tag");

    teardown();
  });
});
