import express from "express";
import { addToCart, deleteCartItem, getCart, updateCartQuantity } from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, addToCart); // add/update
router.get("/", authMiddleware, getCart); // get cart
router.delete("/:productId", authMiddleware, deleteCartItem); // remove item
router.patch("/", authMiddleware, updateCartQuantity); // increment/decrement

export default router;
