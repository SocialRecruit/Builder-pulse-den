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
import {
  ButtonTemplateSelector,
  type ButtonTemplate,
} from "@/components/ui/ButtonTemplateSelector";
import {
  BodyStyleTemplateSelector,
  QuickBodyStyleSelector,
  type BodyStyleTemplate,
} from "@/components/ui/BodyStyleTemplates";
import {
  FormBlockEditor,
  defaultFormBlock,
  type EnhancedFormBlock,
} from "@/components/landing-builder/blocks/FormBlock";
import { toast } from "sonner";

export default function WorkingPageBuilder() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { pages, updatePage, addBlock, updateBlock, deleteBlock } =
    useLandingPages();

  const page = pages.find((p) => p.id === pageId);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [showButtonTemplates, setShowButtonTemplates] = useState(false);
  const [showBodyStyleTemplates, setShowBodyStyleTemplates] = useState(false);
  const [editingButtonBlock, setEditingButtonBlock] = useState<string | null>(
    null,
  );

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

  const handleAddBlock = (
    type:
      | "heading"
      | "text"
      | "richtext"
      | "button"
      | "image"
      | "list"
      | "form"
      | "spacer",
  ) => {
    let newBlockId: string;

    // For form blocks, use the enhanced form structure
    if (type === "form") {
      newBlockId = Date.now().toString();
      const newBlock = {
        id: newBlockId,
        type: "form" as const,
        content: defaultFormBlock,
        order: page.blocks.length,
      };
      updatePage(page.id, {
        blocks: [...page.blocks, newBlock],
      });
    } else {
      const newBlock = addBlock(page.id, type);
      newBlockId = newBlock.id;
    }

    // Auto-expand the newly added block
    setActiveBlock(newBlockId);
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

  const handleSelectButtonTemplate = (template: ButtonTemplate) => {
    if (editingButtonBlock) {
      handleUpdateBlock(editingButtonBlock, {
        ...template.config,
      });
      setEditingButtonBlock(null);
      setShowButtonTemplates(false);
      toast.success("Button-Template angewendet!");
    }
  };

  const handleSelectBodyStyleTemplate = (template: BodyStyleTemplate) => {
    updatePage(page.id, {
      design: {
        ...page.design,
        ...template.config,
      },
    });
    setShowBodyStyleTemplates(false);
    toast.success("Body-Style angewendet!");
  };

  const addListItem = (blockId: string, currentItems: any[]) => {
    const newItems = [
      ...currentItems,
      { emoji: "📋", text: "Neuer Listenpunkt" },
    ];
    handleUpdateBlock(blockId, {
      ...page.blocks.find((b) => b.id === blockId)?.content,
      items: newItems,
    });
  };

  const removeListItem = (
    blockId: string,
    currentItems: any[],
    index: number,
  ) => {
    const newItems = currentItems.filter((_, i) => i !== index);
    handleUpdateBlock(blockId, {
      ...page.blocks.find((b) => b.id === blockId)?.content,
      items: newItems,
    });
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
                {/* Enhanced Header Editor */}
                <Card>
                  <CardHeader>
                    <CardTitle>🎨 Header-Bereich (Fullwidth)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Header Design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
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
                          {page.header.image && (
                            <div className="mt-2">
                              <img
                                src={page.header.image}
                                alt="Header Vorschau"
                                className="w-full h-20 object-cover rounded border"
                              />
                            </div>
                          )}
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
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updatePage(page.id, {
                                    header: {
                                      ...page.header,
                                      customHeight: 300,
                                    },
                                  })
                                }
                              >
                                Klein
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updatePage(page.id, {
                                    header: {
                                      ...page.header,
                                      customHeight: 400,
                                    },
                                  })
                                }
                              >
                                Normal
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updatePage(page.id, {
                                    header: {
                                      ...page.header,
                                      customHeight: 600,
                                    },
                                  })
                                }
                              >
                                Groß
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label>Text-Ausrichtung</Label>
                          <Select
                            value={page.header.alignment || "center"}
                            onValueChange={(value) =>
                              updatePage(page.id, {
                                header: { ...page.header, alignment: value },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="left">Links</SelectItem>
                              <SelectItem value="center">Mittig</SelectItem>
                              <SelectItem value="right">Rechts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label>Overlay-Typ</Label>
                          <Select
                            value={page.header.overlay || "black"}
                            onValueChange={(value) =>
                              updatePage(page.id, {
                                header: { ...page.header, overlay: value },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Kein Overlay</SelectItem>
                              <SelectItem value="black">Schwarz</SelectItem>
                              <SelectItem value="white">Weiß</SelectItem>
                              <SelectItem value="custom">
                                Benutzerdefiniert
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {page.header.overlay === "custom" && (
                          <div>
                            <Label>Overlay-Farbe</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={page.header.overlayColor || "#000000"}
                                onChange={(e) =>
                                  updatePage(page.id, {
                                    header: {
                                      ...page.header,
                                      overlayColor: e.target.value,
                                    },
                                  })
                                }
                                className="w-12 h-10 p-1 rounded"
                              />
                              <Input
                                value={page.header.overlayColor || "#000000"}
                                onChange={(e) =>
                                  updatePage(page.id, {
                                    header: {
                                      ...page.header,
                                      overlayColor: e.target.value,
                                    },
                                  })
                                }
                                placeholder="#000000"
                                className="flex-1"
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <Label>Overlay-Transparenz</Label>
                          <Input
                            type="range"
                            min="0"
                            max="80"
                            step="5"
                            value={page.header.overlayOpacity || 40}
                            onChange={(e) =>
                              updatePage(page.id, {
                                header: {
                                  ...page.header,
                                  overlayOpacity: parseInt(e.target.value),
                                },
                              })
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>0%</span>
                            <span className="font-medium text-blue-600">
                              {page.header.overlayOpacity || 40}%
                            </span>
                            <span>80%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Header Content */}
                    <div className="space-y-4 border-t pt-4">
                      <div>
                        <Label>Subheadline (über dem Titel)</Label>
                        <Input
                          value={page.header.subheadline || ""}
                          onChange={(e) =>
                            updatePage(page.id, {
                              header: {
                                ...page.header,
                                subheadline: e.target.value,
                              },
                            })
                          }
                          placeholder="z.B. Wir suchen Sie!"
                        />
                      </div>

                      <div>
                        <Label>Haupttitel / Jobname</Label>
                        <Input
                          value={page.header.title}
                          onChange={(e) =>
                            updatePage(page.id, {
                              header: { ...page.header, title: e.target.value },
                            })
                          }
                          placeholder="z.B. Verkäufer (m/w/d)"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>📍 Standort</Label>
                          <Input
                            value={page.header.location || ""}
                            onChange={(e) =>
                              updatePage(page.id, {
                                header: {
                                  ...page.header,
                                  location: e.target.value,
                                },
                              })
                            }
                            placeholder="München"
                          />
                        </div>

                        <div>
                          <Label>📅 Ab wann</Label>
                          <Input
                            value={page.header.startDate || ""}
                            onChange={(e) =>
                              updatePage(page.id, {
                                header: {
                                  ...page.header,
                                  startDate: e.target.value,
                                },
                              })
                            }
                            placeholder="ab sofort"
                          />
                        </div>

                        <div>
                          <Label>💼 Beschäftigungsart</Label>
                          <Select
                            value={page.header.employmentType || "vollzeit"}
                            onValueChange={(value) =>
                              updatePage(page.id, {
                                header: {
                                  ...page.header,
                                  employmentType: value,
                                },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vollzeit">Vollzeit</SelectItem>
                              <SelectItem value="teilzeit">Teilzeit</SelectItem>
                              <SelectItem value="minijob">Minijob</SelectItem>
                              <SelectItem value="praktikum">
                                Praktikum
                              </SelectItem>
                              <SelectItem value="ausbildung">
                                Ausbildung
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
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
                                    {block.type === "richtext" &&
                                      "✏️ Rich Text"}
                                    {block.type === "button" && "🔘 Button"}
                                    {block.type === "image" && "🖼️ Bild"}
                                    {block.type === "list" && "📋 Aufzählung"}
                                    {block.type === "form" && "📧 Formular"}
                                    {block.type === "spacer" && "📏 Abstand"}
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
                                  {/* Enhanced Button Editor with Templates */}
                                  {block.type === "button" && (
                                    <div className="space-y-4">
                                      <div className="flex items-center justify-between">
                                        <Label className="text-base font-medium">
                                          Button konfigurieren
                                        </Label>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            setEditingButtonBlock(block.id);
                                            setShowButtonTemplates(true);
                                          }}
                                          className="flex items-center gap-2"
                                        >
                                          <Sparkles className="w-4 h-4" />
                                          Template wählen
                                        </Button>
                                      </div>

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
                                        <div className="grid grid-cols-3 gap-2">
                                          <div>
                                            <Label>Style</Label>
                                            <Select
                                              value={
                                                block.content.variant ||
                                                "primary"
                                              }
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
                                                  Primär
                                                </SelectItem>
                                                <SelectItem value="secondary">
                                                  Sekundär
                                                </SelectItem>
                                                <SelectItem value="success">
                                                  Erfolg
                                                </SelectItem>
                                                <SelectItem value="danger">
                                                  Gefahr
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div>
                                            <Label>Größe</Label>
                                            <Select
                                              value={
                                                block.content.size || "normal"
                                              }
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
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div>
                                            <Label>Ausrichtung</Label>
                                            <Select
                                              value={
                                                block.content.alignment ||
                                                "center"
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
                                      </div>
                                    </div>
                                  )}

                                  {/* Enhanced Form Editor */}
                                  {block.type === "form" && (
                                    <FormBlockEditor
                                      content={
                                        block.content as EnhancedFormBlock
                                      }
                                      onUpdate={(content) =>
                                        handleUpdateBlock(block.id, content)
                                      }
                                    />
                                  )}

                                  {/* List Editor */}
                                  {block.type === "list" && (
                                    <div className="space-y-3">
                                      <div>
                                        <Label>Listentitel (optional)</Label>
                                        <Input
                                          value={block.content.title || ""}
                                          onChange={(e) =>
                                            handleUpdateBlock(block.id, {
                                              ...block.content,
                                              title: e.target.value,
                                            })
                                          }
                                          placeholder="z.B. Ihre Aufgaben"
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label>Listenpunkte</Label>
                                        {(block.content.items || []).map(
                                          (item: any, index: number) => (
                                            <div
                                              key={index}
                                              className="flex gap-2 items-start"
                                            >
                                              <Input
                                                value={item.emoji || ""}
                                                onChange={(e) => {
                                                  const newItems = [
                                                    ...block.content.items,
                                                  ];
                                                  newItems[index] = {
                                                    ...item,
                                                    emoji: e.target.value,
                                                  };
                                                  handleUpdateBlock(block.id, {
                                                    ...block.content,
                                                    items: newItems,
                                                  });
                                                }}
                                                placeholder="📋"
                                                className="w-16"
                                              />
                                              <Textarea
                                                value={item.text || ""}
                                                onChange={(e) => {
                                                  const newItems = [
                                                    ...block.content.items,
                                                  ];
                                                  newItems[index] = {
                                                    ...item,
                                                    text: e.target.value,
                                                  };
                                                  handleUpdateBlock(block.id, {
                                                    ...block.content,
                                                    items: newItems,
                                                  });
                                                }}
                                                placeholder="Listenpunkt..."
                                                rows={2}
                                                className="flex-1"
                                              />
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                  removeListItem(
                                                    block.id,
                                                    block.content.items,
                                                    index,
                                                  )
                                                }
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          ),
                                        )}
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            addListItem(
                                              block.id,
                                              block.content.items || [],
                                            )
                                          }
                                        >
                                          <Plus className="h-4 w-4 mr-2" />
                                          Punkt hinzufügen
                                        </Button>
                                      </div>
                                    </div>
                                  )}

                                  {/* Text Editor */}
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
                                          placeholder="Ihr Text hier..."
                                          rows={4}
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <Label>Ausrichtung</Label>
                                          <Select
                                            value={
                                              block.content.alignment || "left"
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
                                        <div>
                                          <Label>Schriftgröße</Label>
                                          <Select
                                            value={
                                              block.content.fontSize || "normal"
                                            }
                                            onValueChange={(value) =>
                                              handleUpdateBlock(block.id, {
                                                ...block.content,
                                                fontSize: value,
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
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Rich Text Editor */}
                                  {block.type === "richtext" && (
                                    <div className="space-y-3">
                                      <div>
                                        <Label>Rich Text Editor</Label>
                                        <div className="border rounded-md p-2 space-x-2 bg-gray-50">
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                              const newHtml =
                                                (block.content.html || "") +
                                                "<strong>Fetter Text</strong>";
                                              handleUpdateBlock(block.id, {
                                                ...block.content,
                                                html: newHtml,
                                              });
                                            }}
                                          >
                                            Fett
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                              const newHtml =
                                                (block.content.html || "") +
                                                "<em>Kursiver Text</em>";
                                              handleUpdateBlock(block.id, {
                                                ...block.content,
                                                html: newHtml,
                                              });
                                            }}
                                          >
                                            Kursiv
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                              const newHtml =
                                                (block.content.html || "") +
                                                "<ul><li>Listenpunkt</li></ul>";
                                              handleUpdateBlock(block.id, {
                                                ...block.content,
                                                html: newHtml,
                                              });
                                            }}
                                          >
                                            Liste
                                          </Button>
                                        </div>
                                        <Textarea
                                          value={block.content.html || ""}
                                          onChange={(e) =>
                                            handleUpdateBlock(block.id, {
                                              ...block.content,
                                              html: e.target.value,
                                            })
                                          }
                                          placeholder="<p>Formatierter Text mit HTML...</p>"
                                          rows={6}
                                          className="border-0 font-mono text-sm"
                                        />
                                      </div>
                                      <div>
                                        <Label>Vorschau</Label>
                                        <div
                                          className="border rounded-md p-3 min-h-[60px] bg-gray-50"
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              block.content.html ||
                                              '<p class="text-gray-400">Vorschau...</p>',
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}

                                  {/* Image Editor */}
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
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <Label>Größe</Label>
                                          <Select
                                            value={
                                              block.content.size || "normal"
                                            }
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
                                        <div>
                                          <Label>Ausrichtung</Label>
                                          <Select
                                            value={
                                              block.content.alignment ||
                                              "center"
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
                                    </div>
                                  )}

                                  {/* Heading Editor */}
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
                                          placeholder="Ihre Überschrift"
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <Label>Größe</Label>
                                          <Select
                                            value={
                                              block.content.level?.toString() ||
                                              "2"
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
                                                H1 (Sehr groß)
                                              </SelectItem>
                                              <SelectItem value="2">
                                                H2 (Groß)
                                              </SelectItem>
                                              <SelectItem value="3">
                                                H3 (Mittel)
                                              </SelectItem>
                                              <SelectItem value="4">
                                                H4 (Klein)
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <Label>Ausrichtung</Label>
                                          <Select
                                            value={
                                              block.content.alignment || "left"
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
                                    </div>
                                  )}

                                  {/* Spacer Editor */}
                                  {block.type === "spacer" && (
                                    <div className="space-y-2">
                                      <Label>Höhe (in Pixel)</Label>
                                      <Input
                                        type="number"
                                        value={block.content.height || 40}
                                        onChange={(e) =>
                                          handleUpdateBlock(block.id, {
                                            ...block.content,
                                            height:
                                              parseInt(e.target.value) || 40,
                                          })
                                        }
                                        min="10"
                                        max="200"
                                      />
                                      <div className="text-xs text-gray-500">
                                        Aktuell: {block.content.height || 40}px
                                      </div>
                                      <div
                                        className="border-2 border-dashed border-gray-300 rounded"
                                        style={{
                                          height: `${block.content.height || 40}px`,
                                        }}
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
                {/* Add Block */}
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
                      onClick={() => handleAddBlock("richtext")}
                    >
                      ✏️ Rich Text
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleAddBlock("list")}
                    >
                      📋 Aufzählung
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
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleAddBlock("form")}
                    >
                      📧 Formular
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleAddBlock("spacer")}
                    >
                      📏 Abstand
                    </Button>
                  </CardContent>
                </Card>

                {/* Page Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Seiten-Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span
                        className={`text-sm font-medium ${
                          page.published ? "text-green-600" : "text-orange-600"
                        }`}
                      >
                        {page.published ? "✅ Veröffentlicht" : "⏳ Entwurf"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Blöcke:</span>
                      <span>{page.blocks.length}</span>
                    </div>
                    <div className="text-xs text-gray-500 break-all">
                      URL: /jobs/{page.slug}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Body Style Tab with Templates */}
          <TabsContent value="bodystyle">
            <div className="space-y-6">
              {/* Style Template Selector */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>🎨 Body-Style Templates</CardTitle>
                    <QuickBodyStyleSelector
                      onSelectTemplate={handleSelectBodyStyleTemplate}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Wählen Sie ein vorgefertigtes Design-Template oder passen
                    Sie die Einstellungen manuell an.
                  </p>
                </CardContent>
              </Card>

              {/* Manual Style Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Farben</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
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
                      <div>
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
                      <div>
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
                      <div>
                        <Label>Textfarbe</Label>
                        <Input
                          type="color"
                          value={page.design?.textColor || "#000000"}
                          onChange={(e) =>
                            updatePage(page.id, {
                              design: {
                                ...page.design,
                                textColor: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Layout</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Schriftart</Label>
                      <Select
                        value={page.design?.fontFamily || "montserrat"}
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
                          <SelectItem value="montserrat">Montserrat</SelectItem>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="open-sans">Open Sans</SelectItem>
                          <SelectItem value="lato">Lato</SelectItem>
                          <SelectItem value="poppins">Poppins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
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

                    <div>
                      <Label>Body Padding</Label>
                      <Input
                        type="range"
                        min="8"
                        max="64"
                        step="4"
                        value={page.design?.bodyPadding || 16}
                        onChange={(e) =>
                          updatePage(page.id, {
                            design: {
                              ...page.design,
                              bodyPadding: parseInt(e.target.value),
                            },
                          })
                        }
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {page.design?.bodyPadding || 16}px
                      </div>
                    </div>

                    <div>
                      <Label>Zeilenhöhe</Label>
                      <Select
                        value={page.design?.lineHeight || "normal"}
                        onValueChange={(value) =>
                          updatePage(page.id, {
                            design: { ...page.design, lineHeight: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tight">Kompakt</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="relaxed">Entspannt</SelectItem>
                          <SelectItem value="loose">Locker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Vorschau</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="border rounded-lg p-6 space-y-4"
                    style={{
                      backgroundColor:
                        page.design?.backgroundColor || "#ffffff",
                      color: page.design?.textColor || "#000000",
                      fontFamily: page.design?.fontFamily || "montserrat",
                      padding: `${page.design?.bodyPadding || 16}px`,
                    }}
                  >
                    <h2
                      className="text-2xl font-bold"
                      style={{ color: page.design?.primaryColor || "#3b82f6" }}
                    >
                      Beispiel Überschrift
                    </h2>
                    <p
                      style={{
                        color: page.design?.secondaryColor || "#6b7280",
                        lineHeight: page.design?.lineHeight || "normal",
                      }}
                    >
                      Dies ist ein Beispieltext, um zu zeigen, wie Ihr Design
                      aussehen wird.
                    </p>
                    <button
                      className="px-4 py-2 rounded text-white font-medium"
                      style={{
                        backgroundColor: page.design?.primaryColor || "#3b82f6",
                      }}
                    >
                      Beispiel Button
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab with Footer Styling */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Einstellungen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Seitentitel</Label>
                    <Input
                      value={page.title}
                      onChange={(e) =>
                        updatePage(page.id, { title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>URL-Slug</Label>
                    <Input
                      value={page.slug}
                      onChange={(e) =>
                        updatePage(page.id, { slug: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>SEO Titel</Label>
                    <Input
                      value={page.seoTitle || ""}
                      onChange={(e) =>
                        updatePage(page.id, { seoTitle: e.target.value })
                      }
                      placeholder={page.title}
                    />
                  </div>
                  <div>
                    <Label>SEO Beschreibung</Label>
                    <Textarea
                      value={page.seoDescription || ""}
                      onChange={(e) =>
                        updatePage(page.id, { seoDescription: e.target.value })
                      }
                      placeholder="Kurze Beschreibung für Suchmaschinen..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Footer Einstellungen</CardTitle>
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

                  <div>
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

                  {/* Footer Styling moved here */}
                  <div className="border-t pt-4 space-y-4">
                    <h4 className="font-medium">Footer Design</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Footer Hintergrundfarbe</Label>
                        <Input
                          type="color"
                          value={
                            page.design?.footerBackgroundColor || "#f8fafc"
                          }
                          onChange={(e) =>
                            updatePage(page.id, {
                              design: {
                                ...page.design,
                                footerBackgroundColor: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Footer Textfarbe</Label>
                        <Input
                          type="color"
                          value={page.design?.footerTextColor || "#64748b"}
                          onChange={(e) =>
                            updatePage(page.id, {
                              design: {
                                ...page.design,
                                footerTextColor: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Footer Padding</Label>
                      <Input
                        type="range"
                        min="8"
                        max="64"
                        step="4"
                        value={page.design?.footerPadding || 24}
                        onChange={(e) =>
                          updatePage(page.id, {
                            design: {
                              ...page.design,
                              footerPadding: parseInt(e.target.value),
                            },
                          })
                        }
                      />
                      <div className="text-xs text-gray-500">
                        {page.design?.footerPadding || 24}px
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={page.design?.footerBorder || false}
                        onCheckedChange={(checked) =>
                          updatePage(page.id, {
                            design: {
                              ...page.design,
                              footerBorder: checked,
                            },
                          })
                        }
                      />
                      <Label>Footer Rahmen anzeigen</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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

      {/* Button Template Modal */}
      <ButtonTemplateSelector
        isOpen={showButtonTemplates}
        onClose={() => {
          setShowButtonTemplates(false);
          setEditingButtonBlock(null);
        }}
        onSelect={handleSelectButtonTemplate}
      />

      {/* Body Style Template Modal */}
      <BodyStyleTemplateSelector
        isOpen={showBodyStyleTemplates}
        onClose={() => setShowBodyStyleTemplates(false)}
        onSelect={handleSelectBodyStyleTemplate}
      />
    </div>
  );
}
