// components/PromotionBanner.jsx
import React from "react";
import { Link } from "react-router-dom";
const PromotionBanner = () => {
  return (
    <section className="bg-blue-50 py-12 my-12 rounded-lg text-center shadow">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        🔥 Big Season Sale!
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Save up to <span className="font-semibold text-blue-600">50% OFF</span> on your favorite styles.
      </p>
  
       <Link className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition" to={'/shop'}>Shop Now</Link>
 
    </section>
  );
};

export default PromotionBanner;
