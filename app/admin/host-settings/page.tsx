import React from "react";
import { getHostConfigAction } from "@/app/actions/admindashboardActions";
import HostConfigForm from "./host-config-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default async function Page() {
  const response = await getHostConfigAction();

  if (response?.error) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Fehler</AlertTitle>
            <AlertDescription>
              Beim Laden der Gastgeber-Einstellungen ist ein Fehler
              aufgetreten. Bitte versuchen Sie es später erneut.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // If no data exists, provide default values for initial setup
  const defaultConfig = {
    id: 1,
    price_per_night_cents: 10000,
    price_for_dog_cents: 2500,
    price_for_cleaning_cents: 4488,
    host_business_email: "",
    created_at: null,
    updated_at: null,
  };

  const configData = response?.data || defaultConfig;

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Gastgeber-Einstellungen</h1>
          <p className="text-muted-foreground mt-2">
            Preise und geschäftliche E-Mail-Adresse verwalten.
          </p>
        </div>
        <HostConfigForm initialData={configData} />
      </div>
    </div>
  );
}
