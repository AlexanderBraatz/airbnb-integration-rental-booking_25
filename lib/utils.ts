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
