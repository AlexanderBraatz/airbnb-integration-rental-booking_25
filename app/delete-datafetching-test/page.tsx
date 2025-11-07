"use server";
import { getAllPricingData } from "@/lib/utils";
import React from "react";
import { Calendar22 } from "./date-picker-field";
import { Calendar02 } from "./two-month-calendar";
import AirbnbStyleDateRangePicker from "./airbnb-style-date-range-picker";

export default async function page() {
  //   const data = ["one", "twoe"];
  const data = await getAllPricingData();
  if (!data) return <div>now data fetched</div>;
  return (
    <div>
      <div>delete-datafetching-test</div>
      {/* <Calendar22 /> */}
      {/* <Calendar02 /> */}
      <AirbnbStyleDateRangePicker />
      {data.map((row, i) => (
        <li key={i}>
          <span>{row.day}</span>
          <span>{row.price_in_eur_cents}</span>
          <span>{row.is_available ? "avaliable" : "nope"}</span>
        </li>
      ))}
    </div>
  );
}
