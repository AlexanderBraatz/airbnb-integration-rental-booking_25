// supabase/functions/send-scheduled-emails/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type ScheduledEmailRow = {
  id: string;
  to_email: string;
  subject: string;
  html: string | null;
  status: "pending" | "sending" | "sent" | "failed";
  attempts: number;
  send_at: string; // timestamptz
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM_EMAIL =
  Deno.env.get("RESEND_FROM") ?? "Acme <onboarding@resend.dev>";

const MAX_BATCH = 25;
const MAX_ATTEMPTS = 5;

function nextSendAtIso(attemptsAfterFailure: number): string {
  const now = Date.now();
  const mins =
    attemptsAfterFailure === 1
      ? 1
      : attemptsAfterFailure === 2
        ? 5
        : attemptsAfterFailure === 3
          ? 30
          : attemptsAfterFailure === 4
            ? 120
            : 240; // minutes
  return new Date(now + mins * 60_000).toISOString();
}

async function sendWithResend(args: {
  idempotencyKey: string;
  to: string;
  subject: string;
  html: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": args.idempotencyKey, // Resend idempotency  [oai_citation:3‡resend.com](https://resend.com/docs/api-reference/emails/send-email?utm_source=chatgpt.com)
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [args.to],
      subject: args.subject,
      html: args.html,
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.message ?? JSON.stringify(json) ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return json; // usually includes { id: "..." }
}

Deno.serve(async (req) => {
  // Optional: extra guard (cron should call with service role JWT).
  // Supabase Edge Functions verify JWT by default; using service_role key works.  [oai_citation:4‡Supabase](https://supabase.com/docs/guides/api/api-keys?utm_source=chatgpt.com)
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // 1) Fetch due pending
  const { data: due, error: dueErr } = await supabase
    .from("ScheduledEmails")
    .select("id,to_email,subject,html,status,attempts,send_at")
    .eq("status", "pending")
    .lte("send_at", new Date().toISOString())
    .order("send_at", { ascending: true })
    .limit(MAX_BATCH);

  if (dueErr) {
    console.error("Fetch due error:", dueErr);
    return new Response("Failed fetching due emails", { status: 500 });
  }
  if (!due || due.length === 0) {
    return new Response(JSON.stringify({ processed: 0 }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2) Claim them: set to 'sending' (only if still pending)
  const ids = due.map((r) => r.id);
  const { data: claimed, error: claimErr } = await supabase
    .from("ScheduledEmails")
    .update({ status: "sending" })
    .in("id", ids)
    .eq("status", "pending")
    .select("id,to_email,subject,html,attempts");

  if (claimErr) {
    console.error("Claim error:", claimErr);
    return new Response("Failed claiming emails", { status: 500 });
  }
  if (!claimed || claimed.length === 0) {
    return new Response(JSON.stringify({ processed: 0 }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  let sentCount = 0;
  let failedCount = 0;

  // 3) Send each claimed email
  for (const row of claimed as ScheduledEmailRow[]) {
    try {
      if (!row.html)
        throw new Error("Missing html content for scheduled email.");

      const resendResp = await sendWithResend({
        idempotencyKey: row.id, // stable per email => safe retries  [oai_citation:5‡resend.com](https://resend.com/blog/engineering-idempotency-keys?utm_source=chatgpt.com)
        to: row.to_email,
        subject: row.subject,
        html: row.html,
      });

      await supabase
        .from("ScheduledEmails")
        .update({
          status: "sent",
          resend_email_id: resendResp?.id ?? null,
          last_error: null,
        })
        .eq("id", row.id);

      sentCount++;
    } catch (err) {
      failedCount++;

      const attempts = (row.attempts ?? 0) + 1;
      const msg = err instanceof Error ? err.message : String(err);

      if (attempts >= MAX_ATTEMPTS) {
        await supabase
          .from("ScheduledEmails")
          .update({
            status: "failed",
            attempts,
            last_error: msg,
          })
          .eq("id", row.id);
      } else {
        await supabase
          .from("ScheduledEmails")
          .update({
            status: "pending",
            attempts,
            last_error: msg,
            send_at: nextSendAtIso(attempts),
          })
          .eq("id", row.id);
      }
    }
  }

  return new Response(
    JSON.stringify({ processed: claimed.length, sentCount, failedCount }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
});
