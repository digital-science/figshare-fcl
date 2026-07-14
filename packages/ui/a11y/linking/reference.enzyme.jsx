import React, { createRef } from "react";
import { shallow, mount } from "enzyme";

import Context from "./context";
import LinkingReference from "./reference";
import LinkingProvider from "./provider";


describe("<LinkingReference />", () => {
  it("should render component prop with children and pass the props", () => {
    const wrapper = mount(
      <LinkingProvider>
        <LinkingReference component="div" forAttributes="attribute" random="test">
          test
        </LinkingReference>
      </LinkingProvider>
    );

    expect(wrapper.find("div")).toHaveLength(1);
    expect(wrapper.find("div").text()).toBe("test");

    const divProps = wrapper.find("div").props();
    expect(divProps).toHaveProperty("random", "test");
    expect(divProps).toHaveProperty("id");
  });

  it("should forward the ref to the component and other props", () => {
    const ref = createRef();

    const wrapper = shallow(
      <LinkingProvider>
        <LinkingReference ref={ref} component="div" forAttributes="attribute">
          test
        </LinkingReference>
      </LinkingProvider>
    ).find(LinkingReference).dive();

    expect(wrapper.prop("forwardedRef")).toBe(ref);
  });


  it("should render function children", () => {
    const children = jest.fn().mockReturnValue(<div>test</div>);

    const wrapper = mount(
      <LinkingProvider>
        <LinkingReference forAttributes="attribute">
          {children}
        </LinkingReference>
      </LinkingProvider>
    );

    expect(wrapper.find("div")).toHaveLength(1);
    expect(wrapper.find("div").text()).toBe("test");
    // one of first render, second time after the context is updated with the id
    expect(children).toHaveBeenCalled();
    expect(children).toBeCalledWith(expect.objectContaining({
      linking: expect.any(Object),
      referenceProps: expect.any(Object),
    }));
  });

  it("should throw error if no component or function children is provided", () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();

    expect(() => {
      mount(
        <LinkingProvider>
          <LinkingReference forAttributes="attribute" />
        </LinkingProvider>
      );
    }).toThrow(Error);

    expect(() => {
      mount(<LinkingReference component="div" forAttributes="attribute" />);
    }).toThrow(Error);

    // eslint-disable-next-line no-console
    console.error.mockClear();
  });

  it("should use id and identifier from props or use defaults", () => {
    const wrapper = mount(
      <LinkingProvider>
        <LinkingReference component="div" forAttributes="attribute" id="testId" identifierKey="testIdentifier">
          test
        </LinkingReference>
      </LinkingProvider>
    );

    expect(wrapper.state().getAttributeValue("testIdentifier", "attribute")).toBe("testId");
  });

  it("should use the default identifier if not provided", () => {
    const wrapper = mount(
      <LinkingProvider>
        <LinkingReference component="div" forAttributes="attribute">
          test
        </LinkingReference>
      </LinkingProvider>
    );

    const identifier = wrapper.state().defaultIdentifier;
    const generatedId = wrapper.find("div").prop("id");

    expect(wrapper.state().getAttributeValue(identifier, "attribute")).toBe(generatedId);
  });

  it("should call the provider methods", () => {
    const expectedContext = {
      data: {},
      defaultIdentifier: "default",
      add: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
      getPropsForAttributes: jest.fn(),
      getAttributeValue: jest.fn(),
    };

    const wrapper = mount(
      <Context.Provider value={expectedContext}>
        <LinkingReference component="div" forAttributes="attribute">
          test
        </LinkingReference>
      </Context.Provider>
    );


    expect(expectedContext.add).toBeCalledTimes(1);
    expect(expectedContext.update).toBeCalledTimes(0);

    // force update
    wrapper.setProps({ value: { ...expectedContext } });
    expect(expectedContext.add).toBeCalledTimes(1);
    expect(expectedContext.update).toBeCalledTimes(1);

    wrapper.unmount();

    expect(expectedContext.add).toBeCalledTimes(1);
    expect(expectedContext.update).toBeCalledTimes(1);
    expect(expectedContext.remove).toBeCalledTimes(1);
  });
});
