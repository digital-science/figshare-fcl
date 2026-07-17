import React from "react";
import { render, cleanup, act } from "@testing-library/react";

import LinkingProvider from "./provider";


describe("<LinkingProvider />", () => {
  const expectedContext = expect.objectContaining({
    data: expect.any(Object),
    defaultIdentifier: expect.any(String),
    add: expect.any(Function),
    remove: expect.any(Function),
    update: expect.any(Function),
    getPropsForAttributes: expect.any(Function),
    getAttributeValue: expect.any(Function),
  });

  function teardown() {
    cleanup();
  }

  it("should render the children provided wrapper in context provider", () => {
    const { getByTestId } = render(
      <LinkingProvider>
        <div data-testid="test" />
      </LinkingProvider>
    );
    expect(getByTestId("test")).toBeInTheDocument();
    teardown();
  });

  it("should accept function children and pass the required properties", () => {
    const children = jest.fn(() => <div />);
    render(<LinkingProvider>{children}</LinkingProvider>);
    expect(children).toHaveBeenCalledWith(expectedContext);
    teardown();
  });

  it("should update the children on state change and read the data", () => {
    let providedState = null;
    const children = jest.fn((data) => {
      providedState = data;

      return null;
    });
    render(<LinkingProvider>{children}</LinkingProvider>);

    const { defaultIdentifier: identifier } = providedState;
    const attributes = "attribute";
    const id = "id";
    const callsBefore = children.mock.calls.length;

    act(() => {
      providedState.add(identifier, attributes, id);
    });

    expect(children.mock.calls.length).toBeGreaterThan(callsBefore);
    expect(providedState.getPropsForAttributes(identifier, attributes)).toEqual({ attribute: "id" });

    teardown();
  });
});
