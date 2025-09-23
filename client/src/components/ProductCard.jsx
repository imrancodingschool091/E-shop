import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { showSuccess } from "../utils/message";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (id) => {
    navigate(`/shop/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation

    // Dispatch addToCart Redux action
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    showSuccess("item added in cart")
  };

  return (
    <div
      className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => handleNavigate(product._id)}
    >
      {/* Product Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col justify-between h-40">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-blue-600">
            ₹{product.price}
          </span>
          <button
            className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
