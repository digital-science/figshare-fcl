import React from "react";
import { render, cleanup } from "@testing-library/react";

import LinkingProvider from "./provider";
import LinkingObject from "./object";
import Context from "./context";


describe("<LinkingObject />", () => {
  function makeContext(overrides = {}) {
    return {
      data: {},
      defaultIdentifier: "defaultIdentif",
      getPropsForAttributes: jest.fn(),
      getAttributeValue: jest.fn(),
      ...overrides,
    };
  }

  function teardown() {
    cleanup();
  }

  it("should render component prop with children and pass the props", () => {
    const ctx = makeContext();
    const { container } = render(
      <Context.Provider value={ctx}>
        <LinkingObject attributes="attribute" component="div" random="test">test</LinkingObject>
      </Context.Provider>
    );
    const div = container.querySelector("div");
    expect(div).toBeInTheDocument();
    expect(div.textContent).toBe("test");
    expect(div).toHaveAttribute("random", "test");
    teardown();
  });

  it("should render function children", () => {
    const ctx = makeContext();
    const children = jest.fn().mockReturnValue(<div>test</div>);
    render(
      <Context.Provider value={ctx}>
        <LinkingObject attributes="attribute">{children}</LinkingObject>
      </Context.Provider>
    );
    expect(children).toHaveBeenCalledWith(expect.objectContaining({
      linking: expect.any(Object),
      objectProps: undefined,
    }));
    teardown();
  });

  it("should throw error if no component or function children is provided", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(
      <LinkingProvider><LinkingObject attributes="attribute" /></LinkingProvider>
    )).toThrow(Error);
    cleanup();
    expect(() => render(<LinkingObject attributes="attribute" component="div" />)).toThrow(Error);
    consoleSpy.mockRestore();
    teardown();
  });

  it("should use identifier from props", () => {
    const ctx = makeContext();
    render(
      <Context.Provider value={ctx}>
        <LinkingObject attributes="attribute" component="div" identifierKey="testIdentifier">test</LinkingObject>
      </Context.Provider>
    );
    expect(ctx.getPropsForAttributes).toHaveBeenCalledWith("testIdentifier", "attribute");
    teardown();
  });

  it("should use the default identifier if not provided", () => {
    const ctx = makeContext();
    render(
      <Context.Provider value={ctx}>
        <LinkingObject attributes="attribute" component="div">test</LinkingObject>
      </Context.Provider>
    );
    expect(ctx.getPropsForAttributes).toHaveBeenCalledWith(ctx.defaultIdentifier, "attribute");
    teardown();
  });
});
