import React from "react";
import { render, cleanup } from "@testing-library/react";

import { Menu, Toggle, UncontrolledDropdown } from "../index";


describe("<Toggle />", () => {
  afterEach(cleanup);

  const setup = (toggleProps) => render(
    <UncontrolledDropdown isVisible={true}>
      {({ props }) => (
        <div {...props}>
          <Toggle {...toggleProps}>
            {({ props: p }) => <button {...p} data-testid="toggle" />}
          </Toggle>
          <Menu>{({ props: p }) => <div {...p} id="menu" />}</Menu>
        </div>
      )}
    </UncontrolledDropdown>
  );

  it("defaults to the combobox pattern", () => {
    const { getByTestId } = setup();

    expect(getByTestId("toggle")).toHaveAttribute("role", "combobox");
    expect(getByTestId("toggle")).toHaveAttribute("aria-haspopup", "listbox");
  });

  it("renders a roleless button with aria-expanded for the disclosure pattern", () => {
    const { getByTestId } = setup({ pattern: "disclosure", controls: "menu" });
    const toggle = getByTestId("toggle");

    expect(toggle).not.toHaveAttribute("role");
    expect(toggle).not.toHaveAttribute("aria-haspopup");
    expect(toggle).toHaveAttribute("aria-expanded");
    expect(toggle).toHaveAttribute("aria-controls", "menu");
  });
});
