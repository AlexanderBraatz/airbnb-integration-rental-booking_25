"use client";
import Image from "next/image";
import React, { useState } from "react";
import balcony from "@/public/images/InUse/Polaroid-balcony-view-no-drop-min.png";
import adornmentHouse from "@/public/icons/adornment-house.svg";
import adornmentTaper from "@/public/icons/adornment-taper.svg";
import balcony2 from "@/public/images/InUse/Polaroid Frame-balcony 2-min.png";
import balcony1 from "@/public/images/InUse/Polaroid Frame-balcony-1-min.png";
import balcony3 from "@/public/images/InUse/Polaroid Frame-balcony-3-min.png";
import balcony4 from "@/public/images/InUse/Polaroid Frame-balcony-4-min.png";
import bedblue1 from "@/public/images/InUse/Polaroid Frame-bed-blue-1-min.png";
import bedblue2 from "@/public/images/InUse/Polaroid Frame-bed-blue-2-min.png";
import bedblue3 from "@/public/images/InUse/Polaroid Frame-bed-blue-3-min.png";
import bedyellow1 from "@/public/images/InUse/Polaroid Frame-bed-yellow-1-min.png";
import bedyellow2 from "@/public/images/InUse/Polaroid Frame-bed-yellow-2-min.png";
import dinnertable2 from "@/public/images/InUse/Polaroid Frame-dinner-table-2-min.png";
import dinnertable1 from "@/public/images/InUse/Polaroid Frame-dinnertable-1-min.png";
import kitchen1 from "@/public/images/InUse/Polaroid Frame-kitchen-1-min.png";
import kitchen2 from "@/public/images/InUse/Polaroid Frame-kitchen-2-min.png";
import kitchen3 from "@/public/images/InUse/Polaroid Frame-kitchen-3-min.png";
import livingroom2 from "@/public/images/InUse/Polaroid Frame-livingroom-2-min.png";
import livingroom3 from "@/public/images/InUse/Polaroid Frame-livingroom-3-min.png";
import livvingroom1 from "@/public/images/InUse/Polaroid Frame-livvingroom-1-min.png";
import {
  FourPolaroidStack,
  ThreePolaroidStack,
  TwoPolaroidStack,
} from "@/components/sections/rooms/components";
const content = [
  {
    adornmentWithHouse: true,
    inReverseOrder: false,
    heading: "Essbereich",
    paragraph:
      "Der großzügige, quadratische Esstisch mit vier bequemen Stühlen lädt zum gemeinsamen Verweilen ein. Für die kleinen Gäste stehen ebenfalls Kinderstühle bereit, so wird auch der Spieleabend zum entspannten Vergnügen. Durch das große Panoramafens",
    images: [dinnertable2, dinnertable1],
  },
  {
    adornmentWithHouse: false,
    inReverseOrder: true,
    heading: "Wohnzimmer",
    paragraph:
      "Der offene, loftähnliche Wohnbereich ist lichtdurchflutet und sonnig. Vom gemütlichen Sofa aus reicht der Blick bis zu den Alpen und zur Zugspitze, während Gleitschirmflieger am Himmel vorbeiziehen. Für Unterhaltung an Regentagen sorgt ein großer TV-Bildschirm.",
    images: [livvingroom1, livingroom3, livingroom2],
  },
  {
    adornmentWithHouse: false,
    inReverseOrder: false,
    heading: "Schlafzimmer   Eins",
    paragraph:
      "Das größere der beiden Schlafzimmer bietet viel Raum zum Entspannen und Zurückziehen. Ein komfortables Kingsize-Bett mit 220 cm Länge sorgt für erholsamen Schlaf, und vom Zimmer aus führt der Zugang direkt auf den zweiten Balkon – ideal für einen ruhigen Start in den Tag.",
    images: [bedyellow1, bedyellow2],
  },
  {
    adornmentWithHouse: false,
    inReverseOrder: true,
    heading: "Schlafzimmer   Zwei",
    paragraph:
      "Das zweite Schlafzimmer – liebevoll „blaues Zimmer“ genannt – ist ebenso großzügig gestaltet und mit einer gemütlichen Leseecke ausgestattet. Auch hier erwartet euch ein komfortables Kingsize-Bett für erholsame Nächte. Vom Zimmer aus gelangt ihr direkt auf den zweiten Balkon und könnt den Blick ins Freie genießen.",
    images: [bedblue2, bedblue1, bedblue3],
  },
  {
    adornmentWithHouse: false,
    inReverseOrder: false,
    heading: "Zwei   großzügige   Balkons",
    paragraph:
      "Zeit zum Entspannen und Auftanken – ob beim Frühstück, Mittag- oder Abendessen - auf dem sonnigen Süd- oder dem gemütlichen Westbalkon im Deckchair, hier kommt ihr auf jeden Fall zur Ruhe. Das Daybed ist ein idealer Ort für ein Nickerchen oder eine Lesepause. Auch im Winter…",
    images: [balcony3, balcony1, balcony2, balcony4],
  },
  {
    adornmentWithHouse: false,
    inReverseOrder: true,
    heading: "Offene  Küche",
    paragraph:
      "Viel Platz zum Wohlfühlen: Das Bad ist großzügig gestaltet und mit Badewanne, Dusche und Doppelwaschtisch ausgestattet Nach einer langen Wanderung oder einem Skitag lädt es zum Entspannen und Auftanken ein.",
    images: [kitchen1, kitchen2, kitchen3],
  },
];

export default function Rooms() {
  return (
    <div className="bg-q-background flex flex-col items-center justify-center overflow-y-hidden">
      <div className="flex gap-10 py-5">
        <div>left adornment</div>
        <h3 className="text-q-text-dark-700 font-reem-kufi text-6xl tracking-[-6%]">
          Unsere Zimmer
        </h3>
        <div>left adornment</div>
      </div>
      <p className="text-q-text-dark-700 font-jost mb-24 w-[797px] text-center text-xl leading-[30px] tracking-wide">
        Die Wohnung ist mit Sorgfalt eingerichtet und bietet ihn alles was sie
        für einen Urlaub brauchen könnten.
      </p>
      {content.map((room, index) => (
        <div
          key={index}
          className={`flex w-[1012px] ${room.inReverseOrder ? "flex-row-reverse" : ""} mb-45 justify-between`}
        >
          {room.images.length === 4 ? <FourPolaroidStack room={room} /> : <></>}
          {room.images.length === 3 ? (
            <ThreePolaroidStack room={room} />
          ) : (
            <></>
          )}
          {room.images.length === 2 ? <TwoPolaroidStack room={room} /> : <></>}
          {/* each room should at least have 2 images */}
          <div className="flex flex-col">
            <div className="mb-16">
              <Image
                alt="adornment"
                // className="bg-neutral-400"
                src={room.adornmentWithHouse ? adornmentHouse : adornmentTaper}
              />
            </div>
            <h4 className="font-reem-kufi text-q-text-dark-700 mb-8 text-5xl/12 tracking-[-3px]">
              {room.heading}
            </h4>
            <p className="font-jost text-q-text-dark-700 max-w-[498px] text-xl/10">
              {room.paragraph}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
