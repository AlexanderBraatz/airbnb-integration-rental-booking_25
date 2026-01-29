import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/logo-fff.svg";

export function AuthCardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="bg-q-background tablet:py-4 tablet:px-4 tablet:pb-10 min-h-screen px-6 py-6 pb-40">
      <div className="tablet:max-w-[600px] mx-auto max-w-4xl">
        <div className="bg-q-blue tablet:px-5 tablet:py-7 rounded-t-lg px-8 py-8 text-center">
          <Link href="/" className="mx-auto inline-block max-w-[200px]">
            <Image
              src={logo}
              alt="Sieben Gipfel Blick Logo"
              width={203}
              height={62}
              className="h-auto w-full max-w-[203px]"
            />
          </Link>
        </div>
        <div className="tablet:px-6 tablet:py-6 bg-white px-10 py-10 rounded-b-lg border-x-2 border-b-2 border-q-blue">
          <h1 className="font-reem-kufi text-q-text-dark-700 tablet:text-[24px] mb-6 text-[28px] leading-tight font-bold">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}
