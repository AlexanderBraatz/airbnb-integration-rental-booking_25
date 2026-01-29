"use client";

import { TwoPolaroidStackFinal } from "@/components/sections/rooms/components";
import outsideForntDoor from "@/public/images/InUse/Polaroid-outside-fornt-door.png";
import outsideView from "@/public/images/InUse/Polaroid-outside-view.png";

const finalDisplay = {
  adornmentWithHouse: false,
  inReverseOrder: true,
  heading: "Schlafzimmer   Zwei",
  paragraph:
    "Das zweite Schlafzimmer – liebevoll „blaues Zimmer“ genannt – ist ebenso großzügig gestaltet und mit einer gemütlichen Leseecke ausgestattet. Auch hier erwartet euch ein komfortables Kingsize-Bett für erholsame Nächte. Vom Zimmer aus gelangt ihr direkt auf den zweiten Balkon und könnt den Blick ins Freie genießen.",
  images: [outsideView, outsideForntDoor],
};

export function ReturnPagePolaroid() {
  return (
    <div className="tablet:hidden w-[505px]">
      <TwoPolaroidStackFinal room={finalDisplay} />
    </div>
  );
}
