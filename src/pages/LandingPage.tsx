import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HeaderSection } from "@/components/landing-builder/HeaderSection";
import { BlockRenderer } from "@/components/landing-builder/BlockRenderer";
import { CookieBanner } from "@/components/landing-builder/CookieBanner";
import { useLandingPages } from "@/hooks/useLandingPages";
import { getAppSettings } from "@/lib/storage";
import { LandingPage as LandingPageType } from "@/types/landing-page";

export default function LandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getPageBySlug } = useLandingPages();
  const [page, setPage] = useState<LandingPageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [appSettings, setAppSettings] = useState(getAppSettings());

  useEffect(() => {
    if (slug) {
      const foundPage = getPageBySlug(slug);
      setPage(foundPage || null);
    }
    setLoading(false);
  }, [slug, getPageBySlug]);

  useEffect(() => {
    if (page) {
      // Set page title and meta description
      document.title = page.seoTitle || page.title;

      if (page.seoDescription) {
        const metaDescription = document.querySelector(
          'meta[name="description"]',
        );
        if (metaDescription) {
          metaDescription.setAttribute("content", page.seoDescription);
        } else {
          const meta = document.createElement("meta");
          meta.name = "description";
          meta.content = page.seoDescription;
          document.head.appendChild(meta);
        }
      }
    }

    return () => {
      // Reset title on unmount
      document.title = "Landing Page Builder";
    };
  }, [page]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">😔</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Seite nicht gefunden
          </h1>
          <p className="text-gray-600 max-w-md">
            Die angeforderte Landing Page konnte nicht gefunden werden.
            Möglicherweise wurde sie gelöscht oder die URL ist falsch.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  if (!page.published) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">🚧</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Seite nicht verfügbar
          </h1>
          <p className="text-gray-600 max-w-md">
            Diese Landing Page ist derzeit nicht veröffentlicht und daher nicht
            öffentlich zugänglich.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Company Logo Header */}
      {appSettings.companyLogo && (
        <div className="bg-gray-100 py-2">
          <div className="container mx-auto px-4 text-center">
            <img
              src={appSettings.companyLogo}
              alt={appSettings.companyName}
              className="h-16 mx-auto"
            />
          </div>
        </div>
      )}

      {/* Page Header */}
      <HeaderSection header={page.header} />

      {/* Page Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {page.blocks
            .sort((a, b) => a.order - b.order)
            .map((block, index) => (
              <div key={block.id} className={index > 0 ? "next-section" : ""}>
                <BlockRenderer block={block} />
              </div>
            ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            {page.footer.customFooterText && (
              <p className="text-gray-300">{page.footer.customFooterText}</p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              {page.footer.showImpressum && (
                <Link
                  to="/impressum"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Impressum
                </Link>
              )}
              {page.footer.showPrivacy && (
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Datenschutz
                </Link>
              )}
            </div>

            <div className="text-xs text-gray-400 pt-4 border-t border-gray-700">
              © {new Date().getFullYear()} {appSettings.companyName}. Alle
              Rechte vorbehalten.
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      {appSettings.cookieBannerEnabled && <CookieBanner />}
    </div>
  );
}
