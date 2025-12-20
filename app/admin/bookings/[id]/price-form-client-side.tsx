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

type PriceFormClientSideProps = {
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

  // jsut send price or discounted Price as accepted price ( maybe add has discout flag later)
  //also server action of handleAcceptAndSend()

  //  handleAcceptAndSend(hasDiscountApplied, PriceAsAgreed by host  ) {
  // update databse
  // send emials
  // }
  function handleAcceptAndSend() {
    //call action
    console.log("has Discount?", hasDiscountApplied);
    console.log(
      "accepted Price",
      hasDiscountApplied ? DiscountedPriceCents : suggestedPriceCents,
    );
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
      <h1>Price:</h1>
      <p>
        Based on your preferences your automatic price suggestion is as follows
      </p>
      <h1>Price Claculation</h1>
      <div className="grid grid-cols-[200px_400px] gap-4">
        <p>{`${numOfNights}x Nights : `}</p>
        <p>{`€${nighsTotalPriceEuros}`}</p>
        {with_dog ? (
          <>
            <p>{`Dog fee : `}</p>
            <p>{`€${priceForDogEuros}`}</p>
          </>
        ) : (
          <></>
        )}
        <p>{`Cleaning fee: `}</p>
        <p>{`€${priceForCleaningEuros}`}</p>
        <div className="border-b-1 border-dashed border-black"></div>
        <div className="border-b-1 border-dashed border-black"></div>
        <p>{`Suggested Price: `}</p>
        <p>{`€${suggestedPriceEuros}`}</p>
        {hasDiscountApplied ? (
          <>
            <p>{`Discount: `}</p>
            <p>{`${form.watch("discountValuePercentageFormValue")}%`}</p>
            <div className="border-b-1 border-dashed border-black"></div>
            <div className="border-b-1 border-dashed border-black"></div>
            <p>{`Discounted Price: `}</p>
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
                  <FormLabel>Apply a Percentage Disscount </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.valueAsNumber
                            ? Math.min(Math.max(e.target.valueAsNumber, 1), 99)
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
      <p>{`An email will be sent to ${guest_email}`}</p>
      <Button onClick={handleAcceptAndSend}>Accept and send</Button>
    </div>
  );
}
