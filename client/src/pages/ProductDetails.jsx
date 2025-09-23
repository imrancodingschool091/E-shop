import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../features/products/productSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 font-semibold">{message}</p>
      </div>
    );
  }

  if (!singleProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">No product found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={singleProduct.image}
            alt={singleProduct.name}
            className="w-full max-w-lg object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            {singleProduct.name}
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            {singleProduct.description}
          </p>

          <p className="text-3xl font-bold text-blue-600 mb-4">
            ₹{singleProduct.price}
          </p>

          <p className="text-sm text-gray-500 mb-2">
            Category:{" "}
            <span className="font-medium text-gray-700">
              {singleProduct.category.toUpperCase()}
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Color:{" "}
            <span className="font-medium text-gray-700">
              {singleProduct.color.toUpperCase()}
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Size:{" "}
            <span className="font-medium text-gray-700">
              {singleProduct.size.toUpperCase()}
            </span>
          </p>

          <p
            className={`text-sm font-medium mb-6 ${
              singleProduct.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {singleProduct.stock > 0
              ? `In Stock (${singleProduct.stock} left)`
              : "Out of Stock"}
          </p>

          {/* Quantity Selector */}
          {singleProduct.stock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <label className="font-medium text-gray-700">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-lg px-3 py-2 shadow-sm"
              >
                {[...Array(singleProduct.stock > 5 ? 5 : singleProduct.stock).keys()].map(
                  (x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          {/* Action Button */}
          <div className="flex gap-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
              onClick={() =>
                alert(
                  `Added ${quantity} ${singleProduct.name}(s) to cart (connect with cart logic)`
                )
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
