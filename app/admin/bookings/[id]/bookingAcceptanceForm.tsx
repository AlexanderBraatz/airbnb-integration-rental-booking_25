"use client";
import React, { useState } from "react";
import { redirect, RedirectType, useParams } from "next/navigation";
import { handleAcceptAction } from "@/app/actions/admindashboardActions";
import { Tables } from "@/database.types";
import { Button } from "@/components/ui/button";
type BookingRow = Tables<"Bookings">;

export default function BookingAcceptanceForm({
  bookingData,
}: {
  bookingData: BookingRow;
}) {
  const calcPrice = (bookingData: BookingRow) => {
    // TODO: extrakt these to a user addmin or price settings section
    const defaultPricePerNight = 5;
    const defaultPriceOdDogAddon = 6000;
    const defaultPriceOfCleaning = 80000;
    let price = 0;
    const checkIn = new Date(bookingData.check_in_date);
    const checkOut = new Date(bookingData.check_out_date);

    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const nights = diffTime / (1000 * 60 * 60 * 24);

    price += nights * defaultPricePerNight;
    price += defaultPriceOdDogAddon;
    price += nights * defaultPriceOfCleaning;
    return price;
  };
  const [price, setPrice] = useState(
    bookingData.price_snapshot_host_accepted_in_EURcents ??
      calcPrice(bookingData),
  );

  const [error, setError] = useState<string | null>(null);
  //get booking information based on booking code
  //calculate price
  //acceptBooking
  //revoce booking

  //acceptBooking
  // const id = 4; //for now , should fetch form bookings
  const params = useParams();
  const id = Number(params.id);

  const handleAccept = async () => {
    const result = await handleAcceptAction(id, price);

    if (result && result.data) {
      if (result.data.price_snapshot_host_accepted_in_EURcents) {
        setPrice(result.data.price_snapshot_host_accepted_in_EURcents);
      }
    }
    if (result && result.error) {
      setError(result.error);
    }
  };
  return (
    <>
      <div> this page will</div>
      <ul>
        <li>dispaly bookings</li>
        <li>let you:</li>
        {/* <h1>{price}</h1> */}
        {/* <input onChange={handlePriceChange}>{price}</input>
         */}
        <form>
          <label htmlFor="price">Preis:</label>
          {/* <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          /> */}
        </form>
        {!error ? <h1>all good</h1> : <h1>{error}</h1>}
        <ul>
          <li>
            <Button className="cursor-pointer" onClick={handleAccept}>
              Annehmen
            </Button>
          </li>
          <li>
            {" "}
            <Button className="cursor-pointer">Löschen</Button>
          </li>
          <p>
            Wenn Sie diese Buchung ablehnen möchten, klicken Sie auf den
            folgenden Button.
          </p>
          <Button className="cursor-pointer">Ablehnen</Button>
          <p>
            Wenn Sie den Gast direkt per E-Mail kontaktieren möchten, können
            Sie ihn hier erreichen:
          </p>
          <a href={`mailto:${bookingData.guest_email}`}>
            {bookingData.guest_email}
          </a>
        </ul>
      </ul>
      <Button
        className="cursor-pointer"
        onClick={() => redirect(`./`, RedirectType.push)}
      >
        Zurück zur Buchungsübersicht
      </Button>
    </>
  );
}
