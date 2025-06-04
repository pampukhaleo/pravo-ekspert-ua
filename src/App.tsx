import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import Index from "./pages/Index";
import ExpertisesListPage from "./pages/ExpertisesListPage";
import ExpertisePage from "./pages/ExpertisePage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import NewsPage from "./pages/NewsPage";
import NewsArticlePage from "./pages/NewsArticlePage";
import ServicePage from "./pages/ServicePage";
import NotFound from "./pages/NotFound";

// ScrollToTop component to ensure pages start at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ekspertyzy" element={<ExpertisesListPage />} />
            <Route path="/ekspertyzy/:slug" element={<ExpertisePage />} />
            <Route path="/posluhy/:slug" element={<ServicePage />} />
            <Route path="/tsiny" element={<PricingPage />} />
            <Route path="/kontakty" element={<ContactPage />} />
            <Route path="/pro-nas" element={<AboutPage />} />
            <Route path="/novini" element={<NewsPage />} />
            <Route path="/novini/:slug" element={<NewsArticlePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
