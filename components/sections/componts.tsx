import React, { ReactNode } from "react";

export default function SectionHeading({
  heading,
  paragraph,
}: {
  heading: string;
  paragraph: string | ReactNode;
}) {
  return (
    <div className="mb-24 flex flex-col items-center justify-center">
      <div className="flex gap-10 pb-5">
        <div>left adornment</div>
        <h3 className="text-q-text-dark-700 font-reem-kufi text-6xl/22 tracking-[-6%]">
          {heading}
        </h3>
        <div>left adornment</div>
      </div>
      <p className="text-q-text-dark-700 font-jost w-[797px] text-center text-xl leading-[30px] tracking-wide">
        {paragraph}
      </p>
    </div>
  );
}
