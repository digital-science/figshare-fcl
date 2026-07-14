import React from "react";
import { shallow } from "enzyme";

import LinkingProvider from "./provider";
import Context from "./context";


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

  it("should render the children provided wrapper in context provider", () => {
    const provider = shallow(
      <LinkingProvider>
        <div id="test" />
      </LinkingProvider>
    );

    expect(provider.is(Context.Provider)).toBe(true);
    expect(provider.prop("value")).toEqual(expectedContext);
    expect(provider.children().prop("id")).toBe("test");
  });

  it("should accept function children and pass the required properties", () => {
    const children = jest.fn(() => <div id="test" />);
    const provider = shallow(
      <LinkingProvider>
        {children}
      </LinkingProvider>
    );

    expect(provider.is(Context.Provider)).toBe(true);
    expect(provider.children().prop("id")).toBe("test");
    expect(children).toHaveBeenCalledWith(expectedContext);
  });

  it("should update the children on stage change and read the data", () => {
    let providedState = undefined;
    const children = jest.fn((data) => {
      providedState = data;

      return null;
    });

    const provider = shallow(
      <LinkingProvider>
        {children}
      </LinkingProvider>
    );

    const { defaultIdentifier: identifier } = providedState;
    const attributes = "attribute";
    const id = "id";

    expect(children).toBeCalledTimes(1);

    providedState.add(identifier, attributes, id);
    expect(children).toBeCalledTimes(2);
    expect(providedState.getPropsForAttributes(identifier, attributes)).toEqual({ attribute: "id" });
    expect(provider.state("data")).not.toEqual({});

    providedState.update(
      { identifier, attribute: attributes, id },
      { identifier, attribute: attributes, id },
    );

    expect(children).toBeCalledTimes(2);
  });
});
