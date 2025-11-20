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
import homeOfficeLandscape from "@/public/images/InUse/homeOffice-landscape.jpg";
import hike2Landscape from "@/public/images/InUse/hike-landscape.jpg";
import childfrindlyLandscape from "@/public/images/InUse/childfrindly-landscape.jpg";
import mountainViewLandscape from "@/public/images/InUse/mountainView-landscape.jpg";
import quietLandscape from "@/public/images/InUse/quiet-landscape.jpg";
import garage2Landscape from "@/public/images/InUse/garage-landscape.jpg";
import SectionHeading from "./componts";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSectionInView } from "@/lib/hooks";
import useMediaQuery from "@/lib/utils/matchMedia";

type Highlight = {
  id: number;
  alt: string;
  src: StaticImageData;
  srcLandscape: StaticImageData;
  icon: StaticImageData;
  heading: string;
  paragraph: string;
};
const highlights: Highlight[] = [
  {
    id: 0,
    alt: "Home Office",
    src: homeOffice,
    srcLandscape: homeOfficeLandscape,
    icon: wifi,
    heading: "Home Office",
    paragraph:
      "Ob für Arbeit oder Freizeit, stabiles WLAN sorgt jederzeit für eine schnelle Verbindung",
  },
  {
    id: 1,
    alt: "Tiefgarage",
    src: garage2,
    srcLandscape: garage2Landscape,
    icon: garage,
    heading: "Tiefgarage",
    paragraph:
      "Ihr Fahrzeug steht wettergeschützt und sicher auf eigenem Stellplatz im Haus ",
  },
  {
    id: 2,
    alt: "Ausblick",
    src: mountainView,
    srcLandscape: mountainViewLandscape,
    icon: Frame,
    heading: "Ausblick",
    paragraph: "Spektakuläre Aussicht auf mindestens sieben Gipfel ",
  },
  {
    id: 3,
    alt: "Ruhige Lage",
    src: quiet,
    srcLandscape: quietLandscape,
    icon: bell,
    heading: "Ruhige Lage",
    paragraph:
      "Wunderschön ruhig und idyllisch, perfekte Voraussetzung für erholsame Tage.",
  },
  {
    id: 4,
    alt: "Kinderfreundlich",
    src: childfrindly,
    srcLandscape: childfrindlyLandscape,
    icon: babay,
    heading: "Kinderfreundlich",
    paragraph:
      "Küche mit offenem Wohn-Essbereich, alles da für gemeinsame Genussmomente",
  },
  {
    id: 5,
    alt: "Direkt am Wanderweg",
    src: hike2,
    srcLandscape: hike2Landscape,
    icon: hike,
    heading: "Direkt am Wanderweg",
    paragraph: "Sonne auf dem Süd- und Abendstimmung auf dem Westbalkon",
  },
];

export default function Highlights() {
  const { activeSection, setActiveSection, setTimeOfLastCLick } =
    useActiveSectionContext();
  const { ref } = useSectionInView("Ausstattung", 0.5);
  // i am preventing rerenders by blocking the change of state on screen size where i do not wan tot track the state anymore
  const [highlighted, setHighlighted] = useState(0);
  function handleMouseOver() {
    safeSetHighlighted((prev) => (prev + 1) % 6);
  }

  const isDesktopSM = useMediaQuery("(max-width: 1360px)");

  function safeSetHighlighted(value: number | ((prev: number) => number)) {
    if (isDesktopSM) return;

    if (typeof value === "function") {
      setHighlighted((prev) => value(prev));
    } else {
      setHighlighted(value);
    }
  }

  return (
    <section
      ref={ref}
      id="highlights"
      className="bg-q-background flex scroll-mt-28 flex-col items-center justify-center overflow-y-hidden pb-50"
    >
      <SectionHeading
        heading="Genießen&nbsp;&nbsp;Sie&nbsp;&nbsp;Komfort&nbsp;&nbsp;und&nbsp;&nbsp;Gemütlichkeit"
        paragraph="Die Wohnung ist mit Sorgfalt eingerichtet und bietet ihn alles was sie
        für einen Urlaub brauchen könnten."
      />
      <div className="desktopSM:justify-center flex w-[1270px] justify-between">
        <div className="desktopSM:grid-cols-3 desktopSM:grid-rows-2 grid grid-cols-2 grid-rows-3 gap-5">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center justify-center">
              <Card
                highlight={highlight}
                setHighlighted={safeSetHighlighted}
                highlighted={highlighted === index}
              />
            </div>
          ))}
        </div>
        <div
          className="desktopSM:hidden relative h-[587px] w-[367px]"
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
    </section>
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
    <div>
      <div className="desktopSM:block hidden h-[200px] w-[319px]">
        <Image
          src={highlight.srcLandscape}
          alt={highlight.alt}
          height={200}
          width={319}
          className={`h-full w-full object-cover`}
        />
      </div>
      <div
        onMouseOver={handleMouseOver}
        className={`${highlighted ? "desktopSM:bg-q-card-background bg-q-card-background-highlight" : "bg-q-card-background"} desktopSM:w-[319px] desktopSM:h-[140px] h-[182px] w-[367px] cursor-default p-5 transition-all duration-300 ease-in-out`}
      >
        <div className="desktopSM:mb-2.5 desktopSM:flex-row desktopSM:items-center desktopSM:gap-2 flex flex-col gap-3">
          <div
            className={`${highlighted ? "desktopSM:bg-q-text-dark-700 bg-q-text-dark-darkest" : "bg-q-text-dark-700"} desktopSM:h-7 desktopSM:w-7 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ease-in-out`}
          >
            <Image
              src={highlight.icon}
              alt={highlight.alt}
              className="desktopSM:h-3.5 desktopSM:w-3.5 absolute h-6 w-6"
            />
          </div>
          <h5
            className={`${highlighted ? "desktopSM:color-q-text-dark-700 color-q-text-dark-darkest" : "color-q-text-dark-700"} font-jost desktopSM:text-xl/6 desktopSM:mb-0 mb-[2px] text-xl/9 font-medium tracking-wide transition-all duration-300 ease-in-out`}
          >
            {highlight.heading}
          </h5>
        </div>
        <p
          className={`${highlighted ? "desktopSM:color-q-text-dark-700 color-q-text-dark-darkest" : "color-q-text-dark-700"} font-jost text-base/5.5 tracking-wide transition-all duration-300 ease-in-out`}
        >
          {highlight.paragraph}
        </p>
      </div>
    </div>
  );
}
