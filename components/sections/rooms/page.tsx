"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
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
import SectionHeading from "../componts";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSectionInView } from "@/lib/hooks";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

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
    images: [livingroom3, livingroom2, livvingroom1],
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
    images: [bedblue3, bedblue2, bedblue1],
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
  const heading = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heading,
    offset: ["start end", "start start"],
  });

  const roomScale = useTransform(scrollYProgress, [0, 0.2, 1], [1, 1, 1]);
  const paddingTop = useTransform(scrollYProgress, [0, 0.6, 1], [0, 40, 40]);
  const { activeSection, setActiveSection, setTimeOfLastCLick } =
    useActiveSectionContext();
  const { ref } = useSectionInView("Zimmer", 0.1);

  return (
    <motion.section
      style={{ scale: roomScale }}
      ref={ref}
      id="rooms"
      className="bg-q-background relative -top-12 z-50 flex scroll-mt-28 flex-col items-center justify-center rounded-3xl"
    >
      <motion.div style={{ paddingTop: paddingTop }} ref={heading}>
        <SectionHeading
          heading="Unsere&nbsp;&nbsp;Zimmer"
          paragraph="Die Wohnung ist mit Sorgfalt eingerichtet und bietet ihn alles was sie
            für einen Urlaub brauchen könnten."
        />
      </motion.div>
      <div className="flex w-full flex-col items-center justify-start overflow-x-hidden">
        {content.map((room, index) => (
          <div
            key={index}
            className={`flex w-[1012px] ${room.inReverseOrder ? "flex-row-reverse" : ""} mb-45 justify-between`}
          >
            {room.images.length === 4 ? (
              <FourPolaroidStack room={room} />
            ) : (
              <></>
            )}
            {room.images.length === 3 ? (
              <ThreePolaroidStack room={room} />
            ) : (
              <></>
            )}
            {room.images.length === 2 ? (
              <TwoPolaroidStack room={room} />
            ) : (
              <></>
            )}
            {/* each room should at least have 2 images */}
            <div className="flex flex-col">
              <div className="mb-16">
                <Image
                  alt="adornment"
                  // className="bg-neutral-400"
                  src={
                    room.adornmentWithHouse ? adornmentHouse : adornmentTaper
                  }
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
    </motion.section>
  );
}
