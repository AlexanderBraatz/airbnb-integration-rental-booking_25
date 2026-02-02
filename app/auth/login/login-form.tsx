"use client";

import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { login, type LoginState } from "../actions";
import { AuthCardLayout } from "../auth-card-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, formAction] = useActionState<LoginState, FormData>(login, {});
  const invalidLinkError = searchParams.get("error") === "invalid_link";

  useEffect(() => {
    if (state?.success) {
      const t = setTimeout(() => router.replace("/admin/bookings"), 2000);
      return () => clearTimeout(t);
    }
  }, [state?.success, router]);

  if (state?.success) {
    return (
      <AuthCardLayout title="Anmeldung">
        <Alert className="border-q-blue bg-q-card-background">
          <CheckCircle2 className="text-q-blue h-4 w-4" />
          <AlertDescription className="font-jost text-q-text-dark-700">
            Sie sind eingeloggt. Sie werden in Kürze weitergeleitet…
          </AlertDescription>
        </Alert>
      </AuthCardLayout>
    );
  }

  return (
    <AuthCardLayout title="Anmeldung">
      <p className="font-jost text-q-text-dark-700 tablet:text-sm mb-6 text-base leading-[1.6]">
        Melden Sie sich mit Ihrer E-Mail und Ihrem Passwort an.
      </p>
      <form action={formAction} className="space-y-5">
        {(state?.error || invalidLinkError) && (
          <Alert variant="destructive">
            <AlertDescription>
              {invalidLinkError
                ? "Der Bestätigungslink ist ungültig oder abgelaufen. Bitte versuchen Sie sich erneut anzumelden."
                : state?.error}
            </AlertDescription>
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
            autoComplete="current-password"
            className="border-q-blue font-jost"
          />
        </div>
        <div className="tablet:flex-row tablet:items-center flex flex-col gap-4">
          <Button
            type="submit"
            className="bg-q-blue font-jost hover:bg-q-blue/90 font-bold"
          >
            Anmelden
          </Button>
          <Link
            href="/auth/signup"
            className="font-jost text-q-blue hover:text-q-blue/80 underline"
          >
            Noch kein Konto? Registrieren
          </Link>
        </div>
      </form>
    </AuthCardLayout>
  );
}
