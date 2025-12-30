import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation Items
  const navigation = [
    { name: "Home", href: "/" },
    { name: "H₂0 The Free Water", href: "/h20" },
    { name: "Our Services", href: "/services" },
    { name: "E.L.S.A", href: "/elsa" },
    { name: "SnuggleIt", href: "/snuggleit" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      // Fixed position to stay at the top while scrolling
      className="fixed top-0 left-0 z-50 w-full border-b border-white/10"
      style={{
        // Gradient: Earthy Light Brown (#9e7c65) -> Dark Brown (#2e1d18)
        background: "linear-gradient(90deg, #9e7c65 0%, #2e1d18 100%)",
      }}
    >
      <div className="container relative flex h-16 items-center justify-between">
        {/* Logo (Left) */}
        <Link
          to="/"
          className="flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:scale-110"
        >
          <img src={logo} alt="Plugged In Logo" className="h-8" />
        </Link>

        {/* Desktop Navigation (Center) */}
        <nav className="hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-all duration-300 ease-in-out hover:scale-110 ${
                location.pathname === item.href
                  ? "text-white scale-110 font-bold drop-shadow-md"
                  : "text-white/90 hover:text-white drop-shadow-sm"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Hamburger Menu Button (Right) */}
        <div className="md:invisible">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:bg-white/10 hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <nav
          className="md:hidden absolute top-16 left-0 w-full border-b border-white/10 pb-4 shadow-xl"
          style={{
            // Keep background solid dark brown for readability on mobile
            backgroundColor: "#2e1d18", 
          }}
        >
          <ul className="flex flex-col items-center space-y-4 pt-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`text-lg font-medium transition-colors ${
                    location.pathname === item.href
                      ? "text-white" 
                      : "text-white/70 hover:text-white"
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