import React from "react";
import BookingAcceptanceForm from "./bookingAcceptanceForm";
import { getBookingFromIdAction } from "@/app/actions/admindashboardActions";
import MyForm from "./fixedDatePickerField";
import BookingGuestDetailsForm from "./booking-guest-details-form";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await getBookingFromIdAction(Number(params.id));

  if (response && response.data) {
    return (
      <>
        <BookingGuestDetailsForm />
        <BookingAcceptanceForm bookingData={response.data} />
      </>
    );
  }

  return <div>an error has occurred </div>;
}
