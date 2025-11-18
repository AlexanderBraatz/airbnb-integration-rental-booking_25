"use client";

import Image from "next/image";
import React from "react";
import arrow from "@/public/icons/arrow-right-neon-blue.svg";
import logo from "@/public/icons/logo-fff.svg";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useActiveSectionContext } from "@/context/active-section-context";
import Link from "next/link";

export default function NavBar() {
  // shrink header on scroll logic
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // setIsScrolled(latest > 50 && latest > Math.abs(scrollY.getPrevious() ?? 0));
    setIsScrolled(latest > 50);
  });

  //section navigation logic
  const {
    activeSection,
    setActiveSection,
    setTimeOfLastCLick,
    headerSections,
    setHeaderSections,
  } = useActiveSectionContext();

  return (
    <motion.div
      className={`bg-q-blue-95-transparent fixed z-60 flex w-full items-center justify-between border-b-[1px] border-white px-10 text-neutral-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "nav-height-small" : "nav-height"
      }`}
      layout
    >
      <Image
        src={logo}
        alt="logo"
        className={`w-fit py-1 transition-all duration-300 ${isScrolled ? "h-10" : "h-10"}`}
      />

      <div className="flex items-center gap-10">
        <ul className="font-reem-kufi flex gap-7 text-2xl/7 tracking-tighter">
          {Array.from(headerSections.slice(0, -1)).map((link) => (
            <Link
              href={link.hash}
              key={link.hash}
              className="w-fit cursor-pointer"
              onClick={() => {
                setActiveSection(link.name);
                setTimeOfLastCLick(Date.now());
              }}
            >
              <span>{link.name}</span>
              <div
                className={`mx-auto h-0.25 bg-white transition-all duration-200 ${activeSection === link.name ? "w-full" : "w-0"}`}
              ></div>
            </Link>
          ))}
        </ul>
        <div>
          <Link
            href={headerSections[headerSections.length - 1].hash}
            className={`flex items-center gap-4 rounded-full bg-neutral-50 py-4.5 pr-8 pl-12 transition-all duration-300 ease-in-out ${isScrolled ? "h-10" : "h-14"}`}
          >
            <span className="font-jost text-q-neon-blue text text-xl/5 font-bold">
              ANFRAGEN
            </span>
            <Image src={arrow} alt="arrow" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
