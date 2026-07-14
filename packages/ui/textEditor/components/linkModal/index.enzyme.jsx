import React from "react";
import { mount } from "enzyme";
import { EditorState } from "draft-js";
import { Button } from "@digital-science/figshare-fcl/button";

import { onConvertHTMLtoDraft } from "../../utils";

import LinkModal from "./index.jsx";


const contentState = onConvertHTMLtoDraft("<a>test component</a>");
const props = {
  editorState: EditorState.createWithContent(contentState),
  urlValue: "",
  showURLInput: true,
  onConfirmLink: undefined,
  onCancelLinkAddition: undefined,
  onRemoveLink: undefined,
  onURLChange: jest.fn(),
};

describe("<LinkModal />", () => {
  it("returns null if display is false", () => {
    const modalComponent = mount(<LinkModal {...props} />);
    modalComponent.setProps({ showURLInput: false });

    expect(modalComponent.isEmptyRender()).toEqual(true);
  });

  it("renders add modal correctly", () => {
    const modalComponent = mount(<LinkModal {...props} />);
    const newContentState = onConvertHTMLtoDraft("<p>test component</p>");
    modalComponent.setProps({ editorState: EditorState.createWithContent(newContentState) });

    expect(modalComponent.isEmptyRender()).toEqual(false);
    expect(modalComponent.find("input")).toHaveLength(1);
    expect(modalComponent.find(".title").text().includes("Add link")).toEqual(true);

    expect(modalComponent.find(Button)).toHaveLength(2);
  });

  it("renders edit modal correctly", () => {
    const modalComponent = mount(<LinkModal {...props} />);

    expect(modalComponent.isEmptyRender()).toEqual(false);
    expect(modalComponent.find("input")).toHaveLength(1);
    expect(modalComponent.find(".title").text().includes("Edit link")).toEqual(true);
    expect(modalComponent.find(Button)).toHaveLength(4);
  });

  it("doesn't save if url is less than 3 characters", () => {
    const modalComponent = mount(<LinkModal {...props} />);
    modalComponent.setProps({ urlValue: "ht" });
    let saveButton = modalComponent.find(Button).at(3);
    expect(saveButton.props().disabled).toEqual(true);

    modalComponent.setProps({ urlValue: "http://google.com" });
    saveButton = modalComponent.find(Button).at(3);

    expect(saveButton.props().disabled).toEqual(false);
  });
  it("removes link from content on click", () => {
    const modalComponent = mount(<LinkModal {...props} />);
    const removeButton = modalComponent.find(Button).at(1);

    removeButton.simulate("click");
    modalComponent.update();

    expect(modalComponent.props().urlValue).toEqual("");
  });
});


