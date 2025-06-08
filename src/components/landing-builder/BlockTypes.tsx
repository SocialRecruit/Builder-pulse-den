import { useState } from "react";
import {
  ContentBlock,
  HeadingBlock,
  TextBlock,
  RichTextBlock,
  ImageBlock,
  ButtonBlock,
  FormBlock,
  SpacerBlock,
} from "@/types/landing-page";
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
import { Trash2, GripVertical } from "lucide-react";
import { DragDropUpload } from "./DragDropUpload";
import { cn } from "@/lib/utils";

interface BlockEditorProps {
  block: ContentBlock;
  onUpdate: (content: any) => void;
  onDelete: () => void;
  className?: string;
}

export const BlockEditor = ({
  block,
  onUpdate,
  onDelete,
  className,
}: BlockEditorProps) => {
  const renderEditor = () => {
    switch (block.type) {
      case "heading":
        return <HeadingEditor content={block.content} onUpdate={onUpdate} />;
      case "text":
        return <TextEditor content={block.content} onUpdate={onUpdate} />;
      case "richtext":
        return <RichTextEditor content={block.content} onUpdate={onUpdate} />;
      case "image":
        return <ImageEditor content={block.content} onUpdate={onUpdate} />;
      case "button":
        return <ButtonEditor content={block.content} onUpdate={onUpdate} />;
      case "form":
        return <FormEditor content={block.content} onUpdate={onUpdate} />;
      case "spacer":
        return <SpacerEditor content={block.content} onUpdate={onUpdate} />;
      default:
        return <div>Unbekannter Block-Typ</div>;
    }
  };

  const getBlockTitle = () => {
    switch (block.type) {
      case "heading":
        return "Überschrift";
      case "text":
        return "Text";
      case "richtext":
        return "Rich Text";
      case "image":
        return "Bild";
      case "button":
        return "Button";
      case "form":
        return "Formular";
      case "spacer":
        return "Abstand";
      default:
        return "Block";
    }
  };

  return (
    <Card className={cn("group", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
          {getBlockTitle()}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pt-2">{renderEditor()}</CardContent>
    </Card>
  );
};

const HeadingEditor = ({
  content,
  onUpdate,
}: {
  content: HeadingBlock;
  onUpdate: (content: HeadingBlock) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Überschrift</Label>
        <Input
          value={content.text}
          onChange={(e) => onUpdate({ ...content, text: e.target.value })}
          placeholder="Überschrift eingeben..."
        />
      </div>
      <div className="space-y-2">
        <Label>Größe</Label>
        <Select
          value={content.level.toString()}
          onValueChange={(value) =>
            onUpdate({
              ...content,
              level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6,
            })
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
    </div>
  );
};

const TextEditor = ({
  content,
  onUpdate,
}: {
  content: TextBlock;
  onUpdate: (content: TextBlock) => void;
}) => {
  return (
    <div className="space-y-2">
      <Label>Text</Label>
      <Textarea
        value={content.text}
        onChange={(e) => onUpdate({ ...content, text: e.target.value })}
        placeholder="Text eingeben..."
        rows={4}
      />
    </div>
  );
};

const RichTextEditor = ({
  content,
  onUpdate,
}: {
  content: RichTextBlock;
  onUpdate: (content: RichTextBlock) => void;
}) => {
  return (
    <div className="space-y-2">
      <Label>Rich Text (HTML)</Label>
      <Textarea
        value={content.html}
        onChange={(e) => onUpdate({ ...content, html: e.target.value })}
        placeholder="<p>Formatierter Text mit HTML...</p>"
        rows={6}
        className="font-mono text-sm"
      />
    </div>
  );
};

const ImageEditor = ({
  content,
  onUpdate,
}: {
  content: ImageBlock;
  onUpdate: (content: ImageBlock) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Bild</Label>
        <DragDropUpload
          value={content.src}
          onChange={(url) => onUpdate({ ...content, src: url })}
        />
      </div>
      <div className="space-y-2">
        <Label>Alt-Text</Label>
        <Input
          value={content.alt}
          onChange={(e) => onUpdate({ ...content, alt: e.target.value })}
          placeholder="Beschreibung für Screenreader..."
        />
      </div>
      <div className="space-y-2">
        <Label>Bildunterschrift (optional)</Label>
        <Input
          value={content.caption || ""}
          onChange={(e) => onUpdate({ ...content, caption: e.target.value })}
          placeholder="Bildunterschrift..."
        />
      </div>
    </div>
  );
};

const ButtonEditor = ({
  content,
  onUpdate,
}: {
  content: ButtonBlock;
  onUpdate: (content: ButtonBlock) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Button-Text</Label>
        <Input
          value={content.text}
          onChange={(e) => onUpdate({ ...content, text: e.target.value })}
          placeholder="Button-Text eingeben..."
        />
      </div>
      <div className="space-y-2">
        <Label>Button-Typ</Label>
        <Select
          value={content.type}
          onValueChange={(value) =>
            onUpdate({ ...content, type: value as ButtonBlock["type"] })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apply">Bewerbung</SelectItem>
            <SelectItem value="pagebreak">Seitenumbruch</SelectItem>
            <SelectItem value="submit">Formular absenden</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Button-Style</Label>
        <Select
          value={content.style}
          onValueChange={(value) =>
            onUpdate({ ...content, style: value as ButtonBlock["style"] })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primär (Grün)</SelectItem>
            <SelectItem value="secondary">Sekundär (Grau)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {content.type === "apply" && (
        <div className="space-y-2">
          <Label>URL</Label>
          <Input
            value={content.url || ""}
            onChange={(e) => onUpdate({ ...content, url: e.target.value })}
            placeholder="https://..."
          />
        </div>
      )}
    </div>
  );
};

const FormEditor = ({
  content,
  onUpdate,
}: {
  content: FormBlock;
  onUpdate: (content: FormBlock) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Embed-Code</Label>
        <Textarea
          value={content.embedCode}
          onChange={(e) => onUpdate({ ...content, embedCode: e.target.value })}
          placeholder="<script>...</script> oder <iframe>...</iframe>"
          rows={6}
          className="font-mono text-sm"
        />
      </div>
      <div className="space-y-2">
        <Label>Anbieter</Label>
        <Select
          value={content.provider}
          onValueChange={(value) =>
            onUpdate({ ...content, provider: value as FormBlock["provider"] })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="funnelforms">FunnelForms.app</SelectItem>
            <SelectItem value="custom">Benutzerdefiniert</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const SpacerEditor = ({
  content,
  onUpdate,
}: {
  content: SpacerBlock;
  onUpdate: (content: SpacerBlock) => void;
}) => {
  return (
    <div className="space-y-2">
      <Label>Höhe (in Pixel)</Label>
      <Input
        type="number"
        value={content.height}
        onChange={(e) =>
          onUpdate({ ...content, height: parseInt(e.target.value) || 40 })
        }
        min="10"
        max="200"
      />
    </div>
  );
};
