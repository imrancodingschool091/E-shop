import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

// ➕ Add/Update Cart Item
export const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ success: false, message: "Product ID & quantity required" });
  }

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, cartItems: [{ product: productId, quantity }] });
  } else {
    const index = cart.cartItems.findIndex(item => item.product.toString() === productId);
    if (index > -1) cart.cartItems[index].quantity += quantity;
    else cart.cartItems.push({ product: productId, quantity });
  }

  await cart.save();
  const populatedCart = await cart.populate("cartItems.product", "name price image");
  res.status(200).json({ success: true, cart: populatedCart.cartItems });
});

// 🛒 Get User Cart
export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user;
  const cart = await Cart.findOne({ user: userId }).populate("cartItems.product", "name price image");

  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  res.status(200).json({ success: true, cart: cart.cartItems });
});

// ❌ Remove Cart Item
export const deleteCartItem = asyncHandler(async (req, res) => {
  const userId = req.user;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);
  await cart.save();

  const populatedCart = await cart.populate("cartItems.product", "name price image");
  res.status(200).json({ success: true, cart: populatedCart.cartItems });
});

// 🔼 Increment/Decrement Quantity
export const updateCartQuantity = asyncHandler(async (req, res) => {
  const userId = req.user;
  const { productId, action } = req.body; // action: "increment" | "decrement"

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  const index = cart.cartItems.findIndex(item => item.product.toString() === productId);
  if (index === -1) return res.status(404).json({ success: false, message: "Product not in cart" });

  if (action === "increment") cart.cartItems[index].quantity += 1;
  if (action === "decrement" && cart.cartItems[index].quantity > 1) cart.cartItems[index].quantity -= 1;

  await cart.save();
  const populatedCart = await cart.populate("cartItems.product", "name price image");
  res.status(200).json({ success: true, cart: populatedCart.cartItems });
});
