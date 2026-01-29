"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type SignupState } from "../actions";
import { AuthCardLayout } from "../auth-card-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail } from "lucide-react";

export default function SignupPage() {
  const [state, formAction] = useActionState<SignupState, FormData>(signup, {});

  if (state?.success) {
    return (
      <AuthCardLayout title="Registrierung">
        <Alert className="border-q-blue bg-q-card-background">
          <Mail className="h-4 w-4 text-q-blue" />
          <AlertDescription className="font-jost text-q-text-dark-700">
            Bitte prüfen Sie Ihren E-Mail-Posteingang. Sie haben eine E-Mail zur
            Bestätigung Ihrer Adresse erhalten. Klicken Sie auf den Link in der
            E-Mail, um Ihr Konto zu aktivieren.
          </AlertDescription>
        </Alert>
        <p className="font-jost mt-4 text-q-text-dark-700 text-sm">
          <Link href="/auth/login" className="text-q-blue underline hover:text-q-blue/80">
            Zurück zur Anmeldung
          </Link>
        </p>
      </AuthCardLayout>
    );
  }

  return (
    <AuthCardLayout title="Registrierung">
      <p className="font-jost text-q-text-dark-700 tablet:text-sm mb-6 text-base leading-[1.6]">
        Erstellen Sie ein Konto mit Ihrer E-Mail und einem Passwort (mindestens 6
        Zeichen).
      </p>
      <form action={formAction} className="space-y-5">
        {state?.error && (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="email" className="font-jost text-q-text-dark-700">
            E-Mail
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="border-q-blue font-jost"
            placeholder="ihre@email.de"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="font-jost text-q-text-dark-700">
            Passwort
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            minLength={6}
            className="border-q-blue font-jost"
          />
        </div>
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center">
          <Button
            type="submit"
            className="bg-q-blue font-jost font-bold hover:bg-q-blue/90"
          >
            Registrieren
          </Button>
          <Link
            href="/auth/login"
            className="font-jost text-q-blue underline hover:text-q-blue/80"
          >
            Bereits ein Konto? Anmelden
          </Link>
        </div>
      </form>
    </AuthCardLayout>
  );
}
