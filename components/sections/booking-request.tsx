"use client";
import React from "react";
import SectionHeading from "./componts";
import arrowWhite from "@/public/icons/arrow-white.svg";
import Image from "next/image";
import {
  type RoomType,
  TwoPolaroidStack,
  TwoPolaroidStackFinal,
} from "./rooms/components";
import hoseOutside from "@/public/images/InUse/Polaroid Frame-livingroom-3-min.png";
import frontDoor from "@/public/images/InUse/Polaroid Frame-livingroom-3-min.png";
import outsideForntDoor from "@/public/images/InUse/Polaroid-outside-fornt-door.png";
import outsideView from "@/public/images/InUse/Polaroid-outside-view.png";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSectionInView } from "@/lib/hooks";

const finalDisplay = {
  adornmentWithHouse: false,
  inReverseOrder: true,
  heading: "Schlafzimmer   Zwei",
  paragraph:
    "Das zweite Schlafzimmer – liebevoll „blaues Zimmer“ genannt – ist ebenso großzügig gestaltet und mit einer gemütlichen Leseecke ausgestattet. Auch hier erwartet euch ein komfortables Kingsize-Bett für erholsame Nächte. Vom Zimmer aus gelangt ihr direkt auf den zweiten Balkon und könnt den Blick ins Freie genießen.",
  images: [outsideView, outsideForntDoor],
};

export default function BookingRequest() {
  const { activeSection, setActiveSection, setTimeOfLastCLick } =
    useActiveSectionContext();
  const { ref } = useSectionInView("Anfragen", 0.5);

  return (
    <section
      ref={ref}
      id="bookingRequest"
      className="bg-q-background font-jost flex scroll-mt-28 flex-col items-center justify-center overflow-x-clip pb-50"
    >
      <SectionHeading
        className="!mb-0 [&>p]:hidden"
        heading="Buchungsanfrage"
        paragraph=""
      />

      <div className="bg-q-background mx-auto mb-5 flex max-w-[1190px] flex-col gap-5 px-10">
        <div className="bg-q-review-card-background h-20 w-[1092px] pt-6.5 text-center">
          <p className="text-q-text-dark-darkest text-xl/7 tracking-wide">
            Wir Freuen uns schon auf ihren Besuch,Wir antworten innerhalb von 24
            Stunden.
          </p>
        </div>
        <div className="flex">
          <div className="bg-q-card-background grid grid-cols-2 gap-5 px-10 pt-5 pb-10">
            <div>
              <label className="text-xl/7 font-semibold">Name</label>
              <input className="border-q-text-dark-darkest block h-10 w-[238px] border bg-white" />
            </div>
            <div>
              <label className="text-xl/7 font-semibold">Email</label>
              <input className="border-q-text-dark-darkest block h-10 w-[238px] border bg-white" />
            </div>
            <div>
              <label className="text-xl/7 font-semibold">Anreise</label>
              <input className="border-q-text-dark-darkest block h-10 w-[238px] border bg-white" />
            </div>
            <div>
              <label className="text-xl/7 font-semibold">Abreise</label>
              <input className="border-q-text-dark-darkest block h-10 w-[238px] border bg-white" />
            </div>
            <div>
              <label className="text-xl/7 font-semibold">Gäste</label>
              <input className="border-q-text-dark-darkest block h-10 w-[238px] border bg-white" />
            </div>
            <div>
              <label className="text-xl/7 font-semibold">Hund</label>
              <input className="border-q-text-dark-darkest block h-10 w-[238px] border bg-white" />
            </div>
            <div className="col-span-2">
              <label className="text-xl/7 font-semibold">Nachricht</label>
              <input className="border-q-text-dark-darkest block h-30 w-full border bg-white" />
            </div>
            <div className="col-start-2 col-end-3">
              <button className="bg-q-button-red active:bg-q-button-red-darker border-q-text-dark-darkest h-[56px] w-[238px] rounded-full border transition-colors duration-300 ease-in-out">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-xl/5 font-bold text-white">
                    ANFRAGEN
                  </span>
                  <Image src={arrowWhite} alt="arrow" />
                </div>
              </button>
            </div>
          </div>
          <div className="w-[505px]">
            <TwoPolaroidStackFinal room={finalDisplay} />
          </div>
        </div>
      </div>
    </section>
  );
}
