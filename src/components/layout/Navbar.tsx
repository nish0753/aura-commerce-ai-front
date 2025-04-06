
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl font-bold text-navy">
            Aura
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-teal transition-colors">
              Home
            </Link>
            <Link to="/recommendations" className="text-gray-700 hover:text-teal transition-colors">
              For You
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-teal transition-colors">
              Categories
            </Link>
            <Link to="/new" className="text-gray-700 hover:text-teal transition-colors">
              New Arrivals
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              aria-label="Search" 
              className="text-gray-700 hover:text-teal transition-colors"
            >
              <Search size={20} />
            </button>
            <Link 
              to="/account" 
              aria-label="Account" 
              className="text-gray-700 hover:text-teal transition-colors"
            >
              <User size={20} />
            </Link>
            <button 
              onClick={toggleCart}
              aria-label="Cart" 
              className="text-gray-700 hover:text-teal transition-colors relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-teal transition-colors">
              Home
            </Link>
            <Link to="/recommendations" className="block text-gray-700 hover:text-teal transition-colors">
              For You
            </Link>
            <Link to="/categories" className="block text-gray-700 hover:text-teal transition-colors">
              Categories
            </Link>
            <Link to="/new" className="block text-gray-700 hover:text-teal transition-colors">
              New Arrivals
            </Link>
            <div className="flex space-x-4 pt-2 border-t border-gray-100">
              <button aria-label="Search" className="text-gray-700 hover:text-teal transition-colors">
                <Search size={20} />
              </button>
              <Link to="/account" aria-label="Account" className="text-gray-700 hover:text-teal transition-colors">
                <User size={20} />
              </Link>
              <button 
                onClick={toggleCart}
                aria-label="Cart" 
                className="text-gray-700 hover:text-teal transition-colors relative"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
