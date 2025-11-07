import React from "react";
import { Calendar02 } from "./two-month-calendar";

//contextProvider
// onclick open popover
// ...input start
// ...input end
// Popover
// ...header flex row
// ......Select Dats / 5 days selected
// ......add your traval dates for exact pricing / Maximum stay :2 nights / StartDate short month - end date short month
// ...input fileds
// ......start
// ......end
// claander02
// buttons
// ...clear dates gohst button
// ...clse
// https://www.youtube.com/watch?v=cY5RMVj2GtU
//https://www.youtube.com/watch?v=bKm1rNaCFOo

export default function AirbnbStyleDateRangePicker() {
  return (
    <div>
      <Calendar02 />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="4" y="14" width="16" height="4" rx="1" />

        <path d="M6 14v-4" />
        <path d="M10 14v-4" />
        <path d="M14 14v-4" />
        <path d="M18 14v-4" />

        <path d="M3 18h18" />

        <rect x="8" y="4" width="8" height="6" rx="1" />
      </svg>
    </div>
  );
}
