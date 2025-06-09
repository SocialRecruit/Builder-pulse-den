import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Core Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardSimple from "./pages/Dashboard-Simple";

// Page Builders
import UltimatePageBuilderComplete from "./pages/UltimatePageBuilderComplete";
import WorkingPageBuilderFixed from "./pages/WorkingPageBuilderFixed";

// Landing Page Renderers
import EnhancedLandingPageRenderer from "./pages/EnhancedLandingPageRenderer";
import EnhancedLandingPageRendererComplete from "./pages/EnhancedLandingPageRendererComplete";

// Feature Pages (existierende)
import UserManagement from "./pages/UserManagement";
import Privacy from "./pages/Privacy";
import Impressum from "./pages/Impressum";
import Analytics from "./pages/Analytics";

// Optional Pages (nur wenn sie existieren)
let ButtonGalleryDemo, TemplateGallery, Collaboration, DemoMuseumsmitarbeiter;

try {
  ButtonGalleryDemo = require("./pages/ButtonGalleryDemo").default;
} catch {
  ButtonGalleryDemo = () => <div>Button Gallery Demo nicht verfügbar</div>;
}

try {
  TemplateGallery = require("./pages/TemplateGallery").default;
} catch {
  TemplateGallery = () => <div>Template Gallery nicht verfügbar</div>;
}

try {
  Collaboration = require("./pages/Collaboration").default;
} catch {
  Collaboration = () => <div>Collaboration nicht verfügbar</div>;
}

try {
  DemoMuseumsmitarbeiter = require("./pages/DemoMuseumsmitarbeiter").default;
} catch {
  DemoMuseumsmitarbeiter = () => <div>Demo nicht verfügbar</div>;
}

const queryClient = new QueryClient();

const App = () => {
  console.log("🚀 Landing Page Builder App gestartet");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Core Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-simple" element={<DashboardSimple />} />

            {/* Page Builder Routes */}
            <Route
              path="/page-builder/:pageId"
              element={<UltimatePageBuilderComplete />}
            />
            <Route
              path="/page-builder-classic/:pageId"
              element={<WorkingPageBuilderFixed />}
            />

            {/* Landing Page Routes */}
            <Route
              path="/jobs/:slug"
              element={<EnhancedLandingPageRendererComplete />}
            />
            <Route
              path="/jobs-classic/:slug"
              element={<EnhancedLandingPageRenderer />}
            />

            {/* Feature Pages */}
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/analytics" element={<Analytics />} />

            {/* Optional Feature Pages */}
            <Route path="/button-gallery" element={<ButtonGalleryDemo />} />
            <Route path="/templates" element={<TemplateGallery />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route
              path="/demo/museumsmitarbeiter"
              element={<DemoMuseumsmitarbeiter />}
            />

            {/* Static Pages */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/impressum" element={<Impressum />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
