import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            unique: true,
            required: true
          },
          quantity: {
            type: Number,
            default: 1
          }
        }
      ],
      _id: false,
      default: []
    }
  },
  {
    timestamps: true,
    autoIndex: false  // because there's an array and it will throw an error about the id of products
  }
);

schema.pre(/^find/, function (next) {
  this.populate('products.product');
  next();
});

export const CartModel = model('carts', schema);