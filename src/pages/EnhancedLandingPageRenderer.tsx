import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLandingPages } from "@/hooks/useLandingPages";
import { getAppSettings } from "@/lib/storage";
import { LandingPage } from "@/types/landing-page";
import { CookieBanner } from "@/components/landing-builder/CookieBanner";

export default function EnhancedLandingPageRenderer() {
  const { slug } = useParams<{ slug: string }>();
  const { getPageBySlug } = useLandingPages();
  const [page, setPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [appSettings, setAppSettings] = useState(getAppSettings());

  useEffect(() => {
    if (slug) {
      const foundPage = getPageBySlug(slug);
      setPage(foundPage || null);
    }
    setLoading(false);
  }, [slug, getPageBySlug]);

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
            Diese Landing Page ist derzeit nicht veröffentlicht.
          </p>
        </div>
      </div>
    );
  }

  const getContainerClass = () => {
    switch (page.design?.containerWidth) {
      case "narrow":
        return "max-w-3xl";
      case "normal":
        return "max-w-5xl";
      case "wide":
        return "max-w-7xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-5xl";
    }
  };

  const getAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case "heading":
        const HeadingTag =
          `h${block.content.level || 2}` as keyof JSX.IntrinsicElements;
        const headingSize =
          {
            1: "text-4xl md:text-5xl font-bold",
            2: "text-3xl md:text-4xl font-bold",
            3: "text-2xl md:text-3xl font-semibold",
            4: "text-xl md:text-2xl font-semibold",
          }[block.content.level] || "text-2xl md:text-3xl font-semibold";

        return (
          <HeadingTag
            key={block.id}
            className={`${headingSize} ${getAlignmentClass(block.content.alignment)} mb-4`}
            style={{ color: block.content.color }}
          >
            {block.content.text}
          </HeadingTag>
        );

      case "text":
        return (
          <p
            key={block.id}
            className={`leading-relaxed mb-4 ${getAlignmentClass(block.content.alignment)}`}
          >
            {block.content.text}
          </p>
        );

      case "richtext":
        return (
          <div
            key={block.id}
            className="prose prose-gray max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: block.content.html }}
          />
        );

      case "image":
        if (!block.content.src) return null;
        const imageSize =
          {
            small: "max-w-xs",
            normal: "max-w-2xl",
            large: "max-w-4xl",
            fullwidth: "w-full",
          }[block.content.size] || "max-w-2xl";

        return (
          <figure key={block.id} className="mb-6">
            <img
              src={block.content.src}
              alt={block.content.alt}
              className={`h-auto rounded-lg shadow-sm ${imageSize} ${getAlignmentClass(block.content.alignment)}`}
            />
            {block.content.caption && (
              <figcaption
                className={`text-sm text-gray-600 mt-2 ${getAlignmentClass(block.content.alignment)}`}
              >
                {block.content.caption}
              </figcaption>
            )}
          </figure>
        );

      case "button":
        const buttonVariant =
          {
            primary: "bg-blue-600 hover:bg-blue-700 text-white",
            secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
            success: "bg-green-600 hover:bg-green-700 text-white",
            danger: "bg-red-600 hover:bg-red-700 text-white",
          }[block.content.variant] ||
          "bg-blue-600 hover:bg-blue-700 text-white";

        return (
          <div
            key={block.id}
            className={`flex mb-6 ${getAlignmentClass(block.content.alignment)}`}
          >
            <Button
              className={`font-semibold rounded-lg transition-colors px-6 py-3 ${buttonVariant}`}
              onClick={() =>
                block.content.url && window.open(block.content.url, "_blank")
              }
            >
              {block.content.text}
            </Button>
          </div>
        );

      case "list":
        return (
          <div key={block.id} className="mb-8">
            {block.content.title && (
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
                {block.content.title}
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(block.content.items || []).map(
                (item: any, itemIndex: number) => (
                  <div key={itemIndex} className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{item.emoji}</div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        );

      case "form":
        return (
          <div
            key={block.id}
            className="bg-white border rounded-lg p-6 mb-6 shadow-sm"
          >
            {block.content.title && (
              <h3 className="text-xl font-semibold mb-4">
                {block.content.title}
              </h3>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Demo: Bewerbung würde hier abgesendet werden!");
              }}
              className="space-y-4"
            >
              {(block.content.fields || []).map(
                (field: any, fieldIndex: number) => (
                  <div key={fieldIndex} className="space-y-2">
                    <Label htmlFor={`field-${fieldIndex}`}>
                      {field.label}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </Label>

                    {field.type === "textarea" ? (
                      <Textarea
                        id={`field-${fieldIndex}`}
                        required={field.required}
                        placeholder={field.placeholder}
                        rows={4}
                      />
                    ) : field.type === "file" ? (
                      <Input
                        id={`field-${fieldIndex}`}
                        type="file"
                        required={field.required}
                        accept=".pdf,.doc,.docx,.txt"
                      />
                    ) : (
                      <Input
                        id={`field-${fieldIndex}`}
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ),
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Bewerbung absenden
              </Button>
            </form>
          </div>
        );

      case "spacer":
        return (
          <div
            key={block.id}
            style={{
              height: `${block.content.height || 40}px`,
              backgroundColor: block.content.backgroundColor || "transparent",
            }}
            className="w-full"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: page.design?.backgroundColor || "#ffffff",
        color: page.design?.textColor || "#000000",
        fontFamily: page.design?.fontFamily || "Inter",
        lineHeight:
          page.design?.lineHeight === "tight"
            ? "1.25"
            : page.design?.lineHeight === "relaxed"
              ? "1.75"
              : page.design?.lineHeight === "loose"
                ? "2.0"
                : "1.5",
      }}
    >
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
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: `${page.header.customHeight || 400}px`,
          minHeight: "200px",
        }}
      >
        {/* Background Image */}
        {page.header.image && (
          <div className="absolute inset-0">
            <img
              src={page.header.image}
              alt={page.header.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Overlay */}
        {page.header.overlay && page.header.overlay !== "none" && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor:
                page.header.overlay === "black" ? "#000000" : "#ffffff",
              opacity: (page.header.overlayOpacity || 40) / 100,
            }}
          />
        )}

        {/* Content Container */}
        <div
          className={`
            relative h-full flex flex-col justify-center items-center px-6 text-white
            ${page.header.alignment === "left" ? "items-start text-left" : ""}
            ${page.header.alignment === "right" ? "items-end text-right" : ""}
            ${page.header.alignment === "center" ? "items-center text-center" : ""}
          `}
        >
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Subheadline */}
            {page.header.subheadline && (
              <p className="text-sm md:text-base font-medium text-white/90 uppercase tracking-wide">
                {page.header.subheadline}
              </p>
            )}

            {/* Main Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight">
              {page.header.title}
            </h1>

            {/* Job Details */}
            <div className="flex flex-wrap gap-4 text-sm md:text-base">
              {page.header.location && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📍</span>
                  <span>{page.header.location}</span>
                </div>
              )}
              {page.header.startDate && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📅</span>
                  <span>{page.header.startDate}</span>
                </div>
              )}
              {page.header.employmentType && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💼</span>
                  <span>{page.header.employmentType}</span>
                </div>
              )}
            </div>

            {/* Description Text */}
            {page.header.text && (
              <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                {page.header.text}
              </p>
            )}
          </div>
        </div>

        {/* Fallback background if no image */}
        {!page.header.image && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800" />
        )}
      </div>

      {/* Page Content */}
      <main
        className={`container mx-auto px-4 py-8 ${getContainerClass()}`}
        style={{ padding: `${page.design?.bodyPadding || 16}px` }}
      >
        <div className="space-y-6">
          {page.blocks
            .sort((a, b) => a.order - b.order)
            .map((block, index) => renderBlock(block, index))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 mt-12"
        style={{ backgroundColor: page.design?.secondaryColor || "#374151" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 text-white">
            {page.footer.customFooterText && (
              <p className="opacity-90">{page.footer.customFooterText}</p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              {page.footer.showImpressum && (
                <Link
                  to="/impressum"
                  className="hover:text-gray-300 transition-colors"
                >
                  Impressum
                </Link>
              )}
              {page.footer.showPrivacy && (
                <Link
                  to="/privacy"
                  className="hover:text-gray-300 transition-colors"
                >
                  Datenschutz
                </Link>
              )}
            </div>

            <div className="text-xs opacity-75 pt-4 border-t border-gray-600">
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
