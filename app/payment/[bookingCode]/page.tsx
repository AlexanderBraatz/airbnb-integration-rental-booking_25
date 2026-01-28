import React from "react";
import Image from "next/image";
import Checkout from "../components/checkout";
import {
  getBookingFromIdAction,
  getHostConfigAction,
} from "../../actions/admindashboardActions";
import { bookingCodeConvertedBackToId } from "@/lib/utils";
import { formatDate } from "@/lib/email-utils";
import Footer from "@/components/sections/footer";
import logo from "@/public/icons/logo-fff.svg";

export default async function Payment({
  params,
}: {
  params: { bookingCode: string };
}) {
  const { bookingCode } = await params;

  const orderId = bookingCodeConvertedBackToId(bookingCode);

  // Fetch booking data to get check-in and check-out dates
  const bookingResponse = await getBookingFromIdAction(Number(orderId));
  const bookingData = bookingResponse?.data;

  // Fetch host config to get contact email
  const hostConfigResponse = await getHostConfigAction();
  const hostEmail = hostConfigResponse?.data?.host_business_email;

  console.log(bookingCode, "back");
  if (bookingCode && bookingData) {
    const checkInDate = bookingData.check_in_date
      ? formatDate(bookingData.check_in_date)
      : null;
    const checkOutDate = bookingData.check_out_date
      ? formatDate(bookingData.check_out_date)
      : null;
    const guestFirstName = bookingData.guest_first_name || "";

    return (
      <>
        {/* Outer container with email-style background */}
        <div className="bg-q-background tablet:py-4 tablet:px-4 min-h-screen px-6 py-6">
          <div className="tablet:max-w-[600px] mx-auto max-w-4xl">
            {/* Header with logo - email style */}
            <div className="bg-q-blue tablet:px-5 tablet:py-7 rounded-t-lg px-8 py-8 text-center">
              <div className="mx-auto inline-block max-w-[200px]">
                <Image
                  src={logo}
                  alt="Sieben Gipfel Blick Logo"
                  width={203}
                  height={62}
                  className="h-auto w-full max-w-[203px]"
                />
              </div>
            </div>

            {/* Main content - white background */}
            <div className="tablet:px-6 tablet:py-6 bg-white px-10 py-10">
              {/* Greeting and main heading */}
              <div className="tablet:mb-5 mb-6">
                <h1
                  className="text-q-text-dark-700 tablet:text-[24px] mb-3 text-[28px] leading-tight font-bold"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {guestFirstName
                    ? `Guten Tag ${guestFirstName}!`
                    : "Guten Tag!"}
                </h1>

                <p
                  className="text-q-text-dark-700 tablet:text-sm text-base leading-[1.6]"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Um Ihre Buchung abzuschließen, bitten wir Sie, den
                  Gesamtbetrag zu begleichen. Die Zahlung erfolgt sicher über
                  unseren Partner Stripe.
                </p>
              </div>

              {/* Stripe checkout in styled container */}
              <div className="border-q-blue tablet:p-4 rounded-lg border-2 bg-white p-6">
                <Checkout orderId={Number(orderId)} bookingCode={bookingCode} />
              </div>

              {/* Contact information in main content */}
              {hostEmail && (
                <p
                  className="tablet:mb-5 tablet:text-xs my-6 text-sm leading-[1.6] text-[#554f51]"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Falls Sie Fragen haben oder Unterstützung benötigen, können
                  Sie uns gerne unter{" "}
                  <a
                    href={`mailto:${hostEmail}`}
                    className="text-q-blue underline hover:text-[#5a6a95]"
                  >
                    {hostEmail}
                  </a>{" "}
                  kontaktieren.
                </p>
              )}

              {/* Booking information box - email style */}
              <div className="border-q-blue tablet:mb-5 tablet:p-5 mb-6 rounded-lg border-2 p-6">
                <h3
                  className="text-q-text-dark-700 tablet:text-lg mb-4 text-[20px] font-bold"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Buchungsübersicht
                </h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <td
                        className="py-2 text-sm text-[#554f51]"
                        style={{ width: "40%" }}
                      >
                        <strong>Buchungscode:</strong>
                      </td>
                      <td
                        className="text-q-blue py-2 text-sm font-bold"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        {bookingCode}
                      </td>
                    </tr>
                    {checkInDate && (
                      <tr>
                        <td
                          className="py-2 text-sm text-[#554f51]"
                          style={{ fontFamily: "Arial, sans-serif" }}
                        >
                          <strong>Check-in:</strong>
                        </td>
                        <td
                          className="text-q-text-dark-700 py-2 text-sm"
                          style={{ fontFamily: "Arial, sans-serif" }}
                        >
                          {checkInDate}
                        </td>
                      </tr>
                    )}
                    {checkOutDate && (
                      <tr>
                        <td
                          className="py-2 text-sm text-[#554f51]"
                          style={{ fontFamily: "Arial, sans-serif" }}
                        >
                          <strong>Check-out:</strong>
                        </td>
                        <td
                          className="text-q-text-dark-700 py-2 text-sm"
                          style={{ fontFamily: "Arial, sans-serif" }}
                        >
                          {checkOutDate}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Friendly closing message */}
              <p
                className="text-q-text-dark-700 tablet:mt-5 tablet:text-sm mt-6 text-base leading-[1.6]"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Wir freuen uns auf Ihren Besuch!
                <br />
                <strong>Das Team von Sieben Gipfel Blick</strong>
              </p>
            </div>

            {/* Email-style footer */}
            <div className="bg-q-card-background tablet:px-5 tablet:py-6 rounded-b-lg px-8 py-8 text-center">
              <p
                className="text-q-text-dark-700 mb-2 text-sm font-bold"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                <strong>Sieben Gipfel Blick</strong>
              </p>
              {hostEmail && (
                <p
                  className="text-q-text-dark-700 tablet:text-xs mb-1 text-sm"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Email:{" "}
                  <a
                    href={`mailto:${hostEmail}`}
                    className="text-q-blue underline hover:text-[#5a6a95]"
                  >
                    {hostEmail}
                  </a>
                </p>
              )}
              <p
                className="mt-4 text-xs text-[#554f51]"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                © {new Date().getFullYear()} Sieben Gipfel Blick. Alle Rechte
                vorbehalten.
              </p>
            </div>
          </div>
        </div>

        {/* Existing footer */}
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
