import { useState } from "react"; // 1. Import useState
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react"; // 2. Import Menu and X icons

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 3. State for mobile menu

  const navigation = [
    { name: "Home", href: "/" },
    { name: "E.L.S.A", href: "/elsa" },
    { name: "SnuggleIt", href: "/snuggleit" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Plugged In Logo" className="h-8" />
        </Link>

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Emergency Button (hidden on mobile) */}
        {location.pathname !== "/emergency-contacts" && (
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link to="/emergency-contacts">Emergency Services</Link>
          </Button>
        )}
        
        {/* 4. Hamburger Menu Button (visible only on mobile) */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* 5. Mobile Menu Panel (conditionally rendered) */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-background border-b pb-4">
          <ul className="flex flex-col items-center space-y-4 pt-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="text-lg font-medium text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {location.pathname !== "/emergency-contacts" && (
              <li>
                <Button variant="outline" asChild>
                  <Link to="/emergency-contacts" onClick={() => setIsMenuOpen(false)}>
                    Emergency Services
                  </Link>
                </Button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;