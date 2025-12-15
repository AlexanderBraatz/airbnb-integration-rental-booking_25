"use server";
import type { BookingRow } from "@/my-database.types";

import React from "react";

export default async function PriceForm({
  bookingData,
}: {
  bookingData?: BookingRow;
}) {
  const nighsTotal = 200;
  console.log(bookingData);
  return (
    <div>
      <h1>Price:</h1>
      <p>
        Based on your preferences your automatic price suggestion is as follows
      </p>
      <div className="grid grid-cols-[200px_400px] gap-4">
        <p>5x Nights at £20 : </p>
        <p>{nighsTotal}</p>
        <p>{bookingData?.price_snapshot_host_accepted_in_EURcents}</p>
      </div>
    </div>
  );
}
