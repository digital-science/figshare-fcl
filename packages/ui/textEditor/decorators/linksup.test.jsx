import React from "react";
import { render, cleanup } from "@testing-library/react";

import LinkSup from "./linksup";


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

describe("<LinkSup />", () => {
  function teardown() {
    cleanup();
  }

  it("renders link and sup elements if there is a url", () => {
    const { container } = render(<LinkSup {...makeProps("http://google.com")} />);
    expect(container.querySelector("a")).toBeInTheDocument();
    expect(container.querySelector("sup")).toBeInTheDocument();
    teardown();
  });

  it("renders null if there is no url", () => {
    const { container } = render(<LinkSup {...makeProps(null)} />);
    expect(container.querySelector("a")).not.toBeInTheDocument();
    expect(container.querySelector("sup")).not.toBeInTheDocument();
    teardown();
  });
});
