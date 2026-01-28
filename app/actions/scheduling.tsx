"use server";

/**
 * Scheduling system for delayed email sending
 *
 * This module handles scheduling emails to be sent at a future date/time.
 * Currently supports:
 * - V4: Guest check-in reminder (sent 1 day before check-in)
 * - H4: Host check-in reminder (sent 1 day before check-in)
 *
 * Scheduled emails are stored in the ScheduledEmails table and processed
 * by the Supabase Edge Function (send-scheduled-emails).
 */

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { render, pretty } from "@react-email/render";
import * as React from "react";

import { EmailTemplateV4, EmailTemplateH4 } from "@/components/email-template";

const scheduleEmailSchema = z.object({
  to_email: z.string().email(),
  subject: z.string().min(1),
  template: z.enum(["V4", "H4"]),
  template_props: z.object({
    check_in_date: z.string(),
    check_out_date: z.string(),
    number_of_guests: z.number(),
    with_dog: z.string(),
    guest_email: z.string(),
    guest_first_name: z.string(),
    guest_last_name: z.string(),
    guest_message: z.string(),
    guest_phone_number: z.string(),
    has_agreed_to_policies: z.string(),
    bookingCode: z.string(),
    price_snapshot_guest_payed_in_EURcents: z.string(),
  }),
  send_at: z.union([z.string().datetime(), z.date()]),
});

export type ScheduleEmailInput = z.infer<typeof scheduleEmailSchema>;

function getTemplateComponent(template: ScheduleEmailInput["template"]) {
  switch (template) {
    case "V4":
      return EmailTemplateV4;
    case "H4":
      return EmailTemplateH4;
    default:
      // should be impossible because zod enum restricts it
      throw new Error("Unknown template");
  }
}

export async function scheduleEmailAction(input: ScheduleEmailInput): Promise<{
  data: { id: string } | null;
  error: string | null;
}> {
  try {
    const safeInput = scheduleEmailSchema.parse(input);

    const sendAt =
      safeInput.send_at instanceof Date
        ? safeInput.send_at.toISOString()
        : safeInput.send_at;

    // 1) Render React Email -> HTML (store HTML for Edge Function)
    const Template = getTemplateComponent(safeInput.template);

    // render() returns HTML string; pretty() makes it readable (optional)
    const html = await pretty(
      await render(<Template {...safeInput.template_props} />),
    );

    // 2) Insert scheduled email row
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ScheduledEmails")
      .insert({
        to_email: safeInput.to_email,
        subject: safeInput.subject,
        template: safeInput.template,
        template_props: safeInput.template_props,
        html, // 👈 important
        send_at: sendAt,
        status: "pending",
      })
      .select("id")
      .maybeSingle();

    if (error || !data) {
      console.error("scheduleEmailAction insert error:", error);
      return { data: null, error: "Failed to schedule email." };
    }

    return { data, error: null };
  } catch (err) {
    console.error("scheduleEmailAction unexpected error:", err);
    return { data: null, error: "An unexpected error has occurred." };
  }
}
