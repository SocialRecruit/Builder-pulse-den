import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Search,
  Eye,
  Download,
  Star,
  Briefcase,
  Users,
  Building,
  Heart,
  Code,
  Paintbrush,
} from "lucide-react";
import { useLandingPages } from "@/hooks/useLandingPages";
import { LandingPage, ContentBlock } from "@/types/landing-page";
import { generateId } from "@/lib/storage";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "Einfach" | "Mittel" | "Fortgeschritten";
  preview: string;
  tags: string[];
  rating: number;
  downloads: number;
  template: Partial<LandingPage>;
}

const templates: Template[] = [
  {
    id: "modern-tech",
    name: "Modern Tech Company",
    description:
      "Modernes Design für Tech-Unternehmen mit klaren Linien und professionellem Look.",
    category: "Technology",
    difficulty: "Mittel",
    preview:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    tags: ["Modern", "Clean", "Professional", "Blue"],
    rating: 4.8,
    downloads: 1234,
    template: {
      header: {
        title: "Software Developer (m/w/d)",
        text: "Gestalten Sie die Zukunft der Technologie mit uns",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop",
      },
      blocks: [
        {
          id: generateId(),
          type: "heading",
          content: { text: "Ihre Mission", level: 2 },
          order: 0,
        },
        {
          id: generateId(),
          type: "text",
          content: {
            text: "Sie entwickeln innovative Software-Lösungen und arbeiten mit modernsten Technologien.",
          },
          order: 1,
        },
        {
          id: generateId(),
          type: "button",
          content: {
            text: "Jetzt bewerben",
            type: "apply",
            style: "primary",
            url: "#",
          },
          order: 2,
        },
      ] as ContentBlock[],
    },
  },
  {
    id: "healthcare-warm",
    name: "Healthcare & Medical",
    description:
      "Warmes, vertrauensvolles Design für Positionen im Gesundheitswesen.",
    category: "Healthcare",
    difficulty: "Einfach",
    preview:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    tags: ["Healthcare", "Warm", "Trustworthy", "Green"],
    rating: 4.9,
    downloads: 892,
    template: {
      header: {
        title: "Pflegekraft (m/w/d)",
        text: "Machen Sie einen Unterschied im Leben anderer Menschen",
        image:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop",
      },
      blocks: [
        {
          id: generateId(),
          type: "heading",
          content: { text: "Warum bei uns arbeiten?", level: 2 },
          order: 0,
        },
        {
          id: generateId(),
          type: "text",
          content: {
            text: "Wir bieten Ihnen ein unterstützendes Umfeld, in dem Sie Ihre Leidenschaft für die Pflege ausleben können.",
          },
          order: 1,
        },
      ] as ContentBlock[],
    },
  },
  {
    id: "creative-agency",
    name: "Creative Agency",
    description:
      "Lebendiges, kreatives Design für Marketing- und Design-Positionen.",
    category: "Creative",
    difficulty: "Fortgeschritten",
    preview:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    tags: ["Creative", "Colorful", "Dynamic", "Purple"],
    rating: 4.7,
    downloads: 567,
    template: {
      header: {
        title: "Graphic Designer (m/w/d)",
        text: "Bring deine kreativen Ideen zum Leben",
        image:
          "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=600&fit=crop",
      },
      blocks: [
        {
          id: generateId(),
          type: "heading",
          content: { text: "Dein kreativer Spielplatz", level: 2 },
          order: 0,
        },
        {
          id: generateId(),
          type: "text",
          content: {
            text: "Arbeite an spannenden Projekten und verwirkliche deine kreativsten Ideen.",
          },
          order: 1,
        },
      ] as ContentBlock[],
    },
  },
  {
    id: "finance-corporate",
    name: "Corporate Finance",
    description:
      "Seriöses, professionelles Design für Finanz- und Beratungspositionen.",
    category: "Finance",
    difficulty: "Mittel",
    preview:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    tags: ["Corporate", "Professional", "Elegant", "Navy"],
    rating: 4.6,
    downloads: 745,
    template: {
      header: {
        title: "Financial Analyst (m/w/d)",
        text: "Gestalten Sie strategische Finanzentscheidungen mit",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop",
      },
      blocks: [
        {
          id: generateId(),
          type: "heading",
          content: { text: "Ihre Expertise ist gefragt", level: 2 },
          order: 0,
        },
      ] as ContentBlock[],
    },
  },
  {
    id: "startup-energy",
    name: "Startup Energy",
    description: "Dynamisches, energiegeladenes Design für junge Unternehmen.",
    category: "Startup",
    difficulty: "Einfach",
    preview:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    tags: ["Startup", "Dynamic", "Young", "Orange"],
    rating: 4.5,
    downloads: 423,
    template: {
      header: {
        title: "Marketing Manager (m/w/d)",
        text: "Werde Teil unserer Startup-Revolution",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
      },
      blocks: [
        {
          id: generateId(),
          type: "heading",
          content: { text: "Starte deine Karriere-Revolution", level: 2 },
          order: 0,
        },
      ] as ContentBlock[],
    },
  },
  {
    id: "education-academic",
    name: "Education & Academic",
    description:
      "Inspirierendes Design für Bildungseinrichtungen und akademische Positionen.",
    category: "Education",
    difficulty: "Einfach",
    preview:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
    tags: ["Education", "Inspiring", "Academic", "Teal"],
    rating: 4.8,
    downloads: 312,
    template: {
      header: {
        title: "Lehrer (m/w/d)",
        text: "Formen Sie die Zukunft durch Bildung",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop",
      },
      blocks: [
        {
          id: generateId(),
          type: "heading",
          content: { text: "Inspiration beginnt mit Ihnen", level: 2 },
          order: 0,
        },
      ] as ContentBlock[],
    },
  },
];

const categories = [
  "Alle",
  "Technology",
  "Healthcare",
  "Creative",
  "Finance",
  "Startup",
  "Education",
];

export default function TemplateGallery() {
  const navigate = useNavigate();
  const { createPage } = useLandingPages();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "Alle" || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technology":
        return <Code className="h-4 w-4" />;
      case "Healthcare":
        return <Heart className="h-4 w-4" />;
      case "Creative":
        return <Paintbrush className="h-4 w-4" />;
      case "Finance":
        return <Building className="h-4 w-4" />;
      case "Startup":
        return <Users className="h-4 w-4" />;
      case "Education":
        return <Briefcase className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const useTemplate = (template: Template) => {
    try {
      const newPage = createPage(
        template.template.header?.title || template.name,
      );

      // Apply template data
      if (template.template.header) {
        newPage.header = template.template.header;
      }
      if (template.template.blocks) {
        newPage.blocks = template.template.blocks;
      }

      toast.success(`Template "${template.name}" angewendet!`);
      navigate(`/page-builder/${newPage.id}`);
    } catch (error) {
      toast.error("Fehler beim Anwenden des Templates.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Template Gallery
              </h1>
              <Badge
                variant="outline"
                className="text-purple-600 border-purple-200"
              >
                {templates.length} Templates
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Templates durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {getCategoryIcon(category)}
                  <span className="ml-2">{category}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90">
                    {template.difficulty}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {getCategoryIcon(template.category)}
                        <span className="ml-1">{template.category}</span>
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{template.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{template.downloads.toLocaleString()} Downloads</span>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{template.name} - Preview</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full rounded-lg"
                        />
                        <p className="text-gray-600">{template.description}</p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => useTemplate(template)}
                            className="flex-1"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Template verwenden
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    onClick={() => useTemplate(template)}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Verwenden
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Keine Templates gefunden
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              Versuchen Sie es mit anderen Suchbegriffen oder wählen Sie eine
              andere Kategorie.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
