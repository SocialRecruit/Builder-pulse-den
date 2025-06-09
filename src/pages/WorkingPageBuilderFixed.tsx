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
  ChevronUp,
  ChevronDown,
  Copy,
  Smile,
} from "lucide-react";
import { useLandingPages } from "@/hooks/useLandingPages";
import { MediaGallery } from "@/components/ui/MediaGallery";
import { EmojiPicker } from "@/components/ui/EmojiPicker";
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentListBlock, setCurrentListBlock] = useState<string | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);

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

  const openEmojiPicker = (blockId: string, itemIndex: number) => {
    setCurrentListBlock(blockId);
    setCurrentItemIndex(itemIndex);
    setShowEmojiPicker(true);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{page.title}</h1>
              <p className="text-sm text-gray-500">Landing Page Editor</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="header">Header</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Content Blocks */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Inhalts-Blöcke</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {page.blocks.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Keine Blöcke vorhanden
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Fügen Sie Ihren ersten Inhaltsblock hinzu
                        </p>
                        <Button onClick={() => handleAddBlock("text")}>
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
                                    {block.type === "list" && "📋 Aufzählung"}
                                    {block.type === "form" && "📧 Formular"}
                                    {block.type === "spacer" && "📏 Abstand"}
                                    {` #${index + 1}`}
                                  </CardTitle>
                                  <div className="flex gap-1">
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
                                  {/* Text Editor */}
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
                                          placeholder="Überschrift eingeben..."
                                        />
                                      </div>
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
                                    </div>
                                  )}

                                  {/* List Editor mit Emoji-Picker */}
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
                                          placeholder="z.B. Ihre Aufgaben"
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
                                                {/* Emoji Button mit Picker */}
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                  onClick={() =>
                                                    openEmojiPicker(
                                                      block.id,
                                                      itemIndex,
                                                    )
                                                  }
                                                  className="h-10 w-10 p-0 text-lg"
                                                  title="Emoji auswählen"
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
                                                  title="Listenpunkt löschen"
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
                                    </div>
                                  )}

                                  {/* Button Editor */}
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
                                    </div>
                                  )}

                                  {/* Image Editor */}
                                  {block.type === "image" && (
                                    <div className="space-y-3">
                                      <div>
                                        <Label>Bild</Label>
                                        <div className="flex gap-2 mt-2">
                                          <Button
                                            variant="outline"
                                            onClick={() =>
                                              setShowMediaGallery(true)
                                            }
                                          >
                                            <ImageIcon className="w-4 h-4 mr-2" />
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

              {/* Add Block Sidebar */}
              <div className="space-y-6">
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
                  </CardContent>
                </Card>

                {/* Status Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>📊 Status</CardTitle>
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

          {/* Header Tab */}
          <TabsContent value="header">
            <Card>
              <CardHeader>
                <CardTitle>🎨 Header konfigurieren</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Header Image */}
                <div>
                  <Label>Header-Bild</Label>
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
                    <div className="mt-2">
                      <img
                        src={page.header.image}
                        alt="Header"
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                {/* Header Content */}
                <div className="space-y-4 border-t pt-4">
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

                  <div>
                    <Label>Beschreibung</Label>
                    <Textarea
                      value={page.header.text}
                      onChange={(e) =>
                        updatePage(page.id, {
                          header: { ...page.header, text: e.target.value },
                        })
                      }
                      placeholder="Kurze Beschreibung des Jobs..."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design">
            <Card>
              <CardHeader>
                <CardTitle>⚙️ Design-Einstellungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={page.published}
                    onCheckedChange={(checked) =>
                      updatePage(page.id, { published: checked })
                    }
                  />
                  <Label>Seite veröffentlichen</Label>
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

      {/* Emoji Picker Modal */}
      <EmojiPicker
        isOpen={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onEmojiSelect={(emoji) => {
          if (currentListBlock && currentItemIndex !== null) {
            updateListItemEmoji(currentListBlock, currentItemIndex, emoji);
          }
          setShowEmojiPicker(false);
        }}
      />
    </div>
  );
}
