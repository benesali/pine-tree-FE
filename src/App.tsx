import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

import Index from "./pages/Index";
import ApartmentDetail from "./pages/ApartmentDetail";
import UnbookRange from "./pages/UnbookRange";
import AdminLogin from "./pages/AdminLogin";
import AdminCalendar from "./pages/AdminCalendar";
import Reviews from "./pages/Reviews";
import TravelTips from "./pages/TravelTips";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import BuildingDetail from "@/pages/BuildingDetail";
import FAQPage from "./pages/Faq";
import LanguageLayout from "./contexts/LanguageLayout";
import ApartmentsPage from "./pages/Apartments";  

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <Routes>
          {/* ROOT – redirect handled inside Index or LanguageLayout */}
          <Route path="/" element={<Navigate to="/cs" replace />} />    
          {/* LANGUAGE-AWARE ROUTES */}
          <Route path="/:lang" element={<LanguageLayout />}>
            <Route index element={<Index />} />
            <Route path="apartments/:slug" element={<ApartmentDetail />} />
            <Route path="apartments/:slug/unbook" element={<UnbookRange />} />
            <Route path="apartments" element={<ApartmentsPage />} />

            <Route path="buildings/:slug" element={<BuildingDetail />} />

            <Route path="faq" element={<FAQPage />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="travel-tips" element={<TravelTips />} />
          </Route>

          {/* ADMIN (no lang) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/calendar"
            element={
              <ProtectedRoute>
                <AdminCalendar />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
