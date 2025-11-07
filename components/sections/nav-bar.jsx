import React from "react";

export default function NavBar() {
  return (
    <div className="bg-q-blue flex h-[6rem] w-full items-center justify-between border-b-[1px] border-white px-10 text-neutral-50">
      <div className="h-[62px] w-[203px] bg-green-950">LOGO</div>
      <div className="flex gap-10">
        <ul className="font-reem-kufi-fun flex gap-7">
          <li>Zimmer</li>
          <li>Ausstattung</li>
          <li>Bewertung</li>
          <li>Anfahrt</li>
        </ul>
        <div>
          <a>
            <span className="font-jost">ANFRAGEN</span>
            <span>icon</span>
          </a>
        </div>
      </div>
    </div>
  );
}
