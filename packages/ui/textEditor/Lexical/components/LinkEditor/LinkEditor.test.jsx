import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import { OverlayContent, OverlayFooter } from "@digital-science/figshare-fcl/overlay";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

import defaultTheme from "../../themes/DefaultTheme";

import { LinkEditor } from "./LinkEditor";


const defaultConfig = {
  // The editor theme
  theme: defaultTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
};

Enzyme.configure({ adapter: new Adapter() });

describe("<LinkEditor />", () => {
  const defaultProps = {
    activeEditor: null,
    onClose: jest.fn(),
  };

  it("renders the component", () => {
    const tested = mount(
      <LexicalComposer initialConfig={defaultConfig}>
        <LinkEditor {...defaultProps} />
      </LexicalComposer>
    );

    expect(tested.find(OverlayContent)).toHaveLength(1);
    expect(tested.find(OverlayFooter)).toHaveLength(1);
  });

  it("renders enabled edit mode buttons when there is a set linkUrl", () => {
    const tested = mount(
      <LexicalComposer initialConfig={defaultConfig}>
        <LinkEditor {...defaultProps} />
      </LexicalComposer>
    );

    tested.find("input").simulate("change", { target: { value: "1234" } });
    tested.find(".saveButton").at(0).simulate("click");

    expect(tested.find("#open-link-button").at(0).props().disabled).toBe(false);
    expect(tested.find("#unlink-button").at(0).props().disabled).toBe(false);
  });

  it("renders disabled edit mode buttons when there is no set linkUrl", () => {
    const tested = mount(
      <LexicalComposer initialConfig={defaultConfig}>
        <LinkEditor {...defaultProps} />
      </LexicalComposer>
    );

    tested.find("input").simulate("change", { target: { value: null } });
    tested.find(".saveButton").at(0).simulate("click");

    expect(tested.find("#open-link-button").at(0).props().disabled).toBe(true);
    expect(tested.find("#unlink-button").at(0).props().disabled).toBe(true);
  });

  it("renders save button as disabled", () => {
    const tested = mount(
      <LexicalComposer initialConfig={defaultConfig}>
        <LinkEditor {...defaultProps} />
      </LexicalComposer>
    );

    tested.find("input").simulate("change", { target: { value: "12" } });

    expect(tested.find(".saveButton").at(0).props().disabled).toBe(true);
  });

  it("renders save button as enabled", () => {
    const tested = mount(
      <LexicalComposer initialConfig={defaultConfig}>
        <LinkEditor {...defaultProps} />
      </LexicalComposer>
    );

    tested.find("input").simulate("change", { target: { value: "123" } });

    expect(tested.find(".saveButton").at(0).props().disabled).toBe(false);
  });

  it("displays edited link value in input instead of link value", () => {
    const tested = mount(
      <LexicalComposer initialConfig={defaultConfig}>
        <LinkEditor {...defaultProps} />
      </LexicalComposer>
    );

    tested.find("input").simulate("change", { target: { value: "123" } });
    tested.find(".saveButton").at(0).simulate("click");

    tested.find("input").simulate("change", { target: { value: "1234" } });

    expect(tested.find("input").props().value).toBe("1234");
  });

  it("keeps the previous value of the input to onClose", () => {
    const tested = mount(
      <LexicalComposer initialConfig={defaultConfig}>
        <LinkEditor {...defaultProps} />
      </LexicalComposer>
    );

    tested.find("input").simulate("change", { target: { value: "123" } });
    tested.find(".saveButton").at(0).simulate("click");

    tested.find("input").simulate("change", { target: { value: "1234" } });
    tested.find("#cancel-button").at(0).simulate("click");

    expect(tested.find("input").props().value).toBe("123");
  });

  it("calls onClose on unlink", () => {
    const tested = mount(
      <LexicalComposer initialConfig={defaultConfig}>
        <LinkEditor {...defaultProps} />
      </LexicalComposer>
    );

    tested.find("input").simulate("change", { target: { value: "123" } });
    tested.find(".saveButton").at(0).simulate("click");

    tested.find("#unlink-button").at(0).simulate("click");

    expect(tested.find(LinkEditor).props().onClose).toHaveBeenCalled();
  });

  it("monitors input interaction to onKeyDown", () => {
    const tested = mount(
      <LexicalComposer initialConfig={defaultConfig}>
        <LinkEditor {...defaultProps} />
      </LexicalComposer>
    );

    tested.find("input").simulate("change", { target: { value: "123" } });
    tested.find("input").simulate("keyDown", { key: "Enter" });

    expect(tested.find(LinkEditor).props().onClose).toHaveBeenCalled();
    expect(tested.find("input").props().value).toBe("123");

    tested.find("input").simulate("change", { target: { value: "1234" } });
    tested.find("input").simulate("keyDown", { key: "Escape" });

    expect(tested.find(LinkEditor).props().onClose).toHaveBeenCalled();
    expect(tested.find("input").props().value).toBe("123");
  });
});
