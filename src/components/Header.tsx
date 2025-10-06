import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import { Menu, X, Bot } from "lucide-react"; // 1. Import the Bot icon

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <Link to="/" className="flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:scale-110">
          <img src={logo} alt="Plugged In Logo" className="h-8" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-all duration-300 ease-in-out hover:text-primary hover:scale-110 ${
                location.pathname === item.href
                  ? "text-primary scale-110"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* 2. Add the Desktop AI Assistant Button */}
        <Button className="hidden md:flex transition-transform duration-300 ease-in-out hover:scale-105" asChild>
          <Link to="/chat">
            <Bot className="mr-2 h-4 w-4" /> AI Assistant
          </Link>
        </Button>
        
        {/* Hamburger Menu Button */}
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
      
      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-background border-b pb-4">
          <ul className="flex flex-col items-center space-y-4 pt-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="text-lg font-medium text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {/* 3. Add the Mobile AI Assistant Button */}
            <li>
              <Button className="transition-transform duration-300 ease-in-out hover:scale-105" asChild>
                <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                  <Bot className="mr-2 h-4 w-4" /> AI Assistant
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

