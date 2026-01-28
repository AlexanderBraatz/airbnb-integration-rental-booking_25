import * as React from "react";
import { EmailLayout } from "./email/EmailLayout";
import { formatPrice, formatDate } from "@/lib/email-utils";

// ============================================================================
// Unique Prop Types for Each Email Template
// ============================================================================

// V1 - Guest booking request confirmation
export interface EmailTemplatePropsV1 {
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

// H1 - Host new booking notification (extends V1 + id)
export interface EmailTemplatePropsH1 extends EmailTemplatePropsV1 {
  id: number;
}

// V2 - Guest payment request (includes price + bookingCode)
export interface EmailTemplatePropsV2 {
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
  price_snapshot_host_accepted_in_EURcents: string;
}

// H2 - Host payment link sent confirmation (includes price)
export interface EmailTemplatePropsH2 {
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
  price_snapshot_host_accepted_in_EURcents: string;
}

// V3 - Guest payment success (includes price)
export interface EmailTemplatePropsV3 {
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

// H3 - Host payment success (includes price)
export interface EmailTemplatePropsH3 {
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

// V4 - Guest check-in reminder (includes all booking details)
export interface EmailTemplatePropsV4 {
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

// H4 - Host check-in reminder (includes all booking details)
export interface EmailTemplatePropsH4 {
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

// V5 - Guest booking declined
export interface EmailTemplatePropsV5 {
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

// H5 - Host booking declined confirmation
export interface EmailTemplatePropsH5 {
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

// V1 - Guest booking request confirmation
export const EmailTemplateV1: React.FC<Readonly<EmailTemplatePropsV1>> = ({
  check_in_date,
  check_out_date,
  number_of_guests,
  with_dog,
  guest_first_name,
  guest_last_name,
  bookingCode,
}) => (
  <EmailLayout>
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          color: "#3d3638",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "0",
        }}
      >
        Guten Tag {guest_first_name} {guest_last_name}!
      </h1>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Vielen Dank für Ihre Buchungsanfrage! Wir haben Ihre Anfrage erhalten
        und werden diese innerhalb der nächsten 48 Stunden prüfen.
      </p>

      <div
        style={{
          backgroundColor: "#f5ebe9",
          padding: "20px",
          borderRadius: "8px",
          margin: "25px 0",
          border: "2px solid #6d7ca7",
        }}
      >
        <p
          style={{
            margin: "0 0 10px 0",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#3d3638",
          }}
        >
          Ihr Buchungscode:
        </p>
        <p
          style={{
            margin: "0",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#6d7ca7",
            letterSpacing: "2px",
          }}
        >
          {bookingCode}
        </p>
        <p
          style={{
            margin: "15px 0 0 0",
            fontSize: "12px",
            color: "#554f51",
          }}
        >
          Bitte bewahren Sie diesen Code für Ihre Unterlagen auf.
        </p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2
          style={{
            color: "#3d3638",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          Ihre Buchungsdetails:
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                  width: "40%",
                }}
              >
                <strong>Check-in:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_in_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-out:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_out_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Anzahl Gäste:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {number_of_guests}
              </td>
            </tr>
            {with_dog === "yes" && (
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Mit Hund:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  Ja
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Wir werden uns in Kürze bei Ihnen melden, um Ihre Buchung zu bestätigen.
        Sollten Sie in der Zwischenzeit Fragen haben, zögern Sie bitte nicht,
        uns zu kontaktieren.
      </p>

      <p
        style={{
          color: "#3d3638",
          fontSize: "16px",
          lineHeight: "1.6",
          marginTop: "25px",
        }}
      >
        Mit freundlichen Grüßen,
        <br />
        <strong>Das Team von Sieben Gipfel Blick</strong>
      </p>
    </div>
  </EmailLayout>
);

// H1 - Host new booking notification
export const EmailTemplateH1: React.FC<Readonly<EmailTemplatePropsH1>> = ({
  check_in_date,
  check_out_date,
  number_of_guests,
  with_dog,
  guest_email,
  guest_first_name,
  guest_last_name,
  guest_message,
  guest_phone_number,
  bookingCode,
  id,
}) => (
  <EmailLayout>
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          color: "#3d3638",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "0",
        }}
      >
        Neue Buchungsanfrage erhalten
      </h1>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Sie haben eine neue Buchungsanfrage erhalten. Bitte prüfen Sie die
        Details und bestätigen oder lehnen Sie die Anfrage ab.
      </p>

      <div
        style={{
          backgroundColor: "#f5ebe9",
          padding: "25px",
          borderRadius: "8px",
          margin: "25px 0",
        }}
      >
        <h2
          style={{
            color: "#3d3638",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "20px",
          }}
        >
          Buchungsdetails
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "15px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                  width: "40%",
                }}
              >
                <strong>Buchungscode:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#6d7ca7",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {bookingCode}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-in:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_in_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-out:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_out_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Anzahl Gäste:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {number_of_guests}
              </td>
            </tr>
            {with_dog === "yes" && (
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Mit Hund:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  Ja
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div
          style={{
            borderTop: "1px solid #ccbfb2",
            paddingTop: "15px",
            marginTop: "15px",
          }}
        >
          <h3
            style={{
              color: "#3d3638",
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Gästedaten:
          </h3>
          <p style={{ margin: "5px 0", color: "#3d3638", fontSize: "14px" }}>
            <strong>Name:</strong> {guest_first_name} {guest_last_name}
          </p>
          <p style={{ margin: "5px 0", color: "#3d3638", fontSize: "14px" }}>
            <strong>E-Mail:</strong> {guest_email}
          </p>
          {guest_phone_number && (
            <p style={{ margin: "5px 0", color: "#3d3638", fontSize: "14px" }}>
              <strong>Telefon:</strong> {guest_phone_number}
            </p>
          )}
          {guest_message && (
            <div style={{ marginTop: "10px" }}>
              <p
                style={{
                  margin: "5px 0 5px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Nachricht vom Gast:
              </p>
              <p
                style={{
                  margin: "5px 0",
                  color: "#554f51",
                  fontSize: "14px",
                  fontStyle: "italic",
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                }}
              >
                {guest_message}
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <a
          href={`${process.env.SITE_BASE_URL || "http://localhost:3000"}/admin/bookings/${id}`}
          style={{
            display: "inline-block",
            backgroundColor: "#6d7ca7",
            color: "#ffffff",
            padding: "15px 30px",
            textDecoration: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Buchungsanfrage prüfen
        </a>
      </div>

      <p
        style={{
          color: "#554f51",
          fontSize: "14px",
          fontStyle: "italic",
          marginTop: "25px",
        }}
      >
        Bitte bearbeiten Sie diese Anfrage innerhalb von 48 Stunden.
      </p>
    </div>
  </EmailLayout>
);

// V2 - Guest payment request
export const EmailTemplateV2: React.FC<Readonly<EmailTemplatePropsV2>> = ({
  check_in_date,
  check_out_date,
  number_of_guests,
  with_dog,
  guest_first_name,
  guest_last_name,
  bookingCode,
  price_snapshot_host_accepted_in_EURcents,
}) => (
  <EmailLayout>
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          color: "#3d3638",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "0",
        }}
      >
        Ihre Buchung wurde bestätigt!
      </h1>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Guten Tag {guest_first_name} {guest_last_name},
      </p>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        wir freuen uns, Ihnen mitteilen zu können, dass Ihre Buchungsanfrage
        bestätigt wurde! Um Ihre Buchung abzuschließen, bitten wir Sie, den
        Gesamtbetrag zu begleichen.
      </p>

      <div
        style={{
          backgroundColor: "#f5ebe9",
          padding: "25px",
          borderRadius: "8px",
          margin: "25px 0",
          border: "2px solid #6d7ca7",
        }}
      >
        <h2
          style={{
            color: "#3d3638",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "20px",
          }}
        >
          Buchungsübersicht
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Buchungscode:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#6d7ca7",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {bookingCode}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-in:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_in_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-out:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_out_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Anzahl Gäste:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {number_of_guests}
              </td>
            </tr>
            {with_dog === "yes" && (
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Mit Hund:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  Ja
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div
          style={{
            borderTop: "2px solid #6d7ca7",
            paddingTop: "15px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "#3d3638",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Gesamtbetrag:
            </span>
            <span
              style={{
                color: "#6d7ca7",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {formatPrice(price_snapshot_host_accepted_in_EURcents)}
            </span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "35px 0" }}>
        <a
          href={`${process.env.SITE_BASE_URL || "http://localhost:3000"}/payment/${bookingCode}`}
          style={
            {
              display: "inline-block",
              backgroundColor: "#bc0c38",
              color: "#ffffff",
              padding: "18px 40px",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "18px",
              fontWeight: "bold",
              border: "2px solid #9b203f",
              WebkitTextSizeAdjust: "100%",
            } as React.CSSProperties
          }
        >
          Jetzt bezahlen
        </a>
      </div>

      <p
        style={{
          color: "#554f51",
          fontSize: "14px",
          marginTop: "25px",
          lineHeight: "1.6",
        }}
      >
        <strong>Wichtig:</strong> Bitte begleichen Sie den Betrag innerhalb von
        7 Tagen, um Ihre Buchung zu sichern. Nach erfolgreicher Zahlung erhalten
        Sie eine Bestätigungs-E-Mail.
      </p>

      <p
        style={{
          color: "#3d3638",
          fontSize: "16px",
          lineHeight: "1.6",
          marginTop: "25px",
        }}
      >
        Wir freuen uns auf Ihren Besuch!
        <br />
        <strong>Das Team von Sieben Gipfel Blick</strong>
      </p>
    </div>
  </EmailLayout>
);

// H2 - Host payment link sent confirmation
export const EmailTemplateH2: React.FC<Readonly<EmailTemplatePropsH2>> = ({
  check_in_date,
  check_out_date,
  number_of_guests,
  with_dog,
  guest_email,
  guest_first_name,
  guest_last_name,
  bookingCode,
  price_snapshot_host_accepted_in_EURcents,
}) => (
  <EmailLayout>
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          color: "#3d3638",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "0",
        }}
      >
        Zahlungslink gesendet
      </h1>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Der Zahlungslink wurde erfolgreich an den Gast gesendet. Die Buchung
        wartet nun auf die Zahlung.
      </p>

      <div
        style={{
          backgroundColor: "#f5ebe9",
          padding: "25px",
          borderRadius: "8px",
          margin: "25px 0",
        }}
      >
        <h2
          style={{
            color: "#3d3638",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "20px",
          }}
        >
          Buchungsdetails
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "15px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                  width: "40%",
                }}
              >
                <strong>Buchungscode:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#6d7ca7",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {bookingCode}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Gast:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {guest_first_name} {guest_last_name}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>E-Mail:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {guest_email}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-in:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_in_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-out:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_out_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Anzahl Gäste:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {number_of_guests}
              </td>
            </tr>
            {with_dog === "yes" && (
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Mit Hund:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  Ja
                </td>
              </tr>
            )}
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Betrag:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#6d7ca7",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {formatPrice(price_snapshot_host_accepted_in_EURcents)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p
        style={{
          color: "#554f51",
          fontSize: "14px",
          marginTop: "25px",
          lineHeight: "1.6",
        }}
      >
        Sie werden benachrichtigt, sobald der Gast die Zahlung abgeschlossen
        hat.
      </p>
    </div>
  </EmailLayout>
);

// V3 - Guest payment success
export const EmailTemplateV3: React.FC<Readonly<EmailTemplatePropsV3>> = ({
  check_in_date,
  check_out_date,
  number_of_guests,
  with_dog,
  guest_first_name,
  guest_last_name,
  bookingCode,
  price_snapshot_guest_payed_in_EURcents,
}) => (
  <EmailLayout>
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          color: "#3d3638",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "0",
        }}
      >
        Zahlung erfolgreich!
      </h1>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Guten Tag {guest_first_name} {guest_last_name},
      </p>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        vielen Dank für Ihre Zahlung! Ihre Buchung ist nun vollständig
        bestätigt. Wir freuen uns sehr, Sie als unsere Gäste begrüßen zu dürfen.
      </p>

      <div
        style={{
          backgroundColor: "#f5ebe9",
          padding: "25px",
          borderRadius: "8px",
          margin: "25px 0",
          border: "2px solid #6d7ca7",
        }}
      >
        <h2
          style={{
            color: "#3d3638",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "20px",
          }}
        >
          Zahlungsbestätigung
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "1px solid #ccbfb2",
          }}
        >
          <span
            style={{
              color: "#3d3638",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Bezahlter Betrag:
          </span>
          <span
            style={{
              color: "#6d7ca7",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {formatPrice(price_snapshot_guest_payed_in_EURcents)}
          </span>
        </div>

        <p
          style={{
            color: "#554f51",
            fontSize: "14px",
            margin: "0",
            fontStyle: "italic",
          }}
        >
          Eine detaillierte Rechnung erhalten Sie in einer separaten E-Mail.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#ebe3e1",
          padding: "20px",
          borderRadius: "8px",
          margin: "25px 0",
        }}
      >
        <h2
          style={{
            color: "#3d3638",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "15px",
          }}
        >
          Ihre Buchungsdetails
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                  width: "40%",
                }}
              >
                <strong>Buchungscode:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#6d7ca7",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {bookingCode}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-in:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_in_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-out:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_out_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Anzahl Gäste:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {number_of_guests}
              </td>
            </tr>
            {with_dog === "yes" && (
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Mit Hund:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  Ja
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Ihre Buchung ist bestätigt! Wir werden Sie rechtzeitig vor Ihrem
        Aufenthalt mit weiteren Informationen kontaktieren.
      </p>

      <p
        style={{
          color: "#3d3638",
          fontSize: "16px",
          lineHeight: "1.6",
          marginTop: "25px",
        }}
      >
        Wir freuen uns auf Ihren Besuch!
        <br />
        <strong>Das Team von Sieben Gipfel Blick</strong>
      </p>
    </div>
  </EmailLayout>
);

// H3 - Host payment success
export const EmailTemplateH3: React.FC<Readonly<EmailTemplatePropsH3>> = ({
  check_in_date,
  check_out_date,
  number_of_guests,
  with_dog,
  guest_email,
  guest_first_name,
  guest_last_name,
  guest_phone_number,
  bookingCode,
  price_snapshot_guest_payed_in_EURcents,
}) => (
  <EmailLayout>
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          color: "#3d3638",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "0",
        }}
      >
        Zahlung erhalten
      </h1>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Gute Nachrichten! Der Gast hat die Zahlung erfolgreich abgeschlossen.
        Die Buchung ist nun vollständig bestätigt.
      </p>

      <div
        style={{
          backgroundColor: "#f5ebe9",
          padding: "25px",
          borderRadius: "8px",
          margin: "25px 0",
          border: "2px solid #6d7ca7",
        }}
      >
        <h2
          style={{
            color: "#3d3638",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "20px",
          }}
        >
          Zahlungsinformationen
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "2px solid #6d7ca7",
          }}
        >
          <span
            style={{
              color: "#3d3638",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Erhaltener Betrag:
          </span>
          <span
            style={{
              color: "#6d7ca7",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {formatPrice(price_snapshot_guest_payed_in_EURcents)}
          </span>
        </div>

        <h3
          style={{
            color: "#3d3638",
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "15px",
            marginTop: "20px",
          }}
        >
          Gästedaten
        </h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                  width: "40%",
                }}
              >
                <strong>Buchungscode:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#6d7ca7",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {bookingCode}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Name:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {guest_first_name} {guest_last_name}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>E-Mail:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {guest_email}
              </td>
            </tr>
            {guest_phone_number && (
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Telefon:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  {guest_phone_number}
                </td>
              </tr>
            )}
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-in:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_in_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-out:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_out_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Anzahl Gäste:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {number_of_guests}
              </td>
            </tr>
            {with_dog === "yes" && (
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Mit Hund:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  Ja
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p
        style={{
          color: "#3d3638",
          fontSize: "16px",
          lineHeight: "1.6",
          marginTop: "25px",
        }}
      >
        Die Buchung ist vollständig bestätigt und bezahlt. Sie werden einen Tag
        vor dem Check-in eine Erinnerung erhalten.
      </p>
    </div>
  </EmailLayout>
);

// H4 - Host check-in reminder
export const EmailTemplateH4: React.FC<Readonly<EmailTemplatePropsH4>> = ({
  check_in_date,
  check_out_date,
  number_of_guests,
  with_dog,
  guest_email,
  guest_first_name,
  guest_last_name,
  guest_phone_number,
  bookingCode,
}) => (
  <EmailLayout>
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          color: "#3d3638",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "0",
        }}
      >
        Gastankunft morgen
      </h1>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Ihre Gäste treffen morgen ein. Bitte stellen Sie sicher, dass alles für
        den Check-in vorbereitet ist.
      </p>

      <div
        style={{
          backgroundColor: "#f5ebe9",
          padding: "25px",
          borderRadius: "8px",
          margin: "25px 0",
          border: "2px solid #6d7ca7",
        }}
      >
        <h2
          style={{
            color: "#3d3638",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "20px",
          }}
        >
          Gästedaten
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "15px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                  width: "40%",
                }}
              >
                <strong>Buchungscode:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#6d7ca7",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {bookingCode}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Name:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {guest_first_name} {guest_last_name}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>E-Mail:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {guest_email}
              </td>
            </tr>
            {guest_phone_number && (
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Telefon:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  {guest_phone_number}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div
          style={{
            borderTop: "1px solid #ccbfb2",
            paddingTop: "15px",
            marginTop: "15px",
          }}
        >
          <h3
            style={{
              color: "#3d3638",
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Aufenthaltsdaten
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                    width: "40%",
                  }}
                >
                  <strong>Check-in:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  {formatDate(check_in_date)} ab 15:00 Uhr
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Check-out:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  {formatDate(check_out_date)} bis 11:00 Uhr
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Anzahl Gäste:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  {number_of_guests}
                </td>
              </tr>
              {with_dog === "yes" && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      color: "#554f51",
                      fontSize: "14px",
                    }}
                  >
                    <strong>Mit Hund:</strong>
                  </td>
                  <td
                    style={{
                      padding: "8px 0",
                      color: "#3d3638",
                      fontSize: "14px",
                    }}
                  >
                    Ja
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#ebe3e1",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "25px",
        }}
      >
        <h3
          style={{
            color: "#3d3638",
            fontSize: "18px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "10px",
          }}
        >
          Checkliste für den Check-in
        </h3>
        <ul
          style={{
            color: "#3d3638",
            fontSize: "14px",
            lineHeight: "1.8",
            paddingLeft: "20px",
            margin: "0",
          }}
        >
          <li>Unterkunft ist sauber und bereit</li>
          <li>Schlüssel sind vorbereitet</li>
          <li>Alle wichtigen Informationen sind zugänglich</li>
          <li>Kontaktdaten für Notfälle sind verfügbar</li>
        </ul>
      </div>

      <p
        style={{
          color: "#554f51",
          fontSize: "14px",
          marginTop: "25px",
          lineHeight: "1.6",
        }}
      >
        Die Gäste wurden über alle wichtigen Informationen informiert. Wir
        wünschen Ihnen einen reibungslosen Check-in!
      </p>
    </div>
  </EmailLayout>
);

// V4 - Guest check-in reminder with property information
export const EmailTemplateV4: React.FC<Readonly<EmailTemplatePropsV4>> = ({
  check_in_date,
  check_out_date,
  number_of_guests,
  with_dog,
  guest_first_name,
  guest_last_name,
  bookingCode,
}) => (
  <EmailLayout>
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          color: "#3d3638",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "0",
        }}
      >
        Ihr Aufenthalt beginnt bald!
      </h1>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Guten Tag {guest_first_name} {guest_last_name},
      </p>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        wir freuen uns sehr, Sie morgen als unsere Gäste begrüßen zu dürfen!
        Hier finden Sie alle wichtigen Informationen für Ihren Aufenthalt.
      </p>

      <div
        style={{
          backgroundColor: "#f5ebe9",
          padding: "25px",
          borderRadius: "8px",
          margin: "25px 0",
          border: "2px solid #6d7ca7",
        }}
      >
        <h2
          style={{
            color: "#3d3638",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "20px",
          }}
        >
          Ihre Buchungsdetails
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "15px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                  width: "40%",
                }}
              >
                <strong>Buchungscode:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#6d7ca7",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {bookingCode}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-in:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_in_date)} ab 15:00 Uhr
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-out:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_out_date)} bis 11:00 Uhr
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Anzahl Gäste:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {number_of_guests}
              </td>
            </tr>
            {with_dog === "yes" && (
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Mit Hund:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  Ja
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2
          style={{
            color: "#3d3638",
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          Check-in Informationen
        </h2>

        <div
          style={{
            backgroundColor: "#ebe3e1",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              color: "#3d3638",
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "0",
              marginBottom: "10px",
            }}
          >
            Ankunft & Schlüsselübergabe
          </h3>
          <p style={{ color: "#3d3638", fontSize: "14px", lineHeight: "1.6" }}>
            <strong>Check-in Zeit:</strong> Ab 15:00 Uhr
            <br />
            <strong>Check-out Zeit:</strong> Bis 11:00 Uhr
          </p>
          <p
            style={{
              color: "#554f51",
              fontSize: "14px",
              lineHeight: "1.6",
              marginTop: "10px",
            }}
          >
            Die genauen Details zur Schlüsselübergabe erhalten Sie per separater
            Nachricht oder finden Sie in Ihrer Buchungsbestätigung. Bitte
            kontaktieren Sie uns rechtzeitig, falls Sie eine frühere Ankunft
            planen.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#ebe3e1",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              color: "#3d3638",
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "0",
              marginBottom: "10px",
            }}
          >
            Ausstattung & Highlights
          </h3>
          <ul
            style={{
              color: "#3d3638",
              fontSize: "14px",
              lineHeight: "1.8",
              paddingLeft: "20px",
            }}
          >
            <li>Panoramablick auf die Alpen und Zugspitze</li>
            <li>Zwei Balkone mit atemberaubender Aussicht</li>
            <li>Voll ausgestattete Küche</li>
            <li>Kostenloses WLAN</li>
            <li>Parkplatz verfügbar</li>
            <li>Zentrale Lage in Garmisch-Partenkirchen</li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: "#ebe3e1",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              color: "#3d3638",
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "0",
              marginBottom: "10px",
            }}
          >
            Wichtige Hinweise
          </h3>
          <ul
            style={{
              color: "#3d3638",
              fontSize: "14px",
              lineHeight: "1.8",
              paddingLeft: "20px",
            }}
          >
            <li>
              Bitte beachten Sie die Hausordnung und respektieren Sie die
              Nachbarn
            </li>
            <li>Rauchen ist in der gesamten Unterkunft nicht gestattet</li>
            <li>Haustiere sind nur nach vorheriger Absprache erlaubt</li>
            <li>
              Bei Fragen oder Problemen stehen wir Ihnen jederzeit zur Verfügung
            </li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: "#ebe3e1",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              color: "#3d3638",
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "0",
              marginBottom: "10px",
            }}
          >
            Empfehlungen für Ihren Aufenthalt
          </h3>
          <p style={{ color: "#3d3638", fontSize: "14px", lineHeight: "1.6" }}>
            Garmisch-Partenkirchen bietet zahlreiche Aktivitäten: Wandern in den
            Alpen, Skifahren im Winter, Besuch der Partnachklamm oder eine Fahrt
            mit der Zugspitzbahn. Die Innenstadt mit ihren Geschäften und
            Restaurants ist fußläufig erreichbar.
          </p>
        </div>
      </div>

      <p
        style={{
          color: "#3d3638",
          fontSize: "16px",
          lineHeight: "1.6",
          marginTop: "30px",
        }}
      >
        Wir wünschen Ihnen bereits jetzt einen wunderbaren Aufenthalt und freuen
        uns auf Sie!
      </p>

      <p
        style={{
          color: "#3d3638",
          fontSize: "16px",
          lineHeight: "1.6",
          marginTop: "20px",
        }}
      >
        Mit freundlichen Grüßen,
        <br />
        <strong>Das Team von Sieben Gipfel Blick</strong>
      </p>
    </div>
  </EmailLayout>
);

// V5 - Guest booking declined
export const EmailTemplateV5: React.FC<Readonly<EmailTemplatePropsV5>> = ({
  check_in_date,
  check_out_date,
  number_of_guests,
  with_dog,
  guest_first_name,
  guest_last_name,
  bookingCode,
}) => (
  <EmailLayout>
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          color: "#3d3638",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "0",
        }}
      >
        Buchungsanfrage leider nicht möglich
      </h1>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Guten Tag {guest_first_name} {guest_last_name},
      </p>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        wir bedauern, Ihnen mitteilen zu müssen, dass wir Ihre Buchungsanfrage
        für die gewünschten Daten leider nicht bestätigen können.
      </p>

      <div
        style={{
          backgroundColor: "#f5ebe9",
          padding: "25px",
          borderRadius: "8px",
          margin: "25px 0",
        }}
      >
        <h2
          style={{
            color: "#3d3638",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "20px",
          }}
        >
          Ihre Buchungsanfrage
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                  width: "40%",
                }}
              >
                <strong>Buchungscode:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#6d7ca7",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {bookingCode}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-in:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_in_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-out:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_out_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Anzahl Gäste:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {number_of_guests}
              </td>
            </tr>
            {with_dog === "yes" && (
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Mit Hund:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  Ja
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Wir bedauern diese Entscheidung sehr und entschuldigen uns für die
        entstandenen Unannehmlichkeiten. Leider können wir Ihre Anfrage aus
        organisatorischen Gründen nicht erfüllen.
      </p>

      <div
        style={{
          backgroundColor: "#ebe3e1",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "25px",
        }}
      >
        <h3
          style={{
            color: "#3d3638",
            fontSize: "18px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "10px",
          }}
        >
          Alternative Vorschläge
        </h3>
        <p style={{ color: "#3d3638", fontSize: "14px", lineHeight: "1.6" }}>
          Falls Sie Interesse haben, besuchen Sie unsere Website erneut, um
          alternative Verfügbarkeiten zu prüfen. Wir würden uns freuen, Sie zu
          einem anderen Zeitpunkt als unsere Gäste begrüßen zu dürfen.
        </p>
      </div>

      <p
        style={{
          color: "#3d3638",
          fontSize: "16px",
          lineHeight: "1.6",
          marginTop: "25px",
        }}
      >
        Vielen Dank für Ihr Interesse an Sieben Gipfel Blick. Bei Fragen stehen
        wir Ihnen gerne zur Verfügung.
      </p>

      <p
        style={{
          color: "#3d3638",
          fontSize: "16px",
          lineHeight: "1.6",
          marginTop: "20px",
        }}
      >
        Mit freundlichen Grüßen,
        <br />
        <strong>Das Team von Sieben Gipfel Blick</strong>
      </p>
    </div>
  </EmailLayout>
);

// H5 - Host booking declined confirmation
export const EmailTemplateH5: React.FC<Readonly<EmailTemplatePropsH5>> = ({
  check_in_date,
  check_out_date,
  number_of_guests,
  with_dog,
  guest_email,
  guest_first_name,
  guest_last_name,
  guest_message,
  guest_phone_number,
  bookingCode,
}) => (
  <EmailLayout>
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          color: "#3d3638",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "0",
        }}
      >
        Buchungsanfrage abgelehnt
      </h1>

      <p style={{ color: "#3d3638", fontSize: "16px", lineHeight: "1.6" }}>
        Sie haben eine Buchungsanfrage erfolgreich abgelehnt. Der Gast wurde
        automatisch per E-Mail über diese Entscheidung informiert.
      </p>

      <div
        style={{
          backgroundColor: "#f5ebe9",
          padding: "25px",
          borderRadius: "8px",
          margin: "25px 0",
        }}
      >
        <h2
          style={{
            color: "#3d3638",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "0",
            marginBottom: "20px",
          }}
        >
          Abgelehnte Buchungsanfrage
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "15px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                  width: "40%",
                }}
              >
                <strong>Buchungscode:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#6d7ca7",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {bookingCode}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-in:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_in_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Check-out:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {formatDate(check_out_date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  color: "#554f51",
                  fontSize: "14px",
                }}
              >
                <strong>Anzahl Gäste:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                }}
              >
                {number_of_guests}
              </td>
            </tr>
            {with_dog === "yes" && (
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#554f51",
                    fontSize: "14px",
                  }}
                >
                  <strong>Mit Hund:</strong>
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#3d3638",
                    fontSize: "14px",
                  }}
                >
                  Ja
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div
          style={{
            borderTop: "1px solid #ccbfb2",
            paddingTop: "15px",
            marginTop: "15px",
          }}
        >
          <h3
            style={{
              color: "#3d3638",
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Gästedaten
          </h3>
          <p style={{ margin: "5px 0", color: "#3d3638", fontSize: "14px" }}>
            <strong>Name:</strong> {guest_first_name} {guest_last_name}
          </p>
          <p style={{ margin: "5px 0", color: "#3d3638", fontSize: "14px" }}>
            <strong>E-Mail:</strong> {guest_email}
          </p>
          {guest_phone_number && (
            <p style={{ margin: "5px 0", color: "#3d3638", fontSize: "14px" }}>
              <strong>Telefon:</strong> {guest_phone_number}
            </p>
          )}
          {guest_message && (
            <div style={{ marginTop: "10px" }}>
              <p
                style={{
                  margin: "5px 0 5px 0",
                  color: "#3d3638",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Nachricht vom Gast:
              </p>
              <p
                style={{
                  margin: "5px 0",
                  color: "#554f51",
                  fontSize: "14px",
                  fontStyle: "italic",
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                }}
              >
                {guest_message}
              </p>
            </div>
          )}
        </div>
      </div>

      <p
        style={{
          color: "#554f51",
          fontSize: "14px",
          marginTop: "25px",
          lineHeight: "1.6",
        }}
      >
        Der Gast wurde automatisch per E-Mail über die Ablehnung informiert. Die
        Buchungsanfrage wurde in Ihrem System als abgelehnt markiert.
      </p>
    </div>
  </EmailLayout>
);
