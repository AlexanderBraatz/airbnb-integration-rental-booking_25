"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

export function Calendar02() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined,
  );

  return (
    <Calendar
      mode="range"
      defaultMonth={new Date()}
      numberOfMonths={2}
      selected={dateRange}
      onSelect={setDateRange}
      className="rounded-lg border shadow-sm"
    />
  );
}
