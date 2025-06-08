import {
  ContentBlock,
  HeadingBlock,
  TextBlock,
  RichTextBlock,
  ImageBlock,
  ButtonBlock,
  FormBlock,
  SpacerBlock,
} from "@/types/landing-page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlockRendererProps {
  block: ContentBlock;
  className?: string;
  isPreview?: boolean;
}

export const BlockRenderer = ({
  block,
  className,
  isPreview = false,
}: BlockRendererProps) => {
  const renderBlock = () => {
    switch (block.type) {
      case "heading":
        return <HeadingRenderer content={block.content} />;
      case "text":
        return <TextRenderer content={block.content} />;
      case "richtext":
        return <RichTextRenderer content={block.content} />;
      case "image":
        return <ImageRenderer content={block.content} />;
      case "button":
        return <ButtonRenderer content={block.content} isPreview={isPreview} />;
      case "form":
        return <FormRenderer content={block.content} />;
      case "spacer":
        return <SpacerRenderer content={block.content} />;
      default:
        return <div>Unbekannter Block-Typ</div>;
    }
  };

  return <div className={cn("w-full", className)}>{renderBlock()}</div>;
};

const HeadingRenderer = ({ content }: { content: HeadingBlock }) => {
  const Tag = `h${content.level}` as keyof JSX.IntrinsicElements;

  const getHeadingStyles = (level: number) => {
    switch (level) {
      case 1:
        return "text-4xl font-bold text-gray-900 mb-6";
      case 2:
        return "text-3xl font-bold text-gray-900 mb-4";
      case 3:
        return "text-2xl font-semibold text-gray-800 mb-3";
      case 4:
        return "text-xl font-semibold text-gray-800 mb-2";
      case 5:
        return "text-lg font-medium text-gray-700 mb-2";
      case 6:
        return "text-base font-medium text-gray-700 mb-1";
      default:
        return "text-2xl font-semibold text-gray-800 mb-3";
    }
  };

  return <Tag className={getHeadingStyles(content.level)}>{content.text}</Tag>;
};

const TextRenderer = ({ content }: { content: TextBlock }) => {
  return <p className="text-gray-700 leading-relaxed mb-4">{content.text}</p>;
};

const RichTextRenderer = ({ content }: { content: RichTextBlock }) => {
  return (
    <div
      className="prose prose-gray max-w-none mb-4"
      dangerouslySetInnerHTML={{ __html: content.html }}
    />
  );
};

const ImageRenderer = ({ content }: { content: ImageBlock }) => {
  if (!content.src) {
    return (
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
        <p className="text-gray-500">Kein Bild ausgewählt</p>
      </div>
    );
  }

  return (
    <figure className="mb-4">
      <img
        src={content.src}
        alt={content.alt}
        className="w-full h-auto rounded-lg shadow-sm"
      />
      {content.caption && (
        <figcaption className="text-sm text-gray-600 text-center mt-2">
          {content.caption}
        </figcaption>
      )}
    </figure>
  );
};

const ButtonRenderer = ({
  content,
  isPreview,
}: {
  content: ButtonBlock;
  isPreview?: boolean;
}) => {
  const getButtonStyles = (style: string) => {
    switch (style) {
      case "primary":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "secondary":
        return "bg-gray-200 hover:bg-gray-300 text-gray-800";
      default:
        return "bg-green-600 hover:bg-green-700 text-white";
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isPreview) {
      e.preventDefault();
      return;
    }

    if (content.type === "apply" && content.url) {
      window.open(content.url, "_blank");
    } else if (content.type === "pagebreak") {
      // Scroll to next section or page
      const nextSection = document.querySelector(".next-section");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <Button
        size="lg"
        className={cn(
          "px-8 py-3 font-semibold rounded-lg transition-colors",
          getButtonStyles(content.style),
        )}
        onClick={handleClick}
        type={content.type === "submit" ? "submit" : "button"}
      >
        {content.text}
      </Button>
    </div>
  );
};

const FormRenderer = ({ content }: { content: FormBlock }) => {
  if (!content.embedCode) {
    return (
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
        <p className="text-gray-500">Kein Formular-Code eingefügt</p>
      </div>
    );
  }

  return (
    <div
      className="mb-4"
      dangerouslySetInnerHTML={{ __html: content.embedCode }}
    />
  );
};

const SpacerRenderer = ({ content }: { content: SpacerBlock }) => {
  return <div style={{ height: `${content.height}px` }} className="w-full" />;
};
