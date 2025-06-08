import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  EnhancedButton,
  EmojiActionButton,
  GradientEmojiButton,
  InfoCardButton,
} from "@/components/ui/EnhancedButton";
import { Button } from "@/components/ui/button";

export function ButtonGallery() {
  return (
    <div className="space-y-8 p-6">
      <Card>
        <CardHeader>
          <CardTitle>🎨 Enhanced Button Gallery - Hover für Effekte!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Simple Buttons with Effects */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Animierte Buttons mit Hover-Effekten
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <EnhancedButton
                emoji="🎯"
                effect="scale"
                variant="primary"
                size="lg"
              >
                Vergrößern
              </EnhancedButton>

              <EnhancedButton
                emoji="🦘"
                effect="bounce"
                variant="success"
                size="lg"
              >
                Hüpfen
              </EnhancedButton>

              <EnhancedButton
                emoji="✨"
                effect="glow"
                variant="gradient"
                size="lg"
              >
                Leuchten
              </EnhancedButton>

              <EnhancedButton
                emoji="🌪️"
                effect="rotate"
                variant="warning"
                size="lg"
              >
                Drehen
              </EnhancedButton>

              <EnhancedButton
                emoji="💗"
                effect="pulse"
                variant="danger"
                size="lg"
              >
                Pulsieren
              </EnhancedButton>

              <EnhancedButton
                emoji="📳"
                effect="shake"
                variant="info"
                size="lg"
              >
                Wackeln
              </EnhancedButton>

              <EnhancedButton
                emoji="🔄"
                effect="flip"
                variant="secondary"
                size="lg"
              >
                Drehen
              </EnhancedButton>

              <EnhancedButton
                emoji="🎢"
                effect="slide"
                variant="primary"
                size="lg"
              >
                Gleiten
              </EnhancedButton>
            </div>
          </div>

          {/* Info Card Buttons - inspired by your image */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Info-Karten (wie in Ihrem Design)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCardButton
                emoji="✅"
                title="Ja, absolut!"
                description="Neugierig, welche Vorteile wir dir bieten?"
                effect="scale"
              />

              <InfoCardButton
                emoji="ℹ️"
                title="Mehr erfahren"
                description="Entdecke alle Details über unsere Stellenangebote"
                effect="glow"
              />

              <InfoCardButton
                emoji="🚀"
                title="Jetzt bewerben"
                description="Starte deine Karriere bei uns - einfach und schnell"
                effect="bounce"
              />

              <InfoCardButton
                emoji="💼"
                title="Stellenangebote"
                description="Finde den perfekten Job für deine Fähigkeiten"
                effect="pulse"
              />
            </div>
          </div>

          {/* Image Card Style (like your "Ja, absolut!" design) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bild-Karten mit Overlay</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mountain card like in your image */}
              <div className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl w-full h-64 group">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                  alt="Mountain landscape"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/90 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    P
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-center">
                    Ja, absolut!
                  </h3>
                </div>
              </div>

              {/* Orange info card like in your image */}
              <div className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl w-full h-64 group bg-gradient-to-br from-orange-400 to-yellow-500">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                    ℹ️
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-center">
                    Mehr erfahren
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient Action Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Gradient Action Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <GradientEmojiButton emoji="🎯" effect="glow">
                Bewerben
              </GradientEmojiButton>

              <GradientEmojiButton emoji="📧" effect="pulse">
                Kontakt
              </GradientEmojiButton>

              <GradientEmojiButton emoji="📞" effect="bounce">
                Anrufen
              </GradientEmojiButton>

              <GradientEmojiButton emoji="💼" effect="scale">
                Jobs ansehen
              </GradientEmojiButton>
            </div>
          </div>

          {/* Custom Styled Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Benutzerdefinierte Farben</h3>
            <div className="flex flex-wrap gap-4">
              <EnhancedButton
                emoji="🌟"
                effect="glow"
                variant="custom"
                size="lg"
                customStyle={{
                  backgroundColor: "#8b5cf6",
                  textColor: "#ffffff",
                  borderColor: "#7c3aed",
                }}
              >
                Lila Power
              </EnhancedButton>

              <EnhancedButton
                emoji="🔥"
                effect="shake"
                variant="custom"
                size="lg"
                customStyle={{
                  backgroundColor: "#ef4444",
                  textColor: "#ffffff",
                  borderColor: "#dc2626",
                }}
              >
                Hot Button
              </EnhancedButton>

              <EnhancedButton
                emoji="🌈"
                effect="rotate"
                variant="custom"
                size="lg"
                customStyle={{
                  backgroundColor: "#06b6d4",
                  textColor: "#ffffff",
                  borderColor: "#0891b2",
                }}
              >
                Rainbow Style
              </EnhancedButton>
            </div>
          </div>

          {/* Different Sizes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Verschiedene Größen</h3>
            <div className="flex items-center gap-4">
              <EnhancedButton emoji="📱" size="sm" effect="scale">
                Klein
              </EnhancedButton>
              <EnhancedButton emoji="💻" size="md" effect="scale">
                Normal
              </EnhancedButton>
              <EnhancedButton emoji="🖥️" size="lg" effect="scale">
                Groß
              </EnhancedButton>
              <EnhancedButton emoji="📺" size="xl" effect="scale">
                Sehr groß
              </EnhancedButton>
            </div>
          </div>

          {/* Different Shapes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Verschiedene Formen</h3>
            <div className="flex flex-wrap gap-4">
              <EnhancedButton emoji="⬜" rounded="none" effect="scale">
                Eckig
              </EnhancedButton>
              <EnhancedButton emoji="📱" rounded="sm" effect="scale">
                Leicht rund
              </EnhancedButton>
              <EnhancedButton emoji="🔲" rounded="md" effect="scale">
                Rund
              </EnhancedButton>
              <EnhancedButton emoji="🔘" rounded="lg" effect="scale">
                Sehr rund
              </EnhancedButton>
              <EnhancedButton emoji="⭕" rounded="full" effect="scale">
                Pille
              </EnhancedButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
