import React from "react";
import { render, cleanup, act } from "@testing-library/react";

import { Menu, UncontrolledDropdown } from "../index";


const wait = () => new Promise((resolve) => setTimeout(resolve));

describe("DropdownMenu Component", () => {
  function teardown() {
    cleanup();
  }

  it("renders children via render-prop", async() => {
    const children = jest.fn(({ isVisible, props }) => (
      <div {...props} data-visible={String(isVisible)} id="menu" />
    ));

    const { container } = render(
      <UncontrolledDropdown>
        {({ props }) => (
          <div id="container" {...props}>
            <Menu>{children}</Menu>
          </div>
        )}
      </UncontrolledDropdown>
    );
    await act(wait);

    expect(container.querySelector("#menu")).toBeInTheDocument();
    expect(children).toHaveBeenCalledWith(
      expect.objectContaining({
        isVisible: expect.any(Boolean),
        onClose: expect.any(Function),
      })
    );
    teardown();
  });
});
