import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("🚀 Connected to MongoDB!")
  }
})