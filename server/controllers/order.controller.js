import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";

// 🛒 Create Order from Cart
export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user;

  const { shippingAddress } = req.body;
  

  const cart = await Cart.findOne({ user: userId }).populate("cartItems.product", "price");
  if (!cart || cart.cartItems.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  // Calculate total price
  const totalPrice = cart.cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Create order
  const order = await Order.create({
    user: userId,
    orderItems: cart.cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    })),
    totalPrice,
    shippingAddress,
  });

  // Optional: Clear cart after placing order
  cart.cartItems = [];
  await cart.save();

  res.status(201).json({ success: true, order });
});

// 📦 Get All Orders of Logged-in User
export const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user;
  const orders = await Order.find({ user: userId }).populate("orderItems.product", "name price image");

  res.status(200).json({ success: true, orders });
});

// 📦 Get Single Order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("orderItems.product", "name price image");

  if (!order) return res.status(404).json({ success: false, message: "Order not found" });

  res.status(200).json({ success: true, order });
});

// 🚚 Update Order Status (Admin Only)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });

  order.status = status;
  await order.save();

  res.status(200).json({ success: true, order });
});
