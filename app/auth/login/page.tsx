import { Suspense } from "react";
import { LoginForm } from "./login-form";
import { AuthCardLayout } from "../auth-card-layout";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <AuthCardLayout title="Anmeldung">
          <p className="font-jost text-q-text-dark-700 tablet:text-sm mb-6 text-base leading-[1.6]">
            Melden Sie sich mit Ihrer E-Mail und Ihrem Passwort an.
          </p>
          <div className="animate-pulse space-y-5">
            <div className="bg-q-card-background/50 h-10 rounded-md" />
            <div className="bg-q-card-background/50 h-10 rounded-md" />
            <div className="bg-q-card-background/50 h-10 w-24 rounded-md" />
          </div>
        </AuthCardLayout>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
