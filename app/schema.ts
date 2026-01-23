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
  guest_phone_number: z.string().max(100, "Max 100 characters").optional(),
  has_agreed_to_policies: z
    .boolean()
    .refine((value) => value, "an answer must be provided"),
});

// Form schema for the booking request form (uses Date objects, not ISO strings)
export const bookingRequestFormSchema = z.object({
  guest_first_name: z.string().min(1, "Name ist erforderlich").max(100, "Max 100 Zeichen"),
  guest_last_name: z.string().min(1, "Nachname ist erforderlich").max(100, "Max 100 Zeichen"),
  guest_email: z.string().email("Ungültige E-Mail-Adresse"),
  guest_phone_number: z.string().max(100, "Max 100 Zeichen").optional(),
  check_in_date: z.date({ required_error: "Anreise ist erforderlich" }),
  check_out_date: z.date({ required_error: "Abreise ist erforderlich" }),
  number_of_guests: z.string().min(1, "Anzahl der Gäste erforderlich"),
  with_dog: z.string().min(1, "Bitte wählen Sie eine Option"),
  guest_message: z.string().max(400, "Nachricht zu lang (max 400 Zeichen)").optional(),
  has_agreed_to_policies: z.boolean().refine(val => val === true, "Zustimmung erforderlich"),
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
  guest_phone_number?: string;
  has_agreed_to_policies: boolean;
}

export type BookingRequestFormValues = z.infer<typeof bookingRequestFormSchema>;

export const discountSchema = z.object({
  discountValuePercentageFormValue: z
    .int()
    .gte(0, "Discount must be a possessive amount")
    .lt(100, "Discount cant be 100% or greater"),
});

export interface DiscountFormTypes {
  discountValuePercentageFormValue: number;
}
