import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";

const Header = () => {
  const location = useLocation();
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "E.L.S.A", href: "/elsa" },
    { name: "Contact", href: "/contact" },
    { name: "SnuggleIt", href: "/snuggleit" }, // Add this line
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Plugged In Logo" className="h-8" />
        </Link>

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

        {location.pathname !== "/emergency-contacts" && (
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link to="/emergency-contacts">Emergency Services</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;