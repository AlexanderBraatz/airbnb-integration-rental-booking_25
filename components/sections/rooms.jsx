"use client";
import Image from "next/image";
import React, { useState } from "react";
import sheep from "@/public/images/InUse/Polaroid-sheep-no-drop-min.png";
import balcony from "@/public/images/InUse/Polaroid-balcony-view-no-drop-min.png";
import balconyDelete from "@/public/images/InUse/Polaroid-balcony-view-no-drop-min-delete.png";
import mountains from "@/public/images/InUse/Polaroid-mountains-no-drop-min.png";
import arrowLeft from "@/public/icons/arrow-left.svg";
import arrowRight from "@/public/icons/arrow-right.svg";
import adornmentHouse from "@/public/icons/adornment-house.svg";
import adornmentTaper from "@/public/icons/adornment-taper.svg";

const content = [
  {
    adornmentWithHouse: true,
    inReverseOrder: false,
    heading: "Essbereich",
    paragraph:
      "Der großzügige, quadratische Esstisch mit vier bequemen Stühlen lädt zum gemeinsamen Verweilen ein. Für die kleinen Gäste stehen ebenfalls Kinderstühle bereit, so wird auch der Spieleabend zum entspannten Vergnügen. Durch das große Panoramafens",
    images: [sheep, sheep],
  },
  {
    adornmentWithHouse: false,
    inReverseOrder: true,
    heading: "Wohnzimmer",
    paragraph:
      "Der offene, loftähnliche Wohnbereich ist lichtdurchflutet und sonnig. Vom gemütlichen Sofa aus reicht der Blick bis zu den Alpen und zur Zugspitze, während Gleitschirmflieger am Himmel vorbeiziehen. Für Unterhaltung an Regentagen sorgt ein großer TV-Bildschirm.",
    images: [sheep, balcony, mountains, balconyDelete],
  },
  {
    adornmentWithHouse: false,
    inReverseOrder: false,
    heading: "Schlafzimmer   Eins",
    paragraph:
      "Das größere der beiden Schlafzimmer bietet viel Raum zum Entspannen und Zurückziehen. Ein komfortables Kingsize-Bett mit 220 cm Länge sorgt für erholsamen Schlaf, und vom Zimmer aus führt der Zugang direkt auf den zweiten Balkon – ideal für einen ruhigen Start in den Tag.",
    images: [sheep, sheep],
  },
  {
    adornmentWithHouse: false,
    inReverseOrder: true,
    heading: "Schlafzimmer   Zwei",
    paragraph:
      "Das zweite Schlafzimmer – liebevoll „blaues Zimmer“ genannt – ist ebenso großzügig gestaltet und mit einer gemütlichen Leseecke ausgestattet. Auch hier erwartet euch ein komfortables Kingsize-Bett für erholsame Nächte. Vom Zimmer aus gelangt ihr direkt auf den zweiten Balkon und könnt den Blick ins Freie genießen.",
    images: [sheep, sheep, sheep, sheep],
  },
  {
    adornmentWithHouse: false,
    inReverseOrder: false,
    heading: "Zwei   großzügige   Balkons",
    paragraph:
      "Zeit zum Entspannen und Auftanken – ob beim Frühstück, Mittag- oder Abendessen - auf dem sonnigen Süd- oder dem gemütlichen Westbalkon im Deckchair, hier kommt ihr auf jeden Fall zur Ruhe. Das Daybed ist ein idealer Ort für ein Nickerchen oder eine Lesepause. Auch im Winter…",
    images: [sheep, sheep],
  },
  {
    adornmentWithHouse: false,
    inReverseOrder: true,
    heading: "Offene  Küche",
    paragraph:
      "Viel Platz zum Wohlfühlen: Das Bad ist großzügig gestaltet und mit Badewanne, Dusche und Doppelwaschtisch ausgestattet Nach einer langen Wanderung oder einem Skitag lädt es zum Entspannen und Auftanken ein.",
    images: [sheep, sheep],
  },
];

const Position = {
  0: "top-0 right-0 rotate-0 z-40 duration-1000 ease-out", //top
  1: "top-6 -right-[500px] rotate-10  z-40  duration-200 ease-in-out",
  2: "top-6 -right-[500px] rotate-10  z-5 duration-10 ease-out",
  3: "top-0 right-0 rotate-4 z-5 duration-600 ease-in-out scale-95",
  4: "top-5 right-0 rotate-0 z-5 duration-600 ease-in-out hidden", //hiddedn 4th
  5: "top-5 right-0 rotate-0 z-5 duration-400 ease-in-out hidden",
  6: "top-5 right-0 rotate-0 z-10 duration-1000 ease-out hidden ",
  7: "top-5 right-0 rotate-0 z-10 duration-1000 ease-out ",
  8: "top-0 -right-12 rotate-4 z-10 duration-400 ease-out", //back
  9: "top-0 -right-12 rotate-4 z-10 duration-400 ease-out",
  10: "top-4 right-8 -rotate-3 z-20 duration-1000 ease-out",
  11: "top-4 right-8 -rotate-3 z-20 duration-1000 ease-out",
  12: "top-4 right-8 -rotate-3 z-20 duration-1000 ease-out", // middle
  13: "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
  14: "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
  15: "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
};

export default function Rooms() {
  const [order, setOrder] = useState({
    imageOne: 0, // position images[0]
    imageFour: 4, // position images[3]
    imageThree: 8, // position images[2]
    imageTwo: 12, // position images[1]
  });
  const handleRightClick = () => {
    console.log("right Click");
    setOrder((prev) => ({
      imageOne: (prev.imageOne + 1) % 16,
      imageFour: (prev.imageFour + 1) % 16,
      imageThree: (prev.imageThree + 1) % 16,
      imageTwo: (prev.imageTwo + 1) % 16,
    }));

    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 16,
        imageFour: (prev.imageFour + 1) % 16,
        imageThree: (prev.imageThree + 1) % 16,
        imageTwo: (prev.imageTwo + 1) % 16,
      }));
      console.log("3nd", order);
    }, 200);
    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 16,
        imageFour: (prev.imageFour + 1) % 16,
        imageThree: (prev.imageThree + 1) % 16,
        imageTwo: (prev.imageTwo + 1) % 16,
      }));
      console.log("3nd", order);
    }, 210);
    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 16,
        imageFour: (prev.imageFour + 1) % 16,
        imageThree: (prev.imageThree + 1) % 16,
        imageTwo: (prev.imageTwo + 1) % 16,
      }));
      console.log("3nd", order);
    }, 600);
  };
  const handleLeftClick = () => {
    console.log("right Click");
  };

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
          <div className="flex flex-col">
            <div onClick={handleRightClick} className="cursor-pointer">
              <div className="relative mb-10 h-[508px] w-[416px]">
                {room.images[0] === undefined ? (
                  <></>
                ) : (
                  <Image
                    className={`${Position[order.imageOne.toString()]} absolute transform-gpu transition-all`}
                    alt="Polaroid of the Living room"
                    src={room.images[0]}
                    width={416}
                    height={508}
                    quality={100}
                  />
                )}
                {room.images[1] === undefined ? (
                  <></>
                ) : (
                  <Image
                    className={`${Position[order.imageTwo.toString()]} absolute transform-gpu transition-all`}
                    alt="Polaroid of the Living room"
                    src={room.images[1]}
                    width={416}
                    height={508}
                    quality={100}
                  />
                )}
                {room.images[2] === undefined ? (
                  <></>
                ) : (
                  <Image
                    className={`${Position[order.imageThree.toString()]} absolute transform-gpu transition-all`}
                    alt="Polaroid of the Living room"
                    src={room.images[2]}
                    width={416}
                    height={508}
                    quality={100}
                  />
                )}
                {room.images[3] === undefined ? (
                  <></>
                ) : (
                  <Image
                    className={`${Position[order.imageFour.toString()]} absolute transform-gpu transition-all`}
                    alt="Polaroid of the Living room"
                    src={room.images[3]}
                    width={416}
                    height={508}
                    quality={100}
                  />
                )}
                {/* <div className="pointer-events-none absolute left-[50%] z-30 h-[600px] w-[600px] translate-x-[-50%] rounded-full bg-black opacity-10 blur-3xl"></div> */}
              </div>
            </div>
            <div className="flex w-full justify-center">
              <button
                className="flex h-6 w-6 cursor-pointer items-center justify-center"
                onClick={handleLeftClick}
              >
                <Image
                  alt="arrow left "
                  // className="bg-neutral-400"
                  src={arrowLeft}
                />
              </button>
              {room.images.map((image, index) => (
                <div
                  key={index}
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <div
                    className={`${order.imageOne / 4 === index ? "bg-neutral-700" : "bg-neutral-500"} h-3 w-3 rounded-full bg-neutral-500 transition-colors`}
                  ></div>
                </div>
              ))}
              <button
                onClick={handleRightClick}
                className="flex h-6 w-6 cursor-pointer items-center justify-center"
              >
                <Image
                  alt="arrow right "
                  // className="bg-neutral-400"
                  src={arrowRight}
                />
              </button>
            </div>
          </div>
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
