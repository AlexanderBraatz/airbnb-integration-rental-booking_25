"use server";

import { headers } from "next/headers";

import { stripe } from "../../lib/stripe";
import { getBookingFromIdAction } from "./admindashboardActions";

export async function fetchClientSecret(orderId: number) {
  const origin = (await headers()).get("origin");

  const response = await getBookingFromIdAction(orderId);
  if (
    response &&
    response.data &&
    response.data.price_snapshot_host_accepted_in_EURcents
  ) {
    console.log(response.data.price_snapshot_host_accepted_in_EURcents);

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      client_reference_id: String(orderId),
      line_items: [
        {
          quantity: 1,
          price_data: {
            unit_amount: Number(
              response.data.price_snapshot_host_accepted_in_EURcents,
            ),
            currency: "eur",
            product_data: {
              name: "testing",
              description: "code could go here",
            },
          },
          //below is a test product
          // price: "price_1SE6VYKYMtYob4lDtPL8HAMV",
          // quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    if (!session.client_secret)
      throw new Error("Stripe did not return a client secret");
    return session.client_secret as string;
  } else {
    console.log(response.error);
    throw new Error(
      "An Error has occurred while trying to set up the stripe client secret",
    );
  }
}
