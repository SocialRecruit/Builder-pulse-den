import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  GripVertical,
  Move,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Upload,
  Code,
  Send,
} from "lucide-react";
import { ContentBlock } from "@/types/landing-page";
import { DragDropUpload } from "./DragDropUpload";

interface AdvancedBlockEditorProps {
  block: ContentBlock;
  onUpdate: (content: any) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const AdvancedBlockEditor = ({
  block,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: AdvancedBlockEditorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getBlockTitle = () => {
    switch (block.type) {
      case "heading":
        return `Überschrift H${block.content.level}: "${block.content.text}"`;
      case "text":
        return `Text: "${block.content.text.substring(0, 50)}${block.content.text.length > 50 ? "..." : ""}"`;
      case "richtext":
        return "Rich Text Editor";
      case "image":
        return `Bild: ${block.content.alt || "Ohne Alt-Text"}`;
      case "button":
        return `Button: "${block.content.text}"`;
      case "form":
        return "Bewerbungsformular";
      case "sourcecode":
        return "Quelltext Block";
      case "spacer":
        return `Abstand: ${block.content.height}px`;
      default:
        return "Unbekannter Block";
    }
  };

  const getBlockIcon = () => {
    switch (block.type) {
      case "heading":
        return "📝";
      case "text":
        return "📄";
      case "richtext":
        return "✏️";
      case "image":
        return "🖼️";
      case "button":
        return "🔘";
      case "form":
        return "📋";
      case "sourcecode":
        return "💻";
      case "spacer":
        return "📏";
      default:
        return "❓";
    }
  };

  return (
    <Card className="group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
            <span className="text-lg">{getBlockIcon()}</span>
            <div className="flex-1">
              <CardTitle className="text-sm">{getBlockTitle()}</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">
                {block.type.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onMoveUp && (
              <Button variant="ghost" size="sm" onClick={onMoveUp}>
                ↑
              </Button>
            )}
            {onMoveDown && (
              <Button variant="ghost" size="sm" onClick={onMoveDown}>
                ↓
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "−" : "+"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          {block.type === "heading" && (
            <HeadingEditor content={block.content} onUpdate={onUpdate} />
          )}
          {block.type === "text" && (
            <TextEditor content={block.content} onUpdate={onUpdate} />
          )}
          {block.type === "richtext" && (
            <RichTextEditor content={block.content} onUpdate={onUpdate} />
          )}
          {block.type === "image" && (
            <ImageEditor content={block.content} onUpdate={onUpdate} />
          )}
          {block.type === "button" && (
            <ButtonEditor content={block.content} onUpdate={onUpdate} />
          )}
          {block.type === "form" && (
            <FormEditor content={block.content} onUpdate={onUpdate} />
          )}
          {block.type === "sourcecode" && (
            <SourceCodeEditor content={block.content} onUpdate={onUpdate} />
          )}
          {block.type === "spacer" && (
            <SpacerEditor content={block.content} onUpdate={onUpdate} />
          )}
        </CardContent>
      )}
    </Card>
  );
};

// Heading Editor Component
const HeadingEditor = ({
  content,
  onUpdate,
}: {
  content: any;
  onUpdate: (content: any) => void;
}) => {
  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Inhalt</TabsTrigger>
        <TabsTrigger value="design">Design</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4">
        <div className="space-y-2">
          <Label>Überschrift</Label>
          <Input
            value={content.text || ""}
            onChange={(e) => onUpdate({ ...content, text: e.target.value })}
            placeholder="Überschrift eingeben..."
          />
        </div>

        <div className="space-y-2">
          <Label>Größe</Label>
          <Select
            value={content.level?.toString() || "2"}
            onValueChange={(value) =>
              onUpdate({ ...content, level: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">H1 - Sehr groß</SelectItem>
              <SelectItem value="2">H2 - Groß</SelectItem>
              <SelectItem value="3">H3 - Mittel</SelectItem>
              <SelectItem value="4">H4 - Klein</SelectItem>
              <SelectItem value="5">H5 - Sehr klein</SelectItem>
              <SelectItem value="6">H6 - Minimal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TabsContent>

      <TabsContent value="design" className="space-y-4">
        <div className="space-y-2">
          <Label>Ausrichtung</Label>
          <div className="flex gap-2">
            <Button
              variant={content.alignment === "left" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "left" })}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={content.alignment === "center" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "center" })}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={content.alignment === "right" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "right" })}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Farbe</Label>
          <Input
            type="color"
            value={content.color || "#000000"}
            onChange={(e) => onUpdate({ ...content, color: e.target.value })}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

// Text Editor Component
const TextEditor = ({
  content,
  onUpdate,
}: {
  content: any;
  onUpdate: (content: any) => void;
}) => {
  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Inhalt</TabsTrigger>
        <TabsTrigger value="design">Design</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4">
        <div className="space-y-2">
          <Label>Text</Label>
          <Textarea
            value={content.text || ""}
            onChange={(e) => onUpdate({ ...content, text: e.target.value })}
            placeholder="Text eingeben..."
            rows={4}
          />
        </div>
      </TabsContent>

      <TabsContent value="design" className="space-y-4">
        <div className="space-y-2">
          <Label>Ausrichtung</Label>
          <div className="flex gap-2">
            <Button
              variant={content.alignment === "left" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "left" })}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={content.alignment === "center" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "center" })}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={content.alignment === "right" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "right" })}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Schriftgröße</Label>
          <Select
            value={content.fontSize || "base"}
            onValueChange={(value) => onUpdate({ ...content, fontSize: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Klein</SelectItem>
              <SelectItem value="base">Normal</SelectItem>
              <SelectItem value="lg">Groß</SelectItem>
              <SelectItem value="xl">Sehr groß</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TabsContent>
    </Tabs>
  );
};

// Rich Text Editor Component
const RichTextEditor = ({
  content,
  onUpdate,
}: {
  content: any;
  onUpdate: (content: any) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Rich Text (HTML)</Label>
        <div className="border rounded-md">
          <div className="flex gap-1 p-2 border-b bg-gray-50">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const selection = window.getSelection()?.toString();
                const newHtml = content.html.replace(
                  selection || "",
                  `<strong>${selection}</strong>`,
                );
                onUpdate({ ...content, html: newHtml });
              }}
            >
              <strong>B</strong>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const selection = window.getSelection()?.toString();
                const newHtml = content.html.replace(
                  selection || "",
                  `<em>${selection}</em>`,
                );
                onUpdate({ ...content, html: newHtml });
              }}
            >
              <em>I</em>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newHtml = content.html + "<br>";
                onUpdate({ ...content, html: newHtml });
              }}
            >
              BR
            </Button>
          </div>
          <Textarea
            value={content.html || ""}
            onChange={(e) => onUpdate({ ...content, html: e.target.value })}
            placeholder="<p>Formatierter Text mit HTML...</p>"
            rows={6}
            className="border-0 font-mono text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Vorschau</Label>
        <div
          className="border rounded-md p-3 min-h-[60px] bg-gray-50"
          dangerouslySetInnerHTML={{
            __html:
              content.html ||
              '<p class="text-gray-400">Vorschau erscheint hier...</p>',
          }}
        />
      </div>
    </div>
  );
};

// Image Editor Component
const ImageEditor = ({
  content,
  onUpdate,
}: {
  content: any;
  onUpdate: (content: any) => void;
}) => {
  return (
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="library">Bibliothek</TabsTrigger>
        <TabsTrigger value="settings">Einstellungen</TabsTrigger>
      </TabsList>

      <TabsContent value="upload" className="space-y-4">
        <div className="space-y-2">
          <Label>Bild hochladen</Label>
          <DragDropUpload
            value={content.src}
            onChange={(url) => onUpdate({ ...content, src: url })}
          />
        </div>
      </TabsContent>

      <TabsContent value="library" className="space-y-4">
        <div className="space-y-2">
          <Label>Aus Bildbibliothek wählen</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
              "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop",
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
              "https://images.unsplash.com/photo-1554774853-719586f82d77?w=400&h=300&fit=crop",
            ].map((src, index) => (
              <div
                key={index}
                className="cursor-pointer border-2 border-transparent hover:border-blue-500 rounded"
                onClick={() => onUpdate({ ...content, src })}
              >
                <img
                  src={src}
                  alt={`Stock ${index + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="settings" className="space-y-4">
        <div className="space-y-2">
          <Label>Alt-Text</Label>
          <Input
            value={content.alt || ""}
            onChange={(e) => onUpdate({ ...content, alt: e.target.value })}
            placeholder="Beschreibung für Screenreader..."
          />
        </div>

        <div className="space-y-2">
          <Label>Bildunterschrift</Label>
          <Input
            value={content.caption || ""}
            onChange={(e) => onUpdate({ ...content, caption: e.target.value })}
            placeholder="Bildunterschrift..."
          />
        </div>

        <div className="space-y-2">
          <Label>Größe</Label>
          <Select
            value={content.size || "normal"}
            onValueChange={(value) => onUpdate({ ...content, size: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Klein (300px)</SelectItem>
              <SelectItem value="normal">Normal (600px)</SelectItem>
              <SelectItem value="large">Groß (900px)</SelectItem>
              <SelectItem value="fullwidth">Volle Breite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Ausrichtung</Label>
          <div className="flex gap-2">
            <Button
              variant={content.alignment === "left" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "left" })}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={content.alignment === "center" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "center" })}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={content.alignment === "right" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "right" })}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

// Button Editor Component
const ButtonEditor = ({
  content,
  onUpdate,
}: {
  content: any;
  onUpdate: (content: any) => void;
}) => {
  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Inhalt</TabsTrigger>
        <TabsTrigger value="design">Design</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4">
        <div className="space-y-2">
          <Label>Button-Text</Label>
          <Input
            value={content.text || ""}
            onChange={(e) => onUpdate({ ...content, text: e.target.value })}
            placeholder="Button-Text eingeben..."
          />
        </div>

        <div className="space-y-2">
          <Label>URL/Link</Label>
          <Input
            value={content.url || ""}
            onChange={(e) => onUpdate({ ...content, url: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <Label>Aktion</Label>
          <Select
            value={content.action || "link"}
            onValueChange={(value) => onUpdate({ ...content, action: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="link">Zu URL weiterleiten</SelectItem>
              <SelectItem value="apply">Bewerbungsformular öffnen</SelectItem>
              <SelectItem value="scroll">
                Zum nächsten Abschnitt scrollen
              </SelectItem>
              <SelectItem value="download">Datei herunterladen</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TabsContent>

      <TabsContent value="design" className="space-y-4">
        <div className="space-y-2">
          <Label>Button-Style</Label>
          <Select
            value={content.variant || "primary"}
            onValueChange={(value) => onUpdate({ ...content, variant: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primär (Blau)</SelectItem>
              <SelectItem value="secondary">Sekundär (Grau)</SelectItem>
              <SelectItem value="success">Erfolgreich (Grün)</SelectItem>
              <SelectItem value="warning">Warnung (Orange)</SelectItem>
              <SelectItem value="danger">Gefahr (Rot)</SelectItem>
              <SelectItem value="outline">Umriss</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Größe</Label>
          <Select
            value={content.size || "normal"}
            onValueChange={(value) => onUpdate({ ...content, size: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Klein</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="large">Groß</SelectItem>
              <SelectItem value="xl">Sehr groß</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Ausrichtung</Label>
          <div className="flex gap-2">
            <Button
              variant={content.alignment === "left" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "left" })}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={content.alignment === "center" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "center" })}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={content.alignment === "right" ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ ...content, alignment: "right" })}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={content.fullWidth || false}
            onCheckedChange={(checked) =>
              onUpdate({ ...content, fullWidth: checked })
            }
          />
          <Label>Volle Breite</Label>
        </div>
      </TabsContent>
    </Tabs>
  );
};

// Form Editor Component
const FormEditor = ({
  content,
  onUpdate,
}: {
  content: any;
  onUpdate: (content: any) => void;
}) => {
  return (
    <Tabs defaultValue="builder" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="builder">Formular Builder</TabsTrigger>
        <TabsTrigger value="embed">Embed Code</TabsTrigger>
      </TabsList>

      <TabsContent value="builder" className="space-y-4">
        <div className="space-y-2">
          <Label>Formular-Titel</Label>
          <Input
            value={content.title || ""}
            onChange={(e) => onUpdate({ ...content, title: e.target.value })}
            placeholder="Bewerbungsformular"
          />
        </div>

        <div className="space-y-2">
          <Label>E-Mail für Bewerbungen</Label>
          <Input
            type="email"
            value={content.email || ""}
            onChange={(e) => onUpdate({ ...content, email: e.target.value })}
            placeholder="bewerbung@firma.de"
          />
        </div>

        <div className="space-y-2">
          <Label>Formular-Felder</Label>
          <div className="space-y-2">
            {(content.fields || []).map((field: any, index: number) => (
              <div
                key={index}
                className="flex gap-2 items-center p-2 border rounded"
              >
                <Input
                  value={field.label}
                  onChange={(e) => {
                    const newFields = [...(content.fields || [])];
                    newFields[index] = { ...field, label: e.target.value };
                    onUpdate({ ...content, fields: newFields });
                  }}
                  placeholder="Feldname"
                />
                <Select
                  value={field.type}
                  onValueChange={(value) => {
                    const newFields = [...(content.fields || [])];
                    newFields[index] = { ...field, type: value };
                    onUpdate({ ...content, fields: newFields });
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">E-Mail</SelectItem>
                    <SelectItem value="tel">Telefon</SelectItem>
                    <SelectItem value="textarea">Textbereich</SelectItem>
                    <SelectItem value="file">Datei</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newFields = content.fields.filter(
                      (_: any, i: number) => i !== index,
                    );
                    onUpdate({ ...content, fields: newFields });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                const newFields = [
                  ...(content.fields || []),
                  { label: "Neues Feld", type: "text", required: false },
                ];
                onUpdate({ ...content, fields: newFields });
              }}
            >
              + Feld hinzufügen
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="embed" className="space-y-4">
        <div className="space-y-2">
          <Label>Embed Code (z.B. von FunnelForms.app)</Label>
          <Textarea
            value={content.embedCode || ""}
            onChange={(e) =>
              onUpdate({ ...content, embedCode: e.target.value })
            }
            placeholder='<script src="https://funnelforms.app/embed/..."></script>'
            rows={6}
            className="font-mono text-sm"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

// Source Code Editor Component
const SourceCodeEditor = ({
  content,
  onUpdate,
}: {
  content: any;
  onUpdate: (content: any) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Quelltext (HTML/CSS/JavaScript)</Label>
        <Textarea
          value={content.code || ""}
          onChange={(e) => onUpdate({ ...content, code: e.target.value })}
          placeholder="<div>Ihr HTML Code hier...</div>"
          rows={8}
          className="font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label>Code-Typ</Label>
        <Select
          value={content.language || "html"}
          onValueChange={(value) => onUpdate({ ...content, language: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="iframe">iFrame Embed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={content.sandbox || false}
          onCheckedChange={(checked) =>
            onUpdate({ ...content, sandbox: checked })
          }
        />
        <Label>Sandbox-Modus (Sicherheit)</Label>
      </div>
    </div>
  );
};

// Spacer Editor Component
const SpacerEditor = ({
  content,
  onUpdate,
}: {
  content: any;
  onUpdate: (content: any) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Höhe (in Pixel)</Label>
        <Input
          type="number"
          value={content.height || 40}
          onChange={(e) =>
            onUpdate({ ...content, height: parseInt(e.target.value) || 40 })
          }
          min="10"
          max="500"
        />
      </div>

      <div className="space-y-2">
        <Label>Hintergrundfarbe (optional)</Label>
        <Input
          type="color"
          value={content.backgroundColor || "#ffffff"}
          onChange={(e) =>
            onUpdate({ ...content, backgroundColor: e.target.value })
          }
        />
      </div>
    </div>
  );
};
