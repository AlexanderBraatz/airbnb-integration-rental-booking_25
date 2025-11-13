import Image from "next/image";
import React from "react";
import trainSimple from "@/public/icons/train-simple-bold 1.svg";
import cableCar from "@/public/icons/cable-car-bold 1.svg";
import bus from "@/public/icons/bus-bold 1.svg";
import trainRegional from "@/public/icons/train-regional 1.svg";
import house from "@/public/icons/house-line-bold 1.svg";
import google from "@/public/images/InUse/google-delete.jpg";
import SectionHeading from "./componts";

export default function Directions() {
  return (
    <div className="bg-q-background flex flex-col items-center justify-center pb-50">
      <SectionHeading
        className="[&>p]:w-[630px]"
        heading="Anfahrt"
        paragraph="Der 7-Gipfelblick liegt am Stadtrand von Garmisch-Partenkirchen, in ruhiger Lage. Ein Spaziergang an der Loisach entlang führt ins Stadtzentrum."
      />

      <div className="font-jost bg-q-background mx-auto flex max-w-[1190px] gap-5 px-10">
        <div className="flex flex-col gap-5">
          <div className="bg-q-review-card-background flex w-[367px] items-start gap-4 p-5 py-7">
            <div className="bg-q-text-dark-darkest flex h-12 w-12 items-center justify-center rounded-full">
              <Image src={house} alt="house" className="absolute h-6 w-6" />
            </div>
            <div>
              <h5 className="text-q-text-dark-darkest text-2xl/7 font-medium tracking-wide">
                Brandstraße 32
              </h5>
              <p className="text-q-text-dark-darkest text-base/5.5 font-normal tracking-wide">
                82467 Garmisch-Partenkirchen
              </p>
            </div>
          </div>
          <div className="bg-q-card-background flex h-[355px] w-[367px] flex-col gap-6 p-5 py-7">
            <div className="flex w-[367px] items-start gap-4">
              <div className="bg-q-text-dark-700 flex h-12 w-12 items-center justify-center rounded-full">
                <Image
                  src={trainRegional}
                  alt="trainRegional"
                  className="absolute h-6 w-6"
                />
              </div>
              <div>
                <h5 className="text-q-text-dark-700 text-2xl/7 font-medium tracking-wide">
                  Bahnhof
                </h5>
                <p className="text-q-text-dark-700 text-base/5.5 font-normal tracking-wide">
                  10 minuten
                </p>
              </div>
            </div>
            <div className="flex w-[367px] items-start gap-4">
              <div className="bg-q-text-dark-700 flex h-12 w-12 items-center justify-center rounded-full">
                <Image src={bus} alt="tbc" className="absolute h-6 w-6" />
              </div>
              <div>
                <h5 className="text-q-text-dark-700 text-2xl/7 font-medium tracking-wide">
                  Bushaltestelle
                </h5>
                <p className="text-q-text-dark-700 text-base/5.5 font-normal tracking-wide">
                  1 minute
                </p>
              </div>
            </div>
            <div className="flex w-[367px] items-start gap-4">
              <div className="bg-q-text-dark-700 flex h-12 w-12 items-center justify-center rounded-full">
                <Image src={cableCar} alt="tbc" className="absolute h-6 w-6" />
              </div>
              <div>
                <h5 className="text-q-text-dark-700 text-2xl/7 font-medium tracking-wide">
                  Alpspitzbahn
                </h5>
                <p className="text-q-text-dark-700 text-base/5.5 font-normal tracking-wide">
                  6 minuten
                </p>
              </div>
            </div>
            <div className="flex w-[367px] items-start gap-4">
              <div className="bg-q-text-dark-700 flex h-12 w-12 items-center justify-center rounded-full">
                <Image
                  src={trainSimple}
                  alt="tbc"
                  className="absolute h-6 w-6"
                />
              </div>
              <div>
                <h5 className="text-q-text-dark-700 text-2xl/7 font-medium tracking-wide">
                  Zugspitzbahn
                </h5>
                <p className="text-q-text-dark-700 text-base/5.5 font-normal tracking-wide">
                  6 minuten
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[482x] w-[883px] overflow-hidden bg-amber-600">
          <Image src={google} alt="tbc" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
