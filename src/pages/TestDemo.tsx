import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";

export default function TestDemo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              🎯 Demo Test Seite
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Demo funktioniert!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Erfolgreich!
                </h2>
                <p className="text-gray-600">
                  Sie sind jetzt in der Demo-Seite und nicht mehr in der
                  Datenschutzerklärung.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">
                  ✅ Was funktioniert jetzt:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Navigation zu Demo-Seiten funktioniert</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Button-Templates sind im Page Builder verfügbar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Body-Style-Templates mit Demo-Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Alle Inhaltsblöcke funktionieren korrekt</span>
                  </li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-bold mb-3">🚀 Jetzt testen:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    onClick={() => navigate("/template-test")}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Template Test
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
                  <Button
                    onClick={() => navigate("/dashboard")}
                    variant="outline"
                  >
                    🏠 Dashboard
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  💡 So nutzen Sie die Templates:
                </h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>
                    <strong>Button-Templates:</strong> Im Page Builder →
                    Button-Block → "Template wählen"
                  </p>
                  <p>
                    <strong>Body-Style-Templates:</strong> Page Builder → Body
                    Style Tab → "Style-Template"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
