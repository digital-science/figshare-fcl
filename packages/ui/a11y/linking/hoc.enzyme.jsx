import React, { createRef } from "react";
import { shallow, mount } from "enzyme";

import LinkingProvider from "./provider";
import LinkingReference from "./reference";
import LinkingObject from "./object";
import { withProps, withLinkingReference, withLinkingObject } from "./hoc";


describe("linking Higher-Order Components", () => {
  describe("withWrapper", () => {
    const WrappedComponent = withProps("div", { some: "test" }, "withSome");

    it("should pass the props", () => {
      const wrapper = shallow(<WrappedComponent id="id" />).dive().dive();

      const divWrapper = wrapper.find("div");

      expect(divWrapper).toHaveLength(1);
      expect(divWrapper.prop("some")).toBe("test");
      expect(divWrapper.prop("id")).toBe("id");
    });

    it("should pass the ref", () => {
      const ref = createRef();
      const wrapper = shallow(<WrappedComponent ref={ref} />).dive();

      expect(wrapper.prop("forwardedRef")).toEqual(ref);
    });
  });

  it("withLinkingReference", () => {
    const WithReferenceComponent = withLinkingReference("div", "attribute1");

    const wrapper = mount(
      <LinkingProvider>
        <WithReferenceComponent>test</WithReferenceComponent>
      </LinkingProvider>
    );

    const reference = wrapper.find(LinkingReference);

    expect(reference).toHaveLength(1);
    expect(reference.prop("forAttributes")).toBe("attribute1");
    expect(reference.prop("component")).toBe("div");
  });

  it("withLinkingObject", () => {
    const WithObjectComponent = withLinkingObject("div", "attribute1");

    const wrapper = mount(
      <LinkingProvider>
        <WithObjectComponent>test</WithObjectComponent>
      </LinkingProvider>
    );

    const reference = wrapper.find(LinkingObject);

    expect(reference).toHaveLength(1);
    expect(reference.prop("attributes")).toBe("attribute1");
    expect(reference.prop("component")).toBe("div");
  });
});
