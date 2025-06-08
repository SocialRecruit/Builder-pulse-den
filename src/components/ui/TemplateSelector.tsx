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
  demoTemplates,
  DemoTemplate,
  getDemoTemplatesByCategory,
} from "@/data/demoTemplates";
import {
  CheckCircle,
  Sparkles,
  Briefcase,
  Code,
  TrendingUp,
  Heart,
  Users,
} from "lucide-react";

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: DemoTemplate) => void;
}

export function TemplateSelector({
  isOpen,
  onClose,
  onSelect,
}: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    {
      id: "all",
      name: "Alle Templates",
      icon: Sparkles,
      color: "bg-purple-500",
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    { id: "tech", name: "IT & Tech", icon: Code, color: "bg-green-500" },
    { id: "sales", name: "Vertrieb", icon: Briefcase, color: "bg-red-500" },
    { id: "hr", name: "Personal", icon: Users, color: "bg-orange-500" },
    { id: "healthcare", name: "Gesundheit", icon: Heart, color: "bg-pink-500" },
  ];

  const filteredTemplates = getDemoTemplatesByCategory(selectedCategory);

  const handleSelect = (template: DemoTemplate) => {
    onSelect(template);
    onClose();
  };

  const getCategoryInfo = (category: string) => {
    const categoryMap = {
      marketing: { name: "Marketing", color: "bg-blue-100 text-blue-800" },
      tech: { name: "IT & Tech", color: "bg-green-100 text-green-800" },
      sales: { name: "Vertrieb", color: "bg-red-100 text-red-800" },
      hr: { name: "Personal", color: "bg-orange-100 text-orange-800" },
      healthcare: { name: "Gesundheit", color: "bg-pink-100 text-pink-800" },
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
            <Sparkles className="w-6 h-6 text-blue-600" />
            Demo-Template auswählen
          </DialogTitle>
          <p className="text-gray-600">
            Wählen Sie ein vorgefertigtes Template als Ausgangspunkt für Ihre
            Landing Page
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => {
                const categoryInfo = getCategoryInfo(template.category);
                return (
                  <Card
                    key={template.id}
                    className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-blue-300 overflow-hidden"
                    onClick={() => handleSelect(template)}
                  >
                    {/* Preview Image */}
                    <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={categoryInfo.color}>
                          {categoryInfo.name}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-bold text-gray-900 leading-tight">
                        {template.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {template.description}
                      </p>

                      {/* Template Stats */}
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{template.template.blocks.length} Blöcke</span>
                        <span>✨ Professionell</span>
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
                        Template verwenden
                      </Button>
                    </CardContent>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </Card>
                );
              })}
            </div>
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Keine Templates in dieser Kategorie gefunden</p>
            </div>
          )}

          {/* Info Footer */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 rounded-full p-1">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">
                  Template-Funktionen
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Alle Templates sind vollständig anpassbar und enthalten
                  vorgefertigte Inhalte, Formulare und professionelle Designs.
                  Nach der Auswahl können Sie alles nach Ihren Wünschen
                  bearbeiten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Quick Template Button for Dashboard
interface QuickTemplateSelectorProps {
  onSelectTemplate: (template: DemoTemplate) => void;
  variant?: "button" | "card";
}

export function QuickTemplateSelector({
  onSelectTemplate,
  variant = "button",
}: QuickTemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (template: DemoTemplate) => {
    onSelectTemplate(template);
    setIsOpen(false);
  };

  if (variant === "card") {
    return (
      <>
        <Card
          className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          <CardContent className="p-8 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-300">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              Demo Templates
            </h4>
            <p className="text-gray-600 text-sm">
              Vorgefertigte Vorlagen nutzen
            </p>
          </CardContent>
        </Card>

        <TemplateSelector
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={handleSelect}
        />
      </>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        Demo Template verwenden
      </Button>

      <TemplateSelector
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleSelect}
      />
    </>
  );
}
