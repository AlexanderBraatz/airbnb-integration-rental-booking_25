import { redirect } from "next/navigation";
import Image from "next/image";

import { stripe } from "@/lib/stripe";
import { getBookingFromIdAction, getHostConfigAction } from "@/app/actions/admindashboardActions";
import { formatDate } from "@/lib/email-utils";
import { maskIdAsBookingCode } from "@/lib/utils";
import Footer from "@/components/sections/footer";
import logo from "@/public/icons/logo-fff.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReturnPagePolaroid } from "./return-page-polaroid";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Return({ searchParams }: PageProps) {
  const params = await searchParams;
  const session_id =
    typeof params.session_id === "string"
      ? params.session_id
      : Array.isArray(params.session_id)
        ? params.session_id[0]
        : undefined;

  if (!session_id) {
    throw new Error("Bitte geben Sie eine gültige session_id an (cs_test_....)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const status = session.status;
  const customerEmail = session.customer_details?.email ?? "";
  const orderId = session.client_reference_id
    ? Number(session.client_reference_id)
    : null;

  if (status === "open") {
    return redirect("/payment-uncompleted");
  }

  const hostConfigResponse = await getHostConfigAction();
  const hostEmail = hostConfigResponse?.data?.host_business_email ?? "";

  let bookingData: Awaited<ReturnType<typeof getBookingFromIdAction>>["data"] =
    null;
  if (orderId != null) {
    const bookingResponse = await getBookingFromIdAction(orderId);
    bookingData = bookingResponse?.data;
  }

  const bookingCode = orderId != null ? maskIdAsBookingCode(orderId) : null;
  const checkInDate =
    bookingData?.check_in_date != null
      ? formatDate(bookingData.check_in_date)
      : null;
  const checkOutDate =
    bookingData?.check_out_date != null
      ? formatDate(bookingData.check_out_date)
      : null;
  const guestFirstName = bookingData?.guest_first_name ?? "";

  if (status === "complete") {
    return (
      <>
        <div className="bg-q-background tablet:pb-10 tablet:px-4 tablet:py-4 min-h-screen px-6 py-6 pb-40">
          <div className="mx-auto flex max-w-[1190px] flex-col gap-5">
            {/* Desktop: row (polaroid next to card). Tablet and below: column, polaroid hidden via ReturnPagePolaroid */}
            <div className="flex flex-row tablet:flex-col tablet:items-stretch gap-0">
              {/* Left: payment-style card. Desktop: fixed width so polaroid fits next to it; tablet: full width */}
              <div className="w-[576px] shrink-0 tablet:w-full">
                {/* Header with logo */}
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

                {/* Main content */}
                <div className="bg-white tablet:px-6 tablet:py-6 px-10 py-10">
                  <div className="tablet:mb-5 mb-6">
                    <h1 className="font-reem-kufi text-q-text-dark-700 tablet:text-[24px] mb-3 text-[28px] font-bold leading-tight">
                      {guestFirstName
                        ? `Vielen Dank, ${guestFirstName}!`
                        : "Vielen Dank!"}
                    </h1>
                    <p className="font-jost text-q-text-dark-700 tablet:text-sm text-base leading-[1.6]">
                      Ihre Zahlung war erfolgreich. Ihre Buchung ist jetzt
                      bestätigt – wir freuen uns schon auf Ihren Aufenthalt bei
                      Sieben Gipfel Blick!
                    </p>
                  </div>

                  <Card className="border-q-blue mb-6 border-2 shadow-none">
                    <CardHeader className="pb-2">
                      <h2 className="font-reem-kufi text-q-text-dark-700 tablet:text-lg text-[20px] font-bold">
                        Was passiert als Nächstes?
                      </h2>
                    </CardHeader>
                    <CardContent className="font-jost text-q-text-dark-700 tablet:text-sm text-base leading-[1.6] space-y-3">
                      <p>
                        An <strong>{customerEmail}</strong> senden wir in
                        Kürze eine Bestätigungs-E-Mail mit allen Details zu
                        Ihrer Buchung. Bitte prüfen Sie auch Ihren Spam-Ordner.
                      </p>
                      <p>
                        Darin finden Sie Ihren Buchungscode, die Check-in- und
                        Check-out-Zeiten sowie alle wichtigen Informationen für
                        eine entspannte Anreise. Bei Fragen stehen wir Ihnen
                        jederzeit gerne zur Verfügung.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Booking overview – like payment page / emails */}
                  <div className="border-q-blue tablet:mb-5 tablet:p-5 mb-6 rounded-lg border-2 p-6">
                    <h3 className="font-reem-kufi text-q-text-dark-700 tablet:text-lg mb-4 text-[20px] font-bold">
                      Ihre Buchungsübersicht
                    </h3>
                    <table className="w-full border-collapse">
                      <tbody>
                        {bookingCode && (
                          <tr>
                            <td
                              className="font-jost text-[#554f51] py-2 text-sm"
                              style={{ width: "40%" }}
                            >
                              <strong>Buchungscode:</strong>
                            </td>
                            <td className="font-jost text-q-blue py-2 text-sm font-bold">
                              {bookingCode}
                            </td>
                          </tr>
                        )}
                        {checkInDate && (
                          <tr>
                            <td className="font-jost text-[#554f51] py-2 text-sm">
                              <strong>Check-in:</strong>
                            </td>
                            <td className="font-jost text-q-text-dark-700 py-2 text-sm">
                              {checkInDate}
                            </td>
                          </tr>
                        )}
                        {checkOutDate && (
                          <tr>
                            <td className="font-jost text-[#554f51] py-2 text-sm">
                              <strong>Check-out:</strong>
                            </td>
                            <td className="font-jost text-q-text-dark-700 py-2 text-sm">
                              {checkOutDate}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <p className="font-jost text-q-text-dark-700 tablet:text-sm mb-6 text-base leading-[1.6]">
                    Bis bald am Sieben Gipfel Blick – wir wünschen Ihnen schon
                    jetzt eine wunderbare Zeit in den Bergen und freuen uns auf
                    Ihren Besuch!
                  </p>

                  {hostEmail && (
                    <p className="font-jost text-[#554f51] tablet:mb-5 tablet:text-xs my-6 text-sm leading-[1.6]">
                      Bei Fragen oder Wünschen erreichen Sie uns unter{" "}
                      <a
                        href={`mailto:${hostEmail}`}
                        className="text-q-blue underline hover:text-[#5a6a95]"
                      >
                        {hostEmail}
                      </a>
                      .
                    </p>
                  )}

                  <p className="font-jost text-q-text-dark-700 tablet:mt-5 tablet:text-sm mt-6 text-base leading-[1.6]">
                    Mit herzlichen Grüßen
                    <br />
                    <strong>Das Team von Sieben Gipfel Blick</strong>
                  </p>
                </div>

                {/* Footer */}
                <div className="bg-q-card-background tablet:px-5 tablet:py-6 rounded-b-lg px-8 py-8 text-center">
                  <p className="font-jost text-q-text-dark-700 mb-2 text-sm font-bold">
                    <strong>Sieben Gipfel Blick</strong>
                  </p>
                  {hostEmail && (
                    <p className="font-jost text-q-text-dark-700 tablet:text-xs mb-1 text-sm">
                      E-Mail:{" "}
                      <a
                        href={`mailto:${hostEmail}`}
                        className="text-q-blue underline hover:text-[#5a6a95]"
                      >
                        {hostEmail}
                      </a>
                    </p>
                  )}
                  <p className="font-jost mt-4 text-xs text-[#554f51]">
                    © {new Date().getFullYear()} Sieben Gipfel Blick. Alle
                    Rechte vorbehalten.
                  </p>
                </div>
              </div>

              {/* Right: polaroid – hidden on tablet/mobile */}
              <ReturnPagePolaroid />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return null;
}
