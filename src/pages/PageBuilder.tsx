import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  MoreVertical,
  Settings,
} from "lucide-react";
import { HeaderSection } from "@/components/landing-builder/HeaderSection";
import { BlockEditor } from "@/components/landing-builder/BlockTypes";
import { BlockRenderer } from "@/components/landing-builder/BlockRenderer";
import { useLandingPages } from '@/hooks/useLandingPages';
import { useUsers } from '@/hooks/useUsers';
import { ContentBlock } from '@/types/landing-page';
import { QRCodeGenerator } from '@/components/landing-builder/QRCodeGenerator';
import { SocialMediaPreview } from '@/components/landing-builder/SocialMediaPreview';
import { SEOChecker } from '@/components/landing-builder/SEOChecker';
import { ABTestManager } from '@/components/landing-builder/ABTestManager';
import { toast } from 'sonner';

export default function PageBuilder() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");
  const [showPreview, setShowPreview] = useState(false);

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

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Laden...</p>
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

  const handlePreview = () => {
    navigate(`/jobs/${page.slug}`);
  };

  const blockTypes = [
    { type: "heading" as const, label: "Überschrift", icon: "📝" },
    { type: "text" as const, label: "Text", icon: "📄" },
    { type: "richtext" as const, label: "Rich Text", icon: "✏️" },
    { type: "image" as const, label: "Bild", icon: "🖼️" },
    { type: "button" as const, label: "Button", icon: "🔘" },
    { type: "form" as const, label: "Formular", icon: "📋" },
    { type: "spacer" as const, label: "Abstand", icon: "📏" },
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

              <QRCodeGenerator
                pageUrl={`${window.location.origin}/jobs/${page.slug}`}
                pageTitle={page.title}
              />

              <SocialMediaPreview page={page} />

              <SEOChecker page={page} />

              <ABTestManager page={page} />

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
            <TabsTrigger value="settings">Einstellungen</TabsTrigger>
            <TabsTrigger value="preview">Vorschau</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Editor */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header Section */}
                <HeaderSection
                  header={page.header}
                  onUpdate={(header) => updatePage(page.id, { header })}
                  isEditing={true}
                />

                {/* Content Blocks */}
                <Card>
                  <CardHeader>
                    <CardTitle>Inhaltsblöcke</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {page.blocks
                      .sort((a, b) => a.order - b.order)
                      .map((block) => (
                        <BlockEditor
                          key={block.id}
                          block={block}
                          onUpdate={(content) =>
                            handleUpdateBlock(block.id, content)
                          }
                          onDelete={() => handleDeleteBlock(block.id)}
                        />
                      ))}

                    {page.blocks.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Noch keine Inhaltsblöcke vorhanden. Fügen Sie einen
                        Block hinzu, um zu beginnen.
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
                    <CardTitle className="text-lg">Block hinzufügen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2">
                      {blockTypes.map((blockType) => (
                        <Button
                          key={blockType.type}
                          variant="outline"
                          className="justify-start"
                          onClick={() => handleAddBlock(blockType.type)}
                        >
                          <span className="mr-2">{blockType.icon}</span>
                          {blockType.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Aktionen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handlePreview}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Live Vorschau
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Einstellungen
                    </Button>
                  </CardContent>
                </Card>

                {/* Advanced Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Erweiterte Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <QRCodeGenerator
                      pageUrl={`${window.location.origin}/jobs/${page.slug}`}
                      pageTitle={page.title}
                    />

                    <SocialMediaPreview page={page} />

                    <SEOChecker page={page} />

                    <ABTestManager page={page} />
                  </CardContent>
                </Card>
                </Card>
              </div>
            </div>
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
                    <p className="text-xs text-gray-500">
                      Die Seite wird unter /jobs/{page.slug} erreichbar sein
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>SEO Titel (optional)</Label>
                    <Input
                      value={page.seoTitle || ""}
                      onChange={(e) =>
                        updatePage(page.id, { seoTitle: e.target.value })
                      }
                      placeholder={page.title}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>SEO Beschreibung (optional)</Label>
                    <Input
                      value={page.seoDescription || ""}
                      onChange={(e) =>
                        updatePage(page.id, { seoDescription: e.target.value })
                      }
                      placeholder="Kurze Beschreibung für Suchmaschinen..."
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
                    <Label>Benutzerdefinierter Footer-Text (optional)</Label>
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
                      placeholder="Zusätzlicher Text im Footer..."
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
                <CardTitle>Vorschau</CardTitle>
                <p className="text-sm text-gray-600">
                  So wird Ihre Landing Page für Besucher aussehen.
                </p>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden bg-white">
                  <div className="p-6 space-y-6">
                    <HeaderSection header={page.header} />

                    <div className="space-y-6">
                      {page.blocks
                        .sort((a, b) => a.order - b.order)
                        .map((block) => (
                          <BlockRenderer
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