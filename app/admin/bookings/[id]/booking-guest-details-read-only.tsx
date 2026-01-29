"use client";

import React from "react";
import { Tables } from "@/database.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, Users, Dog, Text } from "lucide-react";

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

  const rows: {
    key: string;
    label: string;
    value?: React.ReactNode;
    icon?: React.ReactNode;
  }[] = [
    {
      key: "guest_first_name",
      label: "Vorname",
      value: bookingData.guest_first_name || "—",
      icon: <User className="h-4 w-4" />,
    },
    {
      key: "guest_last_name",
      label: "Nachname",
      value: bookingData.guest_last_name || "—",
      icon: <User className="h-4 w-4" />,
    },
    {
      key: "guest_email",
      label: "E-Mail",
      value: bookingData.guest_email || "—",
      icon: <Mail className="h-4 w-4" />,
    },
    {
      key: "guest_phone_number",
      label: "Telefonnummer",
      value: bookingData.guest_phone_number || "—",
      icon: <Phone className="h-4 w-4" />,
    },
    {
      key: "check_in_date",
      label: "Anreisedatum",
      value: formatDate(bookingData.check_in_date),
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      key: "check_out_date",
      label: "Abreisedatum",
      value: formatDate(bookingData.check_out_date),
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      key: "number_of_guests",
      label: "Anzahl der Gäste",
      value:
        bookingData.number_of_guests != null
          ? bookingData.number_of_guests
          : "—",
      icon: <Users className="h-4 w-4" />,
    },
    {
      key: "with_dog",
      label: "Mit Hund",
      value: (
        <Badge variant={bookingData.with_dog ? "default" : "outline"}>
          {bookingData.with_dog ? "Ja" : "Nein"}
        </Badge>
      ),
      icon: <Dog className="h-4 w-4" />,
    },
    {
      key: "guest_message",
      label: "Gastnachricht",
      value: bookingData.guest_message || "-",
      icon: <Text className="h-4 w-4" />,
    },
  ];

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Gastdaten</CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.key}
              className="hover:bg-accent/50 flex items-start gap-4 rounded-lg px-3 py-2.5 transition-colors"
            >
              <div className="text-muted-foreground mt-0.5">{row.icon}</div>
              <div className="grid flex-1 grid-cols-[minmax(120px,max-content),1fr] items-start gap-x-6 gap-y-1">
                <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  {row.label}
                </dt>
                <dd className="text-foreground text-sm wrap-break-word">
                  {row.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
