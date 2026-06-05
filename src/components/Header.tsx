import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const navigation = [
    { name: "Home", href: "/", state: { transition: "default" } },
    { name: "Our Services", href: "/services", state: { transition: "glitchSplit" } },
    { name: "E.L.S.A", href: "/elsa", state: { transition: "cyberSlide" } },
    { name: "SnuggleIt", href: "/snuggleit", state: { transition: "circleExpand" } },
    { name: "About", href: "/about", state: { transition: "circleExpand" } },
    { name: "Contact", href: "/contact", state: { transition: "flipRotate" } },
  ];

  const logoText = "Plugged In";

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full border-b border-[#E7BB55]/20"
      style={{
        backgroundColor: "#000000", 
      }}
    >
      <div className="container relative flex h-16 items-center justify-between">
        {/* Logo with FAST Typing Animation */}
        <Link
          to="/"
          className="flex items-center space-x-2 transition-transform duration-300 ease-in-out"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <img src={logo} alt="Plugged In Logo" className="h-8 transition-transform duration-300 hover:scale-110" />
          
          <div className="overflow-hidden flex items-center">
            <AnimatePresence>
              {isLogoHovered && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.6, ease: "linear" }}
                  className="whitespace-nowrap flex"
                >
                  {logoText.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ display: "none" }}
                      animate={{ display: "inline-block" }}
                      transition={{
                        delay: index * 0.05,
                      }}
                      className="text-white uppercase tracking-widest font-sans font-normal text-sm md:text-base"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:flex items-center space-x-1 relative">
          {navigation.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const isActive = location.pathname === item.href;
            return (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative py-1.5 px-3"
              >
                {/* Active Link Highlight (Persistent Slide) */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-[#E7BB55]/10 rounded border border-[#E7BB55]/30 -z-10 shadow-[0_0_15px_rgba(231,187,85,0.15)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Hover Link Highlight (Shared Layout Slide Transition) */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hoverNavIndicator"
                    className="absolute inset-0 bg-white/5 rounded border border-white/10 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}

                <Link
                  to={item.href}
                  state={item.state}
                  className={`text-xs uppercase tracking-widest font-tech block transition-colors duration-200 ${
                    isActive
                      ? "text-[#E7BB55] font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Hamburger Menu Button */}
        <div className="md:invisible">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#E7BB55] hover:bg-[#E7BB55]/10 hover:text-[#E7BB55]"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <nav
          className="md:hidden absolute top-16 left-0 w-full border-b border-[#E7BB55]/20 pb-4 shadow-xl"
          style={{
            backgroundColor: "#000000",
          }}
        >
          <ul className="flex flex-col items-center space-y-4 pt-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  state={item.state}
                  className={`text-lg tracking-widest font-sans transition-colors ${
                    location.pathname === item.href
                      ? "text-[#E7BB55] font-bold" 
                      : "text-[#E7BB55]/60 hover:text-[#E7BB55]" 
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;