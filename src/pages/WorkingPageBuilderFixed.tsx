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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  Palette,
  Settings,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import { useLandingPages } from "@/hooks/useLandingPages";
import { MediaGallery } from "@/components/ui/MediaGallery";
import { toast } from "sonner";

export default function WorkingPageBuilderFixed() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { pages, updatePage, addBlock, updateBlock, deleteBlock } =
    useLandingPages();

  const page = pages.find((p) => p.id === pageId);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [showMediaGallery, setShowMediaGallery] = useState(false);

  if (!pageId || !page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">
              {!pageId ? "Fehler: Keine Seiten-ID" : "Seite nicht gefunden"}
            </h2>
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

  const handleAddBlock = (type: any) => {
    const newBlock = addBlock(page.id, type);
    // Auto-expand the newly added block
    setActiveBlock(newBlock.id);
    toast.success("Block hinzugefügt!");
  };

  const handleUpdateBlock = (blockId: string, content: any) => {
    updateBlock(page.id, blockId, content);
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
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Inhalt</TabsTrigger>
            <TabsTrigger value="bodystyle">Body Style</TabsTrigger>
            <TabsTrigger value="settings">Einstellungen</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Editor */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header Editor */}
                <Card>
                  <CardHeader>
                    <CardTitle>🎨 Header-Bereich</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Header-Bild</Label>
                      <div className="flex gap-2">
                        <Input
                          value={page.header.image || ""}
                          onChange={(e) =>
                            updatePage(page.id, {
                              header: {
                                ...page.header,
                                image: e.target.value,
                              },
                            })
                          }
                          placeholder="https://beispiel.com/header-bild.jpg"
                        />
                        <Button
                          variant="outline"
                          onClick={() => setShowMediaGallery(true)}
                          className="px-3"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Header-Höhe (px)</Label>
                      <div className="space-y-3">
                        <Input
                          type="range"
                          min="0"
                          max="1000"
                          step="10"
                          value={page.header.customHeight || 400}
                          onChange={(e) =>
                            updatePage(page.id, {
                              header: {
                                ...page.header,
                                customHeight: parseInt(e.target.value),
                              },
                            })
                          }
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0px</span>
                          <span className="font-medium text-blue-600">
                            {page.header.customHeight || 400}px
                          </span>
                          <span>1000px</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Haupttitel</Label>
                      <Input
                        value={page.header.title}
                        onChange={(e) =>
                          updatePage(page.id, {
                            header: { ...page.header, title: e.target.value },
                          })
                        }
                        placeholder="z.B. Marketing Manager (m/w/d)"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Content Blocks */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      📝 Inhaltsblöcke ({page.blocks.length})
                    </CardTitle>
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
                                    {block.type === "heading" &&
                                      "📝 Überschrift"}
                                    {block.type === "text" && "📄 Text"}
                                    {block.type === "button" && "🔘 Button"}
                                    {block.type === "image" && "🖼️ Bild"}
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
                                      onClick={() =>
                                        handleDeleteBlock(block.id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>

                              {activeBlock === block.id && (
                                <CardContent className="pt-0">
                                  {/* Button Editor with Template Selector */}
                                  {block.type === "button" && (
                                    <div className="space-y-4">
                                      <div className="flex items-center justify-between">
                                        <Label className="text-base font-medium">
                                          Button konfigurieren
                                        </Label>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="flex items-center gap-2"
                                        >
                                          <Sparkles className="w-4 h-4" />
                                          Template wählen
                                        </Button>
                                      </div>

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
                                    </div>
                                  )}

                                  {/* Other block editors */}
                                  {block.type === "text" && (
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
                                        placeholder="Ihr Text hier..."
                                        rows={4}
                                      />
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
              <div className="lg:col-span-1 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Block hinzufügen</CardTitle>
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
              </div>
            </div>
          </TabsContent>

          {/* Other tabs simplified for now */}
          <TabsContent value="bodystyle">
            <Card>
              <CardHeader>
                <CardTitle>Design-Optionen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Design-Optionen werden geladen...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Seiten-Einstellungen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Seitentitel</Label>
                    <Input
                      value={page.title}
                      onChange={(e) =>
                        updatePage(page.id, { title: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Media Gallery Modal */}
      <MediaGallery
        isOpen={showMediaGallery}
        onClose={() => setShowMediaGallery(false)}
        onSelect={(imageUrl, alt) => {
          updatePage(page.id, {
            header: {
              ...page.header,
              image: imageUrl,
            },
          });
          setShowMediaGallery(false);
        }}
        selectedUrl={page.header.image}
      />
    </div>
  );
}
