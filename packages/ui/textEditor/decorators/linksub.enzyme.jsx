import React from "react";
import { mount } from "enzyme";

import LinkSub from "./linksub";


describe("<LinkSub />", () => {
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
    const linkComponent = mount(<LinkSub {...props} />);

    expect(linkComponent.find("a")).toHaveLength(1);
    expect(linkComponent.find("sub")).toHaveLength(1);
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
    const linkComponent = mount(<LinkSub {...newProps} />);

    expect(linkComponent.find("a")).toHaveLength(0);
    expect(linkComponent.find("sub")).toHaveLength(0);
  });
});
