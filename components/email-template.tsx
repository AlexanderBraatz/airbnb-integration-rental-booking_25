import { EmailTemplatePropsV3andH3 } from "@/app/api/stripe/webhook/route";
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

export interface EmailTemplatePropsH1 extends EmailTemplatePropsV1andH1 {
  id: number;
}
interface EmailTemplatePropsV2andH2 {
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
  has_agreed_to_policies,
  bookingCode,
  id,
}) => (
  <div>
    <h1>hello, Host!</h1>
    <p>You have a new booking request</p>
    <p>follow this link to review and accept the booking</p>
    <a href={`${process.env.SITE_BASE_URL}/admin/bookings/${id}`}>
      click to go to strait to the booking request
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

export const EmailTemplateH2: React.FC<Readonly<EmailTemplatePropsV2andH2>> = ({
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
  price_snapshot_host_accepted_in_EURcents,
}) => (
  <div>
    <h1>hello, Guest !</h1>

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
    <div className="p-4">
      <h4>price Breadown here ?</h4>
      <h2>{price_snapshot_host_accepted_in_EURcents}</h2>
    </div>
    <div className="p-4">
      <h2>
        <a href={`http://localhost:3000/payment/${bookingCode}`}>
          go to pay here
        </a>
      </h2>
    </div>
  </div>
);

export const EmailTemplateH3: React.FC<Readonly<EmailTemplatePropsV3andH3>> = ({
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
  price_snapshot_guest_payed_in_EURcents,
}) => (
  <div>
    <h1>hello, Guest !</h1>

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
    <div className="p-4">
      <h4>
        thank you for making the payment, you will reiceice a recipt in a
        sepearate email
      </h4>
      <h2>{price_snapshot_guest_payed_in_EURcents}</h2>
    </div>
    <div className="p-4"></div>
  </div>
);

export interface EmailTemplatePropsV4andH4 {
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
export const EmailTemplateH4: React.FC<Readonly<EmailTemplatePropsV4andH4>> = ({
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
  price_snapshot_guest_payed_in_EURcents,
}) => (
  <div>
    <h1>hello, Host !</h1>
    <h1>Its Time to start your holiday!!</h1>

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
      <li>{price_snapshot_guest_payed_in_EURcents}</li>
    </ul>
    <div className="p-4">
      <h4>your guest is about to start their holiday</h4>
    </div>
    <div className="p-4"></div>
  </div>
);

export const EmailTemplateV4: React.FC<Readonly<EmailTemplatePropsV4andH4>> = ({
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
  price_snapshot_guest_payed_in_EURcents,
}) => (
  <div>
    <h1>hello, Guest!</h1>
    <h1>Its Time to start your holiday!!</h1>

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
      <li>{price_snapshot_guest_payed_in_EURcents}</li>
    </ul>
    <div className="p-4">
      <h2>Happy Holidays!</h2>
    </div>
    <div className="p-4"></div>
  </div>
);

// Decline email templates
export interface EmailTemplatePropsV5andH5 {
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

export const EmailTemplateV5: React.FC<Readonly<EmailTemplatePropsV5andH5>> = ({
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
      Hello, {guest_first_name} {guest_last_name}!
    </h1>
    <p>We regret to inform you that your booking request has been declined.</p>
    <p>Booking Code: {bookingCode}</p>
    <p>
      Unfortunately, we are unable to accommodate your booking request for the
      following dates:
    </p>
    <ul>
      <li>Check-in: {check_in_date}</li>
      <li>Check-out: {check_out_date}</li>
      <li>Number of guests: {number_of_guests}</li>
      <li>With dog: {with_dog}</li>
    </ul>
    <p>
      We apologize for any inconvenience this may cause. If you have any
      questions, please feel free to contact us.
    </p>
    <p>Thank you for your interest, and we hope to serve you in the future.</p>
  </div>
);

export const EmailTemplateH5: React.FC<Readonly<EmailTemplatePropsV5andH5>> = ({
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
    <h1>Hello, Host!</h1>
    <p>You have successfully declined a booking request.</p>
    <p>Booking Code: {bookingCode}</p>
    <p>Booking Details:</p>
    <ul>
      <li>Check-in: {check_in_date}</li>
      <li>Check-out: {check_out_date}</li>
      <li>Number of guests: {number_of_guests}</li>
      <li>With dog: {with_dog}</li>
      <li>
        Guest: {guest_first_name} {guest_last_name}
      </li>
      <li>Email: {guest_email}</li>
      <li>Phone: {guest_phone_number}</li>
      {guest_message && <li>Message: {guest_message}</li>}
    </ul>
    <p>The guest has been notified via email about this decision.</p>
  </div>
);
