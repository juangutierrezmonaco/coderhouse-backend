import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          productId: {
            type: String,
            unique: true,
            required: true
          },
          quantity: {
            type: Number,
            default: 1
          }
        }
      ],
      default: []
    }
  },
  {
    timestamps: true,
    autoIndex: false  // because there's an array and it will throw an error about the id of products
  }
);

export const CartModel = mongoose.model('carts', schema);