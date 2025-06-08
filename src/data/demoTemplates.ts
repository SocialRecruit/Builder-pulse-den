import { LandingPage } from "@/types/landing-page";

export interface DemoTemplate {
  id: string;
  name: string;
  description: string;
  category: "hr" | "tech" | "sales" | "marketing" | "healthcare";
  preview: string;
  template: Omit<
    LandingPage,
    "id" | "slug" | "createdAt" | "updatedAt" | "createdBy"
  >;
}

export const demoTemplates: DemoTemplate[] = [
  {
    id: "marketing-manager",
    name: "Marketing Manager (m/w/d)",
    description: "Moderne Landing Page für Marketing-Positionen",
    category: "marketing",
    preview:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop",
    template: {
      title: "Marketing Manager (m/w/d)",
      header: {
        title: "Werde jetzt Marketing Manager (m/w/d) bei uns",
        image:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=600&fit=crop",
        text: "Gestalte die Zukunft des digitalen Marketings mit uns",
        subheadline: "Dein Traumjob wartet auf dich!",
        location: "Berlin oder Remote",
        startDate: "ab sofort",
        employmentType: "Vollzeit",
        customHeight: 500,
        alignment: "center",
        overlay: "black",
        overlayOpacity: 40,
      },
      blocks: [
        {
          id: "1",
          type: "heading",
          content: {
            text: "Was dich erwartet",
            level: 2,
            alignment: "center",
            color: "#2563eb",
            margin: { top: 40, bottom: 20 },
          },
          order: 0,
        },
        {
          id: "2",
          type: "list",
          content: {
            title: "Deine Aufgaben",
            items: [
              {
                emoji: "🎯",
                text: "Entwicklung und Umsetzung innovativer Marketing-Strategien",
              },
              {
                emoji: "📊",
                text: "Analyse und Optimierung bestehender Kampagnen",
              },
              {
                emoji: "🚀",
                text: "Führung und Mentoring eines dynamischen Teams",
              },
              {
                emoji: "💡",
                text: "Kreative Content-Erstellung für verschiedene Kanäle",
              },
              { emoji: "🔍", text: "Marktforschung und Trend-Analyse" },
              { emoji: "🤝", text: "Enge Zusammenarbeit mit dem Sales-Team" },
            ],
            columns: 2,
            alignment: "left",
          },
          order: 1,
        },
        {
          id: "3",
          type: "button",
          content: {
            text: "Jetzt bewerben",
            emoji: "🎯",
            variant: "primary",
            size: "lg",
            effect: "scale",
            rounded: "lg",
            shadow: "lg",
            alignment: "center",
            url: "#bewerbung",
          },
          order: 2,
        },
        {
          id: "4",
          type: "form",
          content: {
            title: "Schnellbewerbung",
            description: "Bewirb dich in wenigen Minuten",
            fields: [
              {
                id: "name",
                label: "Vollständiger Name",
                type: "text",
                required: true,
                placeholder: "Ihr Name",
              },
              {
                id: "email",
                label: "E-Mail-Adresse",
                type: "email",
                required: true,
                placeholder: "ihre.email@beispiel.de",
              },
              {
                id: "phone",
                label: "Telefon",
                type: "tel",
                required: false,
                placeholder: "+49 123 456789",
              },
              {
                id: "motivation",
                label: "Warum möchten Sie bei uns arbeiten?",
                type: "textarea",
                required: true,
                placeholder: "Erzählen Sie uns von Ihrer Motivation...",
              },
              {
                id: "cv",
                label: "Lebenslauf",
                type: "file",
                required: true,
                placeholder: "",
              },
            ],
            submitButtonText: "Bewerbung absenden",
            successMessage:
              "Vielen Dank! Ihre Bewerbung wurde erfolgreich gesendet.",
            emailConfig: {
              destinationEmail: "jobs@unternehmen.de",
              enableAutoReply: true,
              autoReplySubject: "Ihre Bewerbung ist bei uns eingegangen",
              autoReplyTemplate:
                "Liebe/r {name},\n\nvielen Dank für Ihre Bewerbung als Marketing Manager. Wir prüfen Ihre Unterlagen und melden uns binnen 2 Wochen bei Ihnen.\n\nMit freundlichen Grüßen\nIhr HR-Team",
              senderName: "HR Team",
              senderEmail: "noreply@unternehmen.de",
            },
            styling: {
              fieldSpacing: "normal",
              buttonStyle: "primary",
              alignment: "left",
            },
          },
          order: 3,
        },
      ],
      footer: {
        showImpressum: true,
        showPrivacy: true,
        customFooterText: "© 2024 Ihr Unternehmen. Alle Rechte vorbehalten.",
      },
      design: {
        primaryColor: "#2563eb",
        secondaryColor: "#64748b",
        backgroundColor: "#ffffff",
        textColor: "#1f2937",
        fontFamily: "montserrat",
        containerWidth: "normal",
        bodyPadding: 24,
        lineHeight: "normal",
      },
      seoTitle: "Marketing Manager (m/w/d) - Jetzt bewerben",
      seoDescription:
        "Werde Teil unseres Marketing-Teams! Remote oder vor Ort in Berlin. Innovative Projekte, tolles Team, faire Bezahlung.",
      published: false,
    },
  },
  {
    id: "software-developer",
    name: "Software Developer (m/w/d)",
    description: "Tech-fokussierte Landing Page für Entwickler",
    category: "tech",
    preview:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    template: {
      title: "Software Developer (m/w/d)",
      header: {
        title: "Code the Future - Software Developer (m/w/d)",
        image:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=600&fit=crop",
        text: "Entwickle mit uns die Technologien von morgen",
        subheadline: "Join our Engineering Team",
        location: "München, Berlin oder Remote",
        startDate: "ab sofort",
        employmentType: "Vollzeit",
        customHeight: 450,
        alignment: "center",
        overlay: "black",
        overlayOpacity: 50,
      },
      blocks: [
        {
          id: "1",
          type: "heading",
          content: {
            text: "Tech Stack & Tools",
            level: 2,
            alignment: "center",
            color: "#059669",
          },
          order: 0,
        },
        {
          id: "2",
          type: "list",
          content: {
            title: "Was wir verwenden",
            items: [
              { emoji: "⚛️", text: "React, Next.js, TypeScript" },
              { emoji: "🐍", text: "Python, Django, FastAPI" },
              { emoji: "☁️", text: "AWS, Docker, Kubernetes" },
              { emoji: "🗄️", text: "PostgreSQL, MongoDB, Redis" },
              { emoji: "🔄", text: "Git, CI/CD, Testing" },
              { emoji: "🎨", text: "Figma, Storybook, Design Systems" },
            ],
            columns: 2,
            alignment: "left",
          },
          order: 1,
        },
        {
          id: "3",
          type: "text",
          content: {
            text: "Wir suchen einen erfahrenen Software Developer, der Lust hat, innovative Produkte zu entwickeln und dabei modernste Technologien zu verwenden. Bei uns erwarten dich spannende Projekte, ein agiles Team und die Möglichkeit, dich kontinuierlich weiterzuentwickeln.",
            alignment: "center",
            fontSize: "lg",
          },
          order: 2,
        },
        {
          id: "4",
          type: "button",
          content: {
            text: "GitHub Portfolio zeigen",
            emoji: "💻",
            variant: "success",
            size: "lg",
            effect: "glow",
            rounded: "lg",
            shadow: "xl",
            alignment: "center",
            url: "#bewerbung",
          },
          order: 3,
        },
      ],
      footer: {
        showImpressum: true,
        showPrivacy: true,
        customFooterText: "Werde Teil unseres Entwickler-Teams!",
      },
      design: {
        primaryColor: "#059669",
        secondaryColor: "#374151",
        backgroundColor: "#ffffff",
        textColor: "#111827",
        fontFamily: "montserrat",
        containerWidth: "normal",
        bodyPadding: 24,
        lineHeight: "relaxed",
      },
      seoTitle: "Software Developer (m/w/d) - Python, React, AWS",
      seoDescription:
        "Entwickle mit uns innovative Software-Lösungen. Remote-friendly, moderner Tech-Stack, agiles Team.",
      published: false,
    },
  },
  {
    id: "sales-representative",
    name: "Sales Representative (m/w/d)",
    description: "Verkaufsorientierte Landing Page",
    category: "sales",
    preview:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=200&fit=crop",
    template: {
      title: "Sales Representative (m/w/d)",
      header: {
        title: "Verkaufstalent gesucht - Sales Representative (m/w/d)",
        image:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=600&fit=crop",
        text: "Erreiche deine Verkaufsziele und verdiene überdurchschnittlich",
        subheadline: "Unlimited Earning Potential",
        location: "Deutschlandweit",
        startDate: "ab sofort",
        employmentType: "Vollzeit",
        customHeight: 400,
        alignment: "center",
        overlay: "black",
        overlayOpacity: 35,
      },
      blocks: [
        {
          id: "1",
          type: "heading",
          content: {
            text: "Deine Benefits",
            level: 2,
            alignment: "center",
            color: "#dc2626",
          },
          order: 0,
        },
        {
          id: "2",
          type: "list",
          content: {
            title: "Was wir bieten",
            items: [
              { emoji: "💰", text: "Attraktive Provision + Fixgehalt" },
              { emoji: "🚗", text: "Firmenwagen auch zur Privatnutzung" },
              { emoji: "📱", text: "Modernste Sales-Tools und CRM" },
              { emoji: "🎯", text: "Realistische und faire Ziele" },
              { emoji: "🏆", text: "Leistungsboni und Incentives" },
              { emoji: "📈", text: "Persönliche Weiterentwicklung" },
            ],
            columns: 2,
            alignment: "left",
          },
          order: 1,
        },
        {
          id: "3",
          type: "button",
          content: {
            text: "Jetzt durchstarten!",
            emoji: "🚀",
            variant: "danger",
            size: "xl",
            effect: "bounce",
            rounded: "lg",
            shadow: "xl",
            alignment: "center",
            url: "#bewerbung",
          },
          order: 2,
        },
      ],
      footer: {
        showImpressum: true,
        showPrivacy: true,
        customFooterText: "Starte deine Verkaufskarriere bei uns!",
      },
      design: {
        primaryColor: "#dc2626",
        secondaryColor: "#374151",
        backgroundColor: "#ffffff",
        textColor: "#111827",
        fontFamily: "montserrat",
        containerWidth: "normal",
        bodyPadding: 24,
        lineHeight: "normal",
      },
      seoTitle: "Sales Representative (m/w/d) - Top Provision + Benefits",
      seoDescription:
        "Verkaufstalent gesucht! Attraktive Provision, Firmenwagen, faire Ziele. Bewirb dich jetzt!",
      published: false,
    },
  },
];

export function getDemoTemplatesByCategory(category?: string): DemoTemplate[] {
  if (!category || category === "all") {
    return demoTemplates;
  }
  return demoTemplates.filter((template) => template.category === category);
}

export function getDemoTemplateById(id: string): DemoTemplate | undefined {
  return demoTemplates.find((template) => template.id === id);
}
