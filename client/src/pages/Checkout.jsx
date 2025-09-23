// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder, resetOrderState } from "../features/orders/orderSlice";
import { getCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { showSuccess } from "../utils/message";
import Loader from "../components/Loader"; // 🟢 Import Loader

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { cartItems, totalPrice, isLoading: cartLoading } = useSelector((state) => state.cart);
  const { isLoading, isError, message } = useSelector((state) => state.order);

  // Shipping address state
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // 🟢 Fetch cart on mount
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Handle input change
  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  // Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!shippingAddress.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!shippingAddress.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!shippingAddress.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!/^\d{4,10}$/.test(shippingAddress.postalCode)) {
      newErrors.postalCode = "Enter a valid postal code (4–10 digits)";
    }
    if (!shippingAddress.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Place order handler
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!validateForm()) return;

    dispatch(placeOrder({ shippingAddress }))
      .unwrap()
      .then(() => {
        showSuccess("Order placed successfully 🎉");
        dispatch(resetOrderState());
        navigate("/my-orders");
      })
      .catch(() => {});
  };

  // Handle errors
  useEffect(() => {
    if (isError) {
      alert(message);
      dispatch(resetOrderState());
    }
  }, [isError, message, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <ShoppingCart className="w-8 h-8 text-blue-600" />
        Checkout
      </h1>

      {/* Cart Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cartLoading ? (
          <Loader /> // 🟢 Show loader instead of text
        ) : cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.product._id} className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-gray-700">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ₹{item.product.price}
                  </p>
                </div>
                <p className="font-semibold text-gray-800">
                  ₹{(item.quantity * item.product.price).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between mt-4 text-lg font-bold text-gray-900">
          <span>Total:</span>
          <span>₹{totalPrice ? totalPrice.toFixed(2) : "0.00"}</span>
        </div>
      </div>

      {/* Shipping Form */}
      <form onSubmit={handlePlaceOrder} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={shippingAddress.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div>
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={shippingAddress.postalCode}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
        </div>

        <div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
