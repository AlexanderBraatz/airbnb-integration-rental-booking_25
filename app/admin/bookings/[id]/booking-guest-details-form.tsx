"use client";

import * as React from "react";

import { ChevronDownIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  name_4305567813: z.string().min(1),
  name_1687434113: z.string().min(1),
  name_4356889723: z.string().min(1),
  name_4074309247: z.string(),
  name_0212122001: z.date(),
  name_8125477495: z.date(),
  name_5564968156: z.string(),
  name_9347403794: z.boolean(),
});
type FormValues = z.infer<typeof formSchema>;
export default function BookingGuestDetailsForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_0212122001: undefined,
      name_8125477495: undefined,
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
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <Field>
          <FieldLabel htmlFor="name_4305567813">First Name</FieldLabel>
          <Input
            id="name_4305567813"
            placeholder=""
            {...form.register("name_4305567813")}
          />

          <FieldError>
            {form.formState.errors.name_4305567813?.message}
          </FieldError>
        </Field>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <Field>
              <FieldLabel htmlFor="name_1687434113">Last Name</FieldLabel>
              <Input
                id="name_1687434113"
                placeholder="shadcn"
                {...form.register("name_1687434113")}
              />

              <FieldError>
                {form.formState.errors.name_1687434113?.message}
              </FieldError>
            </Field>
          </div>
        </div>
        <Field>
          <FieldLabel htmlFor="name_4356889723">Email</FieldLabel>
          <Input
            id="name_4356889723"
            placeholder="shadcn"
            {...form.register("name_4356889723")}
          />

          <FieldError>
            {form.formState.errors.name_4356889723?.message}
          </FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="name_4074309247">Phone number</FieldLabel>
          <Input
            id="name_4074309247"
            placeholder="Placeholder"
            {...form.register("name_4074309247")}
          />
          <FieldDescription>Enter your phone number.</FieldDescription>
          <FieldError>
            {form.formState.errors.name_4074309247?.message}
          </FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="name_0212122001">Check In Date</FieldLabel>
          <Controller
            control={form.control}
            name="name_0212122001"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="name_0212122001">Date of birth</FieldLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      id="name_0212122001"
                      className="w-48 justify-between font-normal"
                    >
                      {field.value
                        ? field.value.toLocaleDateString()
                        : "Select date"}
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
                  Your date of birth is used to calculate your age.
                </FieldDescription>

                <FieldError>
                  {form.formState.errors.name_0212122001?.message}
                </FieldError>
              </Field>
            )}
          />
          <FieldDescription>
            Your date of birth is used to calculate your age.
          </FieldDescription>
          <FieldError>
            {form.formState.errors.name_0212122001?.message}
          </FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="name_8125477495">Checkout Date</FieldLabel>
          <Controller
            control={form.control}
            name="name_8125477495"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="name_8125477495">Date of birth</FieldLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      id="name_8125477495"
                      className="w-48 justify-between font-normal"
                    >
                      {field.value
                        ? field.value.toLocaleDateString()
                        : "Select date"}
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
                  Your date of birth is used to calculate your age.
                </FieldDescription>

                <FieldError>
                  {form.formState.errors.name_8125477495?.message}
                </FieldError>
              </Field>
            )}
          />
          <FieldDescription>
            Your date of birth is used to calculate your age.
          </FieldDescription>
          <FieldError>
            {form.formState.errors.name_8125477495?.message}
          </FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="name_5564968156">Number of Guests</FieldLabel>
          <Select {...form.register("name_5564968156")}>
            <SelectTrigger id="name_5564968156">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>

          <FieldError>
            {form.formState.errors.name_5564968156?.message}
          </FieldError>
        </Field>
        <Field className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FieldLabel htmlFor="name_9347403794" className="text-base">
              With Dog
            </FieldLabel>
          </div>
          <Switch id="name_9347403794" {...form.register("name_9347403794")} />
          <FieldError>
            {form.formState.errors.name_9347403794?.message}
          </FieldError>
        </Field>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
