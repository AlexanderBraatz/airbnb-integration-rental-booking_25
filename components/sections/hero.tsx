import React from "react";
import view from "@/public/images/InUse/Polaroid-mountains-no-drop-min.png";
import balcony from "@/public/images/InUse/Polaroid-balcony-view-no-drop-min.png";
import sheep from "@/public/images/InUse/Polaroid-sheep-no-drop-min.png";
import outside from "@/public/images/InUse/Polaroid-outside-view-no-text.png";
import mountainsLayer from "@/public/images/InUse/mountains-cropped-layer-min.png";
import Image from "next/image";
import Link from "next/link";
// min-h-[900px] and screen is used to make the image an gradient to sit nicly for now , but i need ot build out the cntent and then see hwo best to make it responsive for taller desktop screens or vertical ipadds probablya a uper and lower bound with the spacbing added inbetween the top and bottom content
export default function Hero() {
  return (
    <>
      <section className="mobile:min-h-[111px] mobile:h-[700px] relative h-[calc(100vh-50px)] min-h-[860px] overflow-x-clip">
        {/* hero background */}
        <div className="my-gradient mobile:min-h-[111px] mobile:h-[700px] pointer-events-none absolute left-[50%] h-[calc(100vh-50px)] min-w-[1728px] translate-x-[-50%]"></div>

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
        <div className="desktopSM:w-full desktopSM:px-10 tablet:px-5 mobile:px-4 relative left-[50%] z-10 mt-0 w-[1270px] translate-x-[-50%]">
          {/* spacer is using the same width of the nav bar  */}
          <div id="navbar spacer" className="tablet:h-[3rem] h-[5rem]"></div>
          <div className="tablet:flex-col tablet:justify-start mt-5 flex justify-between">
            <h1 className="font-reem-kufi tablet:mb-5 mobile:text-[40px]/12 tablet:text-[64px]/19 relative -left-1 w-[500px] text-[10rem]/40 font-bold tracking-[-6%] text-wrap text-white">
              <span className="tablet:block hidden">
                Sieben&nbsp;&nbsp;Gipfel&nbsp;&nbsp;Blick
              </span>
              <span className="tablet:hidden block">Sieben Gipfel Blick</span>
              <span className="tablet:block hidden">
                Ihr&nbsp;&nbsp;Urlaub&nbsp;&nbsp;mit&nbsp;&nbsp;
              </span>
              <span className="tablet:block hidden">Aussicht</span>
            </h1>
            <div>
              <div className="scrollbar-hide tablet:w-[103vw] tablet:pl-5 tablet:-left-5 relative flex overflow-x-scroll scroll-smooth">
                <ul className="tablet:w-[754px] flex gap-5">
                  <li className="mobile:block relative hidden w-[238px]">
                    <Image
                      src={outside}
                      alt="view of the building from the outside"
                      quality={100}
                      height={508}
                      width={416}
                      className="w-[238px]"
                    />
                    <span className="font-cedarville-cursive text-q-black-for-polaroid tracking-wideee absolute right-4.5 bottom-3 -rotate-2 text-2xl/8">
                      Hereinspaziert
                    </span>
                  </li>
                  <li className="mobile:hidden relative w-[238px]">
                    <Image
                      src={sheep}
                      alt="sheep"
                      quality={100}
                      height={508}
                      width={416}
                      className="w-[238px]"
                    />
                    <span className="font-cedarville-cursive text-q-black-for-polaroid tracking-wideseet absolute right-4.5 bottom-2.5 -rotate-4 text-2xl/8">
                      Natur
                    </span>
                  </li>
                  <li className="mobile:hidden relative w-[238px]">
                    <Image
                      src={view}
                      alt="sheep"
                      quality={100}
                      height={508}
                      width={416}
                      className="w-[238px]"
                    />
                    <span className="font-cedarville-cursive text-q-black-for-polaroid tracking-wideee absolute right-4.5 bottom-3 -rotate-2 text-2xl/8">
                      Traumaussicht
                    </span>
                  </li>
                  <li className="desktopSM:hidden tablet:block relative w-[238px]">
                    <Image
                      src={balcony}
                      alt="sheep"
                      quality={100}
                      height={508}
                      width={416}
                      className="w-[238px]"
                    />
                    <span className="font-cedarville-cursive text-q-black-for-polaroid tracking-wideseet absolute right-4.5 bottom-3 -rotate-2 text-2xl/8">
                      Wohlgefühl
                    </span>
                  </li>
                </ul>
              </div>
              <p className="font-jost text-q-wite-almost mt-7 max-w-[496px] text-base font-medium">
                Willkommen bei uns in den Bergen. Unsere ruhige Ferienwohnung
                für bis zu 5 Personen liegt direkt am Wanderweg und bietet Ihnen
                einen freien Blick auf die Alpen. Ihr Ort zum Ankommen und
                Durchatmen.
              </p>
            </div>
          </div>
        </div>
        <div className="desktopSM:w-screen mobile:hidden desktopSM:px-10 tablet:px-5 absolute bottom-0 left-[50%] z-10 mt-18 w-[1270px] translate-x-[-50%]">
          <div className="flex justify-between">
            <div className="flex items-end gap-5 pb-4">
              <Link
                href="#bookingRequest"
                className="hover:bg-q-button-red active:bg-q-button-red-darker flex h-14 w-[238px] items-center justify-center rounded-full border bg-neutral-50 py-4.5 transition-colors duration-300 ease-in-out hover:border-neutral-50 hover:[&>span]:text-white"
              >
                <span className="font-jost text-q-neon-blue text hover:[&>span]text-white text-xl/5 font-bold">
                  ANFRAGEN
                </span>
              </Link>
              <Link
                href="#reviews"
                className="hover:bg-q-button-red active:bg-q-button-red-darker flex h-14 w-[238px] items-center justify-center rounded-full border border-neutral-50 py-4.5 transition-colors duration-300 ease-in-out"
              >
                <span className="font-jost text text-xl/5 font-bold text-neutral-50">
                  BEWERTUNGEN
                </span>
              </Link>
            </div>
            <h2 className="font-reem-kufi w-max-[650px] tablet:hidden text-q-wite-almost desktopSM:text-[96px]/24 block text-right text-[8rem]/32 font-bold tracking-[-6%]">
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
