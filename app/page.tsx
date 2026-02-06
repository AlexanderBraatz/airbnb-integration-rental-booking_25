import NavBar from "@/components/sections/nav-bar";
import Hero from "@/components/sections/hero";
import Rooms from "@/components/sections/rooms/page";
import Highlights from "@/components/sections/highlights";
import Reviews from "@/components/sections/reviews";
import Directions from "@/components/sections/directions";
import BookingRequestSection from "@/components/sections/booking-request-section";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <main className="bg-q-blue relative">
        <NavBar />
        <Hero />
        <Rooms />
        <Highlights />
        <Reviews />
        <Directions />
        <BookingRequestSection />
      </main>
      <Footer />
    </>
  );
}
