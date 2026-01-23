import React from "react";
import Link from "next/link";

export default function RechtlichesPage() {
  return (
    <div className="font-jost min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link
            href="/"
            className="text-q-text-dark-darkest text-sm hover:underline"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-q-text-dark-darkest mb-12 text-4xl font-bold">
          Rechtliche Hinweise
        </h1>

        {/* AGB Section */}
        <section className="mb-16">
          <h2 className="text-q-text-dark-darkest mb-6 text-3xl font-bold">
            Allgemeine Geschäftsbedingungen (AGB)
          </h2>

          <div className="space-y-6 text-base leading-relaxed text-gray-700">
            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                1. Vertragsgegenstand
              </h3>
              <p>
                Vermietet wird die Ferienwohnung [OBJEKTBEZEICHNUNG] zur
                Beherbergung von Gästen für einen begrenzten Zeitraum.
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                2. Vertragsschluss
              </h3>
              <p>
                Der Mietvertrag kommt zustande, wenn der Gast die Ferienwohnung
                über das Buchungsformular verbindlich bestellt und der Vermieter
                diese Buchung schriftlich, per E-Mail oder auf elektronischem
                Wege bestätigt. Mit der Bestätigung wird der Vertrag
                rechtswirksam.
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                3. Leistung und Preise
              </h3>
              <p>
                Der Mietpreis beinhaltet die Nutzung der Ferienwohnung sowie
                [INKLUSIVLEISTUNGEN, z.B. Endreinigung, Bettwäsche, Handtücher,
                Nebenkosten wie Strom, Wasser, Heizung]. Nicht im Preis
                enthalten sind [ZUSATZLEISTUNGEN, z.B. Kurtaxe, optionale
                Reinigungen während des Aufenthalts].
              </p>
              <p className="mt-2">
                Preisänderungen bleiben vorbehalten, sofern zwischen Buchung und
                Anreise erhebliche Kostensteigerungen auftreten (z. B. bei
                Energiepreisen oder Steuern).
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                4. Zahlung
              </h3>
              <p>
                Bei Buchung ist eine Anzahlung in Höhe von [ANZAHLUNGSBETRAG,
                z.B. 30%] des Gesamtmietpreises zu leisten. Die Restzahlung ist
                spätestens [ANZAHL TAGE, z.B. 14 Tage] vor Anreise fällig.
              </p>
              <p className="mt-2">
                Bei verspäteter Zahlung behält sich der Vermieter das Recht vor,
                vom Vertrag zurückzutreten und die Buchung zu stornieren.
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                5. Stornierung durch den Gast
              </h3>
              <p>
                Der Rücktritt vom Vertrag muss durch den Gast schriftlich (per
                E-Mail oder Brief) erfolgen. Es gelten folgende Stornogebühren:
              </p>
              <ul className="mt-2 ml-6 list-disc space-y-1">
                <li>Bis 30 Tage vor Anreise: 10% des Gesamtmietpreises</li>
                <li>29 bis 14 Tage vor Anreise: 30% des Gesamtmietpreises</li>
                <li>13 bis 7 Tage vor Anreise: 60% des Gesamtmietpreises</li>
                <li>
                  Weniger als 7 Tage vor Anreise: 90% des Gesamtmietpreises
                </li>
              </ul>
              <p className="mt-2">
                Der Gast hat das Recht nachzuweisen, dass dem Vermieter kein
                oder ein geringerer Schaden entstanden ist.
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                6. An- und Abreise
              </h3>
              <p>
                Die Anreise erfolgt ab [ANREISEZEIT, z.B. 15:00 Uhr], die
                Abreise bis [ABREISEZEIT, z.B. 10:00 Uhr]. Abweichende Zeiten
                sind nach vorheriger Absprache mit dem Vermieter möglich.
              </p>
              <p className="mt-2">
                Bei verspäteter Anreise ohne Mitteilung erfolgt keine
                Reduzierung des Mietpreises. Die Wohnung bleibt bis zum
                vereinbarten Anreisetag reserviert.
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                7. Haustiere, Rauchen, Reinigung
              </h3>
              <p>
                Die Mitnahme von Haustieren ist nur nach vorheriger
                schriftlicher Vereinbarung gestattet und kann mit einer
                zusätzlichen Gebühr verbunden sein.
              </p>
              <p className="mt-2">
                Das Rauchen ist [NUR IN BESTIMMTEN BEREICHEN ERLAUBT / IN DER
                GESAMTEN WOHNUNG VERBOTEN].
              </p>
              <p className="mt-2">
                Die Wohnung ist bei Abreise besenrein zu hinterlassen. Bei
                übermäßiger Verschmutzung oder Beschädigung werden die
                Reinigungskosten gesondert in Rechnung gestellt.
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                8. Haftung
              </h3>
              <p>
                Der Vermieter haftet für Schäden, die die vertragsgemäße Nutzung
                der Unterkunft beeinträchtigen, soweit diese nicht vom Gast
                verursacht wurden. Geringfügige Mängel berechtigen nicht zur
                Minderung des Mietpreises, müssen jedoch zeitnah angezeigt
                werden.
              </p>
              <p className="mt-2">
                Für persönliche Gegenstände und Wertsachen der Gäste übernimmt
                der Vermieter keine Haftung, es sei denn, es liegt grobe
                Fahrlässigkeit oder Vorsatz vor.
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                9. Geltendes Recht und Gerichtsstand
              </h3>
              <p>
                Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand
                ist [ORT DES VERMIETERS], sofern der Gast Kaufmann, juristische
                Person des öffentlichen Rechts oder öffentlich-rechtliches
                Sondervermögen ist oder keinen allgemeinen Gerichtsstand in
                Deutschland hat.
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                10. Schlussbestimmungen
              </h3>
              <p>
                Änderungen oder Ergänzungen dieser AGB bedürfen der Schriftform.
                Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt
                die Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
              </p>
            </div>
          </div>
        </section>

        {/* Datenschutzerklärung Section */}
        <section className="mb-16">
          <h2 className="text-q-text-dark-darkest mb-6 text-3xl font-bold">
            Datenschutzerklärung
          </h2>

          <div className="space-y-6 text-base leading-relaxed text-gray-700">
            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                1. Verantwortlicher
              </h3>
              <p className="font-medium">
                [FIRMENNAME / NAME DES VERMIETERS]
                <br />
                [STRASSE UND HAUSNUMMER]
                <br />
                [PLZ ORT]
                <br />
                E-Mail: [KONTAKT-EMAIL]
                <br />
                Telefon: [TELEFONNUMMER]
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                2. Zwecke und Rechtsgrundlagen der Datenverarbeitung
              </h3>
              <p className="mb-4">
                Wir verarbeiten personenbezogene Daten zu folgenden Zwecken:
              </p>

              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h4 className="text-q-text-dark-darkest mb-2 font-semibold">
                    Vertragserfüllung & Buchungsabwicklung
                  </h4>
                  <p className="mb-2">
                    <strong>Daten:</strong> Name, Adresse, Geburtsdatum,
                    Kontaktdaten (E-Mail, Telefon), Zahlungsdaten, Anzahl der
                    Gäste, Aufenthaltszeitraum
                  </p>
                  <p>
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
                    (Vertragserfüllung)
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h4 className="text-q-text-dark-darkest mb-2 font-semibold">
                    Meldepflicht nach Bundesmeldegesetz (BMG)
                  </h4>
                  <p className="mb-2">
                    <strong>Daten:</strong> Name, Staatsangehörigkeit,
                    Geburtsdatum, Ausweis-/Passnummer, An- und Abreisedaten
                  </p>
                  <p>
                    <strong>Rechtsgrundlage:</strong> § 30 BMG i.V.m. Art. 6
                    Abs. 1 lit. c DSGVO (rechtliche Verpflichtung)
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h4 className="text-q-text-dark-darkest mb-2 font-semibold">
                    Kontaktaufnahme & Anfragen
                  </h4>
                  <p className="mb-2">
                    <strong>Daten:</strong> Name, E-Mail-Adresse, Telefonnummer
                    (optional), Inhalt der Anfrage
                  </p>
                  <p>
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b oder
                    f DSGVO (berechtigtes Interesse)
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h4 className="text-q-text-dark-darkest mb-2 font-semibold">
                    Steuergesetzliche Aufbewahrung
                  </h4>
                  <p className="mb-2">
                    <strong>Daten:</strong> Name, Adresse, Zahlungsbelege,
                    Buchungsunterlagen
                  </p>
                  <p>
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. c
                    DSGVO, §§ 147 AO, 257 HGB (gesetzliche
                    Aufbewahrungspflichten)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                3. Datenübermittlung an Dritte
              </h3>
              <p>
                Ihre Daten werden nur an Dritte weitergegeben, wenn dies zur
                Vertragserfüllung erforderlich ist oder Sie eingewilligt haben:
              </p>
              <ul className="mt-2 ml-6 list-disc space-y-1">
                <li>
                  Zahlungsdienstleister (z.B. [ZAHLUNGSANBIETER]) zur Abwicklung
                  von Zahlungen
                </li>
                <li>Hosting-Provider für die Bereitstellung der Website</li>
                <li>
                  Reinigungskräfte (nur Name und Aufenthaltsdaten, soweit
                  erforderlich)
                </li>
              </ul>
              <p className="mt-2">
                Mit allen Auftragsverarbeitern bestehen Verträge gemäß Art. 28
                DSGVO.
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                4. Speicherdauer
              </h3>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Buchungsdaten:</strong> Werden für die Dauer der
                  Vertragserfüllung und anschließend für die gesetzlichen
                  Aufbewahrungsfristen gespeichert (steuerrechtlich 10 Jahre,
                  handelsrechtlich 6 Jahre ab Ende des Kalenderjahres)
                </li>
                <li>
                  <strong>Meldescheine:</strong> Aufbewahrung gemäß § 30 BMG für
                  mindestens 12 Monate nach Ankunftstag
                </li>
                <li>
                  <strong>Anfrage-/Kontaktdaten:</strong> Werden gelöscht,
                  sobald die Anfrage erledigt ist und keine vertragliche
                  Beziehung entsteht (in der Regel nach 6-12 Monaten)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                5. Ihre Rechte als betroffene Person
              </h3>
              <p className="mb-2">Sie haben nach der DSGVO folgende Rechte:</p>
              <ul className="ml-6 list-disc space-y-1">
                <li>
                  <strong>Recht auf Auskunft</strong> (Art. 15 DSGVO) über Ihre
                  bei uns gespeicherten Daten
                </li>
                <li>
                  <strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)
                  unrichtiger Daten
                </li>
                <li>
                  <strong>Recht auf Löschung</strong> (Art. 17 DSGVO), sofern
                  keine gesetzlichen Aufbewahrungspflichten bestehen
                </li>
                <li>
                  <strong>Recht auf Einschränkung der Verarbeitung</strong>{" "}
                  (Art. 18 DSGVO)
                </li>
                <li>
                  <strong>Recht auf Datenübertragbarkeit</strong> (Art. 20
                  DSGVO)
                </li>
                <li>
                  <strong>Widerspruchsrecht</strong> (Art. 21 DSGVO) gegen
                  bestimmte Verarbeitungen
                </li>
                <li>
                  <strong>Beschwerderecht</strong> bei einer
                  Datenschutz-Aufsichtsbehörde
                </li>
              </ul>
              <p className="mt-4">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
                [KONTAKT-EMAIL]
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                6. Datensicherheit
              </h3>
              <p>
                Wir setzen technische und organisatorische Sicherheitsmaßnahmen
                ein, um Ihre Daten gegen zufällige oder vorsätzliche
                Manipulation, Verlust, Zerstörung oder Zugriff unberechtigter
                Personen zu schützen. Dazu gehören:
              </p>
              <ul className="mt-2 ml-6 list-disc space-y-1">
                <li>Verschlüsselte Datenübertragung (SSL/TLS)</li>
                <li>Zugriffsschutz auf Server und Datenbanken</li>
                <li>Regelmäßige Backups</li>
                <li>Schulung der Mitarbeiter im Datenschutz</li>
              </ul>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                7. Cookies und Website-Tracking
              </h3>
              <p>
                Diese Website verwendet nur technisch notwendige Cookies zur
                Funktionsfähigkeit der Website. Diese Cookies speichern keine
                personenbezogenen Daten und werden nach Ende Ihrer Sitzung
                automatisch gelöscht.
              </p>
              <p className="mt-2">
                [OPTIONAL: Falls Sie Tracking-Tools wie Google Analytics nutzen,
                muss dies hier beschrieben werden inkl. Hinweis auf
                Opt-Out-Möglichkeit und Einwilligung]
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                8. Meldescheinpflicht für Gäste
              </h3>
              <p>
                Gemäß § 30 Bundesmeldegesetz (BMG) sind wir verpflichtet, von
                allen Gästen einen Meldeschein auszufüllen. Dieser enthält
                folgende Daten: Name, Vorname, Geburtsdatum,
                Staatsangehörigkeit, Ausweis- oder Passnummer, An- und
                Abreisetag.
              </p>
              <p className="mt-2">
                Die Meldescheine werden mindestens 12 Monate aufbewahrt und
                danach vernichtet.
              </p>
            </div>

            <div>
              <h3 className="text-q-text-dark-darkest mb-3 text-xl font-semibold">
                9. Aktualität der Datenschutzerklärung
              </h3>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand{" "}
                [DATUM].
              </p>
              <p className="mt-2">
                Durch die Weiterentwicklung unserer Website oder aufgrund
                geänderter gesetzlicher Vorgaben kann es notwendig werden, diese
                Datenschutzerklärung zu ändern. Die jeweils aktuelle
                Datenschutzerklärung kann jederzeit auf dieser Website abgerufen
                werden.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} [FIRMENNAME]. Alle Rechte vorbehalten.
          </p>
          <Link
            href="/"
            className="text-q-text-dark-darkest mt-2 inline-block hover:underline"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </footer>
    </div>
  );
}
