import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Datenschutzerklärung
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Datenschutzerklärung</CardTitle>
              <p className="text-sm text-gray-600">
                Letzte Aktualisierung: {new Date().toLocaleDateString("de-DE")}
              </p>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h2>1. Datenschutz auf einen Blick</h2>

              <h3>Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können.
              </p>

              <h3>Datenerfassung auf dieser Website</h3>
              <p>
                <strong>
                  Wer ist verantwortlich für die Datenerfassung auf dieser
                  Website?
                </strong>
              </p>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
                dieser Website entnehmen.
              </p>

              <p>
                <strong>Wie erfassen wir Ihre Daten?</strong>
              </p>
              <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
                mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie
                in ein Kontaktformular eingeben.
              </p>

              <h2>2. Hosting</h2>
              <p>
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>

              <h3>Externes Hosting</h3>
              <p>
                Diese Website wird extern gehostet. Die personenbezogenen Daten,
                die auf dieser Website erfasst werden, werden auf den Servern
                des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a.
                um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
                Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige
                Daten, die über eine Website generiert werden, handeln.
              </p>

              <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

              <h3>Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
                Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
                vertraulich und entsprechend den gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3>Hinweis zur verantwortlichen Stelle</h3>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser
                Website ist:
              </p>
              <p>
                WWS-Strube
                <br />
                [Adresse]
                <br />
                [PLZ Ort]
                <br />
                Telefon: [Telefonnummer]
                <br />
                E-Mail: [E-Mail-Adresse]
              </p>

              <h3>Speicherdauer</h3>
              <p>
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere
                Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen
                Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
              </p>

              <h2>4. Datenerfassung auf dieser Website</h2>

              <h3>Cookies</h3>
              <p>
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies
                sind kleine Datenpakete und richten auf Ihrem Endgerät keinen
                Schaden an. Sie werden entweder vorübergehend für die Dauer
                einer Sitzung (Session-Cookies) oder dauerhaft (dauerhafte
                Cookies) auf Ihrem Endgerät gespeichert.
              </p>

              <h3>Server-Log-Dateien</h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch
                Informationen in so genannten Server-Log-Dateien, die Ihr
                Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul>
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>

              <h2>5. Kontakt und Bewerbungen</h2>

              <h3>Bewerbungsverfahren</h3>
              <p>
                Wenn Sie sich bei uns bewerben, verarbeiten wir Ihre
                Bewerberdaten zur Durchführung des Bewerbungsverfahrens. Die
                Verarbeitung kann auch elektronisch erfolgen. Dies ist
                insbesondere dann der Fall, wenn Sie entsprechende
                Bewerbungsunterlagen elektronisch, etwa per E-Mail oder über ein
                auf der Website befindliches Webformular, an uns übermitteln.
              </p>

              <h2>6. Ihre Rechte</h2>
              <p>
                Sie haben folgende Rechte bezüglich Ihrer personenbezogenen
                Daten:
              </p>
              <ul>
                <li>Recht auf Auskunft</li>
                <li>Recht auf Berichtigung oder Löschung</li>
                <li>Recht auf Einschränkung der Verarbeitung</li>
                <li>Recht auf Widerspruch gegen die Verarbeitung</li>
                <li>Recht auf Datenübertragbarkeit</li>
              </ul>

              <p>
                Wenn Sie Fragen zum Datenschutz haben, wenden Sie sich bitte
                jederzeit an uns.
              </p>

              <div className="mt-8 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  <Link
                    to="/impressum"
                    className="text-blue-600 hover:underline"
                  >
                    Impressum
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
