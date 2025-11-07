import React from "react";
import mountains from "@/public/images/InUse/mountains-radial-cropped-min-2.jpg";
import mountainsLayer from "@/public/images/InUse/mountains-cropped-layer-min.png";
import Image from "next/image";
// min-h-[900px] and screen is used to make the image an gradient to sit nicly for now , but i need ot build out the cntent and then see hwo best to make it responsive for taller desktop screens or vertical ipadds probablya a uper and lower bound with the spacbing added inbetween the top and bottom content
export default function Hero() {
  return (
    <div className="relative flex h-screen min-h-[900px] flex-col justify-end">
      <div className="my-gradient pointer-events-none absolute left-[50%] h-screen min-w-[1728px] translate-x-[-50%]"></div>
      <Image
        src={mountainsLayer}
        width={1728}
        height={436}
        alt="mountain background"
        quality={100}
        className="absolute left-[50%] min-w-[1728px] translate-x-[-50%]"
      />
      <div className="bg-q-blue-75-transparent pointer-events-none absolute inset-0"></div>
    </div>
  );
}
