"use server";
import type { BookingRow } from "@/my-database.types";

import React from "react";

export default async function PriceForm({
  bookingData,
}: {
  bookingData: BookingRow;
}) {
  const { check_in_date, check_out_date } = bookingData;
  /**
   * Calculates number of nights between two YYYY-MM-DD dates
   * Example: 2025-01-01 → 2025-01-08 = 7 nights
   */
  function calculateNights(startDate: string, endDate: string): number {
    const start = new Date(`${startDate}T00:00:00Z`);
    const end = new Date(`${endDate}T00:00:00Z`);

    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
  }

  const numOfNights = calculateNights(check_in_date, check_out_date);

  //form data base
  const { pricePerNightCents, priceForDogCents, priceForCleaningCents } = {
    pricePerNightCents: 10000,
    priceForDogCents: 2500,
    priceForCleaningCents: 4488,
  };

  //state
  const additionalDiscount = true;
  const discountValuePercentage = 50;
  //calculation
  const nighsTotalPriceEuros = financial(
    (numOfNights * pricePerNightCents) / 100,
  );

  let suggestedPriceCents = numOfNights * pricePerNightCents;

  if (bookingData.with_dog) {
    suggestedPriceCents += priceForDogCents;
  }
  suggestedPriceCents += priceForCleaningCents;

  const DiscountedPriceCents =
    (suggestedPriceCents * discountValuePercentage) / 100;

  const priceForCleaningEuros = financial(priceForCleaningCents / 100);
  const priceForDogEuros = financial(priceForDogCents / 100);
  const suggestedPriceEuros = financial(suggestedPriceCents / 100);
  const DiscountedPriceEuros = financial(DiscountedPriceCents / 100);

  console.log(check_in_date, check_out_date, numOfNights);
  //helper
  function financial(x: number): string {
    return Number.parseFloat(x.toString()).toFixed(2);
  }
  return (
    <div className="bg-amber-100">
      <h1>Price:</h1>
      <p>
        Based on your preferences your automatic price suggestion is as follows
      </p>
      <h1>Price Claculation</h1>
      <div className="grid grid-cols-[200px_400px] gap-4">
        <p>{`${numOfNights}x Nights : `}</p>
        <p>{`€${nighsTotalPriceEuros}`}</p>
        {bookingData.with_dog ? (
          <>
            <p>{`Dog fee : `}</p>
            <p>{`€${priceForDogEuros}`}</p>
          </>
        ) : (
          <></>
        )}
        <p>{`Cleaning fee: `}</p>
        <p>{`€${priceForCleaningEuros}`}</p>
        <div className="border-b-1 border-dashed border-black"></div>
        <div className="border-b-1 border-dashed border-black"></div>
        <p>{`Suggested Price: `}</p>
        <p>{`€${suggestedPriceEuros}`}</p>
        {additionalDiscount ? (
          <>
            <p>{`Discount: `}</p>
            <p>{`${discountValuePercentage}%`}</p>
            <div className="border-b-1 border-dashed border-black"></div>
            <div className="border-b-1 border-dashed border-black"></div>
            <p>{`Discounted Price: `}</p>
            <p>{`€${DiscountedPriceEuros}`}</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
