import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import WorkingPageBuilderFixed from "./pages/WorkingPageBuilderFixed";
import UltimatePageBuilderComplete from "./pages/UltimatePageBuilderComplete";
import EnhancedLandingPageRenderer from "./pages/EnhancedLandingPageRenderer";
import EnhancedLandingPageRendererComplete from "./pages/EnhancedLandingPageRendererComplete";
import UserManagement from "./pages/UserManagement";
import Privacy from "./pages/Privacy";
import Impressum from "./pages/Impressum";
import Analytics from "./pages/Analytics";

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

export default App;
