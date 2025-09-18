// FILE: src/components/Footer.tsx
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Using your existing logo

const Footer = () => {
  return (
    <footer className="border-t py-12 px-4 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* Using your existing logo image */}
              <img src={logo} alt="Plugged In Logo" className="h-8" />
            </div>
            <p className="text-sm text-muted-foreground">Building innovative products for comfort and safety.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/snuggleit" className="hover:text-primary transition-colors">
                  SnuggleIt Pet Beds
                </Link>
              </li>
              <li>
                <Link to="/elsa" className="hover:text-primary transition-colors">
                  E.L.S.A. Emergency Device
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          {/* Updated the copyright year */}
          <p>&copy; 2025 PLGDIN INNOVATONS LLP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;