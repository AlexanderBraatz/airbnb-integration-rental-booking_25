import NavBar from "@/components/sections/nav-bar";
import Hero from "@/components/sections/hero";
import Rooms from "@/components/sections/rooms/page";
import Highlights from "@/components/sections/highlights";
import Reviews from "@/components/sections/reviews";

export default function Home() {
  return (
    <div>
      <NavBar />
      {/* <Hero /> */}
      {/* <Rooms /> */}
      <Highlights />
      <Reviews />
    </div>
  );
}
