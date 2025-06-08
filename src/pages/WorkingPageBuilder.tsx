import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Eye, Plus, Trash2 } from "lucide-react";
import { useLandingPages } from "@/hooks/useLandingPages";
import { toast } from "sonner";

export default function WorkingPageBuilder() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { pages, updatePage, addBlock, updateBlock, deleteBlock } =
    useLandingPages();

  const page = pages.find((p) => p.id === pageId);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  console.log("PageBuilder loaded:", {
    pageId,
    page,
    pagesCount: pages.length,
  });

  if (!pageId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Fehler: Keine Seiten-ID</h2>
            <Button onClick={() => navigate("/dashboard")}>
              Zurück zum Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Seite nicht gefunden</h2>
            <p className="text-gray-600 mb-4">ID: {pageId}</p>
            <p className="text-sm text-gray-500 mb-4">
              Verfügbare Seiten: {pages.length}
            </p>
            <div className="space-y-2">
              {pages.map((p) => (
                <div key={p.id} className="text-xs bg-gray-100 p-2 rounded">
                  {p.title} (ID: {p.id})
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => navigate(`/page-builder/${p.id}`)}
                  >
                    Öffnen
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={() => navigate("/dashboard")} className="mt-4">
              Zurück zum Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    updatePage(page.id, { updatedAt: new Date().toISOString() });
    toast.success("Gespeichert!");
  };

  const handlePreview = () => {
    window.open(`/jobs/${page.slug}`, "_blank");
  };

  const handleAddBlock = (type: "heading" | "text" | "button" | "image") => {
    addBlock(page.id, type);
    toast.success("Block hinzugefügt!");
  };

  const handleUpdateBlock = (blockId: string, content: any) => {
    updateBlock(page.id, blockId, content);
    toast.success("Block aktualisiert!");
  };

  const handleDeleteBlock = (blockId: string) => {
    deleteBlock(page.id, blockId);
    setActiveBlock(null);
    toast.success("Block gelöscht!");
  };

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
                <h1 className="text-xl font-bold">{page.title}</h1>
                <p className="text-sm text-gray-500">/jobs/{page.slug}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Label>Veröffentlicht</Label>
                <Switch
                  checked={page.published}
                  onCheckedChange={(checked) =>
                    updatePage(page.id, { published: checked })
                  }
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

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Editor */}
            <Card>
              <CardHeader>
                <CardTitle>📋 Header-Bereich</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Header-Titel</Label>
                  <Input
                    value={page.header.title}
                    onChange={(e) =>
                      updatePage(page.id, {
                        header: { ...page.header, title: e.target.value },
                      })
                    }
                    placeholder="Header-Titel"
                  />
                </div>

                <div>
                  <Label>Header-Text</Label>
                  <Textarea
                    value={page.header.text}
                    onChange={(e) =>
                      updatePage(page.id, {
                        header: { ...page.header, text: e.target.value },
                      })
                    }
                    placeholder="Header-Beschreibung"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Header-Bild URL</Label>
                  <Input
                    value={page.header.image || ""}
                    onChange={(e) =>
                      updatePage(page.id, {
                        header: { ...page.header, image: e.target.value },
                      })
                    }
                    placeholder="https://beispiel.com/bild.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content Blocks */}
            <Card>
              <CardHeader>
                <CardTitle>📝 Inhaltsblöcke ({page.blocks.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {page.blocks.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">
                      Noch keine Inhalte vorhanden
                    </p>
                    <Button onClick={() => handleAddBlock("text")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ersten Block hinzufügen
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {page.blocks
                      .sort((a, b) => a.order - b.order)
                      .map((block, index) => (
                        <Card
                          key={block.id}
                          className="border-l-4 border-l-blue-500"
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-sm">
                                {block.type === "heading" && "📝 Überschrift"}
                                {block.type === "text" && "📄 Text"}
                                {block.type === "button" && "🔘 Button"}
                                {block.type === "image" && "🖼️ Bild"}
                                {block.type === "form" && "📋 Formular"}
                                {block.type === "spacer" && "📏 Abstand"}
                                {block.type === "richtext" && "✏️ Rich Text"}
                                {block.type === "sourcecode" && "💻 Code"}
                                {` #${index + 1}`}
                              </CardTitle>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant={
                                    activeBlock === block.id
                                      ? "default"
                                      : "outline"
                                  }
                                  onClick={() =>
                                    setActiveBlock(
                                      activeBlock === block.id
                                        ? null
                                        : block.id,
                                    )
                                  }
                                >
                                  {activeBlock === block.id ? "−" : "+"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteBlock(block.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>

                          {activeBlock === block.id && (
                            <CardContent className="pt-0">
                              {/* Block Editor */}
                              {block.type === "heading" && (
                                <div className="space-y-3">
                                  <div>
                                    <Label>Überschrift</Label>
                                    <Input
                                      value={block.content.text || ""}
                                      onChange={(e) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          text: e.target.value,
                                        })
                                      }
                                      placeholder="Überschrift eingeben"
                                    />
                                  </div>
                                  <div>
                                    <Label>Größe</Label>
                                    <Select
                                      value={
                                        block.content.level?.toString() || "2"
                                      }
                                      onValueChange={(value) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          level: parseInt(value),
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="1">
                                          H1 - Sehr groß
                                        </SelectItem>
                                        <SelectItem value="2">
                                          H2 - Groß
                                        </SelectItem>
                                        <SelectItem value="3">
                                          H3 - Mittel
                                        </SelectItem>
                                        <SelectItem value="4">
                                          H4 - Klein
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Ausrichtung</Label>
                                    <Select
                                      value={block.content.alignment || "left"}
                                      onValueChange={(value) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          alignment: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="left">
                                          Links
                                        </SelectItem>
                                        <SelectItem value="center">
                                          Mittig
                                        </SelectItem>
                                        <SelectItem value="right">
                                          Rechts
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}

                              {block.type === "text" && (
                                <div className="space-y-3">
                                  <div>
                                    <Label>Text</Label>
                                    <Textarea
                                      value={block.content.text || ""}
                                      onChange={(e) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          text: e.target.value,
                                        })
                                      }
                                      placeholder="Text eingeben"
                                      rows={4}
                                    />
                                  </div>
                                  <div>
                                    <Label>Ausrichtung</Label>
                                    <Select
                                      value={block.content.alignment || "left"}
                                      onValueChange={(value) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          alignment: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="left">
                                          Links
                                        </SelectItem>
                                        <SelectItem value="center">
                                          Mittig
                                        </SelectItem>
                                        <SelectItem value="right">
                                          Rechts
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}

                              {block.type === "button" && (
                                <div className="space-y-3">
                                  <div>
                                    <Label>Button-Text</Label>
                                    <Input
                                      value={block.content.text || ""}
                                      onChange={(e) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          text: e.target.value,
                                        })
                                      }
                                      placeholder="Button-Text"
                                    />
                                  </div>
                                  <div>
                                    <Label>URL</Label>
                                    <Input
                                      value={block.content.url || ""}
                                      onChange={(e) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          url: e.target.value,
                                        })
                                      }
                                      placeholder="https://..."
                                    />
                                  </div>
                                  <div>
                                    <Label>Style</Label>
                                    <Select
                                      value={block.content.variant || "primary"}
                                      onValueChange={(value) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          variant: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="primary">
                                          Primär (Blau)
                                        </SelectItem>
                                        <SelectItem value="secondary">
                                          Sekundär (Grau)
                                        </SelectItem>
                                        <SelectItem value="success">
                                          Erfolg (Grün)
                                        </SelectItem>
                                        <SelectItem value="danger">
                                          Gefahr (Rot)
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Ausrichtung</Label>
                                    <Select
                                      value={
                                        block.content.alignment || "center"
                                      }
                                      onValueChange={(value) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          alignment: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="left">
                                          Links
                                        </SelectItem>
                                        <SelectItem value="center">
                                          Mittig
                                        </SelectItem>
                                        <SelectItem value="right">
                                          Rechts
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}

                              {block.type === "image" && (
                                <div className="space-y-3">
                                  <div>
                                    <Label>Bild-URL</Label>
                                    <Input
                                      value={block.content.src || ""}
                                      onChange={(e) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          src: e.target.value,
                                        })
                                      }
                                      placeholder="https://beispiel.com/bild.jpg"
                                    />
                                  </div>
                                  <div>
                                    <Label>Alt-Text</Label>
                                    <Input
                                      value={block.content.alt || ""}
                                      onChange={(e) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          alt: e.target.value,
                                        })
                                      }
                                      placeholder="Bildbeschreibung"
                                    />
                                  </div>
                                  <div>
                                    <Label>Größe</Label>
                                    <Select
                                      value={block.content.size || "normal"}
                                      onValueChange={(value) =>
                                        handleUpdateBlock(block.id, {
                                          ...block.content,
                                          size: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="small">
                                          Klein
                                        </SelectItem>
                                        <SelectItem value="normal">
                                          Normal
                                        </SelectItem>
                                        <SelectItem value="large">
                                          Groß
                                        </SelectItem>
                                        <SelectItem value="fullwidth">
                                          Volle Breite
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          )}
                        </Card>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Add Block */}
            <Card>
              <CardHeader>
                <CardTitle>➕ Block hinzufügen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddBlock("heading")}
                >
                  📝 Überschrift
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddBlock("text")}
                >
                  📄 Text
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddBlock("button")}
                >
                  🔘 Button
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddBlock("image")}
                >
                  🖼️ Bild
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>⚡ Aktionen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handlePreview}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Live-Vorschau
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Speichern
                </Button>
              </CardContent>
            </Card>

            {/* Page Info */}
            <Card>
              <CardHeader>
                <CardTitle>ℹ️ Seiten-Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span
                    className={
                      page.published ? "text-green-600" : "text-orange-600"
                    }
                  >
                    {page.published ? "✅ Veröffentlicht" : "⏳ Entwurf"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Blöcke:</span>
                  <span>{page.blocks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>URL:</span>
                  <code className="text-xs bg-gray-100 px-1 rounded">
                    /jobs/{page.slug}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
