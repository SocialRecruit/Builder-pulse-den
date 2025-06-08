import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestPageBuilder() {
  const { pageId } = useParams<{ pageId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">🔧 Page Builder Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-lg mb-4">✅ Page Builder Route funktioniert!</p>
            <p className="text-sm text-gray-600 mb-4">
              Page ID:{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">{pageId}</code>
            </p>
          </div>

          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link to="/dashboard">← Zurück zum Dashboard</Link>
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                window.location.href = `/page-builder/${pageId}`;
              }}
            >
              🔄 WorkingPageBuilder laden
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Debug Info:</h3>
            <ul className="text-sm space-y-1">
              <li>✅ React Router funktioniert</li>
              <li>✅ Komponente lädt</li>
              <li>✅ useParams funktioniert</li>
              <li>✅ Page ID: {pageId}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
