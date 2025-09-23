// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-12 border-t">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-3">MyShop</h2>
          <p className="text-sm">
            Your one-stop shop for Men, Women, and Kids fashion.
            Discover your style with us today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/shop" className="hover:text-blue-600">Shop</a></li>
            <li><a href="/cart" className="hover:text-blue-600">Cart</a></li>
            <li><a href="/login" className="hover:text-blue-600">Login</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Subscribe</h3>
          <p className="text-sm mb-3">
            Get updates on new arrivals & exclusive offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-l-md w-full border focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="bg-blue-600 px-4 text-white rounded-r-md hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t pt-4">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
