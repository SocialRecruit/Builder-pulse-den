import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLandingPages } from "@/hooks/useLandingPages";
import { getAppSettings } from "@/lib/storage";
import { LandingPage } from "@/types/landing-page";
import { CookieBanner } from "@/components/landing-builder/CookieBanner";

export default function EnhancedLandingPageRendererComplete() {
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">😔</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Seite nicht gefunden
          </h1>
          <p className="text-gray-600 max-w-md mx-auto text-lg">
            Die angeforderte Landing Page konnte nicht gefunden werden.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">🚧</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Seite nicht verfügbar
          </h1>
          <p className="text-gray-600 max-w-md mx-auto text-lg">
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
        return "max-w-full px-4";
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

  const getFontFamilyClass = (fontFamily: string) => {
    switch (fontFamily) {
      case "montserrat":
        return "font-['Montserrat',sans-serif]";
      case "roboto":
        return "font-['Roboto',sans-serif]";
      case "opensans":
        return "font-['Open_Sans',sans-serif]";
      case "lato":
        return "font-['Lato',sans-serif]";
      case "poppins":
        return "font-['Poppins',sans-serif]";
      default:
        return "font-['Montserrat',sans-serif]";
    }
  };

  const getLineHeightClass = (lineHeight: string) => {
    switch (lineHeight) {
      case "tight":
        return "leading-tight";
      case "normal":
        return "leading-normal";
      case "relaxed":
        return "leading-relaxed";
      case "loose":
        return "leading-loose";
      default:
        return "leading-normal";
    }
  };

  // Header overlay styles
  const getHeaderOverlayStyle = () => {
    if (!page.header.overlay || page.header.overlay === "none") {
      return {};
    }

    const opacity = (page.header.overlayOpacity || 40) / 100;

    switch (page.header.overlay) {
      case "black":
        return {
          backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        };
      case "white":
        return {
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        };
      case "custom":
        const color = page.header.overlayColor || "#000000";
        // Convert hex to RGB for transparency
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return {
          backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})`,
        };
      default:
        return {};
    }
  };

  const renderBlock = (block: any, index: number) => {
    const blockStyles = block.content.styles || {};
    const blockContainerStyle = {
      padding: blockStyles.padding ? `${blockStyles.padding}px` : undefined,
      margin: blockStyles.margin ? `${blockStyles.margin}px 0` : undefined,
      backgroundColor: blockStyles.backgroundColor || undefined,
      borderRadius: blockStyles.borderRadius
        ? `${blockStyles.borderRadius}px`
        : undefined,
      boxShadow: blockStyles.shadow
        ? {
            sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
            "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
          }[blockStyles.shadow]
        : undefined,
    };

    const blockContent = (() => {
      switch (block.type) {
        case "heading":
          const HeadingTag =
            `h${block.content.level || 2}` as keyof JSX.IntrinsicElements;
          const headingSize =
            {
              1: "text-4xl md:text-5xl lg:text-6xl font-bold",
              2: "text-3xl md:text-4xl lg:text-5xl font-bold",
              3: "text-2xl md:text-3xl lg:text-4xl font-semibold",
              4: "text-xl md:text-2xl lg:text-3xl font-semibold",
            }[block.content.level] ||
            "text-2xl md:text-3xl lg:text-4xl font-semibold";

          return (
            <HeadingTag
              className={`${headingSize} ${getAlignmentClass(block.content.alignment)} mb-6`}
              style={{ color: block.content.color }}
            >
              {block.content.text}
            </HeadingTag>
          );

        case "text":
          const textSize =
            {
              sm: "text-sm",
              base: "text-base md:text-lg",
              lg: "text-lg md:text-xl",
              xl: "text-xl md:text-2xl",
            }[block.content.fontSize] || "text-base md:text-lg";

          return (
            <div
              className={`${textSize} leading-relaxed mb-6 ${getAlignmentClass(block.content.alignment)}`}
              style={{ color: block.content.color }}
            >
              <p className="whitespace-pre-line">{block.content.text}</p>
            </div>
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
            <figure className="mb-8">
              <div className={`${getAlignmentClass(block.content.alignment)}`}>
                <img
                  src={block.content.src}
                  alt={block.content.alt}
                  className={`h-auto rounded-lg shadow-sm ${imageSize} ${getAlignmentClass(block.content.alignment) === "text-center" ? "mx-auto" : ""}`}
                />
              </div>
              {block.content.caption && (
                <figcaption
                  className={`text-sm text-gray-600 mt-3 ${getAlignmentClass(block.content.alignment)}`}
                >
                  {block.content.caption}
                </figcaption>
              )}
            </figure>
          );

        case "button":
          const buttonVariant =
            {
              primary:
                "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
              secondary:
                "bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md hover:shadow-lg",
              success:
                "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl",
              danger:
                "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl",
            }[block.content.variant] ||
            "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl";

          const buttonSize =
            {
              sm: "px-4 py-2 text-sm",
              md: "px-6 py-3 text-base",
              lg: "px-8 py-4 text-lg",
              xl: "px-10 py-5 text-xl",
            }[block.content.size] || "px-6 py-3 text-base";

          const buttonEffect = block.content.effect
            ? {
                scale: "transform transition-all duration-200 hover:scale-105",
                glow: "transition-all duration-200 hover:shadow-2xl",
                bounce: "transition-all duration-200 hover:animate-bounce",
              }[block.content.effect] || ""
            : "";

          return (
            <div
              className={`flex mb-8 ${getAlignmentClass(block.content.alignment)}`}
            >
              <Button
                className={`font-semibold rounded-lg transition-all duration-300 ${buttonVariant} ${buttonSize} ${buttonEffect}`}
                onClick={() => {
                  if (block.content.url) {
                    if (block.content.url.startsWith("#")) {
                      const element = document.querySelector(block.content.url);
                      element?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.open(block.content.url, "_blank");
                    }
                  }
                }}
              >
                {block.content.emoji && (
                  <span className="mr-2">{block.content.emoji}</span>
                )}
                {block.content.text}
              </Button>
            </div>
          );

        case "list":
          const listColumns =
            {
              1: "grid-cols-1",
              2: "grid-cols-1 md:grid-cols-2",
              3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            }[block.content.columns] || "grid-cols-1 md:grid-cols-2";

          return (
            <div className="mb-10">
              {block.content.title && (
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
                  {block.content.title}
                </h3>
              )}
              <div className={`grid ${listColumns} gap-6`}>
                {(block.content.items || []).map(
                  (item: any, itemIndex: number) => (
                    <div
                      key={itemIndex}
                      className="flex items-start gap-4 p-4 rounded-lg bg-white/80 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="text-3xl flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full">
                        {item.emoji}
                      </div>
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
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-lg">
              {block.content.title && (
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  {block.content.title}
                </h3>
              )}
              {block.content.description && (
                <p className="text-gray-600 mb-6 text-center">
                  {block.content.description}
                </p>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Demo: Bewerbung würde hier abgesendet werden!");
                }}
                className="space-y-6"
              >
                {(block.content.fields || []).map(
                  (field: any, fieldIndex: number) => (
                    <div key={fieldIndex} className="space-y-2">
                      <Label
                        htmlFor={`field-${fieldIndex}`}
                        className="text-base font-medium"
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </Label>

                      {field.type === "textarea" ? (
                        <Textarea
                          id={`field-${fieldIndex}`}
                          required={field.required}
                          placeholder={field.placeholder}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : field.type === "file" ? (
                        <Input
                          id={`field-${fieldIndex}`}
                          type="file"
                          required={field.required}
                          accept=".pdf,.doc,.docx,.txt"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <Input
                          id={`field-${fieldIndex}`}
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  ),
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium rounded-lg transition-colors duration-200"
                >
                  {block.content.submitButtonText || "Bewerbung absenden"}
                </Button>
              </form>
            </div>
          );

        case "spacer":
          return (
            <div
              style={{
                height: `${block.content.height || 40}px`,
                backgroundColor: block.content.backgroundColor || "transparent",
              }}
            />
          );

        default:
          return null;
      }
    })();

    return (
      <div key={block.id} style={blockContainerStyle}>
        {blockContent}
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen ${getFontFamilyClass(page.design?.fontFamily || "montserrat")} ${getLineHeightClass(page.design?.lineHeight || "normal")}`}
      style={{
        backgroundColor: page.design?.backgroundColor || "#ffffff",
        color: page.design?.textColor || "#1f2937",
        padding: `${page.design?.bodyPadding || 24}px 0`,
      }}
    >
      {/* SEO Meta Tags */}
      <head>
        <title>{page.seoTitle || page.title}</title>
        <meta
          name="description"
          content={page.seoDescription || page.header.text}
        />
        <meta property="og:title" content={page.seoTitle || page.title} />
        <meta
          property="og:description"
          content={page.seoDescription || page.header.text}
        />
        {page.header.image && (
          <meta property="og:image" content={page.header.image} />
        )}
      </head>

      {/* Header Section */}
      <header
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: `${page.header.customHeight || 400}px`,
          backgroundImage: page.header.image
            ? `url(${page.header.image})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Background Overlay */}
        {page.header.overlay && page.header.overlay !== "none" && (
          <div className="absolute inset-0" style={getHeaderOverlayStyle()} />
        )}

        {/* Header Content */}
        <div
          className={`relative z-10 ${getContainerClass()} mx-auto px-6 ${getAlignmentClass(page.header.alignment || "center")}`}
        >
          <div className="space-y-6">
            {/* Main Title */}
            <h1
              className="font-bold leading-tight"
              style={{
                fontSize: `${page.header.titleFontSize || 48}px`,
                color: page.header.overlay === "white" ? "#1f2937" : "#ffffff",
              }}
            >
              {page.header.title}
            </h1>

            {/* Subtitle */}
            {page.header.subheadline && (
              <h2
                className="text-xl md:text-2xl font-medium opacity-90"
                style={{
                  color:
                    page.header.overlay === "white" ? "#4b5563" : "#f3f4f6",
                }}
              >
                {page.header.subheadline}
              </h2>
            )}

            {/* Description */}
            {page.header.text && (
              <p
                className="text-lg md:text-xl leading-relaxed max-w-3xl opacity-90"
                style={{
                  color:
                    page.header.overlay === "white" ? "#6b7280" : "#e5e7eb",
                }}
              >
                {page.header.text}
              </p>
            )}

            {/* Job Details */}
            {(page.header.location ||
              page.header.startDate ||
              page.header.employmentType) && (
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {page.header.location && (
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-gray-800 px-4 py-2 text-base"
                  >
                    📍 {page.header.location}
                  </Badge>
                )}
                {page.header.startDate && (
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-gray-800 px-4 py-2 text-base"
                  >
                    📅 {page.header.startDate}
                  </Badge>
                )}
                {page.header.employmentType && (
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-gray-800 px-4 py-2 text-base"
                  >
                    💼 {page.header.employmentType}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`${getContainerClass()} mx-auto px-6 py-12`}>
        <div className="space-y-8">
          {page.blocks
            .sort((a, b) => a.order - b.order)
            .map((block, index) => renderBlock(block, index))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
        <div className={`${getContainerClass()} mx-auto px-6 text-center`}>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {page.footer.showImpressum && (
              <Link
                to="/impressum"
                className="hover:text-gray-900 transition-colors"
              >
                Impressum
              </Link>
            )}
            {page.footer.showPrivacy && (
              <Link
                to="/privacy"
                className="hover:text-gray-900 transition-colors"
              >
                Datenschutz
              </Link>
            )}
          </div>
          {page.footer.customFooterText && (
            <p className="text-sm text-gray-500 mt-4">
              {page.footer.customFooterText}
            </p>
          )}
        </div>
      </footer>

      {/* Cookie Banner */}
      {appSettings.cookieBannerEnabled && <CookieBanner />}
    </div>
  );
}
