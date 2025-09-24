import Image from "next/image";
import mountain from "@/public/images/mountain-blue-upscaled.jpeg";
import m11147017 from "@/public/images/11147017.png";
import mountainpnd from "@/public/images/upscalemedia-transformed.png";
import chair from "@/public/images/balcony-chair.jpeg";
import bed from "@/public/images/balcony-bed.jpeg";

export default function Home() {
  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto bg-amber-700 perspective-[24px]">
      <header className="z-[-1] flex h-full items-center justify-center transform-3d">
        <div className="absolute z-[-1] h-screen w-screen shrink-0 -translate-z-6 scale-[2] bg-gradient-to-b from-blue-500 to-blue-50"></div>
        <Image
          src={mountainpnd}
          alt="picture of mountain view from the balcony"
          className="absolute top-[400px] z-[1] h-full w-full -translate-z-3 scale-[1.51] object-cover"
        />
        <div className="absolute top-[200px] left-[400px] z-[-1] -translate-z-6 scale-[2] text-4xl font-extrabold tracking-tight text-balance text-white text-shadow-lg">
          <h1>Stay In the Mountains,</h1>
          <h1>without leaving the homely feel behind.</h1>
        </div>
      </header>
      <section className="relative top-[-60px] m-auto bg-blue-950 p-8 text-2xl text-blue-50">
        <div className="flex gap-4">
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
        </div>
      </section>
    </div>
  );
}
