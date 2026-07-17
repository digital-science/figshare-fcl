import React from "react";
import { render, cleanup, act } from "@testing-library/react";

import Context from "./context";
import LinkingReference from "./reference";
import LinkingProvider from "./provider";


describe("<LinkingReference />", () => {
  function teardown() {
    cleanup();
  }

  it("should render component prop with children and pass the props", () => {
    const { container } = render(
      <LinkingProvider>
        <LinkingReference component="div" forAttributes="attribute" random="test">test</LinkingReference>
      </LinkingProvider>
    );
    const div = container.querySelector("div");
    expect(div).toBeInTheDocument();
    expect(div.textContent).toBe("test");
    expect(div).toHaveAttribute("random", "test");
    expect(div).toHaveAttribute("id");
    teardown();
  });

  it("should render function children", () => {
    const children = jest.fn().mockReturnValue(<div>test</div>);
    render(
      <LinkingProvider>
        <LinkingReference forAttributes="attribute">{children}</LinkingReference>
      </LinkingProvider>
    );
    expect(children).toHaveBeenCalledWith(expect.objectContaining({
      linking: expect.any(Object),
      referenceProps: expect.any(Object),
    }));
    teardown();
  });

  it("should throw error if no component or function children is provided", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(
      <LinkingProvider><LinkingReference forAttributes="attribute" /></LinkingProvider>
    )).toThrow(Error);
    cleanup();
    expect(() => render(<LinkingReference component="div" forAttributes="attribute" />)).toThrow(Error);
    consoleSpy.mockRestore();
    teardown();
  });

  it("should use id from props", () => {
    const { container } = render(
      <LinkingProvider>
        <LinkingReference component="div" forAttributes="attribute" id="testId">test</LinkingReference>
      </LinkingProvider>
    );
    expect(container.querySelector("div")).toHaveAttribute("id", "testId");
    teardown();
  });

  it("should call the provider methods", () => {
    const ctx = {
      data: {},
      defaultIdentifier: "default",
      add: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
      getPropsForAttributes: jest.fn(),
      getAttributeValue: jest.fn(),
    };

    const { unmount, rerender } = render(
      <Context.Provider value={ctx}>
        <LinkingReference component="div" forAttributes="attribute">test</LinkingReference>
      </Context.Provider>
    );

    expect(ctx.add).toHaveBeenCalledTimes(1);
    expect(ctx.update).toHaveBeenCalledTimes(0);

    act(() => {
      rerender(
        <Context.Provider value={ { ...ctx } }>
          <LinkingReference component="div" forAttributes="attribute">test</LinkingReference>
        </Context.Provider>
      );
    });
    expect(ctx.update).toHaveBeenCalledTimes(1);

    unmount();
    expect(ctx.remove).toHaveBeenCalledTimes(1);
    teardown();
  });
});
