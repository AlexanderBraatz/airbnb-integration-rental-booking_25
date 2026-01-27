"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  price_per_night_cents: z
    .number()
    .int("Must be a whole number")
    .min(0, "Must be 0 or greater"),
  price_for_dog_cents: z
    .number()
    .int("Must be a whole number")
    .min(0, "Must be 0 or greater"),
  price_for_cleaning_cents: z
    .number()
    .int("Must be a whole number")
    .min(0, "Must be 0 or greater"),
  host_business_email: z.string().email("Invalid email address"),
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
      toast.success("Host settings updated successfully.");
      router.refresh();
    }

    if (result?.error) {
      console.error("Form submission error", result.error);
      toast.error("Failed to update settings. Please try again.");
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
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button type="button" onClick={handleCancel} variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          )}
        </div>

        <Field>
          <FieldLabel htmlFor="price_per_night_cents">
            Price Per Night (cents)
          </FieldLabel>
          <Input
            id="price_per_night_cents"
            type="number"
            placeholder="10000"
            disabled={!isEditing}
            {...form.register("price_per_night_cents", {
              valueAsNumber: true,
            })}
          />
          <FieldError>
            {form.formState.errors.price_per_night_cents?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="price_for_dog_cents">
            Price For Dog (cents)
          </FieldLabel>
          <Input
            id="price_for_dog_cents"
            type="number"
            placeholder="2500"
            disabled={!isEditing}
            {...form.register("price_for_dog_cents", {
              valueAsNumber: true,
            })}
          />
          <FieldError>
            {form.formState.errors.price_for_dog_cents?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="price_for_cleaning_cents">
            Price For Cleaning (cents)
          </FieldLabel>
          <Input
            id="price_for_cleaning_cents"
            type="number"
            placeholder="4488"
            disabled={!isEditing}
            {...form.register("price_for_cleaning_cents", {
              valueAsNumber: true,
            })}
          />
          <FieldError>
            {form.formState.errors.price_for_cleaning_cents?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="host_business_email">
            Host Business Email
          </FieldLabel>
          <Input
            id="host_business_email"
            type="email"
            placeholder="host@example.com"
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
