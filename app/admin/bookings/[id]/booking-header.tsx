"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Printer, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";

type BookingRow = Tables<"Bookings">;

interface BookingHeaderProps {
  bookingData: BookingRow;
}

export default function BookingHeader({ bookingData }: BookingHeaderProps) {
  const router = useRouter();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "accepted":
        return "default";
      case "declined":
        return "destructive";
      case "pending":
        return "secondary";
      case "paid":
        return "default";
      default:
        return "outline";
    }
  };

  const germanDateFormatter = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formatDateTime = (value: string | Date | null | undefined) => {
    if (!value) return "—";
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return germanDateFormatter.format(date);
    }
    return "—";
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/admin/bookings")}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Zurück zur Buchungsübersicht
        </Button>
      </div>

      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              Buchung #{bookingData.id}
            </h1>
            <Badge
              variant={getStatusVariant(bookingData.status)}
              className="text-xs"
            >
              {(
                {
                  pending: "Ausstehend",
                  accepted: "Angenommen",
                  declined: "Abgelehnt",
                  paid: "Bezahlt",
                } as Record<string, string>
              )[bookingData.status] ?? bookingData.status}
            </Badge>
          </div>
          <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {bookingData.created_at && (
              <span>Erstellt: {formatDateTime(bookingData.created_at)}</span>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Printer className="h-4 w-4" />
            Drucken
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
