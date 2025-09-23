import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, setFilters, resetFilters } from "../features/products/productSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.product);

  const handleChange = (e) => {
    dispatch(setFilters({ [e.target.name]: e.target.value }));
  };

  const applyFilters = () => {
    // Reset to page 1 when applying new filters
    dispatch(getAllProducts({ page: 1, ...filters }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(getAllProducts({ page: 1, limit: 8 }));
  };

  return (
    <div className="w-64 bg-white shadow-md rounded-xl p-5 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
        🔍 Filters
      </h2>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Search
        </label>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search products..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={filters.category}
          onChange={handleChange}
          placeholder="e.g. Shoes"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
        />
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={applyFilters}
          className="w-full bg-blue-500 hover:bg-blue-600 transition text-white font-medium py-2 rounded-lg shadow-md"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="w-full bg-gray-200 hover:bg-gray-300 transition text-gray-800 font-medium py-2 rounded-lg"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default Sidebar;