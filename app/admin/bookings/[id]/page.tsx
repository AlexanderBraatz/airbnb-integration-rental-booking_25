import React from "react";
import BookingAcceptanceForm from "./bookingAcceptanceForm";
import { getBookingFromIdAction } from "@/app/actions/admindashboardActions";
import BookingGuestDetails from "./booking-guest-details";
import PriceForm from "./price-form";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await getBookingFromIdAction(Number(id));

  if (response && response.data) {
    return (
      <>
        <BookingGuestDetails bookingData={response.data} />
        <PriceForm bookingData={response.data} />
        <BookingAcceptanceForm bookingData={response.data} />
      </>
    );
  }

  return <div>an error has occurred </div>;
}
