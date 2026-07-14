import React from "react";
import { mount } from "enzyme";

import RenderInPortal from "../helpers/renderInPortal";

import Overlay from "./overlay";


describe("<Overlay />", () => {
  const mapping = {};
  window.addEventListener = jest.fn((event, cb) => {
    mapping[event] = cb;
  });
  window.removeEventListener = jest.fn((event) => {
    mapping[event] = undefined;
  });

  it("renders component", () => {
    const overlay = mount(<Overlay>Test</Overlay>);

    expect(overlay.isEmptyRender()).toEqual(false);
    overlay.unmount();
  });

  it("doesn't render component if not visible", () => {
    const overlay = mount(<Overlay isVisible={false}>Test</Overlay>);

    expect(overlay.isEmptyRender()).toEqual(true);

    overlay.setProps({ isVisible: true });

    expect(overlay.isEmptyRender()).toEqual(false);

    overlay.setProps({ isVisible: false });

    expect(overlay.isEmptyRender()).toEqual(true);

    overlay.unmount();
  });

  it("calls onClose on click outside", () => {
    const overlay = mount(<Overlay onClose={jest.fn()}>Test</Overlay>);

    overlay.find(".overlay").simulate("mousedown");

    expect(overlay.props().onClose).toHaveBeenCalled();

    overlay.unmount();
  });

  it("doesn't call onClose when clicking on content", () => {
    const overlay = mount(<Overlay onClose={jest.fn()}>Test</Overlay>);

    overlay.find(".overlayBox").simulate("mousedown");

    expect(overlay.props().onClose).not.toHaveBeenCalled();

    overlay.unmount();
  });

  it("pressing escape closes the modal", () => {
    const overlay = mount(<Overlay onClose={jest.fn()}>Test</Overlay>);

    overlay.find(".overlay").simulate("keydown", { key: "Escape", defaultPrevented: true });
    overlay.find(".overlay").simulate("keydown", { key: "Enter" });

    expect(overlay.props().onClose).not.toHaveBeenCalled();

    overlay.find(".overlay").simulate("keydown", { key: "Escape" });

    expect(overlay.props().onClose).toHaveBeenCalled();

    overlay.unmount();
  });

  it("focuses the first focusable element when made visible", () => {
    const overlay = mount(<Overlay isVisible={true} onClose={jest.fn()}><button id="button" /></Overlay>);

    expect(document.activeElement).toEqual(overlay.find("#button").getDOMNode());
  });

  it("accepts a portalNode, either as a node or a selector", () => {
    const node = document.createElement("fecore-ui-overlays");
    node.setAttribute("id", "fecore-ui-overlays");
    document.body.appendChild(node);

    const defaultSelector = mount(
      <Overlay
        isVisible={true}
        onClose={jest.fn()}
      ><button id="button" />
      </Overlay>);
    const asNode = mount(
      <Overlay
        isVisible={true}
        portalNode={node}
        onClose={jest.fn()}
      ><button id="button" />
      </Overlay>);
    const asSelector = mount(
      <Overlay
        isVisible={true}
        portalNode="fecore-ui-overlays"
        onClose={jest.fn()}
      ><button id="button" />
      </Overlay>);
    expect(defaultSelector.find(RenderInPortal).props().portalNode).toEqual(node);
    expect(asNode.find(RenderInPortal).props().portalNode).toEqual(node);
    expect(asSelector.find(RenderInPortal).props().portalNode).toEqual(node);

    defaultSelector.unmount();
    asNode.unmount();
    asSelector.unmount();
    document.body.removeChild(node);

    const bodyNodeFallback = mount(
      <Overlay
        isVisible={true}
        onClose={jest.fn()}
      ><button id="button" />
      </Overlay>);

    expect(bodyNodeFallback.find(RenderInPortal).props().portalNode).toEqual(document.body);
  });
});
