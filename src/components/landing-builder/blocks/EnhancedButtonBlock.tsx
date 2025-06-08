import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Palette, MousePointer, Image as ImageIcon, Plus } from "lucide-react";
import {
  BlockStyleOptions,
  BlockStyling,
  defaultStyling,
} from "@/components/ui/BlockStyleOptions";
import { EnhancedButton, InfoCardButton } from "@/components/ui/EnhancedButton";

export interface EnhancedButtonBlockContent {
  // Basic button properties
  text: string;
  url?: string;
  emoji?: string;

  // Style properties
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "gradient"
    | "custom";
  size: "sm" | "md" | "lg" | "xl";
  effect:
    | "scale"
    | "bounce"
    | "pulse"
    | "glow"
    | "flip"
    | "shake"
    | "rotate"
    | "slide";
  rounded: "none" | "sm" | "md" | "lg" | "full";
  shadow: "none" | "sm" | "md" | "lg" | "xl";

  // Advanced button properties
  buttonType: "simple" | "infoCard" | "imageCard";

  // Info card specific
  title?: string;
  description?: string;

  // Image card specific
  backgroundImage?: string;
  overlayOpacity?: number;
  overlayColor?: string;

  // Custom styling
  customStyle?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    emojiSize?: "sm" | "md" | "lg" | "xl";
  };

  // Layout
  alignment: "left" | "center" | "right";
  fullWidth?: boolean;

  // Block styling
  blockStyling: BlockStyling;
}

interface EnhancedButtonBlockEditorProps {
  content: EnhancedButtonBlockContent;
  onUpdate: (content: EnhancedButtonBlockContent) => void;
}

const defaultButtonContent: EnhancedButtonBlockContent = {
  text: "Jetzt bewerben",
  emoji: "🎯",
  variant: "primary",
  size: "lg",
  effect: "scale",
  rounded: "lg",
  shadow: "lg",
  buttonType: "simple",
  alignment: "center",
  fullWidth: false,
  blockStyling: defaultStyling,
};

export function EnhancedButtonBlockEditor({
  content,
  onUpdate,
}: EnhancedButtonBlockEditorProps) {
  const updateContent = (updates: Partial<EnhancedButtonBlockContent>) => {
    onUpdate({ ...content, ...updates });
  };

  const updateCustomStyle = (
    updates: Partial<NonNullable<EnhancedButtonBlockContent["customStyle"]>>,
  ) => {
    onUpdate({
      ...content,
      customStyle: { ...content.customStyle, ...updates },
    });
  };

  const updateBlockStyling = (styling: BlockStyling) => {
    onUpdate({ ...content, blockStyling: styling });
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Inhalt</TabsTrigger>
          <TabsTrigger value="style">Button-Style</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div className="space-y-2">
            <Label>Button-Typ</Label>
            <Select
              value={content.buttonType}
              onValueChange={(
                value: EnhancedButtonBlockContent["buttonType"],
              ) => updateContent({ buttonType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Einfacher Button</SelectItem>
                <SelectItem value="infoCard">Info-Karte</SelectItem>
                <SelectItem value="imageCard">Bild-Karte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {content.buttonType === "simple" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Button-Text</Label>
                  <Input
                    value={content.text}
                    onChange={(e) => updateContent({ text: e.target.value })}
                    placeholder="Button-Text"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Emoji (optional)</Label>
                  <Input
                    value={content.emoji || ""}
                    onChange={(e) => updateContent({ emoji: e.target.value })}
                    placeholder="🎯"
                    className="text-center"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  value={content.url || ""}
                  onChange={(e) => updateContent({ url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
          )}

          {content.buttonType === "infoCard" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Emoji</Label>
                <Input
                  value={content.emoji || ""}
                  onChange={(e) => updateContent({ emoji: e.target.value })}
                  placeholder="ℹ️"
                  className="text-center"
                />
              </div>
              <div className="space-y-2">
                <Label>Titel</Label>
                <Input
                  value={content.title || ""}
                  onChange={(e) => updateContent({ title: e.target.value })}
                  placeholder="Mehr erfahren"
                />
              </div>
              <div className="space-y-2">
                <Label>Beschreibung</Label>
                <Textarea
                  value={content.description || ""}
                  onChange={(e) =>
                    updateContent({ description: e.target.value })
                  }
                  placeholder="Zusätzliche Informationen..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  value={content.url || ""}
                  onChange={(e) => updateContent({ url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
          )}

          {content.buttonType === "imageCard" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Hintergrundbild</Label>
                <Input
                  value={content.backgroundImage || ""}
                  onChange={(e) =>
                    updateContent({ backgroundImage: e.target.value })
                  }
                  placeholder="https://beispiel.com/bild.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label>Titel</Label>
                <Input
                  value={content.title || ""}
                  onChange={(e) => updateContent({ title: e.target.value })}
                  placeholder="Ja, absolut!"
                />
              </div>
              <div className="space-y-2">
                <Label>Emoji/Logo</Label>
                <Input
                  value={content.emoji || ""}
                  onChange={(e) => updateContent({ emoji: e.target.value })}
                  placeholder="P"
                  className="text-center"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Overlay-Farbe</Label>
                  <Input
                    type="color"
                    value={content.overlayColor || "#f59e0b"}
                    onChange={(e) =>
                      updateContent({ overlayColor: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Overlay-Transparenz</Label>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={content.overlayOpacity || 80}
                    onChange={(e) =>
                      updateContent({
                        overlayOpacity: parseInt(e.target.value),
                      })
                    }
                  />
                  <div className="text-xs text-gray-500">
                    {content.overlayOpacity || 80}%
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  value={content.url || ""}
                  onChange={(e) => updateContent({ url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Style</Label>
              <Select
                value={content.variant}
                onValueChange={(value: EnhancedButtonBlockContent["variant"]) =>
                  updateContent({ variant: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primär (Blau)</SelectItem>
                  <SelectItem value="secondary">Sekundär (Grau)</SelectItem>
                  <SelectItem value="success">Erfolg (Grün)</SelectItem>
                  <SelectItem value="warning">Warnung (Gelb)</SelectItem>
                  <SelectItem value="danger">Gefahr (Rot)</SelectItem>
                  <SelectItem value="info">Info (Cyan)</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                  <SelectItem value="custom">Benutzerdefiniert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Hover-Effekt</Label>
              <Select
                value={content.effect}
                onValueChange={(value: EnhancedButtonBlockContent["effect"]) =>
                  updateContent({ effect: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scale">Vergrößern ⬆️</SelectItem>
                  <SelectItem value="bounce">Hüpfen 🦘</SelectItem>
                  <SelectItem value="pulse">Pulsieren 💗</SelectItem>
                  <SelectItem value="glow">Leuchten ✨</SelectItem>
                  <SelectItem value="flip">Drehen 🔄</SelectItem>
                  <SelectItem value="shake">Wackeln 📳</SelectItem>
                  <SelectItem value="rotate">Rotieren 🌪️</SelectItem>
                  <SelectItem value="slide">Gleiten 🎢</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Größe</Label>
              <Select
                value={content.size}
                onValueChange={(value: EnhancedButtonBlockContent["size"]) =>
                  updateContent({ size: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Klein</SelectItem>
                  <SelectItem value="md">Normal</SelectItem>
                  <SelectItem value="lg">Groß</SelectItem>
                  <SelectItem value="xl">Sehr groß</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Rundung</Label>
              <Select
                value={content.rounded}
                onValueChange={(value: EnhancedButtonBlockContent["rounded"]) =>
                  updateContent({ rounded: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Eckig</SelectItem>
                  <SelectItem value="sm">Leicht rund</SelectItem>
                  <SelectItem value="md">Rund</SelectItem>
                  <SelectItem value="lg">Sehr rund</SelectItem>
                  <SelectItem value="full">Rund wie Pille</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Schatten</Label>
              <Select
                value={content.shadow}
                onValueChange={(value: EnhancedButtonBlockContent["shadow"]) =>
                  updateContent({ shadow: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Kein Schatten</SelectItem>
                  <SelectItem value="sm">Klein</SelectItem>
                  <SelectItem value="md">Normal</SelectItem>
                  <SelectItem value="lg">Groß</SelectItem>
                  <SelectItem value="xl">Sehr groß</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {content.variant === "custom" && (
            <Card className="p-4">
              <h4 className="font-medium mb-3">Benutzerdefinierte Farben</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Hintergrund</Label>
                  <Input
                    type="color"
                    value={content.customStyle?.backgroundColor || "#3b82f6"}
                    onChange={(e) =>
                      updateCustomStyle({ backgroundColor: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Text</Label>
                  <Input
                    type="color"
                    value={content.customStyle?.textColor || "#ffffff"}
                    onChange={(e) =>
                      updateCustomStyle({ textColor: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rahmen</Label>
                  <Input
                    type="color"
                    value={content.customStyle?.borderColor || "#3b82f6"}
                    onChange={(e) =>
                      updateCustomStyle({ borderColor: e.target.value })
                    }
                  />
                </div>
              </div>

              {content.emoji && (
                <div className="space-y-2 mt-4">
                  <Label>Emoji-Größe</Label>
                  <Select
                    value={content.customStyle?.emojiSize || "md"}
                    onValueChange={(
                      value: NonNullable<
                        EnhancedButtonBlockContent["customStyle"]
                      >["emojiSize"],
                    ) => updateCustomStyle({ emojiSize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Klein</SelectItem>
                      <SelectItem value="md">Normal</SelectItem>
                      <SelectItem value="lg">Groß</SelectItem>
                      <SelectItem value="xl">Sehr groß</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </Card>
          )}
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <div className="space-y-2">
            <Label>Ausrichtung</Label>
            <Select
              value={content.alignment}
              onValueChange={(value: EnhancedButtonBlockContent["alignment"]) =>
                updateContent({ alignment: value })
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

          <div className="flex items-center space-x-2">
            <Switch
              checked={content.fullWidth || false}
              onCheckedChange={(checked) =>
                updateContent({ fullWidth: checked })
              }
            />
            <Label>Volle Breite</Label>
          </div>
        </TabsContent>
      </Tabs>

      {/* Block Styling Options */}
      <BlockStyleOptions
        styling={content.blockStyling}
        onUpdate={updateBlockStyling}
        blockType="Button"
      />

      {/* Preview */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">Vorschau</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`
            flex 
            ${content.alignment === "center" ? "justify-center" : ""}
            ${content.alignment === "right" ? "justify-end" : ""}
            ${content.alignment === "left" ? "justify-start" : ""}
          `}
          >
            {content.buttonType === "simple" && (
              <EnhancedButton
                emoji={content.emoji}
                variant={content.variant}
                size={content.size}
                effect={content.effect}
                rounded={content.rounded}
                shadow={content.shadow}
                customStyle={content.customStyle}
                className={content.fullWidth ? "w-full" : ""}
              >
                {content.text}
              </EnhancedButton>
            )}

            {content.buttonType === "infoCard" && (
              <InfoCardButton
                emoji={content.emoji || "ℹ️"}
                title={content.title || "Info"}
                description={content.description || "Beschreibung"}
                effect={content.effect}
                className={content.fullWidth ? "w-full" : "max-w-sm"}
              />
            )}

            {content.buttonType === "imageCard" && (
              <div
                className={`
                relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl
                ${content.fullWidth ? "w-full" : "w-80"}
                h-48 group
              `}
              >
                {/* Background Image */}
                {content.backgroundImage && (
                  <img
                    src={content.backgroundImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: content.overlayColor || "#f59e0b",
                    opacity: (content.overlayOpacity || 80) / 100,
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  {content.emoji && (
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                      {content.emoji}
                    </div>
                  )}
                  <h3 className="font-montserrat font-bold text-xl text-center">
                    {content.title || "Titel"}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { defaultButtonContent };
export type { EnhancedButtonBlockContent };
