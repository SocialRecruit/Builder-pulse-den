import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function HeaderDemo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zum Dashboard
        </Button>
      </div>

      {/* Header Demo like in your image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "500px" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=500&fit=crop"
            alt="Office background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.5 }} />

        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-center items-center px-6 text-white text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Subheadline */}
            <p className="text-lg font-medium text-white/90 uppercase tracking-wide">
              Finde in wenigen Minuten deinen Traumjob, ohne klassische
              Bewerbung!
            </p>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat leading-tight">
              Werde jetzt Content Marketing Manager (m/w/d) bei uns
            </h1>

            {/* Job Details */}
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📍</span>
                <span>Remote</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📅</span>
                <span>ab sofort</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💼</span>
                <span>in Vollzeit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            So sollte Ihr Header aussehen!
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-green-600">
                ✅ Funktioniert jetzt:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Header-Grafik wird angezeigt</li>
                <li>• Höhe per Slider 0-1000px einstellbar</li>
                <li>• Job-Details werden korrekt angezeigt</li>
                <li>• Overlay-Effekte funktionieren</li>
                <li>• Responsive Design</li>
                <li>• Montserrat Font wird verwendet</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-600">
                🎯 Features:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Subheadline über dem Titel</li>
                <li>• Haupttitel mit großer Schrift</li>
                <li>• Emoji-Icons für Job-Details</li>
                <li>• Anpassbare Höhe im Backend</li>
                <li>• Text-Ausrichtung (links/mitte/rechts)</li>
                <li>• Overlay-Farbe und Transparenz</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Jetzt im Page Builder testen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
