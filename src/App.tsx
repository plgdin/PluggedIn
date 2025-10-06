import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 1. Changed from HashRouter to BrowserRouter
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ELSA from "./pages/ELSA";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SnuggleIt from "./pages/SnuggleIt";
import Team from "./pages/Team";
import AIChat from "./pages/AIChat";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/elsa" element={<ELSA />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/snuggleit" element={<SnuggleIt />} />
        <Route path="/team" element={<Team />} />
        <Route path="/chat" element={<AIChat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* 2. Changed from HashRouter to BrowserRouter */}
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

