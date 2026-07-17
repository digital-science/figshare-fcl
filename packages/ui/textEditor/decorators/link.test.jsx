import React from "react";
import { render, cleanup } from "@testing-library/react";

import Link from "./link";


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

describe("<Link />", () => {
  function teardown() {
    cleanup();
  }

  it("renders link component if there is a url", () => {
    const { container } = render(<Link {...makeProps("http://google.com")} />);
    expect(container.querySelector("a")).toBeInTheDocument();
    teardown();
  });

  it("renders null if there is no url", () => {
    const { container } = render(<Link {...makeProps(null)} />);
    expect(container.querySelector("a")).not.toBeInTheDocument();
    teardown();
  });
});
