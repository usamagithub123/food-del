import mongoose from "mongoose";

export const connectDB= async()=>{
  await mongoose.connect('mongodb+srv://usamaashraf:usama123@cluster0.4dhfkei.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}