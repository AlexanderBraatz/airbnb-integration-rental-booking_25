"use server";

import { createClient } from "@/utils/supabase/server";
import { FormValues } from "../admin/bookings/[id]/booking-guest-details-form";
import { revalidatePath } from "next/cache";
import { sendEmail } from "./bookingRequestAction";
import { EmailTemplateH2 } from "@/components/email-template";
import { maskIdAsBookingCode } from "@/lib/utils";

const testingEmailHost = "alex_braatz@icloud.com";
const testingEmailGuest = "alex_braatz@icloud.com";

export async function acceptPriceAndSendEmailsAction({
  id,
  hasDiscountApplied,
  DiscountedPriceCents,
  suggestedPriceCents,
}: {
  id: number;
  hasDiscountApplied: boolean;
  DiscountedPriceCents: number;
  suggestedPriceCents: number;
}) {
  console.log(hasDiscountApplied, DiscountedPriceCents, suggestedPriceCents);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Bookings")
    .update({
      price_snapshot_host_accepted_in_EURcents: hasDiscountApplied
        ? DiscountedPriceCents
        : suggestedPriceCents,
    })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.log(
      "an error has occurred during  acceptPriceAndSendEmailsAction",
      error,
    );
  }
  if (!data) {
    console.log(
      "an error has occurred during  acceptPriceAndSendEmailsAction",
      error,
    );
    return { data: null, error: "a error has occurred" };
  }

  // sending emails

  const {
    check_in_date,
    check_out_date,
    number_of_guests,
    with_dog,
    guest_email,
    guest_first_name,
    guest_last_name,
    guest_message,
    guest_phone_number,
    has_agreed_to_policies,
    price_snapshot_host_accepted_in_EURcents,
  } = data;

  const bookingCode = maskIdAsBookingCode(id);

  // sending 2nd email to Host

  const emailPropsHostPriceIsAccepted = {
    Template: EmailTemplateH2,
    email_to: testingEmailHost,
    templateProps: {
      check_in_date,
      check_out_date,
      number_of_guests,
      with_dog: with_dog ? "yes" : "no",
      guest_email,
      guest_first_name,
      guest_last_name,
      guest_message: guest_message ?? "",
      guest_phone_number: guest_phone_number ?? "",
      has_agreed_to_policies: has_agreed_to_policies ? "yes" : "no",
      bookingCode,
      price_snapshot_host_accepted_in_EURcents: String(
        price_snapshot_host_accepted_in_EURcents,
      ),
    },
  };
  interface EmailTemplatePropsV2andH2 {
    check_in_date: string;
    check_out_date: string;
    number_of_guests: number;
    with_dog: string;
    guest_email: string;
    guest_first_name: string;
    guest_last_name: string;
    guest_message: string;
    guest_phone_number: string;
    has_agreed_to_policies: string;
    bookingCode: string;
    price_snapshot_host_accepted_in_EURcents: string;
  }

  interface sendEmailArgTypes {
    Template: React.FC<Readonly<EmailTemplatePropsV2andH2>>;
    email_to: string;
    templateProps: Readonly<EmailTemplatePropsV2andH2>;
    // Ensures email data remains immutable after rendering, avoiding inconsistencies between the email and its source data.
  }
  const { error: errorHostEmail } = await sendEmail<EmailTemplatePropsV2andH2>(
    emailPropsHostPriceIsAccepted,
  );
  // const { error: errorHostEmail } = (
  //   await sendEmail
  // )<EmailTemplatePropsV2andH2>(emailPropsHostPriceIsAccepted);
  if (errorHostEmail) {
    console.log(errorHostEmail);
  }
  //on success
  revalidatePath("/");
  return { data, error: null };
}
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
    console.error("Supabase error in handleUpdateBookingAction:", error);

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
