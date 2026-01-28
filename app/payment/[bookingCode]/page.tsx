import React from "react";
import Checkout from "../components/checkout";
import { getBookingFromIdAction } from "../../actions/admindashboardActions";
import { bookingCodeConvertedBackToId } from "@/lib/utils";
import Footer from "@/components/sections/footer";

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
      <>
        <div className="bg-q-blue text-q-wite-almost min-h-screen">
          <main className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="mb-6 text-2xl font-semibold">Zahlung abschließen</h1>
            <Checkout orderId={Number(orderId)} />
          </main>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <div className="bg-q-blue text-q-wite-almost min-h-screen">
          <main className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="mb-4 text-xl font-semibold">
              Es ist ein Fehler aufgetreten
            </h1>
            <p>Die Zahlungsseite konnte nicht geladen werden.</p>
          </main>
        </div>
        <Footer />
      </>
    );
  }
}
