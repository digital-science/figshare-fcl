import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";

import { Menu, Toggle, UncontrolledDropdown } from "./index";


const wait = () => new Promise((resolve) => setTimeout(resolve));

describe("<Dropdown />", () => {
  function teardown() {
    cleanup();
  }

  const DropdownMenu = (outerProps) => (
    <Menu>
      {({ isVisible, props, onClose }) => (
        <div {...props} data-visible={String(isVisible)} id="menu" {...outerProps}>
          <button id="b1" onClick={onClose} />
          <button id="b2" onClick={onClose} />
        </div>
      )}
    </Menu>
  );

  const DropdownToggle = () => (
    <Toggle>
      {({ onToggle, isVisible, props }) => (
        <button {...props} data-open={String(isVisible)} id="toggle" onClick={onToggle} />
      )}
    </Toggle>
  );

  const CustomDropdown = (menuProps) => (
    <UncontrolledDropdown>
      {({ props }) => (
        <div id="container" {...props}>
          <DropdownToggle />
          <DropdownMenu {...menuProps} />
        </div>
      )}
    </UncontrolledDropdown>
  );

  it("renders dropdown components", async() => {
    const { container } = render(<CustomDropdown />);
    await act(wait);
    expect(container.querySelector("#toggle")).toBeInTheDocument();
    expect(container.querySelector("#menu")).toBeInTheDocument();
    teardown();
  });

  it("menu visibility is true after toggle click", async() => {
    const { container } = render(
      <UncontrolledDropdown>
        {({ props }) => (
          <div id="container" {...props}>
            <DropdownToggle />
            <DropdownMenu />
          </div>
        )}
      </UncontrolledDropdown>
    );
    await act(wait);

    const toggle = container.querySelector("#toggle");
    fireEvent.click(toggle);
    await act(wait);
    expect(container.querySelector("#menu").dataset.visible).toBe("true");
    teardown();
  });

  it("closes dropdown on menu item click", async() => {
    const { container } = render(<CustomDropdown />);
    await act(wait);

    fireEvent.click(container.querySelector("#toggle"));
    await act(wait);
    expect(container.querySelector("#menu").dataset.visible).toBe("true");

    fireEvent.click(container.querySelector("#b1"));
    await act(wait);
    expect(container.querySelector("#menu").dataset.visible).toBe("false");
    teardown();
  });

  it("closes dropdown on Escape key press", async() => {
    const { container } = render(<CustomDropdown />);
    await act(wait);

    fireEvent.click(container.querySelector("#toggle"));
    await act(wait);
    expect(container.querySelector("#menu").dataset.visible).toBe("true");

    fireEvent.keyDown(container.querySelector("#container"), { key: "Escape" });
    await act(wait);
    expect(container.querySelector("#menu").dataset.visible).toBe("false");
    teardown();
  });
});
