import Image from "next/image";
import React from "react";
import arrow from "@/public/icons/arrow-right-neon-blue.svg";
import logo from "@/public/icons/logo-fff.svg";
export default function NavBar() {
  return (
    <div className="bg-q-blue flex h-[6rem] w-full items-center justify-between border-b-[1px] border-white px-10 text-neutral-50">
      <Image src={logo} alt="logo" />

      <div className="flex items-center gap-10">
        <ul className="font-reem-kufi-fun flex gap-7 text-2xl/7 tracking-tighter">
          <li className="h-7 border-b border-neutral-50">Zimmer</li>
          <li>Ausstattung</li>
          <li>Bewertung</li>
          <li>Anfahrt</li>
        </ul>
        <div>
          <a className="pl flex items-center gap-4 rounded-full bg-neutral-50 py-4.5 pr-8 pl-12">
            <span className="font-jost text-q-neon-blue text text-xl/1 font-bold">
              ANFRAGEN
            </span>

            <Image src={arrow} alt="arrow" />
          </a>
        </div>
      </div>
    </div>
  );
}
