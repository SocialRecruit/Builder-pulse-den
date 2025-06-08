import { LandingPage, User, AppSettings } from "@/types/landing-page";

const STORAGE_KEYS = {
  LANDING_PAGES: "landing_pages",
  USERS: "users",
  CURRENT_USER: "current_user",
  APP_SETTINGS: "app_settings",
} as const;

// Landing Pages
export const getLandingPages = (): LandingPage[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.LANDING_PAGES);
  return stored ? JSON.parse(stored) : [];
};

export const saveLandingPages = (pages: LandingPage[]): void => {
  localStorage.setItem(STORAGE_KEYS.LANDING_PAGES, JSON.stringify(pages));
};

export const getLandingPageBySlug = (slug: string): LandingPage | null => {
  const pages = getLandingPages();
  return pages.find((page) => page.slug === slug) || null;
};

export const generateUniqueSlug = (title: string): string => {
  const baseSlug = title
    .toLowerCase()
    .replace(/[äöüß]/g, (char) => {
      const map: { [key: string]: string } = {
        ä: "ae",
        ö: "oe",
        ü: "ue",
        ß: "ss",
      };
      return map[char] || char;
    })
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  const pages = getLandingPages();
  const existingSlugs = pages.map((page) => page.slug);

  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// Users
export const getUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.USERS);
  return stored
    ? JSON.parse(stored)
    : [
        {
          id: "admin-1",
          name: "Administrator",
          email: "admin@example.com",
          role: "admin",
          createdAt: new Date().toISOString(),
        },
      ];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!stored) {
    // Set default admin user
    const defaultUser = getUsers()[0];
    setCurrentUser(defaultUser);
    return defaultUser;
  }
  return JSON.parse(stored);
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

// App Settings
export const getAppSettings = (): AppSettings => {
  const stored = localStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
  return stored
    ? JSON.parse(stored)
    : {
        cookieBannerEnabled: true,
        cookieSettings: {
          necessary: true,
          marketing: false,
          analytics: false,
        },
        companyName: "WWS-Strube",
        companyLogo: "",
      };
};

export const saveAppSettings = (settings: AppSettings): void => {
  localStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(settings));
};

// Utility functions
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
