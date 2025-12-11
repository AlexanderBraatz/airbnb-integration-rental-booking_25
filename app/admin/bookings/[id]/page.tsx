import React from "react";
import BookingAcceptanceForm from "./bookingAcceptanceForm";
import { getBookingFromIdAction } from "@/app/actions/admindashboardActions";
import MyForm from "./fixedDatePickerField";
import BookingGuestDetails from "./booking-guest-details";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await getBookingFromIdAction(Number(params.id));

  if (response && response.data) {
    return (
      <>
        <BookingGuestDetails bookingData={response.data} />
        <BookingAcceptanceForm bookingData={response.data} />
      </>
    );
  }

  return <div>an error has occurred </div>;
}
