import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Palette } from "lucide-react";
import {
  ButtonTemplateSelector,
  type ButtonTemplate,
} from "@/components/ui/ButtonTemplateSelector";
import {
  BodyStyleTemplateSelector,
  type BodyStyleTemplate,
} from "@/components/ui/BodyStyleTemplates";
import { EnhancedButton } from "@/components/ui/EnhancedButton";

export default function TemplateTestPage() {
  const navigate = useNavigate();
  const [showButtonTemplates, setShowButtonTemplates] = useState(false);
  const [showBodyStyleTemplates, setShowBodyStyleTemplates] = useState(false);
  const [selectedButton, setSelectedButton] = useState<ButtonTemplate | null>(
    null,
  );
  const [selectedBodyStyle, setSelectedBodyStyle] =
    useState<BodyStyleTemplate | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
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
              <h1 className="text-2xl font-bold text-gray-900">
                🎨 Template Test Seite
              </h1>
              <p className="text-sm text-gray-500">
                Testen Sie Button und Body-Style Templates
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              ✅ Templates funktionieren!
            </h2>
            <p className="text-green-700">
              Sie können jetzt Button-Templates und Body-Style-Templates mit
              Demo-Integration testen.
            </p>
          </div>

          {/* Template Tests */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Button Templates Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Button-Templates Test
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Klicken Sie hier, um Button-Templates zu testen:
                </p>

                <Button
                  onClick={() => setShowButtonTemplates(true)}
                  className="w-full"
                >
                  🎯 Button-Template auswählen
                </Button>

                {selectedButton && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-3">Ausgewähltes Template:</h4>
                    <div className="text-center p-4 bg-white rounded border">
                      {selectedButton.preview}
                    </div>
                    <p className="text-sm mt-2 text-blue-700">
                      <strong>{selectedButton.name}</strong> -{" "}
                      {selectedButton.config.effect} Effekt
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">Beispiel-Buttons:</h4>
                  <div className="flex flex-wrap gap-2">
                    <EnhancedButton
                      emoji="🎯"
                      variant="primary"
                      size="md"
                      effect="scale"
                    >
                      Scale Effekt
                    </EnhancedButton>
                    <EnhancedButton
                      emoji="🦘"
                      variant="success"
                      size="md"
                      effect="bounce"
                    >
                      Bounce Effekt
                    </EnhancedButton>
                    <EnhancedButton
                      emoji="✨"
                      variant="gradient"
                      size="md"
                      effect="glow"
                    >
                      Glow Effekt
                    </EnhancedButton>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Body Style Templates Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  Body-Style-Templates Test
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Testen Sie Design-Templates inklusive Demo-Template-Styles:
                </p>

                <Button
                  onClick={() => setShowBodyStyleTemplates(true)}
                  variant="outline"
                  className="w-full"
                >
                  🎨 Body-Style-Template auswählen
                </Button>

                {selectedBodyStyle && (
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium mb-3">Ausgewähltes Template:</h4>
                    <div className="border rounded overflow-hidden mb-2">
                      {selectedBodyStyle.preview}
                    </div>
                    <p className="text-sm text-purple-700">
                      <strong>{selectedBodyStyle.name}</strong>
                    </p>
                    <div className="flex gap-2 mt-2">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{
                          backgroundColor:
                            selectedBodyStyle.config.primaryColor,
                        }}
                        title="Primärfarbe"
                      />
                      <div
                        className="w-4 h-4 rounded border"
                        style={{
                          backgroundColor:
                            selectedBodyStyle.config.secondaryColor,
                        }}
                        title="Sekundärfarbe"
                      />
                      <span className="text-xs">
                        {selectedBodyStyle.config.fontFamily} |{" "}
                        {selectedBodyStyle.config.containerWidth}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">Verfügbare Kategorien:</h4>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div>• Business</div>
                    <div>• Marketing</div>
                    <div>• Tech</div>
                    <div>• Sales</div>
                    <div>• Healthcare</div>
                    <div>• Minimal</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How to Use */}
          <Card>
            <CardHeader>
              <CardTitle>📚 So funktioniert es im Page Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Button-Templates:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Button-Block hinzufügen</li>
                    <li>"Template wählen" klicken</li>
                    <li>Template auswählen → automatisch angewendet</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Body-Style-Templates:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Body Style Tab öffnen</li>
                    <li>"Style-Template" klicken</li>
                    <li>Kategorie & Template wählen</li>
                  </ol>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => navigate("/dashboard")}>
                  🏠 Dashboard
                </Button>
                <Button
                  onClick={() => navigate("/button-gallery")}
                  variant="outline"
                >
                  🎨 Button Gallery
                </Button>
                <Button
                  onClick={() => navigate("/header-demo")}
                  variant="outline"
                >
                  📸 Header Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Template Modals */}
      <ButtonTemplateSelector
        isOpen={showButtonTemplates}
        onClose={() => setShowButtonTemplates(false)}
        onSelect={(template) => {
          setSelectedButton(template);
          setShowButtonTemplates(false);
        }}
      />

      <BodyStyleTemplateSelector
        isOpen={showBodyStyleTemplates}
        onClose={() => setShowBodyStyleTemplates(false)}
        onSelect={(template) => {
          setSelectedBodyStyle(template);
          setShowBodyStyleTemplates(false);
        }}
      />
    </div>
  );
}
