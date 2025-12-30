import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Index />} />
        <Route path="/apartments/:slug" element={<ApartmentDetail />} />
        <Route path="/apartments/:slug/unbook" element={<UnbookRange />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/travel-tips" element={<TravelTips />} />
        <Route  path="/buildings/:slug"  element={<BuildingDetail />}
/>

        {/* ADMIN */}
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
      </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
