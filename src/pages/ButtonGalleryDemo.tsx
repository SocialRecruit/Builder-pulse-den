import React from "react";
import { ButtonGallery } from "@/components/ui/ButtonGallery";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ButtonGalleryDemo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück zum Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold">🎨 Button Gallery Demo</h1>
                <p className="text-sm text-gray-500">
                  Entdecken Sie alle Button-Effekte
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            Werde Teil des Teams
          </h2>
          <p className="text-xl text-center text-gray-600 mb-8">
            Neugierig, welche Vorteile wir dir bieten?
          </p>

          {/* Your original design recreation */}
          <div className="flex justify-center gap-6 mb-12">
            {/* Left card - Image with overlay like your design */}
            <div className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl w-80 h-64 group">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                alt="Mountain landscape with person"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Orange overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/90 via-orange-400/60 to-transparent" />

              {/* Logo/P in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold text-blue-600 mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  P
                </div>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-montserrat font-bold text-2xl text-white text-center group-hover:text-yellow-200 transition-colors">
                  Ja, absolut!
                </h3>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white to-transparent opacity-40 group-hover:animate-shine" />
              </div>
            </div>

            {/* Right card - Orange info card like your design */}
            <div className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl w-80 h-64 group bg-gradient-to-br from-orange-400 to-yellow-500">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%), 
                                   radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                  }}
                ></div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center text-4xl mb-6 group-hover:scale-125 group-hover:animate-bounce transition-all duration-500 shadow-xl">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">i</span>
                  </div>
                </div>
                <h3 className="font-montserrat font-bold text-2xl text-center group-hover:text-orange-100 transition-colors">
                  Mehr erfahren
                </h3>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl shadow-orange-500/50"></div>
            </div>
          </div>
        </div>

        {/* Full Button Gallery */}
        <ButtonGallery />

        {/* Additional Info */}
        <div className="mt-12 text-center p-8 bg-white rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4">🚀 So einfach geht's!</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Diese Buttons können Sie direkt in Ihrem Page Builder verwenden.
            Jeder Button hat verschiedene Hover-Effekte und ist vollständig
            anpassbar. Einfach den gewünschten Button-Typ auswählen,
            konfigurieren und fertig!
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="font-montserrat"
            >
              🏠 Zum Dashboard
            </Button>
            <Button
              onClick={() => navigate("/page-builder/demo")}
              variant="outline"
              size="lg"
              className="font-montserrat"
            >
              ✏️ Page Builder testen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
