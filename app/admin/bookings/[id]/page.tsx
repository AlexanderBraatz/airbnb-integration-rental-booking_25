import React from "react";
import {
  getBookingFromIdAction,
  getHostConfigAction,
} from "@/app/actions/admindashboardActions";
import BookingHeader from "./booking-header";
import BookingGuestDetails from "./booking-guest-details";
import BookingPriceSummary from "./booking-price-summary";
import BookingActions from "./booking-actions";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await getBookingFromIdAction(Number(id));
  const hostConfigResponse = await getHostConfigAction();

  if (response && response.data) {
    const { check_in_date, check_out_date } = response.data;

    // Calculate nights
    function calculateNights(startDate: string, endDate: string): number {
      const start = new Date(`${startDate}T00:00:00Z`);
      const end = new Date(`${endDate}T00:00:00Z`);
      const MS_PER_DAY = 1000 * 60 * 60 * 24;
      return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
    }

    const numOfNights = calculateNights(check_in_date, check_out_date);

    // Price calculation
    if (
      hostConfigResponse?.error ||
      hostConfigResponse === null ||
      hostConfigResponse.data === null
    ) {
      return (
        <div className="bg-background min-h-screen">
          <div className="container mx-auto max-w-5xl px-4 py-8">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Fehler</AlertTitle>
              <AlertDescription>
                Beim Laden Ihrer Gastgeber-Einstellungen ist ein Fehler
                aufgetreten. Bitte versuchen Sie es später erneut.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      );
    } else {
      const hostBusinessEmail = hostConfigResponse.data.host_business_email;
      const priceForCleaningCents =
        hostConfigResponse.data.price_for_cleaning_cents;
      const priceForDogCents = hostConfigResponse.data.price_for_dog_cents;
      const pricePerNightCents = hostConfigResponse.data.price_per_night_cents;
      const financial = (x: number): string => x.toFixed(2);

      const nighsTotalPriceEuros = financial(
        (numOfNights * pricePerNightCents) / 100,
      );

      let suggestedPriceCents = numOfNights * pricePerNightCents;

      if (response.data.with_dog) {
        suggestedPriceCents += priceForDogCents;
      }
      suggestedPriceCents += priceForCleaningCents;

      const priceForCleaningEuros = financial(priceForCleaningCents / 100);
      const priceForDogEuros = financial(priceForDogCents / 100);
      const suggestedPriceEuros = financial(suggestedPriceCents / 100);

      const priceFormClientSideProps = {
        id: response.data.id,
        guest_email: response.data.guest_email,
        numOfNights,
        nighsTotalPriceEuros,
        with_dog: response.data.with_dog,
        priceForDogEuros,
        priceForCleaningEuros,
        suggestedPriceEuros,
        suggestedPriceCents,
      };

      return (
        <div className="bg-background min-h-screen">
          <div className="container mx-auto max-w-5xl px-4 py-8">
            <BookingHeader bookingData={response.data} />

            <Separator className="my-6" />

            <div className="space-y-6">
              <BookingGuestDetails bookingData={response.data} />

              <BookingPriceSummary
                priceFormClientSideProps={priceFormClientSideProps}
              />

              <BookingActions bookingData={response.data} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Fehler</AlertTitle>
            <AlertDescription>
              Beim Laden der Buchungsdetails ist ein Fehler aufgetreten. Bitte
              versuchen Sie es später erneut.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }
}
