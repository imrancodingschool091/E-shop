// models/order.model.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],

    totalPrice: { type: Number, required: true },

    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    // 🔑 New field
    payment: {
      paymentIntentId: String,
      status: { type: String, enum: ["unpaid", "succeeded", "failed"], default: "unpaid" },
      amount: Number,
      currency: String,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
