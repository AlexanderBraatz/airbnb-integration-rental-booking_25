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

export function bookingCodeConvertedBackToId(bookingCode: string): number {
  if (!bookingCode.startsWith("BKG-")) {
    throw new Error("Invalid booking code format");
  }

  const base36Part = bookingCode.replace("BKG-", "");
  const masked = parseInt(base36Part, 36);

  if (Number.isNaN(masked)) {
    throw new Error("Invalid booking code value");
  }

  const secret = Number(process.env.SECRET_MASK_FOR_BOOKING_CODE_OBFUSCATION);

  return masked ^ secret;
}
