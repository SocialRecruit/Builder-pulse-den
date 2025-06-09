import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Wand2, Sparkles, Target, Users, Award, Zap } from "lucide-react";

// AI-inspirierte Content-Vorlagen für verschiedene Job-Bereiche
const CONTENT_SUGGESTIONS = {
  marketing: {
    name: "Marketing & Vertrieb",
    icon: "📈",
    color: "bg-blue-100 text-blue-800",
    suggestions: {
      titles: [
        "Marketing Manager (m/w/d) - Gestalte unsere Zukunft mit!",
        "Digital Marketing Spezialist - Deine Kreativität ist gefragt!",
        "Vertriebsprofi gesucht - Bringe unsere Erfolgsgeschichte voran!",
        "Content Marketing Manager - Erzähle unsere Geschichte!",
      ],
      descriptions: [
        "Entwickle innovative Marketingstrategien und bringe unser Unternehmen zum Erfolg. Mit deiner Kreativität und analytischen Denkweise gestaltest du die Zukunft unseres Brandings.",
        "Als Teil unseres dynamischen Teams entwickelst du datengetriebene Kampagnen, die unsere Zielgruppe begeistern und messbare Ergebnisse liefern.",
        "In dieser spannenden Position vereinst du strategisches Denken mit praktischer Umsetzung und arbeitest mit modernsten Marketing-Tools.",
      ],
      tasks: [
        "📊 Entwicklung und Umsetzung innovativer Marketingstrategien",
        "🎯 Planung und Durchführung zielgruppenspezifischer Kampagnen",
        "📱 Management unserer Social Media Präsenz",
        "📈 Analyse von Kampagnen-Performance und ROI-Optimierung",
        "🤝 Enge Zusammenarbeit mit dem Vertriebs- und Produktteam",
      ],
      benefits: [
        "🚀 Modernste Marketing-Tools und -Technologien",
        "📚 Weiterbildungsbudget für Konferenzen und Zertifizierungen",
        "🏠 Flexible Arbeitszeiten und Home-Office-Möglichkeiten",
        "🎉 Kreative Freiräume für eigene Ideen und Projekte",
      ],
    },
  },
  tech: {
    name: "IT & Entwicklung",
    icon: "💻",
    color: "bg-green-100 text-green-800",
    suggestions: {
      titles: [
        "Senior Frontend Developer - Gestalte die digitale Zukunft!",
        "Full-Stack Entwickler (m/w/d) - Code, der bewegt!",
        "DevOps Engineer - Infrastruktur, die begeistert!",
        "UI/UX Designer - Design, das inspiriert!",
      ],
      descriptions: [
        "Entwickle zukunftsweisende Web-Anwendungen mit modernsten Technologien. In unserem agilen Team bringst du innovative Ideen zum Leben und gestaltest digitale Erlebnisse.",
        "Als Teil unseres Tech-Teams arbeitest du an spannenden Projekten, die das Leben unserer Nutzer verbessern. Deine Expertise treibt unsere technische Innovation voran.",
        "In dieser Rolle vereinst du technische Exzellenz mit kreativer Problemlösung und arbeitest in einem umfeld, das kontinuierliches Lernen fördert.",
      ],
      tasks: [
        "⚡ Entwicklung performanter und skalierbarer Web-Anwendungen",
        "🔧 Implementation neuer Features mit React, TypeScript & Node.js",
        "🧪 Schreiben von Unit- und Integration-Tests",
        "📱 Responsive Design und Mobile-First Entwicklung",
        "👥 Code Reviews und Mentoring von Junior-Entwicklern",
      ],
      benefits: [
        "💻 Top-Hardware: MacBook Pro, 4K-Monitore, ergonomische Ausstattung",
        "🎓 Konferenz-Teilnahmen und Online-Kurse",
        "⏰ Flexible Arbeitszeiten und Remote-Work",
        "🍕 Teamevents, Hackathons und Tech-Talks",
      ],
    },
  },
  hr: {
    name: "Personal & HR",
    icon: "👥",
    color: "bg-purple-100 text-purple-800",
    suggestions: {
      titles: [
        "HR Business Partner - Menschen verbinden, Erfolg gestalten!",
        "Personalreferent (m/w/d) - Talente entdecken und fördern!",
        "Recruiter - Die besten Köpfe für unser Team!",
        "People & Culture Manager - Unternehmenskultur leben!",
      ],
      descriptions: [
        "Gestalte unsere Unternehmenskultur mit und entwickle HR-Strategien, die unsere Mitarbeiter begeistern. Du bist der Dreh- und Angelpunkt für alle People-Themen.",
        "Als erfahrener HR-Profi unterstützt du unsere Führungskräfte bei strategischen Personalentscheidungen und entwickelst innovative Ansätze für Employee Experience.",
        "In dieser vielseitigen Position verbindest du menschliche Empathie mit strategischem Denken und prägst die Zukunft unseres Unternehmens.",
      ],
      tasks: [
        "🎯 Strategische Personalplanung und Workforce Analytics",
        "📋 Recruitment von A-Z: Von der Stellenausschreibung bis Onboarding",
        "📈 Entwicklung von Performance Management Prozessen",
        "🌟 Mitarbeiterentwicklung und Talent Management",
        "🤝 Aufbau und Pflege einer positiven Unternehmenskultur",
      ],
      benefits: [
        "🎓 HRCP/SHRM Zertifizierungen werden unterstützt",
        "🌍 Internationale HR-Konferenzen und Networking",
        "💡 Eigenverantwortliche Projektleitung",
        "🏆 Leistungsbasierte Vergütung und Entwicklungspfade",
      ],
    },
  },
  sales: {
    name: "Sales & Business",
    icon: "💼",
    color: "bg-orange-100 text-orange-800",
    suggestions: {
      titles: [
        "Senior Sales Manager - Deals, die begeistern!",
        "Account Executive (m/w/d) - Beziehungen, die Erfolg bringen!",
        "Business Development Manager - Wachstum gestalten!",
        "Key Account Manager - Kunden zu Partnern machen!",
      ],
      descriptions: [
        "Baue langfristige Kundenbeziehungen auf und entwickle gemeinsam mit unserem Team neue Geschäftsmöglichkeiten. Deine Verkaufs-Expertise öffnet Türen zu nachhaltigen Partnerschaften.",
        "Als Sales-Profi verstehst du Kundenbedürfnisse und entwickelst maßgeschneiderte Lösungen. Du bist der Schlüssel für unser kontinuierliches Wachstum.",
        "In dieser Position vereinst du strategisches Denken mit praktischer Umsetzung und arbeitest in einem erfolgsorientierten, aber kollegialen Umfeld.",
      ],
      tasks: [
        "🤝 Aufbau und Pflege strategischer Kundenbeziehungen",
        "📊 Lead-Generierung und Opportunity Management",
        "🎯 Durchführung von Produktdemos und Präsentationen",
        "📈 Pipeline-Management und Sales Forecasting",
        "🏆 Abschluss von Verträgen und Verhandlungsführung",
      ],
      benefits: [
        "💰 Attraktive Provision und leistungsbezogene Boni",
        "🚗 Firmenwagen oder Mobilitätsbudget",
        "🌟 Internationale Karrieremöglichkeiten",
        "🎯 Sales-Trainings und Persönlichkeitsentwicklung",
      ],
    },
  },
};

interface AIContentSuggestionsProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (content: string) => void;
  contentType: "title" | "description" | "tasks" | "benefits";
  jobCategory?: string;
}

export const AIContentSuggestions: React.FC<AIContentSuggestionsProps> = ({
  isOpen,
  onClose,
  onSelect,
  contentType,
  jobCategory = "marketing",
}) => {
  const [selectedCategory, setSelectedCategory] = useState(jobCategory);

  const handleContentSelect = (content: string) => {
    onSelect(content);
    onClose();
  };

  const getCategoryData = (category: string) => {
    return (
      CONTENT_SUGGESTIONS[category as keyof typeof CONTENT_SUGGESTIONS] ||
      CONTENT_SUGGESTIONS.marketing
    );
  };

  const getContentTypeData = (category: string, type: string) => {
    const categoryData = getCategoryData(category);
    return (
      categoryData.suggestions[type as keyof typeof categoryData.suggestions] ||
      []
    );
  };

  const getContentTypeTitle = (type: string) => {
    switch (type) {
      case "title":
        return "Titel-Vorschläge";
      case "description":
        return "Beschreibungs-Vorschläge";
      case "tasks":
        return "Aufgaben-Vorschläge";
      case "benefits":
        return "Benefits-Vorschläge";
      default:
        return "Content-Vorschläge";
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "title":
        return <Target className="w-5 h-5" />;
      case "description":
        return <Sparkles className="w-5 h-5" />;
      case "tasks":
        return <Zap className="w-5 h-5" />;
      case "benefits":
        return <Award className="w-5 h-5" />;
      default:
        return <Wand2 className="w-5 h-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-600" />
            AI Content Suggestions
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              KI-unterstützt
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Bereich auswählen
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(CONTENT_SUGGESTIONS).map(([key, category]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(key)}
                  className="h-auto p-3 flex flex-col items-center gap-1"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-xs text-center">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Content Suggestions */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              {getContentTypeIcon(contentType)}
              {getContentTypeTitle(contentType)}
            </h3>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {getContentTypeData(selectedCategory, contentType).map(
                (suggestion: string, index: number) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
                    onClick={() => handleContentSelect(suggestion)}
                  >
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed">{suggestion}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryData(selectedCategory).name}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-auto p-1 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContentSelect(suggestion);
                          }}
                        >
                          Übernehmen
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium text-purple-900 mb-1">💡 Pro-Tipp</p>
                <p className="text-sm text-purple-700">
                  Alle Vorschläge sind KI-optimiert für bessere
                  Bewerber-Ansprache und SEO. Sie können jeden Text nach der
                  Übernahme weiter anpassen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
