"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import {
  HostConfig,
  updateHostConfigAction,
} from "@/app/actions/admindashboardActions";
import { useRouter } from "next/navigation";

/** Format cents as euro string (e.g. 3050 → "30,50") for display. */
function formatCentsToEuro(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Parse German number string (e.g. "30,50" or "1.234,56") to number; result in euros. */
function parseGermanNumberToEuros(str: string): number {
  const cleaned = str.trim().replace(/\./g, "").replace(",", ".");
  const parsed = Number.parseFloat(cleaned);
  return Number.isNaN(parsed) ? 0 : parsed;
}

const formSchema = z.object({
  price_per_night_cents: z
    .number()
    .int("Muss eine ganze Zahl sein")
    .min(0, "Muss 0 oder größer sein"),
  price_for_dog_cents: z
    .number()
    .int("Muss eine ganze Zahl sein")
    .min(0, "Muss 0 oder größer sein"),
  price_for_cleaning_cents: z
    .number()
    .int("Muss eine ganze Zahl sein")
    .min(0, "Muss 0 oder größer sein"),
  host_business_email: z.string().email("Ungültige E-Mail-Adresse"),
});

export type HostConfigFormValues = z.infer<typeof formSchema>;

export default function HostConfigForm({
  initialData,
}: {
  initialData: HostConfig;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();

  const form = useForm<HostConfigFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price_per_night_cents: initialData.price_per_night_cents,
      price_for_dog_cents: initialData.price_for_dog_cents,
      price_for_cleaning_cents: initialData.price_for_cleaning_cents,
      host_business_email: initialData.host_business_email,
    },
  });

  const handleUpdateConfig = async (values: HostConfigFormValues) => {
    const result = await updateHostConfigAction(values);

    if (result?.data) {
      setIsEditing(false);
      toast.success("Gastgeber-Einstellungen wurden gespeichert.");
      router.refresh();
    }

    if (result?.error) {
      console.error("Form submission error", result.error);
      toast.error("Einstellungen konnten nicht gespeichert werden. Bitte versuchen Sie es erneut.");
    }
  };

  const handleCancel = () => {
    form.reset({
      price_per_night_cents: initialData.price_per_night_cents,
      price_for_dog_cents: initialData.price_for_dog_cents,
      price_for_cleaning_cents: initialData.price_for_cleaning_cents,
      host_business_email: initialData.host_business_email,
    });
    setIsEditing(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateConfig)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <div className="flex justify-end gap-2">
          {!isEditing ? (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              variant="default"
            >
              Bearbeiten
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button type="button" onClick={handleCancel} variant="outline">
                Abbrechen
              </Button>
              <Button type="submit">Speichern</Button>
            </div>
          )}
        </div>

        <Field>
          <FieldLabel htmlFor="price_per_night_cents">
            Preis pro Nacht (€)
          </FieldLabel>
          <Controller
            control={form.control}
            name="price_per_night_cents"
            render={({ field }) => (
              <Input
                id="price_per_night_cents"
                type="text"
                inputMode="decimal"
                placeholder="100,00"
                disabled={!isEditing}
                value={formatCentsToEuro(field.value)}
                onChange={(e) => {
                  const euros = parseGermanNumberToEuros(e.target.value);
                  field.onChange(Math.round(euros * 100));
                }}
                onBlur={field.onBlur}
              />
            )}
          />
          <FieldError>
            {form.formState.errors.price_per_night_cents?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="price_for_dog_cents">
            Hundegebühr (€)
          </FieldLabel>
          <Controller
            control={form.control}
            name="price_for_dog_cents"
            render={({ field }) => (
              <Input
                id="price_for_dog_cents"
                type="text"
                inputMode="decimal"
                placeholder="25,00"
                disabled={!isEditing}
                value={formatCentsToEuro(field.value)}
                onChange={(e) => {
                  const euros = parseGermanNumberToEuros(e.target.value);
                  field.onChange(Math.round(euros * 100));
                }}
                onBlur={field.onBlur}
              />
            )}
          />
          <FieldError>
            {form.formState.errors.price_for_dog_cents?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="price_for_cleaning_cents">
            Reinigungspauschale (€)
          </FieldLabel>
          <Controller
            control={form.control}
            name="price_for_cleaning_cents"
            render={({ field }) => (
              <Input
                id="price_for_cleaning_cents"
                type="text"
                inputMode="decimal"
                placeholder="44,88"
                disabled={!isEditing}
                value={formatCentsToEuro(field.value)}
                onChange={(e) => {
                  const euros = parseGermanNumberToEuros(e.target.value);
                  field.onChange(Math.round(euros * 100));
                }}
                onBlur={field.onBlur}
              />
            )}
          />
          <FieldError>
            {form.formState.errors.price_for_cleaning_cents?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="host_business_email">
            Geschäftliche E-Mail-Adresse
          </FieldLabel>
          <Input
            id="host_business_email"
            type="email"
            placeholder="host@beispiel.de"
            disabled={!isEditing}
            {...form.register("host_business_email")}
          />
          <FieldError>
            {form.formState.errors.host_business_email?.message}
          </FieldError>
        </Field>
      </form>
    </Form>
  );
}
