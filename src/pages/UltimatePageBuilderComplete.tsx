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
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  Palette,
  Settings,
  ImageIcon,
  ChevronUp,
  ChevronDown,
  Copy,
  Sparkles,
  Monitor,
  Smartphone,
  Layout,
  Type,
  Camera,
  Settings2,
  Template,
  Wand2,
} from "lucide-react";
import { useLandingPages } from "@/hooks/useLandingPages";
import { MediaGallery } from "@/components/ui/MediaGallery";
import { EmojiPicker } from "@/components/ui/EmojiPicker";
import {
  TemplateSelector,
  QuickTemplateSelector,
} from "@/components/ui/TemplateSelector";
import { ButtonTemplateSelector } from "@/components/ui/ButtonTemplateSelector";
import { BlockStyleOptions } from "@/components/ui/BlockStyleOptions";
import { BodyStyleTemplates } from "@/components/ui/BodyStyleTemplates";
import { demoTemplates, DemoTemplate } from "@/data/demoTemplates";
import { toast } from "sonner";

export default function UltimatePageBuilderComplete() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { pages, updatePage, addBlock, updateBlock, deleteBlock } =
    useLandingPages();

  const page = pages.find((p) => p.id === pageId);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentListBlock, setCurrentListBlock] = useState<string | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showButtonTemplates, setShowButtonTemplates] = useState(false);
  const [currentButtonBlock, setCurrentButtonBlock] = useState<string | null>(
    null,
  );
  const [showBlockStyleOptions, setShowBlockStyleOptions] = useState(false);
  const [currentStyleBlock, setCurrentStyleBlock] = useState<string | null>(
    null,
  );
  const [showBodyStyleTemplates, setShowBodyStyleTemplates] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  // Auto-apply demo template design as default
  useEffect(() => {
    if (page && !page.design?.primaryColor) {
      const demoDesign = {
        primaryColor: "#2563eb",
        secondaryColor: "#64748b",
        containerWidth: "normal",
        bodyPadding: 24,
        borderRadius: "8px",
        shadows: true,
      };
      updatePage(page.id, { design: { ...page.design, ...demoDesign } });
    }
  }, [page]);

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Seite nicht gefunden
          </h1>
          <Button className="mt-4" onClick={() => navigate("/")}>
            Zurück zum Dashboard
          </Button>
        </div>
      </div>
    );
  }

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

  const updateListItemEmoji = (
    blockId: string,
    itemIndex: number,
    emoji: string,
  ) => {
    const block = page?.blocks.find((b) => b.id === blockId);
    if (block && block.content.items) {
      const newItems = [...block.content.items];
      newItems[itemIndex] = { ...newItems[itemIndex], emoji };
      handleUpdateBlock(blockId, {
        ...block.content,
        items: newItems,
      });
    }
  };

  // Block Reorder Functions
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
      const newBlock = addBlock(page.id, blockToCopy.type);
      handleUpdateBlock(newBlock.id, blockToCopy.content);
      toast.success("Block kopiert!");
    }
  };

  const handleTemplateSelect = (template: DemoTemplate) => {
    if (page) {
      updatePage(page.id, {
        title: template.template.title,
        header: template.template.header,
        blocks: template.template.blocks,
        design: template.template.design,
        footer: template.template.footer,
        seoTitle: template.template.seoTitle,
        seoDescription: template.template.seoDescription,
      });
      toast.success(`Template "${template.name}" wurde angewendet!`);
    }
  };

  const handleButtonTemplate = (buttonConfig: any) => {
    if (currentButtonBlock) {
      handleUpdateBlock(currentButtonBlock, buttonConfig);
      setCurrentButtonBlock(null);
      setShowButtonTemplates(false);
      toast.success("Button-Template angewendet!");
    }
  };

  const handleBlockStyle = (blockId: string, styles: any) => {
    const block = page?.blocks.find((b) => b.id === blockId);
    if (block) {
      handleUpdateBlock(blockId, {
        ...block.content,
        styles: { ...block.content.styles, ...styles },
      });
      toast.success("Block-Style angewendet!");
    }
  };

  const handleBodyStyleTemplate = (styleConfig: any) => {
    updatePage(page.id, {
      design: { ...page.design, ...styleConfig },
    });
    setShowBodyStyleTemplates(false);
    toast.success("Design-Template angewendet!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{page.title}</h1>
              <p className="text-sm text-gray-500">Landing Page Editor</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("desktop")}
                className="h-8 px-3"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("mobile")}
                className="h-8 px-3"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTemplateSelector(true)}
            >
              <Template className="w-4 h-4 mr-2" />
              Templates
            </Button>

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
              onClick={() => toast.success("Automatisch gespeichert!")}
            >
              <Save className="w-4 h-4 mr-2" />
              Speichern
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="header" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Header
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Design
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              Einstellungen
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Main Content Area */}
              <div className="xl:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Layout className="w-5 h-5" />
                        Inhalts-Blöcke
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {page.blocks.length} Blöcke
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowTemplateSelector(true)}
                        >
                          <Wand2 className="w-4 h-4 mr-2" />
                          Template laden
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {page.blocks.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Plus className="w-10 h-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Keine Blöcke vorhanden
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          Beginnen Sie mit einem Template oder fügen Sie Ihren
                          ersten Inhaltsblock hinzu
                        </p>
                        <div className="flex items-center justify-center gap-3">
                          <Button
                            onClick={() => setShowTemplateSelector(true)}
                            className="flex items-center gap-2"
                          >
                            <Template className="w-4 h-4" />
                            Template verwenden
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleAddBlock("text")}
                          >
                            Ersten Block hinzufügen
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {page.blocks
                          .sort((a, b) => a.order - b.order)
                          .map((block, index) => (
                            <Card
                              key={block.id}
                              className={`border-l-4 transition-all duration-200 ${
                                activeBlock === block.id
                                  ? "border-l-blue-500 bg-blue-50/50"
                                  : "border-l-gray-300"
                              }`}
                            >
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <CardTitle className="text-base flex items-center gap-2">
                                        {block.type === "heading" &&
                                          "📝 Überschrift"}
                                        {block.type === "text" && "📄 Text"}
                                        {block.type === "button" && "🔘 Button"}
                                        {block.type === "image" && "🖼️ Bild"}
                                        {block.type === "list" &&
                                          "📋 Aufzählung"}
                                        {block.type === "form" && "📧 Formular"}
                                        {block.type === "spacer" &&
                                          "📏 Abstand"}
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          {block.type}
                                        </Badge>
                                      </CardTitle>
                                      <p className="text-sm text-gray-500">
                                        {block.type === "text" &&
                                          block.content.text &&
                                          block.content.text.substring(0, 50) +
                                            "..."}
                                        {block.type === "heading" &&
                                          block.content.text}
                                        {block.type === "button" &&
                                          block.content.text}
                                        {block.type === "list" &&
                                          `${block.content.items?.length || 0} Listenpunkte`}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {/* Style Button */}
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setCurrentStyleBlock(block.id);
                                        setShowBlockStyleOptions(true);
                                      }}
                                      title="Block-Design"
                                      className="h-8 w-8 p-0"
                                    >
                                      <Palette className="h-4 w-4" />
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
                                          : "ghost"
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
                                <CardContent className="pt-0 border-t bg-white/50">
                                  {/* Text Editor */}
                                  {block.type === "text" && (
                                    <div className="space-y-4">
                                      <div>
                                        <Label className="flex items-center gap-2">
                                          <Type className="w-4 h-4" />
                                          Text-Inhalt
                                        </Label>
                                        <Textarea
                                          value={block.content.text || ""}
                                          onChange={(e) =>
                                            handleUpdateBlock(block.id, {
                                              ...block.content,
                                              text: e.target.value,
                                            })
                                          }
                                          placeholder="Geben Sie Ihren Text ein..."
                                          rows={6}
                                          className="mt-2"
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Textgröße</Label>
                                          <Select
                                            value={
                                              block.content.fontSize || "base"
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
                                              <SelectItem value="sm">
                                                Klein
                                              </SelectItem>
                                              <SelectItem value="base">
                                                Normal
                                              </SelectItem>
                                              <SelectItem value="lg">
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
                                                Zentriert
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
                                    <div className="space-y-4">
                                      <div>
                                        <Label className="flex items-center gap-2">
                                          <Type className="w-4 h-4" />
                                          Überschrift
                                        </Label>
                                        <Input
                                          value={block.content.text || ""}
                                          onChange={(e) =>
                                            handleUpdateBlock(block.id, {
                                              ...block.content,
                                              text: e.target.value,
                                            })
                                          }
                                          placeholder="Überschrift eingeben..."
                                          className="mt-2"
                                        />
                                      </div>
                                      <div className="grid grid-cols-3 gap-4">
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
                                                Zentriert
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

                                  {/* List Editor */}
                                  {block.type === "list" && (
                                    <div className="space-y-4">
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
                                          placeholder="z.B. Deine Aufgaben"
                                          className="mt-2"
                                        />
                                      </div>

                                      <div>
                                        <div className="flex justify-between items-center mb-3">
                                          <Label>Listenpunkte</Label>
                                          <Button
                                            size="sm"
                                            onClick={() =>
                                              addListItem(
                                                block.id,
                                                block.content.items || [],
                                              )
                                            }
                                          >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Hinzufügen
                                          </Button>
                                        </div>

                                        <div className="space-y-3">
                                          {(block.content.items || []).map(
                                            (item: any, itemIndex: number) => (
                                              <div
                                                key={itemIndex}
                                                className="flex gap-3 p-3 border rounded-lg bg-gray-50"
                                              >
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                  onClick={() => {
                                                    setCurrentListBlock(
                                                      block.id,
                                                    );
                                                    setCurrentItemIndex(
                                                      itemIndex,
                                                    );
                                                    setShowEmojiPicker(true);
                                                  }}
                                                  className="h-10 w-10 p-0 text-lg"
                                                >
                                                  {item.emoji || "📋"}
                                                </Button>
                                                <div className="flex-1">
                                                  <Textarea
                                                    value={item.text || ""}
                                                    onChange={(e) => {
                                                      const newItems = [
                                                        ...(block.content
                                                          .items || []),
                                                      ];
                                                      newItems[itemIndex] = {
                                                        ...newItems[itemIndex],
                                                        text: e.target.value,
                                                      };
                                                      handleUpdateBlock(
                                                        block.id,
                                                        {
                                                          ...block.content,
                                                          items: newItems,
                                                        },
                                                      );
                                                    }}
                                                    placeholder="Listenpunkt-Text"
                                                    rows={2}
                                                  />
                                                </div>
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                  onClick={() =>
                                                    removeListItem(
                                                      block.id,
                                                      block.content.items || [],
                                                      itemIndex,
                                                    )
                                                  }
                                                  className="self-start h-10 w-10 p-0 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                                                >
                                                  <Trash2 className="h-4 w-4" />
                                                </Button>
                                              </div>
                                            ),
                                          )}
                                        </div>

                                        {(!block.content.items ||
                                          block.content.items.length === 0) && (
                                          <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                                            <p>
                                              Noch keine Listenpunkte vorhanden
                                            </p>
                                          </div>
                                        )}
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Spalten</Label>
                                          <Select
                                            value={
                                              block.content.columns?.toString() ||
                                              "1"
                                            }
                                            onValueChange={(value) =>
                                              handleUpdateBlock(block.id, {
                                                ...block.content,
                                                columns: parseInt(value),
                                              })
                                            }
                                          >
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="1">
                                                1 Spalte
                                              </SelectItem>
                                              <SelectItem value="2">
                                                2 Spalten
                                              </SelectItem>
                                              <SelectItem value="3">
                                                3 Spalten
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
                                                Zentriert
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Button Editor */}
                                  {block.type === "button" && (
                                    <div className="space-y-4">
                                      <div className="flex gap-2 mb-4">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => {
                                            setCurrentButtonBlock(block.id);
                                            setShowButtonTemplates(true);
                                          }}
                                        >
                                          <Sparkles className="w-4 h-4 mr-2" />
                                          Button-Template
                                        </Button>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
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
                                            placeholder="z.B. Jetzt bewerben"
                                          />
                                        </div>
                                        <div>
                                          <Label>Emoji (optional)</Label>
                                          <Input
                                            value={block.content.emoji || ""}
                                            onChange={(e) =>
                                              handleUpdateBlock(block.id, {
                                                ...block.content,
                                                emoji: e.target.value,
                                              })
                                            }
                                            placeholder="🚀"
                                            maxLength={2}
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <Label>URL/Link</Label>
                                        <Input
                                          value={block.content.url || ""}
                                          onChange={(e) =>
                                            handleUpdateBlock(block.id, {
                                              ...block.content,
                                              url: e.target.value,
                                            })
                                          }
                                          placeholder="https://... oder #bewerbung"
                                        />
                                      </div>

                                      <div className="grid grid-cols-3 gap-4">
                                        <div>
                                          <Label>Stil</Label>
                                          <Select
                                            value={
                                              block.content.variant || "primary"
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
                                                Warnung
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <Label>Größe</Label>
                                          <Select
                                            value={block.content.size || "md"}
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
                                              <SelectItem value="sm">
                                                Klein
                                              </SelectItem>
                                              <SelectItem value="md">
                                                Normal
                                              </SelectItem>
                                              <SelectItem value="lg">
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
                                                Zentriert
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

                                  {/* Image Editor */}
                                  {block.type === "image" && (
                                    <div className="space-y-4">
                                      <div>
                                        <Label className="flex items-center gap-2">
                                          <ImageIcon className="w-4 h-4" />
                                          Bild
                                        </Label>
                                        <div className="flex gap-2 mt-2">
                                          <Button
                                            variant="outline"
                                            onClick={() =>
                                              setShowMediaGallery(true)
                                            }
                                          >
                                            Bild auswählen
                                          </Button>
                                          {block.content.src && (
                                            <Button
                                              variant="outline"
                                              onClick={() =>
                                                handleUpdateBlock(block.id, {
                                                  ...block.content,
                                                  src: "",
                                                })
                                              }
                                            >
                                              Entfernen
                                            </Button>
                                          )}
                                        </div>
                                        {block.content.src && (
                                          <img
                                            src={block.content.src}
                                            alt="Preview"
                                            className="mt-2 w-full h-32 object-cover rounded border"
                                          />
                                        )}
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
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
                                            placeholder="Beschreibung des Bildes"
                                          />
                                        </div>
                                        <div>
                                          <Label>Bildunterschrift</Label>
                                          <Input
                                            value={block.content.caption || ""}
                                            onChange={(e) =>
                                              handleUpdateBlock(block.id, {
                                                ...block.content,
                                                caption: e.target.value,
                                              })
                                            }
                                            placeholder="Optionale Bildunterschrift"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Spacer Editor */}
                                  {block.type === "spacer" && (
                                    <div className="space-y-4">
                                      <div>
                                        <Label>Abstand in Pixel</Label>
                                        <Slider
                                          value={[block.content.height || 40]}
                                          onValueChange={(value) =>
                                            handleUpdateBlock(block.id, {
                                              ...block.content,
                                              height: value[0],
                                            })
                                          }
                                          max={200}
                                          min={10}
                                          step={10}
                                          className="mt-2"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                          <span>10px</span>
                                          <span className="font-medium text-blue-600">
                                            {block.content.height || 40}px
                                          </span>
                                          <span>200px</span>
                                        </div>
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
                {/* Add Block Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Block hinzufügen
                    </CardTitle>
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
                      onClick={() => handleAddBlock("spacer")}
                    >
                      📏 Abstand
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleAddBlock("form")}
                    >
                      📧 Formular
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Templates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Schnell-Zugriff
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setShowTemplateSelector(true)}
                    >
                      <Template className="w-4 h-4 mr-2" />
                      Demo Templates
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setShowBodyStyleTemplates(true)}
                    >
                      <Palette className="w-4 h-4 mr-2" />
                      Design Vorlagen
                    </Button>
                  </CardContent>
                </Card>

                {/* Status Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      📊 Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge variant={page.published ? "default" : "secondary"}>
                        {page.published ? "✅ Veröffentlicht" : "⏳ Entwurf"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Blöcke:</span>
                      <span className="font-medium">{page.blocks.length}</span>
                    </div>
                    <div className="text-xs text-gray-500 break-all">
                      <strong>URL:</strong> /jobs/{page.slug}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        window.open(`/jobs/${page.slug}`, "_blank")
                      }
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Live Vorschau
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Header Tab */}
          <TabsContent value="header">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Header-Inhalt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Header Title */}
                  <div>
                    <Label className="text-base font-medium">
                      Haupttitel / Jobname
                    </Label>
                    <Input
                      value={page.header.title}
                      onChange={(e) =>
                        updatePage(page.id, {
                          header: { ...page.header, title: e.target.value },
                        })
                      }
                      placeholder="z.B. Marketing Manager (m/w/d)"
                      className="mt-2"
                    />
                  </div>

                  {/* Header Subtitle */}
                  <div>
                    <Label className="text-base font-medium">
                      Untertitel (optional)
                    </Label>
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
                      placeholder="z.B. Dein Traumjob wartet!"
                      className="mt-2"
                    />
                  </div>

                  {/* Header Description */}
                  <div>
                    <Label className="text-base font-medium">
                      Beschreibung
                    </Label>
                    <Textarea
                      value={page.header.text}
                      onChange={(e) =>
                        updatePage(page.id, {
                          header: { ...page.header, text: e.target.value },
                        })
                      }
                      placeholder="Kurze Beschreibung der Position..."
                      rows={3}
                      className="mt-2"
                    />
                  </div>

                  {/* Job Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Arbeitsort</Label>
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
                        placeholder="z.B. Berlin oder Remote"
                      />
                    </div>
                    <div>
                      <Label>Startdatum</Label>
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
                        placeholder="z.B. ab sofort"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Beschäftigungsart</Label>
                    <Select
                      value={page.header.employmentType || ""}
                      onValueChange={(value) =>
                        updatePage(page.id, {
                          header: { ...page.header, employmentType: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie eine Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vollzeit">Vollzeit</SelectItem>
                        <SelectItem value="Teilzeit">Teilzeit</SelectItem>
                        <SelectItem value="Werkstudent">Werkstudent</SelectItem>
                        <SelectItem value="Praktikum">Praktikum</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Minijob">Minijob</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Header-Design
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Header Image */}
                  <div>
                    <Label className="text-base font-medium">Header-Bild</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowMediaGallery(true)}
                        className="flex items-center gap-2"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Bild auswählen
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
                      <div className="mt-3">
                        <img
                          src={page.header.image}
                          alt="Header"
                          className="w-full h-40 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>

                  {/* Header Height */}
                  <div>
                    <Label className="text-base font-medium">Header-Höhe</Label>
                    <Slider
                      value={[page.header.customHeight || 400]}
                      onValueChange={(value) =>
                        updatePage(page.id, {
                          header: {
                            ...page.header,
                            customHeight: value[0],
                          },
                        })
                      }
                      max={1000}
                      min={200}
                      step={50}
                      className="mt-3"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>200px</span>
                      <span className="font-medium text-blue-600">
                        {page.header.customHeight || 400}px
                      </span>
                      <span>1000px</span>
                    </div>
                  </div>

                  {/* Title Font Size */}
                  <div>
                    <Label className="text-base font-medium">
                      Titel-Schriftgröße
                    </Label>
                    <Slider
                      value={[page.header.titleFontSize || 48]}
                      onValueChange={(value) =>
                        updatePage(page.id, {
                          header: {
                            ...page.header,
                            titleFontSize: value[0],
                          },
                        })
                      }
                      max={96}
                      min={24}
                      step={4}
                      className="mt-3"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Klein (24px)</span>
                      <span className="font-medium text-blue-600">
                        {page.header.titleFontSize || 48}px
                      </span>
                      <span>Groß (96px)</span>
                    </div>
                  </div>

                  {/* Text Alignment */}
                  <div>
                    <Label className="text-base font-medium">
                      Text-Ausrichtung
                    </Label>
                    <Select
                      value={page.header.alignment || "center"}
                      onValueChange={(value) =>
                        updatePage(page.id, {
                          header: { ...page.header, alignment: value },
                        })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Links</SelectItem>
                        <SelectItem value="center">Zentriert</SelectItem>
                        <SelectItem value="right">Rechts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Overlay Settings */}
                  <div className="space-y-4 border-t pt-4">
                    <Label className="text-base font-medium">
                      Overlay-Einstellungen
                    </Label>

                    <div>
                      <Label>Overlay-Typ</Label>
                      <Select
                        value={page.header.overlay || "none"}
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
                          <SelectItem value="custom">Eigene Farbe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {page.header.overlay === "custom" && (
                      <div>
                        <Label>Overlay-Farbe</Label>
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
                          className="mt-2"
                        />
                      </div>
                    )}

                    {page.header.overlay && page.header.overlay !== "none" && (
                      <div>
                        <Label>Overlay-Transparenz</Label>
                        <Slider
                          value={[page.header.overlayOpacity || 40]}
                          onValueChange={(value) =>
                            updatePage(page.id, {
                              header: {
                                ...page.header,
                                overlayOpacity: value[0],
                              },
                            })
                          }
                          max={80}
                          min={10}
                          step={5}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>10%</span>
                          <span className="font-medium text-blue-600">
                            {page.header.overlayOpacity || 40}%
                          </span>
                          <span>80%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Farben & Design
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-2 mb-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowBodyStyleTemplates(true)}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Design Vorlagen
                    </Button>
                  </div>

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
                        className="mt-2"
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
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Textfarbe</Label>
                      <Input
                        type="color"
                        value={page.design?.textColor || "#1f2937"}
                        onChange={(e) =>
                          updatePage(page.id, {
                            design: {
                              ...page.design,
                              textColor: e.target.value,
                            },
                          })
                        }
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Schriftart</Label>
                    <Select
                      value={page.design?.fontFamily || "montserrat"}
                      onValueChange={(value) =>
                        updatePage(page.id, {
                          design: {
                            ...page.design,
                            fontFamily: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="montserrat">
                          Montserrat (Modern)
                        </SelectItem>
                        <SelectItem value="roboto">Roboto (Clean)</SelectItem>
                        <SelectItem value="opensans">
                          Open Sans (Professional)
                        </SelectItem>
                        <SelectItem value="lato">Lato (Friendly)</SelectItem>
                        <SelectItem value="poppins">
                          Poppins (Trendy)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
                    <Label>Seitenabstand</Label>
                    <Slider
                      value={[page.design?.bodyPadding || 24]}
                      onValueChange={(value) =>
                        updatePage(page.id, {
                          design: {
                            ...page.design,
                            bodyPadding: value[0],
                          },
                        })
                      }
                      max={60}
                      min={0}
                      step={4}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0px</span>
                      <span className="font-medium text-blue-600">
                        {page.design?.bodyPadding || 24}px
                      </span>
                      <span>60px</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Layout & Typografie
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Zeilenhöhe</Label>
                    <Select
                      value={page.design?.lineHeight || "normal"}
                      onValueChange={(value) =>
                        updatePage(page.id, {
                          design: {
                            ...page.design,
                            lineHeight: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tight">Eng</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="relaxed">Entspannt</SelectItem>
                        <SelectItem value="loose">Locker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Live Preview */}
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Live Vorschau
                    </Label>
                    <div
                      className="p-4 rounded border bg-white"
                      style={{
                        backgroundColor:
                          page.design?.backgroundColor || "#ffffff",
                        color: page.design?.textColor || "#1f2937",
                        fontFamily: page.design?.fontFamily || "montserrat",
                        lineHeight: {
                          tight: "1.25",
                          normal: "1.5",
                          relaxed: "1.625",
                          loose: "2",
                        }[page.design?.lineHeight || "normal"],
                      }}
                    >
                      <h3
                        className="text-lg font-bold mb-2"
                        style={{
                          color: page.design?.primaryColor || "#3b82f6",
                        }}
                      >
                        {page.header.title || "Beispiel Titel"}
                      </h3>
                      <p className="text-sm mb-3">
                        Dies ist eine Vorschau Ihres gewählten Designs. Hier
                        können Sie sehen, wie Text und Farben zusammenwirken.
                      </p>
                      <button
                        className="px-4 py-2 rounded text-white text-sm font-medium"
                        style={{
                          backgroundColor:
                            page.design?.primaryColor || "#3b82f6",
                        }}
                      >
                        Beispiel Button
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings2 className="w-5 h-5" />
                    Allgemeine Einstellungen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Seiten-Titel</Label>
                    <Input
                      value={page.title}
                      onChange={(e) =>
                        updatePage(page.id, { title: e.target.value })
                      }
                      placeholder="Titel der Landing Page"
                    />
                  </div>

                  <div>
                    <Label>URL-Slug</Label>
                    <Input
                      value={page.slug}
                      onChange={(e) =>
                        updatePage(page.id, { slug: e.target.value })
                      }
                      placeholder="url-slug"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Die Seite wird unter /jobs/{page.slug} erreichbar sein
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">
                        Seite veröffentlichen
                      </Label>
                      <p className="text-sm text-gray-500">
                        Veröffentlichte Seiten sind öffentlich zugänglich
                      </p>
                    </div>
                    <Switch
                      checked={page.published}
                      onCheckedChange={(checked) =>
                        updatePage(page.id, { published: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🔍 SEO-Einstellungen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>SEO-Titel</Label>
                    <Input
                      value={page.seoTitle || ""}
                      onChange={(e) =>
                        updatePage(page.id, { seoTitle: e.target.value })
                      }
                      placeholder="Titel für Suchmaschinen"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Empfohlen: 50-60 Zeichen
                    </p>
                  </div>

                  <div>
                    <Label>SEO-Beschreibung</Label>
                    <Textarea
                      value={page.seoDescription || ""}
                      onChange={(e) =>
                        updatePage(page.id, { seoDescription: e.target.value })
                      }
                      placeholder="Beschreibung für Suchmaschinen"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Empfohlen: 150-160 Zeichen
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🦶 Footer-Einstellungen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
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
                  </div>

                  <div>
                    <Label>Eigener Footer-Text</Label>
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
                      placeholder="© 2024 Ihr Unternehmen"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
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

      <EmojiPicker
        isOpen={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onSelect={(emoji) => {
          if (currentListBlock && currentItemIndex !== null) {
            updateListItemEmoji(currentListBlock, currentItemIndex, emoji);
          }
          setShowEmojiPicker(false);
        }}
      />

      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelect={handleTemplateSelect}
      />

      <ButtonTemplateSelector
        isOpen={showButtonTemplates}
        onClose={() => setShowButtonTemplates(false)}
        onSelect={handleButtonTemplate}
      />

      <BlockStyleOptions
        isOpen={showBlockStyleOptions}
        onClose={() => setShowBlockStyleOptions(false)}
        onApply={(styles) => {
          if (currentStyleBlock) {
            handleBlockStyle(currentStyleBlock, styles);
          }
          setShowBlockStyleOptions(false);
        }}
      />

      <BodyStyleTemplates
        isOpen={showBodyStyleTemplates}
        onClose={() => setShowBodyStyleTemplates(false)}
        onSelect={handleBodyStyleTemplate}
      />
    </div>
  );
}
