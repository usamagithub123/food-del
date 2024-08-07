import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5175";
  try { 
    let newOrder;
    try {
      newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
      });
      await newOrder.save();
    } catch (err) {
      console.error("Error saving order to database:", err);
      return res.status(500).json({ success: false, message: `Database Error: ${err.message}` });
    }

    try {
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    } catch (err) {
      console.error("Error updating user cart:", err);
      return res.status(500).json({ success: false, message: `Cart Update Error: ${err.message}` });
    }

    let line_items;
    try {
      line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Delivery Charges",
          },
          unit_amount: 2 * 100,
        },
        quantity: 1,
      });
    } catch (err) {
      console.error("Error preparing line items:", err);
      return res.status(500).json({ success: false, message: `Line Items Error: ${err.message}` });
    }

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      });
    } catch (err) {
      console.error("Error creating Stripe session:", err);
      return res.status(500).json({ success: false, message: `Stripe Session Error: ${err.message}` });
    }

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ success: false, message: `Unexpected Error: ${error.message}` });
  }
};
const verifyOrder= async(req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}
const userOrders = async(req,res)=>{
   try {
      const orders = await orderModel.find({userId:req.body.userId});
      res.json({success:true,data:orders})
   } catch (error) {
     res.json({success:false,message:"Error"})    
   }
}
 //listing orders for admin panel
 const listOrders= async(req,res)=>{
     try {
         const orders= await orderModel.find({});
         res.json({success:true, data:orders})
     } catch (error) {
         res.json({success:false, message:"Error"})
     }
 }
 const updateStatus= async(req,res)=>{
    try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
      res.json({success:true,message:"Status Updated"})     
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
 }


export { placeOrder ,verifyOrder , userOrders,listOrders,updateStatus};
