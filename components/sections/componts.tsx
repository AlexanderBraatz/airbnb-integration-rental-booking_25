import React from "react";

export default function SectionHeading({
  heading,
  paragraph,
}: {
  heading: string;
  paragraph: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-10 py-5">
        <div>left adornment</div>
        <h3 className="text-q-text-dark-700 font-reem-kufi text-6xl tracking-[-6%]">
          {heading}
        </h3>
        <div>left adornment</div>
      </div>
      <p className="text-q-text-dark-700 font-jost mb-24 w-[797px] text-center text-xl leading-[30px] tracking-wide">
        {paragraph}
      </p>
    </div>
  );
}
