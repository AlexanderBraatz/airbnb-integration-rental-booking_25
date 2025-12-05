"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { handleAcceptAction } from "@/app/actions/admindashboardActions";

export default function Bookings() {
  const [price, setPrice] = useState(200);
  const [error, setError] = useState<string | null>(null);
  console.log("has rerended");
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
    console.log("response", result);

    if (result && result.data) {
      console.log("has data");

      console.log(result.data);
      if (result.data.price_snapshot_host_accepted_in_EURcents) {
        setPrice(result.data.price_snapshot_host_accepted_in_EURcents);
      }
    }
    if (result && result.error) {
      console.log("has error");

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
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </form>
        {!error ? <h1>all good</h1> : <h1>{error}</h1>}
        <ul>
          <li>
            <button onClick={handleAccept}>accept</button>
          </li>
          <li>delete</li>
        </ul>
      </ul>
    </>
  );
}
