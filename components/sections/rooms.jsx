import Image from "next/image";
import React from "react";
import dinningArea from "@/public/images/InUse/Polaroid-sheep-no-drop-min.png";
import arrowLeft from "@/public/icons/arrow-left.svg";
import arrowRight from "@/public/icons/arrow-right.svg";
import adornmentHouse from "@/public/icons/adornment-house.svg";

export default function Rooms() {
  return (
    <div className="bg-q-background flex flex-col items-center justify-center">
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
      <div className="flex w-[1012px] justify-between">
        <div className="flex flex-col">
          <div className="relative mb-10 h-[508px] w-[416px]">
            <Image
              className="absolute left-12 rotate-4"
              alt="Polaroid of the Living room"
              src={dinningArea}
              width={416}
              height={508}
              quality={100}
            />
            <div className="absolute left-[50%] h-[600px] w-[600px] translate-x-[-50%] rounded-full bg-black opacity-10 blur-3xl"></div>
            <Image
              className="absolute"
              alt="Polaroid of the Living room"
              src={dinningArea}
              width={416}
              height={508}
              quality={100}
            />
          </div>
          <div className="flex w-full justify-center">
            <button className="flex h-6 w-6 items-center justify-center">
              <Image
                alt="arrow left "
                // className="bg-neutral-400"
                src={arrowLeft}
              />
            </button>
            <div className="flex h-6 w-6 items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-neutral-700"></div>
            </div>
            <div className="flex h-6 w-6 items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-neutral-500"></div>
            </div>
            <div className="flex h-6 w-6 items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-neutral-500"></div>
            </div>
            <button className="flex h-6 w-6 items-center justify-center">
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
              src={adornmentHouse}
            />
          </div>
          <h4 className="font-reem-kufi text-q-text-dark-700 mb-8 text-5xl/12 tracking-[-3px]">
            Essbereich
          </h4>
          <p className="font-jost text-q-text-dark-700 max-w-[498px] text-xl/10">
            Der großzügige, quadratische Esstisch mit vier bequemen Stühlen lädt
            zum gemeinsamen Verweilen ein. Für die kleinen Gäste stehen
            ebenfalls Kinderstühle bereit, so wird auch der Spieleabend zum
            entspannten Vergnügen. Durch das große Panoramafenster genießen Sie
            dabei stets den herrlichen Ausblick auf die Berge.
          </p>
        </div>
      </div>
    </div>
  );
}
