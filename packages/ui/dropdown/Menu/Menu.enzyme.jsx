import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import DropdownMenu from "./Menu";


const wait = () => new Promise((resolve) => setTimeout(resolve));

describe("DropdownMenu Component", () => {
  it("renders children", async() => {
    const children = jest.fn(() => <div id="test" />);

    const menu = mount(
      <DropdownMenu>
        {children}
      </DropdownMenu>
    ).find("DropdownMenu");
    await act(wait);

    expect(menu.find("#test")).toHaveLength(1);

    expect(menu.instance().popperUpdate).toEqual(expect.any(Function));

    menu.instance().popperUpdate = null;
    await act(wait);
    expect(menu.instance().updatePopper).not.toThrow();

    expect(children).toHaveBeenCalledWith(expect.objectContaining({
      isVisible: expect.any(Boolean),
      onClose: expect.any(Function),
      props: expect.objectContaining({ "aria-labelledby": undefined }),
    }));
  });

  it("updates popper when component updates", async() => {
    const children = jest.fn(() => <div id="test" />);
    const dropdownContext = {
      menuRef: React.createRef(),
      isVisible: true,
    };

    const menu = mount(
      <DropdownMenu dropdownContext={dropdownContext}>
        {children}
      </DropdownMenu>
    ).find("DropdownMenu");
    await act(wait);

    const updatePopperSpy = jest.spyOn(menu.instance(), "updatePopper");
    menu.instance().componentDidUpdate();
    expect(updatePopperSpy).toHaveBeenCalled();
  });

});
