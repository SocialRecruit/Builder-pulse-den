import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  Sparkles,
  Palette,
  Briefcase,
  Code,
  Heart,
  Zap,
  TrendingUp,
  Users,
} from "lucide-react";
import { demoTemplates } from "@/data/demoTemplates";

export interface BodyStyleTemplate {
  id: string;
  name: string;
  category:
    | "business"
    | "creative"
    | "tech"
    | "marketing"
    | "sales"
    | "hr"
    | "healthcare"
    | "minimal"
    | "bold";
  preview: React.ReactNode;
  config: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    containerWidth: string;
    bodyPadding: number;
    lineHeight: string;
    footerBackgroundColor?: string;
    footerTextColor?: string;
    footerPadding?: number;
    footerBorder?: boolean;
  };
}

const baseBodyStyleTemplates: BodyStyleTemplate[] = [
  {
    id: "corporate-blue",
    name: "Corporate Blue",
    category: "business",
    preview: (
      <div className="w-full h-20 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-sm font-bold">Corporate Blue</div>
          <div className="text-xs opacity-80">
            Professionell & Vertrauensvoll
          </div>
        </div>
      </div>
    ),
    config: {
      primaryColor: "#2563eb",
      secondaryColor: "#64748b",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
      fontFamily: "montserrat",
      containerWidth: "normal",
      bodyPadding: 24,
      lineHeight: "normal",
      footerBackgroundColor: "#1e40af",
      footerTextColor: "#ffffff",
      footerPadding: 32,
      footerBorder: true,
    },
  },
  {
    id: "creative-orange",
    name: "Creative Orange",
    category: "creative",
    preview: (
      <div className="w-full h-20 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-sm font-bold">Creative Orange</div>
          <div className="text-xs opacity-80">Kreativ & Energiegeladen</div>
        </div>
      </div>
    ),
    config: {
      primaryColor: "#f97316",
      secondaryColor: "#78716c",
      backgroundColor: "#fffbeb",
      textColor: "#1c1917",
      fontFamily: "montserrat",
      containerWidth: "wide",
      bodyPadding: 32,
      lineHeight: "relaxed",
      footerBackgroundColor: "#ea580c",
      footerTextColor: "#ffffff",
      footerPadding: 28,
      footerBorder: false,
    },
  },
  {
    id: "tech-purple",
    name: "Tech Purple",
    category: "tech",
    preview: (
      <div className="w-full h-20 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-sm font-bold">Tech Purple</div>
          <div className="text-xs opacity-80">Modern & Innovativ</div>
        </div>
      </div>
    ),
    config: {
      primaryColor: "#8b5cf6",
      secondaryColor: "#6b7280",
      backgroundColor: "#faf5ff",
      textColor: "#1f2937",
      fontFamily: "montserrat",
      containerWidth: "normal",
      bodyPadding: 20,
      lineHeight: "relaxed",
      footerBackgroundColor: "#7c3aed",
      footerTextColor: "#ffffff",
      footerPadding: 24,
      footerBorder: true,
    },
  },
  {
    id: "healthcare-green",
    name: "Healthcare Green",
    category: "healthcare",
    preview: (
      <div className="w-full h-20 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-sm font-bold">Healthcare Green</div>
          <div className="text-xs opacity-80">Vertrauensvoll & Heilend</div>
        </div>
      </div>
    ),
    config: {
      primaryColor: "#10b981",
      secondaryColor: "#6b7280",
      backgroundColor: "#f0fdf4",
      textColor: "#14532d",
      fontFamily: "montserrat",
      containerWidth: "normal",
      bodyPadding: 28,
      lineHeight: "relaxed",
      footerBackgroundColor: "#059669",
      footerTextColor: "#ffffff",
      footerPadding: 32,
      footerBorder: true,
    },
  },
  {
    id: "minimal-gray",
    name: "Minimal Gray",
    category: "minimal",
    preview: (
      <div className="w-full h-20 rounded-lg bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-sm font-bold">Minimal Gray</div>
          <div className="text-xs opacity-80">Elegant & Schlicht</div>
        </div>
      </div>
    ),
    config: {
      primaryColor: "#6b7280",
      secondaryColor: "#9ca3af",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      fontFamily: "montserrat",
      containerWidth: "narrow",
      bodyPadding: 16,
      lineHeight: "normal",
      footerBackgroundColor: "#4b5563",
      footerTextColor: "#f9fafb",
      footerPadding: 20,
      footerBorder: false,
    },
  },
  {
    id: "bold-red",
    name: "Bold Red",
    category: "bold",
    preview: (
      <div className="w-full h-20 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-sm font-bold">Bold Red</div>
          <div className="text-xs opacity-80">
            Kraftvoll & Aufmerksamkeitsstark
          </div>
        </div>
      </div>
    ),
    config: {
      primaryColor: "#ef4444",
      secondaryColor: "#64748b",
      backgroundColor: "#fef2f2",
      textColor: "#1f2937",
      fontFamily: "montserrat",
      containerWidth: "wide",
      bodyPadding: 32,
      lineHeight: "relaxed",
      footerBackgroundColor: "#dc2626",
      footerTextColor: "#ffffff",
      footerPadding: 36,
      footerBorder: true,
    },
  },
];

// Convert Demo Templates to Body Style Templates
const demoTemplateStyles: BodyStyleTemplate[] = demoTemplates.map(
  (template) => {
    const categoryMap = {
      marketing: "marketing" as const,
      tech: "tech" as const,
      sales: "sales" as const,
      hr: "hr" as const,
      healthcare: "healthcare" as const,
    };

    return {
      id: `demo-${template.id}`,
      name: `${template.name} Style`,
      category: categoryMap[template.category] || "business",
      preview: (
        <div className="w-full h-20 rounded-lg overflow-hidden relative">
          <img
            src={template.preview}
            alt={template.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="text-white ml-3">
              <div className="text-sm font-bold">{template.name}</div>
              <div className="text-xs opacity-90">Demo Style</div>
            </div>
          </div>
        </div>
      ),
      config: {
        primaryColor: template.template.design?.primaryColor || "#2563eb",
        secondaryColor: template.template.design?.secondaryColor || "#64748b",
        backgroundColor: template.template.design?.backgroundColor || "#ffffff",
        textColor: template.template.design?.textColor || "#1f2937",
        fontFamily: template.template.design?.fontFamily || "montserrat",
        containerWidth: template.template.design?.containerWidth || "normal",
        bodyPadding: template.template.design?.bodyPadding || 24,
        lineHeight: template.template.design?.lineHeight || "normal",
        footerBackgroundColor: template.template.design?.footerBackgroundColor,
        footerTextColor: template.template.design?.footerTextColor,
        footerPadding: template.template.design?.footerPadding,
        footerBorder: template.template.design?.footerBorder,
      },
    };
  },
);

// Combine base templates with demo template styles
const allBodyStyleTemplates = [
  ...baseBodyStyleTemplates,
  ...demoTemplateStyles,
];

interface BodyStyleTemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: BodyStyleTemplate) => void;
}

export function BodyStyleTemplateSelector({
  isOpen,
  onClose,
  onSelect,
}: BodyStyleTemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "Alle Styles", icon: Sparkles, color: "bg-purple-500" },
    { id: "business", name: "Business", icon: Briefcase, color: "bg-blue-500" },
    { id: "creative", name: "Kreativ", icon: Palette, color: "bg-orange-500" },
    { id: "tech", name: "Tech", icon: Code, color: "bg-purple-500" },
    {
      id: "marketing",
      name: "Marketing",
      icon: TrendingUp,
      color: "bg-indigo-500",
    },
    { id: "sales", name: "Sales", icon: Briefcase, color: "bg-red-500" },
    { id: "hr", name: "Personal", icon: Users, color: "bg-green-500" },
    {
      id: "healthcare",
      name: "Gesundheit",
      icon: Heart,
      color: "bg-emerald-500",
    },
    { id: "minimal", name: "Minimal", icon: Zap, color: "bg-gray-500" },
    { id: "bold", name: "Bold", icon: Zap, color: "bg-red-500" },
  ];

  const filteredTemplates =
    selectedCategory === "all"
      ? allBodyStyleTemplates
      : allBodyStyleTemplates.filter((t) => t.category === selectedCategory);

  const handleSelect = (template: BodyStyleTemplate) => {
    onSelect(template);
    onClose();
  };

  const getCategoryInfo = (category: string) => {
    const categoryMap = {
      business: { name: "Business", color: "bg-blue-100 text-blue-800" },
      creative: { name: "Kreativ", color: "bg-orange-100 text-orange-800" },
      tech: { name: "Tech", color: "bg-purple-100 text-purple-800" },
      marketing: { name: "Marketing", color: "bg-indigo-100 text-indigo-800" },
      sales: { name: "Sales", color: "bg-red-100 text-red-800" },
      hr: { name: "Personal", color: "bg-green-100 text-green-800" },
      healthcare: {
        name: "Gesundheit",
        color: "bg-emerald-100 text-emerald-800",
      },
      minimal: { name: "Minimal", color: "bg-gray-100 text-gray-800" },
      bold: { name: "Bold", color: "bg-red-100 text-red-800" },
    };
    return (
      categoryMap[category] || {
        name: category,
        color: "bg-gray-100 text-gray-800",
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Palette className="w-6 h-6 text-purple-600" />
            Body-Style Template auswählen
          </DialogTitle>
          <p className="text-gray-600">
            Wählen Sie ein Design-Template für die gesamte Landing Page oder
            nutzen Sie Demo-Template-Styles
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? `${category.color} text-white hover:opacity-90`
                      : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              );
            })}
          </div>

          {/* Templates Grid */}
          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => {
                const categoryInfo = getCategoryInfo(template.category);
                const isDemoTemplate = template.id.startsWith("demo-");

                return (
                  <Card
                    key={template.id}
                    className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-purple-300 overflow-hidden"
                    onClick={() => handleSelect(template)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-bold text-gray-900">
                          {template.name}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge className={categoryInfo.color}>
                            {categoryInfo.name}
                          </Badge>
                          {isDemoTemplate && (
                            <Badge variant="outline" className="text-xs">
                              Demo
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Style Preview */}
                      <div className="border rounded-lg overflow-hidden">
                        {template.preview}
                      </div>

                      {/* Color Palette */}
                      <div className="flex gap-2">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{
                            backgroundColor: template.config.primaryColor,
                          }}
                          title="Primärfarbe"
                        />
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{
                            backgroundColor: template.config.secondaryColor,
                          }}
                          title="Sekundärfarbe"
                        />
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{
                            backgroundColor: template.config.backgroundColor,
                          }}
                          title="Hintergrund"
                        />
                      </div>

                      {/* Features */}
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>Container: {template.config.containerWidth}</div>
                        <div>Font: {template.config.fontFamily}</div>
                        <div>Padding: {template.config.bodyPadding}px</div>
                      </div>

                      {/* Select Button */}
                      <Button
                        size="sm"
                        className="w-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(template);
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Style anwenden
                      </Button>
                    </CardContent>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </Card>
                );
              })}
            </div>
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Palette className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Keine Style-Templates in dieser Kategorie gefunden</p>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-500 rounded-full p-1">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-indigo-900">
                  Style-Template vs Demo-Template
                </h4>
                <p className="text-sm text-indigo-700 mt-1">
                  <strong>Style-Templates</strong> ändern nur das Design der
                  aktuellen Seite.
                  <strong> Demo-Templates</strong> nutzen die Design-Stile aus
                  den vorgefertigten Landing Pages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Quick Style Template Button
interface QuickBodyStyleSelectorProps {
  onSelectTemplate: (template: BodyStyleTemplate) => void;
}

export function QuickBodyStyleSelector({
  onSelectTemplate,
}: QuickBodyStyleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Palette className="w-4 h-4" />
        Style-Template
      </Button>

      <BodyStyleTemplateSelector
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={onSelectTemplate}
      />
    </>
  );
}
