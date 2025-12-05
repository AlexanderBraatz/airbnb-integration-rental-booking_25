"use server";

import { createClient } from "@/utils/supabase/server";

export async function handleAcceptAction(id: number, price: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Bookings")
    .update({ price_snapshot_host_accepted_in_EURcents: price })
    .eq("id", id)
    .select()
    .maybeSingle(); // 👈 avoids throwing PGRST116 when 0 rows

  // 1) Real Supabase error (network, RLS, SQL etc.)
  if (error) {
    console.error("Supabase error in handleAcceptAction:", error);

    // Optional: special handling for certain codes
    if (error.code === "PGRST116") {
      // "The result contains 0 rows" when using .single()
      return {
        data: null,
        error: "Booking not found.",
      };
    }

    return {
      data: null,
      error: "Something went wrong while updating the booking.",
    };
  }

  // 2) No rows matched the `id`
  if (!data) {
    return {
      data: null,
      error: "Booking not found or you don't have access to it.",
    };
  }

  // 3) Success
  return {
    data,
    error: null,
  };
}
