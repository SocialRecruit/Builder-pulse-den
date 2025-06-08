import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  Search,
  Edit3,
  Trash2,
  Check,
  Image as ImageIcon,
  Plus,
} from "lucide-react";
import { useMediaGallery, MediaItem } from "@/hooks/useMediaGallery";
import { toast } from "sonner";

interface MediaGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string, alt?: string) => void;
  selectedUrl?: string;
}

export function MediaGallery({
  isOpen,
  onClose,
  onSelect,
  selectedUrl,
}: MediaGalleryProps) {
  const {
    mediaItems,
    uploadFile,
    deleteMedia,
    updateMediaAlt,
    formatFileSize,
  } = useMediaGallery();
  const [searchTerm, setSearchTerm] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editingAlt, setEditingAlt] = useState<string | null>(null);
  const [tempAlt, setTempAlt] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = mediaItems.filter(
    (item) =>
      item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.alt || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        await uploadFile(file);
      }
      toast.success(`${files.length} Datei(en) erfolgreich hochgeladen`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Fehler beim Hochladen",
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSelect = (item: MediaItem) => {
    onSelect(item.url, item.alt);
    onClose();
  };

  const handleDeleteMedia = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    deleteMedia(id);
    toast.success("Bild gelöscht");
  };

  const startEditingAlt = (item: MediaItem, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingAlt(item.id);
    setTempAlt(item.alt || "");
  };

  const saveAltText = (id: string) => {
    updateMediaAlt(id, tempAlt);
    setEditingAlt(null);
    setTempAlt("");
    toast.success("Alt-Text gespeichert");
  };

  const cancelEditingAlt = () => {
    setEditingAlt(null);
    setTempAlt("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Medien-Galerie
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="space-y-3">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="mb-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {uploading ? "Wird hochgeladen..." : "Bilder hochladen"}
                </Button>
                <p className="text-sm text-gray-500">
                  Oder ziehen Sie Dateien hierher. Max. 5MB pro Datei.
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Bilder suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Media Grid */}
          <div className="max-h-96 overflow-y-auto">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`group relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-lg ${
                      selectedUrl === item.url
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleSelect(item)}
                  >
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={item.url}
                        alt={item.alt || item.filename}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => startEditingAlt(item, e)}
                          className="h-7 w-7 p-0"
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => handleDeleteMedia(item.id, e)}
                          className="h-7 w-7 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 text-xs">
                      <div className="font-medium truncate">
                        {item.filename}
                      </div>
                      <div className="text-gray-300">
                        {formatFileSize(item.size)}
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {selectedUrl === item.url && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full p-1">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                {searchTerm
                  ? "Keine Bilder gefunden"
                  : "Noch keine Bilder hochgeladen"}
              </div>
            )}
          </div>
        </div>

        {/* Alt Text Editor */}
        {editingAlt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-medium mb-4">Alt-Text bearbeiten</h3>
              <div className="space-y-3">
                <Label htmlFor="alt-text">
                  Alt-Text (für Barrierefreiheit)
                </Label>
                <Input
                  id="alt-text"
                  value={tempAlt}
                  onChange={(e) => setTempAlt(e.target.value)}
                  placeholder="Beschreibung des Bildes..."
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={cancelEditingAlt}>
                    Abbrechen
                  </Button>
                  <Button onClick={() => saveAltText(editingAlt)}>
                    Speichern
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
