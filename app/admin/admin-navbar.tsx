import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/logo-fff.svg";
import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";

export function AdminNavbar({ userEmail }: { userEmail: string }) {
  return (
    <header className="border-q-blue bg-q-blue sticky top-0 z-50 border-b-2">
      <div className="tablet:px-6 container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/admin/bookings" className="shrink-0">
          <Image
            src={logo}
            alt="Sieben Gipfel Blick Logo"
            width={160}
            height={49}
            className="tablet:w-[160px] h-auto w-[120px]"
          />
        </Link>
        <nav className="font-jost text-q-wite-almost tablet:gap-6 flex flex-wrap items-center gap-4">
          <Link
            href="/admin/bookings"
            className="tablet:text-base text-sm font-medium hover:underline"
          >
            Buchungen
          </Link>
          <Link
            href="/admin/host-settings"
            className="tablet:text-base text-sm font-medium hover:underline"
          >
            Host-Einstellungen
          </Link>
          <span className="text-q-wite-almost/90 tablet:text-base mobile:max-w-[120px] max-w-[180px] truncate text-sm">
            Eingeloggt als {userEmail}
          </span>
          <form action={signOut}>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="border-q-wite-almost text-q-wite-almost hover:bg-q-wite-almost/10"
            >
              Abmelden
            </Button>
          </form>
        </nav>
      </div>
    </header>
  );
}
