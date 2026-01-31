import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer 
      className="border-t py-12 px-4"
      style={{
        backgroundColor: "#000000", // Solid Black Footer background
        borderColor: "rgba(231, 187, 85, 0.2)" // Subtle Gold border top
      }}
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Plugged In Logo" className="h-8" />
            </div>
            <p className="text-sm text-[#E7BB55]">Building innovative products for comfort and safety.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[#E7BB55]">Products</h3>
            <ul className="space-y-2 text-sm text-[#E7BB55]/80">
              <li>
                <Link to="/snuggleit" className="hover:text-white transition-colors">
                  SnuggleIt Pet Beds
                </Link>
              </li>
              <li>
                <Link to="/elsa" className="hover:text-white transition-colors">
                  E.L.S.A. Emergency Device
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[#E7BB55]">Company</h3>
            <ul className="space-y-2 text-sm text-[#E7BB55]/80">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[#E7BB55]">Support</h3>
            <ul className="space-y-2 text-sm text-[#E7BB55]/80">
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                {/* Updated Privacy Link */}
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                {/* Updated Terms Link */}
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-[#E7BB55]/60" style={{ borderColor: "rgba(231, 187, 85, 0.2)" }}>
          <p>&copy; 2025 PLGDIN INNOVATONS LLP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;