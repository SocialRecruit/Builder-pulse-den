import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import WorkingPageBuilderFixed from "./pages/WorkingPageBuilderFixed";
import EnhancedLandingPageRenderer from "./pages/EnhancedLandingPageRenderer";
import UserManagement from "./pages/UserManagement";
import Privacy from "./pages/Privacy";
import Impressum from "./pages/Impressum";
import Analytics from "./pages/Analytics";
import TemplateGallery from "./pages/TemplateGallery";
import ButtonGalleryDemo from "./pages/ButtonGalleryDemo";

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
          <Route
            path="/page-builder/:pageId"
            element={<WorkingPageBuilderFixed />}
          />
          <Route path="/jobs/:slug" element={<EnhancedLandingPageRenderer />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/templates" element={<TemplateGallery />} />
          <Route path="/button-gallery" element={<ButtonGalleryDemo />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
