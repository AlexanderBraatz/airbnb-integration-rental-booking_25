"use client";

import React from "react";
import { Tables } from "@/database.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BookingRow = Tables<"Bookings">;

interface BookingGuestDetailsReadOnlyProps {
  bookingData: BookingRow;
}

export default function BookingGuestDetailsReadOnly({
  bookingData,
}: BookingGuestDetailsReadOnlyProps) {
  // Single, deterministic formatter: German locale + Berlin timezone
  const germanDateFormatter = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formatDate = (value: string | Date | null | undefined) => {
    if (!value) return "—";

    // Strings from DB like "2025-03-01" or ISO strings
    if (typeof value === "string") {
      // Try to catch YYYY-MM-DD at the start
      const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (isoMatch) {
        const [, year, month, day] = isoMatch;
        // Use UTC so it doesn't shift with local timezone
        const date = new Date(
          Date.UTC(Number(year), Number(month) - 1, Number(day)),
        );
        return germanDateFormatter.format(date); // e.g. 01.03.2025
      }

      const date = new Date(value);
      if (!Number.isNaN(date.getTime())) {
        return germanDateFormatter.format(date);
      }

      // Fallback: just show raw string if parsing fails
      return value;
    }

    // Date object
    return germanDateFormatter.format(value);
  };

  const rows: { key: string; label: string; value?: React.ReactNode }[] = [
    {
      key: "guest_first_name",
      label: "First name",
      value: bookingData.guest_first_name || "—",
    },
    {
      key: "guest_last_name",
      label: "Last name",
      value: bookingData.guest_last_name || "—",
    },
    {
      key: "guest_email",
      label: "Email",
      value: bookingData.guest_email || "—",
    },
    {
      key: "guest_phone_number",
      label: "Phone number",
      value: bookingData.guest_phone_number || "—",
    },
    {
      key: "check_in_date",
      label: "Check-in date",
      value: formatDate(bookingData.check_in_date),
    },
    {
      key: "check_out_date",
      label: "Check-out date",
      value: formatDate(bookingData.check_out_date),
    },
    {
      key: "number_of_guests",
      label: "Number of guests",
      value:
        bookingData.number_of_guests != null
          ? bookingData.number_of_guests
          : "—",
    },
    {
      key: "with_dog",
      label: "With dog",
      value: (
        <Badge variant={bookingData.with_dog ? "default" : "outline"}>
          {bookingData.with_dog ? "Yes" : "No"}
        </Badge>
      ),
    },
  ];

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Booking guest details</CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="space-y-4">
          {rows.map((row) => (
            <div
              key={row.key}
              className="grid grid-cols-[max-content,1fr] items-start gap-x-6 gap-y-1 rounded-md px-2 py-2"
            >
              <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {row.label}
              </dt>
              <dd className="text-foreground text-sm break-words">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
