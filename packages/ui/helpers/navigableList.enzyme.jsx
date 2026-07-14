import React from "react";
import { mount } from "enzyme";

import NavigableList from "./navigableList";


describe("<FocusRedirect />", () => {
  it("passes correct props to children", () => {
    const innerRef = jest.fn();
    const testedComponent = mount(
      <NavigableList innerRef={innerRef} >
        {({ ref, ...passedProps }) => (
          <div ref={ref} {...passedProps} data-extra={true}>
            <button>Child 1</button>
            <button>Child 2</button>
            <button>Child 3</button>
          </div>
        )}
      </NavigableList>
    );

    const container = testedComponent.find("div");

    expect(container).toHaveLength(1);
    expect(container.props().onKeyDown).not.toEqual(undefined);
    expect(container.props().onMouseDown).not.toEqual(undefined);
    expect(container.props().onFocus).not.toEqual(undefined);
    expect(container.props()["data-extra"]).toEqual(true);
  });
});
