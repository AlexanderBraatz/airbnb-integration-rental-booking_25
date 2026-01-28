"use server";

import { createClient } from "@/utils/supabase/server";
import { FormValues } from "../admin/bookings/[id]/booking-guest-details-form";
import { revalidatePath } from "next/cache";
import { sendEmail } from "./bookingRequestAction";
import {
  EmailTemplateV2,
  EmailTemplateH2,
  EmailTemplateV5,
  EmailTemplateH5,
  type EmailTemplatePropsV2,
  type EmailTemplatePropsH2,
  type EmailTemplatePropsV5,
  type EmailTemplatePropsH5,
} from "@/components/email-template";
import { maskIdAsBookingCode } from "@/lib/utils";
import { getEmailSubject } from "@/lib/email-utils";
import type { Tables } from "@/database.types";

const testingEmailHost = "alex_braatz@icloud.com";
const testingEmailGuest = "alex_braatz@icloud.com";

// this server action will
// 2. update the databse to lock in the accepted Price
// 2.
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
  // 1 update Database
  const { data, error } = await supabase
    .from("Bookings")
    .update({
      price_snapshot_host_accepted_in_EURcents: hasDiscountApplied
        ? DiscountedPriceCents
        : suggestedPriceCents,
      status: "accepted",
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

  // Get host email from config
  const hostConfig = await getHostConfigAction();
  const hostEmail = hostConfig.data?.host_business_email || testingEmailHost;

  // Send email to Host (H2) - payment link sent confirmation
  const emailPropsHostPriceIsAccepted = {
    Template: EmailTemplateH2,
    email_to: hostEmail,
    subject: getEmailSubject("H2", {
      bookingCode,
      guest_first_name,
      guest_last_name,
    }),
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
  const { error: errorHostEmail } = await sendEmail<EmailTemplatePropsH2>(
    emailPropsHostPriceIsAccepted,
  );
  if (errorHostEmail) {
    console.log(errorHostEmail);
  }

  // Send email to Guest (V2) - payment request with link
  const emailPropsGuestPaymentRequest = {
    Template: EmailTemplateV2,
    email_to: guest_email || testingEmailGuest,
    subject: getEmailSubject("V2", {
      bookingCode,
      guest_first_name,
      guest_last_name,
    }),
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
  const { error: errorVisitorEmail } = await sendEmail<EmailTemplatePropsV2>(
    emailPropsGuestPaymentRequest,
  );
  if (errorVisitorEmail) {
    console.log(errorVisitorEmail);
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
    guest_message,
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
      guest_message,
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

export type HostConfig = Tables<"host_config">;

export const getHostConfigAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("host_config")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  // 1) Real Supabase error (network, RLS, SQL etc.)
  if (error) {
    console.error("Supabase error in getHostConfigAction:", error);
    return {
      data: null,
      error: "Something went wrong while fetching host config.",
    };
  }

  // 2) No row found - return null (caller can handle this)
  if (!data) {
    return {
      data: null,
      error: "No host config found",
    };
  }

  // 3) Success
  return {
    data,
    error: null,
  };
};

export interface UpdateHostConfigValues {
  price_per_night_cents: number;
  price_for_dog_cents: number;
  price_for_cleaning_cents: number;
  host_business_email: string;
}

export const updateHostConfigAction = async (
  values: UpdateHostConfigValues,
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("host_config")
    .upsert(
      {
        id: 1,
        ...values,
      },
      {
        onConflict: "id",
      },
    )
    .select()
    .maybeSingle();

  // 1) Real Supabase error (network, RLS, SQL etc.)
  if (error) {
    console.error("Supabase error in updateHostConfigAction:", error);
    return {
      data: null,
      error: "Something went wrong while updating host config.",
    };
  }

  // 2) No row returned
  if (!data) {
    return {
      data: null,
      error: "Failed to update host config.",
    };
  }

  // 3) Success
  revalidatePath("/admin/host-settings");
  revalidatePath("/admin/bookings");
  return {
    data,
    error: null,
  };
};

export async function declineBookingAction(id: number) {
  const supabase = await createClient();

  // Update booking status to declined
  const { data, error } = await supabase
    .from("Bookings")
    .update({ status: "declined" })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Supabase error in declineBookingAction:", error);
    return {
      data: null,
      error: "Something went wrong while declining the booking.",
    };
  }

  if (!data) {
    return {
      data: null,
      error: "Booking not found or you don't have access to it.",
    };
  }

  // Send emails to guest and host
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
  } = data;

  const bookingCode = maskIdAsBookingCode(id);

  // Get host email from config
  const hostConfig = await getHostConfigAction();
  const hostEmail = hostConfig.data?.host_business_email || testingEmailHost;

  // Email to Guest (V5) - booking declined
  const emailPropsGuestDeclined = {
    Template: EmailTemplateV5,
    email_to: guest_email || testingEmailGuest,
    subject: getEmailSubject("V5", {
      bookingCode,
      guest_first_name,
      guest_last_name,
    }),
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
    },
  };

  const { error: errorGuestEmail } = await sendEmail<EmailTemplatePropsV5>(
    emailPropsGuestDeclined,
  );
  if (errorGuestEmail) {
    console.log("Error sending decline email to guest:", errorGuestEmail);
  }

  // Email to Host (H5) - booking declined confirmation
  const emailPropsHostDeclined = {
    Template: EmailTemplateH5,
    email_to: hostEmail,
    subject: getEmailSubject("H5", {
      bookingCode,
      guest_first_name,
      guest_last_name,
    }),
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
    },
  };

  const { error: errorHostEmail } = await sendEmail<EmailTemplatePropsH5>(
    emailPropsHostDeclined,
  );
  if (errorHostEmail) {
    console.log("Error sending decline email to host:", errorHostEmail);
  }

  revalidatePath("/admin/bookings");
  return {
    data,
    error: null,
  };
}
