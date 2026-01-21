import {
  sendEmail,
  setPayedPriceSnapshot,
} from "@/app/actions/bookingRequestAction";
import { scheduleEmailAction } from "@/app/actions/scheduling";
import { EmailTemplateH3 } from "@/components/email-template";
import { stripe } from "@/lib/stripe";
import { maskIdAsBookingCode } from "@/lib/utils";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export interface EmailTemplatePropsV3andH3 {
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
  price_snapshot_guest_payed_in_EURcents: string;
}

export async function POST(request: NextRequest) {
  console.log("------->  route has run after stripe event");
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error(`STRIPE_WEBHOOK_SECRET is not defined`);
    }
    if (!signature) {
      throw new Error("signature was missing fromRequest headers");
    }
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      console.log("Payment successful", event);
      console.log(
        "the amount payed in Euro Cents:",
        event.data.object.amount_total,
      );
      if (
        event.data.object.amount_total &&
        event.data.object.client_reference_id
      ) {
        const { data, error } = await setPayedPriceSnapshot(
          event.data.object.amount_total,
          Number(event.data.object.client_reference_id),
        );
        if (error) {
          throw error;
        } else if (data) {
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
            price_snapshot_guest_payed_in_EURcents,
            id,
          } = data;
          const bookingCode = maskIdAsBookingCode(id);

          const testingEmailHost = "alex_braatz@icloud.com";
          const testingEmailGuest = "alex_braatz@icloud.com";

          const emailPropsGuestHasPayed = {
            Template: EmailTemplateH3,
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
              price_snapshot_guest_payed_in_EURcents: String(
                price_snapshot_guest_payed_in_EURcents,
              ),
            },
          };

          const { error: errorVisitoEmail } =
            await sendEmail<EmailTemplatePropsV3andH3>(emailPropsGuestHasPayed);
          await scheduleEmailAction({
            to_email: testingEmailHost,
            subject: "New booking request",
            template: "H4",
            template_props: {
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
              price_snapshot_guest_payed_in_EURcents:
                price_snapshot_guest_payed_in_EURcents
                  ? String(price_snapshot_guest_payed_in_EURcents)
                  : "",
            },
            send_at: new Date(Date.now() + 10 * 60 * 1000),
            // after testing it shoudl send one day before check in date
            // send_at: subtractOneDay(check_in_date)
          });
        }
      }
      //DO follow up actions here
      // use amount total to set price_snapshot_guest_payed_in_EURcents
      //
    }
    return NextResponse.json(
      { received: true },

      { status: 200 },
    );
  } catch (err



  ) {
    if (err) {
      console.error(`Webhook Error: ${err}`);
      return NextResponse.json({ error: err }, { status: 400 });
    }
  }
}

// exaple event that i recived
// Payment successful {
//   id: 'evt_1SpTz6KYMtYob4lDCLeLvqnR',
//   object: 'event',
//   api_version: '2025-09-30.clover',
//   created: 1768396779,
//   data: {
//     object: {
//       id: 'cs_live_a1APGeKX4fzyPQ1bzjKZfccgI4bKrHCp0xHxc2oosr2NW9IF0aYKLb6bw1',
//       object: 'checkout.session',
//       adaptive_pricing: [Object],
//       after_expiration: null,
//       allow_promotion_codes: null,
//       amount_subtotal: 45,
//       amount_total: 45,
//       automatic_tax: [Object],
//       billing_address_collection: null,
//       branding_settings: [Object],
//       cancel_url: null,
//       client_reference_id: null,
//       client_secret: null,
//       collected_information: null,
//       consent: null,
//       consent_collection: null,
//       created: 1768396710,
//       currency: 'eur',
//       currency_conversion: null,
//       custom_fields: [],
//       custom_text: [Object],
//       customer: null,
//       customer_account: null,
//       customer_creation: 'if_required',
//       customer_details: [Object],
//       customer_email: null,
//       discounts: [],
//       expires_at: 1768483110,
//       invoice: null,
//       invoice_creation: [Object],
//       livemode: true,
//       locale: null,
//       metadata: {},
//       mode: 'payment',
//       origin_context: null,
//       payment_intent: 'pi_3SpTz4KYMtYob4lD12wcAXJl',
//       payment_link: null,
//       payment_method_collection: 'if_required',
//       payment_method_configuration_details: [Object],
//       payment_method_options: [Object],
//       payment_method_types: [Array],
//       payment_status: 'paid',
//       permissions: null,
//       phone_number_collection: [Object],
//       recovered_from: null,
//       redirect_on_completion: 'always',
//       return_url: 'http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}',
//       saved_payment_method_options: null,
//       setup_intent: null,
//       shipping_address_collection: null,
//       shipping_cost: null,
//       shipping_options: [],
//       status: 'complete',
//       submit_type: null,
//       subscription: null,
//       success_url: null,
//       total_details: [Object],
//       ui_mode: 'embedded',
//       url: null,
//       wallet_options: null
//     }
//   },
//   livemode: true,
//   pending_webhooks: 2,
//   request: { id: null, idempotency_key: null },
//   type: 'checkout.session.completed'
// }
