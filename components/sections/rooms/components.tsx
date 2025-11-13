"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import arrowLeft from "@/public/icons/arrow-left.svg";
import arrowRight from "@/public/icons/arrow-right.svg";

const Position = {
  "0": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out", //top
  "1": "top-6 -right-[500px] rotate-10  z-40  duration-200 ease-in-out",
  "2": "top-6 -right-[500px] rotate-10  z-5 duration-10 ease-out",
  "3": "top-0 right-0 rotate-4 z-5 duration-600 ease-in-out scale-95",
  "4": "top-5 right-0 rotate-0 z-5 duration-600 ease-in-out hidden", //hiddedn 4th
  "5": "top-5 right-0 rotate-0 z-5 duration-400 ease-in-out hidden",
  "6": "top-5 right-0 rotate-0 z-10 duration-1000 ease-out hidden ",
  "7": "top-5 right-0 rotate-0 z-10 duration-1000 ease-out ",
  "8": "top-0 -right-12 rotate-4 z-10 duration-400 ease-out", //back
  "9": "top-0 -right-12 rotate-4 z-10 duration-400 ease-out",
  "10": "top-4 right-8 -rotate-3 z-20 duration-1000 ease-out",
  "11": "top-4 right-8 -rotate-3 z-20 duration-1000 ease-out",
  "12": "top-4 right-8 -rotate-3 z-20 duration-1000 ease-out", // middle
  "13": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
  "14": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
  "15": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
} as const;

type PostionKey = keyof typeof Position;

export type RoomType = {
  room: {
    adornmentWithHouse: boolean;
    inReverseOrder: boolean;
    heading: string;
    paragraph: string;
    images: StaticImageData[];
  };
};

export function FourPolaroidStack({ room }: RoomType) {
  const [order, setOrder] = useState({
    imageOne: 0, // position images[0]
    imageFour: 4, // position images[3]
    imageThree: 8, // position images[2]
    imageTwo: 12, // position images[1]
  });
  const handleRightClick = () => {
    console.log("right Click");
    setOrder((prev) => ({
      imageOne: (prev.imageOne + 1) % 16,
      imageFour: (prev.imageFour + 1) % 16,
      imageThree: (prev.imageThree + 1) % 16,
      imageTwo: (prev.imageTwo + 1) % 16,
    }));

    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 16,
        imageFour: (prev.imageFour + 1) % 16,
        imageThree: (prev.imageThree + 1) % 16,
        imageTwo: (prev.imageTwo + 1) % 16,
      }));
      console.log("3nd", order);
    }, 200);
    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 16,
        imageFour: (prev.imageFour + 1) % 16,
        imageThree: (prev.imageThree + 1) % 16,
        imageTwo: (prev.imageTwo + 1) % 16,
      }));
      console.log("3nd", order);
    }, 210);
    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 16,
        imageFour: (prev.imageFour + 1) % 16,
        imageThree: (prev.imageThree + 1) % 16,
        imageTwo: (prev.imageTwo + 1) % 16,
      }));
      console.log("3nd", order);
    }, 600);
  };
  const handleLeftClick = () => {
    console.log("right Click");
  };

  return (
    <div className="flex flex-col">
      <div onClick={handleRightClick} className="cursor-pointer">
        <div className="relative mb-10 h-[508px] w-[416px]">
          {room.images[0] === undefined ? (
            <></>
          ) : (
            <Image
              className={`${Position[order.imageOne.toString() as PositionForThreeKey as PostionKey]} absolute transform-gpu transition-all`}
              alt="Polaroid of the Living room"
              src={room.images[0]}
              width={416}
              height={508}
              quality={100}
            />
          )}
          {room.images[1] === undefined ? (
            <></>
          ) : (
            <Image
              className={`${Position[order.imageTwo.toString() as PositionForThreeKey as PostionKey]} absolute transform-gpu transition-all`}
              alt="Polaroid of the Living room"
              src={room.images[1]}
              width={416}
              height={508}
              quality={100}
            />
          )}
          {room.images[2] === undefined ? (
            <></>
          ) : (
            <Image
              className={`${Position[order.imageThree.toString() as PositionForThreeKey as PostionKey]} absolute transform-gpu transition-all`}
              alt="Polaroid of the Living room"
              src={room.images[2]}
              width={416}
              height={508}
              quality={100}
            />
          )}
          {room.images[3] === undefined ? (
            <></>
          ) : (
            <Image
              className={`${Position[order.imageFour.toString() as PositionForThreeKey as PostionKey]} absolute transform-gpu transition-all`}
              alt="Polaroid of the Living room"
              src={room.images[3]}
              width={416}
              height={508}
              quality={100}
            />
          )}
          {/* <div className="pointer-events-none absolute left-[50%] z-30 h-[600px] w-[600px] translate-x-[-50%] rounded-full bg-black opacity-10 blur-3xl"></div> */}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={handleLeftClick}
        >
          <Image
            alt="arrow left "
            // className="bg-neutral-400"
            src={arrowLeft}
          />
        </button>
        {room.images.map((image, index) => (
          <div key={index} className="flex h-6 w-6 items-center justify-center">
            <div
              className={`${order.imageOne / 4 === index ? "bg-neutral-700" : "bg-neutral-500"} h-3 w-3 rounded-full bg-neutral-500 transition-colors`}
            ></div>
          </div>
        ))}
        <button
          onClick={handleRightClick}
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
        >
          <Image
            alt="arrow right "
            // className="bg-neutral-400"
            src={arrowRight}
          />
        </button>
      </div>
    </div>
  );
}

const PositionForThree = {
  "0": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out", //top
  "1": "top-0 -right-[500px] rotate-10  z-40  duration-200 ease-out",
  "2": "top-0 -right-[500px] rotate-10  z-10 duration-10 ease-out",
  "3": "top-0 -right-12 rotate-4 z-10 duration-400 ease-in-out", //back
  "4": "top-4 right-8 -rotate-3 z-20 duration-1000 ease-out",
  "5": "top-4 right-8 -rotate-3 z-20 duration-1000 ease-out",
  "6": "top-4 right-8 -rotate-3 z-20 duration-1000 ease-out", // middle
  "7": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
  "8": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
} as const;

type PositionForThreeKey = keyof typeof PositionForThree;

export function ThreePolaroidStack({ room }: RoomType) {
  const [order, setOrder] = useState({
    imageOne: 0, // position images[0]
    imageTwo: 6, // position images[1]
    imageThree: 3, // position images[2]
  });
  const handleRightClick = () => {
    console.log("right Click");
    setOrder((prev) => ({
      imageOne: (prev.imageOne + 1) % 9,
      imageTwo: (prev.imageTwo + 1) % 9,
      imageThree: (prev.imageThree + 1) % 9,
    }));

    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 9,
        imageTwo: (prev.imageTwo + 1) % 9,
        imageThree: (prev.imageThree + 1) % 9,
      }));
      console.log("3nd", order);
    }, 200);
    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 9,
        imageTwo: (prev.imageTwo + 1) % 9,
        imageThree: (prev.imageThree + 1) % 9,
      }));
      console.log("3nd", order);
    }, 210);
  };
  const handleLeftClick = () => {
    console.log("right Click");
  };

  return (
    <div className="flex flex-col">
      <div onClick={handleRightClick} className="cursor-pointer">
        <div className="relative mb-10 h-[508px] w-[416px]">
          {room.images[0] === undefined ? (
            <></>
          ) : (
            <Image
              className={`${PositionForThree[order.imageOne.toString() as PositionForThreeKey]} absolute transform-gpu transition-all`}
              alt="Polaroid of the Living room"
              src={room.images[0]}
              width={416}
              height={508}
              quality={100}
            />
          )}
          {room.images[1] === undefined ? (
            <></>
          ) : (
            <Image
              className={`${PositionForThree[order.imageTwo.toString() as PositionForThreeKey]} absolute transform-gpu transition-all`}
              alt="Polaroid of the Living room"
              src={room.images[1]}
              width={416}
              height={508}
              quality={100}
            />
          )}
          {room.images[2] === undefined ? (
            <></>
          ) : (
            <Image
              className={`${PositionForThree[order.imageThree.toString() as PositionForThreeKey]} absolute transform-gpu transition-all`}
              alt="Polaroid of the Living room"
              src={room.images[2]}
              width={416}
              height={508}
              quality={100}
            />
          )}
          {/* <div className="pointer-events-none absolute left-[50%] z-30 h-[600px] w-[600px] translate-x-[-50%] rounded-full bg-black opacity-10 blur-3xl"></div> */}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={handleLeftClick}
        >
          <Image
            alt="arrow left "
            // className="bg-neutral-400"
            src={arrowLeft}
          />
        </button>
        {room.images.map((image, index) => (
          <div key={index} className="flex h-6 w-6 items-center justify-center">
            <div
              className={`${order.imageOne / 3 === index ? "bg-neutral-700" : "bg-neutral-500"} h-3 w-3 rounded-full bg-neutral-500 transition-colors`}
            ></div>
          </div>
        ))}
        <button
          onClick={handleRightClick}
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
        >
          <Image
            alt="arrow right "
            // className="bg-neutral-400"
            src={arrowRight}
          />
        </button>
      </div>
    </div>
  );
}

const PositionForTwo = {
  "0": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out", //top
  "1": "top-0 -right-[500px] rotate-10  z-40  duration-200 ease-out",
  "2": "top-0 -right-[500px] rotate-10  z-10 duration-10 ease-out",
  "3": "top-4 right-8 -rotate-3 z-10 duration-400 ease-in-out", // middle
  "4": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
  "5": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
} as const;

type PositionForTwoKey = keyof typeof PositionForTwo;

export function TwoPolaroidStack({ room }: RoomType) {
  const [order, setOrder] = useState({
    imageOne: 0, // position images[0]
    imageTwo: 3, // position images[1]
  });
  const handleRightClick = () => {
    console.log("right Click");
    setOrder((prev) => ({
      imageOne: (prev.imageOne + 1) % 6,
      imageTwo: (prev.imageTwo + 1) % 6,
    }));

    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 6,
        imageTwo: (prev.imageTwo + 1) % 6,
      }));
      console.log("3nd", order);
    }, 200);
    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 6,
        imageTwo: (prev.imageTwo + 1) % 6,
      }));
      console.log("3nd", order);
    }, 210);
  };
  const handleLeftClick = () => {
    console.log("right Click");
  };

  return (
    <div className="flex flex-col">
      <div onClick={handleRightClick} className="cursor-pointer">
        <div className="relative mb-10 h-[508px] w-[416px]">
          {room.images[0] === undefined ? (
            <></>
          ) : (
            <Image
              className={`${PositionForTwo[order.imageOne.toString() as PositionForTwoKey]} absolute transform-gpu transition-all`}
              alt="Polaroid of the Living room"
              src={room.images[0]}
              width={416}
              height={508}
              quality={100}
            />
          )}
          {room.images[1] === undefined ? (
            <></>
          ) : (
            <Image
              className={`${PositionForTwo[order.imageTwo.toString() as PositionForTwoKey]} absolute transform-gpu transition-all`}
              alt="Polaroid of the Living room"
              src={room.images[1]}
              width={416}
              height={508}
              quality={100}
            />
          )}
          {/* <div className="pointer-events-none absolute left-[50%] z-30 h-[600px] w-[600px] translate-x-[-50%] rounded-full bg-black opacity-10 blur-3xl"></div> */}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={handleLeftClick}
        >
          <Image
            alt="arrow left "
            // className="bg-neutral-400"
            src={arrowLeft}
          />
        </button>
        {room.images.map((image, index) => (
          <div key={index} className="flex h-6 w-6 items-center justify-center">
            <div
              className={`${order.imageOne / 3 === index ? "bg-neutral-700" : "bg-neutral-500"} h-3 w-3 rounded-full bg-neutral-500 transition-colors`}
            ></div>
          </div>
        ))}
        <button
          onClick={handleRightClick}
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
        >
          <Image
            alt="arrow right "
            // className="bg-neutral-400"
            src={arrowRight}
          />
        </button>
      </div>
    </div>
  );
}

const PositionForTwoFinal = {
  "0": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out", //top
  "1": "top-0 -right-[500px] rotate-10  z-40  duration-200 ease-out",
  "2": "top-0 -right-[500px] rotate-10  z-10 duration-10 ease-out",
  "3": "top-0 -right-8 rotate-5 z-10 duration-400 ease-in-out", // middle
  "4": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
  "5": "top-0 right-0 rotate-0 z-40 duration-1000 ease-out",
} as const;

type PositionForTwoFinalKey = keyof typeof PositionForTwo;

export function TwoPolaroidStackFinal({ room }: RoomType) {
  const [order, setOrder] = useState({
    imageOne: 0, // position images[0]
    imageTwo: 3, // position images[1]
  });
  const handleRightClick = () => {
    console.log("right Click");
    setOrder((prev) => ({
      imageOne: (prev.imageOne + 1) % 6,
      imageTwo: (prev.imageTwo + 1) % 6,
    }));

    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 6,
        imageTwo: (prev.imageTwo + 1) % 6,
      }));
      console.log("3nd", order);
    }, 200);
    setTimeout(() => {
      setOrder((prev) => ({
        imageOne: (prev.imageOne + 1) % 6,
        imageTwo: (prev.imageTwo + 1) % 6,
      }));
      console.log("3nd", order);
    }, 210);
  };

  return (
    <div className="mx-auto flex w-fit flex-col">
      <div onClick={handleRightClick} className="cursor-pointer">
        <div className="relative top-6 mb-10 h-[508px] w-[416px]">
          {room.images[0] === undefined ? (
            <></>
          ) : (
            <Image
              className={`${PositionForTwoFinal[order.imageOne.toString() as PositionForTwoFinalKey]} absolute transform-gpu transition-all`}
              alt="Polaroid of the Living room"
              src={room.images[0]}
              width={416}
              height={508}
              quality={100}
            />
          )}
          {room.images[1] === undefined ? (
            <></>
          ) : (
            <Image
              className={`${PositionForTwoFinal[order.imageTwo.toString() as PositionForTwoFinalKey]} absolute transform-gpu transition-all`}
              alt="Polaroid of the Living room"
              src={room.images[1]}
              width={416}
              height={508}
              quality={100}
            />
          )}
          {/* <div className="pointer-events-none absolute left-[50%] z-30 h-[600px] w-[600px] translate-x-[-50%] rounded-full bg-black opacity-10 blur-3xl"></div> */}
        </div>
      </div>
    </div>
  );
}
