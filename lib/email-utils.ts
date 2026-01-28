/**
 * Utility functions for email formatting and generation
 */

/**
 * Formats price in cents to German format (€150,00)
 */
export function formatPrice(cents: string | number): string {
  const numCents = typeof cents === "string" ? parseInt(cents, 10) : cents;
  const euros = numCents / 100;
  return `€${euros.toFixed(2).replace(".", ",")}`;
}

/**
 * Formats date string to German format (28. Januar 2026)
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}. ${month} ${year}`;
}

/**
 * Calculates the send date for check-in reminder emails (1 day before check-in at 9 AM)
 * @param checkInDateString - The check-in date as a string (ISO format or date string)
 * @returns Date object set to 1 day before check-in at 9:00 AM
 */
export function calculateCheckInReminderDate(checkInDateString: string): Date {
  const checkInDate = new Date(checkInDateString);
  const sendDate = new Date(checkInDate);
  sendDate.setDate(sendDate.getDate() - 1);
  sendDate.setHours(9, 0, 0, 0); // 9 AM on the day before check-in
  return sendDate;
}

/**
 * Props interface for email subject generation
 */
export interface EmailSubjectProps {
  bookingCode?: string;
  guest_first_name?: string;
  guest_last_name?: string;
  check_in_date?: string;
}

/**
 * Generates email subject based on template type and props
 */
export function getEmailSubject(
  templateType: string,
  props: EmailSubjectProps,
): string {
  const { bookingCode, guest_first_name, guest_last_name, check_in_date } =
    props;

  switch (templateType) {
    case "V1":
      return `Ihre Buchungsanfrage wurde erhalten - Buchungscode: ${bookingCode || ""}`;

    case "H1":
      return `Neue Buchungsanfrage - ${guest_first_name || ""} ${guest_last_name || ""}`;

    case "V2":
      return `Zahlungsaufforderung für Ihre Buchung - ${bookingCode || ""}`;

    case "H2":
      return `Zahlungslink an Gast gesendet - ${bookingCode || ""}`;

    case "V3":
      return "Zahlung erfolgreich - Vielen Dank für Ihre Buchung!";

    case "H3":
      return `Zahlung erhalten - Buchung ${bookingCode || ""} bestätigt`;

    case "V4":
      return `Ihr Aufenthalt beginnt bald - Check-in am ${check_in_date ? formatDate(check_in_date) : ""}`;

    case "H4":
      return `Gastankunft morgen - ${guest_first_name || ""} ${guest_last_name || ""}`;

    case "V5":
      return "Ihre Buchungsanfrage konnte nicht bestätigt werden";

    case "H5":
      return `Buchungsanfrage abgelehnt - ${bookingCode || ""}`;

    default:
      return "Nachricht von Sieben Gipfel Blick";
  }
}
