import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    products: {
      type: [{
        productId: {
          type: String,
          required: true,
          unique: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }]
    }
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model('carts', schema);