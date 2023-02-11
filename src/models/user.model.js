import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 1,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    avatar_url: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongooseDelete, { deletedAt: true });
export const UserModel = model("users", schema);
