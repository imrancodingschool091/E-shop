import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createPaymentIntent, stripeWebhook } from "../controllers/payment.controller.js";

const router=express.Router();

router.post("/create-payment-intent",authMiddleware,createPaymentIntent);

router.post("/webhook",express.raw({type:"application/json"}),stripeWebhook)


export default router;