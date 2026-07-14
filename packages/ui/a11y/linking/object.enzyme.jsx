import React, { createRef } from "react";
import { mount, shallow } from "enzyme";

import LinkingProvider from "./provider";
import LinkingObject from "./object";
import Context from "./context";


describe("<LinkingProvider />", () => {
  const expectedContext = {
    data: {},
    defaultIdentifier: "defaultIdentif",
    getPropsForAttributes: jest.fn(),
    getAttributeValue: jest.fn(),
  };

  it("should render component prop with children and pass the props", () => {
    const wrapper = mount(
      <Context.Provider value={expectedContext}>
        <LinkingObject attributes="attribute" component="div" random="test">
          test
        </LinkingObject>
      </Context.Provider>
    );

    expect(wrapper.find("div")).toHaveLength(1);
    expect(wrapper.find("div").text()).toBe("test");

    const divProps = wrapper.find("div").props();
    expect(divProps).toHaveProperty("random", "test");
  });

  it("should forward the ref to the component and other props", () => {
    const ref = createRef();

    const wrapper = shallow(
      <LinkingProvider value={expectedContext}>
        <LinkingObject ref={ref} attributes="attribute" component="div">
          test
        </LinkingObject>
      </LinkingProvider>
    ).find(LinkingObject).dive();

    expect(wrapper.prop("forwardedRef")).toBe(ref);
  });


  it("should render function children", () => {
    const children = jest.fn().mockReturnValue(<div>test</div>);

    const wrapper = mount(
      <Context.Provider value={expectedContext}>
        <LinkingObject attributes="attribute">
          {children}
        </LinkingObject>
      </Context.Provider>
    );

    expect(wrapper.find("div")).toHaveLength(1);
    expect(wrapper.find("div").text()).toBe("test");
    // one of first render, second time after the context is updated with the id
    expect(children).toHaveBeenCalled();
    expect(children).toBeCalledWith(expect.objectContaining({
      linking: expect.any(Object),
      objectProps: undefined,
    }));
  });

  it("should throw error if no component or function children is provided", () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();

    expect(() => {
      mount(
        <LinkingProvider>
          <LinkingObject attributes="attribute" />
        </LinkingProvider>
      );
    }).toThrow(Error);

    expect(() => {
      mount(<LinkingObject attributes="attribute" component="div" />);
    }).toThrow(Error);

    // eslint-disable-next-line no-console
    console.error.mockClear();
  });

  it("should use identifier from props or use the default", () => {
    mount(
      <Context.Provider value={expectedContext}>
        <LinkingObject attributes="attribute" component="div" identifierKey="testIdentifier">
          test
        </LinkingObject>
      </Context.Provider>
    );

    expect(expectedContext.getPropsForAttributes).toBeCalledWith("testIdentifier", "attribute");
  });

  it("should use the default identifier if not provided", () => {
    mount(
      <Context.Provider value={expectedContext}>
        <LinkingObject attributes="attribute" component="div">
          test
        </LinkingObject>
      </Context.Provider>
    );

    expect(expectedContext.getPropsForAttributes).toBeCalledWith(expectedContext.defaultIdentifier, "attribute");
  });
});
