import React from "react";
import view from "@/public/images/InUse/Polaroid-mountains-no-drop-min.png";
import balcony from "@/public/images/InUse/Polaroid-balcony-view-no-drop-min.png";
import sheep from "@/public/images/InUse/Polaroid-sheep-no-drop-min.png";
import mountainsLayer from "@/public/images/InUse/mountains-cropped-layer-min.png";
import Image from "next/image";
// min-h-[900px] and screen is used to make the image an gradient to sit nicly for now , but i need ot build out the cntent and then see hwo best to make it responsive for taller desktop screens or vertical ipadds probablya a uper and lower bound with the spacbing added inbetween the top and bottom content
export default function Hero() {
  return (
    <>
      <section className="relative h-[calc(100vh-50)] min-h-[860px]">
        {/* hero background */}
        <div className="my-gradient pointer-events-none absolute left-[50%] h-[calc(100vh-50)] min-w-[1728px] translate-x-[-50%]"></div>
        <Image
          src={mountainsLayer}
          width={1728}
          height={436}
          alt="mountain background"
          quality={100}
          className="absolute bottom-0 left-[50%] min-w-[1728px] translate-x-[-50%]"
        />
        <div className="bg-q-blue-75-transparent pointer-events-none absolute inset-0"></div>
        {/* hero content */}
        <div className="absolute left-[50%] z-10 mt-12 w-[1270px] translate-x-[-50%]">
          <div id="navbar spacer" className="nav-height"></div>
          <div className="flex">
            <h1 className="font-reem-kufi w-max-[500px] relative -left-1 text-[10rem]/40 font-bold tracking-[-6%] text-white">
              Sieben Gipfel Blick
            </h1>
            <div>
              <div className="flex">
                <ul className="flex gap-5">
                  <li className="relative w-[238px]">
                    <Image
                      src={sheep}
                      alt="sheep"
                      quality={100}
                      height={508}
                      width={416}
                      className="w-[238px]"
                    />
                    {/* <span className="font-cedarville-cursive text-q-black-for-polaroid text-2xl/8 tracking-widest">
                      wonderfull
                    </span> */}
                  </li>
                  <li className="relative w-[238px]">
                    <Image
                      src={view}
                      alt="sheep"
                      quality={100}
                      height={508}
                      width={416}
                      className="w-[238px]"
                    />
                    <span className="font-cedarville-cursive text-q-black-for-polaroid absolute right-4 bottom-2 -rotate-2 text-2xl/8 tracking-widest">
                      ein Traum
                    </span>
                  </li>
                  <li className="relative w-[238px]">
                    <Image
                      src={balcony}
                      alt="sheep"
                      quality={100}
                      height={508}
                      width={416}
                      className="w-[238px]"
                    />
                    <span className="font-cedarville-cursive text-q-black-for-polaroid absolute right-4 bottom-2 -rotate-2 text-2xl/8 tracking-widest">
                      wohlgefühl
                    </span>
                  </li>
                </ul>
              </div>
              <p className="font-jost text-q-wite-almost mt-7 max-w-[496px] text-base font-medium">
                Nähe zu den Bergen. Die voll ausgestattete 5-Bett-Wohnung liegt
                direkt am Wanderweg und ist Kinder freundlich eingerichtet.
                Buchen Sie jetzt Ihren Urlaub in und genießen Sie eine ruhige
                Lage.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-[50%] z-10 mt-18 w-[1270px] translate-x-[-50%]">
          <div className="flex justify-between">
            <div className="flex items-end gap-5 pb-4">
              <a className="flex h-14 w-[238px] items-center justify-center rounded-full bg-neutral-50 py-4.5">
                <span className="font-jost text-q-neon-blue text text-xl/5 font-bold">
                  ANFRAGEN
                </span>
              </a>
              <a className="flex h-14 w-[238px] items-center justify-center rounded-full border border-neutral-50 py-4.5">
                <span className="font-jost text text-xl/5 font-bold text-neutral-50">
                  BEWERTUNGEN
                </span>
              </a>
            </div>
            <h2 className="font-reem-kufi w-max-[650px] text-q-wite-almost text-right text-[8rem]/32 font-bold tracking-[-6%]">
              <span>Ihr</span>
              <br />
              <span>Urlaub</span>
              <br />
              <span>mit&nbsp;&nbsp;Aussicht</span>
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
