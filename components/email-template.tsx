import * as React from "react";

interface EmailTemplatePropsV1andH1 {
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

export const EmailTemplateV1: React.FC<Readonly<EmailTemplatePropsV1andH1>> = ({
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
    <p>please save the booking code:</p>
    <li>{bookingCode}</li>
    <p>we will be in touch in 48 hours to confirm you booking</p>
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

export const EmailTemplateH1: React.FC<Readonly<EmailTemplatePropsV1andH1>> = ({
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
    <h1>hello, Host!</h1>
    <p>You have a new booking request</p>
    <p>follow this link to review and accept the booking</p>
    <a href={`${process.env.SITE_BASE_URL}/admin/bookings`}>
      click to go to your admin board
    </a>
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
