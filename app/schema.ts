import { z } from "zod";

export const createBookingRequestSchema = z.object({
  check_in_date: z.iso.date("invalid Date, format should be YYYY-MM-DD"),
  check_out_date: z.iso.date("invalid Date, format should be YYYY-MM-DD"),
  number_of_guests: z
    .int()
    .gte(1, "at least one guest")
    .lte(12, "to many Guests"),
  with_dog: z.boolean("an answer must be provided"),
  guest_email: z.email("invalid Email"),
  guest_first_name: z
    .string()
    .min(1, "Required")
    .max(100, "Max 100 characters"),
  guest_last_name: z.string().min(1, "Required").max(100, "Max 100 characters"),
  guest_message: z.string().max(400, "Max 400 characters"),
  guest_phone_number: z.string().max(100, "Max 100 characters"),
  has_agreed_to_policies: z
    .boolean()
    .refine((value) => value, "an answer must be provided"),
});

export interface BookingRequestFormTypes {
  check_in_date: string;
  check_out_date: string;
  number_of_guests: number;
  with_dog: boolean;
  guest_email: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_message: string;
  guest_phone_number: string;
  has_agreed_to_policies: boolean;
}
