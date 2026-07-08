/* eslint-disable react/jsx-handler-names */
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDatepicker from "react-datepicker";
import moment from "moment";

import ChevronRight from "../../icons/chevron/right/medium";
import ChevronLeft from "../../icons/chevron/left/medium";

import "./datepicker.css";

import { validateDateFormat, getYearsPeriod, DEFAULT_MIN_DATE, DEFAULT_MAX_DATE } from "./utils";
import style from "./index.module.css";


const PORTAL_ID = "datepicker-portal";
const FOCUS_DELAY = 50;


export default class Date extends Component {
  static propTypes = {
    /**
      Custom `className` to append to the component root node.
     */
    className: PropTypes.string,
    /**
      A format string describing the structure of the calendar date value, eg: `"YYYY-MM-DD"`.
      Will be used as the placeholder for the input if an explicit `placeholder` property is not provided.
     */
    dateFormat: validateDateFormat,
    /**
      Disable the input. Input can be focused or tabbed through,
      but will be read only, and the calendar will always remain closed.
     */
    disabled: PropTypes.bool,
    /**
      Mark the input as being, visually in an error state.
     */
    error: PropTypes.bool,
    /**
      Use with inline 2 step range calendar implementations, to mark this input as being the end of the range,
      or as holding the value to the `endDate`.
     */
    isRangeEnd: PropTypes.bool,
    /**
      Use with inline 2 step range calendar implementations, to mark this input as being the start of the range,
      or as holding the value to the `startDate`.
     */
    isRangeStart: PropTypes.bool,
    /**
      `Date` value marking the maximum selectable date for this calendar.
     */
    maxDate: PropTypes.any,
    /**
      `Date` value marking the minimum selectable date for this calendar.
     */
    minDate: PropTypes.any,
    /**
      Input placeholder value.
     */
    placeholder: PropTypes.string,
    /**
      Use in inline 2 step range calendar implementations, to mark the opposite end, or second range value of the set.

      <Input type="date"
        isRangeEnd={true}
        rangeSelectedDate={startDate}
        selectedDate={endDate}
      >
      <Input type="date"
       isRangeStart={true}
        rangeSelectedDate={endDate}
        selectedDate={startDate}
      >

    */
    rangeSelectedDate: PropTypes.any,
    /**
      Initial selected date value. Can be a date string or Date object.
     */
    selectedDate: PropTypes.any,
    /**
      Optional wrapper node className for the calendar.
     */
    wrapperClassName: PropTypes.string,
    /**
      Number of year options to show in the year calendar grid.
     */
    yearItemNumber: PropTypes.number,
    /**
      Handler function triggered on a date change. Either submitted in the input or selected from the calendar.
      Receives the new date as a parsable date string.
      (newDate: DateString) => void;
     */
    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: undefined,
    dateFormat: "yyyy-MM-dd",
    disabled: false,
    error: false,
    isRangeEnd: false,
    isRangeStart: false,
    selectedDate: undefined,
    rangeSelectedDate: undefined,
    placeholder: undefined,
    wrapperClassName: undefined,
    yearItemNumber: 12,
    minDate: DEFAULT_MIN_DATE,
    maxDate: DEFAULT_MAX_DATE,
    onChange: () => undefined,
  }

  state = { showYearPicker: false }

  datepicker = null;
  portal = null

  componentDidMount() {
    this.portal = document.body.querySelector(`#${PORTAL_ID}`);
    if (!this.portal) {
      this.portal = document.createElement("div");
      this.portal.id = PORTAL_ID;
      this.portal.setAttribute("tabindex", "-1");
      this.portal.classList.add(style.portal);

      document.body.appendChild(this.portal);
    }
  }

  render() {
    const {
      dateFormat,
      disabled,
      error,
      isRangeStart,
      isRangeEnd,
      placeholder,
      rangeSelectedDate,
      selectedDate,
      onChange,
      wrapperClassName,
      ...rest
    } = this.props;

    const endDate = isRangeEnd ? selectedDate : rangeSelectedDate;
    const startDate = isRangeStart ? selectedDate : rangeSelectedDate;
    const minDate = this.getMinDate();

    return (
      <ReactDatepicker
        ref={this.setRef}
        placeholderText={placeholder ?? dateFormat.toUpperCase()}
        {...rest}
        calendarStartDay={1}
        dateFormat={dateFormat}
        enableTabLoop={true}
        endDate={endDate}
        minDate={minDate}
        portalId={PORTAL_ID}
        preventOpenOnFocus={true}
        readOnly={disabled}
        renderCustomHeader={this.renderHeader}
        selected={selectedDate}
        selectsEnd={isRangeEnd}
        selectsStart={isRangeStart}
        shouldCloseOnSelect={false}
        showPopperArrow={false}
        showYearPicker={this.state.showYearPicker}
        startDate={startDate}
        wrapperClassName={classnames(
          style.wrapper,
          wrapperClassName,
          { [style.disabled]: disabled, [style.error]: error }
        )}
        yearItemNumber={this.props.yearItemNumber}
        onCalendarClose={this.onCalendarClose}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyDown}
        onSelect={this.onSelect}
        onYearChange={this.onYearChange}
      />
    );
  }

  renderHeader = (props) => {
    const {
      date,
      increaseMonth,
      increaseYear,
      decreaseMonth,
      decreaseYear,
      nextMonthButtonDisabled,
      prevMonthButtonDisabled,
      prevYearButtonDisabled,
      nextYearButtonDisabled,
    } = props;
    const { showYearPicker } = this.state;
    const { yearItemNumber } = this.props;

    if (showYearPicker) {
      const { startPeriod, endPeriod } = getYearsPeriod(date, yearItemNumber);

      return (
        <div className={style.header}>
          <button disabled={prevYearButtonDisabled} onClick={decreaseYear}><ChevronLeft /><ChevronLeft /></button>
          <button className={style.toggle} onClick={this.closeYearPicker}>{`${startPeriod} - ${endPeriod}`}</button>
          <button disabled={nextYearButtonDisabled} onClick={increaseYear}><ChevronRight /><ChevronRight /></button>
        </div>
      );
    }

    return (
      <div className={style.header}>
        <div>
          <button disabled={prevYearButtonDisabled} onClick={decreaseYear}><ChevronLeft /><ChevronLeft /></button>
          <button disabled={prevMonthButtonDisabled} onClick={decreaseMonth}><ChevronLeft /></button>
        </div>
        <button className={style.toggle} onClick={this.openYearPicker}>{moment(date).format("MMM yyyy")}</button>
        <div>
          <button disabled={nextMonthButtonDisabled} onClick={increaseMonth}><ChevronRight /></button>
          <button disabled={nextYearButtonDisabled} onClick={increaseYear}><ChevronRight /><ChevronRight /></button>
        </div>
      </div>
    );
  }

  setRef = (node) => this.datepicker = node;

  onChange = (date) => {
    const { onChange, minDate, maxDate } = this.props;

    if (typeof onChange === "function") {
      const parsed = moment(date);

      let toConvert = date;

      if (parsed.isBefore(minDate, "day")) {
        toConvert = minDate;
      }

      if (parsed.isAfter(maxDate, "day")) {
        toConvert = maxDate;
      }

      onChange(toConvert);
    }
  }

  onSelect = (date) => {
    if (this.state.showYearPicker) {
      this.closeYearPickerAndOpenCalendar(date);
    } else if (this.datepicker.isCalendarOpen()) {
      this.datepicker.setOpen(false);
      setTimeout(() => {
        this.datepicker.input?.focus?.();
      }, FOCUS_DELAY);
    }
  }

  onCalendarClose = () => {
    this.setState({ showYearPicker: false });
  }

  onFocus = (event) => {
    if (this.props.disabled) {
      return;
    }

    if (event.target === this.datepicker?.input && !this.datepicker.isCalendarOpen() && event.relatedTarget) {
      this.datepicker.setOpen(true);
    }
  }

  onYearChange = (date) => {
    const { minDate, maxDate } = this.props;

    const parsed = moment(date);

    if (parsed.isBefore(minDate, "day")) {
      this.datepicker.setPreSelection(minDate);
      this.onChange(minDate);

      return;
    }

    if (parsed.isAfter(maxDate, "day")) {
      this.datepicker.setPreSelection(maxDate);
      this.onChange(maxDate);
    }
  }

  onKeyDown = (event) => {
    switch (event.key) {
      case "Tab":
        if (event.target === this.datepicker?.input && this.datepicker.isCalendarOpen()) {

          if (!event.shiftKey) {
            event.preventDefault();
            event.stopPropagation();
            let selector = ".react-datepicker__day";

            if (this.state.showYearPicker) {
              selector = ".react-datepicker__year-text";
            }

            let day = this.portal.querySelector(`${selector}--selected`);

            if (!day) {
              day = this.portal.querySelector(selector);
            }

            day?.focus?.();
          } else {
            this.datepicker.setOpen(false);
          }
        }
        break;
      case "Enter":
        this.datepicker.setOpen(!this.datepicker.isCalendarOpen());
        break;
      case "Escape":
        setTimeout(() => {
          this.datepicker.input?.focus?.();
        }, FOCUS_DELAY);
        break;
      default:
        break;
    }
  }

  closeYearPicker = () => {
    this.setState({ showYearPicker: false });
  }

  closeYearPickerAndOpenCalendar = (date) => {
    this.datepicker.setOpen(false);
    this.setState({ showYearPicker: false }, () => {

      this.datepicker.setPreSelection(date);
      setTimeout(() => {
        this.datepicker.setOpen(true);
        this.datepicker.input?.focus?.();
      }, FOCUS_DELAY);
    });
  }

  openYearPicker = () => {
    this.setState({ showYearPicker: true }, () => {
      const selector = ".react-datepicker__year-text";

      let year = this.portal.querySelector(`${selector}--keyboard-selected`);

      if (!year) {
        year = this.portal.querySelector(`${selector}--selected`);
      }

      if (!year) {
        year = this.portal.querySelector(selector);
      }

      year?.focus?.();
    });
  }

  getMinDate = () => {
    const { minDate } = this.props;

    if (!this.state.showYearPicker) {
      return minDate;
    }

    const parsed = moment(minDate);

    if (parsed.isValid()) {
      /** move one year back for year picker only, to allow selecting the min date year */
      return parsed.subtract(1, "years").toDate();
    }

    return minDate;
  }
}
