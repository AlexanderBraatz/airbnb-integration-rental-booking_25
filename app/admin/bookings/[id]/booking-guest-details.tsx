"use client";
import React, { useState } from "react";
import BookingGuestDetailsForm from "./booking-guest-details-form";
import BookingGuestDetailsReadOnly from "./booking-guest-details-read-only";
import { Button } from "@/components/ui/button";
import { BookingRow } from "../columns";

export default function BookingGuestDetails({
  bookingData,
}: {
  bookingData: BookingRow;
}) {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {showForm ? (
        <BookingGuestDetailsForm
          setShowForm={setShowForm}
          bookingData={bookingData}
        />
      ) : (
        <>
          <BookingGuestDetailsReadOnly bookingData={bookingData} />
          <Button onClick={() => setShowForm((prev) => !prev)}>
            Edit Booking Details
          </Button>
        </>
      )}
    </>
  );
}
