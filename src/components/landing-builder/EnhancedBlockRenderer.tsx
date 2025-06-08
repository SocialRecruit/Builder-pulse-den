import { ContentBlock } from "@/types/landing-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface EnhancedBlockRendererProps {
  block: ContentBlock;
  className?: string;
  isPreview?: boolean;
}

export const EnhancedBlockRenderer = ({
  block,
  className,
  isPreview = false,
}: EnhancedBlockRendererProps) => {
  const renderBlock = () => {
    switch (block.type) {
      case "heading":
        return <EnhancedHeadingRenderer content={block.content} />;
      case "text":
        return <EnhancedTextRenderer content={block.content} />;
      case "richtext":
        return <EnhancedRichTextRenderer content={block.content} />;
      case "image":
        return <EnhancedImageRenderer content={block.content} />;
      case "button":
        return (
          <EnhancedButtonRenderer
            content={block.content}
            isPreview={isPreview}
          />
        );
      case "form":
        return (
          <EnhancedFormRenderer content={block.content} isPreview={isPreview} />
        );
      case "sourcecode":
        return <EnhancedSourceCodeRenderer content={block.content} />;
      case "spacer":
        return <EnhancedSpacerRenderer content={block.content} />;
      default:
        return <div>Unbekannter Block-Typ: {block.type}</div>;
    }
  };

  return <div className={cn("w-full", className)}>{renderBlock()}</div>;
};

const EnhancedHeadingRenderer = ({ content }: { content: any }) => {
  const Tag = `h${content.level || 2}` as keyof JSX.IntrinsicElements;

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

  const getSizeClass = (level: number) => {
    switch (level) {
      case 1:
        return "text-4xl md:text-5xl font-bold";
      case 2:
        return "text-3xl md:text-4xl font-bold";
      case 3:
        return "text-2xl md:text-3xl font-semibold";
      case 4:
        return "text-xl md:text-2xl font-semibold";
      case 5:
        return "text-lg md:text-xl font-medium";
      case 6:
        return "text-base md:text-lg font-medium";
      default:
        return "text-2xl md:text-3xl font-semibold";
    }
  };

  return (
    <Tag
      className={cn(
        getSizeClass(content.level || 2),
        getAlignmentClass(content.alignment),
        "mb-4",
      )}
      style={{ color: content.color }}
    >
      {content.text || "Überschrift"}
    </Tag>
  );
};

const EnhancedTextRenderer = ({ content }: { content: any }) => {
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

  const getFontSizeClass = (fontSize: string) => {
    switch (fontSize) {
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      default:
        return "text-base";
    }
  };

  return (
    <p
      className={cn(
        "leading-relaxed mb-4",
        getAlignmentClass(content.alignment),
        getFontSizeClass(content.fontSize),
      )}
    >
      {content.text || "Text"}
    </p>
  );
};

const EnhancedRichTextRenderer = ({ content }: { content: any }) => {
  if (!content.html) {
    return (
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
        <p className="text-gray-500">Kein Rich Text Inhalt</p>
      </div>
    );
  }

  return (
    <div
      className="prose prose-gray max-w-none mb-4"
      dangerouslySetInnerHTML={{ __html: content.html }}
    />
  );
};

const EnhancedImageRenderer = ({ content }: { content: any }) => {
  if (!content.src) {
    return (
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
        <p className="text-gray-500">Kein Bild ausgewählt</p>
      </div>
    );
  }

  const getSizeClass = (size: string) => {
    switch (size) {
      case "small":
        return "max-w-xs";
      case "normal":
        return "max-w-2xl";
      case "large":
        return "max-w-4xl";
      case "fullwidth":
        return "w-full";
      default:
        return "max-w-2xl";
    }
  };

  const getAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case "left":
        return "mx-0";
      case "center":
        return "mx-auto";
      case "right":
        return "ml-auto mr-0";
      default:
        return "mx-auto";
    }
  };

  return (
    <figure className="mb-4">
      <img
        src={content.src}
        alt={content.alt || "Bild"}
        className={cn(
          "h-auto rounded-lg shadow-sm",
          getSizeClass(content.size),
          getAlignmentClass(content.alignment),
        )}
      />
      {content.caption && (
        <figcaption
          className={cn(
            "text-sm text-gray-600 mt-2",
            content.alignment === "center"
              ? "text-center"
              : content.alignment === "right"
                ? "text-right"
                : "text-left",
          )}
        >
          {content.caption}
        </figcaption>
      )}
    </figure>
  );
};

const EnhancedButtonRenderer = ({
  content,
  isPreview,
}: {
  content: any;
  isPreview?: boolean;
}) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "secondary":
        return "bg-gray-200 hover:bg-gray-300 text-gray-800";
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "warning":
        return "bg-orange-600 hover:bg-orange-700 text-white";
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white";
      case "outline":
        return "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white";
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case "small":
        return "px-3 py-1.5 text-sm";
      case "normal":
        return "px-4 py-2 text-base";
      case "large":
        return "px-6 py-3 text-lg";
      case "xl":
        return "px-8 py-4 text-xl";
      default:
        return "px-4 py-2 text-base";
    }
  };

  const getAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case "left":
        return "justify-start";
      case "center":
        return "justify-center";
      case "right":
        return "justify-end";
      default:
        return "justify-center";
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isPreview) {
      e.preventDefault();
      return;
    }

    if (content.action === "link" && content.url) {
      window.open(content.url, "_blank");
    } else if (content.action === "apply") {
      // Scroll to form or open application modal
      const formSection = document.querySelector('[data-block-type="form"]');
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (content.action === "scroll") {
      // Scroll to next section
      const nextSection = document.querySelector(".next-section");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={cn("flex mb-6", getAlignmentClass(content.alignment))}>
      <Button
        className={cn(
          "font-semibold rounded-lg transition-colors",
          getSizeClass(content.size),
          getVariantStyles(content.variant),
          content.fullWidth && "w-full",
        )}
        onClick={handleClick}
      >
        {content.text || "Button"}
      </Button>
    </div>
  );
};

const EnhancedFormRenderer = ({
  content,
  isPreview,
}: {
  content: any;
  isPreview?: boolean;
}) => {
  if (content.embedCode) {
    return (
      <div
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: content.embedCode }}
      />
    );
  }

  if (!content.fields || content.fields.length === 0) {
    return (
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
        <p className="text-gray-500">Formular konfigurieren</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPreview) {
      alert("Demo: Bewerbung würde hier abgesendet werden!");
      return;
    }
    // Handle form submission
    alert("Bewerbung gesendet! (Demo)");
  };

  return (
    <div className="bg-white border rounded-lg p-6 mb-4" data-block-type="form">
      <form onSubmit={handleSubmit} className="space-y-4">
        {content.title && (
          <h3 className="text-xl font-semibold mb-4">{content.title}</h3>
        )}

        {content.fields.map((field: any, index: number) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`field-${index}`}>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>

            {field.type === "textarea" ? (
              <Textarea
                id={`field-${index}`}
                required={field.required}
                placeholder={field.placeholder}
                rows={4}
              />
            ) : field.type === "file" ? (
              <Input
                id={`field-${index}`}
                type="file"
                required={field.required}
                accept=".pdf,.doc,.docx,.txt"
              />
            ) : (
              <Input
                id={`field-${index}`}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Bewerbung absenden
        </Button>
      </form>
    </div>
  );
};

const EnhancedSourceCodeRenderer = ({ content }: { content: any }) => {
  if (!content.code) {
    return (
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
        <p className="text-gray-500">Kein Quelltext eingegeben</p>
      </div>
    );
  }

  if (content.language === "iframe") {
    return (
      <div className="mb-4">
        <iframe
          srcDoc={content.code}
          className="w-full h-64 border rounded-lg"
          sandbox={
            content.sandbox ? "allow-scripts allow-same-origin" : undefined
          }
        />
      </div>
    );
  }

  return (
    <div className="mb-4" dangerouslySetInnerHTML={{ __html: content.code }} />
  );
};

const EnhancedSpacerRenderer = ({ content }: { content: any }) => {
  return (
    <div
      style={{
        height: `${content.height || 40}px`,
        backgroundColor: content.backgroundColor || "transparent",
      }}
      className="w-full"
    />
  );
};
