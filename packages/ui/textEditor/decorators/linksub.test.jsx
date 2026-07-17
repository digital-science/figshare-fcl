import React from "react";
import { render, cleanup } from "@testing-library/react";

import LinkSub from "./linksub";


const makeProps = (url) => {
  return {
    children: [],
    entityKey: "keyTest",
    contentState: {
      getEntity: () => {
        return {
          getData: () => {
            return { url };
          },
        };
      },
    },
  };
};

describe("<LinkSub />", () => {
  function teardown() {
    cleanup();
  }

  it("renders link and sub elements if there is a url", () => {
    const { container } = render(<LinkSub {...makeProps("http://google.com")} />);
    expect(container.querySelector("a")).toBeInTheDocument();
    expect(container.querySelector("sub")).toBeInTheDocument();
    teardown();
  });

  it("renders null if there is no url", () => {
    const { container } = render(<LinkSub {...makeProps(null)} />);
    expect(container.querySelector("a")).not.toBeInTheDocument();
    expect(container.querySelector("sub")).not.toBeInTheDocument();
    teardown();
  });
});
