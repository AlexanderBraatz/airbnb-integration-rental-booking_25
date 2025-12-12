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
import { BookingRow } from "../columns";

const formSchema = z.object({
  guest_first_name: z.string().min(1),
  guest_last_name: z.string().min(1),
  guest_email: z.string().min(1),
  guest_phone_number: z.string(),
  check_in_date: z.date(),
  check_out_date: z.date(),
  number_of_guests: z.string(),
  name_9347403794: z.boolean(),
});
type FormValues = z.infer<typeof formSchema>;

export default function BookingGuestDetailsForm({
  bookingData,
}: {
  bookingData: BookingRow;
}) {
  const {
    check_in_date,
    check_out_date,
    guest_email,
    guest_first_name,
    guest_last_name,
    guest_phone_number,
    number_of_guests,
  } = bookingData;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guest_email,
      guest_first_name,
      guest_last_name,
      //   guest_message,
      guest_phone_number: guest_phone_number ?? "",
      //   has_agreed_to_policies,
      //   id,
      number_of_guests: String(number_of_guests),
      check_in_date: checkedDate(check_in_date),
      check_out_date: checkedDate(check_out_date),
    },
  });
  //  checkedDate sets the field to undefined if no Date was provided
  function checkedDate(date: string) {
    return Number.isNaN(new Date(date).getTime()) ? undefined : new Date(date);
  }

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
          <FieldLabel htmlFor="guest_first_name">First Name</FieldLabel>
          <Input
            id="guest_first_name"
            placeholder=""
            {...form.register("guest_first_name")}
          />

          <FieldError>
            {form.formState.errors.guest_first_name?.message}
          </FieldError>
        </Field>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <Field>
              <FieldLabel htmlFor="guest_last_name">Last Name</FieldLabel>
              <Input
                id="guest_last_name"
                placeholder="shadcn"
                {...form.register("guest_last_name")}
              />

              <FieldError>
                {form.formState.errors.guest_last_name?.message}
              </FieldError>
            </Field>
          </div>
        </div>
        <Field>
          <FieldLabel htmlFor="guest_email">Email</FieldLabel>
          <Input
            id="guest_email"
            placeholder="shadcn"
            {...form.register("guest_email")}
          />

          <FieldError>{form.formState.errors.guest_email?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="guest_phone_number">Phone number</FieldLabel>
          <Input
            id="guest_phone_number"
            placeholder="Placeholder"
            {...form.register("guest_phone_number")}
          />
          <FieldDescription>Enter your phone number.</FieldDescription>
          <FieldError>
            {form.formState.errors.guest_phone_number?.message}
          </FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="check_in_date">Check In Date</FieldLabel>
          <Controller
            control={form.control}
            name="check_in_date"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="check_in_date">Date of birth</FieldLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      id="check_in_date"
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
                  {form.formState.errors.check_in_date?.message}
                </FieldError>
              </Field>
            )}
          />
          <FieldDescription>
            Your date of birth is used to calculate your age.
          </FieldDescription>
          <FieldError>
            {form.formState.errors.check_in_date?.message}
          </FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="check_out_date">Checkout Date</FieldLabel>
          <Controller
            control={form.control}
            name="check_out_date"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="check_out_date">Date of birth</FieldLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      id="check_out_date"
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
                  {form.formState.errors.check_out_date?.message}
                </FieldError>
              </Field>
            )}
          />
          <FieldDescription>
            Your date of birth is used to calculate your age.
          </FieldDescription>
          <FieldError>
            {form.formState.errors.check_out_date?.message}
          </FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="number_of_guests">Number of Guests</FieldLabel>
          <Select {...form.register("number_of_guests")}>
            <SelectTrigger id="number_of_guests">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>

          <FieldError>
            {form.formState.errors.number_of_guests?.message}
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
