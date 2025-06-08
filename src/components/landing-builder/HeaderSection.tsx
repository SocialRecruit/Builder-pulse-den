import { LandingPageHeader } from "@/types/landing-page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropUpload } from "./DragDropUpload";

interface HeaderSectionProps {
  header: LandingPageHeader;
  onUpdate: (header: LandingPageHeader) => void;
  isEditing?: boolean;
}

export const HeaderSection = ({
  header,
  onUpdate,
  isEditing = false,
}: HeaderSectionProps) => {
  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Header-Bereich</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Seitentitel</Label>
            <Input
              value={header.title}
              onChange={(e) => onUpdate({ ...header, title: e.target.value })}
              placeholder="Seitentitel eingeben..."
            />
          </div>

          <div className="space-y-2">
            <Label>Header-Bild</Label>
            <DragDropUpload
              value={header.image}
              onChange={(url) => onUpdate({ ...header, image: url })}
            />
          </div>

          <div className="space-y-2">
            <Label>Header-Text</Label>
            <Textarea
              value={header.text}
              onChange={(e) => onUpdate({ ...header, text: e.target.value })}
              placeholder="Header-Text eingeben..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Rendering view
  return (
    <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 text-white">
      {header.image && (
        <div className="absolute inset-0">
          <img
            src={header.image}
            alt={header.title}
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      )}

      <div className="relative container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{header.title}</h1>

        {header.text && (
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {header.text}
          </p>
        )}
      </div>
    </div>
  );
};
