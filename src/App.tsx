import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import Index from "./pages/Index";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import TipsPage from "./pages/TipsPage";
import BuildPackPage from "./pages/BuildPackPage";
import ToolsPage from "./pages/ToolsPage";
import WorkoutsPage from "./pages/WorkoutsPage";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import WishlistPage from "./pages/WishlistPage";
import MyProgramsPage from "./pages/MyProgramsPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import MobileBottomNav from "./components/MobileBottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <WishlistProvider>
        <ProgressProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HashRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/tips" element={<TipsPage />} />
                <Route path="/build-pack" element={<BuildPackPage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/workouts" element={<WorkoutsPage />} />
                <Route path="/workouts/:id" element={<ProgramDetailPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/my-programs" element={<MyProgramsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <MobileBottomNav />
            </HashRouter>
          </TooltipProvider>
        </ProgressProvider>
      </WishlistProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
