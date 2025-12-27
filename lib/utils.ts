import { createClient } from "@/utils/supabase/server";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getAllPricingData() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("daily_availability")
    .select("*")
    .order("day");
  return data;
}

//helper
export function financial(x: number): string {
  return Number.parseFloat(x.toString()).toFixed(2);
}

export function maskIdAsBookingCode(id: number) {
  function toBase36(num: number): string {
    return num.toString(36).toUpperCase();
  }
  const masked =
    id ^ Number(process.env.SECRET_MASK_FOR_BOOKING_CODE_OBFUSCATION);
  const bookingCode = `BKG-${toBase36(masked)}`;
  return bookingCode;
}
