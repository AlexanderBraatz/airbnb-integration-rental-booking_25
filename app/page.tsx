import NavBar from "@/components/sections/nav-bar";
import Hero from "@/components/sections/hero";
import Rooms from "@/components/sections/rooms/page";
import Highlights from "@/components/sections/highlights";
import Reviews from "@/components/sections/reviews";
import Directions from "@/components/sections/directions";
import BookingRequest from "@/components/sections/booking-request";

export default function Home() {
  return (
    <main className="bg-q-blue relative">
      <NavBar />
      <Hero />
      <Rooms />
      <Highlights />
      <Reviews />
      <Directions />
      <BookingRequest />
    </main>
  );
}
