import mongoose from "mongoose";
import { config } from "./config.js";

mongoose.set('strictQuery', false);
mongoose.connect(config.mongoDbUri, (err) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("🚀 Connected to MongoDB!")
  }
})