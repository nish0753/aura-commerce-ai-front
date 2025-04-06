
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h2 className="font-heading text-2xl font-bold mb-4">Aura</h2>
            <p className="text-gray-300 mb-4">
              AI-powered fashion discovery for the modern shopper
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-coral transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-coral transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-coral transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-coral transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/new" className="text-gray-300 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/bestsellers" className="text-gray-300 hover:text-white transition-colors">Bestsellers</Link></li>
              <li><Link to="/recommendations" className="text-gray-300 hover:text-white transition-colors">Recommended For You</Link></li>
              <li><Link to="/sale" className="text-gray-300 hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/our-story" className="text-gray-300 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/sustainability" className="text-gray-300 hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/size-guide" className="text-gray-300 hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              © 2025 Aura. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Preferences</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
