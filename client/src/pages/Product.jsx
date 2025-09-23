import React from "react";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";

function Product() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
          🛍️ Products
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse and filter through our latest items
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar (20% width on large screens) */}
        <div className="lg:basis-1/5 lg:w-1/5 w-full">
          <Sidebar />
        </div>

        {/* Product List (remaining space) */}
        <div className="flex-1 bg-white shadow-md rounded-xl p-6">
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default Product;
