import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
dotenv.config();
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));


app.get("/",(req,res)=>{
   res.send("hi there")
})
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/payments",paymentRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
