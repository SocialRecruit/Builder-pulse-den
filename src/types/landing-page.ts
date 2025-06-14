export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  createdAt: string;
}

export interface LandingPageHeader {
  title: string;
  image?: string;
  text: string;
  subheadline?: string;
  location?: string;
  startDate?: string;
  employmentType?: string;
  height?: string;
  customHeight?: number; // Custom height in pixels (0-1000px)
  alignment?: string;
  overlay?: string;
  overlayOpacity?: number;
  overlayColor?: string; // Custom overlay color
  titleFontSize?: number; // Title font size in pixels (24-96px)
}

export interface ContentBlock {
  id: string;
  type:
    | "heading"
    | "text"
    | "richtext"
    | "image"
    | "button"
    | "form"
    | "spacer";
  content: any;
  order: number;
}

export interface HeadingBlock {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ContentBlock {
  id: string;
  type:
    | "heading"
    | "text"
    | "richtext"
    | "image"
    | "button"
    | "form"
    | "sourcecode"
    | "spacer";
  content: any;
  order: number;
}

export interface ContentBlock {
  id: string;
  type:
    | "heading"
    | "text"
    | "richtext"
    | "image"
    | "button"
    | "form"
    | "list"
    | "sourcecode"
    | "spacer";
  content: any;
  order: number;
}

export interface ImageBlock {
  src: string;
  alt: string;
  caption?: string;
}

export interface ButtonBlock {
  text: string;
  type: "apply" | "pagebreak" | "submit";
  url?: string;
  style: "primary" | "secondary";
}

export interface FormBlock {
  embedCode: string;
  provider: "funnelforms" | "custom";
}

export interface SpacerBlock {
  height: number;
}

export interface LandingPage {
  id: string;
  slug: string;
  title: string;
  header: LandingPageHeader;
  blocks: ContentBlock[];
  footer: {
    showImpressum: boolean;
    showPrivacy: boolean;
    customFooterText?: string;
  };
  design?: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    containerWidth?: string;
    bodyPadding?: number;
    lineHeight?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  published: boolean;
}

export interface CookieSettings {
  necessary: boolean;
  marketing: boolean;
  analytics: boolean;
}

export interface AppSettings {
  cookieBannerEnabled: boolean;
  cookieSettings: CookieSettings;
  companyName: string;
  companyLogo?: string;
}
