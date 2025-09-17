import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import ELSA from "./pages/ELSA";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import EmergencyContacts from "./pages/EmergencyContacts";
import SnuggleIt from "./pages/SnuggleIt";
import Team from "./pages/Team"; // 1. Add this import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/elsa" element={<ELSA />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/emergency-contacts" element={<EmergencyContacts />} />
            <Route path="/snuggleit" element={<SnuggleIt />} />
            <Route path="/team" element={<Team />} /> {/* 2. Add this route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;