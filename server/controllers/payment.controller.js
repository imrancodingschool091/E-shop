// import Stripe from "stripe";
// import { Order } from "../models/order.model.js";
// import { asyncHandler } from "../middlewares/asyncHandler.js";


// const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createPaymentIntent=asyncHandler(async(req,res)=>{
//     const {orderId}=req.body;

//     const order=await Order.findById(orderId);

//     if(!order) return res.status(400).json({success:false, message:"order not found"});


//     const amount= Math.round(order.totalPrice*100);

//     const paymentIntent=stripe.paymentIntents.create({
//         amount,
//         currency:"inr",
//         metadata:{orderId:order._id.toString()}
//     });
    
//     order.payment.paymentIntentId=paymentIntent._id,
//     order.payment.amount=amount/100,
//     order.payment.currency="inr"

//     await order.save();



//     res.json({success:true,clientSecret:(await paymentIntent).client_secret})


// })



