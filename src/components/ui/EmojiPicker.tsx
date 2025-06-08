import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X } from "lucide-react";
import { emojiCategories, searchEmojis, getAllEmojis } from "@/data/emojis";

interface EmojiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
  currentEmoji?: string;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  isOpen,
  onClose,
  onEmojiSelect,
  currentEmoji = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("häufig");

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    onClose();
  };

  const filteredEmojis = searchQuery ? searchEmojis(searchQuery) : [];

  const handleClearEmoji = () => {
    onEmojiSelect("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            😀 Emoji auswählen
            {currentEmoji && (
              <span className="text-lg bg-gray-100 px-2 py-1 rounded">
                {currentEmoji}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Aktionen */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearEmoji}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Kein Emoji
            </Button>
            {currentEmoji && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEmojiClick(currentEmoji)}
                className="flex items-center gap-2"
              >
                {currentEmoji} Behalten
              </Button>
            )}
          </div>

          {/* Suche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Emojis suchen... (z.B. arbeit, erfolg, zeit)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Suchergebnisse oder Kategorien */}
          {searchQuery ? (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Suchergebnisse für "{searchQuery}"
              </Label>
              <div className="grid grid-cols-8 gap-2 p-2 border rounded max-h-48 overflow-y-auto">
                {filteredEmojis.length > 0 ? (
                  filteredEmojis.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 text-lg hover:bg-blue-100"
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))
                ) : (
                  <div className="col-span-8 text-center text-gray-500 py-4">
                    Keine Emojis gefunden
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 text-xs">
                <TabsTrigger value="häufig" className="text-xs">
                  Häufig
                </TabsTrigger>
                <TabsTrigger value="arbeit" className="text-xs">
                  Arbeit
                </TabsTrigger>
                <TabsTrigger value="alle" className="text-xs">
                  Alle
                </TabsTrigger>
              </TabsList>

              <TabsContent value="häufig" className="mt-4">
                <div className="grid grid-cols-8 gap-2 p-2 border rounded max-h-48 overflow-y-auto">
                  {emojiCategories[0].emojis.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 text-lg hover:bg-blue-100"
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="arbeit" className="mt-4">
                <div className="max-h-64 overflow-y-auto space-y-3">
                  {emojiCategories.slice(1, 6).map((category) => (
                    <div key={category.name} className="space-y-2">
                      <Label className="text-xs font-medium text-gray-600">
                        {category.name}
                      </Label>
                      <div className="grid grid-cols-8 gap-2 p-2 border rounded">
                        {category.emojis.map((emoji, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-sm hover:bg-blue-100"
                            onClick={() => handleEmojiClick(emoji)}
                          >
                            {emoji}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="alle" className="mt-4">
                <div className="max-h-64 overflow-y-auto space-y-3">
                  {emojiCategories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <Label className="text-xs font-medium text-gray-600">
                        {category.name}
                      </Label>
                      <div className="grid grid-cols-8 gap-2 p-2 border rounded">
                        {category.emojis.map((emoji, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-sm hover:bg-blue-100"
                            onClick={() => handleEmojiClick(emoji)}
                          >
                            {emoji}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
