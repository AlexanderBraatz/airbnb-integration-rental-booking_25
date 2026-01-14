import { redirect } from "next/navigation";

import { stripe } from "@/lib/stripe";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Return({ searchParams }: PageProps) {
  const params = await searchParams;
  // Normalize to a single string
  const session_id =
    typeof params.session_id === "string"
      ? params.session_id
      : Array.isArray(params.session_id)
        ? params.session_id[0]
        : undefined;

  if (!session_id)
    throw new Error("Please provide a valid session_is (`cs_test_....`)");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const status = session.status; // 'open' | 'complete' | 'expired' | null
  const customerEmail = session.customer_details?.email ?? "";

  if (status === "open") {
    return redirect("/payment-uncompleted");
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
        </p>
        <a href="mailto:orders@example.com">oreders@example.com</a>
      </section>
    );
  }
}
