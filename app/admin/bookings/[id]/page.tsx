import React from "react";
import { getBookingFromIdAction } from "@/app/actions/admindashboardActions";
import BookingHeader from "./booking-header";
import BookingGuestDetails from "./booking-guest-details";
import BookingPriceSummary from "./booking-price-summary";
import BookingActions from "./booking-actions";
import PriceForm from "./price-form";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await getBookingFromIdAction(Number(id));

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

    // Price calculation (from database or defaults)
    const { pricePerNightCents, priceForDogCents, priceForCleaningCents } = {
      pricePerNightCents: 10000,
      priceForDogCents: 2500,
      priceForCleaningCents: 4488,
    };

    const financial = (x: number) => {
      return Number.parseFloat(x.toString()).toFixed(2);
    };

    const nighsTotalPriceEuros = financial(
      (numOfNights * pricePerNightCents) / 100
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
      <div className="min-h-screen bg-background">
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            An error occurred while loading the booking details. Please try
            again later.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
