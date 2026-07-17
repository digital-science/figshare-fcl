import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import moment from "moment";

import DatePicker from "./index";


const wait = (delay = 200) => new Promise((resolve) => setTimeout(resolve, delay));

describe("<DateInput />", () => {
  function teardown() {
    cleanup();
  }

  afterEach(() => {
    const portal = document.body.querySelector("#datepicker-portal");
    if (portal) {
      portal.remove();
    }
  });

  it("renders with an input", () => {
    const { container } = render(<DatePicker />);
    expect(container.querySelector("input")).toBeInTheDocument();
    teardown();
  });

  it("defaultProps.onChange returns undefined", () => {
    expect(DatePicker.defaultProps.onChange()).toBeUndefined();
  });

  it("creates a portal on mount", () => {
    render(<DatePicker />);
    expect(document.body.querySelector("#datepicker-portal")).toBeInTheDocument();
    teardown();
  });

  it("does not create duplicate portal if one already exists", () => {
    const existing = document.createElement("div");
    existing.id = "datepicker-portal";
    document.body.appendChild(existing);

    render(<DatePicker />);

    expect(document.body.querySelectorAll("#datepicker-portal")).toHaveLength(1);
    teardown();
  });

  it("opens calendar when input is clicked", async() => {
    const { container } = render(<DatePicker />);
    fireEvent.click(container.querySelector("input"));
    await act(() => wait());
    expect(document.body.querySelector(".react-datepicker")).toBeInTheDocument();
    teardown();
  });

  it("shows 5 navigation buttons in month view header", async() => {
    const { container } = render(<DatePicker />);
    fireEvent.click(container.querySelector("input"));
    await act(() => wait());
    const buttons = document.body.querySelectorAll(".react-datepicker__header button");
    expect(buttons).toHaveLength(5);
    teardown();
  });

  it("shows year picker when header toggle is clicked", async() => {
    const { container } = render(<DatePicker />);
    fireEvent.click(container.querySelector("input"));
    await act(() => wait());

    const buttons = document.body.querySelectorAll(".react-datepicker__header button");
    fireEvent.click(buttons[2]);
    await act(() => wait());

    expect(document.body.querySelector(".react-datepicker__year-text")).toBeInTheDocument();
    teardown();
  });

  it("returns to month view when year picker toggle is clicked", async() => {
    const { container } = render(<DatePicker />);
    fireEvent.click(container.querySelector("input"));
    await act(() => wait());

    let buttons = document.body.querySelectorAll(".react-datepicker__header button");
    fireEvent.click(buttons[2]);
    await act(() => wait());

    buttons = document.body.querySelectorAll(".react-datepicker__header button");
    fireEvent.click(buttons[1]);
    await act(() => wait());

    expect(document.body.querySelector(".react-datepicker__month")).toBeInTheDocument();
    expect(document.body.querySelector(".react-datepicker__year-text")).not.toBeInTheDocument();
    teardown();
  });

  it("calls onChange when a date is selected", async() => {
    const onChange = jest.fn();
    const { container } = render(<DatePicker onChange={onChange} />);
    fireEvent.click(container.querySelector("input"));
    await act(() => wait());

    const days = document.body.querySelectorAll(
      ".react-datepicker__day:not(.react-datepicker__day--outside-month):not(.react-datepicker__day--disabled)"
    );
    fireEvent.click(days[0]);
    await act(() => wait());

    expect(onChange).toHaveBeenCalled();
    teardown();
  });

  it("does not open calendar when disabled", async() => {
    const { container } = render(<DatePicker disabled={true} />);
    fireEvent.click(container.querySelector("input"));
    await act(() => wait());
    expect(document.body.querySelector(".react-datepicker__month")).not.toBeInTheDocument();
    teardown();
  });

  it("shows selected date as highlighted in open calendar", async() => {
    const selectedDate = moment("2020-06-15").toDate();
    const { container } = render(<DatePicker selectedDate={selectedDate} />);
    fireEvent.click(container.querySelector("input"));
    await act(() => wait());
    expect(document.body.querySelector(".react-datepicker__day--selected")).toBeInTheDocument();
    teardown();
  });
});
