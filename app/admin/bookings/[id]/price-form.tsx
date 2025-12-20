"use server";
import type { BookingRow } from "@/my-database.types";

import React from "react";
import PriceFormClientSide from "./price-form-client-side";
import { financial } from "@/lib/utils";

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

  //calculation
  const nighsTotalPriceEuros = financial(
    (numOfNights * pricePerNightCents) / 100,
  );

  let suggestedPriceCents = numOfNights * pricePerNightCents;

  if (bookingData.with_dog) {
    suggestedPriceCents += priceForDogCents;
  }
  suggestedPriceCents += priceForCleaningCents;

  const priceForCleaningEuros = financial(priceForCleaningCents / 100);
  const priceForDogEuros = financial(priceForDogCents / 100);
  const suggestedPriceEuros = financial(suggestedPriceCents / 100);

  const priceFormClientSideProps = {
    guest_email: bookingData.guest_email,
    numOfNights,
    nighsTotalPriceEuros,
    with_dog: bookingData.with_dog,
    priceForDogEuros,
    priceForCleaningEuros,
    suggestedPriceEuros,
    suggestedPriceCents,
  };

  //   type PriceFormClientSideProps = typeof priceFormClientSideProps;
  console.log("SERVER priceFormClientSideProps:", priceFormClientSideProps);
  console.log("x");
  console.log("x");
  console.log("x");
  return (
    <>
      <PriceFormClientSide
        priceFormClientSideProps={priceFormClientSideProps}
      />
    </>
  );
}
