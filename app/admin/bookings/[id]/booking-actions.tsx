"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";
import { Button } from "@/components/ui/button";
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
      // TODO: Implement decline action
      console.log("Declining booking:", bookingData.id);
      // await declineBookingAction(bookingData.id);
      router.push("/admin/bookings");
    } catch (err) {
      setError("Failed to decline booking. Please try again.");
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
      setError("Failed to delete booking. Please try again.");
    } finally {
      setIsProcessing(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Additional Actions</CardTitle>
        <CardDescription>
          Manage this booking with the following options
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
            <h3 className="text-sm font-semibold">Contact Guest</h3>
            <p className="text-muted-foreground text-sm">
              Get in touch with the guest directly via email
            </p>
          </div>
          <Button variant="outline" className="w-full gap-2" asChild>
            <a href={`mailto:${bookingData.guest_email}`}>
              <Mail className="h-4 w-4" />
              Email {bookingData.guest_email}
            </a>
          </Button>
        </div>

        <Separator />

        {/* Decline Booking Section */}
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">Decline Booking</h3>
            <p className="text-muted-foreground text-sm">
              If you cannot accommodate this booking, you can decline it. The
              guest will be notified via email.
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
              Decline Booking
            </Button>
          ) : (
            <div className="border-destructive bg-destructive/10 space-y-2 rounded-lg border-2 p-4">
              <p className="text-destructive text-sm font-semibold">
                Are you sure you want to decline this booking?
              </p>
              <p className="text-muted-foreground text-xs">
                The guest will receive an email notification. This action can be
                reversed later if needed.
              </p>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeclineConfirm(false)}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeclineConfirm}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? "Declining..." : "Confirm Decline"}
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
              Delete Booking
            </h3>
            <p className="text-muted-foreground text-sm">
              Permanently remove this booking from the system. This action
              cannot be undone.
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
              Delete Booking
            </Button>
          ) : (
            <div className="border-destructive bg-destructive/10 space-y-2 rounded-lg border-2 p-4">
              <p className="text-destructive text-sm font-semibold">
                Delete booking #{bookingData.id} permanently?
              </p>
              <p className="text-muted-foreground text-xs">
                This will permanently delete this booking and all associated
                data. This action cannot be undone.
              </p>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteConfirm}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? "Deleting..." : "Delete Permanently"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
