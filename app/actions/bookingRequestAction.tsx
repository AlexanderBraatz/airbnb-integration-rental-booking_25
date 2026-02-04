"use server";
import { createClient, createServiceRoleClient } from "@/utils/supabase/server";
import {
  EmailTemplateV1,
  EmailTemplateH1,
  EmailTemplatePropsV1,
  EmailTemplatePropsH1,
} from "../../components/email-template";
import { Resend } from "resend";
import * as React from "react";
import { createBookingRequestSchema, BookingRequestFormTypes } from "../schema";
import { maskIdAsBookingCode } from "@/lib/utils";
import { getEmailSubject } from "@/lib/email-utils";
import { getHostConfigAction } from "./admindashboardActions";
const testingEmailHost = "alex_braatz@icloud.com";
const testingEmailGuest = "alex_braatz@icloud.com";

export async function bookingRequestAction(
  input: BookingRequestFormTypes,
): Promise<{ error: string } | undefined> {
  try {
    //validate the incoming data
    const safeInput = createBookingRequestSchema.parse(input);

    // write booking request data to database (service role bypasses RLS)
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from("Bookings")
      .insert(safeInput)
      .select("*");
    if (error) {
      console.log("error", error);
    } else {
      console.log("data", data[0].id);

      // selection and transformation f Booking data in preparation for sending emails
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

      // Get host email from config
      const hostConfig = await getHostConfigAction();
      const hostEmail =
        hostConfig.data?.host_business_email || testingEmailHost;

      // Send email to Host (H1) - new booking request notification
      const emailPropsHostNewBookingRequestNotification = {
        Template: EmailTemplateH1,
        email_to: hostEmail,
        subject: getEmailSubject("H1", {
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
          id,
        },
      };
      const { error: errorHostEmail } = await sendEmail<EmailTemplatePropsH1>(
        emailPropsHostNewBookingRequestNotification,
      );
      if (errorHostEmail) {
        console.log(errorHostEmail);
      }

      // Send email to Guest (V1) - booking request confirmation
      const emailPropsVisitorNotificationThatTheirEnquiryWasReceived = {
        Template: EmailTemplateV1,
        email_to: guest_email || testingEmailGuest,
        subject: getEmailSubject("V1", {
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
      const { error: errorGuestEmail } = await sendEmail<EmailTemplatePropsV1>(
        emailPropsVisitorNotificationThatTheirEnquiryWasReceived,
      );
      if (errorGuestEmail) {
        console.log(errorGuestEmail);
      }
    }
    //
  } catch (error) {
    console.log(error);
    //in production next.js blocks errors objects form getting passed to the client to prevent data leakage, so we send a sting instead
    // we might end up here if someone tries to use postman to post to the api, the zod validation would throw an error
    return { error: "An unexpected error has occurred." };
  }
  return;
  //respond "all has worked"
  //TODO:make these inserts with service key and add security to bookings table again.
}

export interface SendEmailArgTypes<EmailTemplateProps> {
  Template: React.FC<Readonly<EmailTemplateProps>>;
  email_to: string;
  subject: string;
  templateProps: Readonly<EmailTemplateProps>; // Ensures email data remains immutable after rendering, avoiding inconsistencies between the email and its source data.
}

export async function sendEmail<EmailT>(args: SendEmailArgTypes<EmailT>) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: `Sieben Gipfel Blick <no-reply@staging.alexanderbraatz.com>`,
      to: args.email_to,
      subject: args.subject,
      react: <args.Template {...args.templateProps} />,
    });
  } catch (error) {
    return { error: error };
  }
  return { error: null };
}

export async function setPayedPriceSnapshot(payedCents: number, id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Bookings")
    .update({
      price_snapshot_guest_payed_in_EURcents: payedCents,
      status: "paid",
    })
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) {
    console.error(
      "An Error occurred while trying to set the Payed Price on the Database",
      error,
    );
    return {
      data: null,
      error:
        "An Error occurred while trying to set the Payed Price on the Database",
    };
  } else {
    return {
      data,
      error: null,
    };
  }
}
