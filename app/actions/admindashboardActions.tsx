"use server";

import { createClient } from "@/utils/supabase/server";
import { FormValues } from "../admin/bookings/[id]/booking-guest-details-form";
import { revalidatePath } from "next/cache";

export async function handleUpdateBookingAction(
  id: number,
  values: FormValues,
) {
  const supabase = await createClient();
  const {
    guest_first_name,
    guest_last_name,
    guest_email,
    guest_phone_number,
    check_in_date,
    check_out_date,
    number_of_guests,
    with_dog,
  } = values;
  console.log(number_of_guests, with_dog);
  const { data, error } = await supabase
    .from("Bookings")
    .update({
      guest_first_name,
      guest_last_name,
      guest_email,
      guest_phone_number,
      check_in_date: convertDate(check_in_date),
      check_out_date: convertDate(check_out_date),
      number_of_guests: Number(number_of_guests),
      with_dog,
    })
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
  revalidatePath("/");
  return {
    data,
    error: null,
  };
}
function convertDate(dateObj: Date) {
  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  return year + "-" + month + "-" + day;
}
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

export const getBookingFromIdAction = async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Bookings")
    .select("*")
    .eq("id", id)
    .select()
    .maybeSingle();

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
};

export const getAllBookings = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("Bookings").select("*").select();

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
};
