"use client";

// to position the sticky animation i am using the top prop to determine where it will stick during the scroll
// i use the padding-y-axis on the cards for the "time " between cards appearing
// i am using the y offset on the cards to make them stack, so that the top card always sticks at the same position
// i use a negative margin to pull the cards up , counter balancing the large top and y values they need for the scroll animation

import Image, { StaticImageData } from "next/image";
import React, { useCallback, useRef, useState } from "react";
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
import { MotionValue, useScroll, useTransform, motion } from "framer-motion";
import useMediaQuery from "@/lib/utils/matchMedia";

type roomType = {
  adornmentWithHouse: boolean;
  inReverseOrder: boolean;
  heading: string;
  paragraph: string;
  images: StaticImageData[];
};

const content: roomType[] = [
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
      "Viel Platz zum Wohlfühlen: Das Bad ist großzügig gestaltet und mit Badewanne, Dusche und Doppelwaschtisch ausgestattet Nach einer langen Wanderung oder einem Skitag lädt es zum Entspannen und Auftanken ein. Auch hier erwartet euch ein komfortables Kingsize-Bett für erholsame Nächte.",
    images: [kitchen1, kitchen2, kitchen3],
  },
];

export default function Rooms() {
  const { activeSection, setActiveSection, setTimeOfLastCLick } =
    useActiveSectionContext();
  const { ref: sectionInViewRef } = useSectionInView("Zimmer", 0.1);

  const bigRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: bigRef,
    offset: ["start start", "end end"],
  });

  // merged ref
  // const combinedRef = useCallback(
  //   (node: HTMLElement | null) => {
  //     // pass to useSectionInView’s ref (can be callback ref)
  //     sectionInViewRef(node);
  //     // store in your own ref
  //     bigRef.current = node;
  //   },
  //   [sectionInViewRef],
  // );

  return (
    <section
      ref={sectionInViewRef}
      id="rooms"
      className="bg-q-background tablet:items-start mobile:pb-30 flex scroll-mt-0 flex-col items-center justify-center overflow-x-clip pb-0"
    >
      <div ref={bigRef} className="flex flex-col items-center">
        <SectionHeading
          className="bg-q-background mobile:!mb-10 tablet:pt-4 tablet:!mb-24 tablet:static sticky top-12 z-50 !mb-211 pt-1 [&>p]:hidden"
          heading="Unsere&nbsp;&nbsp;Zimmer"
          paragraph="Die Wohnung ist mit Sorgfalt eingerichtet und bietet ihn alles was sie
            für einen Urlaub brauchen könnten."
        />
        <div className="tablet:mb-0 -mb-350"></div>
        {content.map((room, index) => {
          const targetSize = 1 - (content.length - index - 1) * 0.05;
          const targetTop = (content.length - index) * -25;

          return (
            <Card
              key={index}
              room={room}
              index={index}
              outerScroll={scrollYProgress}
              range={[index * 0.1666, 1]}
              targetSize={targetSize}
              targetTop={targetTop}
            />
          );
        })}
      </div>
    </section>
  );
}

function Card({
  room,
  index,
  outerScroll,
  range,
  targetSize,
  targetTop,
}: {
  room: roomType;
  index: number;
  outerScroll: MotionValue<number>;
  range: number[];
  targetSize: number;
  targetTop: number;
}) {
  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ["start end", "end end"],
  // });

  // const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scalecard = useTransform(outerScroll, range, [1, targetSize]);
  const targetY = targetTop + 250;
  const topCard = useTransform(outerScroll, range, [250, targetY]);
  //   const scalecard = useTransform(outerScroll, [0, 1], [1, 0.8]);

  const cardBgDic = {
    "0": "bg-q-background-b-1",
    "1": "bg-q-background-b-2",
    "2": "bg-q-background-b-3",
    "3": "bg-q-background-b-2",
    "4": "bg-q-background-b-3",
    "5": "bg-q-background-b-4",
  };
  type cardBgDicKey = keyof typeof cardBgDic;
  const topDicFrimIndex = {
    // "0": "top-[calc(280px_+_25px)]",
    "0": "top-[25px]",
    "1": "top-[50px]",
    "2": "top-[75px]",
    "3": "top-[100px]",
    "4": "top-[125px]",
    "5": "top-[150px]",
  };
  type topDicFrimIndexKey = keyof typeof topDicFrimIndex;

  return (
    <>
      <div className="tablet:block mb-10 hidden w-full py-5">
        <div className="flex flex-col">
          <div className="mobile:px-4 mobile:w-full mobile:min-w-1 flex w-[calc(60vw_+_20px)] min-w-[580px] flex-col px-5">
            <div className="mb-5">
              <Image alt="adornment" src={adornmentTaper} className="w-full" />
            </div>
            <h4 className="font-reem-kufi text-q-text-dark-darkest mb-5 text-3xl/7.5 tracking-[-3px]">
              {room.heading}
            </h4>
            <p className="font-jost text-q-text-dark-darkest mb-7 text-base/6">
              {room.paragraph}
            </p>
          </div>
          {/* snap-x snap-mandatory */}
          <div className="scrollbar-hide mobile:pl-4 mb-10 w-screen overflow-x-scroll scroll-smooth pl-5">
            <div className="mobile:gap-3 flex w-fit gap-5 pr-5">
              {room.images.map((imageSrc, index) => (
                <div
                  key={index}
                  className="mobile:w-[85vw] mobile:max-w-[350px] w-[30vw] min-w-[280px]"
                >
                  <Image src={imageSrc} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`tablet:hidden sticky top-0 my-100 flex h-[600px] items-center justify-start`}
      >
        <motion.div
          style={{ scale: scalecard, top: topCard }}
          className={`${cardBgDic[index.toString() as cardBgDicKey]} relative rounded-2xl px-20 py-10`}
        >
          <div
            className={`flex w-[1012px] ${room.inReverseOrder ? "flex-row-reverse" : ""} justify-between`}
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
              <h4 className="font-reem-kufi text-q-text-dark-darkest mb-8 text-5xl/12 tracking-[-3px]">
                {room.heading}
              </h4>
              <p className="font-jost text-q-text-dark-darkest max-w-[498px] text-xl/10">
                {room.paragraph}
              </p>
            </div>
          </div>
        </motion.div>
      </div>{" "}
    </>
  );
}
