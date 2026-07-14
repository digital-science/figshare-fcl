import React from "react";
import { Manager as PopperManager } from "react-popper";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import { Provider } from "./context";
import { Dropdown, Menu, Toggle, UncontrolledDropdown } from "./index";


const wait = () => new Promise((resolve) => setTimeout(resolve));

describe("<ControlledDropdown />", () => {
  it("renders children", async() => {
    const children = jest.fn(() => <div id="test" />);

    const dropdown = shallow(
      <Dropdown>
        {children}
      </Dropdown>
    );
    await act(wait);

    expect(dropdown.type()).toEqual(Provider);
    expect(dropdown.find(PopperManager)).toHaveLength(1);
    expect(dropdown.find("#test")).toHaveLength(1);
    expect(dropdown.instance().constructor.defaultProps.onToggle()).toEqual(undefined);
    await act(wait);

    expect(children).toHaveBeenCalledWith({
      isVisible: false,
      props: { onKeyDown: expect.any(Function) },
    });

    dropdown.setProps({ isVisible: true });
    await act(wait);
    expect(children).toHaveBeenCalledWith({
      isVisible: true,
      props: { onKeyDown: expect.any(Function) },
    });

    const onToggle = jest.fn();
    const ev = { };
    dropdown.setProps({ onToggle, isVisible: false });
    await act(wait);

    expect(onToggle).not.toHaveBeenCalled();
    dropdown.state().context.onToggle(ev);
    await act(wait);
    expect(onToggle).toHaveBeenCalledWith(ev, { isVisible: true });

    dropdown.setProps({ isVisible: true });
    dropdown.state().context.onToggle(ev);
    await act(wait);
    expect(onToggle).toHaveBeenCalledWith(ev, { isVisible: false });
  });
});

describe("<Dropdown />", () => {
  const DropdownMenu = (outerProps) => (
    <Menu>
      {({ isVisible, props, onClose }) => (
        <div {...props} data-visible={isVisible} id="menu" {...outerProps}>
          <button id="b1" onClick={onClose} />
          <button id="b2" onClick={onClose} />
          <button id="b3" onClick={onClose} />
          <button id="b4" onClick={onClose} />
        </div>
      )}
    </Menu>
  );

  const DropdownToggle = () => (
    <Toggle>
      {({ onToggle, isVisible, props }) => (
        <button
          {...props}
          data-open={isVisible}
          id="toggle"
          onClick={onToggle}
        />
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


  const DropdownDemo = (dropdownProps) => (
    <UncontrolledDropdown {...dropdownProps}>
      {({ props }) => (
        <div id="container" {...props}>
          <DropdownToggle />
          <DropdownMenu />
        </div>
      )}
    </UncontrolledDropdown>
  );

  it("renders dropdown components", async() => {
    const dropdown = mount(<CustomDropdown />);
    await act(wait);

    expect(dropdown.find("#toggle")).toHaveLength(1);
    expect(dropdown.find("#menu")).toHaveLength(1);
    expect(dropdown.find("#container")).toHaveLength(1);
  });

  it("menu visibility to be true", async() => {
    const dropdown = mount(<DropdownDemo isVisible={true} />);
    await act(wait);

    const toggleButton = dropdown.find("#toggle");
    toggleButton.simulate("click");
    await act(wait);

    expect(dropdown.find("#menu").prop("data-visible")).toBe(true);
  });

  it("closes dropdown on menu item click", async() => {
    const dropdown = mount(<CustomDropdown />);
    await act(wait);

    const toggleButton = dropdown.find("#toggle");
    toggleButton.simulate("click");
    await act(wait);

    const menuItem = dropdown.find("#b1");
    menuItem.simulate("click");
    await act(wait);

    expect(dropdown.find("#menu").prop("data-visible")).toBe(false);
  });

  it("closes dropdown on Escape key press", async() => {
    const dropdown = mount(<CustomDropdown />);
    await act(wait);

    const toggleButton = dropdown.find("#toggle");
    toggleButton.simulate("click");
    await act(wait);

    const menu = dropdown.find("#menu");
    menu.simulate("keydown", { key: "Escape" });
    await act(wait);

    expect(dropdown.find("#menu").prop("data-visible")).toBe(false);
  });
});
