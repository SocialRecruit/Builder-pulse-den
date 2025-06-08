import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Palette, CheckCircle } from "lucide-react";
import {
  ButtonTemplateSelector,
  type ButtonTemplate,
} from "@/components/ui/ButtonTemplateSelector";
import {
  BodyStyleTemplateSelector,
  type BodyStyleTemplate,
} from "@/components/ui/BodyStyleTemplates";

export default function FeaturesDemo() {
  const navigate = useNavigate();
  const [showButtonTemplates, setShowButtonTemplates] = useState(false);
  const [showBodyStyleTemplates, setShowBodyStyleTemplates] = useState(false);
  const [selectedButton, setSelectedButton] = useState<ButtonTemplate | null>(
    null,
  );
  const [selectedBodyStyle, setSelectedBodyStyle] =
    useState<BodyStyleTemplate | null>(null);

  const handleSelectButtonTemplate = (template: ButtonTemplate) => {
    setSelectedButton(template);
    setShowButtonTemplates(false);
  };

  const handleSelectBodyStyleTemplate = (template: BodyStyleTemplate) => {
    setSelectedBodyStyle(template);
    setShowBodyStyleTemplates(false);
  };

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
                <h1 className="text-xl font-bold">🎨 Features Demo</h1>
                <p className="text-sm text-gray-500">
                  Template-Funktionen testen
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              🚀 Neue Template-Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Testen Sie die neuen Button-Templates und Body-Style-Templates mit
              Demo-Integration
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Button Templates */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Button-Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Wählen Sie aus 8 vorgefertigten Button-Templates mit
                  verschiedenen Effekten.
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={() => setShowButtonTemplates(true)}
                    className="w-full flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Button-Template auswählen
                  </Button>

                  {selectedButton && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2 text-blue-900">
                        Ausgewähltes Template: {selectedButton.name}
                      </h4>
                      <div className="flex justify-center p-4 bg-white rounded border">
                        {selectedButton.preview}
                      </div>
                      <div className="mt-3 text-sm text-blue-700">
                        <strong>Konfiguration:</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Effekt: {selectedButton.config.effect}</li>
                          <li>Größe: {selectedButton.config.size}</li>
                          <li>Stil: {selectedButton.config.variant}</li>
                          {selectedButton.config.emoji && (
                            <li>Emoji: {selectedButton.config.emoji}</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">
                    ✅ Verfügbare Features:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 8 verschiedene Hover-Effekte</li>
                    <li>• 4 Kategorien (CTA, Info, Action, Social)</li>
                    <li>• Live-Vorschau mit Beispiel-Buttons</li>
                    <li>• One-Click Integration in Inhaltsblöcke</li>
                    <li>• Vollständig anpassbare Konfiguration</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Body Style Templates */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  Body-Style-Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Nutzen Sie vorgefertigte Design-Styles oder
                  Demo-Template-Designs für die ganze Seite.
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={() => setShowBodyStyleTemplates(true)}
                    variant="outline"
                    className="w-full flex items-center gap-2"
                  >
                    <Palette className="w-4 h-4" />
                    Body-Style-Template auswählen
                  </Button>

                  {selectedBodyStyle && (
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium mb-2 text-purple-900">
                        Ausgewähltes Template: {selectedBodyStyle.name}
                      </h4>
                      <div className="border rounded overflow-hidden">
                        {selectedBodyStyle.preview}
                      </div>
                      <div className="mt-3 text-sm text-purple-700">
                        <strong>Konfiguration:</strong>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded border"
                                style={{
                                  backgroundColor:
                                    selectedBodyStyle.config.primaryColor,
                                }}
                              />
                              <span>
                                Primär: {selectedBodyStyle.config.primaryColor}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded border"
                                style={{
                                  backgroundColor:
                                    selectedBodyStyle.config.secondaryColor,
                                }}
                              />
                              <span>
                                Sekundär:{" "}
                                {selectedBodyStyle.config.secondaryColor}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div>
                              Container:{" "}
                              {selectedBodyStyle.config.containerWidth}
                            </div>
                            <div>
                              Font: {selectedBodyStyle.config.fontFamily}
                            </div>
                            <div>
                              Padding: {selectedBodyStyle.config.bodyPadding}px
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">
                    ✅ Verfügbare Features:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 6 vorgefertigte Style-Templates</li>
                    <li>• Demo-Template-Styles integriert</li>
                    <li>• Kategorien nach Branche</li>
                    <li>• Farb-Paletten-Vorschau</li>
                    <li>• One-Click Design-Anwendung</li>
                    <li>• Footer-Styling inkludiert</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integration Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                So verwenden Sie die Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    🔘 Button-Templates im Page Builder:
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Neue Landing Page erstellen oder bearbeiten</li>
                    <li>
                      Button-Block hinzufügen (wird automatisch erweitert)
                    </li>
                    <li>"Template wählen" Button klicken</li>
                    <li>Gewünschtes Template auswählen</li>
                    <li>Template wird automatisch angewendet</li>
                    <li>Bei Bedarf weitere Anpassungen vornehmen</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    🎨 Body-Style-Templates:
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Page Builder öffnen</li>
                    <li>Zum "Body Style" Tab wechseln</li>
                    <li>"Style-Template" Button klicken</li>
                    <li>Kategorie auswählen (Business, Marketing, etc.)</li>
                    <li>Template auswählen</li>
                    <li>Komplettes Design wird angewendet</li>
                  </ol>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">
                  💡 Pro-Tipp:
                </h4>
                <p className="text-sm text-green-700">
                  Die Demo-Template-Styles in den Body-Style-Templates nutzen
                  die Design-Einstellungen aus den vorgefertigten Landing Page
                  Templates. So können Sie nur das Design übernehmen, ohne den
                  kompletten Inhalt zu kopieren.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              Bereit zum Ausprobieren?
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                🏠 Zurück zum Dashboard
              </Button>
              <Button
                onClick={() => navigate("/page-builder/demo")}
                variant="outline"
                size="lg"
              >
                ✏️ Page Builder öffnen
              </Button>
              <Button
                onClick={() => navigate("/button-gallery")}
                variant="outline"
                size="lg"
              >
                🎨 Button Gallery ansehen
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Template Modals */}
      <ButtonTemplateSelector
        isOpen={showButtonTemplates}
        onClose={() => setShowButtonTemplates(false)}
        onSelect={handleSelectButtonTemplate}
      />

      <BodyStyleTemplateSelector
        isOpen={showBodyStyleTemplates}
        onClose={() => setShowBodyStyleTemplates(false)}
        onSelect={handleSelectBodyStyleTemplate}
      />
    </div>
  );
}
