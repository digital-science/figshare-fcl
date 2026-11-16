import React from "react";
import { render, cleanup } from "@testing-library/react";

import Avatar from "./index";


describe("<Avatar />", () => {
  afterEach(cleanup);

  it("exposes the full name as an image and has no tooltip", () => {
    const { getByRole } = render(<Avatar firstName="Jane" lastName="Doe" />);
    const img = getByRole("img", { name: "Jane Doe" });

    expect(img).not.toHaveAttribute("title");
  });

  it("is hidden from assistive technology when no name is given", () => {
    const { container, queryByRole } = render(<Avatar />);

    expect(queryByRole("img")).toBeNull();
    expect(container.querySelector("[role='img']")).toBeNull();
  });

  it("is hidden from assistive technology when decorative", () => {
    const { queryByRole } = render(<Avatar decorative={true} firstName="Jane" lastName="Doe" />);

    expect(queryByRole("img")).toBeNull();
  });

  it("forwards extra props to the root element", () => {
    const { container } = render(<Avatar data-id="avatar" firstName="Jane" lastName="Doe" />);

    expect(container.querySelector("[data-id='avatar']")).toBeInTheDocument();
  });
});
