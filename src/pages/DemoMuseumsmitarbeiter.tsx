import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CookieBanner } from "@/components/landing-builder/CookieBanner";
import {
  MapPin,
  Clock,
  Briefcase,
  CheckCircle,
  User,
  Shield,
  Languages,
  FileCheck,
  Users,
} from "lucide-react";

export default function DemoMuseumsmitarbeiter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Demo: Bewerbung würde hier abgesendet werden!");
  };

  const handleApplyClick = () => {
    const formSection = document.getElementById("bewerbungsformular");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Company Logo Header */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4 text-center">
          <div className="text-lg font-semibold text-gray-700">WWS-Strube</div>
        </div>
      </div>

      {/* Hero Section with Museum Image */}
      <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Museum Interior"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Museumsmitarbeiter (m/w/d)
          </h1>

          <div className="flex flex-wrap justify-center gap-6 text-lg mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Prien / Herrenchiemsee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>ab sofort</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>Vollzeit / Teilzeit</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Jetzt in 90 Sekunden bewerben.
          </h2>
          <p className="text-xl mb-2">Starten Sie bei uns als</p>

          <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
            <span className="bg-gray-700 px-3 py-1 rounded">
              Prien / Herrenchiemsee
            </span>
            <span className="bg-gray-700 px-3 py-1 rounded">ab sofort</span>
            <span className="bg-gray-700 px-3 py-1 rounded">
              Vollzeit / Teilzeit
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={handleApplyClick}
            >
              JETZT BEWERBEN
            </Button>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={handleApplyClick}
            >
              JETZT BEWERBEN
            </Button>
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">👇</div>
            <h2 className="text-3xl font-bold text-blue-600 mb-8">
              Diese Aufgaben warten auf Sie!
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Sie übernehmen Sicherungs- und Überwachungsaufgaben im
                  Tagesdienst
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl mt-1">🏛️</div>
                <p className="text-gray-700">
                  Sie übernehmen den Museumsaufsichtsdienst
                </p>
              </div>

              <div className="flex items-start gap-4">
                <FileCheck className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Besucherordnung und Brandschutzordnung beachten und
                  durchsetzen
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Arbeitszeiten während der Öffnungszeiten 09:00 Uhr bis 18:00
                  Uhr
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-blue-600 mb-8 text-center flex items-center justify-center gap-2">
              <User className="h-6 w-6" />
              Was Sie mitbringen sollten:
            </h3>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">🙂</div>
                  <p className="text-gray-700">
                    Besucherfreundliches und gepflegtes Auftreten
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">⚙️</div>
                  <p className="text-gray-700">
                    Arbeitsbereitschaft und absolute Zuverlässigkeit
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <Languages className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Gute Deutschkenntnisse, idealerweise Grundkenntnisse in
                    Englisch
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Erfahrung im Wach- und Sicherheitsdienst
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <FileCheck className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Unterrichtungsnachweis nach §34a GewO (IHK)
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">👮‍♂️</div>
                  <p className="text-gray-700">
                    Polizeiliches Führungszeugnis ohne Eintrag
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="mt-16 text-center">
            <img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Museum Guide explaining to visitors"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* What You Need Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-600 mb-12 text-center">
            Das benötigen Sie!
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                <p className="text-gray-700">
                  Besucherfreundliches und gepflegtes Auftreten
                </p>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                <p className="text-gray-700">
                  Arbeitsbereitschaft und absolute Zuverlässigkeit
                </p>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                <p className="text-gray-700">
                  Gute Deutschkenntnisse, idealerweise Grundkenntnisse in
                  Englisch
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                <p className="text-gray-700">
                  Erfahrung im Wach- und Sicherheitsdienst
                </p>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                <p className="text-gray-700">
                  Unterrichtungsnachweis nach §34a GewO (IHK)
                </p>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                <p className="text-gray-700">
                  Polizeiliches Führungszeugnis ohne Eintrag
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Break Section */}
      <div className="py-12 bg-blue-50 text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Seite 2</h2>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          onClick={handleApplyClick}
        >
          Hier klicken
        </Button>
      </div>

      {/* Application Form Section */}
      <div id="bewerbungsformular" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  Jetzt bewerben
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      rows={5}
                      className="w-full"
                      placeholder="Erzählen Sie uns von sich und warum Sie sich für diese Position interessieren..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  >
                    Bewerbung absenden
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
              non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <Link
                to="/impressum"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Impressum
              </Link>
              <Link
                to="/privacy"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Datenschutz
              </Link>
            </div>

            <div className="text-xs text-gray-400 pt-4 border-t border-gray-700">
              © {new Date().getFullYear()} WWS-Strube. Alle Rechte vorbehalten.
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
}
