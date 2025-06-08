import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { LandingPage } from "@/types/landing-page";

interface SEOCheckerProps {
  page: LandingPage;
}

interface SEOCheck {
  id: string;
  name: string;
  description: string;
  status: "pass" | "warning" | "fail";
  score: number;
  recommendation?: string;
}

export const SEOChecker = ({ page }: SEOCheckerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checks, setChecks] = useState<SEOCheck[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    if (isOpen) {
      runSEOChecks();
    }
  }, [isOpen, page]);

  const runSEOChecks = () => {
    const newChecks: SEOCheck[] = [
      {
        id: "title-length",
        name: "Seitentitel Länge",
        description: "Der Seitentitel sollte zwischen 30-60 Zeichen lang sein",
        status: getTitleStatus(),
        score: getTitleScore(),
        recommendation: getTitleRecommendation(),
      },
      {
        id: "meta-description",
        name: "Meta-Beschreibung",
        description:
          "Meta-Beschreibung sollte zwischen 120-160 Zeichen lang sein",
        status: getMetaDescriptionStatus(),
        score: getMetaDescriptionScore(),
        recommendation: getMetaDescriptionRecommendation(),
      },
      {
        id: "header-image",
        name: "Header-Bild",
        description: "Header sollte ein aussagekräftiges Bild haben",
        status: page.header.image ? "pass" : "warning",
        score: page.header.image ? 100 : 50,
        recommendation: !page.header.image
          ? "Fügen Sie ein Header-Bild hinzu für bessere visuelle Wirkung"
          : undefined,
      },
      {
        id: "content-length",
        name: "Inhaltslänge",
        description: "Mindestens 3 Content-Blöcke für besseres SEO",
        status: page.blocks.length >= 3 ? "pass" : "warning",
        score: Math.min(100, (page.blocks.length / 3) * 100),
        recommendation:
          page.blocks.length < 3
            ? "Fügen Sie mehr Inhaltsblöcke hinzu"
            : undefined,
      },
      {
        id: "call-to-action",
        name: "Call-to-Action",
        description: "Mindestens ein Button für Bewerber-Konversion",
        status: hasCallToAction() ? "pass" : "fail",
        score: hasCallToAction() ? 100 : 0,
        recommendation: !hasCallToAction()
          ? 'Fügen Sie einen "Jetzt bewerben" Button hinzu'
          : undefined,
      },
      {
        id: "mobile-friendly",
        name: "Mobile-Optimierung",
        description: "Seite ist automatisch mobile-optimiert",
        status: "pass",
        score: 100,
      },
      {
        id: "page-speed",
        name: "Ladegeschwindigkeit",
        description: "Geschätzte Ladegeschwindigkeit basierend auf Inhalten",
        status: getPageSpeedStatus(),
        score: getPageSpeedScore(),
        recommendation: getPageSpeedRecommendation(),
      },
      {
        id: "social-sharing",
        name: "Social Media Tauglichkeit",
        description: "Titel und Bild sind für Social Media optimiert",
        status: page.header.image && page.header.title ? "pass" : "warning",
        score: (page.header.image ? 50 : 0) + (page.header.title ? 50 : 0),
        recommendation:
          !page.header.image || !page.header.title
            ? "Vervollständigen Sie Header-Bild und -Titel"
            : undefined,
      },
    ];

    setChecks(newChecks);
    const avgScore =
      newChecks.reduce((sum, check) => sum + check.score, 0) / newChecks.length;
    setOverallScore(Math.round(avgScore));
  };

  const getTitleStatus = (): "pass" | "warning" | "fail" => {
    const length = page.title.length;
    if (length >= 30 && length <= 60) return "pass";
    if (length >= 20 && length <= 70) return "warning";
    return "fail";
  };

  const getTitleScore = (): number => {
    const length = page.title.length;
    if (length >= 30 && length <= 60) return 100;
    if (length >= 20 && length <= 70) return 75;
    if (length >= 10 && length <= 80) return 50;
    return 25;
  };

  const getTitleRecommendation = (): string | undefined => {
    const length = page.title.length;
    if (length < 30)
      return "Titel ist zu kurz. Fügen Sie beschreibende Wörter hinzu.";
    if (length > 60)
      return "Titel ist zu lang. Kürzen Sie ihn für bessere Sichtbarkeit.";
    return undefined;
  };

  const getMetaDescriptionStatus = (): "pass" | "warning" | "fail" => {
    if (!page.seoDescription) return "fail";
    const length = page.seoDescription.length;
    if (length >= 120 && length <= 160) return "pass";
    if (length >= 100 && length <= 180) return "warning";
    return "fail";
  };

  const getMetaDescriptionScore = (): number => {
    if (!page.seoDescription) return 0;
    const length = page.seoDescription.length;
    if (length >= 120 && length <= 160) return 100;
    if (length >= 100 && length <= 180) return 75;
    if (length >= 50) return 50;
    return 25;
  };

  const getMetaDescriptionRecommendation = (): string | undefined => {
    if (!page.seoDescription) return "Fügen Sie eine Meta-Beschreibung hinzu.";
    const length = page.seoDescription.length;
    if (length < 120) return "Meta-Beschreibung ist zu kurz.";
    if (length > 160) return "Meta-Beschreibung ist zu lang.";
    return undefined;
  };

  const hasCallToAction = (): boolean => {
    return page.blocks.some(
      (block) =>
        block.type === "button" &&
        (block.content.type === "apply" || block.content.type === "submit"),
    );
  };

  const getPageSpeedStatus = (): "pass" | "warning" | "fail" => {
    const imageBlocks = page.blocks.filter(
      (block) => block.type === "image",
    ).length;
    const hasHeaderImage = page.header.image ? 1 : 0;
    const totalImages = imageBlocks + hasHeaderImage;

    if (totalImages <= 3) return "pass";
    if (totalImages <= 5) return "warning";
    return "fail";
  };

  const getPageSpeedScore = (): number => {
    const imageBlocks = page.blocks.filter(
      (block) => block.type === "image",
    ).length;
    const hasHeaderImage = page.header.image ? 1 : 0;
    const totalImages = imageBlocks + hasHeaderImage;

    if (totalImages <= 3) return 100;
    if (totalImages <= 5) return 75;
    if (totalImages <= 7) return 50;
    return 25;
  };

  const getPageSpeedRecommendation = (): string | undefined => {
    const imageBlocks = page.blocks.filter(
      (block) => block.type === "image",
    ).length;
    if (imageBlocks > 5)
      return "Reduzieren Sie die Anzahl der Bilder für bessere Ladezeiten.";
    return undefined;
  };

  const getStatusIcon = (status: "pass" | "warning" | "fail") => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "fail":
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Search className="h-4 w-4 mr-2" />
          SEO Check
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            SEO Score Checker
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Gesamt SEO Score</span>
                <Badge className={getScoreBadgeColor(overallScore)}>
                  {overallScore}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={overallScore} className="h-3" />
              <p className="text-sm text-gray-600 mt-2">
                {overallScore >= 80 &&
                  "Ausgezeichnet! Ihre Seite ist gut für SEO optimiert."}
                {overallScore >= 60 &&
                  overallScore < 80 &&
                  "Gut! Einige Verbesserungen würden helfen."}
                {overallScore < 60 &&
                  "Verbesserungsbedarf. Folgen Sie den Empfehlungen unten."}
              </p>
            </CardContent>
          </Card>

          {/* Individual Checks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checks.map((check) => (
              <Card key={check.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(check.status)}
                      <span>{check.name}</span>
                    </div>
                    <span
                      className={`text-sm font-bold ${getScoreColor(check.score)}`}
                    >
                      {check.score}%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-600 mb-2">
                    {check.description}
                  </p>
                  {check.recommendation && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-2">
                      <p className="text-xs text-blue-800">
                        💡 {check.recommendation}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SEO Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                💡 SEO Tipps für Social Recruiting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p>
                  <strong>Keywords:</strong> Verwenden Sie relevante
                  Job-Keywords im Titel und der Beschreibung.
                </p>
                <p>
                  <strong>Lokaler Bezug:</strong> Fügen Sie
                  Standort-Informationen hinzu für lokale Suchen.
                </p>
                <p>
                  <strong>Call-to-Action:</strong> Klare Handlungsaufforderungen
                  verbessern die Conversion-Rate.
                </p>
                <p>
                  <strong>Mobile First:</strong> Über 60% der Job-Suchenden
                  nutzen mobile Geräte.
                </p>
                <p>
                  <strong>Social Sharing:</strong> Optimierte Titel und Bilder
                  für bessere Social Media Performance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
