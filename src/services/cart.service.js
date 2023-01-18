import { CartModel } from '../models/cart.model.js';

export async function getCarts() {
  try {
    const carts = await CartModel.find();
    return carts;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCart(cid) {
  try {
    const cart = await CartModel.findById(cid);
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createCart(cartData) {
  try {
    const cart = await CartModel.create(cartData);
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCart(cid) {
  try {
    await CartModel.findByIdAndDelete(cid);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addProduct(cid, pid, quantity) {
  try {
    const cart = await getCart(cid);
    const product = { productId: pid, quantity }
    cart.products.push(product)

    await CartModel.findByIdAndUpdate(cid, cart, { new: true });
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateProduct(cid, pid, quantity) {
  try {
    await CartModel.findByIdAndDelete(cid);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProduct(cid, pid) {
  try {
    await CartModel.findByIdAndDelete(cid);
  } catch (error) {
    throw new Error(error.message);
  }
}

