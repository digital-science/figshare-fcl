import React from "react";
import ReactDatepicker from "react-datepicker";
import { mount } from "enzyme";
import moment from "moment";

import DatePicker from "./index";


let mockElement = null;

const waitDelay = 200;
const wait = (delay = waitDelay) => new Promise((resolve) => setTimeout(resolve), delay);

describe("<DateInput />", () => {
  beforeEach(() => {
    mockElement = {
      appendChild: jest.fn(),
      focus: jest.fn(),
      querySelector: jest.fn(() => mockElement),
      setAttribute: jest.fn(),
    };
    document.querySelector = jest.fn(() => mockElement);
  });

  it("renders", () => {
    expect(DatePicker.defaultProps.onChange()).toEqual(undefined);

    let mounted = mount(<DatePicker />);

    let rdp = mounted.find(ReactDatepicker);
    expect(rdp).toHaveLength(1);
    expect(rdp.props().endDate).toEqual(undefined);
    expect(rdp.props().startDate).toEqual(undefined);

    mounted = mount(<DatePicker isRangeEnd={true} isRangeStart={true} selectedDate={moment("2020/01/01").toDate()} />);
    rdp = mounted.find(ReactDatepicker);

    expect(rdp.props().endDate).toEqual(moment("2020/01/01").toDate());
    expect(rdp.props().startDate).toEqual(moment("2020/01/01").toDate());
  });

  it("creates creates portal on mount", () => {
    document.body.querySelector = jest.fn(() => true);
    document.body.appendChild = jest.fn();

    mount(<DatePicker />);
    expect(document.body.appendChild).not.toHaveBeenCalled();

    document.body.querySelector = jest.fn(() => null);
    mount(<DatePicker />);
    expect(document.body.appendChild).toHaveBeenCalled();

    document.querySelector = jest.fn(() => false);
    mount(<DatePicker />);
    expect(document.body.appendChild).toHaveBeenCalled();
  });

  it("handles open calendar", () => {
    const mounted = mount(<DatePicker />);
    const instance = mounted.instance();

    const input = mounted.find("input");

    instance.portal.querySelector = jest.fn(() => mockElement);

    instance.portal.querySelector = jest.fn((selector) => {
      if (selector === ".react-datepicker__day--selected") {
        return null;
      }

      return mockElement;
    });
    input.simulate("click");

    const header = mounted.find(".react-datepicker__header--custom");
    const calendar = mounted.find(".react-datepicker__month");

    const controls = header.find("button");

    expect(header).toHaveLength(1);
    expect(calendar).toHaveLength(1);
    expect(controls).toHaveLength(5);
  });

  it("can switch to year view", async() => {
    const onChangeFn = jest.fn();
    const mounted = mount(<DatePicker onChange={onChangeFn} />);

    const input = mounted.find("input");

    input.simulate("click");

    let controls = mounted.find(".react-datepicker__header--custom button");


    controls.at(2).simulate("click");
    await wait();
    mounted.update();
    expect(mounted.state().showYearPicker).toBe(true);

    controls = mounted.find(".react-datepicker__header--custom button");

    controls.at(1).simulate("click");
    await wait();
    mounted.update();

    expect(mounted.state().showYearPicker).toBe(false);
  });

  it("handles select date", async() => {
    const onChangeFn = jest.fn();
    const mounted = mount(<DatePicker onChange={onChangeFn} />);
    const instance = mounted.instance();
    const date = new Date();

    instance.onChange(date);

    await wait();

    expect(onChangeFn).toHaveBeenCalledWith(date);
  });

  it("handles select date within min-max bounds", async() => {
    const onChangeFn = jest.fn();
    const minDate = moment("20/05/2000", "DD/MM/YYYY", true);
    const maxDate = moment("10/07/2005", "DD/MM/YYYY", true);
    const mounted = mount(<DatePicker maxDate={maxDate.toDate()} minDate={minDate.toDate()} onChange={onChangeFn} />);
    const instance = mounted.instance();

    instance.onChange(maxDate.clone().add(1, "day").toDate());
    instance.onChange(minDate.clone().subtract(1, "day").toDate());

    await wait();

    expect(onChangeFn).toHaveBeenCalledWith(maxDate.toDate());
    expect(onChangeFn).toHaveBeenCalledWith(minDate.toDate());
  });

  it("allows selecting the min date year in yearPickerView", async() => {
    const onChangeFn = jest.fn();
    const minDate = moment("20 May 2000");
    const mounted = mount(<DatePicker minDate={minDate.toDate()} onChange={onChangeFn} />);
    const input = mounted.find("input");

    input.simulate("click");
    const controls = mounted.find(".react-datepicker__header--custom button");

    controls.at(2).simulate("click");
    await wait();
    mounted.update();
    expect(mounted.state().showYearPicker).toBe(true);

    const picker = mounted.find(ReactDatepicker);
    const expected = 1999;

    const newMinDate = moment(picker.props().minDate);
    expect(minDate.year()).not.toEqual(newMinDate.year());
    expect(newMinDate.year()).toEqual(expected);
  });

  it("focuses input on select", async() => {
    const onChangeFn = jest.fn();
    const minDate = moment("20 May 2000");
    const mounted = mount(<DatePicker minDate={minDate.toDate()} onChange={onChangeFn} />);
    const input = mounted.find("input");

    input.simulate("click");
    const controls = mounted.find(".react-datepicker__header--custom button");

    controls.at(2).simulate("click");
    await wait();
    mounted.update();
    expect(mounted.state().showYearPicker).toBe(true);

    const closeYearPickerSpy = jest.spyOn(mounted.instance(), "closeYearPickerAndOpenCalendar");

    const year = mounted.find(".react-datepicker__year-text").at(0);

    year.simulate("click");

    await wait();
    mounted.update();

    expect(closeYearPickerSpy).toHaveBeenCalled();

    input.simulate("click");

    await wait();
    mounted.update();

    const setOpenSpy = jest.spyOn(mounted.instance().datepicker, "setOpen");

    const day = mounted.find(".react-datepicker__day").at(3);

    day.simulate("click");

    await wait();
    mounted.update();

    expect(setOpenSpy).toHaveBeenCalled();
  });

  it("handles specific keyboard events correctly", async() => {
    const onChangeFn = jest.fn();
    const mounted = mount(<DatePicker onChange={onChangeFn} />);
    const input = mounted.find("input");

    input.simulate("click");

    await wait();
    mounted.update();

    const instance = mounted.instance();
    const inputSpy = jest.spyOn(instance.datepicker.input, "focus");
    const setOpenSpy = jest.spyOn(instance.datepicker, "setOpen");

    instance.onKeyDown({ key: "Escape", target: instance.datepicker.input });
    instance.onKeyDown({ key: "F", target: instance.datepicker.input });

    expect(inputSpy).toHaveBeenCalled();


    instance.onKeyDown({ key: "Enter", target: instance.datepicker.input });

    expect(setOpenSpy).toHaveBeenCalled();
  });

  it("handles tab keydown on a focused input", async() => {
    const onChangeFn = jest.fn();
    const mounted = mount(<DatePicker onChange={onChangeFn} />);
    const input = mounted.find("input");
    const preventDefault = jest.fn();
    const stopPropagation = jest.fn();

    input.simulate("click");

    await wait();
    mounted.update();

    const instance = mounted.instance();
    const setOpenSpy = jest.spyOn(instance.datepicker, "setOpen");

    instance.onKeyDown({ key: "Tab", shiftKey: true, target: instance.datepicker.input });

    expect(setOpenSpy).toHaveBeenCalled();

    input.simulate("click");

    await wait();
    mounted.update();

    instance.portal.querySelector = jest.fn(() => mockElement);

    instance.onKeyDown({
      key: "Tab", shiftKey: false,
      target: instance.datepicker.input,
      preventDefault, stopPropagation,
    });

    expect(mockElement.focus).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();

    mockElement.focus.mockClear();

    input.simulate("click");
    instance.openYearPicker();

    await wait();
    mounted.update();

    instance.onKeyDown({
      key: "Tab", shiftKey: false,
      target: instance.datepicker.input,
      preventDefault, stopPropagation,
    });

    expect(mockElement.focus).toHaveBeenCalled();
  });

  it("focusing on the input while the calendar is closed will open it", async() => {
    const onChangeFn = jest.fn();
    const mounted = mount(<DatePicker onChange={onChangeFn} />);
    const instance = mounted.instance();
    const setOpenSpy = jest.spyOn(instance.datepicker, "setOpen");

    instance.onFocus({ target: instance.datepicker.input });

    await wait();
    mounted.update();

    expect(setOpenSpy).toHaveBeenCalledWith(true);

    setOpenSpy.mockClear();

    instance.onFocus({ target: undefined });

    await wait();
    mounted.update();

    expect(setOpenSpy).not.toHaveBeenCalled();
  });

  it("does not open calendar on focus if it is disabled", async() => {
    const mounted = mount(<DatePicker disabled={true} />);
    const instance = mounted.instance();
    const setOpenSpy = jest.spyOn(instance.datepicker, "setOpen");

    instance.onFocus({ target: instance.datepicker.input });

    await wait();
    mounted.update();

    expect(setOpenSpy).not.toHaveBeenCalled();
  });

  it("onYearChange checks for out of bounds dates", async() => {
    const onChangeFn = jest.fn();
    const minDate = moment("20/05/2000", "DD/MM/YYYY", true);
    const maxDate = moment("10/07/2005", "DD/MM/YYYY", true);
    const mounted = mount(<DatePicker maxDate={maxDate.toDate()} minDate={minDate.toDate()} onChange={onChangeFn} />);
    const instance = mounted.instance();

    const preselectionSpy = jest.spyOn(instance.datepicker, "setPreSelection");

    instance.onYearChange(minDate.clone().subtract(1, "year").toDate());
    instance.onYearChange(maxDate.clone().add(1, "year").toDate());
    instance.onYearChange(minDate.clone().add(1, "year").toDate());

    await wait();

    expect(preselectionSpy).toHaveBeenCalled();
    expect(onChangeFn).toHaveBeenCalledWith(maxDate.toDate());
    expect(onChangeFn).toHaveBeenCalledWith(minDate.toDate());
    expect(onChangeFn).not.toHaveBeenCalledWith(minDate.clone().add(1, "year").toDate());
  });
});
