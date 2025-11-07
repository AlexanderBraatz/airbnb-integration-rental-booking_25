import Image from "next/image";
import mountainpnd from "@/public/images/upscalemedia-transformed.png";
import logo from "@/public/images/logo.png";
import chair from "@/public/images/balcony-chair.jpeg";
import bed from "@/public/images/balcony-bed.jpeg";

export default function Home() {
  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto bg-amber-700 perspective-[24px]">
      <div className="tablet:bg-orange-extra-light sticky top-0 z-50 h-12 w-full bg-amber-700"></div>
      <header className="z-[-1] flex h-full items-center justify-center transform-3d">
        <div className="absolute z-[-1] h-screen w-screen shrink-0 -translate-z-6 scale-[2] bg-gradient-to-b from-blue-500 to-blue-50"></div>
        <Image
          src={mountainpnd}
          alt="picture of mountain view from the balcony"
          className="absolute top-[400px] z-[1] h-full w-full -translate-z-3 scale-[1.51] object-cover"
        />
        {/* Headline & Logo */}
        <div className="absolute top-[140px] left-[400px] z-[-1] -translate-z-6 scale-[2]">
          <div className="font-inter flex flex-col items-center justify-center text-4xl font-extrabold tracking-tight text-balance text-white text-shadow-lg">
            <Image
              src={logo}
              alt="picture of mountain view from the balcony"
              className="h-30 w-30"
              width={1024}
              height={1024}
            />
            <h1>Stay In the Mountains,</h1>
            <h1>without leaving the homely feel behind.</h1>
          </div>
        </div>
      </header>
      <section className="relative top-[-60px] m-auto bg-blue-950 p-8 text-2xl text-blue-50">
        <div className="flex w-full justify-center bg-white">
          <div className="text-black"> hello</div>
        </div>
        {/* <div className="flex gap-4">
          <div className="">
            <Image
              src={chair}
              alt="picture of mountain view from the balcony chairs"
              width={1440}
              height={1920}
              className=""
            />
          </div>
          <div className="">
            <Image
              src={bed}
              alt="picture of mountain view from the balcony bed"
              width={1440}
              height={2560}
              className=""
            />
          </div>
        </div> */}
      </section>
    </div>
  );
}
