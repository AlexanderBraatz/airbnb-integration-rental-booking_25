"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import babay from "@/public/icons/baby.svg";
import bell from "@/public/icons/bell-slash.svg";
import garage from "@/public/icons/garage.svg";
import Frame from "@/public/icons/Frame.svg";
import wifi from "@/public/icons/wifi-check.svg";
import hike from "@/public/icons/person-simple-hike.svg";
import homeOffice from "@/public/images/InUse/homeOffice-tall.jpg";
import hike2 from "@/public/images/InUse/hike-tall.jpg";
import childfrindly from "@/public/images/InUse/childfrindly-tall.jpg";
import mountainView from "@/public/images/InUse/mountainView-tall.jpg";
import quiet from "@/public/images/InUse/quiet-tall.jpg";
import garage2 from "@/public/images/InUse/garage-tall.jpg";
import SectionHeading from "./componts";

type Highlight = {
  id: number;
  alt: string;
  src: StaticImageData;
  icon: StaticImageData;
  heading: string;
  paragraph: string;
};
const highlights: Highlight[] = [
  {
    id: 0,
    alt: "Home Office",
    src: homeOffice,
    icon: wifi,
    heading: "Home Office",
    paragraph:
      "Ob für Arbeit oder Freizeit, stabiles WLAN sorgt jederzeit für eine schnelle Verbindung",
  },
  {
    id: 1,
    alt: "Tiefgarage",
    src: garage2,
    icon: garage,
    heading: "Tiefgarage",
    paragraph:
      "Ihr Fahrzeug steht wettergeschützt und sicher auf eigenem Stellplatz im Haus ",
  },
  {
    id: 2,
    alt: "Ausblick",
    src: mountainView,
    icon: Frame,
    heading: "Ausblick",
    paragraph: "Spektakuläre Aussicht auf mindestens sieben Gipfel ",
  },
  {
    id: 3,
    alt: "Ruhige Lage",
    src: quiet,
    icon: bell,
    heading: "Ruhige Lage",
    paragraph:
      "Wunderschön ruhig und idyllisch, perfekte Voraussetzung für erholsame Tage.",
  },
  {
    id: 4,
    alt: "Kinderfreundlich",
    src: childfrindly,
    icon: babay,
    heading: "Kinderfreundlich",
    paragraph:
      "Küche mit offenem Wohn-Essbereich, alles da für gemeinsame Genussmomente",
  },
  {
    id: 5,
    alt: "Direkt am Wanderweg",
    src: hike2,
    icon: hike,
    heading: "Direkt am Wanderweg",
    paragraph: "Sonne auf dem Süd- und Abendstimmung auf dem Westbalkon",
  },
];

export default function Highlights() {
  const [highlighted, setHighlighted] = useState(0);
  function handleMouseOver() {
    setHighlighted((prev) => (prev + 1) % 6);
  }
  return (
    <div className="bg-q-background flex flex-col items-center justify-center overflow-y-hidden pb-50">
      <SectionHeading
        heading="Genießen&nbsp;&nbsp;Sie&nbsp;&nbsp;Komfort&nbsp;&nbsp;und&nbsp;&nbsp;Gemütlichkeit"
        paragraph="Die Wohnung ist mit Sorgfalt eingerichtet und bietet ihn alles was sie
        für einen Urlaub brauchen könnten."
      />
      <div className="flex w-[1270px] justify-between">
        <div className="grid grid-cols-2 grid-rows-3 gap-5">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center justify-center">
              <Card
                highlight={highlight}
                setHighlighted={setHighlighted}
                highlighted={highlighted === index}
              />
            </div>
          ))}
        </div>
        <div
          className="relative h-[587px] w-[367px]"
          onMouseOver={handleMouseOver}
        >
          {highlights.map((highlight, index) => (
            <Image
              key={index}
              src={highlight.src}
              alt={highlight.alt}
              height={1174}
              width={734}
              className={`${highlighted === index ? "opacity-100" : "opacity-0"} absolute h-[587px] w-[367px] transition-all duration-400 ease-in-out`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({
  highlight,
  highlighted,
  setHighlighted,
}: {
  highlight: Highlight;
  highlighted: boolean;
  setHighlighted: (number: number) => void;
}) {
  function handleMouseOver() {
    setHighlighted(highlight.id);
  }
  return (
    <div
      onMouseOver={handleMouseOver}
      className={`${highlighted ? "bg-q-card-background-highlight" : "bg-q-card-background"} h-[182px] w-[367px] p-5 transition-all duration-300 ease-in-out`}
    >
      <div
        className={`${highlighted ? "bg-q-text-dark-darkest" : "bg-q-text-dark-700"} 0 mb-3 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ease-in-out`}
      >
        <Image
          src={highlight.icon}
          alt={highlight.alt}
          className="absolute h-6 w-6"
        />
      </div>
      <h5
        className={`${highlighted ? "color-q-text-dark-darkest" : "color-q-text-dark-700"} font-jost mb-[2px] text-xl/9 font-medium tracking-wide transition-all duration-300 ease-in-out`}
      >
        {highlight.heading}
      </h5>
      <p
        className={`${highlighted ? "color-q-text-dark-darkest" : "color-q-text-dark-700"} font-jost text-base/5.5 tracking-wide transition-all duration-300 ease-in-out`}
      >
        {highlight.paragraph}
      </p>
    </div>
  );
}
