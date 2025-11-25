"use client";
import React from "react";
import SectionHeading from "./componts";

import ReviewAvatar1 from "@/public/images/InUse/Review-avatar-1.jpg";
import ReviewAvatar2 from "@/public/images/InUse/Review-avatar-2.jpg";
import star from "@/public/icons/star.svg";
import arrowLeft from "@/public/icons/arrow-left.svg"; // adjust path if needed
import arrowRight from "@/public/icons/arrow-right.svg"; // adjust path if needed
import Image, { StaticImageData } from "next/image";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSectionInView } from "@/lib/hooks";
import useMediaQuery from "@/lib/utils/matchMedia";

type Review = {
  pictureSrc: StaticImageData;
  pictureAlt: string;
  name: string;
  reviewAt: string;
  paragraph: string;
};

const reviews: Review[] = [
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
];

const TOTAL_DOTS = reviews.length;

export default function Reviews() {
  const { activeSection, setActiveSection, setTimeOfLastCLick } =
    useActiveSectionContext();
  const { ref } = useSectionInView("Bewertungen", 0.5);

  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [activeDot, setActiveDot] = React.useState(1);

  const getStep = React.useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return 516;
    const first = scroller.querySelector<HTMLElement>('[data-review-card="0"]');
    const second = scroller.querySelector<HTMLElement>(
      '[data-review-card="1"]',
    );
    if (first && second) return second.offsetLeft - first.offsetLeft;
    // fallback (card width 496 + gap 20)
    return 516;
  }, []);

  // reflect leftmost card -> active dot (1-based)
  React.useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let ticking = false;
    const step = getStep();

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // the 200 is a quick fix which works in testing on all screens
        const idx = Math.floor((scroller.scrollLeft + 200) / step) + 1;
        const clamped = Math.max(1, Math.min(TOTAL_DOTS, idx));
        setActiveDot(clamped);
        ticking = false;
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [getStep]);

  const scrollToIndex = (index1Based: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const step = getStep();
    const targetLeft = (Math.max(1, index1Based) - 1) * step;
    scroller.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  const handleLeftClick = () => scrollToIndex(activeDot - 1);
  const handleRightClick = () => scrollToIndex(activeDot + 1);

  const isMobile = useMediaQuery("(max-width: 708px)");

  const responsiveHeading = isMobile
    ? "Das\u00A0\u00A0sagen\nunsere\u00A0\u00A0Gäste"
    : "Das\u00A0\u00A0sagen\u00A0\u00A0unsere\u00A0\u00A0Gäste";

  return (
    <section
      ref={ref}
      id="reviews"
      className="bg-q-background scroll-mt-28 pb-50"
    >
      <div className="flex flex-col items-center justify-center">
        <SectionHeading
          heading={responsiveHeading}
          paragraph={
            <>
              Gesamtbewertung <strong>5.0</strong> von 5, basierend auf{" "}
              <strong>19 Bewertungen</strong>
            </>
          }
        />
      </div>

      <div className="tablet:pr-10 mobile:pr-0 relative w-full pr-25">
        <div className="my-reviews-gradient tablet:right-10 mobile:right-0 mobile:h-full mobile:w-20 pointer-events-none absolute right-25 h-[309px] w-80"></div>

        {/* SCROLLER */}
        <div
          ref={scrollerRef}
          className="scrollbar-hide mb-12 w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
          aria-label="Gästebewertungen"
        >
          <div className="tablet:ml-10 mobile:ml-5 mobile:gap-3 ml-25 flex w-fit items-stretch gap-5">
            {reviews.map((review, index) => (
              <Card key={index} review={review} index={index} />
            ))}
            <div className="w-[calc(100vw-716px)]"></div>
          </div>
        </div>
      </div>

      {/* ARROWS + DOTS */}
      <div className="flex items-center justify-center">
        <button
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={handleLeftClick}
          aria-label="Zum vorherigen Review"
        >
          <Image alt="arrow left" src={arrowLeft} />
        </button>

        {Array.from({ length: TOTAL_DOTS }, (_, i) => {
          const dotIndex = i + 1;
          const isActive = activeDot === dotIndex;
          return (
            <button
              key={dotIndex}
              className="flex h-6 w-6 items-center justify-center"
              onClick={() => scrollToIndex(dotIndex)}
              aria-label={`Position ${dotIndex} von ${TOTAL_DOTS}`}
              aria-current={isActive ? "true" : undefined}
              type="button"
            >
              <div
                className={`${
                  isActive ? "bg-neutral-700" : "bg-neutral-500"
                } h-3 w-3 rounded-full transition-colors`}
              />
            </button>
          );
        })}

        <button
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={handleRightClick}
          aria-label="Zum nächsten Review"
        >
          <Image alt="arrow right" src={arrowRight} />
        </button>
      </div>
    </section>
  );
}

function Card({ review, index }: { review: Review; index: number }) {
  return (
    <div
      data-review-card={index}
      className="bg-q-review-card-background font-jost border-q-review-card-border mobile:px-3 mobile:py-3 mobile:pb-5 mobile:w-[80vw] flex w-[496px] shrink-0 flex-col gap-3 rounded-xl border px-5 py-6"
    >
      <div className="flex items-center gap-3">
        <Image
          height={60}
          width={60}
          className="mobile:h-12 mobile:w-12 rounded-full"
          src={review.pictureSrc}
          alt={review.pictureAlt}
        />
        <div>
          <h5 className="mobile:text-xl/8 text-2xl/8 font-semibold">
            {review.name}
          </h5>
          <p className="text-base/6">{review.reviewAt}</p>
        </div>
      </div>

      <div className="flex gap-1">
        <Image src={star} alt="star" />
        <Image src={star} alt="star" />
        <Image src={star} alt="star" />
        <Image src={star} alt="star" />
        <Image src={star} alt="star" />
      </div>

      <p className="mobile:text-base/6 text-xl/8 tracking-wider italic">
        “{review.paragraph}”
      </p>
    </div>
  );
}
