"use client";
import NavBar from "@/components/sections/nav-bar";
import Hero from "@/components/sections/hero";
import Rooms from "@/components/sections/rooms/page";
import Highlights from "@/components/sections/highlights";
import Reviews from "@/components/sections/reviews";
import Directions from "@/components/sections/directions";
import BookingRequest from "@/components/sections/booking-request";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <main className="bg-q-blue relative overflow-x-hidden">
      <NavBar />
      <div ref={ref} className="h-screen"></div>
      <Hero opacity={opacity} scale={scale} />
      <Rooms />
      <Highlights />
      <Reviews />
      <Directions />
      <BookingRequest />
    </main>
  );
}
