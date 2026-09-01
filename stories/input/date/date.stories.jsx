import React from "react";
import uncontrollable from "@digital-science/figshare-fcl/helpers/uncontrollable";
import DatePickerComponent from "@digital-science/figshare-fcl/input/date/index";
import InputComponent from "@digital-science/figshare-fcl/input/index";

import { Cover } from "../../story-utils/Cover";


const DatePicker = uncontrollable(
  DatePickerComponent,
  { selectedDate: ["onChange", (_, date) => date] }
);

const Input = uncontrollable(
  InputComponent,
  { selectedDate: ["onChange", (_, date) => date] }
);

const canvasStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "16px",
};

export default {
  title: "UI/Inputs/Date",
  component: DatePicker,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <DatePicker selectedDate={new Date()} onChange={() => undefined} />
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={canvasStyle}>
        <p>Basic, with selected date</p>
        <DatePicker selectedDate={new Date()} />
        <p>Min and max date range</p>
        <DatePicker minDate={new Date("May 1, 2000 03:24:00")} maxDate={new Date("December 1, 2030 00:20:00")} />
        <p>Disabled</p>
        <DatePicker disabled={true} selectedDate={new Date()} />
        <p>Error</p>
        <DatePicker error={true} selectedDate={new Date()} />
        <p>Input</p>
        <Input type="date" />
        <p>Custom placeholder</p>
        <DatePicker placeholder="Select Date" />
      </div>
    </Cover>
  ),
};
