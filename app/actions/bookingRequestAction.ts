"use server";
import { ulid } from "ulid";
import { createClient } from "@/utils/supabase/server";

export async function bookingRequestAction(values: { guest_email: string }) {
  console.log("run on server");
  console.log(values);

  // const newBookingCode = createUniqueBookingCode();

  //write to database
  const dummyData = {
    booking_code:
      "we are just usnigt h id and obfucating it as a bookng code on the front end ",
    check_in_date: "2025-01-01",
    check_out_date: "2025-01-08",
    number_of_guests: 2,
    with_dog: false,
    guest_email: values.guest_email,
    guest_first_name: "Max",
    guest_last_name: "Test",
    guest_message: "I am excited to test this",
    guest_phone_number: "+49073939888",
    has_agreed_to_policies: true,
  };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Bookings")
    .insert(dummyData)
    .select("id, with_dog");
  if (error) {
    console.log("error", error);
  } else {
    console.log("data", data[0].id);

    const bookingCode = maskIdAsBookingCode(data[0].id);

    console.log(bookingCode);
  }

  //send email template-1-guest
  //send email template-1-host
  //respond "all has worked"
}

function maskIdAsBookingCode(id: number) {
  function toBase36(num: number): string {
    return num.toString(36).toUpperCase();
  }

  const masked =
    id ^ Number(process.env.SECRET_MASK_FOR_BOOKING_CODE_OBFUSCATION);
  const bookingCode = `BKG-${toBase36(masked)}`;
  return bookingCode;
}
