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

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Our Services", href: "/services" },
    { name: "E.L.S.A", href: "/elsa" },
    { name: "SnuggleIt", href: "/snuggleit" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
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
        <nav className="hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm tracking-widest font-sans transition-all duration-300 ease-in-out hover:scale-110 ${
                location.pathname === item.href
                  ? "text-[#E7BB55] font-bold drop-shadow-md"
                  : "text-[#E7BB55]/70 hover:text-[#E7BB55] drop-shadow-sm"
              }`}
            >
              {item.name}
            </Link>
          ))}
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