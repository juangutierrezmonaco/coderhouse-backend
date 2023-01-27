import { Schema, model } from "mongoose";

const schema = new Schema(
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

export const MessageModel = model('messages', schema);