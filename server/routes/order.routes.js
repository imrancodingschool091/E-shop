import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
 
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// User
router.post("/", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);

// Admin
// router.put("/:id/status", authMiddleware, isAdmin, updateOrderStatus);

export default router;
