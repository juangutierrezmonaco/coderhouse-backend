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
    
    if(!cart) throw new Error("Cart not found.");
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
    const cart = await CartModel.findByIdAndDelete(cid);

    if(!cart) throw new Error("Cart not found.");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addProduct(cid, pid, quantity) {
  try {
    const newProduct = { productId: pid, quantity }

    const cart = await CartModel.findByIdAndUpdate(cid, { $push: { "products": newProduct } }, { new: true });

    if(!cart) throw new Error("Cart not found.");    
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateProduct(cid, pid, quantity) {
  try {
    const cart = await getCart(cid);
    const index = cart.products.findIndex(p => p.productId === pid);
    cart.products[index].quantity = quantity;
    await cart.save();
    
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProduct(cid, pid) {
  try {
    const cart = await getCart(cid);
    cart.products = cart.products.filter(p => p.productId !== pid);
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

