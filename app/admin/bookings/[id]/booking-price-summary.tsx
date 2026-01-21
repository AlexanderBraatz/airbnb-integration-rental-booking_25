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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { financial } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { acceptPriceAndSendEmailsAction } from "@/app/actions/admindashboardActions";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Calculator, Tag, Mail, CheckCircle2 } from "lucide-react";

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

export default function BookingPriceSummary({
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
      100
  );
  const discountedPriceEuros = financial(DiscountedPriceCents / 100);

  async function handleAcceptAndSend() {
    const { data, error } = await acceptPriceAndSendEmailsAction({
      id,
      hasDiscountApplied,
      DiscountedPriceCents,
      suggestedPriceCents,
    });

    if (!error) {
      setSuccessfullySubmitted(true);
      setTimeout(() => redirect("/admin/bookings"), 8000);
    }
  }

  if (successfullySubmitted) {
    return (
      <Card className="w-full border shadow-sm">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Booking Accepted!</h3>
            <p className="text-sm text-muted-foreground">
              You have successfully accepted the price and an email was sent to
              the guest.
            </p>
            <p className="text-sm text-muted-foreground">
              You will receive another email as soon as the guest makes the
              payment.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner />
            <span>Redirecting to the admin page...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-xl">Price Calculation</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Based on your preferences, the automatic price suggestion is
          calculated below.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Breakdown Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                {numOfNights} Night{numOfNights !== 1 ? "s" : ""}
              </TableCell>
              <TableCell className="text-right">€{nighsTotalPriceEuros}</TableCell>
            </TableRow>
            {with_dog && (
              <TableRow>
                <TableCell className="font-medium">Dog Fee</TableCell>
                <TableCell className="text-right">€{priceForDogEuros}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell className="font-medium">Cleaning Fee</TableCell>
              <TableCell className="text-right">€{priceForCleaningEuros}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-semibold">Suggested Price</TableCell>
              <TableCell className="text-right font-semibold">
                €{suggestedPriceEuros}
              </TableCell>
            </TableRow>
            {hasDiscountApplied && (
              <>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Discount ({form.watch("discountValuePercentageFormValue")}%)
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    -€
                    {financial(
                      (suggestedPriceCents - DiscountedPriceCents) / 100
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent/50">
                  <TableCell className="font-bold">Final Price</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default" className="text-base px-3 py-1">
                      €{discountedPriceEuros}
                    </Badge>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableFooter>
        </Table>

        {/* Discount Toggle */}
        <div className="flex items-center justify-between rounded-lg border bg-card p-4">
          <div className="space-y-0.5">
            <label
              htmlFor="with_discount"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apply Discount
            </label>
            <p className="text-xs text-muted-foreground">
              Offer a percentage discount to the guest
            </p>
          </div>
          <Switch
            id="with_discount"
            onCheckedChange={() => setHasDiscountApplied((prev) => !prev)}
            checked={hasDiscountApplied}
          />
        </div>

        {/* Discount Form */}
        {hasDiscountApplied && (
          <div className="rounded-lg border bg-accent/20 p-4 space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="discountValuePercentageFormValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Percentage</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="0"
                            type="number"
                            className="max-w-[120px]"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.valueAsNumber
                                  ? Math.min(
                                      Math.max(e.target.valueAsNumber, 1),
                                      99
                                    )
                                  : 1
                              )
                            }
                          />
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        )}

        {/* Email Notification Alert */}
        <Alert>
          <Mail className="h-4 w-4" />
          <AlertDescription>
            An email will be sent to <strong>{guest_email}</strong> with the
            booking confirmation and payment instructions.
          </AlertDescription>
        </Alert>

        {/* Accept Button */}
        <Button
          onClick={handleAcceptAndSend}
          className="w-full"
          size="lg"
        >
          <CheckCircle2 className="mr-2 h-5 w-5" />
          Accept Price and Send Email
        </Button>
      </CardContent>
    </Card>
  );
}
