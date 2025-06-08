import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { CookieSettings } from "@/types/landing-page";
import { getAppSettings, saveAppSettings } from "@/lib/storage";

const COOKIE_CONSENT_KEY = "cookie_consent";

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    marketing: false,
    analytics: false,
  });
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const appSettings = getAppSettings();

    if (!consent && appSettings.cookieBannerEnabled) {
      setShowBanner(true);
    }

    if (consent) {
      setSettings(JSON.parse(consent));
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookieSettings = {
      necessary: true,
      marketing: true,
      analytics: true,
    };
    saveConsent(allAccepted);
  };

  const handleRejectAll = () => {
    const minimal: CookieSettings = {
      necessary: true,
      marketing: false,
      analytics: false,
    };
    saveConsent(minimal);
  };

  const handleSaveSelection = () => {
    saveConsent(settings);
    setShowModal(false);
  };

  const saveConsent = (cookieSettings: CookieSettings) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(cookieSettings));
    setSettings(cookieSettings);
    setShowBanner(false);
    setShowModal(false);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const updateSetting = (key: keyof CookieSettings, value: boolean) => {
    if (key === "necessary") return; // Necessary cookies cannot be disabled
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                Diese Website verwendet Cookies, um Ihnen die bestmögliche
                Benutzererfahrung zu bieten. Durch die weitere Nutzung der
                Website stimmen Sie der Verwendung von Cookies zu.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowModal(true)}
              >
                Cookies verwalten
              </Button>
              <Button variant="secondary" size="sm" onClick={handleRejectAll}>
                Alle ablehnen
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                Alle akzeptieren
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Einwilligung zur Datenverarbeitung
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Wir verwenden Cookies und ähnliche Technologien, um die
              Benutzerfreundlichkeit zu verbessern, unseren Datenverkehr zu
              analysieren und Inhalte und Werbung zu personalisieren.
            </p>

            <div className="space-y-2">
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto text-blue-600"
              >
                Impressum
              </Button>
              {" • "}
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto text-blue-600"
              >
                Datenschutz
              </Button>
              {" • "}
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto text-blue-600"
              >
                Cookie-Richtlinien
              </Button>
            </div>

            <div className="space-y-3">
              {/* Necessary Cookies */}
              <Card>
                <CardHeader
                  className="cursor-pointer p-3"
                  onClick={() => toggleCategory("necessary")}
                >
                  <CardTitle className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {expandedCategories.includes("necessary") ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      Notwendige Cookies
                    </div>
                    <Switch
                      checked={settings.necessary}
                      disabled
                      className="pointer-events-none"
                    />
                  </CardTitle>
                </CardHeader>
                {expandedCategories.includes("necessary") && (
                  <CardContent className="p-3 pt-0">
                    <p className="text-xs text-gray-600">
                      Diese Cookies sind für das Funktionieren der Website
                      erforderlich und können nicht deaktiviert werden.
                    </p>
                  </CardContent>
                )}
              </Card>

              {/* Marketing Cookies */}
              <Card>
                <CardHeader
                  className="cursor-pointer p-3"
                  onClick={() => toggleCategory("marketing")}
                >
                  <CardTitle className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {expandedCategories.includes("marketing") ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      Cookies für Marketing
                    </div>
                    <Switch
                      checked={settings.marketing}
                      onCheckedChange={(checked) =>
                        updateSetting("marketing", checked)
                      }
                    />
                  </CardTitle>
                </CardHeader>
                {expandedCategories.includes("marketing") && (
                  <CardContent className="p-3 pt-0">
                    <p className="text-xs text-gray-600">
                      Diese Cookies werden verwendet, um Ihnen relevante Werbung
                      basierend auf Ihren Interessen anzuzeigen.
                    </p>
                  </CardContent>
                )}
              </Card>

              {/* Analytics Cookies */}
              <Card>
                <CardHeader
                  className="cursor-pointer p-3"
                  onClick={() => toggleCategory("analytics")}
                >
                  <CardTitle className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {expandedCategories.includes("analytics") ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      Analyse-Cookies
                    </div>
                    <Switch
                      checked={settings.analytics}
                      onCheckedChange={(checked) =>
                        updateSetting("analytics", checked)
                      }
                    />
                  </CardTitle>
                </CardHeader>
                {expandedCategories.includes("analytics") && (
                  <CardContent className="p-3 pt-0">
                    <p className="text-xs text-gray-600">
                      Diese Cookies helfen uns zu verstehen, wie Besucher mit
                      der Website interagieren.
                    </p>
                  </CardContent>
                )}
              </Card>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <Button onClick={handleAcceptAll} className="w-full">
                Alle Cookies akzeptieren
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleSaveSelection}
                >
                  Auswahl speichern
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleRejectAll}
                >
                  Alle ablehnen
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
