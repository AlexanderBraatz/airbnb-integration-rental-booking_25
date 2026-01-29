"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";
import { Button } from "@/components/ui/button";
import { declineBookingAction } from "@/app/actions/admindashboardActions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Trash2, XCircle, AlertTriangle } from "lucide-react";

type BookingRow = Tables<"Bookings">;

interface BookingActionsProps {
  bookingData: BookingRow;
}

export default function BookingActions({ bookingData }: BookingActionsProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeclineClick = () => {
    setShowDeclineConfirm(true);
  };

  const handleDeclineConfirm = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const result = await declineBookingAction(bookingData.id);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/admin/bookings");
      }
    } catch (err) {
      setError("Buchung konnte nicht abgelehnt werden. Bitte versuchen Sie es erneut.");
    } finally {
      setIsProcessing(false);
      setShowDeclineConfirm(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      // TODO: Implement delete action
      console.log("Deleting booking:", bookingData.id);
      // await deleteBookingAction(bookingData.id);
      router.push("/admin/bookings");
    } catch (err) {
      setError("Buchung konnte nicht gelöscht werden. Bitte versuchen Sie es erneut.");
    } finally {
      setIsProcessing(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Weitere Aktionen</CardTitle>
        <CardDescription>
          Diese Buchung mit den folgenden Optionen verwalten
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Contact Guest Section */}
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">Gast kontaktieren</h3>
            <p className="text-muted-foreground text-sm">
              Kontaktieren Sie den Gast direkt per E-Mail
            </p>
          </div>
          <Button variant="outline" className="w-full gap-2" asChild>
            <a href={`mailto:${bookingData.guest_email}`}>
              <Mail className="h-4 w-4" />
              E-Mail an {bookingData.guest_email}
            </a>
          </Button>
        </div>

        <Separator />

        {/* Decline Booking Section */}
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">Buchung ablehnen</h3>
            <p className="text-muted-foreground text-sm">
              Wenn Sie diese Buchung nicht annehmen können, können Sie sie
              ablehnen. Der Gast erhält eine E-Mail-Benachrichtigung.
            </p>
          </div>

          {!showDeclineConfirm ? (
            <Button
              variant="destructive"
              className="w-full gap-2"
              onClick={handleDeclineClick}
              disabled={isProcessing}
            >
              <XCircle className="h-4 w-4" />
              Buchung ablehnen
            </Button>
          ) : (
            <div className="border-destructive bg-destructive/10 space-y-2 rounded-lg border-2 p-4">
              <p className="text-destructive text-sm font-semibold">
                Möchten Sie diese Buchung wirklich ablehnen?
              </p>
              <p className="text-muted-foreground text-xs">
                Der Gast erhält eine E-Mail-Benachrichtigung. Diese Aktion kann
                bei Bedarf später rückgängig gemacht werden.
              </p>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeclineConfirm(false)}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  Abbrechen
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeclineConfirm}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? "Wird abgelehnt …" : "Ablehnung bestätigen"}
                </Button>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Delete Booking Section */}
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-destructive text-sm font-semibold">
              Buchung löschen
            </h3>
            <p className="text-muted-foreground text-sm">
              Diese Buchung dauerhaft aus dem System entfernen. Diese Aktion
              kann nicht rückgängig gemacht werden.
            </p>
          </div>

          {!showDeleteConfirm ? (
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground w-full gap-2"
              onClick={handleDeleteClick}
              disabled={isProcessing}
            >
              <Trash2 className="h-4 w-4" />
              Buchung löschen
            </Button>
          ) : (
            <div className="border-destructive bg-destructive/10 space-y-2 rounded-lg border-2 p-4">
              <p className="text-destructive text-sm font-semibold">
                Buchung #{bookingData.id} dauerhaft löschen?
              </p>
              <p className="text-muted-foreground text-xs">
                Diese Buchung und alle zugehörigen Daten werden dauerhaft
                gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.
              </p>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  Abbrechen
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteConfirm}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? "Wird gelöscht …" : "Dauerhaft löschen"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
