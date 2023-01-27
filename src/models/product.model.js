import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: Boolean,
      default: true
    },
    stock: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    thumbnails: {
      type: [String]
    }
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongooseDelete, { deletedAt: true });
export const ProductModel = model('products', schema);