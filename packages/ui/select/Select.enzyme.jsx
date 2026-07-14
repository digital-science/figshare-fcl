import PropTypes from "prop-types";
import React, { Component } from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import SelectWithRef, { Select, Option } from "./Select";
import Content from "./Content";


const wait = () => new Promise((resolve) => setTimeout(resolve));

describe("<Select />", () => {
  beforeAll(() => {
    global.IntersectionObserver = class {
      observe() {
        // Intentionally left empty
      }
    };
  });
  it("renders with forwardedRef", async() => {
    const ref = jest.fn();
    mount(<SelectWithRef ref={ref} />);
    await act(wait);

    expect(ref).toHaveBeenCalled();
  });

  it("correctly sets defaultProps", () => {
    const {
      children,
      className,
      contentClassName,
      error,
      forwardedRef,
      loading,
      loadingErrorMessage,
      multiple,
      options,
      placeholder,
      popperModifiers,
      renderChipArea,
      renderTrigger,
      retry,
      searchPlaceholder,
      searchable,
      size,
      triggerClassName,
      value,
      onChange,
      onLoadMore,
      onSearch,
      onToggle,
      onClear,
    } = Select.defaultProps;

    expect(children).toEqual(null);
    expect(className).toEqual(undefined);
    expect(contentClassName).toEqual(undefined);
    expect(error).toEqual(false);
    expect(forwardedRef()).toEqual(undefined);
    expect(loading).toEqual(false);
    expect(loadingErrorMessage).toEqual(undefined);
    expect(multiple).toEqual(false);
    expect(options).toEqual(undefined);
    expect(placeholder).toEqual("Select an option");
    expect(popperModifiers).toEqual([]);
    expect(renderChipArea).toEqual(undefined);
    expect(renderTrigger).toEqual(undefined);
    expect(retry).toEqual(undefined);
    expect(searchPlaceholder).toEqual("Search...");
    expect(searchable).toEqual(false);
    expect(size).toEqual("M");
    expect(triggerClassName).toEqual(undefined);
    expect(value).toEqual(undefined);
    expect(onChange()).toEqual(undefined);
    expect(onClear?.()).toEqual(undefined);
    expect(onLoadMore()).toEqual(undefined);
    expect(onSearch).toEqual(undefined);
    expect(onToggle()).toEqual(undefined);
  });

  it("correctly sets the initial state", () => {
    const select = shallow(<Select />);
    const { isVisible, search } = select.state();

    expect(isVisible).toEqual(false);
    expect(search).toEqual(undefined);
  });

  it("correctly renders the loadingErrorMessage", async() => {
    const select = mount(
      <Select loadingErrorMessage="Test error message">
        <Option value="test">Test option</Option>
      </Select>
    );
    await act(wait);

    const content = select.find(Content);
    expect(content).toHaveLength(1);

    const error = content.find("div div > div.error");
    expect(error).toHaveLength(1);

    const span = error.find("span");
    expect(span).toHaveLength(1);
    expect(span.text()).toEqual("Test error message");
  });

  it("correctly renders the loading state", async() => {
    const select = mount(
      <Select loading={true}>
        <Option value="test">Test option</Option>
      </Select>
    );
    await act(wait);

    const content = select.find(Content);
    expect(content).toHaveLength(1);

    const error = content.find("div div > div.loading");
    expect(error).toHaveLength(1);
  });

  it("correctly calls `onSearch`", async() => {
    const onSearch = jest.fn();

    const select = mount(<Select searchable={true} />);

    const searchInput = select.find("input");
    expect(searchInput).toHaveLength(1);
    searchInput.simulate("change", { target: { value: "test" } });
    await act(wait);
    expect(select.state().search).toEqual("test");

    select.setProps({ onSearch });
    searchInput.simulate("change", { target: { value: "test" } });
    await act(wait);
    expect(onSearch).toHaveBeenCalledWith("test");
  });

  it("correctly calls `onToggle`", async() => {
    const onToggle = jest.fn();

    const select = mount(<Select onToggle={onToggle} />);

    const trigger = select.find("Trigger").at(0);
    expect(trigger).toHaveLength(1);
    const button = trigger.find("[data-id='select-trigger-btn']").at(0);
    expect(button).toHaveLength(1);
    button.simulate("click");
    await act(wait);
    expect(select.state().isVisible).toEqual(true);
    expect(onToggle).toHaveBeenCalledWith(true);

    button.simulate("click");
    await act(wait);
    expect(select.state().isVisible).toEqual(false);
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it("correctly cals `onChange`", async() => {
    const onChange = jest.fn();
    const onToggle = jest.fn();

    const select = mount(
      <Select onChange={onChange} onToggle={onToggle}>
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    );
    await act(wait);

    const options = select.find(Option);
    expect(options).toHaveLength(3);

    options.at(0).find("button").simulate("click");
    await act(wait);
    expect(onChange).toHaveBeenCalledWith("1");
    expect(onToggle).toHaveBeenCalled();

    options.at(1).find("button").simulate("click");
    await act(wait);
    expect(onChange).toHaveBeenCalledWith("2");

    select.setProps({ multiple: true });
    options.at(1).find("button").simulate("click");
    await act(wait);
    expect(onChange).toHaveBeenCalledWith(["2"]);

    select.setProps({ value: ["3"] });
    options.at(1).find("button").simulate("click");
    await act(wait);
    expect(onChange).toHaveBeenCalledWith(["3", "2"]);

    select.setProps({ value: ["1", "2"] });
    options.at(1).find("button").simulate("click");
    await act(wait);
    expect(onChange).toHaveBeenCalledWith(["1"]);

    select.setProps({ value: ["2"] });
    options.at(1).find("button").simulate("click");
    await act(wait);
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("correctly renders the trigger", async() => {
    const renderTrigger = () => "Custom trigger";

    const select = mount(
      <Select placeholder="Custom placeholder">
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
      </Select>
    );
    await act(wait);

    let trigger = select.find("Trigger").at(0);
    const triggerButton = trigger.find("[data-id='select-trigger-btn']").at(0);
    expect(triggerButton).toHaveLength(1);
    expect(triggerButton.text()).toEqual("Custom placeholder");
    expect(trigger.props().renderChipArea).toBeUndefined();

    select.setProps({ value: "1" });
    expect(triggerButton.text()).toEqual("Option 1");

    select.setProps({ multiple: true, value: ["1", "2"] });
    expect(triggerButton.text()).toEqual("Option 1, Option 2");
    select.setProps({ renderTrigger });
    await act(wait);
    expect(triggerButton.text()).toEqual("Custom trigger");

    select.setProps({ renderChipArea: () => <div className="chipsClassName">chips</div> });
    await act(wait);

    trigger = select.find("Trigger").at(0);
    expect(typeof trigger.props().renderChipArea).toEqual("function");
    expect(trigger.find(".chipsClassName").text()).toEqual("chips");
  });

  it("correctly stores the option", async() => {
    class TestSelect extends Component {
      static propTypes = { options: PropTypes.array.isRequired }


      render() {
        return (
          <Select value={this.props.options[0].value}>
            {this.props.options.map(this.renderOption)}
          </Select>
        );
      }

      renderOption = ({ value, name }) => <Option key={value} value={value}>{name}</Option>
    }

    const options = [{
      value: "1",
      name: "Option 1",
    }, {
      value: "2",
      name: "Option 2",
    }];

    const newOptions = [{
      value: "1",
      name: "Option 1 - edited",
    }, {
      value: "2",
      name: "Option 2 - edited",
    }];

    const select = mount(<TestSelect options={options} />);
    select.setProps({ options: newOptions });
    await act(wait);
    select.update();

    expect(select.find(Option)).toHaveLength(2);

    const moreOptions = [{
      value: "2",
      name: "Option 1 - edited",
    }, {
      value: "3",
      name: "Option 2 - edited",
    }];

    select.setProps({ options: moreOptions });
    await act(wait);
    select.update();
  });

  it("handles clear search on select", async() => {
    const select = mount(
      <Select clearSearchOnSelect={true}>
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
      </Select>
    );

    const instance = select.instance();
    instance.content = { onSearch: jest.fn() };
    instance.onSelect("2");
    await act(wait);

    expect(instance.content.onSearch).toHaveBeenCalledWith("");
  });
});
