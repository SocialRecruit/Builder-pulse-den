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
  ChevronUp,
  ChevronDown,
  Copy,
  Wand2,
  Layers,
  PaintBucket,
} from "lucide-react";
import { useLandingPages } from "@/hooks/useLandingPages";
import { MediaGallery } from "@/components/ui/MediaGallery";
import { toast } from "sonner";

export default function EnhancedPageBuilderStable() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { pages, updatePage, addBlock, updateBlock, deleteBlock } =
    useLandingPages();

  const page = pages.find((p) => p.id === pageId);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [showMediaGallery, setShowMediaGallery] = useState(false);

  const handleAddBlock = (type: string) => {
    const newBlock = addBlock(page?.id || "", type);
    setActiveBlock(newBlock.id);
    toast.success("Block hinzugefügt!");
  };

  const handleUpdateBlock = (blockId: string, content: any) => {
    updateBlock(blockId, content);
  };

  const handleDeleteBlock = (blockId: string) => {
    deleteBlock(blockId);
    setActiveBlock(null);
    toast.success("Block gelöscht!");
  };

  const addListItem = (blockId: string, currentItems: any[]) => {
    const newItems = [
      ...currentItems,
      { emoji: "📋", text: "Neuer Listenpunkt" },
    ];
    handleUpdateBlock(blockId, {
      ...page?.blocks.find((b) => b.id === blockId)?.content,
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
      ...page?.blocks.find((b) => b.id === blockId)?.content,
      items: newItems,
    });
  };

  // Block Management Functions
  const moveBlockUp = (blockId: string) => {
    const blockIndex = page?.blocks.findIndex((b) => b.id === blockId) || -1;
    if (blockIndex > 0 && page) {
      const newBlocks = [...page.blocks];
      const temp = newBlocks[blockIndex].order;
      newBlocks[blockIndex].order = newBlocks[blockIndex - 1].order;
      newBlocks[blockIndex - 1].order = temp;
      updatePage(page.id, { blocks: newBlocks });
      toast.success("Block nach oben verschoben");
    }
  };

  const moveBlockDown = (blockId: string) => {
    const blockIndex = page?.blocks.findIndex((b) => b.id === blockId) || -1;
    if (blockIndex < (page?.blocks.length || 0) - 1 && page) {
      const newBlocks = [...page.blocks];
      const temp = newBlocks[blockIndex].order;
      newBlocks[blockIndex].order = newBlocks[blockIndex + 1].order;
      newBlocks[blockIndex + 1].order = temp;
      updatePage(page.id, { blocks: newBlocks });
      toast.success("Block nach unten verschoben");
    }
  };

  const copyBlock = (blockId: string) => {
    const blockToCopy = page?.blocks.find((b) => b.id === blockId);
    if (blockToCopy && page) {
      const newBlock = {
        ...blockToCopy,
        id: Date.now().toString(),
        order: Math.max(...page.blocks.map((b) => b.order)) + 1,
      };
      const newBlocks = [...page.blocks, newBlock];
      updatePage(page.id, { blocks: newBlocks });
      setActiveBlock(newBlock.id);
      toast.success("Block kopiert!");
    }
  };

  // Simple Block Styling without external components
  const handleUpdateBlockStyle = (
    blockId: string,
    styleProperty: string,
    value: any,
  ) => {
    const block = page?.blocks.find((b) => b.id === blockId);
    if (block) {
      const currentStyling = block.content.styling || {};
      handleUpdateBlock(blockId, {
        ...block.content,
        styling: {
          ...currentStyling,
          [styleProperty]: value,
        },
      });
    }
  };

  if (!pageId || !page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Seite nicht gefunden</h2>
            <p className="text-gray-600 mb-4">
              Die angeforderte Landing Page konnte nicht gefunden werden.
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Zum Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
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
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  {page.title}
                  <span className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded">
                    ENHANCED
                  </span>
                </h1>
                <p className="text-sm text-gray-500">
                  Enhanced Page Builder -{" "}
                  {page.published ? "Veröffentlicht" : "Entwurf"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`/jobs/${page.slug}`, "_blank")}
              >
                <Eye className="w-4 h-4 mr-2" />
                Vorschau
              </Button>
              <Button
                size="sm"
                onClick={() => toast.success("Änderungen gespeichert!")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Speichern
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">📝 Inhalt</TabsTrigger>
            <TabsTrigger value="header">🎨 Header</TabsTrigger>
            <TabsTrigger value="design">⚙️ Design</TabsTrigger>
          </TabsList>

          {/* Enhanced Content Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Content Blocks */}
              <div className="lg:col-span-2">
                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="w-5 h-5" />
                      Enhanced Inhalts-Blöcke
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {page.blocks.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Plus className="w-10 h-10 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Keine Blöcke vorhanden
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Fügen Sie Ihren ersten Enhanced-Inhaltsblock hinzu
                        </p>
                        <Button
                          onClick={() => handleAddBlock("text")}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
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
                              className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all"
                            >
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-sm flex items-center gap-2">
                                    {block.type === "heading" &&
                                      "📝 Überschrift"}
                                    {block.type === "text" && "📄 Text"}
                                    {block.type === "button" && "🔘 Button"}
                                    {block.type === "image" && "🖼️ Bild"}
                                    {block.type === "list" && "📋 Aufzählung"}
                                    {block.type === "form" && "📧 Formular"}
                                    {block.type === "spacer" && "📏 Abstand"}
                                    {` #${index + 1}`}
                                    {block.content?.styling && (
                                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                        Styled
                                      </span>
                                    )}
                                  </CardTitle>
                                  <div className="flex gap-1">
                                    {/* Style Quick Options */}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      title="Block-Design"
                                      className="h-8 w-8 p-0"
                                      onClick={() => {
                                        const currentBg =
                                          block.content?.styling
                                            ?.backgroundColor || "#ffffff";
                                        const newBg =
                                          currentBg === "#ffffff"
                                            ? "#f3f4f6"
                                            : "#ffffff";
                                        handleUpdateBlockStyle(
                                          block.id,
                                          "backgroundColor",
                                          newBg,
                                        );
                                        toast.success("Hintergrund geändert!");
                                      }}
                                    >
                                      <PaintBucket className="h-4 w-4" />
                                    </Button>

                                    {/* Reorder Buttons */}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => moveBlockUp(block.id)}
                                      disabled={index === 0}
                                      title="Nach oben"
                                      className="h-8 w-8 p-0"
                                    >
                                      <ChevronUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => moveBlockDown(block.id)}
                                      disabled={
                                        index === page.blocks.length - 1
                                      }
                                      title="Nach unten"
                                      className="h-8 w-8 p-0"
                                    >
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>

                                    {/* Copy Button */}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => copyBlock(block.id)}
                                      title="Block kopieren"
                                      className="h-8 w-8 p-0"
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>

                                    {/* Expand/Collapse */}
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
                                      className="h-8 w-8 p-0"
                                    >
                                      {activeBlock === block.id ? "−" : "+"}
                                    </Button>

                                    {/* Delete Button */}
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDeleteBlock(block.id)
                                      }
                                      title="Block löschen"
                                      className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>

                              {activeBlock === block.id && (
                                <CardContent className="pt-0">
                                  {/* Simple Block Styling Options */}
                                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                    <Label className="text-sm font-medium mb-2 block">
                                      🎨 Block-Design
                                    </Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                      <div>
                                        <Label className="text-xs">
                                          Hintergrund
                                        </Label>
                                        <Input
                                          type="color"
                                          value={
                                            block.content?.styling
                                              ?.backgroundColor || "#ffffff"
                                          }
                                          onChange={(e) =>
                                            handleUpdateBlockStyle(
                                              block.id,
                                              "backgroundColor",
                                              e.target.value,
                                            )
                                          }
                                          className="h-8"
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-xs">
                                          Schatten
                                        </Label>
                                        <Select
                                          value={
                                            block.content?.styling?.shadow ||
                                            "none"
                                          }
                                          onValueChange={(value) =>
                                            handleUpdateBlockStyle(
                                              block.id,
                                              "shadow",
                                              value,
                                            )
                                          }
                                        >
                                          <SelectTrigger className="h-8">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="none">
                                              Kein
                                            </SelectItem>
                                            <SelectItem value="sm">
                                              Klein
                                            </SelectItem>
                                            <SelectItem value="md">
                                              Mittel
                                            </SelectItem>
                                            <SelectItem value="lg">
                                              Groß
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label className="text-xs">
                                          Padding
                                        </Label>
                                        <Select
                                          value={
                                            block.content?.styling?.padding ||
                                            "md"
                                          }
                                          onValueChange={(value) =>
                                            handleUpdateBlockStyle(
                                              block.id,
                                              "padding",
                                              value,
                                            )
                                          }
                                        >
                                          <SelectTrigger className="h-8">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="none">
                                              Kein
                                            </SelectItem>
                                            <SelectItem value="sm">
                                              Klein
                                            </SelectItem>
                                            <SelectItem value="md">
                                              Mittel
                                            </SelectItem>
                                            <SelectItem value="lg">
                                              Groß
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label className="text-xs">
                                          Rundung
                                        </Label>
                                        <Select
                                          value={
                                            block.content?.styling
                                              ?.borderRadius || "md"
                                          }
                                          onValueChange={(value) =>
                                            handleUpdateBlockStyle(
                                              block.id,
                                              "borderRadius",
                                              value,
                                            )
                                          }
                                        >
                                          <SelectTrigger className="h-8">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="none">
                                              Keine
                                            </SelectItem>
                                            <SelectItem value="sm">
                                              Klein
                                            </SelectItem>
                                            <SelectItem value="md">
                                              Mittel
                                            </SelectItem>
                                            <SelectItem value="lg">
                                              Groß
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Enhanced Button Editor */}
                                  {block.type === "button" && (
                                    <div className="space-y-4">
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
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <Label>Emoji</Label>
                                            <Input
                                              value={block.content.emoji || ""}
                                              onChange={(e) =>
                                                handleUpdateBlock(block.id, {
                                                  ...block.content,
                                                  emoji: e.target.value,
                                                })
                                              }
                                              placeholder="🚀"
                                            />
                                          </div>
                                          <div>
                                            <Label>Effekt</Label>
                                            <Select
                                              value={
                                                block.content.effect || "none"
                                              }
                                              onValueChange={(value) =>
                                                handleUpdateBlock(block.id, {
                                                  ...block.content,
                                                  effect: value,
                                                })
                                              }
                                            >
                                              <SelectTrigger>
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="none">
                                                  Kein Effekt
                                                </SelectItem>
                                                <SelectItem value="scale">
                                                  Vergrößern
                                                </SelectItem>
                                                <SelectItem value="bounce">
                                                  Hüpfen
                                                </SelectItem>
                                                <SelectItem value="pulse">
                                                  Pulsieren
                                                </SelectItem>
                                                <SelectItem value="glow">
                                                  Glühen
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>

                                        {/* Button Preview */}
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                          <Label className="text-sm mb-2 block">
                                            Vorschau:
                                          </Label>
                                          <Button
                                            className="pointer-events-none hover:scale-105 transition-transform"
                                            style={{
                                              backgroundColor:
                                                block.content?.styling
                                                  ?.backgroundColor ||
                                                undefined,
                                            }}
                                          >
                                            {block.content.emoji && (
                                              <span className="mr-2">
                                                {block.content.emoji}
                                              </span>
                                            )}
                                            {block.content.text ||
                                              "Button-Text"}
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Enhanced Text Editor */}
                                  {block.type === "text" && (
                                    <div className="space-y-3">
                                      <div>
                                        <Label>Text-Inhalt</Label>
                                        <Textarea
                                          value={block.content.text || ""}
                                          onChange={(e) =>
                                            handleUpdateBlock(block.id, {
                                              ...block.content,
                                              text: e.target.value,
                                            })
                                          }
                                          placeholder="Geben Sie Ihren Text ein..."
                                          rows={4}
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
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
                                              <SelectItem value="xl">
                                                Sehr groß
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

                                  {/* Enhanced Heading Editor */}
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
                                          placeholder="Überschrift eingeben..."
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
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
                                          <Label>Farbe</Label>
                                          <Input
                                            type="color"
                                            value={
                                              block.content.color || "#000000"
                                            }
                                            onChange={(e) =>
                                              handleUpdateBlock(block.id, {
                                                ...block.content,
                                                color: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Enhanced List Editor */}
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
                                          (item: any, itemIndex: number) => (
                                            <div
                                              key={itemIndex}
                                              className="flex gap-2 items-start"
                                            >
                                              <Input
                                                value={item.emoji || ""}
                                                onChange={(e) => {
                                                  const newItems = [
                                                    ...block.content.items,
                                                  ];
                                                  newItems[itemIndex] = {
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
                                                  newItems[itemIndex] = {
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
                                                    itemIndex,
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
                                </CardContent>
                              )}
                            </Card>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Enhanced Blöcke hinzufügen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-purple-50"
                      onClick={() => handleAddBlock("heading")}
                    >
                      📝 Überschrift
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-purple-50"
                      onClick={() => handleAddBlock("text")}
                    >
                      📄 Text
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-purple-50"
                      onClick={() => handleAddBlock("list")}
                    >
                      📋 Aufzählung
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-purple-50"
                      onClick={() => handleAddBlock("button")}
                    >
                      🔘 Enhanced Button
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-purple-50"
                      onClick={() => handleAddBlock("image")}
                    >
                      🖼️ Bild
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-purple-50"
                      onClick={() => handleAddBlock("spacer")}
                    >
                      📏 Abstand
                    </Button>
                  </CardContent>
                </Card>

                {/* Status Card */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Status & Info
                    </CardTitle>
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
                    <div className="pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={page.published}
                          onCheckedChange={(checked) =>
                            updatePage(page.id, { published: checked })
                          }
                        />
                        <Label className="text-sm">Seite veröffentlichen</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Header Tab */}
          <TabsContent value="header">
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Enhanced Header Design
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Header Image */}
                <div>
                  <Label>Header-Hintergrundbild</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowMediaGallery(true)}
                      className="flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Aus Galerie wählen
                    </Button>
                    {page.header.image && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          updatePage(page.id, {
                            header: { ...page.header, image: undefined },
                          })
                        }
                      >
                        Entfernen
                      </Button>
                    )}
                  </div>
                  {page.header.image && (
                    <div className="mt-2">
                      <img
                        src={page.header.image}
                        alt="Header"
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                {/* Header Dimensions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Header-Höhe</Label>
                    <Input
                      type="range"
                      min="200"
                      max="1000"
                      step="50"
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
                      <span>200px</span>
                      <span className="font-medium text-purple-600">
                        {page.header.customHeight || 400}px
                      </span>
                      <span>1000px</span>
                    </div>
                  </div>

                  <div>
                    <Label>Titel-Schriftgröße</Label>
                    <Input
                      type="range"
                      min="24"
                      max="96"
                      step="4"
                      value={page.header.titleFontSize || 48}
                      onChange={(e) =>
                        updatePage(page.id, {
                          header: {
                            ...page.header,
                            titleFontSize: parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>24px</span>
                      <span className="font-medium text-purple-600">
                        {page.header.titleFontSize || 48}px
                      </span>
                      <span>96px</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Overlay Options */}
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
                          className="w-16 h-10 p-1 rounded"
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
                      <span className="font-medium text-purple-600">
                        {page.header.overlayOpacity || 40}%
                      </span>
                      <span>80%</span>
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
                          <SelectItem value="praktikum">Praktikum</SelectItem>
                          <SelectItem value="werkstudent">
                            Werkstudent
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Beschreibung</Label>
                    <Textarea
                      value={page.header.text}
                      onChange={(e) =>
                        updatePage(page.id, {
                          header: { ...page.header, text: e.target.value },
                        })
                      }
                      placeholder="Kurze, ansprechende Beschreibung des Jobs..."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Design Tab */}
          <TabsContent value="design">
            <div className="space-y-6">
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
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Layout</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Container-Breite</Label>
                      <Select
                        value={page.design?.containerWidth || "normal"}
                        onValueChange={(value) =>
                          updatePage(page.id, {
                            design: {
                              ...page.design,
                              containerWidth: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="narrow">Schmal</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="wide">Breit</SelectItem>
                          <SelectItem value="full">Vollbreite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Innenabstand</Label>
                      <Input
                        type="range"
                        min="8"
                        max="64"
                        step="8"
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
                      <div className="text-xs text-gray-500 text-center">
                        {page.design?.bodyPadding || 16}px
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
    </div>
  );
}
