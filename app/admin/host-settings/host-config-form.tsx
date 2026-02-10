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

/** Format cents as euro string, no thousand separator (e.g. 3050 → "30,50"). */
export function formatCentsToEuro(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

/** German price string: digits, optional comma + 1–2 decimals. No thousand separator. */
const GERMAN_PRICE_STRING_REGEX = /^\d*([,]\d{1,2})?$/;
const germanPriceStringSchema = z
  .string()
  .regex(
    GERMAN_PRICE_STRING_REGEX,
    "Ungültiges Format. Bitte Zahl eingeben (z.B. 50 oder 50,00).",
  );

/** Parse validated German price string to cents. Only call after Zod passes. */
function parseGermanPriceStringToCents(str: string): number {
  const trimmed = str.trim();
  if (trimmed === "") return 0;
  const normalized = trimmed.replace(",", ".");
  const euros = Number.parseFloat(normalized);
  return Math.round(euros * 100);
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

type PriceFieldName =
  | "price_per_night_cents"
  | "price_for_dog_cents"
  | "price_for_cleaning_cents";

const PRICE_FIELDS: PriceFieldName[] = [
  "price_per_night_cents",
  "price_for_dog_cents",
  "price_for_cleaning_cents",
];

function initialDisplayValues(
  data: HostConfig,
): Record<PriceFieldName, string> {
  return {
    price_per_night_cents: formatCentsToEuro(data.price_per_night_cents),
    price_for_dog_cents: formatCentsToEuro(data.price_for_dog_cents),
    price_for_cleaning_cents: formatCentsToEuro(data.price_for_cleaning_cents),
  };
}

export default function HostConfigForm({
  initialData,
}: {
  initialData: HostConfig;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [displayValues, setDisplayValues] = React.useState<
    Record<PriceFieldName, string>
  >(() => initialDisplayValues(initialData));
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

  React.useEffect(() => {
    setDisplayValues(initialDisplayValues(initialData));
    // Only sync when saved cents change (e.g. after refresh), not on every initialData reference
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialData.price_per_night_cents,
    initialData.price_for_dog_cents,
    initialData.price_for_cleaning_cents,
  ]);

  function commitPriceField(field: PriceFieldName): boolean {
    const raw = displayValues[field].trim();
    const parsed = germanPriceStringSchema.safeParse(raw);
    if (!parsed.success) {
      form.setError(field, {
        type: "manual",
        message:
          parsed.error.issues[0]?.message ??
          "Ungültiges Format. Bitte Zahl in Euro Format eingeben (z.B. 50 oder 50,00).",
      });
      return false;
    }
    const cents = parseGermanPriceStringToCents(parsed.data);
    form.setValue(field, cents);
    form.clearErrors(field);
    setDisplayValues((prev) => ({
      ...prev,
      [field]: formatCentsToEuro(cents),
    }));
    return true;
  }

  const handleUpdateConfig = async () => {
    for (const field of PRICE_FIELDS) {
      if (!commitPriceField(field)) {
        form.setFocus(field);
        return;
      }
    }
    const result = await updateHostConfigAction(form.getValues());

    if (result?.data) {
      setIsEditing(false);
      toast.success("Gastgeber-Einstellungen wurden gespeichert.");
      router.refresh();
    }

    if (result?.error) {
      console.error("Form submission error", result.error);
      toast.error(
        "Einstellungen konnten nicht gespeichert werden. Bitte versuchen Sie es erneut.",
      );
    }
  };

  const handleCancel = () => {
    form.reset({
      price_per_night_cents: initialData.price_per_night_cents,
      price_for_dog_cents: initialData.price_for_dog_cents,
      price_for_cleaning_cents: initialData.price_for_cleaning_cents,
      host_business_email: initialData.host_business_email,
    });
    setDisplayValues(initialDisplayValues(initialData));
    form.clearErrors();
    setIsEditing(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateConfig)}
        className="mx-auto space-y-8 py-10"
      >
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
                value={displayValues.price_per_night_cents}
                onChange={(e) => {
                  setDisplayValues((prev) => ({
                    ...prev,
                    price_per_night_cents: e.target.value,
                  }));
                  form.clearErrors("price_per_night_cents");
                }}
                onBlur={() => {
                  commitPriceField("price_per_night_cents");
                  field.onBlur();
                }}
              />
            )}
          />
          <FieldError>
            {form.formState.errors.price_per_night_cents?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="price_for_dog_cents">Hundegebühr (€)</FieldLabel>
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
                value={displayValues.price_for_dog_cents}
                onChange={(e) => {
                  setDisplayValues((prev) => ({
                    ...prev,
                    price_for_dog_cents: e.target.value,
                  }));
                  form.clearErrors("price_for_dog_cents");
                }}
                onBlur={() => {
                  commitPriceField("price_for_dog_cents");
                  field.onBlur();
                }}
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
                value={displayValues.price_for_cleaning_cents}
                onChange={(e) => {
                  setDisplayValues((prev) => ({
                    ...prev,
                    price_for_cleaning_cents: e.target.value,
                  }));
                  form.clearErrors("price_for_cleaning_cents");
                }}
                onBlur={() => {
                  commitPriceField("price_for_cleaning_cents");
                  field.onBlur();
                }}
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
      </form>
    </Form>
  );
}
