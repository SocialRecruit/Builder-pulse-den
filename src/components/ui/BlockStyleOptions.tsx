import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Box, Shadow, Spacing } from "lucide-react";

export interface BlockStyling {
  // Container options
  hasContainer: boolean;
  containerStyle: "none" | "bordered" | "filled" | "gradient";

  // Spacing
  marginTop: number;
  marginBottom: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;

  // Colors
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;

  // Border and Shadow
  borderWidth: number;
  borderRadius: number;
  hasShadow: boolean;
  shadowSize: "sm" | "md" | "lg" | "xl" | "2xl";
  shadowColor?: string;

  // Advanced styling
  alignment: "left" | "center" | "right";
  maxWidth: "none" | "sm" | "md" | "lg" | "xl" | "full";
  animation?: "none" | "fadeIn" | "slideUp" | "slideLeft" | "scale";

  // Background options
  backgroundGradient?: {
    enabled: boolean;
    direction: "to-r" | "to-l" | "to-t" | "to-b" | "to-br" | "to-bl";
    from: string;
    to: string;
  };
}

interface BlockStyleOptionsProps {
  styling: BlockStyling;
  onUpdate: (styling: BlockStyling) => void;
  blockType?: string;
}

const defaultStyling: BlockStyling = {
  hasContainer: false,
  containerStyle: "none",
  marginTop: 16,
  marginBottom: 16,
  paddingTop: 16,
  paddingBottom: 16,
  paddingLeft: 16,
  paddingRight: 16,
  borderWidth: 0,
  borderRadius: 8,
  hasShadow: false,
  shadowSize: "md",
  alignment: "left",
  maxWidth: "full",
  animation: "none",
  backgroundGradient: {
    enabled: false,
    direction: "to-r",
    from: "#3b82f6",
    to: "#8b5cf6",
  },
};

export function BlockStyleOptions({
  styling,
  onUpdate,
  blockType,
}: BlockStyleOptionsProps) {
  const updateStyling = (updates: Partial<BlockStyling>) => {
    onUpdate({ ...styling, ...updates });
  };

  const updateGradient = (
    updates: Partial<BlockStyling["backgroundGradient"]>,
  ) => {
    onUpdate({
      ...styling,
      backgroundGradient: {
        ...styling.backgroundGradient,
        ...updates,
      } as BlockStyling["backgroundGradient"],
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Block-Styling
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="container" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="container" className="flex items-center gap-1">
              <Box className="w-3 h-3" />
              Container
            </TabsTrigger>
            <TabsTrigger value="spacing" className="flex items-center gap-1">
              <Spacing className="w-3 h-3" />
              Abstände
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-1">
              <Palette className="w-3 h-3" />
              Farben
            </TabsTrigger>
            <TabsTrigger value="effects" className="flex items-center gap-1">
              <Shadow className="w-3 h-3" />
              Effekte
            </TabsTrigger>
          </TabsList>

          <TabsContent value="container" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <Label>Container aktivieren</Label>
              <Switch
                checked={styling.hasContainer}
                onCheckedChange={(checked) =>
                  updateStyling({ hasContainer: checked })
                }
              />
            </div>

            {styling.hasContainer && (
              <>
                <div className="space-y-2">
                  <Label>Container-Stil</Label>
                  <Select
                    value={styling.containerStyle}
                    onValueChange={(value: BlockStyling["containerStyle"]) =>
                      updateStyling({ containerStyle: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Transparent</SelectItem>
                      <SelectItem value="bordered">Mit Rahmen</SelectItem>
                      <SelectItem value="filled">Gefüllt</SelectItem>
                      <SelectItem value="gradient">Gradient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rahmenbreite</Label>
                    <div className="px-3">
                      <Slider
                        value={[styling.borderWidth]}
                        onValueChange={([value]) =>
                          updateStyling({ borderWidth: value })
                        }
                        max={8}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {styling.borderWidth}px
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ecken-Radius</Label>
                    <div className="px-3">
                      <Slider
                        value={[styling.borderRadius]}
                        onValueChange={([value]) =>
                          updateStyling({ borderRadius: value })
                        }
                        max={32}
                        min={0}
                        step={2}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {styling.borderRadius}px
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Maximale Breite</Label>
                  <Select
                    value={styling.maxWidth}
                    onValueChange={(value: BlockStyling["maxWidth"]) =>
                      updateStyling({ maxWidth: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Keine Begrenzung</SelectItem>
                      <SelectItem value="sm">Klein (640px)</SelectItem>
                      <SelectItem value="md">Mittel (768px)</SelectItem>
                      <SelectItem value="lg">Groß (1024px)</SelectItem>
                      <SelectItem value="xl">Sehr groß (1280px)</SelectItem>
                      <SelectItem value="full">Volle Breite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Ausrichtung</Label>
              <Select
                value={styling.alignment}
                onValueChange={(value: BlockStyling["alignment"]) =>
                  updateStyling({ alignment: value })
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
          </TabsContent>

          <TabsContent value="spacing" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h4 className="font-medium">Außenabstände (Margin)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Oben</Label>
                  <div className="px-3">
                    <Slider
                      value={[styling.marginTop]}
                      onValueChange={([value]) =>
                        updateStyling({ marginTop: value })
                      }
                      max={128}
                      min={0}
                      step={4}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {styling.marginTop}px
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Unten</Label>
                  <div className="px-3">
                    <Slider
                      value={[styling.marginBottom]}
                      onValueChange={([value]) =>
                        updateStyling({ marginBottom: value })
                      }
                      max={128}
                      min={0}
                      step={4}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {styling.marginBottom}px
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Innenabstände (Padding)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Oben/Unten</Label>
                  <div className="px-3">
                    <Slider
                      value={[styling.paddingTop]}
                      onValueChange={([value]) =>
                        updateStyling({
                          paddingTop: value,
                          paddingBottom: value,
                        })
                      }
                      max={64}
                      min={0}
                      step={4}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {styling.paddingTop}px
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Links/Rechts</Label>
                  <div className="px-3">
                    <Slider
                      value={[styling.paddingLeft]}
                      onValueChange={([value]) =>
                        updateStyling({
                          paddingLeft: value,
                          paddingRight: value,
                        })
                      }
                      max={64}
                      min={0}
                      step={4}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {styling.paddingLeft}px
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4 mt-4">
            <div className="space-y-4">
              {styling.hasContainer && (
                <>
                  <div className="space-y-2">
                    <Label>Hintergrundfarbe</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={styling.backgroundColor || "#ffffff"}
                        onChange={(e) =>
                          updateStyling({ backgroundColor: e.target.value })
                        }
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input
                        value={styling.backgroundColor || "#ffffff"}
                        onChange={(e) =>
                          updateStyling({ backgroundColor: e.target.value })
                        }
                        placeholder="#ffffff"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {styling.borderWidth > 0 && (
                    <div className="space-y-2">
                      <Label>Rahmenfarbe</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={styling.borderColor || "#e5e7eb"}
                          onChange={(e) =>
                            updateStyling({ borderColor: e.target.value })
                          }
                          className="w-12 h-10 p-1 border rounded"
                        />
                        <Input
                          value={styling.borderColor || "#e5e7eb"}
                          onChange={(e) =>
                            updateStyling({ borderColor: e.target.value })
                          }
                          placeholder="#e5e7eb"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="space-y-2">
                <Label>Textfarbe</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styling.textColor || "#000000"}
                    onChange={(e) =>
                      updateStyling({ textColor: e.target.value })
                    }
                    className="w-12 h-10 p-1 border rounded"
                  />
                  <Input
                    value={styling.textColor || "#000000"}
                    onChange={(e) =>
                      updateStyling({ textColor: e.target.value })
                    }
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>

              {styling.hasContainer &&
                styling.containerStyle === "gradient" && (
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label>Gradient aktivieren</Label>
                      <Switch
                        checked={styling.backgroundGradient?.enabled || false}
                        onCheckedChange={(checked) =>
                          updateGradient({ enabled: checked })
                        }
                      />
                    </div>

                    {styling.backgroundGradient?.enabled && (
                      <>
                        <div className="space-y-2">
                          <Label>Gradient-Richtung</Label>
                          <Select
                            value={styling.backgroundGradient.direction}
                            onValueChange={(
                              value: BlockStyling["backgroundGradient"]["direction"],
                            ) => updateGradient({ direction: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="to-r">
                                Links → Rechts
                              </SelectItem>
                              <SelectItem value="to-l">
                                Rechts → Links
                              </SelectItem>
                              <SelectItem value="to-t">Unten → Oben</SelectItem>
                              <SelectItem value="to-b">Oben → Unten</SelectItem>
                              <SelectItem value="to-br">
                                Links oben → Rechts unten
                              </SelectItem>
                              <SelectItem value="to-bl">
                                Rechts oben → Links unten
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Von Farbe</Label>
                            <Input
                              type="color"
                              value={styling.backgroundGradient.from}
                              onChange={(e) =>
                                updateGradient({ from: e.target.value })
                              }
                              className="w-full h-10 p-1 border rounded"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Zu Farbe</Label>
                            <Input
                              type="color"
                              value={styling.backgroundGradient.to}
                              onChange={(e) =>
                                updateGradient({ to: e.target.value })
                              }
                              className="w-full h-10 p-1 border rounded"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <Label>Schatten aktivieren</Label>
              <Switch
                checked={styling.hasShadow}
                onCheckedChange={(checked) =>
                  updateStyling({ hasShadow: checked })
                }
              />
            </div>

            {styling.hasShadow && (
              <>
                <div className="space-y-2">
                  <Label>Schattengrößße</Label>
                  <Select
                    value={styling.shadowSize}
                    onValueChange={(value: BlockStyling["shadowSize"]) =>
                      updateStyling({ shadowSize: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Klein</SelectItem>
                      <SelectItem value="md">Mittel</SelectItem>
                      <SelectItem value="lg">Groß</SelectItem>
                      <SelectItem value="xl">Sehr groß</SelectItem>
                      <SelectItem value="2xl">Riesig</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Schattenfarbe</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={styling.shadowColor || "#000000"}
                      onChange={(e) =>
                        updateStyling({ shadowColor: e.target.value })
                      }
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={styling.shadowColor || "#000000"}
                      onChange={(e) =>
                        updateStyling({ shadowColor: e.target.value })
                      }
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Animation</Label>
              <Select
                value={styling.animation || "none"}
                onValueChange={(value: BlockStyling["animation"]) =>
                  updateStyling({ animation: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Keine</SelectItem>
                  <SelectItem value="fadeIn">Einblenden</SelectItem>
                  <SelectItem value="slideUp">Von unten</SelectItem>
                  <SelectItem value="slideLeft">Von links</SelectItem>
                  <SelectItem value="scale">Vergrößern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        {/* Preview */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <Label className="text-xs text-gray-600 mb-2 block">Vorschau</Label>
          <div
            className={`
              transition-all duration-300 relative
              ${styling.hasContainer ? "border" : ""} 
              ${styling.hasShadow ? `shadow-${styling.shadowSize}` : ""}
              ${styling.alignment === "center" ? "mx-auto" : ""}
              ${styling.alignment === "right" ? "ml-auto" : ""}
              ${styling.maxWidth !== "none" && styling.maxWidth !== "full" ? `max-w-${styling.maxWidth}` : ""}
              ${styling.animation === "fadeIn" ? "animate-fade-in" : ""}
              ${styling.animation === "slideUp" ? "animate-slide-up" : ""}
              ${styling.animation === "slideLeft" ? "animate-slide-left" : ""}
              ${styling.animation === "scale" ? "animate-scale" : ""}
            `}
            style={{
              marginTop: `${styling.marginTop}px`,
              marginBottom: `${styling.marginBottom}px`,
              paddingTop: `${styling.paddingTop}px`,
              paddingBottom: `${styling.paddingBottom}px`,
              paddingLeft: `${styling.paddingLeft}px`,
              paddingRight: `${styling.paddingRight}px`,
              borderWidth: `${styling.borderWidth}px`,
              borderRadius: `${styling.borderRadius}px`,
              backgroundColor:
                styling.hasContainer &&
                styling.containerStyle === "gradient" &&
                styling.backgroundGradient?.enabled
                  ? undefined
                  : styling.backgroundColor,
              borderColor: styling.borderColor,
              color: styling.textColor,
              backgroundImage:
                styling.hasContainer &&
                styling.containerStyle === "gradient" &&
                styling.backgroundGradient?.enabled
                  ? `linear-gradient(${styling.backgroundGradient.direction}, ${styling.backgroundGradient.from}, ${styling.backgroundGradient.to})`
                  : undefined,
              boxShadow:
                styling.hasShadow && styling.shadowColor
                  ? `0 10px 25px -5px ${styling.shadowColor}40, 0 4px 6px -2px ${styling.shadowColor}20`
                  : undefined,
            }}
          >
            <div className="font-montserrat">
              Beispiel {blockType || "Block"} Inhalt
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { defaultStyling };
export type { BlockStyling };
