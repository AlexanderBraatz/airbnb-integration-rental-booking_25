import * as React from "react";

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

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
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
  bookingCode,
}) => (
  <div>
    <h1>
      Welcome, {guest_first_name} {guest_last_name}!
    </h1>
    <ul>
      <li>{check_in_date}</li>
      <li>{check_out_date}</li>
      <li>{number_of_guests}</li>
      <li>{with_dog}</li>
      <li>{guest_email}</li>
      <li>{guest_first_name}</li>
      <li>{guest_last_name}</li>
      <li>{guest_message}</li>
      <li>{guest_phone_number}</li>
      <li>{has_agreed_to_policies}</li>
      <li>{bookingCode}</li>
    </ul>
  </div>
);

export default EmailTemplate;
