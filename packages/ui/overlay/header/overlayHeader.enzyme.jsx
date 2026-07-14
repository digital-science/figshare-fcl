import React from "react";
import { shallow, mount } from "enzyme";

import { IconButton } from "../../button";
import { OverlayContext } from "../overlay";

import OverlayHeader from "./overlayHeader";


describe("<OverlayHeader />", () => {
  it("renders component", () => {
    const overlayHeader = shallow(
      <OverlayHeader
        description="Description"
        title="Title"
      >
        Test
      </OverlayHeader>);

    expect(overlayHeader.isEmptyRender()).toEqual(false);
    expect(overlayHeader.find("div h1")).toHaveLength(1);
    expect(overlayHeader.find("div p")).toHaveLength(1);
  });

  it("sets correct aria ids for title and description based on context", () => {
    const overlayHeader = mount(
      <OverlayContext.Provider value={ { id: "test" } }>
        <OverlayHeader
          description="Description"
          title="Title"
        />)
      </OverlayContext.Provider>);

    expect(overlayHeader.find("#dialog-test-title")).toHaveLength(1);
    expect(overlayHeader.find("#dialog-test-description")).toHaveLength(1);
  });

  it("sets correct classname for header based on context", () => {
    const overlayHeader = mount(
      <OverlayContext.Provider value={ { id: "test", background: "warning" } }>
        <OverlayHeader
          description="Description"
          title="Title"
        />)
      </OverlayContext.Provider>);

    expect(overlayHeader.find(".confirmation")).toHaveLength(1);
  });

  it("accepts custom className", () => {
    const component = shallow(
      <OverlayHeader className="test">
        <button>Close</button>
      </OverlayHeader>);

    expect(component.isEmptyRender()).toEqual(false);
    expect(component.find(".test")).toHaveLength(1);
  });

  it("accepts a prop to style it as part of OverlayContent", () => {
    const component = shallow(
      <OverlayHeader isPartOfContent={true}>
        <button>Close</button>
      </OverlayHeader>);

    expect(component.isEmptyRender()).toEqual(false);
    expect(component.find(".partOfContent")).toHaveLength(1);
  });

  it("should render the icon button", () => {
    const component = shallow(
      <OverlayHeader
        description="Description"
        title="Title"
      />);

    expect(component.find(IconButton)).toHaveLength(1);
    component.unmount();
  });

  it("should call the onClose function", () => {
    const onClose = jest.fn();
    const component = shallow(
      <OverlayHeader
        description="Description"
        title="Title"
        onClose={onClose}
      />);

    expect(component.find(IconButton)).toHaveLength(1);
    component.find(IconButton).simulate("click");
    expect(onClose).toHaveBeenCalled();
    component.unmount();
  });

  it("should render a Go Back button if backBtnFn is provided", () => {
    const onClose = jest.fn();
    const onGoBack = jest.fn();
    const component = shallow(
      <OverlayHeader
        backBtnFn={onGoBack}
        description="Description"
        title="Title"
        onClose={onClose}
      />);

    expect(component.find(IconButton)).toHaveLength(2);
    component.find(IconButton).at(0).simulate("click");
    expect(onGoBack).toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    component.unmount();
  });

  it("should not show tooltips on first focus of back or close buttons", () => {
    let component = shallow(
      <OverlayHeader
        description="Description"
        title="Title"
        onClose={jest.fn()}
        onGoBack={jest.fn()}
      />);

    expect(component.state().firstFocusIn).toEqual(true);

    let button = component.find(IconButton).at(0);
    expect(button.props().children).toBe(undefined);
    button.simulate("blur");

    expect(component.state().firstFocusIn).toEqual(false);
    component.update();

    expect(component.find(IconButton).at(0).props().children).toBe("Go back");

    component = shallow(
      <OverlayHeader
        description="Description"
        title="Title"
        onClose={jest.fn()}
        onGoBack={jest.fn()}
      />);

    expect(component.state().firstFocusIn).toEqual(true);
    expect(button.props().children).toBe(undefined);


    button = component.find(IconButton).at(1);
    button.simulate("blur");

    expect(component.state().firstFocusIn).toEqual(false);
    component.update();

    expect(component.find(IconButton).at(1).props().children).toBe("Close");
  });
});
