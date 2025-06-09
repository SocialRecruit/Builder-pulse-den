import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
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
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Erstellen Sie professionelle
              <span className="text-blue-600"> Landing Pages</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Perfekt für Social Recruiting und Stellenausschreibungen. Einfach
              zu bedienen, professionelle Ergebnisse.
            </p>
            <div className="space-x-4">
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Jetzt starten
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/templates")}
              >
                Templates ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
