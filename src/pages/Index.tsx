import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Users, Eye, Target } from "lucide-react";

const Index = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold">Landing Page Builder</h1>
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-200"
              >
                Social Recruiting
              </Badge>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Landing Pages für
            <span className="text-blue-600"> Social Recruiting</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Erstellen Sie professionelle Landing Pages für Ihre
            Job-Ausschreibungen in Social Media. Einfach, schnell und
            DSGVO-konform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/dashboard")}
            >
              <Edit className="h-5 w-5 mr-2" />
              Jetzt starten
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/demo/museumsmitarbeiter")}
            >
              <Eye className="h-5 w-5 mr-2" />
              Demo ansehen
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Schnell und einfach
            </h3>
            <p className="text-gray-600">
              In wenigen Schritten zur perfekten Job-Landing Page
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>1. Seite erstellen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Erstellen Sie eine neue Landing Page mit nur einem Klick.
                  Geben Sie einfach den Job-Titel ein.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>2. Inhalte hinzufügen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fügen Sie Texte, Bilder, Buttons und Formulare per Drag & Drop
                  hinzu. Alles visuell und ohne Code.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>3. Veröffentlichen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Veröffentlichen Sie Ihre Seite mit einem Klick. Sie erhalten
                  einen direkten Link für Social Media.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Alles was Sie brauchen
            </h3>
            <p className="text-gray-600">
              Professionelle Features für erfolgreiches Social Recruiting
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>📱 Mobile Optimiert</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Alle Landing Pages sind automatisch für Mobilgeräte optimiert.
                  Perfekt für Social Media Traffic.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🔒 DSGVO-konform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Integrierter Cookie-Banner und Datenschutz-Features.
                  Rechtssicher in Deutschland.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>👥 Team-fähig</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Mehrere Benutzer können gemeinsam Landing Pages erstellen und
                  verwalten.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎨 Design-Flexibilit��t</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Verschiedene Content-Blöcke: Texte, Bilder, Buttons, Formulare
                  und mehr.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🔗 Permalink-System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Jede Seite erhält eine eindeutige URL. Perfekt für Social
                  Media Kampagnen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📋 Formular-Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Integrieren Sie FunnelForms.app oder eigene
                  Bewerbungsformulare.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Bereit für professionelles Social Recruiting?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Starten Sie jetzt und erstellen Sie Ihre erste Landing Page in unter
            5 Minuten.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => navigate("/dashboard")}
          >
            <Edit className="h-5 w-5 mr-2" />
            Dashboard öffnen
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Landing Page Builder
              </h4>
              <p className="text-gray-400">
                Die professionelle Lösung für Social Recruiting Landing Pages.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Produkt</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="hover:text-white"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="https://wws-strube.de" className="hover:text-white">
                    WWS-Strube
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => navigate("/impressum")}
                    className="hover:text-white"
                  >
                    Impressum
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/privacy")}
                    className="hover:text-white"
                  >
                    Datenschutz
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
              <p className="text-gray-400 mb-4">
                Haben Sie Fragen? Wir helfen gerne weiter.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Ihre E-Mail-Adresse"
                  className="bg-gray-800 border-gray-700"
                />
                <Button size="sm">Kontakt</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WWS-Strube. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
