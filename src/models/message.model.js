import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export const MessageModel = mongoose.model('messages', schema);