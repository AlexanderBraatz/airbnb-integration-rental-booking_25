"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { bookingRequestAction } from "../actions/bookingRequestAction";
import { createBookingRequestSchema } from "../schema";

export default function BookingRequestForm() {
  const form = useForm<z.infer<typeof createBookingRequestSchema>>({
    resolver: zodResolver(createBookingRequestSchema),
    defaultValues: {
      check_in_date: "2025-01-01",
      check_out_date: "2025-01-08",
      number_of_guests: 2,
      with_dog: false,
      guest_email: "testing@gmail.com",
      guest_first_name: "Max",
      guest_last_name: "Test",
      guest_message: "I am excited to test this",
      guest_phone_number: "+49073939888",
      has_agreed_to_policies: false,
    },
  });

  async function onSubmit(values: z.infer<typeof createBookingRequestSchema>) {
    console.log(values);
    const response = await bookingRequestAction(values);
    if (response?.error) {
      console.log(response?.error);
      toast.error(response?.error);
      return;
      //TODO: add better hadling of this error 1. show message in form not just a toast 2. include a error loging system that lets me know if we ahd a production error
      // this whould be where it would show up if an email failed to send , if resend trows an error, so i could do "please try again in a few minutes or reach out to the host directly to arange a booking"
    }
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>,
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-orange-extra-light mx-auto max-w-3xl space-y-8 py-10"
      >
        <FormField
          control={form.control}
          name="check_in_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check In Date</FormLabel>
              <FormControl>
                <Input placeholder="2025-01-31" type="date" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="check_out_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check Out Date</FormLabel>
              <FormControl>
                <Input placeholder="2025-02-31" type="date" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number_of_guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number Of Guests</FormLabel>
              <FormControl>
                <Input
                  placeholder="4"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="with_dog"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Will you be bringing a dog?</FormLabel>
                <FormDescription>Please do let u know.</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guest_email"
          render={({ field }


            
          ) => (
            <FormItem>
              <FormLabel>Guest Email</FormLabel>
              <FormControl
              
              
              >
                <Input
                  placeholder="example@gmail.com"
                  type="email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guest_first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>guest_first_name</FormLabel>
              <FormControl>
                <Input placeholder="Max" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guest_last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>guest_last_name</FormLabel>
              <FormControl>
                <Input placeholder="Muster" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guest_message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>guest_message</FormLabel>
              <FormControl>
                <Input
                  placeholder="... your message goes here"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guest_phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>guest_phone_number</FormLabel>
              <FormControl>
                <Input placeholder="00491234567" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="has_agreed_to_policies"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I have read and agreed to the data protection policy
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
