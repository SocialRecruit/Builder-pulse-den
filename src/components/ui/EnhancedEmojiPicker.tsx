import React, { useState, useMemo } from "react";
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
import { Search, X, Smile, Briefcase, Star } from "lucide-react";

// Erweiterte Emoji-Datenbank direkt in der Komponente für bessere Stabilität
const EMOJI_CATEGORIES = {
  frequent: {
    name: "Häufig",
    icon: "⭐",
    emojis: [
      "📋",
      "✅",
      "⭐",
      "🔥",
      "💡",
      "🎯",
      "🚀",
      "💼",
      "📈",
      "🏆",
      "👍",
      "💪",
      "🌟",
      "✨",
      "🎉",
    ],
  },
  work: {
    name: "Arbeit",
    icon: "💼",
    emojis: [
      "💼",
      "📊",
      "📈",
      "📉",
      "📋",
      "📝",
      "✏️",
      "📎",
      "📌",
      "📁",
      "📄",
      "📃",
      "💻",
      "⌨️",
      "🖥️",
      "📞",
      "📧",
      "📮",
      "💪",
      "🏆",
    ],
  },
  success: {
    name: "Erfolg",
    icon: "🏆",
    emojis: [
      "🏆",
      "🥇",
      "🥈",
      "🥉",
      "🎖️",
      "🏅",
      "⭐",
      "✨",
      "💫",
      "🌟",
      "🔥",
      "💪",
      "👍",
      "👏",
      "🙌",
      "✅",
      "☑️",
      "✔️",
      "💯",
      "🎯",
    ],
  },
  arrows: {
    name: "Pfeile",
    icon: "➡️",
    emojis: [
      "➡️",
      "⬅️",
      "⬆️",
      "⬇️",
      "↗️",
      "↘️",
      "↙️",
      "↖️",
      "↕️",
      "↔️",
      "🔄",
      "🔃",
      "🔁",
      "🔂",
      "▶️",
      "⏸️",
      "⏹️",
      "⏺️",
      "⏭️",
      "⏮️",
    ],
  },
  numbers: {
    name: "Zahlen",
    icon: "1️⃣",
    emojis: [
      "1️⃣",
      "2️⃣",
      "3���⃣",
      "4️⃣",
      "5️⃣",
      "6️⃣",
      "7️⃣",
      "8️⃣",
      "9️⃣",
      "🔟",
      "#️⃣",
      "*️⃣",
      "0️⃣",
    ],
  },
  symbols: {
    name: "Symbole",
    icon: "💡",
    emojis: [
      "💡",
      "🔍",
      "🔎",
      "❓",
      "❗",
      "❕",
      "❔",
      "‼️",
      "⁉️",
      "💭",
      "💬",
      "🗨️",
      "🗯️",
      "🔔",
      "🔕",
      "📣",
      "📢",
      "🔊",
      "🔉",
      "🔈",
    ],
  },
};

// Erweiterte Suchfunktion
const SEARCH_KEYWORDS = {
  arbeit: ["💼", "👨‍💼", "👩‍💼", "🏢", "📊", "📈", "📋", "📝"],
  work: ["💼", "👨‍💼", "👩‍💼", "🏢", "📊", "📈", "📋", "📝"],
  erfolg: ["🏆", "⭐", "🥇", "💪", "🎯", "✅", "🌟"],
  success: ["🏆", "⭐", "🥇", "💪", "🎯", "✅", "🌟"],
  zeit: ["⏰", "📅", "⏱️", "🕐", "⏳"],
  time: ["⏰", "📅", "⏱️", "🕐", "⏳"],
  team: ["👥", "🤝", "👨‍💼", "👩‍💼", "👫"],
  ziel: ["🎯", "🏹", "🔮", "🚀", "⭐"],
  goal: ["🎯", "🏹", "🔮", "🚀", "⭐"],
  idee: ["💡", "🧠", "💭", "✨", "🌟"],
  idea: ["💡", "🧠", "💭", "✨", "🌟"],
  qualität: ["⭐", "💎", "🏆", "✨", "👌"],
  quality: ["⭐", "💎", "🏆", "✨", "👌"],
};

interface EnhancedEmojiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
  currentEmoji?: string;
}

export const EnhancedEmojiPicker: React.FC<EnhancedEmojiPickerProps> = ({
  isOpen,
  onClose,
  onEmojiSelect,
  currentEmoji = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("frequent");

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    onClose();
  };

  const handleClearEmoji = () => {
    onEmojiSelect("");
    onClose();
  };

  // Memoized search results für bessere Performance
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();

    // Direkte Keyword-Suche
    for (const [keyword, emojis] of Object.entries(SEARCH_KEYWORDS)) {
      if (keyword.includes(query) || query.includes(keyword)) {
        return emojis;
      }
    }

    // Fallback: Suche in allen Emojis
    const allEmojis = Object.values(EMOJI_CATEGORIES).flatMap(
      (cat) => cat.emojis,
    );
    return allEmojis.slice(0, 20); // Limit für Performance
  }, [searchQuery]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smile className="w-5 h-5" />
            Emoji auswählen
            {currentEmoji && (
              <span className="text-lg bg-gray-100 px-2 py-1 rounded">
                {currentEmoji}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quick Actions */}
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

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Emojis suchen... (z.B. arbeit, erfolg, zeit)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Search Results or Categories */}
          {searchQuery ? (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Suchergebnisse für "{searchQuery}"
              </Label>
              <div className="grid grid-cols-8 gap-2 p-3 border rounded-lg max-h-48 overflow-y-auto bg-gray-50">
                {searchResults.length > 0 ? (
                  searchResults.map((emoji, index) => (
                    <Button
                      key={`${emoji}-${index}`}
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 text-lg hover:bg-blue-100 hover:scale-110 transition-all"
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
                <TabsTrigger value="frequent" className="text-xs">
                  ⭐ Häufig
                </TabsTrigger>
                <TabsTrigger value="work" className="text-xs">
                  💼 Arbeit
                </TabsTrigger>
                <TabsTrigger value="all" className="text-xs">
                  🎯 Alle
                </TabsTrigger>
              </TabsList>

              <TabsContent value="frequent" className="mt-4">
                <div className="grid grid-cols-8 gap-2 p-3 border rounded-lg max-h-48 overflow-y-auto bg-gray-50">
                  {EMOJI_CATEGORIES.frequent.emojis.map((emoji, index) => (
                    <Button
                      key={`frequent-${emoji}-${index}`}
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 text-lg hover:bg-blue-100 hover:scale-110 transition-all"
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="work" className="mt-4">
                <div className="max-h-64 overflow-y-auto space-y-3">
                  {Object.entries(EMOJI_CATEGORIES)
                    .filter(([key]) =>
                      ["work", "success", "arrows"].includes(key),
                    )
                    .map(([key, category]) => (
                      <div key={key} className="space-y-2">
                        <Label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                          {category.icon} {category.name}
                        </Label>
                        <div className="grid grid-cols-8 gap-2 p-2 border rounded-lg bg-gray-50">
                          {category.emojis.map((emoji, index) => (
                            <Button
                              key={`${key}-${emoji}-${index}`}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-sm hover:bg-blue-100 hover:scale-110 transition-all"
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

              <TabsContent value="all" className="mt-4">
                <div className="max-h-64 overflow-y-auto space-y-3">
                  {Object.entries(EMOJI_CATEGORIES).map(([key, category]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                        {category.icon} {category.name}
                      </Label>
                      <div className="grid grid-cols-8 gap-2 p-2 border rounded-lg bg-gray-50">
                        {category.emojis.map((emoji, index) => (
                          <Button
                            key={`${key}-${emoji}-${index}`}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-sm hover:bg-blue-100 hover:scale-110 transition-all"
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

          {/* Pro-Tip */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 <strong>Pro-Tipp:</strong> Versuchen Sie Suchbegriffe wie
              "arbeit", "erfolg", "zeit", "team" für passende Emojis!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
