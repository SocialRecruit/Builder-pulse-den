import { useState, useEffect } from "react";
import { LandingPage, ContentBlock } from "@/types/landing-page";
import {
  getLandingPages,
  saveLandingPages,
  generateUniqueSlug,
  generateId,
  getCurrentUser,
} from "@/lib/storage";

export const useLandingPages = () => {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPages = () => {
      const storedPages = getLandingPages();
      setPages(storedPages);
      setLoading(false);
    };
    loadPages();
  }, []);

  const createPage = (title: string): LandingPage => {
    const currentUser = getCurrentUser();
    const slug = generateUniqueSlug(title);

    const newPage: LandingPage = {
      id: generateId(),
      slug,
      title,
      header: {
        title: title,
        text: "Willkommen bei " + title,
        image: "",
      },
      blocks: [],
      footer: {
        showImpressum: true,
        showPrivacy: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser?.id || "unknown",
      published: false,
    };

    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    saveLandingPages(updatedPages);

    return newPage;
  };

  const updatePage = (pageId: string, updates: Partial<LandingPage>): void => {
    const updatedPages = pages.map((page) =>
      page.id === pageId
        ? { ...page, ...updates, updatedAt: new Date().toISOString() }
        : page,
    );
    setPages(updatedPages);
    saveLandingPages(updatedPages);
  };

  const deletePage = (pageId: string): void => {
    const updatedPages = pages.filter((page) => page.id !== pageId);
    setPages(updatedPages);
    saveLandingPages(updatedPages);
  };

  const duplicatePage = (pageId: string): LandingPage | null => {
    const originalPage = pages.find((page) => page.id === pageId);
    if (!originalPage) return null;

    const currentUser = getCurrentUser();
    const duplicatedTitle = `${originalPage.title} (Kopie)`;
    const slug = generateUniqueSlug(duplicatedTitle);

    const duplicatedPage: LandingPage = {
      ...originalPage,
      id: generateId(),
      slug,
      title: duplicatedTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser?.id || "unknown",
      published: false,
    };

    const updatedPages = [...pages, duplicatedPage];
    setPages(updatedPages);
    saveLandingPages(updatedPages);

    return duplicatedPage;
  };

  const addBlock = (pageId: string, blockType: ContentBlock["type"]): void => {
    const page = pages.find((p) => p.id === pageId);
    if (!page) return;

    const newBlock: ContentBlock = {
      id: generateId(),
      type: blockType,
      content: getDefaultBlockContent(blockType),
      order: page.blocks.length,
    };

    const updatedBlocks = [...page.blocks, newBlock];
    updatePage(pageId, { blocks: updatedBlocks });
  };

  const updateBlock = (pageId: string, blockId: string, content: any): void => {
    const page = pages.find((p) => p.id === pageId);
    if (!page) return;

    const updatedBlocks = page.blocks.map((block) =>
      block.id === blockId ? { ...block, content } : block,
    );
    updatePage(pageId, { blocks: updatedBlocks });
  };

  const deleteBlock = (pageId: string, blockId: string): void => {
    const page = pages.find((p) => p.id === pageId);
    if (!page) return;

    const updatedBlocks = page.blocks
      .filter((block) => block.id !== blockId)
      .map((block, index) => ({ ...block, order: index }));

    updatePage(pageId, { blocks: updatedBlocks });
  };

  const reorderBlocks = (
    pageId: string,
    sourceIndex: number,
    destinationIndex: number,
  ): void => {
    const page = pages.find((p) => p.id === pageId);
    if (!page) return;

    const updatedBlocks = [...page.blocks];
    const [movedBlock] = updatedBlocks.splice(sourceIndex, 1);
    updatedBlocks.splice(destinationIndex, 0, movedBlock);

    // Update order
    const reorderedBlocks = updatedBlocks.map((block, index) => ({
      ...block,
      order: index,
    }));

    updatePage(pageId, { blocks: reorderedBlocks });
  };

  const getPageBySlug = (slug: string): LandingPage | undefined => {
    return pages.find((page) => page.slug === slug);
  };

  return {
    pages,
    loading,
    createPage,
    updatePage,
    deletePage,
    duplicatePage,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    getPageBySlug,
  };
};

const getDefaultBlockContent = (blockType: ContentBlock["type"]) => {
  switch (blockType) {
    case "heading":
      return { text: "Neue Überschrift", level: 2 };
    case "text":
      return { text: "Hier können Sie Ihren Text eingeben..." };
    case "richtext":
      return { html: "<p>Hier können Sie formatierten Text eingeben...</p>" };
    case "image":
      return { src: "", alt: "Bild", caption: "" };
    case "button":
      return {
        text: "Jetzt bewerben",
        type: "apply",
        style: "primary",
        url: "#",
      };
    case "form":
      return { embedCode: "", provider: "funnelforms" };
    case "spacer":
      return { height: 40 };
    default:
      return {};
  }
};
