import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, deleteCartItem, updateCartQuantity } from "../features/cart/cartSlice";
import { ShoppingCart, Trash2, Minus, Plus, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const naviagte=useNavigate()
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, totalPrice, isLoading, isError, error } = useSelector(
    (state) => state.cart
  );

  console.log("CartItem:",cartItems)
  
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleDelete = (id) => dispatch(deleteCartItem(id));
  const handleQuantity = (id, action) =>
    dispatch(updateCartQuantity({ productId: id, action }));

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ShoppingCart className="w-8 h-8 animate-bounce text-blue-500" />
        <p className="ml-2 text-lg font-semibold text-gray-600">Loading cart...</p>
      </div>
    );

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>
    );

    const handleNavigate=()=>{
      naviagte("/checkout")
      
    }

  return (
    <div className="max-w-5xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <ShoppingCart className="w-8 h-8 text-blue-600" />
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <Package className="w-20 h-20 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500">
            Looks like you haven’t added anything to your cart yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.product.name}
                </h2>
                <p className="text-gray-500">₹{item.product.price}</p>

                <div className="flex items-center space-x-3 mt-2">
                  <button
                    onClick={() => handleQuantity(item.product._id, "decrement")}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantity(item.product._id, "increment")}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <p className="font-bold text-gray-800">
                  ₹{item.quantity * item.product.price}
                </p>
                <button
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                  onClick={() => handleDelete(item.product._id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="bg-blue-50 p-5 rounded-xl flex justify-between items-center shadow">
            <p className="text-lg font-semibold">
              Total Items:{" "}
              <span className="text-blue-600">{totalQuantity}</span>
            </p>
            <p className="text-lg font-bold text-blue-700">
              Total Price: ₹{totalPrice}
            </p>
          </div>

          <button onClick={handleNavigate} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
