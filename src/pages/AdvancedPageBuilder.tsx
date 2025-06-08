import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Settings,
  Palette,
  Layout,
} from "lucide-react";
import { AdvancedBlockEditor } from "@/components/landing-builder/AdvancedBlockEditors";
import { EnhancedBlockRenderer } from "@/components/landing-builder/EnhancedBlockRenderer";
import { DragDropUpload } from "@/components/landing-builder/DragDropUpload";
import { useLandingPages } from "@/hooks/useLandingPages";
import { useUsers } from "@/hooks/useUsers";
import { ContentBlock } from "@/types/landing-page";
import { toast } from "sonner";

export default function AdvancedPageBuilder() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");

  const { pages, updatePage, addBlock, updateBlock, deleteBlock } =
    useLandingPages();
  const { canEdit } = useUsers();

  const page = pages.find((p) => p.id === pageId);

  useEffect(() => {
    if (!page) {
      navigate("/dashboard");
      return;
    }

    if (!canEdit()) {
      toast.error("Sie haben keine Berechtigung, diese Seite zu bearbeiten.");
      navigate("/dashboard");
      return;
    }
  }, [page, canEdit, navigate]);

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
          <Button onClick={() => navigate("/dashboard")}>
            Zurück zum Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updatePage(page.id, { updatedAt: new Date().toISOString() });
    toast.success("Änderungen gespeichert!");
  };

  const handlePublishToggle = () => {
    updatePage(page.id, { published: !page.published });
    toast.success(
      page.published
        ? "Seite als Entwurf gespeichert"
        : "Seite veröffentlicht!",
    );
  };

  const handleAddBlock = (blockType: ContentBlock["type"]) => {
    addBlock(page.id, blockType);
    toast.success("Block hinzugefügt");
  };

  const handleUpdateBlock = (blockId: string, content: any) => {
    updateBlock(page.id, blockId, content);
  };

  const handleDeleteBlock = (blockId: string) => {
    deleteBlock(page.id, blockId);
    toast.success("Block gelöscht");
  };

  const handleMoveBlock = (blockId: string, direction: "up" | "down") => {
    const blockIndex = page.blocks.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) return;

    const newBlocks = [...page.blocks];
    const targetIndex = direction === "up" ? blockIndex - 1 : blockIndex + 1;

    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;

    [newBlocks[blockIndex], newBlocks[targetIndex]] = [
      newBlocks[targetIndex],
      newBlocks[blockIndex],
    ];

    // Update order
    const reorderedBlocks = newBlocks.map((block, index) => ({
      ...block,
      order: index,
    }));

    updatePage(page.id, { blocks: reorderedBlocks });
    toast.success("Block verschoben");
  };

  const handlePreview = () => {
    window.open(`/jobs/${page.slug}`, "_blank");
  };

  const blockTypes = [
    {
      type: "heading" as const,
      label: "Überschrift",
      icon: "📝",
      description: "H1-H6 Headlines mit Styling",
    },
    {
      type: "text" as const,
      label: "Text",
      icon: "📄",
      description: "Einfacher Textblock",
    },
    {
      type: "richtext" as const,
      label: "Rich Text",
      icon: "✏️",
      description: "HTML Editor mit Formatierung",
    },
    {
      type: "image" as const,
      label: "Bild",
      icon: "🖼️",
      description: "Bilder mit Upload & Bibliothek",
    },
    {
      type: "button" as const,
      label: "Button",
      icon: "🔘",
      description: "Call-to-Action Buttons",
    },
    {
      type: "form" as const,
      label: "Bewerbungsformular",
      icon: "📋",
      description: "Formular Builder",
    },
    {
      type: "sourcecode" as const,
      label: "Quelltext",
      icon: "💻",
      description: "HTML/CSS/JavaScript Code",
    },
    {
      type: "spacer" as const,
      label: "Abstand",
      icon: "📏",
      description: "Vertikaler Leerraum",
    },
  ];

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

      <div className="container mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Inhalt</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="settings">Einstellungen</TabsTrigger>
            <TabsTrigger value="preview">Vorschau</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Editor */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layout className="h-5 w-5" />
                      Header-Bereich
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Header-Titel</Label>
                      <Input
                        value={page.header.title}
                        onChange={(e) =>
                          updatePage(page.id, {
                            header: { ...page.header, title: e.target.value },
                          })
                        }
                        placeholder="Header-Titel eingeben..."
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
                        placeholder="Header-Untertitel eingeben..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Header-Bild</Label>
                      <DragDropUpload
                        value={page.header.image}
                        onChange={(url) =>
                          updatePage(page.id, {
                            header: { ...page.header, image: url },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Content Blocks */}
                <Card>
                  <CardHeader>
                    <CardTitle>Inhaltsblöcke ({page.blocks.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {page.blocks
                      .sort((a, b) => a.order - b.order)
                      .map((block, index) => (
                        <AdvancedBlockEditor
                          key={block.id}
                          block={block}
                          onUpdate={(content) =>
                            handleUpdateBlock(block.id, content)
                          }
                          onDelete={() => handleDeleteBlock(block.id)}
                          onMoveUp={
                            index > 0
                              ? () => handleMoveBlock(block.id, "up")
                              : undefined
                          }
                          onMoveDown={
                            index < page.blocks.length - 1
                              ? () => handleMoveBlock(block.id, "down")
                              : undefined
                          }
                        />
                      ))}

                    {page.blocks.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Layout className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium mb-2">
                          Noch keine Inhalte
                        </h3>
                        <p className="mb-4">
                          Fügen Sie Ihren ersten Inhaltsblock hinzu.
                        </p>
                        <Button onClick={() => handleAddBlock("text")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Ersten Block hinzufügen
                        </Button>
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
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Block hinzufügen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {blockTypes.map((blockType) => (
                        <Button
                          key={blockType.type}
                          variant="outline"
                          className="h-auto p-4 flex flex-col items-start text-left"
                          onClick={() => handleAddBlock(blockType.type)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{blockType.icon}</span>
                            <span className="font-medium">
                              {blockType.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {blockType.description}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Page Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Seiten-Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span
                        className={
                          page.published ? "text-green-600" : "text-orange-600"
                        }
                      >
                        {page.published ? "Veröffentlicht" : "Entwurf"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Blöcke:</span>
                      <span>{page.blocks.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Erstellt:</span>
                      <span>
                        {new Date(page.createdAt).toLocaleDateString("de-DE")}
                      </span>
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
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Seiten-Design
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Farben</h3>
                    <div className="space-y-2">
                      <Label>Primärfarbe</Label>
                      <Input
                        type="color"
                        value={page.design?.primaryColor || "#3b82f6"}
                        onChange={(e) =>
                          updatePage(page.id, {
                            design: {
                              ...page.design,
                              primaryColor: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sekundärfarbe</Label>
                      <Input
                        type="color"
                        value={page.design?.secondaryColor || "#6b7280"}
                        onChange={(e) =>
                          updatePage(page.id, {
                            design: {
                              ...page.design,
                              secondaryColor: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Hintergrundfarbe</Label>
                      <Input
                        type="color"
                        value={page.design?.backgroundColor || "#ffffff"}
                        onChange={(e) =>
                          updatePage(page.id, {
                            design: {
                              ...page.design,
                              backgroundColor: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Typografie</h3>
                    <div className="space-y-2">
                      <Label>Schriftart</Label>
                      <Select
                        value={page.design?.fontFamily || "inter"}
                        onValueChange={(value) =>
                          updatePage(page.id, {
                            design: { ...page.design, fontFamily: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter (Modern)</SelectItem>
                          <SelectItem value="roboto">
                            Roboto (Klassisch)
                          </SelectItem>
                          <SelectItem value="opensans">
                            Open Sans (Lesbar)
                          </SelectItem>
                          <SelectItem value="poppins">
                            Poppins (Freundlich)
                          </SelectItem>
                          <SelectItem value="playfair">
                            Playfair (Elegant)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Container-Breite</Label>
                      <Select
                        value={page.design?.containerWidth || "normal"}
                        onValueChange={(value) =>
                          updatePage(page.id, {
                            design: { ...page.design, containerWidth: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="narrow">Schmal (768px)</SelectItem>
                          <SelectItem value="normal">
                            Normal (1024px)
                          </SelectItem>
                          <SelectItem value="wide">Breit (1280px)</SelectItem>
                          <SelectItem value="full">Volle Breite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Seiteneinstellungen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Seitentitel</Label>
                    <Input
                      value={page.title}
                      onChange={(e) =>
                        updatePage(page.id, { title: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>URL-Slug</Label>
                    <Input
                      value={page.slug}
                      onChange={(e) =>
                        updatePage(page.id, { slug: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>SEO Titel</Label>
                    <Input
                      value={page.seoTitle || ""}
                      onChange={(e) =>
                        updatePage(page.id, { seoTitle: e.target.value })
                      }
                      placeholder={page.title}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>SEO Beschreibung</Label>
                    <Input
                      value={page.seoDescription || ""}
                      onChange={(e) =>
                        updatePage(page.id, { seoDescription: e.target.value })
                      }
                      placeholder="Beschreibung für Suchmaschinen..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Footer-Einstellungen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Impressum anzeigen</Label>
                    <Switch
                      checked={page.footer.showImpressum}
                      onCheckedChange={(checked) =>
                        updatePage(page.id, {
                          footer: { ...page.footer, showImpressum: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Datenschutz anzeigen</Label>
                    <Switch
                      checked={page.footer.showPrivacy}
                      onCheckedChange={(checked) =>
                        updatePage(page.id, {
                          footer: { ...page.footer, showPrivacy: checked },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Footer-Text</Label>
                    <Input
                      value={page.footer.customFooterText || ""}
                      onChange={(e) =>
                        updatePage(page.id, {
                          footer: {
                            ...page.footer,
                            customFooterText: e.target.value,
                          },
                        })
                      }
                      placeholder="Zusätzlicher Text..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live-Vorschau</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden bg-white">
                  <div className="p-6 space-y-6">
                    {/* Header Preview */}
                    <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg overflow-hidden">
                      {page.header.image && (
                        <div className="absolute inset-0">
                          <img
                            src={page.header.image}
                            alt={page.header.title}
                            className="w-full h-full object-cover opacity-60"
                          />
                        </div>
                      )}
                      <div className="relative p-8 text-center">
                        <h1 className="text-3xl font-bold mb-4">
                          {page.header.title}
                        </h1>
                        <p className="text-lg opacity-90">{page.header.text}</p>
                      </div>
                    </div>

                    {/* Blocks Preview */}
                    <div className="space-y-6">
                      {page.blocks
                        .sort((a, b) => a.order - b.order)
                        .map((block) => (
                          <EnhancedBlockRenderer
                            key={block.id}
                            block={block}
                            isPreview={true}
                          />
                        ))}
                    </div>

                    {/* Footer Preview */}
                    <div className="border-t pt-6 text-center text-sm text-gray-600">
                      {page.footer.customFooterText && (
                        <p className="mb-2">{page.footer.customFooterText}</p>
                      )}
                      <div className="flex justify-center space-x-4">
                        {page.footer.showImpressum && <span>Impressum</span>}
                        {page.footer.showPrivacy && <span>Datenschutz</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
