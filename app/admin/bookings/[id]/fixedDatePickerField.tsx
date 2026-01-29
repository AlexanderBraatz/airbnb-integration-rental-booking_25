"use client";

import * as React from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ChevronDownIcon } from "lucide-react";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  name_2557050335: z.date(),
});

type FormValues = z.infer<typeof formSchema>;

export default function MyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_2557050335: undefined,
    },
  });

  function onSubmit(values: FormValues) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Formular konnte nicht gesendet werden. Bitte versuchen Sie es erneut.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <Controller
          control={form.control}
          name="name_2557050335"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="name_2557050335">Geburtsdatum</FieldLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    id="name_2557050335"
                    className="w-48 justify-between font-normal"
                  >
                    {field.value
                      ? field.value.toLocaleDateString("de-DE")
                      : "Datum wählen"}
                    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={field.value}
                    onSelect={(date) => {
                      // Calendar can return undefined, so guard
                      if (date) {
                        field.onChange(date);
                      }
                    }}
                    // forward blur for RHF touched state
                    onDayBlur={field.onBlur}
                  />
                </PopoverContent>
              </Popover>

              <FieldDescription>
                Ihr Geburtsdatum wird zur Berechnung Ihres Alters verwendet.
              </FieldDescription>

              <FieldError>
                {form.formState.errors.name_2557050335?.message}
              </FieldError>
            </Field>
          )}
        />

        <Button type="submit">Absenden</Button>
      </form>
    </Form>
  );
}
