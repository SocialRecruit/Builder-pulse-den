import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Eye, Plus } from "lucide-react";
import { useLandingPages } from "@/hooks/useLandingPages";
import { toast } from "sonner";

export default function PageBuilderSimple() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { pages, updatePage, addBlock } = useLandingPages();

  const page = pages.find((p) => p.id === pageId);

  useEffect(() => {
    console.log("PageBuilder loaded with pageId:", pageId);
    console.log("Available pages:", pages);
    console.log("Found page:", page);
  }, [pageId, pages, page]);

  const handleSave = () => {
    if (!page) return;
    updatePage(page.id, { updatedAt: new Date().toISOString() });
    toast.success("Änderungen gespeichert!");
  };

  const handlePublishToggle = () => {
    if (!page) return;
    updatePage(page.id, { published: !page.published });
    toast.success(
      page.published
        ? "Seite als Entwurf gespeichert"
        : "Seite veröffentlicht!",
    );
  };

  const handlePreview = () => {
    if (!page) return;
    window.open(`/jobs/${page.slug}`, "_blank");
  };

  // Loading state
  if (!pageId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Keine Seiten-ID
          </h2>
          <p className="text-gray-600 mb-4">
            Es wurde keine gültige Seiten-ID übertragen.
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Zurück zum Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Page not found
  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Seite nicht gefunden
          </h2>
          <p className="text-gray-600 mb-4">
            Die Seite mit ID "{pageId}" konnte nicht gefunden werden.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Verfügbare Seiten:</p>
            {pages.length > 0 ? (
              <ul className="text-sm text-gray-600">
                {pages.map((p) => (
                  <li key={p.id} className="mb-1">
                    {p.title} (ID: {p.id})
                    <Button
                      size="sm"
                      variant="link"
                      className="ml-2"
                      onClick={() => navigate(`/page-builder/${p.id}`)}
                    >
                      Öffnen
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Keine Seiten vorhanden</p>
            )}
          </div>
          <Button onClick={() => navigate("/dashboard")} className="mt-4">
            Zurück zum Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                Zurück
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {page.title}
                </h1>
                <p className="text-sm text-gray-500">/jobs/{page.slug}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Label htmlFor="published" className="text-sm">
                  Veröffentlicht
                </Label>
                <Switch
                  id="published"
                  checked={page.published}
                  onCheckedChange={handlePublishToggle}
                />
              </div>

              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Vorschau
              </Button>

              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Speichern
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Section */}
            <Card>
              <CardHeader>
                <CardTitle>Header-Bereich</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Seitentitel</Label>
                  <Input
                    value={page.header.title}
                    onChange={(e) =>
                      updatePage(page.id, {
                        header: { ...page.header, title: e.target.value },
                      })
                    }
                    placeholder="Seitentitel eingeben..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Header-Text</Label>
                  <Input
                    value={page.header.text}
                    onChange={(e) =>
                      updatePage(page.id, {
                        header: { ...page.header, text: e.target.value },
                      })
                    }
                    placeholder="Header-Text eingeben..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content Blocks */}
            <Card>
              <CardHeader>
                <CardTitle>Inhaltsblöcke ({page.blocks.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {page.blocks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Noch keine Inhaltsblöcke vorhanden.</p>
                    <Button
                      onClick={() => addBlock(page.id, "text")}
                      className="mt-4"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ersten Block hinzufügen
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {page.blocks.map((block, index) => (
                      <Card key={block.id}>
                        <CardContent className="p-4">
                          <p className="text-sm font-medium">
                            Block {index + 1}: {block.type}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {block.id}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Block hinzufügen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addBlock(page.id, "heading")}
                >
                  📝 Überschrift
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addBlock(page.id, "text")}
                >
                  📄 Text
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addBlock(page.id, "button")}
                >
                  🔘 Button
                </Button>
              </CardContent>
            </Card>

            {/* Page Info */}
            <Card>
              <CardHeader>
                <CardTitle>Seiten-Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>ID:</strong> {page.id}
                </p>
                <p>
                  <strong>Slug:</strong> {page.slug}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {page.published ? "Veröffentlicht" : "Entwurf"}
                </p>
                <p>
                  <strong>Blöcke:</strong> {page.blocks.length}
                </p>
                <p>
                  <strong>Erstellt:</strong>{" "}
                  {new Date(page.createdAt).toLocaleDateString("de-DE")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
