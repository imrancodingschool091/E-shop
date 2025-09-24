import Stripe from "stripe";
import { Order } from "../models/order.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create Payment Intent
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  // Stripe amount must be an integer (in paise for INR)
  const amount = Math.round(order.totalPrice * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "inr",
    metadata: { orderId: order._id.toString() },
  });

  order.payment.paymentIntentId = paymentIntent.id;
  order.payment.amount = amount / 100; // store in INR
  order.payment.currency = "inr";
  await order.save();

  res.json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

// ✅ Stripe Webhook
export const stripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;
    const orderId = pi.metadata?.orderId;

    if (orderId) {
      const order = await Order.findById(orderId);
      if (order) {
        order.status = "processing";
        order.payment.status = "succeeded";
        await order.save();
      }
    }
  }

  // ✅ Send response to Stripe
  res.json({ received: true });
});
