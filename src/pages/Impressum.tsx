import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Impressum</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Impressum</CardTitle>
              <p className="text-sm text-gray-600">Angaben gemäß § 5 TMG</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Anbieter</h3>
                <p>
                  WWS-Strube
                  <br />
                  [Straße und Hausnummer]
                  <br />
                  [PLZ Ort]
                  <br />
                  Deutschland
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
                <p>
                  Telefon: [Telefonnummer]
                  <br />
                  E-Mail: [E-Mail-Adresse]
                  <br />
                  Website:{" "}
                  <a
                    href="https://wws-strube.de"
                    className="text-blue-600 hover:underline"
                  >
                    wws-strube.de
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Geschäftsführung</h3>
                <p>[Name des Geschäftsführers]</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Registereintrag</h3>
                <p>
                  Eintragung im Handelsregister
                  <br />
                  Registergericht: [Registergericht]
                  <br />
                  Registernummer: [Registernummer]
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Umsatzsteuer-ID</h3>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                  Umsatzsteuergesetz:
                  <br />
                  [USt-IdNr.]
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Wirtschafts-ID</h3>
                <p>Wirtschafts-Identifikationsnummer: [WiD-Nr.]</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Aufsichtsbehörde</h3>
                <p>
                  [Name der Aufsichtsbehörde]
                  <br />
                  [Adresse der Aufsichtsbehörde]
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Berufsbezeichnung und berufsrechtliche Regelungen
                </h3>
                <p>
                  Berufsbezeichnung: [Berufsbezeichnung]
                  <br />
                  Zuständige Kammer: [Name der Kammer]
                  <br />
                  Verliehen in: Deutschland
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Redaktionell verantwortlich
                </h3>
                <p>
                  [Name]
                  <br />
                  [Adresse]
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  EU-Streitschlichtung
                </h3>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:
                  <br />
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  <br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Verbraucherstreitbeilegung/Universalschlichtungsstelle
                </h3>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2">
                  Haftung für Inhalte
                </h3>
                <p className="text-sm text-gray-700">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht unter der Verpflichtung,
                  übermittelte oder gespeicherte fremde Informationen zu
                  überwachen oder nach Umständen zu forschen, die auf eine
                  rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                  Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend
                  entfernen.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Haftung für Links
                </h3>
                <p className="text-sm text-gray-700">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir
                  für diese fremden Inhalte auch keine Gewähr übernehmen. Für
                  die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Urheberrecht</h3>
                <p className="text-sm text-gray-700">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  <Link to="/privacy" className="text-blue-600 hover:underline">
                    Datenschutzerklärung
                  </Link>
                  {" | "}
                  <Link to="/" className="text-blue-600 hover:underline">
                    Startseite
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
