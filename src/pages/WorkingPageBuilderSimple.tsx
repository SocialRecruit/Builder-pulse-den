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

export default function WorkingPageBuilderSimple() {
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
      {/* Header */}
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
                <h1 className="text-xl font-bold text-gray-900">
                  {page.title}
                </h1>
                <p className="text-sm text-gray-500">
                  Page Builder - {page.published ? "Veröffentlicht" : "Entwurf"}
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
              <Button size="sm">
                <Save className="w-4 h-4 mr-2" />
                Speichern
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">
            ✅ Page Builder funktioniert!
          </h2>
          <p className="text-gray-600 mb-4">
            Dies ist eine vereinfachte Version des Page Builders, um zu testen
            ob die grundlegende Funktionalität arbeitet.
          </p>
          <div className="space-y-2">
            <p>
              Page ID: <code>{pageId}</code>
            </p>
            <p>
              Page Title: <code>{page.title}</code>
            </p>
            <p>
              Blocks: <code>{page.blocks.length}</code>
            </p>
          </div>

          <div className="mt-8">
            <Button
              onClick={() => {
                window.location.href = `/page-builder/${pageId}`;
              }}
            >
              🔄 Vollständigen Page Builder laden
            </Button>
          </div>
        </div>
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
