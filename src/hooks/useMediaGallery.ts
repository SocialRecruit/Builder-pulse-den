import { useState, useCallback } from "react";

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  alt?: string;
}

const STORAGE_KEY = "landing-page-media-gallery";

export function useMediaGallery() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveToStorage = useCallback((items: MediaItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setMediaItems(items);
  }, []);

  const uploadFile = useCallback(
    (file: File): Promise<MediaItem> => {
      return new Promise((resolve, reject) => {
        if (!file.type.startsWith("image/")) {
          reject(new Error("Nur Bilddateien sind erlaubt"));
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          // 5MB limit
          reject(new Error("Datei ist zu groß (max. 5MB)"));
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          const newMediaItem: MediaItem = {
            id: Date.now().toString(),
            filename: file.name,
            url: reader.result as string,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
            alt: file.name.split(".")[0],
          };

          const updatedItems = [newMediaItem, ...mediaItems];
          saveToStorage(updatedItems);
          resolve(newMediaItem);
        };
        reader.onerror = () => reject(new Error("Fehler beim Lesen der Datei"));
        reader.readAsDataURL(file);
      });
    },
    [mediaItems, saveToStorage],
  );

  const deleteMedia = useCallback(
    (id: string) => {
      const updatedItems = mediaItems.filter((item) => item.id !== id);
      saveToStorage(updatedItems);
    },
    [mediaItems, saveToStorage],
  );

  const updateMediaAlt = useCallback(
    (id: string, alt: string) => {
      const updatedItems = mediaItems.map((item) =>
        item.id === id ? { ...item, alt } : item,
      );
      saveToStorage(updatedItems);
    },
    [mediaItems, saveToStorage],
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return {
    mediaItems,
    uploadFile,
    deleteMedia,
    updateMediaAlt,
    formatFileSize,
  };
}
