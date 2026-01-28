import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-q-blue text-q-wite-almost mt-16 border-t border-b border-white/20">
      <div className="px-6 py-10">
        <div className="mobile:grid-cols-1 mx-auto grid max-w-6xl grid-cols-3 gap-10">
          {/* Entdecken */}
          <div>
            <h3 className="font-jost text-q-wite-almost/80 text-xs font-semibold tracking-[0.18em] uppercase">
              Entdecken
            </h3>
            <div className="mt-3 h-px w-10 bg-white/30" />
            <nav className="mt-4 flex flex-col gap-2 text-sm">
              <Link
                href="#rooms"
                className="text-q-wite-almost/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Zimmer
              </Link>
              <Link
                href="#highlights"
                className="text-q-wite-almost/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Ausstattung
              </Link>
              <Link
                href="#reviews"
                className="text-q-wite-almost/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Bewertungen
              </Link>
              <Link
                href="#directions"
                className="text-q-wite-almost/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Anfahrt
              </Link>
              <Link
                href="#bookingRequest"
                className="text-q-wite-almost/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Anfragen
              </Link>
            </nav>
          </div>

          {/* Kontaktinfo */}
          <div>
            <h3 className="font-jost text-q-wite-almost/80 text-xs font-semibold tracking-[0.18em] uppercase">
              Kontakt
            </h3>
            <div className="mt-3 h-px w-10 bg-white/30" />
            <div className="text-q-wite-almost/80 mt-4 space-y-2 text-sm">
              <p>Email: placeholder@example.com</p>
              <p>Telefon: +49 (0) 000 000000</p>
              <p>Adresse: Musterstraße 1, 00000 Musterstadt</p>
            </div>
          </div>

          {/* Online */}
          <div>
            <h3 className="font-jost text-q-wite-almost/80 text-xs font-semibold tracking-[0.18em] uppercase">
              Online
            </h3>
            <div className="mt-3 h-px w-10 bg-white/30" />
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <Link
                href="https://instagram.com/placeholder"
                target="_blank"
                className="text-q-wite-almost/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Instagram
              </Link>
              <Link
                href="https://facebook.com/placeholder"
                target="_blank"
                className="text-q-wite-almost/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Facebook
              </Link>
            </div>
          </div>
        </div>

        <div className="text-q-wite-almost/70 mt-8 w-full border-t border-white/10 pt-4 text-xs md:flex md:items-center md:justify-between">
          <div className="mx-auto max-w-6xl">
            <p>
              © {new Date().getFullYear()} Sieben Gipfel Blick. Alle Rechte
              vorbehalten.
            </p>
            <div className="mt-2 flex gap-4 md:mt-0">
              <Link
                href="/rechtliches"
                className="underline-offset-4 hover:text-white hover:underline"
              >
                AGB &amp; Datenschutzerklärung
              </Link>
              <Link
                href="/admin/bookings"
                className="underline-offset-4 hover:text-white hover:underline"
              >
                Adminbereich
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
