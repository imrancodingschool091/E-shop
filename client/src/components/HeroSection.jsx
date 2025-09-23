import React from 'react'

import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16 md:py-24">
        {/* Left Side - Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Shop the Latest Trends
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            Discover exclusive collections for Men, Women, and Kids. 
            Upgrade your style with just a click.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/shop"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
            <Link
              to="/register"
              className="bg-blue-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-900 transition"
            >
              Join Us
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="/Hero.png" 
            alt="Fashion Banner"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
