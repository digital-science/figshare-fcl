import React from "react";
import { mount } from "enzyme";

import LinkSup from "./linksup";


describe("<LinkSup />", () => {
  const props = {
    children: [],
    entityKey: "keyTest",
    contentState: {
      getEntity: () => {
        return {
          getData: () => {
            return { url: "http://google.com" };
          },
        };
      },
    },
  };
  it("renders link component if there is an url", () => {
    const linkComponent = mount(<LinkSup {...props} />);

    expect(linkComponent.find("a")).toHaveLength(1);
    expect(linkComponent.find("sup")).toHaveLength(1);
  });

  it("renders null if there is no url", () => {
    const newProps = {
      children: [],
      entityKey: "keyTest",
      contentState: {
        getEntity: () => {
          return {
            getData: () => {
              return { url: null };
            },
          };
        },
      },
    };
    const linkComponent = mount(<LinkSup {...newProps} />);

    expect(linkComponent.find("a")).toHaveLength(0);
    expect(linkComponent.find("sup")).toHaveLength(0);
  });
});
