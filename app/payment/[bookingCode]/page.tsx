import React from "react";
import Checkout from "../components/checkout";
import { getBookingFromIdAction } from "../../actions/admindashboardActions";
import { bookingCodeConvertedBackToId } from "@/lib/utils";

export default async function Payment({
  params,
}: {
  params: { bookingCode: string };
}) {
  const { bookingCode } = await params;

  const orderId = bookingCodeConvertedBackToId(bookingCode);

  console.log(bookingCode, "back");
  if (bookingCode) {
    return (
      <div>
        <h1>try the payment </h1>
        <Checkout orderId={Number(orderId)} />
      </div>
    );
  } else {
    return <div>an error has occurred</div>;
  }
}
