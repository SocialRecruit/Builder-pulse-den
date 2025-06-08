import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EnhancedButton, InfoCardButton } from "@/components/ui/EnhancedButton";
import { Palette, Sparkles, CheckCircle } from "lucide-react";

export interface ButtonTemplate {
  id: string;
  name: string;
  category: "cta" | "info" | "social" | "action";
  preview: React.ReactNode;
  config: {
    text: string;
    emoji?: string;
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
    buttonType?: "simple" | "infoCard";
    title?: string;
    description?: string;
    customStyle?: any;
  };
}

const buttonTemplates: ButtonTemplate[] = [
  {
    id: "cta-primary",
    name: "Jetzt bewerben",
    category: "cta",
    preview: (
      <EnhancedButton
        emoji="🎯"
        variant="primary"
        size="lg"
        effect="scale"
        rounded="lg"
        shadow="lg"
      >
        Jetzt bewerben
      </EnhancedButton>
    ),
    config: {
      text: "Jetzt bewerben",
      emoji: "🎯",
      variant: "primary",
      size: "lg",
      effect: "scale",
      rounded: "lg",
      shadow: "lg",
    },
  },
  {
    id: "cta-gradient",
    name: "Bewerbung senden",
    category: "cta",
    preview: (
      <EnhancedButton
        emoji="📧"
        variant="gradient"
        size="lg"
        effect="glow"
        rounded="full"
        shadow="xl"
      >
        Bewerbung senden
      </EnhancedButton>
    ),
    config: {
      text: "Bewerbung senden",
      emoji: "📧",
      variant: "gradient",
      size: "lg",
      effect: "glow",
      rounded: "full",
      shadow: "xl",
    },
  },
  {
    id: "info-more",
    name: "Mehr erfahren",
    category: "info",
    preview: (
      <InfoCardButton
        emoji="ℹ️"
        title="Mehr erfahren"
        description="Entdecke alle Details über unsere Stellenangebote"
        effect="scale"
        className="max-w-xs"
      />
    ),
    config: {
      text: "Mehr erfahren",
      emoji: "ℹ️",
      variant: "primary",
      size: "lg",
      effect: "scale",
      rounded: "lg",
      shadow: "lg",
      buttonType: "infoCard",
      title: "Mehr erfahren",
      description: "Entdecke alle Details über unsere Stellenangebote",
    },
  },
  {
    id: "info-benefits",
    name: "Vorteile ansehen",
    category: "info",
    preview: (
      <InfoCardButton
        emoji="✨"
        title="Unsere Vorteile"
        description="Entdecke was wir dir bieten können"
        effect="glow"
        className="max-w-xs"
      />
    ),
    config: {
      text: "Unsere Vorteile",
      emoji: "✨",
      variant: "success",
      size: "lg",
      effect: "glow",
      rounded: "lg",
      shadow: "lg",
      buttonType: "infoCard",
      title: "Unsere Vorteile",
      description: "Entdecke was wir dir bieten können",
    },
  },
  {
    id: "contact-call",
    name: "Anrufen",
    category: "action",
    preview: (
      <EnhancedButton
        emoji="📞"
        variant="success"
        size="lg"
        effect="bounce"
        rounded="lg"
        shadow="md"
      >
        Jetzt anrufen
      </EnhancedButton>
    ),
    config: {
      text: "Jetzt anrufen",
      emoji: "📞",
      variant: "success",
      size: "lg",
      effect: "bounce",
      rounded: "lg",
      shadow: "md",
    },
  },
  {
    id: "contact-whatsapp",
    name: "WhatsApp",
    category: "social",
    preview: (
      <EnhancedButton
        emoji="💬"
        variant="custom"
        size="lg"
        effect="pulse"
        rounded="lg"
        shadow="lg"
        customStyle={{
          backgroundColor: "#25D366",
          textColor: "#ffffff",
          borderColor: "#25D366",
        }}
      >
        WhatsApp
      </EnhancedButton>
    ),
    config: {
      text: "WhatsApp",
      emoji: "💬",
      variant: "custom",
      size: "lg",
      effect: "pulse",
      rounded: "lg",
      shadow: "lg",
      customStyle: {
        backgroundColor: "#25D366",
        textColor: "#ffffff",
        borderColor: "#25D366",
      },
    },
  },
  {
    id: "download-pdf",
    name: "PDF Download",
    category: "action",
    preview: (
      <EnhancedButton
        emoji="📄"
        variant="secondary"
        size="md"
        effect="slide"
        rounded="md"
        shadow="sm"
      >
        PDF herunterladen
      </EnhancedButton>
    ),
    config: {
      text: "PDF herunterladen",
      emoji: "📄",
      variant: "secondary",
      size: "md",
      effect: "slide",
      rounded: "md",
      shadow: "sm",
    },
  },
  {
    id: "urgent-apply",
    name: "Dringend bewerben",
    category: "cta",
    preview: (
      <EnhancedButton
        emoji="🚨"
        variant="danger"
        size="xl"
        effect="shake"
        rounded="lg"
        shadow="xl"
      >
        Dringend bewerben!
      </EnhancedButton>
    ),
    config: {
      text: "Dringend bewerben!",
      emoji: "🚨",
      variant: "danger",
      size: "xl",
      effect: "shake",
      rounded: "lg",
      shadow: "xl",
    },
  },
];

interface ButtonTemplateSelectorProps {
  onSelect: (template: ButtonTemplate) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ButtonTemplateSelector({
  onSelect,
  isOpen,
  onClose,
}: ButtonTemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "Alle", icon: "🎨" },
    { id: "cta", name: "Call-to-Action", icon: "🎯" },
    { id: "info", name: "Information", icon: "ℹ️" },
    { id: "action", name: "Aktionen", icon: "⚡" },
    { id: "social", name: "Social Media", icon: "📱" },
  ];

  const filteredTemplates =
    selectedCategory === "all"
      ? buttonTemplates
      : buttonTemplates.filter((t) => t.category === selectedCategory);

  const handleSelect = (template: ButtonTemplate) => {
    onSelect(template);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Button-Template auswählen
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-blue-300"
                  onClick={() => handleSelect(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">
                        {template.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {template.category.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-center p-4 bg-gray-50 rounded-lg mb-3">
                      {template.preview}
                    </div>
                    <Button
                      size="sm"
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(template);
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Auswählen
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Palette className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Keine Templates in dieser Kategorie gefunden</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Quick Template Button Component
interface QuickTemplateButtonProps {
  onSelectTemplate: (template: ButtonTemplate) => void;
}

export function QuickTemplateButton({
  onSelectTemplate,
}: QuickTemplateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        Template wählen
      </Button>

      <ButtonTemplateSelector
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={onSelectTemplate}
      />
    </>
  );
}
