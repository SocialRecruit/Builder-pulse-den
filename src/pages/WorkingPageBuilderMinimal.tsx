import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function WorkingPageBuilderMinimal() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Page Builder
                </h1>
                <p className="text-sm text-gray-500">
                  Minimal Version - Page ID: {pageId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                🔧 Page Builder - Minimal Version
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h2 className="text-xl font-bold mb-2">
                  Page Builder funktioniert!
                </h2>
                <p className="text-gray-600 mb-4">
                  Diese minimal Version lädt ohne Probleme.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Debug Information:</h3>
                <ul className="text-sm space-y-1">
                  <li>✅ React Router: Funktioniert</li>
                  <li>✅ useParams: Page ID = {pageId}</li>
                  <li>✅ UI Components: Laden korrekt</li>
                  <li>✅ Navigation: Funktioniert</li>
                </ul>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full"
                  onClick={() => {
                    console.log("Versuche normalen Page Builder zu laden...");
                    window.location.href = `/page-builder/${pageId}`;
                  }}
                >
                  🔄 Normalen Page Builder versuchen
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/dashboard")}
                >
                  ← Zurück zum Dashboard
                </Button>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Was als nächstes:</h3>
                <p className="text-sm">
                  Falls der normale Page Builder nicht lädt, liegt es an den
                  komplexeren Komponenten. Wir können diese schrittweise wieder
                  aktivieren.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
