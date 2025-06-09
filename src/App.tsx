import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import WorkingPageBuilder from "./pages/WorkingPageBuilder";
import WorkingPageBuilderFixed from "./pages/WorkingPageBuilderFixed";
import UltimatePageBuilder from "./pages/UltimatePageBuilder";
import EnhancedPageBuilderStable from "./pages/EnhancedPageBuilderStable";
import EnhancedPageBuilderComplete from "./pages/EnhancedPageBuilderComplete";
import WorkingPageBuilderMinimal from "./pages/WorkingPageBuilderMinimal";
import WorkingPageBuilderSimple from "./pages/WorkingPageBuilderSimple";
import TestPageBuilder from "./pages/TestPageBuilder";
import EnhancedLandingPageRenderer from "./pages/EnhancedLandingPageRenderer";
import UserManagement from "./pages/UserManagement";
import Privacy from "./pages/Privacy";
import Impressum from "./pages/Impressum";
import DemoMuseumsmitarbeiter from "./pages/DemoMuseumsmitarbeiter";
import Analytics from "./pages/Analytics";
import TemplateGallery from "./pages/TemplateGallery";
import Collaboration from "./pages/Collaboration";
import ButtonGalleryDemo from "./pages/ButtonGalleryDemo";
import DashboardTest from "./pages/DashboardTest";
import HeaderDemo from "./pages/HeaderDemo";
import TemplateTestPage from "./pages/TemplateTestPage";
import TestDemo from "./pages/TestDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-test" element={<DashboardTest />} />
          <Route
            path="/page-builder/:pageId"
            element={<WorkingPageBuilderFixed />}
          />
          <Route
            path="/test-page-builder/:pageId"
            element={<TestPageBuilder />}
          />
          <Route
            path="/simple-page-builder/:pageId"
            element={<WorkingPageBuilderSimple />}
          />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/jobs/:slug" element={<EnhancedLandingPageRenderer />} />
          <Route
            path="/demo/museumsmitarbeiter"
            element={<DemoMuseumsmitarbeiter />}
          />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/templates" element={<TemplateGallery />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/button-gallery" element={<ButtonGalleryDemo />} />
          <Route path="/header-demo" element={<HeaderDemo />} />
          <Route path="/template-test" element={<TemplateTestPage />} />
          <Route path="/test-demo" element={<TestDemo />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
