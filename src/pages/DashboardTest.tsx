import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardTest() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">🎯 Dashboard Test</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Test 1: Basic Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Wenn Sie das sehen können, funktionieren die UI-Komponenten.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test 2: Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/button-gallery")}>
                Zur Button Gallery
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test 3: Styling</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-600">
              <p>Montserrat Font Test</p>
              <div className="mt-2 p-2 bg-blue-100 rounded">
                CSS funktioniert ✅
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-xl mb-4">
            Wenn Sie das sehen, funktioniert das System grundsätzlich!
          </h2>
          <div className="space-x-4">
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              Zurück zum Original Dashboard
            </Button>
            <Button onClick={() => navigate("/button-gallery")}>
              Button Gallery testen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
