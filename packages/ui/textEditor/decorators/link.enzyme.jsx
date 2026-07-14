import React from "react";
import { mount } from "enzyme";

import Link from "./link";


describe("<Link />", () => {
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
    const linkComponent = mount(<Link {...props} />);

    expect(linkComponent.find("a")).toHaveLength(1);
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
    const linkComponent = mount(<Link {...newProps} />);

    expect(linkComponent.find("a")).toHaveLength(0);
  });
});
