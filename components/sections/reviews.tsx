import React from "react";
import SectionHeading from "./componts";

import ReviewAvatar1 from "@/public/images/InUse/Review-avatar-1.jpg";
import ReviewAvatar2 from "@/public/images/InUse/Review-avatar-2.jpg";
import star from "@/public/icons/star.svg";
import Image, { StaticImageData } from "next/image";

type Review = {
  pictureSrc: StaticImageData;
  pictureAlt: string;
  name: string;
  reviewAt: string;
  paragraph: string;
};

const reviews = [
  {
    pictureSrc: ReviewAvatar1,
    pictureAlt: "Mike",
    name: "Mike",
    reviewAt: "23 April 2025",
    paragraph:
      "Die Wohnung von Elenor ist ein Traum. Der perfekte Bergblick von beiden geräumigen Balkonen und innen eine absolute Wohlfühloase. Hohe Decken mit schönen Holzbalken und gemütliche Möbel.",
  },
  {
    pictureSrc: ReviewAvatar2,
    pictureAlt: "Vera",
    name: "Vera",
    reviewAt: "30 Juni 2025",
    paragraph:
      "Hier ist besonders die Kleinkindgerechte Ausstattung hervorzuheben die unseren Urlaub sehr bereichert hat. Eine gute Verdunklung der Fenster für den Mittagsschlaf, Kinderbett und Kinderstühle, Spielsachen",
  },
  {
    pictureSrc: ReviewAvatar1,
    pictureAlt: "Otto",
    name: "Otto",
    reviewAt: "14 Februar 2025",
    paragraph:
      "Das Decken von Elenor ist ein Traum. Der perfekte Bergblick von beiden geräumigen Balkonen und innen eine absolute Wohlfühloase. Hohe Decken mit schönen Holzbalken und gemütliche Möbel.",
  },
  {
    pictureSrc: ReviewAvatar2,
    pictureAlt: "Michael",
    name: "Michael",
    reviewAt: "23 April 2025",
    paragraph:
      "Hier ist besonders die Kleinkindgerechte Ausstattung hervorzuheben die unseren Urlaub sehr bereichert hat. Eine gute Verdunklung der Fenster für den Mittagsschlaf, Kinderbett und Kinderstühle, Spielsachen",
  },
  {
    pictureSrc: ReviewAvatar1,
    pictureAlt: "Alex",
    name: "Alex",
    reviewAt: "30 Juni 2025",
    paragraph:
      "Das Decken von Elenor ist ein Traum. Der perfekte Bergblick von beiden geräumigen Balkonen und innen eine absolute Wohlfühloase. Hohe Decken mit schönen Holzbalken und gemütliche Möbel.",
  },
] as Review[];

export default function Reviews() {
  return (
    <div className="bg-q-background pb-50">
      <div className="flex flex-col items-center justify-center pb-20">
        <SectionHeading
          heading="Das&nbsp;&nbsp;sagen&nbsp;&nbsp;unsere&nbsp;&nbsp;Gäste"
          paragraph={
            <>
              Gesamtbewertung <strong>5.0</strong> von 5, basierend auf{" "}
              <strong>19 Bewertungen</strong>
            </>
          }
        />
      </div>
      <div className="relative w-full pr-25">
        <div className="my-reviews-gradient absolute right-25 h-[309px] w-80"></div>
        <div className="scrollbar-hide w-full overflow-x-auto overscroll-x-contain scroll-smooth">
          <div className="ml-25 flex w-fit gap-5">
            {reviews.map((review, index) => (
              <Card key={index} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ review }: { review: Review }) {
  return (
    <div className="bg-q-review-card-background font-jost border-q-review-card-border flex h-[309px] w-[496px] flex-col gap-3 rounded-xl border px-5 py-6">
      <div className="flex items-center gap-3">
        <Image
          height={60}
          width={60}
          className="rounded-full"
          src={review.pictureSrc}
          alt={review.pictureAlt}
        />
        <div>
          <h5 className="text-2xl/8 font-semibold">{review.name}</h5>
          <p className="text-base/6">{review.reviewAt}</p>
        </div>
      </div>

      <div className="flex gap-1">
        <Image src={star} alt={"star"} />
        <Image src={star} alt={"star"} />
        <Image src={star} alt={"star"} />
        <Image src={star} alt={"star"} />
        <Image src={star} alt={"star"} />
      </div>
      <p className="text-xl/8 tracking-wider">“{review.paragraph}”</p>
    </div>
  );
}
