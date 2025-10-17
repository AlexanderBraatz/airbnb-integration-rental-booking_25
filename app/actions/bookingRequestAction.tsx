"use server";
import { createClient } from "@/utils/supabase/server";
import { EmailTemplate } from "../../components/email-template";
import { Resend } from "resend";
import * as React from "react";

export async function bookingRequestAction(values: { guest_email: string }) {
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
  // write booking request data to database
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Bookings")
    .insert(dummyData)
    .select("*");
  if (error) {
    console.log("error", error);
  } else {
    console.log("data", data[0].id);

    // selection and transformation of Booking data in preparation for sending emails
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
      id,
    } = data[0];

    const bookingCode = maskIdAsBookingCode(id);

    const emailProps = {
      Template: EmailTemplate,
      email_to: "test@icloud.com",
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
    // sending 1st email to visitor to confirm that their booking request was received
    const { error } = await sendEmail(emailProps);
    if (error) {
      console.log(error);
    }
    console.log(bookingCode);
  }

  //send email template-1-guest

  // resend.send(template, bookingCode, guest_first_name, guest_last_name, all the other sin s list );

  //send email template-1-host
  //respond "all has worked"
  //TODO:make these inserts with service key and add security to bookings table again.
}

//
//
// -- helper functions -- extract as needed later
//
//

function maskIdAsBookingCode(id: number) {
  function toBase36(num: number): string {
    return num.toString(36).toUpperCase();
  }
  const masked =
    id ^ Number(process.env.SECRET_MASK_FOR_BOOKING_CODE_OBFUSCATION);
  const bookingCode = `BKG-${toBase36(masked)}`;
  return bookingCode;
}

interface EmailTemplateProps {
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
}

interface sendEmailArgTypes {
  Template: React.FC<Readonly<EmailTemplateProps>>;
  email_to: string;
  templateProps: Readonly<EmailTemplateProps>; // Ensures email data remains immutable after rendering, avoiding inconsistencies between the email and its source data.
}

async function sendEmail(args: sendEmailArgTypes) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: args.email_to,
      subject: "Hello world",
      react: <args.Template {...args.templateProps} />,
    });
  } catch (error) {
    return { error: error };
  }
  return { error: null };
}
