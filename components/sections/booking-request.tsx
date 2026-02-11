"use client";
import React, { useEffect, useState } from "react";
import SectionHeading from "./componts";
import arrowWhite from "@/public/icons/arrow-white.svg";
import Image from "next/image";
import { TwoPolaroidStackFinal } from "./rooms/components";
import outsideForntDoor from "@/public/images/InUse/Polaroid-outside-fornt-door.png";
import outsideView from "@/public/images/InUse/Polaroid-outside-view.png";
import { useSectionInView } from "@/lib/hooks";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookingRequestFormSchema,
  type BookingRequestFormValues,
  type BookingRequestFormTypes,
} from "@/app/schema";
import { bookingRequestAction } from "@/app/actions/bookingRequestAction";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Tag } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCentsToEuro } from "@/app/admin/host-settings/host-config-form";

const finalDisplay = {
  adornmentWithHouse: false,
  inReverseOrder: true,
  heading: "Schlafzimmer   Zwei",
  paragraph:
    "Das zweite Schlafzimmer – liebevoll „blaues Zimmer“ genannt – ist ebenso großzügig gestaltet und mit einer gemütlichen Leseecke ausgestattet. Auch hier erwartet euch ein komfortables Kingsize-Bett für erholsame Nächte. Vom Zimmer aus gelangt ihr direkt auf den zweiten Balkon und könnt den Blick ins Freie genießen.",
  images: [outsideView, outsideForntDoor],
};

export type BookingRequestPrices = {
  price_per_night_cents: number;
  price_for_dog_cents: number;
  price_for_cleaning_cents: number;
};

type BookingRequestProps = {
  prices: BookingRequestPrices | null;
};

export default function BookingRequest({ prices }: BookingRequestProps) {
  const { ref } = useSectionInView("Anfragen", 0.5);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheckInDatePopoverOpen, setIsCheckInDatePopoverOpen] =
    useState(false);
  const [isCheckOutDatePopoverOpen, setIsCheckOutDatePopoverOpen] =
    useState(false);

  const form = useForm<BookingRequestFormValues>({
    resolver: zodResolver(bookingRequestFormSchema),
    defaultValues: {
      guest_first_name: "",
      guest_last_name: "",
      guest_email: "",
      guest_phone_number: "",
      check_in_date: undefined,
      check_out_date: undefined,
      number_of_guests: "",
      with_dog: "Nein",
      guest_message: "",
      has_agreed_to_policies: false,
    },
  });

  // Watch dates to enable/disable calendar dates dynamically
  const checkInDate = form.watch("check_in_date");
  const checkOutDate = form.watch("check_out_date");

  // difference between check in and check out date

  const pricePerNightCentsFromHostSettings = prices?.price_per_night_cents ?? 0;
  const [nighsTotalPriceEurosOnForntend, setNightsTotalPriceEurosOnForntend] =
    useState(0);
  const [suggestedPriceEurosOnFrontend, setSuggestedPriceEurosOnFrontend] =
    useState(0);
  const priceForDogCentsFromHostSettings = prices?.price_for_dog_cents ?? 0;
  const priceForCleaningCentsFromHostSettings =
    prices?.price_for_cleaning_cents ?? 0;

  const priceForDogEurosFromHostSettings = formatCentsToEuro(
    priceForDogCentsFromHostSettings,
  );
  const priceForCleaningEurosFromHostSettings = formatCentsToEuro(
    priceForCleaningCentsFromHostSettings,
  );
  const [numOfNights, setNumOfNights] = useState(0);
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      setNumOfNights(
        Math.ceil(
          (checkOutDate.getTime() - checkInDate.getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      );
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    if (numOfNights > 0) {
      setNightsTotalPriceEurosOnForntend(
        numOfNights * pricePerNightCentsFromHostSettings,
      );
    }
  }, [numOfNights, pricePerNightCentsFromHostSettings]);
  useEffect(() => {
    setSuggestedPriceEurosOnFrontend(
      nighsTotalPriceEurosOnForntend +
        priceForDogCentsFromHostSettings +
        priceForCleaningCentsFromHostSettings,
    );
  }, [
    nighsTotalPriceEurosOnForntend,
    priceForDogCentsFromHostSettings,
    priceForCleaningCentsFromHostSettings,
  ]);

  const formatDateToISO = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: BookingRequestFormValues) => {
    try {
      const payload: BookingRequestFormTypes = {
        guest_first_name: data.guest_first_name,
        guest_last_name: data.guest_last_name,
        guest_email: data.guest_email,
        guest_phone_number: data.guest_phone_number || "",
        check_in_date: formatDateToISO(data.check_in_date),
        check_out_date: formatDateToISO(data.check_out_date),
        number_of_guests: parseInt(data.number_of_guests),
        with_dog: data.with_dog === "Ja",
        guest_message: data.guest_message || "",
        has_agreed_to_policies: data.has_agreed_to_policies,
      };

      const result = await bookingRequestAction(payload);

      if (result?.error) {
        toast.error(
          "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        );
      } else {
        setIsSubmitted(true);
        toast.success("Buchungsanfrage erfolgreich gesendet!");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      );
    }
  };

  return (
    <section
      ref={ref}
      id="bookingRequest"
      className="bg-q-background font-jost flex scroll-mt-28 flex-col items-center justify-center overflow-x-clip pb-50"
    >
      <SectionHeading
        className="mb-0! [&>p]:hidden"
        heading="Buchungsanfrage"
        paragraph=""
      />

      <div className="bg-q-background tablet:px-10 mobile:px-4 mobile:w-full mx-auto mb-5 flex max-w-[1190px] flex-col gap-5">
        <div className="bg-q-review-card-background tablet:w-[576px] tablet:h-fit mobile:w-full mobile:text-left mobile:px-3 h-20 max-w-[1092px] px-6.5 py-6.5 text-center">
          <p className="text-q-text-dark-darkest mobile:text-base/6 text-xl/7 tracking-wide">
            Wir freuen uns schon auf Ihren Besuch. Wir antworten innerhalb von
            24 Stunden.
          </p>
        </div>
        <div className="flex">
          {isSubmitted ? (
            <div className="bg-q-card-background mobile:w-full tablet:w-full mobile:px-3 mx-auto flex w-[576px] flex-col items-center justify-center px-10 py-20">
              <CheckCircle2 className="mb-6 h-24 w-24 text-green-500" />
              <h2 className="mb-4 text-center text-3xl font-bold">
                Vielen Dank!
              </h2>
              <p className="text-q-text-dark-darkest text-center text-xl">
                Ihre Buchungsanfrage wurde erfolgreich gesendet.
                <br />
                Wir melden uns innerhalb von 24 Stunden bei Ihnen.
              </p>
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-q-card-background mobile:w-full tablet:w-full mobile:px-3 mx-auto grid w-[576px] grid-cols-[repeat(auto-fit,minmax(238px,1fr))] gap-5 px-10 pt-5 pb-10"
            >
              {/* First Name Field */}
              <div className="relative">
                <label className="text-xl/7 font-semibold">
                  Vorname<span className="ml-1">*</span>
                </label>
                <input
                  {...form.register("guest_first_name")}
                  className={`border-q-text-dark-darkest block h-10 w-full border bg-white px-2 ${
                    form.formState.errors.guest_first_name
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {form.formState.errors.guest_first_name && (
                  <p className="absolute mt-1 text-xs text-red-500">
                    {form.formState.errors.guest_first_name.message}
                  </p>
                )}
              </div>

              {/* Nachname Field */}
              <div className="relative">
                <label className="text-xl/7 font-semibold">
                  Nachname<span className="ml-1">*</span>
                </label>
                <input
                  {...form.register("guest_last_name")}
                  className={`border-q-text-dark-darkest block h-10 w-full border bg-white px-2 ${
                    form.formState.errors.guest_last_name
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {form.formState.errors.guest_last_name && (
                  <p className="absolute mt-1 text-xs text-red-500">
                    {form.formState.errors.guest_last_name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="text-xl/7 font-semibold">
                  Email<span className="ml-1">*</span>
                </label>
                <input
                  {...form.register("guest_email")}
                  type="email"
                  className={`border-q-text-dark-darkest block h-10 w-full border bg-white px-2 ${
                    form.formState.errors.guest_email ? "border-red-500" : ""
                  }`}
                />
                {form.formState.errors.guest_email && (
                  <p className="absolute mt-1 text-xs text-red-500">
                    {form.formState.errors.guest_email.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="relative">
                <label className="text-xl/7 font-semibold">Telefon</label>
                <input
                  {...form.register("guest_phone_number")}
                  type="tel"
                  className={`border-q-text-dark-darkest block h-10 w-full border bg-white px-2 ${
                    form.formState.errors.guest_phone_number
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {form.formState.errors.guest_phone_number && (
                  <p className="absolute mt-1 text-xs text-red-500">
                    {form.formState.errors.guest_phone_number.message}
                  </p>
                )}
              </div>

              {/* Check-in Date */}
              <div className="relative">
                <label className="text-xl/7 font-semibold">
                  Anreise<span className="ml-1">*</span>
                </label>
                <Controller
                  control={form.control}
                  name="check_in_date"
                  render={({ field }) => (
                    <Popover
                      open={isCheckInDatePopoverOpen}
                      onOpenChange={setIsCheckInDatePopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={`border-q-text-dark-darkest flex h-10 w-full items-center justify-between border bg-white px-2 text-left ${
                            form.formState.errors.check_in_date
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <span className={field.value ? "" : "text-gray-400"}>
                            {field.value
                              ? field.value.toLocaleDateString("de-DE")
                              : "Datum wählen"}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date);
                              // Clear checkout date if it's now invalid
                              if (checkOutDate) {
                                const checkoutDate = new Date(checkOutDate);
                                checkoutDate.setHours(0, 0, 0, 0);
                                const selectedDate = new Date(date);
                                selectedDate.setHours(0, 0, 0, 0);
                                if (selectedDate >= checkoutDate) {
                                  form.resetField("check_out_date");
                                }
                              }
                              setIsCheckInDatePopoverOpen(false);
                            }
                          }}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const dateToCheck = new Date(date);
                            dateToCheck.setHours(0, 0, 0, 0);

                            // Disable past dates
                            if (dateToCheck < today) return true;

                            // Disable dates on or after checkout date (if checkout is selected)
                            if (checkOutDate) {
                              const checkoutDate = new Date(checkOutDate);
                              checkoutDate.setHours(0, 0, 0, 0);
                              return dateToCheck >= checkoutDate;
                            }

                            return false;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {form.formState.errors.check_in_date && (
                  <p className="absolute mt-1 text-xs text-red-500">
                    {form.formState.errors.check_in_date.message}
                  </p>
                )}
              </div>

              {/* Check-out Date */}
              <div className="relative">
                <label className="text-xl/7 font-semibold">
                  Abreise<span className="ml-1">*</span>
                </label>
                <Controller
                  control={form.control}
                  name="check_out_date"
                  render={({ field }) => (
                    <Popover
                      open={isCheckOutDatePopoverOpen}
                      onOpenChange={setIsCheckOutDatePopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={`border-q-text-dark-darkest flex h-10 w-full items-center justify-between border bg-white px-2 text-left ${
                            form.formState.errors.check_out_date
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <span className={field.value ? "" : "text-gray-400"}>
                            {field.value
                              ? field.value.toLocaleDateString("de-DE")
                              : "Datum wählen"}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date);
                              // Clear checkin date if it's now invalid
                              if (checkInDate) {
                                const checkinDate = new Date(checkInDate);
                                checkinDate.setHours(0, 0, 0, 0);
                                const selectedDate = new Date(date);
                                selectedDate.setHours(0, 0, 0, 0);
                                if (selectedDate <= checkinDate) {
                                  form.resetField("check_in_date");
                                }
                              }
                              setIsCheckOutDatePopoverOpen(false);
                            }
                          }}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const dateToCheck = new Date(date);
                            dateToCheck.setHours(0, 0, 0, 0);

                            // Disable past dates
                            if (dateToCheck < today) return true;

                            // Disable dates on or before checkin date (if checkin is selected)
                            if (checkInDate) {
                              const checkinDate = new Date(checkInDate);
                              checkinDate.setHours(0, 0, 0, 0);
                              return dateToCheck <= checkinDate;
                            }

                            return false;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {form.formState.errors.check_out_date && (
                  <p className="absolute mt-1 text-xs text-red-500">
                    {form.formState.errors.check_out_date.message}
                  </p>
                )}
              </div>

              {/* Number of Guests */}
              <div className="relative">
                <label className="text-xl/7 font-semibold">
                  Gäste<span className="ml-1">*</span>
                </label>
                <Controller
                  control={form.control}
                  name="number_of_guests"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={`border-q-text-dark-darkest h-10 w-full rounded-none border bg-white px-2 ${
                          form.formState.errors.number_of_guests
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <SelectValue placeholder="Anzahl wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Gast" : "Gäste"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.number_of_guests && (
                  <p className="absolute mt-1 text-xs text-red-500">
                    {form.formState.errors.number_of_guests.message}
                  </p>
                )}
              </div>

              {/* Dog Field */}
              <div className="relative">
                <label className="text-xl/7 font-semibold">
                  Hund<span className="ml-1">*</span>
                </label>
                <Controller
                  control={form.control}
                  name="with_dog"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={`border-q-text-dark-darkest h-10 w-full rounded-none border bg-white px-2 ${
                          form.formState.errors.with_dog ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Bitte wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ja">Ja</SelectItem>
                        <SelectItem value="Nein">Nein</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.with_dog && (
                  <p className="absolute mt-1 text-xs text-red-500">
                    {form.formState.errors.with_dog.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="relative col-start-1 -col-end-1">
                <label className="text-xl/7 font-semibold">Nachricht</label>
                <textarea
                  {...form.register("guest_message")}
                  className={`border-q-text-dark-darkest block h-30 w-full resize-none border bg-white px-2 py-2 ${
                    form.formState.errors.guest_message ? "border-red-500" : ""
                  }`}
                  rows={4}
                />
                {form.formState.errors.guest_message && (
                  <p className="absolute mt-1 text-xs text-red-500">
                    {form.formState.errors.guest_message.message}
                  </p>
                )}
              </div>
              {/* Privacy Policy & Terms Checkbox */}
              <div className="relative col-start-1 -col-end-1">
                <div
                  className={`border-q-text-dark-darkest flex items-start gap-3 border bg-white px-3 py-3 ${
                    form.formState.errors.has_agreed_to_policies
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <Controller
                    control={form.control}
                    name="has_agreed_to_policies"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    )}
                  />
                  <label className="flex-1 text-base font-normal">
                    Ich akzeptiere die{" "}
                    <Link
                      href="/rechtliches"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-q-text-dark-darkest underline"
                    >
                      AGB und Datenschutzerklärung
                    </Link>
                    <span className="ml-1">*</span>
                  </label>
                </div>
                {form.formState.errors.has_agreed_to_policies && (
                  <p className="absolute mt-1 text-xs text-red-500">
                    {form.formState.errors.has_agreed_to_policies.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown Table - only shown when prices from host config are available */}
              {prices && (
                <div className="relative col-start-1 -col-end-1">
                  <div className="border-q-text-dark-darkest my-4 border-b"></div>
                  <label className="text-xl/7 font-semibold">
                    Kostenvoranschlag
                  </label>

                  <p className="text-q-text-dark-darkest mt-2 mb-4 text-sm">
                    Bitte beachten Sie: Der Kostenvoranschlag ist unverbindlich.
                    Sie erhalten eine Rückmeldung, ob Ihre Anfrage zeitlich
                    realisierbar ist.
                  </p>

                  <div className="border-q-text-dark-darkest mt-2 block w-full border bg-white">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Leistungsübersicht</TableHead>
                          <TableHead className="text-right">Betrag</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Aufenthalt ({numOfNights}{" "}
                            {numOfNights === 1 ? "Nacht" : "Nächte"})
                          </TableCell>
                          <TableCell className="text-right">
                            €{formatCentsToEuro(nighsTotalPriceEurosOnForntend)}
                          </TableCell>
                        </TableRow>
                        {form.watch("with_dog") && (
                          <TableRow>
                            <TableCell className="font-medium">
                              Hundegebühr
                            </TableCell>
                            <TableCell className="text-right">
                              €{priceForDogEurosFromHostSettings}
                            </TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell className="font-medium">
                            Endreinigung
                          </TableCell>
                          <TableCell className="text-right">
                            €{priceForCleaningEurosFromHostSettings}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell className="font-semibold">
                            Gesamtpreis
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            €{formatCentsToEuro(suggestedPriceEurosOnFrontend)}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="-col-start-2 -col-end-1">
                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-q-button-red active:bg-q-button-red-darker border-q-text-dark-darkest h-[56px] w-full rounded-full border transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-xl/5 font-bold text-white">
                      {form.formState.isSubmitting
                        ? "WIRD GESENDET..."
                        : "ANFRAGEN"}
                    </span>
                    {!form.formState.isSubmitting && (
                      <Image src={arrowWhite} alt="arrow" />
                    )}
                  </div>
                </button>
              </div>
            </form>
          )}
          <div className="tablet:hidden w-[505px]">
            <TwoPolaroidStackFinal room={finalDisplay} />
          </div>
        </div>
      </div>
    </section>
  );
}
