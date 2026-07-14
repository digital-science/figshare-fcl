import React, { createRef } from "react";
import { shallow } from "enzyme";

import withRef from "./withRef";
import uncontrollable from "./uncontrollable";


describe("`uncontrollable` wrapper", () => {
  let Checkbox = null;

  beforeEach(() => {
    Checkbox = (props) => <input type="checkbox" {...props} />;
  });

  it("renders the wrapped component", () => {
    const ref = createRef();
    const UncontrolledCheckbox = uncontrollable(Checkbox);
    const checkbox = shallow(<UncontrolledCheckbox ref={ref} />).dive();

    expect(UncontrolledCheckbox.constructor).toEqual(withRef().constructor);
    expect(checkbox.dive().type()).toEqual(Checkbox);
    expect(checkbox.props().forwardedRef).toEqual(ref);
  });

  it("passes props to wrapped component", () => {
    const props = { checked: true, disabled: false, foo: "bar" };

    const UncontrolledCheckbox = uncontrollable(Checkbox);
    const checkbox = shallow(<UncontrolledCheckbox {...props} />).dive().dive();

    expect(checkbox.props()).toEqual(props);
  });

  it("renders with controlled props", () => {
    const UncontrolledCheckbox = uncontrollable(Checkbox, { checked: "onClick", disabled: "onFocus" });
    const checkbox = shallow(<UncontrolledCheckbox />).dive().dive();

    expect(checkbox.props().checked).toEqual(undefined);
    expect(checkbox.props().disabled).toEqual(undefined);

    checkbox.simulate("click", false);
    expect(checkbox.props().checked).toEqual(false);

    checkbox.simulate("click", true);
    expect(checkbox.props().checked).toEqual(true);

    checkbox.simulate("focus", false);
    expect(checkbox.props().disabled).toEqual(false);

    checkbox.simulate("focus", true);
    expect(checkbox.props().disabled).toEqual(true);
  });

  it("renders with controlled props and calls prop handler", () => {
    const UncontrolledCheckbox = uncontrollable(Checkbox, { checked: "onClick" });
    const onClick = jest.fn();
    const checkbox = shallow(<UncontrolledCheckbox onClick={onClick} />).dive().dive();

    expect(checkbox.props().checked).toEqual(undefined);
    expect(onClick).not.toHaveBeenCalled();

    checkbox.simulate("click", false);

    expect(checkbox.props().checked).toEqual(false);
    expect(onClick).toHaveBeenCalledWith(false);

    checkbox.simulate("click", true);

    expect(checkbox.props().checked).toEqual(true);
    expect(onClick).toHaveBeenCalledWith(true);
  });

  it("renders with controlled props and modifier", () => {
    const UncontrolledCheckbox = uncontrollable(Checkbox, {
      checked: [
        "onClick",
        (_, evt) => evt.checked,
      ],
    });
    const onClick = jest.fn();
    const checkbox = shallow(<UncontrolledCheckbox onClick={onClick} />).dive().dive();

    expect(checkbox.props().checked).toEqual(undefined);
    expect(onClick).not.toHaveBeenCalled();

    let event = { checked: false };
    checkbox.simulate("click", event);

    expect(checkbox.props().checked).toEqual(event.checked);
    expect(onClick).toHaveBeenCalledWith(event);

    event = { checked: true };
    checkbox.simulate("click", event);

    expect(checkbox.props().checked).toEqual(event.checked);
    expect(onClick).toHaveBeenCalledWith(event);
  });

  it("renders with default prop", () => {
    const UncontrolledCheckbox = uncontrollable(Checkbox, { checked: "onClick" });
    const onClick = jest.fn();
    const uncontrolledCheckbox = shallow(<UncontrolledCheckbox checked={true} onClick={onClick} />);
    let checkbox = uncontrolledCheckbox.dive().dive();

    expect(checkbox.props().checked).toEqual(true);
    expect(onClick).not.toHaveBeenCalled();

    checkbox.simulate("click", false);

    expect(checkbox.props().checked).toEqual(false);
    expect(onClick).toHaveBeenCalledWith(false);

    checkbox.simulate("click", true);

    expect(checkbox.props().checked).toEqual(true);
    expect(onClick).toHaveBeenCalledWith(true);

    uncontrolledCheckbox.setProps({ checked: false });
    checkbox = uncontrolledCheckbox.dive().dive();
    onClick.mockClear();

    expect(checkbox.props().checked).toEqual(false);
    expect(onClick).not.toHaveBeenCalled();

    checkbox.simulate("click", false);

    expect(checkbox.props().checked).toEqual(false);
    expect(onClick).toHaveBeenCalledWith(false);
  });
});
