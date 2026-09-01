
import moment from "moment";

import { validateDateFormat, getInputType, getYearsPeriod } from "./utils";


const PROP_NAME = "dateFormat";


describe("datepickers utils", () => {
  it("validates date formats", () => {
    const props = {};
    let result = validateDateFormat(props, PROP_NAME);
    expect(result).toEqual(null);

    props.dateFormat = "AnInvalidDateFormat";
    result = validateDateFormat(props, PROP_NAME);
    expect(result).not.toEqual(null);

    props.dateFormat = "dd.MM.yyyy";
    result = validateDateFormat(props, PROP_NAME);
    expect(result).toEqual(null);
  });

  it("gets date part based on format", () => {
    expect(getInputType()).toEqual(undefined);

    expect(getInputType("d")).toEqual("day");
    expect(getInputType("dd")).toEqual("day");
    expect(getInputType("ddd")).toEqual(undefined);

    expect(getInputType("M")).toEqual("month");
    expect(getInputType("MM")).toEqual("month");
    expect(getInputType("MMM")).toEqual("month");
    expect(getInputType("MMMM")).toEqual("month");
    expect(getInputType("MMMMM")).toEqual(undefined);

    expect(getInputType("y")).toEqual("year");
    expect(getInputType("yy")).toEqual("year");
    expect(getInputType("yyyy")).toEqual("year");
    expect(getInputType("yyy")).toEqual(undefined);
    expect(getInputType("yyyyy")).toEqual(undefined);

    expect(getInputType()).toEqual(undefined);
    expect(getInputType("anything else than the supported formats")).toEqual(undefined);
  });

  it("gets a year period based on the number of years to show and a date", () => {
    expect(getYearsPeriod(moment("2022/01/01").toDate(), 12)).toEqual({ "endPeriod": 2028, "startPeriod": 2017 });
    expect(getYearsPeriod(moment("1991/01/01").toDate(), 9)).toEqual({ "endPeriod": 1998, "startPeriod": 1990 });
  });
});
