import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Update cart count whenever cartItems change
  useEffect(() => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  return (
    <nav className="bg-blue-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-blue-200 transition-colors duration-300"
          >
            <ShoppingCart className="w-6 h-6" />
            <span>MyShop</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="font-medium text-white hover:text-blue-200 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="font-medium text-white hover:text-blue-200 transition-colors duration-300"
            >
              Shop
            </Link>

            {/* Cart with Badge */}
            <Link
              to="/cart"
              className="relative flex items-center font-medium text-white hover:text-blue-200 transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              <span className="ml-1">Cart</span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/profile"
                className="font-medium text-white hover:text-blue-200 transition-colors duration-300"
              >
                Profile
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-200 focus:outline-none transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-900 shadow-lg px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-white hover:text-blue-200 font-medium py-2 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsOpen(false)}
            className="block text-white hover:text-blue-200 font-medium py-2 transition-colors duration-300"
          >
            Shop
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="relative flex items-center text-white hover:text-blue-200 font-medium py-2 transition-colors duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-2 left-6 transform -translate-y-1/2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
            <span className="ml-2">Cart</span>
          </Link>
          {isAuthenticated && (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block text-white hover:text-blue-200 font-medium py-2 transition-colors duration-300"
            >
              Profile
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
