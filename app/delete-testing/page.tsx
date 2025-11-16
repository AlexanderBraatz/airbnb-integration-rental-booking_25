"use client";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import mountainsLayer from "@/public/images/InUse/mountains-cropped-layer-min.png";

import Image from "next/image";
import React, { useRef } from "react";

type CardT = { heading: string; color: string };

const cardData = [
  { heading: "hello", color: "bg-green-400" },
  { heading: "there", color: "bg-green-600" },
  { heading: "we", color: "bg-green-800" },
  { heading: "are", color: "bg-green-900" },
];

export default function Testing() {
  const bigRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: bigRef,
    offset: ["start start", "end end"],
  });
  return (
    <div ref={bigRef} className="sticky top-0 mb-[50vh]">
      {cardData.map((card, index) => {
        const targetSize = 1 - (cardData.length - index) * 0.05;
        // console.log(cardData.length, index, targetSize);
        return (
          <Card
            key={index}
            outerScroll={scrollYProgress}
            index={index}
            card={card}
            targetSize={targetSize}
          />
        );
      })}
    </div>
  );
}

function Card({
  card,
  index,
  outerScroll,
  targetSize,
}: {
  card: CardT;
  index: number;
  outerScroll: MotionValue<number>;
  targetSize: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scalecard = useTransform(outerScroll, [0, 1], [1, targetSize]);
  //   const scalecard = useTransform(outerScroll, [0, 1], [1, 0.8]);

  const topDicFrimIndex = {
    "0": "top-[calc(-10%_+_25px)]",
    "1": "top-[calc(-10%_+_50px)]",
    "2": "top-[calc(-10%_+_75px)]",
    "3": "top-[calc(-10%_+_100px)]",
  };
  type topDicFrimIndexKey = keyof typeof topDicFrimIndex;

  return (
    <div
      ref={ref}
      className={`sticky top-0 flex h-screen items-center justify-center`}
    >
      <motion.div
        style={{ scale: scalecard }}
        className={`${card.color} ${topDicFrimIndex[index.toString() as topDicFrimIndexKey]} relative flex h-80 w-200 flex-col items-center justify-center rounded-xl`}
      >
        {card.heading}
        <div className="h-40 w-160 overflow-hidden bg-amber-600">
          <motion.div style={{ scale: scale }} className="h-full w-full">
            <Image src={mountainsLayer} className="bg-fill" alt="" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
