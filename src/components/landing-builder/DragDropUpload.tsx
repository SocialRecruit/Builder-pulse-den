import { useState, useRef } from "react";
import { Upload, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DragDropUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

export const DragDropUpload = ({
  value,
  onChange,
  onRemove,
  accept = "image/*",
  maxSize = 5,
  className,
}: DragDropUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Bitte wählen Sie eine Bilddatei aus.");
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      alert(`Die Datei ist zu groß. Maximale Größe: ${maxSize}MB`);
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert("Fehler beim Laden der Datei.");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Fehler beim Hochladen der Datei.");
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      onChange("");
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  if (value) {
    return (
      <div className={cn("relative group", className)}>
        <img
          src={value}
          alt="Uploaded image"
          className="w-full h-48 object-cover rounded-lg border"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={openFileDialog}>
              <Upload className="h-4 w-4 mr-1" />
              Ändern
            </Button>
            <Button variant="destructive" size="sm" onClick={handleRemove}>
              <X className="h-4 w-4 mr-1" />
              Entfernen
            </Button>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        {
          "border-blue-500 bg-blue-50": isDragOver,
          "border-gray-300 hover:border-gray-400": !isDragOver,
          "opacity-50 pointer-events-none": isUploading,
        },
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <div className="space-y-4">
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-sm text-gray-600 mt-2">Wird hochgeladen...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="p-3 bg-gray-100 rounded-full">
                <Image className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Bild hochladen
              </p>
              <p className="text-sm text-gray-500">
                Ziehen Sie ein Bild hierher oder klicken Sie zum Auswählen
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, GIF bis {maxSize}MB
              </p>
            </div>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
