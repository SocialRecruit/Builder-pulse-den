import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FlaskConical,
  Play,
  Pause,
  BarChart3,
  Trophy,
  Users,
  MousePointer,
} from "lucide-react";
import { LandingPage } from "@/types/landing-page";
import { toast } from "sonner";

interface ABTestManagerProps {
  page: LandingPage;
}

interface ABTest {
  id: string;
  name: string;
  status: "draft" | "running" | "completed";
  startDate: string;
  endDate?: string;
  variants: ABVariant[];
  trafficSplit: number;
  winningVariant?: string;
}

interface ABVariant {
  id: string;
  name: string;
  isControl: boolean;
  visitors: number;
  conversions: number;
  conversionRate: number;
  changes: VariantChange[];
}

interface VariantChange {
  type: "header" | "button" | "color" | "text";
  description: string;
  originalValue: string;
  newValue: string;
}

export const ABTestManager = ({ page }: ABTestManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTests, setActiveTests] = useState<ABTest[]>([
    {
      id: "test-1",
      name: "Header Text Optimierung",
      status: "running",
      startDate: "2024-01-15",
      variants: [
        {
          id: "control",
          name: "Original (Control)",
          isControl: true,
          visitors: 1247,
          conversions: 89,
          conversionRate: 7.1,
          changes: [],
        },
        {
          id: "variant-a",
          name: "Emotionaler Header",
          isControl: false,
          visitors: 1289,
          conversions: 112,
          conversionRate: 8.7,
          changes: [
            {
              type: "header",
              description: "Header Text geändert",
              originalValue: page.header.text,
              newValue: "Werden Sie Teil unserer Erfolgsgeschichte!",
            },
          ],
        },
      ],
      trafficSplit: 50,
    },
    {
      id: "test-2",
      name: "Button Farbe & Text",
      status: "completed",
      startDate: "2024-01-01",
      endDate: "2024-01-14",
      winningVariant: "variant-b",
      variants: [
        {
          id: "control",
          name: "Original (Blau)",
          isControl: true,
          visitors: 2156,
          conversions: 154,
          conversionRate: 7.1,
          changes: [],
        },
        {
          id: "variant-b",
          name: 'Grün + "Jetzt starten"',
          isControl: false,
          visitors: 2203,
          conversions: 187,
          conversionRate: 8.5,
          changes: [
            {
              type: "button",
              description: "Button Farbe und Text",
              originalValue: "Jetzt bewerben (Blau)",
              newValue: "Jetzt starten (Grün)",
            },
          ],
        },
      ],
      trafficSplit: 50,
    },
  ]);

  const [newTestName, setNewTestName] = useState("");
  const [selectedTestType, setSelectedTestType] = useState("");

  const startNewTest = () => {
    if (!newTestName || !selectedTestType) {
      toast.error("Bitte füllen Sie alle Felder aus.");
      return;
    }

    const newTest: ABTest = {
      id: `test-${Date.now()}`,
      name: newTestName,
      status: "draft",
      startDate: new Date().toISOString().split("T")[0],
      trafficSplit: 50,
      variants: [
        {
          id: "control",
          name: "Original (Control)",
          isControl: true,
          visitors: 0,
          conversions: 0,
          conversionRate: 0,
          changes: [],
        },
        {
          id: "variant-a",
          name: "Variante A",
          isControl: false,
          visitors: 0,
          conversions: 0,
          conversionRate: 0,
          changes: getDefaultChanges(selectedTestType),
        },
      ],
    };

    setActiveTests((prev) => [...prev, newTest]);
    setNewTestName("");
    setSelectedTestType("");
    toast.success(
      "A/B Test erstellt! Konfigurieren Sie die Varianten und starten Sie den Test.",
    );
  };

  const getDefaultChanges = (testType: string): VariantChange[] => {
    switch (testType) {
      case "header":
        return [
          {
            type: "header",
            description: "Header Text Variante",
            originalValue: page.header.text,
            newValue: "Neue Header-Variante",
          },
        ];
      case "button":
        return [
          {
            type: "button",
            description: "Button Text/Farbe",
            originalValue: "Original Button",
            newValue: "Variante Button",
          },
        ];
      default:
        return [];
    }
  };

  const toggleTestStatus = (testId: string) => {
    setActiveTests((prev) =>
      prev.map((test) => {
        if (test.id === testId) {
          const newStatus = test.status === "running" ? "completed" : "running";
          toast.success(
            `Test ${newStatus === "running" ? "gestartet" : "gestoppt"}!`,
          );
          return { ...test, status: newStatus };
        }
        return test;
      }),
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-green-100 text-green-800">Aktiv</Badge>;
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800">Abgeschlossen</Badge>
        );
      case "draft":
        return <Badge variant="secondary">Entwurf</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getWinningVariant = (test: ABTest) => {
    return test.variants.reduce((winner, current) =>
      current.conversionRate > winner.conversionRate ? current : winner,
    );
  };

  const calculateSignificance = (variantA: ABVariant, variantB: ABVariant) => {
    // Simplified significance calculation
    const diff = Math.abs(variantA.conversionRate - variantB.conversionRate);
    if (diff > 2 && (variantA.visitors > 1000 || variantB.visitors > 1000)) {
      return "Signifikant";
    } else if (diff > 1) {
      return "Trend erkennbar";
    }
    return "Nicht signifikant";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FlaskConical className="h-4 w-4 mr-2" />
          A/B Tests
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            A/B Test Manager
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Aktive Tests
                    </p>
                    <p className="text-2xl font-bold">
                      {activeTests.filter((t) => t.status === "running").length}
                    </p>
                  </div>
                  <Play className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Abgeschlossen
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        activeTests.filter((t) => t.status === "completed")
                          .length
                      }
                    </p>
                  </div>
                  <Trophy className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Durchschn. Uplift
                    </p>
                    <p className="text-2xl font-bold text-green-600">+12.4%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Test Creation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Neuen A/B Test erstellen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Test Name</label>
                  <input
                    type="text"
                    value={newTestName}
                    onChange={(e) => setNewTestName(e.target.value)}
                    placeholder="z.B. Header Optimierung"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Test Typ</label>
                  <Select
                    value={selectedTestType}
                    onValueChange={setSelectedTestType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Test Typ wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="header">Header Text</SelectItem>
                      <SelectItem value="button">Button Design</SelectItem>
                      <SelectItem value="color">Farbschema</SelectItem>
                      <SelectItem value="layout">Layout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button onClick={startNewTest} className="w-full">
                    Test erstellen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Tests */}
          <div className="space-y-4">
            {activeTests.map((test) => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{test.name}</CardTitle>
                      {getStatusBadge(test.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {test.startDate} {test.endDate && `- ${test.endDate}`}
                      </span>
                      {test.status !== "completed" && (
                        <Button
                          size="sm"
                          variant={
                            test.status === "running"
                              ? "destructive"
                              : "default"
                          }
                          onClick={() => toggleTestStatus(test.id)}
                        >
                          {test.status === "running" ? (
                            <>
                              <Pause className="h-4 w-4 mr-1" />
                              Stop
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-1" />
                              Start
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {test.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className={`p-4 rounded-lg border-2 ${
                          variant.isControl
                            ? "border-gray-300 bg-gray-50"
                            : test.winningVariant === variant.id
                              ? "border-green-500 bg-green-50"
                              : "border-blue-300 bg-blue-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            {variant.name}
                            {variant.isControl && (
                              <Badge variant="outline">Control</Badge>
                            )}
                            {test.winningVariant === variant.id && (
                              <Badge className="bg-green-100 text-green-800">
                                <Trophy className="h-3 w-3 mr-1" />
                                Winner
                              </Badge>
                            )}
                          </h4>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              Besucher
                            </span>
                            <span className="font-semibold">
                              {variant.visitors.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="flex items-center gap-1">
                              <MousePointer className="h-4 w-4" />
                              Conversions
                            </span>
                            <span className="font-semibold">
                              {variant.conversions}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span>Conversion Rate</span>
                            <span className="font-bold text-lg">
                              {variant.conversionRate}%
                            </span>
                          </div>

                          <Progress
                            value={variant.conversionRate * 10}
                            className="h-2"
                          />
                        </div>

                        {variant.changes.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-gray-600">
                              Änderungen:
                            </p>
                            {variant.changes.map((change, index) => (
                              <p key={index} className="text-xs text-gray-500">
                                • {change.description}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {test.variants.length === 2 && test.status === "running" && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm">
                        <strong>Statistische Signifikanz:</strong>{" "}
                        {calculateSignificance(
                          test.variants[0],
                          test.variants[1],
                        )}
                      </p>
                      {test.variants[1].conversionRate >
                        test.variants[0].conversionRate && (
                        <p className="text-sm text-green-600 mt-1">
                          Variante A zeigt eine{" "}
                          {(
                            ((test.variants[1].conversionRate -
                              test.variants[0].conversionRate) /
                              test.variants[0].conversionRate) *
                            100
                          ).toFixed(1)}
                          % Verbesserung gegenüber der Kontrolle.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                💡 A/B Testing Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                • Testen Sie nur eine Variable gleichzeitig für klare Ergebnisse
              </p>
              <p>
                • Sammeln Sie mindestens 1000 Besucher pro Variante für
                verlässliche Daten
              </p>
              <p>
                • Lassen Sie Tests mindestens 1-2 Wochen laufen für statistische
                Signifikanz
              </p>
              <p>
                • Berücksichtigen Sie saisonale Schwankungen bei der
                Interpretation
              </p>
              <p>• Dokumentieren Sie Ihre Erkenntnisse für zukünftige Tests</p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
