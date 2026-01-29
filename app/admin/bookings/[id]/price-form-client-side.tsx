"use client";
import { z } from "zod";

import { DiscountFormTypes, discountSchema } from "@/app/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { financial } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { acceptPriceAndSendEmailsAction } from "@/app/actions/admindashboardActions";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

type PriceFormClientSideProps = {
  id: number;
  guest_email: string;
  numOfNights: number;
  nighsTotalPriceEuros: string;
  with_dog: boolean;
  priceForDogEuros: string;
  priceForCleaningEuros: string;
  suggestedPriceEuros: string;
  suggestedPriceCents: number;
};
export default function PriceFormClientSide({
  priceFormClientSideProps,
}: {
  priceFormClientSideProps: PriceFormClientSideProps;
}) {
  const {
    id,
    guest_email,
    numOfNights,
    nighsTotalPriceEuros,
    with_dog,
    priceForDogEuros,
    priceForCleaningEuros,
    suggestedPriceEuros,
    suggestedPriceCents,
  } = priceFormClientSideProps;

  const [hasDiscountApplied, setHasDiscountApplied] = useState(false);
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);

  // jsut send price or discounted Price as accepted price ( maybe add has discout flag later)
  //also server action of handleAcceptAndSend()

  //  handleAcceptAndSend(hasDiscountApplied, PriceAsAgreed by host  ) {
  // update databse
  // send emials
  // }
  async function handleAcceptAndSend() {
    //call action
    const { data, error } = await acceptPriceAndSendEmailsAction({
      id,
      hasDiscountApplied,
      DiscountedPriceCents,
      suggestedPriceCents,
    });
    // console.log("has Discount?", hasDiscountApplied);
    // console.log(
    //   "accepted Price",
    //   hasDiscountApplied ? DiscountedPriceCents : suggestedPriceCents,
    // );
    // console.log(data, error);
    if (!error) {
      setSuccessfullySubmitted(true);
      setTimeout(() => redirect("/admin/bookings"), 8000);
    }
  }
  //form stuff

  const form = useForm<z.infer<typeof discountSchema>>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      discountValuePercentageFormValue: 10,
    },
  });
  function onSubmit(values: DiscountFormTypes) {
    console.log(values);
  }
  const DiscountedPriceCents = Math.round(
    (suggestedPriceCents *
      (100 - form.watch("discountValuePercentageFormValue"))) /
      100,
  );
  const discountedPriceEuros = financial(DiscountedPriceCents / 100);

  return (
    <div className="bg-amber-100">
      {!successfullySubmitted ? (
        <>
          <h1>Preis:</h1>
          <p>
            Basierend auf Ihren Einstellungen lautet Ihre automatische
            Preisempfehlung:
          </p>
          <h1>Preisberechnung</h1>
          <div className="grid grid-cols-[200px_400px] gap-4">
            <p>{`${numOfNights} ${numOfNights === 1 ? "Nacht" : "Nächte"}: `}</p>
            <p>{`€${nighsTotalPriceEuros}`}</p>
            {with_dog ? (
              <>
                <p>Hundegebühr: </p>
                <p>{`€${priceForDogEuros}`}</p>
              </>
            ) : (
              <></>
            )}
            <p>Reinigungspauschale: </p>
            <p>{`€${priceForCleaningEuros}`}</p>
            <div className="border-b-1 border-dashed border-black"></div>
            <div className="border-b-1 border-dashed border-black"></div>
            <p>Vorgeschlagener Preis: </p>
            <p>{`€${suggestedPriceEuros}`}</p>
            {hasDiscountApplied ? (
              <>
                <p>Rabatt: </p>
                <p>{`${form.watch("discountValuePercentageFormValue")} %`}</p>
                <div className="border-b-1 border-dashed border-black"></div>
                <div className="border-b-1 border-dashed border-black"></div>
                <p>Rabattierter Preis: </p>
                <p>{`€${discountedPriceEuros}`}</p>
              </>
            ) : (
              <></>
            )}
          </div>
          <Switch
            id="with_discount"
            onCheckedChange={() => setHasDiscountApplied((prev) => !prev)}
            checked={hasDiscountApplied}
          />
          {hasDiscountApplied ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-orange-extra-light mx-auto max-w-3xl space-y-8 py-10"
              >
                <FormField
                  control={form.control}
                  name="discountValuePercentageFormValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prozentualen Rabatt gewähren</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.valueAsNumber
                                ? Math.min(
                                    Math.max(e.target.valueAsNumber, 1),
                                    99,
                                  )
                                : 1,
                            )
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          ) : (
            <></>
          )}
          <p>An {guest_email} wird eine E-Mail gesendet.</p>
          <Button onClick={handleAcceptAndSend}>Annehmen und senden</Button>
        </>
      ) : (
        <>
          <p>
            Sie haben den Preis angenommen und eine E-Mail wurde an den Gast
            gesendet.
          </p>
          <p>
            Sie erhalten eine weitere E-Mail, sobald der Gast die Zahlung
            vornimmt.
          </p>
          <div>
            <Spinner />
            <span>Sie werden zur Verwaltung weitergeleitet …</span>
          </div>
        </>
      )}
    </div>
  );
}
