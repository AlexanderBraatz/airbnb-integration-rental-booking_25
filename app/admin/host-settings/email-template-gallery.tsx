"use client";

import { Button } from "@/components/ui/button";
import { MailIcon, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import {
  EmailTemplateV1,
  EmailTemplateH1,
  EmailTemplateV2,
  EmailTemplateH2,
  EmailTemplateV3,
  EmailTemplateH3,
  EmailTemplateV4,
  EmailTemplateH4,
  EmailTemplateV5,
  EmailTemplateH5,
} from "@/components/email-template";
import type {
  EmailTemplatePropsV1,
  EmailTemplatePropsH1,
  EmailTemplatePropsV2,
  EmailTemplatePropsV3,
  EmailTemplatePropsH5,
} from "@/components/email-template";

// Shared mock data for all templates (one booking/guest scenario)
const SHARED_MOCK = {
  check_in_date: "2025-06-15",
  check_out_date: "2025-06-22",
  number_of_guests: 4,
  with_dog: "yes",
  guest_email: "max.mustermann@example.com",
  guest_first_name: "Max",
  guest_last_name: "Mustermann",
  guest_message: "Wir freuen uns auf eine ruhige Woche mit Hund.",
  guest_phone_number: "+49 171 1234567",
  has_agreed_to_policies: "yes",
  bookingCode: "SGB-2025-ABC12",
  id: 42,
  price_snapshot_host_accepted_in_EURcents: "16988",
  price_snapshot_guest_payed_in_EURcents: "16988",
} as const;

type TemplateId =
  | "V1"
  | "H1"
  | "V2"
  | "H2"
  | "V3"
  | "H3"
  | "V4"
  | "H4"
  | "V5"
  | "H5";

const TEMPLATE_LIST: { id: TemplateId; heading: string }[] = [
  { id: "V1", heading: "V1 – Gast: Buchungsbestätigung (Anfrage eingegangen)" },
  { id: "H1", heading: "H1 – Host: Neue Buchungsanfrage" },
  { id: "V2", heading: "V2 – Gast: Zahlungsaufforderung (Link)" },
  { id: "H2", heading: "H2 – Host: Zahlungslink versendet" },
  { id: "V3", heading: "V3 – Gast: Zahlung erfolgreich" },
  { id: "H3", heading: "H3 – Host: Zahlung eingegangen" },
  { id: "V4", heading: "V4 – Gast: Check-in Erinnerung" },
  { id: "H4", heading: "H4 – Host: Check-in Erinnerung" },
  { id: "V5", heading: "V5 – Gast: Buchung abgelehnt" },
  { id: "H5", heading: "H5 – Host: Buchung abgelehnt (Bestätigung)" },
];

function getMockProps(id: TemplateId) {
  const base = { ...SHARED_MOCK };
  switch (id) {
    case "V1":
    case "V5":
      return base as EmailTemplatePropsV1;
    case "H1":
      return { ...base, id: base.id } as EmailTemplatePropsH1;
    case "V2":
    case "H2":
      return {
        ...base,
        price_snapshot_host_accepted_in_EURcents:
          base.price_snapshot_host_accepted_in_EURcents,
      } as EmailTemplatePropsV2;
    case "V3":
    case "H3":
    case "V4":
    case "H4":
      return {
        ...base,
        price_snapshot_guest_payed_in_EURcents:
          base.price_snapshot_guest_payed_in_EURcents,
      } as EmailTemplatePropsV3;
    case "H5":
      return base as EmailTemplatePropsH5;
    default:
      return base as EmailTemplatePropsV1;
  }
}

const TEMPLATE_COMPONENTS: Record<
  TemplateId,
  React.FC<Readonly<Record<string, unknown>>>
> = {
  V1: EmailTemplateV1 as React.FC<Readonly<Record<string, unknown>>>,
  H1: EmailTemplateH1 as React.FC<Readonly<Record<string, unknown>>>,
  V2: EmailTemplateV2 as React.FC<Readonly<Record<string, unknown>>>,
  H2: EmailTemplateH2 as React.FC<Readonly<Record<string, unknown>>>,
  V3: EmailTemplateV3 as React.FC<Readonly<Record<string, unknown>>>,
  H3: EmailTemplateH3 as React.FC<Readonly<Record<string, unknown>>>,
  V4: EmailTemplateV4 as React.FC<Readonly<Record<string, unknown>>>,
  H4: EmailTemplateH4 as React.FC<Readonly<Record<string, unknown>>>,
  V5: EmailTemplateV5 as React.FC<Readonly<Record<string, unknown>>>,
  H5: EmailTemplateH5 as React.FC<Readonly<Record<string, unknown>>>,
};

function EmailTemplateGallery() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="mt-10 border-t pt-8">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium"
      >
        <MailIcon className="size-4" />
        Email-Vorlagen Galerie
      </button>
      {isOpen && (
        <div className="mt-6 space-y-6">
          <h2 className="text-foreground text-xl font-semibold">
            Alle E-Mail-Vorlagen (Vorschau mit Beispieldaten)
          </h2>
          <ListOfEmailTemplates />
        </div>
      )}
    </section>
  );
}

function ListOfEmailTemplates() {
  const [expandedId, setExpandedId] = useState<TemplateId | null>(null);

  return (
    <ul className="space-y-4">
      {TEMPLATE_LIST.map(({ id, heading }) => {
        const isExpanded = expandedId === id;
        const Component = TEMPLATE_COMPONENTS[id];
        const props = getMockProps(id);

        return (
          <li
            key={id}
            className="border-border bg-card text-card-foreground rounded-lg border shadow-sm"
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <h3 className="text-base font-medium">{heading}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedId(isExpanded ? null : id)}
                className="shrink-0"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="size-4" />
                    Schließen
                  </>
                ) : (
                  <>
                    <ChevronDown className="size-4" />
                    Vorschau
                  </>
                )}
              </Button>
            </div>
            {isExpanded && (
              <div className="border-border bg-muted/30 border-t p-4">
                <div className="border-border bg-background mx-auto max-w-[600px] overflow-hidden rounded-md border shadow-inner">
                  <Component {...props} />
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default EmailTemplateGallery;
